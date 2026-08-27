import type { AsukaThemeSettings, WallpaperPeriod } from '../../shared/settings.js'
import { wallpaperAssetUrl, wallpaperLayerProfileForPeriod, wallpaperOpacityForPeriod } from '../../shared/wallpapers.js'

const ATTRIBUTE_ENABLED = 'data-asuka-school-wallpaper'
const ATTRIBUTE_MODE = 'data-asuka-school-mode'
const ATTRIBUTE_DETAILS = 'data-asuka-school-details'
const ATTRIBUTE_REDUCED_MOTION = 'data-asuka-school-reduce-motion'
const ATTRIBUTE_SCENE = 'data-asuka-school-scene'
const WALLPAPER_ROOT_ID = 'asuka-school-wallpaper-root'
const WALLPAPER_LAYER_CLASS = 'asuka-school-wallpaper-layer'

let activeLayerIndex = 0
let activePeriod: WallpaperPeriod | undefined
let pendingPeriod: WallpaperPeriod | undefined
let requestToken = 0
let preloadTimer: ReturnType<typeof setTimeout> | undefined
let preloadIdleHandle: number | undefined
let preloadFallbackTimer: ReturnType<typeof setTimeout> | undefined
let preloaded: { period: WallpaperPeriod, ready: Promise<boolean> } | undefined
let wallpaperEnabled = false
let autoPreloadEnabled = false
let preloadGeneration = 0
const scheduledFrames = new Set<number>()
const scheduledFrameFallbacks = new Set<ReturnType<typeof setTimeout>>()

const CROSSFADE_SETTLE_MS = 620

/** Update only plugin-owned document attributes; no DSH component selectors are involved. */
export function applyWallpaper(settings: AsukaThemeSettings, period: WallpaperPeriod): void {
  if (typeof document === 'undefined' || document.body === null) return
  const body = document.body
  const enabled = settings.mode !== 'off' && settings.wallpaperEnabled
  wallpaperEnabled = enabled
  autoPreloadEnabled = enabled && settings.wallpaperPeriod === 'auto'
  body.setAttribute(ATTRIBUTE_ENABLED, enabled ? 'true' : 'false')
  body.setAttribute(ATTRIBUTE_MODE, settings.mode)
  body.setAttribute(ATTRIBUTE_DETAILS, settings.decorativeDetails ? 'true' : 'false')
  body.setAttribute(ATTRIBUTE_REDUCED_MOTION, settings.reduceMotion ? 'true' : 'false')
  body.setAttribute(ATTRIBUTE_SCENE, period)
  const root = document.getElementById(WALLPAPER_ROOT_ID) as HTMLElement | null
  if (!enabled) {
    requestToken += 1
    pendingPeriod = undefined
    cancelScheduledFrames()
    cancelPreload()
    preloaded = undefined
    if (root !== null) root.dataset.enabled = 'false'
    return
  }

  const created = root === null
  const layers = getWallpaperLayers(root ?? createWallpaperRoot())
  const wallpaperRoot = layers[0].parentElement as HTMLElement
  const wasEnabled = wallpaperRoot.dataset.enabled === 'true'
  updateWallpaperAppearance(settings.wallpaperOpacity, settings.wallpaperBlurPx, period)

  if (period === activePeriod) {
    if (pendingPeriod !== undefined) {
      requestToken += 1
      pendingPeriod = undefined
    }
    if (!wasEnabled) {
      const token = ++requestToken
      cancelScheduledFrames()
      wallpaperRoot.dataset.enabled = 'false'
      scheduleFrame(() => {
        if (token !== requestToken || !wallpaperEnabled || !wallpaperRoot.isConnected) return
        wallpaperRoot.dataset.enabled = 'true'
      })
    }
    if (autoPreloadEnabled) scheduleNextPreload(period)
    else cancelPreload()
    return
  }
  if (period === pendingPeriod) return

  pendingPeriod = period
  const token = ++requestToken
  cancelScheduledFrames()
  cancelPreload()
  const url = wallpaperAssetUrl(period)
  void ensurePeriodReady(period, url).then((ready) => {
    if (token !== requestToken || pendingPeriod !== period) return
    if (!ready) {
      pendingPeriod = undefined
      return
    }
    commitWallpaperScene(wallpaperRoot, period, url, created, token)
  })
}

/** Update the two inexpensive wallpaper custom properties without touching the scene layers. */
export function updateWallpaperAppearance(opacity: number, blurPx: number, period: WallpaperPeriod): void {
  if (typeof document === 'undefined') return
  const root = document.getElementById(WALLPAPER_ROOT_ID) as HTMLElement | null
  if (root === null) return
  root.style.setProperty('--asuka-wallpaper-opacity', String(wallpaperOpacityForPeriod(opacity, period)))
  root.style.setProperty('--asuka-wallpaper-blur', `${blurPx}px`)
}

function commitWallpaperScene(wallpaperRoot: HTMLElement, period: WallpaperPeriod, url: string, created: boolean, token: number): void {
  const layers = getWallpaperLayers(wallpaperRoot)
  const nextIndex = activePeriod === undefined ? activeLayerIndex : 1 - activeLayerIndex
  const nextLayer = layers[nextIndex]
  const previousLayer = layers[1 - nextIndex]
  const profile = wallpaperLayerProfileForPeriod(period)
  nextLayer.style.setProperty('--asuka-wallpaper-image', `url("${url}")`)
  nextLayer.style.setProperty('--asuka-wallpaper-mask-start', profile.maskStart)
  nextLayer.style.setProperty('--asuka-wallpaper-mask-middle', profile.maskMiddle)
  nextLayer.style.setProperty('--asuka-wallpaper-mask-end', profile.maskEnd)
  nextLayer.style.setProperty('--asuka-wallpaper-filter', profile.filter)
  nextLayer.dataset.active = 'false'
  if (created) wallpaperRoot.dataset.enabled = 'false'
  // Two frames commit the initial state without a synchronous layout read.
  scheduleFrame(() => {
    if (token !== requestToken || !wallpaperEnabled || !wallpaperRoot.isConnected) return
    scheduleFrame(() => {
      if (token !== requestToken || !wallpaperEnabled || !wallpaperRoot.isConnected) return
      wallpaperRoot.dataset.enabled = 'true'
      nextLayer.dataset.active = 'true'
      previousLayer.dataset.active = 'false'
      activeLayerIndex = nextIndex
      activePeriod = period
      pendingPeriod = undefined
      if (autoPreloadEnabled) scheduleNextPreload(period)
    })
  })
}

/** Remove exactly the document state this plugin owns. */
export function clearWallpaper(): void {
  if (typeof document === 'undefined') return
  requestToken += 1
  wallpaperEnabled = false
  autoPreloadEnabled = false
  pendingPeriod = undefined
  cancelScheduledFrames()
  cancelPreload()
  preloaded = undefined
  const body = document.body
  body.removeAttribute(ATTRIBUTE_ENABLED)
  body.removeAttribute(ATTRIBUTE_MODE)
  body.removeAttribute(ATTRIBUTE_DETAILS)
  body.removeAttribute(ATTRIBUTE_REDUCED_MOTION)
  body.removeAttribute(ATTRIBUTE_SCENE)
  document.getElementById(WALLPAPER_ROOT_ID)?.remove()
  activeLayerIndex = 0
  activePeriod = undefined
}

function loadAndDecodeImage(url: string): Promise<boolean> {
  if (typeof Image === 'undefined') return Promise.resolve(true)
  return new Promise(resolve => {
    const image = new Image()
    image.onload = () => {
      if (typeof image.decode !== 'function') {
        resolve(true)
        return
      }
      // A successful load means the resource is usable. Some browsers reject
      // decode() after onload for transient decoder/cache reasons, so degrade
      // gracefully instead of blocking the scene forever.
      void image.decode().then(() => resolve(true), () => resolve(true))
    }
    image.onerror = () => resolve(false)
    image.src = url
  })
}

function ensurePeriodReady(period: WallpaperPeriod, url: string): Promise<boolean> {
  if (preloaded?.period !== period) return loadForScene(url)
  const candidate = preloaded
  return candidate.ready.then(ready => ready ? true : loadForScene(url)).finally(() => {
    if (preloaded === candidate) preloaded = undefined
  })
}

async function loadForScene(url: string): Promise<boolean> {
  // Retry a failed network preload/load once. Keep the last successfully
  // decoded layer when both attempts fail; a later request can retry safely.
  if (await loadAndDecodeImage(url)) return true
  return loadAndDecodeImage(url)
}

function scheduleNextPreload(period: WallpaperPeriod): void {
  cancelPreload()
  const generation = preloadGeneration
  preloadTimer = setTimeout(() => {
    preloadTimer = undefined
    if (generation !== preloadGeneration || !autoPreloadEnabled || !canPreload()) return
    const nextPeriod: WallpaperPeriod = period === 'morning' ? 'noon' : period === 'noon' ? 'night' : 'morning'
    const token = requestToken
    const preload = () => {
      preloadIdleHandle = undefined
      preloadFallbackTimer = undefined
      if (generation !== preloadGeneration || !autoPreloadEnabled || token !== requestToken || activePeriod !== period) return
      preloaded = { period: nextPeriod, ready: loadAndDecodeImage(wallpaperAssetUrl(nextPeriod)) }
    }
    const idle = (window as typeof window & { requestIdleCallback?: (callback: () => void) => number }).requestIdleCallback
    if (typeof idle === 'function') preloadIdleHandle = idle(preload)
    else preloadFallbackTimer = setTimeout(preload, 0)
  }, CROSSFADE_SETTLE_MS)
}

function cancelPreload(): void {
  preloadGeneration += 1
  if (preloadTimer !== undefined) clearTimeout(preloadTimer)
  preloadTimer = undefined
  if (preloadIdleHandle !== undefined && typeof window !== 'undefined') {
    const cancelIdle = (window as typeof window & { cancelIdleCallback?: (handle: number) => void }).cancelIdleCallback
    if (typeof cancelIdle === 'function') cancelIdle(preloadIdleHandle)
  }
  preloadIdleHandle = undefined
  if (preloadFallbackTimer !== undefined) clearTimeout(preloadFallbackTimer)
  preloadFallbackTimer = undefined
}

function canPreload(): boolean {
  if (document.visibilityState === 'hidden') return false
  if (typeof navigator === 'undefined') return true
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean, effectiveType?: string } }).connection
  if (connection?.saveData === true) return false
  return connection?.effectiveType !== 'slow-2g' && connection?.effectiveType !== '2g'
}

function scheduleFrame(callback: () => void): void {
  if (typeof requestAnimationFrame === 'function') {
    const handle = requestAnimationFrame(() => {
      scheduledFrames.delete(handle)
      callback()
    })
    scheduledFrames.add(handle)
    return
  }
  const handle = setTimeout(() => {
    scheduledFrameFallbacks.delete(handle)
    callback()
  }, 0)
  scheduledFrameFallbacks.add(handle)
}

function cancelScheduledFrames(): void {
  if (typeof cancelAnimationFrame === 'function') {
    for (const handle of scheduledFrames) cancelAnimationFrame(handle)
  }
  scheduledFrames.clear()
  for (const handle of scheduledFrameFallbacks) clearTimeout(handle)
  scheduledFrameFallbacks.clear()
}

function createWallpaperRoot(): HTMLElement {
  const root = document.createElement('div')
  root.id = WALLPAPER_ROOT_ID
  root.setAttribute('aria-hidden', 'true')
  root.dataset.enabled = 'false'

  for (let index = 0; index < 2; index += 1) {
    const layer = document.createElement('div')
    layer.className = WALLPAPER_LAYER_CLASS
    layer.dataset.active = 'false'
    root.append(layer)
  }

  document.body.prepend(root)
  return root
}

function getWallpaperLayers(root: HTMLElement): [HTMLElement, HTMLElement] {
  const layers = Array.from(root.getElementsByClassName(WALLPAPER_LAYER_CLASS)) as HTMLElement[]
  if (layers.length !== 2) {
    root.replaceChildren()
    activeLayerIndex = 0
    activePeriod = undefined
    for (let index = 0; index < 2; index += 1) {
      const layer = document.createElement('div')
      layer.className = WALLPAPER_LAYER_CLASS
      layer.dataset.active = 'false'
      root.append(layer)
    }
    return getWallpaperLayers(root)
  }
  return [layers[0], layers[1]]
}
