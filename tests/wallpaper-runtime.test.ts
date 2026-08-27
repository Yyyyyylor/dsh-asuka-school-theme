import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { applyWallpaper, clearWallpaper } from '../src/client/wallpaper/runtime.js'
import type { AsukaThemeSettings, WallpaperPeriod } from '../src/shared/settings.js'

class FakeStyle {
  readonly values = new Map<string, string>()
  setProperty(name: string, value: string) { this.values.set(name, value) }
  getPropertyValue(name: string) { return this.values.get(name) ?? '' }
}

class FakeElement {
  id = ''
  className = ''
  dataset: Record<string, string> = {}
  style = new FakeStyle()
  parentElement: FakeElement | null = null
  children: FakeElement[] = []
  attributes = new Map<string, string>()
  get isConnected(): boolean { return this === fakeDocument.body || this.parentElement?.isConnected === true }
  append(child: FakeElement) { child.parentElement = this; this.children.push(child) }
  prepend(child: FakeElement) { child.parentElement = this; this.children.unshift(child) }
  setAttribute(name: string, value: string) { this.attributes.set(name, value) }
  removeAttribute(name: string) { this.attributes.delete(name) }
  replaceChildren() { for (const child of this.children) child.parentElement = null; this.children = [] }
  remove() {
    if (this.parentElement === null) return
    this.parentElement.children = this.parentElement.children.filter(child => child !== this)
    this.parentElement = null
  }
  getElementsByClassName(className: string): FakeElement[] {
    return this.children.flatMap(child => [
      ...(child.className.split(/\s+/).includes(className) ? [child] : []),
      ...child.getElementsByClassName(className),
    ])
  }
}

let fakeDocument: { body: FakeElement, visibilityState: string, createElement: () => FakeElement, getElementById: (id: string) => FakeElement | null }
let imageInstances: FakeImage[]
let rafCallbacks: Map<number, FrameRequestCallback>
let nextRaf: number
let idleCallback: (() => void) | undefined

class FakeImage {
  onload: (() => void) | null = null
  onerror: (() => void) | null = null
  src = ''
  decode = vi.fn<() => Promise<void>>(() => Promise.resolve())
  constructor() { imageInstances.push(this) }
}

const settings = (wallpaperPeriod: AsukaThemeSettings['wallpaperPeriod'] = 'auto'): AsukaThemeSettings => ({
  mode: 'after-class',
  wallpaperEnabled: true,
  wallpaperPeriod,
  wallpaperOpacity: 0.2,
  wallpaperBlurPx: 0,
  decorativeDetails: true,
  reduceMotion: false,
})

function findById(root: FakeElement, id: string): FakeElement | null {
  if (root.id === id) return root
  for (const child of root.children) {
    const match = findById(child, id)
    if (match !== null) return match
  }
  return null
}

function drainFrames(): void {
  while (rafCallbacks.size > 0) {
    const batch = [...rafCallbacks.values()]
    rafCallbacks.clear()
    for (const callback of batch) callback(0)
  }
}

async function settle(): Promise<void> {
  for (let index = 0; index < 8; index += 1) await Promise.resolve()
}

function activeImage(): string {
  const root = fakeDocument.getElementById('asuka-school-wallpaper-root')!
  const active = root.children.find(layer => layer.dataset.active === 'true')
  return active?.style.getPropertyValue('--asuka-wallpaper-image') ?? ''
}

describe('wallpaper runtime', () => {
  beforeEach(() => {
    imageInstances = []
    rafCallbacks = new Map()
    nextRaf = 1
    idleCallback = undefined
    const body = new FakeElement()
    fakeDocument = {
      body,
      visibilityState: 'visible',
      createElement: () => new FakeElement(),
      getElementById: id => findById(body, id),
    }
    vi.stubGlobal('document', fakeDocument)
    vi.stubGlobal('window', {
      requestIdleCallback: (callback: () => void) => { idleCallback = callback; return 1 },
      cancelIdleCallback: () => { idleCallback = undefined },
    })
    vi.stubGlobal('navigator', { connection: { saveData: false, effectiveType: '4g' } })
    vi.stubGlobal('Image', FakeImage)
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
      const handle = nextRaf++
      rafCallbacks.set(handle, callback)
      return handle
    })
    vi.stubGlobal('cancelAnimationFrame', (handle: number) => { rafCallbacks.delete(handle) })
    clearWallpaper()
  })

  afterEach(() => {
    clearWallpaper()
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it('commits after onload even when decode rejects', async () => {
    applyWallpaper(settings('morning'), 'morning')
    expect(imageInstances).toHaveLength(1)
    imageInstances[0].decode.mockRejectedValueOnce(new Error('decoder cache race'))
    imageInstances[0].onload?.()
    await settle()
    drainFrames()

    expect(activeImage()).toContain('asuka-after-class.webp')
  })

  it('ignores a stale image completion during a rapid scene switch', async () => {
    applyWallpaper(settings('morning'), 'morning')
    const morning = imageInstances[0]
    applyWallpaper(settings('noon'), 'noon')
    const noon = imageInstances[1]

    morning.onload?.()
    await settle()
    drainFrames()
    expect(activeImage()).toBe('')

    noon.onload?.()
    await settle()
    drainFrames()
    expect(activeImage()).toContain('asuka-noon.webp')
  })

  it('does not let a late re-enable frame revive wallpaper after disable', async () => {
    applyWallpaper(settings('morning'), 'morning')
    imageInstances[0].onload?.()
    await settle()
    drainFrames()

    applyWallpaper({ ...settings('morning'), mode: 'off' }, 'morning')
    applyWallpaper(settings('morning'), 'morning')
    expect(rafCallbacks.size).toBe(1)

    applyWallpaper({ ...settings('morning'), mode: 'off' }, 'morning')
    drainFrames()

    const root = fakeDocument.getElementById('asuka-school-wallpaper-root')!
    expect(root.dataset.enabled).toBe('false')
    expect(root.children.some(layer => layer.dataset.active === 'true')).toBe(true)
  })

  it('reloads formally after a failed preload instead of reusing false', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
    applyWallpaper(settings('auto'), 'morning')
    imageInstances[0].onload?.()
    await settle()
    drainFrames()

    expect(activeImage()).toContain('asuka-after-class.webp')
    expect(vi.getTimerCount()).toBe(1)
    vi.runOnlyPendingTimers()
    expect(idleCallback).toBeTypeOf('function')
    idleCallback?.()
    expect(imageInstances).toHaveLength(2)
    const failedPreload = imageInstances[1]
    expect(failedPreload.src).toContain('asuka-noon.webp')
    failedPreload.onerror?.()
    await settle()

    applyWallpaper(settings('auto'), 'noon')
    await settle()
    expect(imageInstances).toHaveLength(3)
    expect(imageInstances[2].src).toContain('asuka-noon.webp')
    imageInstances[2].onload?.()
    await settle()
    drainFrames()

    expect(activeImage()).toContain('asuka-noon.webp')
  })

  it('keeps the active scene after two load failures and allows the scene to retry', async () => {
    applyWallpaper(settings('morning'), 'morning')
    imageInstances[0].onload?.()
    await settle()
    drainFrames()

    const root = fakeDocument.getElementById('asuka-school-wallpaper-root')!
    expect(root.dataset.enabled).toBe('true')
    expect(activeImage()).toContain('asuka-after-class.webp')

    applyWallpaper(settings('noon'), 'noon')
    imageInstances[1].onerror?.()
    await settle()
    expect(imageInstances).toHaveLength(3)
    imageInstances[2].onerror?.()
    await settle()
    drainFrames()

    expect(root.dataset.enabled).toBe('true')
    expect(activeImage()).toContain('asuka-after-class.webp')
    expect(root.children.some(layer => layer.dataset.active === 'true'
      && layer.style.getPropertyValue('--asuka-wallpaper-image').includes('asuka-noon.webp'))).toBe(false)

    applyWallpaper(settings('noon'), 'noon')
    expect(imageInstances).toHaveLength(4)
    expect(imageInstances[3].src).toContain('asuka-noon.webp')
    imageInstances[3].onload?.()
    await settle()
    drainFrames()
    expect(activeImage()).toContain('asuka-noon.webp')
  })

  it('keeps a first-load root disabled when both image attempts fail', async () => {
    applyWallpaper(settings('morning'), 'morning')
    imageInstances[0].onerror?.()
    await settle()
    imageInstances[1].onerror?.()
    await settle()
    drainFrames()

    const root = fakeDocument.getElementById('asuka-school-wallpaper-root')!
    expect(root.dataset.enabled).toBe('false')
    expect(root.children.some(layer => layer.dataset.active === 'true')).toBe(false)
  })

  it('uses the latest fixed policy when the same scene is still pending', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
    applyWallpaper(settings('auto'), 'morning')
    applyWallpaper(settings('morning'), 'morning')
    imageInstances[0].onload?.()
    await settle()
    drainFrames()

    await vi.advanceTimersByTimeAsync(1000)
    expect(imageInstances).toHaveLength(1)
    expect(idleCallback).toBeUndefined()
  })

  it('invalidates a queued idle preload when fixed mode cannot cancel it', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
    vi.stubGlobal('window', {
      requestIdleCallback: (callback: () => void) => { idleCallback = callback; return 1 },
    })
    applyWallpaper(settings('auto'), 'morning')
    imageInstances[0].onload?.()
    await settle()
    drainFrames()
    await vi.advanceTimersByTimeAsync(620)
    expect(idleCallback).toBeTypeOf('function')

    applyWallpaper(settings('morning'), 'morning')
    idleCallback?.()
    await settle()

    expect(imageInstances).toHaveLength(1)
  })

  it('does not preload when a fixed period is selected', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
    const fixed: WallpaperPeriod = 'morning'
    applyWallpaper(settings(fixed), fixed)
    imageInstances[0].onload?.()
    await settle()
    drainFrames()
    await vi.advanceTimersByTimeAsync(1000)
    expect(imageInstances).toHaveLength(1)
  })
})
