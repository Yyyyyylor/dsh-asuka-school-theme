import { describe, expect, it, vi } from 'vitest'
import { installDockCloseMotion } from '../src/client/dock-motion.js'

// A small observer/animation adapter checks direction, interruption and cleanup.
// Native DockKit room measurement and paint are verified in real DSH separately.
function fixture() {
  let split = true
  let mutation: MutationCallback
  let resized: ResizeObserverCallback
  class Element {
    isConnected = true
    parentElement?: Element
    dataset: Record<string, string> = {}
    width = 560
    left = 10
    firstElementChild?: Element
    getBoundingClientRect() { return { width: this.width, left: this.left } }
    closest(selector: string): Element | null {
      if (selector === '[hidden]') return null
      return selector === '[data-sidebar-right-open]' ? parent : surface
    }
    hasAttribute() { return split }
    querySelector() { return panes[0] }
    querySelectorAll() { return panes }
  }
  const parent = new Element()
  const surface = new Element()
  surface.parentElement = parent
  const grid = new Element()
  surface.firstElementChild = grid
  const left = new Element(), right = new Element()
  left.dataset.dockkitContent = 'left'
  right.dataset.dockkitContent = 'right'
  left.width = right.width = 280
  right.left = 290
  let panes = [left, right]
  const animation = { cancel: vi.fn(), finished: new Promise<void>(() => {}) }
  const animate = vi.fn(() => animation)
  Object.assign(surface, { animate, querySelector: () => null })
  const resize = { observe: vi.fn(), unobserve: vi.fn(), disconnect: vi.fn() }
  const mutations = { observe: vi.fn(), disconnect: vi.fn() }
  const media = Object.assign(new EventTarget(), { matches: false })
  const removedMedia = vi.spyOn(media, 'removeEventListener')
  const body = { hasAttribute: () => true, dataset: { asukaSchoolReduceMotion: 'false' } }
  const root = {
    body, documentElement: {}, querySelectorAll: () => [surface], querySelector: () => null,
    defaultView: {
      Element, HTMLElement: Element,
      ResizeObserver: class { constructor(callback: ResizeObserverCallback) { resized = callback; return resize } },
      MutationObserver: class { constructor(callback: MutationCallback) { mutation = callback; return mutations } },
      matchMedia: () => media,
      getComputedStyle: () => ({ getPropertyValue: (key: string) => key.endsWith('slow') ? '300ms' : 'ease-in-out' }),
    },
  }
  return {
    root: root as unknown as Document, resize, mutations, animate, animation, media, body, removedMedia,
    collapse(side: 'left' | 'right') {
      split = false
      panes = [side === 'left' ? left : right]
      panes[0]!.width = 560
      panes[0]!.left = 10
      mutation!([{ type: 'attributes', target: grid, attributeName: 'data-dockkit-split', addedNodes: [] } as unknown as MutationRecord], {} as MutationObserver)
    },
    resizeParent() {
      parent.width = 620
      resized!([{ target: parent } as unknown as ResizeObserverEntry], {} as ResizeObserver)
    },
  }
}

describe('dock close motion', () => {
  it.each(['left', 'right'] as const)('expands the surviving %s pane from its previous position through the observed surface', side => {
    const f = fixture()
    const dispose = installDockCloseMotion(f.root)
    f.collapse(side)
    expect(f.animate).toHaveBeenCalledWith([
      { width: '280px', marginLeft: side === 'left' ? '0px' : '280px', flexGrow: 0, flexShrink: 0 },
      { width: '560px', marginLeft: '0px', flexGrow: 0, flexShrink: 0 },
    ], { duration: 300, easing: 'ease-in-out' })
    dispose()
    expect(f.animation.cancel).toHaveBeenCalledOnce()
    expect(f.resize.disconnect).toHaveBeenCalledOnce()
    expect(f.mutations.disconnect).toHaveBeenCalledOnce()
    expect(f.removedMedia).toHaveBeenCalledWith('change', expect.any(Function))
  })

  it('cancels stale width targets when the parent is resized', () => {
    const f = fixture()
    const dispose = installDockCloseMotion(f.root)
    f.collapse('right')
    f.resizeParent()
    expect(f.animation.cancel).toHaveBeenCalledOnce()
    dispose()
  })

  it.each(['plugin', 'system'])('skips motion for the %s reduced-motion preference', preference => {
    const f = fixture()
    if (preference === 'plugin') f.body.dataset.asukaSchoolReduceMotion = 'true'
    else f.media.matches = true
    const dispose = installDockCloseMotion(f.root)
    f.collapse('left')
    expect(f.animate).not.toHaveBeenCalled()
    dispose()
  })
})
