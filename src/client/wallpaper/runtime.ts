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

/** Update only plugin-owned document attributes; no DSH component selectors are involved. */
export function applyWallpaper(settings: AsukaThemeSettings, period: WallpaperPeriod): void {
  if (typeof document === 'undefined' || document.body === null) return
  const body = document.body
  const enabled = settings.mode !== 'off' && settings.wallpaperEnabled
  body.setAttribute(ATTRIBUTE_ENABLED, enabled ? 'true' : 'false')
  body.setAttribute(ATTRIBUTE_MODE, settings.mode)
  body.setAttribute(ATTRIBUTE_DETAILS, settings.decorativeDetails ? 'true' : 'false')
  body.setAttribute(ATTRIBUTE_REDUCED_MOTION, settings.reduceMotion ? 'true' : 'false')
  body.setAttribute(ATTRIBUTE_SCENE, period)
  const root = document.getElementById(WALLPAPER_ROOT_ID) as HTMLElement | null
  if (!enabled) {
    if (root !== null) root.dataset.enabled = 'false'
    return
  }

  const created = root === null
  const layers = getWallpaperLayers(root ?? createWallpaperRoot())
  const wallpaperRoot = layers[0].parentElement as HTMLElement
  const wasEnabled = wallpaperRoot.dataset.enabled === 'true'
  wallpaperRoot.style.setProperty('--asuka-wallpaper-opacity', String(wallpaperOpacityForPeriod(settings.wallpaperOpacity, period)))
  wallpaperRoot.style.setProperty('--asuka-wallpaper-blur', `${settings.wallpaperBlurPx}px`)

  if (period === activePeriod) {
    if (!wasEnabled) {
      wallpaperRoot.dataset.enabled = 'false'
      void wallpaperRoot.offsetWidth
      wallpaperRoot.dataset.enabled = 'true'
    }
    return
  }
  const nextIndex = activePeriod === undefined ? activeLayerIndex : 1 - activeLayerIndex
  const nextLayer = layers[nextIndex]
  const previousLayer = layers[1 - nextIndex]
  const profile = wallpaperLayerProfileForPeriod(period)
  nextLayer.style.setProperty('--asuka-wallpaper-image', `url("${wallpaperAssetUrl(period)}")`)
  nextLayer.style.setProperty('--asuka-wallpaper-mask-start', profile.maskStart)
  nextLayer.style.setProperty('--asuka-wallpaper-mask-middle', profile.maskMiddle)
  nextLayer.style.setProperty('--asuka-wallpaper-mask-end', profile.maskEnd)
  nextLayer.style.setProperty('--asuka-wallpaper-filter', profile.filter)
  nextLayer.dataset.active = 'false'
  if (created) wallpaperRoot.dataset.enabled = 'false'
  // Force the initial 0-opacity state to be committed before entering it.
  void nextLayer.offsetWidth
  wallpaperRoot.dataset.enabled = 'true'
  nextLayer.dataset.active = 'true'
  previousLayer.dataset.active = 'false'
  activeLayerIndex = nextIndex
  activePeriod = period
}

/** Remove exactly the document state this plugin owns. */
export function clearWallpaper(): void {
  if (typeof document === 'undefined') return
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
