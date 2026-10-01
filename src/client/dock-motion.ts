const SURFACE = '[data-sidebar-right-panel] [data-dockkit-surface]'
const PANES = "[data-dockkit-host='dock']:not([hidden]) > [data-dockkit-pane]"

interface PaneBounds { width: number; left: number }
interface DockSurface {
  element: HTMLElement
  parent: HTMLElement
  split: boolean
  panes: Set<HTMLElement>
  bounds: Map<string, PaneBounds>
  parentWidth: number
  animation?: Animation
}

// DockKit observes its outer surface, not individual panes. Animate that surface
// on split removal so native room/focus logic sees the final width as well as
// every intermediate width. Native closure is never delayed or intercepted.
export function installDockCloseMotion(root: Document = document): () => void {
  const view = root.defaultView
  if (!view || !view.ResizeObserver || !view.MutationObserver) return () => {}
  const surfaces = new Map<HTMLElement, DockSurface>()
  const reduced = view.matchMedia('(prefers-reduced-motion: reduce)')
  let disposed = false

  const cancel = (state: DockSurface) => {
    state.animation?.cancel()
    state.animation = undefined
  }
  const cancelAll = () => surfaces.forEach(cancel)
  const sample = (state: DockSurface) => {
    const left = state.element.getBoundingClientRect().left
    state.bounds.clear()
    for (const pane of state.panes) {
      if (!pane.isConnected || pane.closest('[hidden]')) continue
      const rect = pane.getBoundingClientRect()
      state.bounds.set(pane.dataset.dockkitContent!, { width: rect.width, left: rect.left - left })
    }
  }
  const resize = new view.ResizeObserver(entries => {
    for (const state of surfaces.values()) {
      if (!entries.some(entry => entry.target === state.parent || entry.target === state.element || state.panes.has(entry.target as HTMLElement))) continue
      const parentWidth = state.parent.getBoundingClientRect().width
      if (Math.abs(parentWidth - state.parentWidth) > 0.5) cancel(state)
      state.parentWidth = parentWidth
      sample(state)
    }
  })
  const canAnimate = (state: DockSurface) => root.body.hasAttribute('data-asuka-school-theme')
    && root.body.dataset.asukaSchoolReduceMotion !== 'true' && !reduced.matches
    && state.element.closest('[data-sidebar-right-open]') !== null
    && root.querySelector('[data-dragging], [data-dockkit-pointer]') === null
    && state.element.querySelector("[data-dockkit-host='float']:not([hidden])") === null

  const sync = (state: DockSurface) => {
    const grid = state.element.firstElementChild
    const split = grid?.hasAttribute('data-dockkit-split') === true
    if (state.split && !split) {
      const survivor = grid?.querySelector<HTMLElement>(PANES)
      const from = survivor && state.bounds.get(survivor.dataset.dockkitContent!)
      cancel(state)
      const width = state.element.getBoundingClientRect().width
      if (from && from.width > 0 && width - from.width > 0.5 && canAnimate(state) && state.element.animate) {
        const style = view.getComputedStyle(state.element)
        const time = style.getPropertyValue('--ds-transition-duration-slow').trim()
        const duration = Number.parseFloat(time) * (time.endsWith('ms') ? 1 : 1000) || 300
        const animation = state.element.animate([
          { width: `${from.width}px`, marginLeft: `${Math.max(0, Math.min(from.left, width - from.width))}px`, flexGrow: 0, flexShrink: 0 },
          { width: `${width}px`, marginLeft: '0px', flexGrow: 0, flexShrink: 0 },
        ], { duration, easing: style.getPropertyValue('--ds-ease-in-out').trim() || 'ease-in-out' })
        state.animation = animation
        const settled = () => {
          if (disposed || state.animation !== animation) return
          state.animation = undefined
          sample(state)
        }
        void animation.finished.then(settled, settled)
      }
    } else if (split !== state.split) {
      cancel(state)
    }
    state.split = split
    const panes = new Set(state.element.querySelectorAll<HTMLElement>(PANES))
    for (const pane of state.panes) if (!panes.has(pane)) resize.unobserve(pane)
    for (const pane of panes) if (!state.panes.has(pane)) resize.observe(pane)
    state.panes = panes
    if (!state.animation) sample(state)
  }
  const attach = (element: HTMLElement) => {
    if (surfaces.has(element)) return
    const state: DockSurface = {
      element, parent: element.parentElement!, split: element.firstElementChild?.hasAttribute('data-dockkit-split') === true,
      panes: new Set(), bounds: new Map(), parentWidth: element.parentElement!.getBoundingClientRect().width,
    }
    surfaces.set(element, state)
    resize.observe(element)
    resize.observe(state.parent)
    sync(state)
  }
  const mutations = new view.MutationObserver(records => {
    const touched = new Set<HTMLElement>()
    for (const record of records) {
      if (record.type === 'attributes' && record.target === root.body) cancelAll()
      if (record.attributeName === 'data-dragging' || record.attributeName === 'data-dockkit-pointer') cancelAll()
      if (record.target instanceof view.Element) {
        const surface = record.target.closest<HTMLElement>(SURFACE)
        if (surface) touched.add(surface)
      }
      for (const node of record.addedNodes) {
        if (!(node instanceof view.HTMLElement)) continue
        if (node.matches(SURFACE)) attach(node)
        node.querySelectorAll<HTMLElement>(SURFACE).forEach(attach)
      }
    }
    for (const [element, state] of surfaces) {
      if (!element.isConnected) {
        cancel(state)
        resize.unobserve(element)
        resize.unobserve(state.parent)
        state.panes.forEach(pane => resize.unobserve(pane))
        surfaces.delete(element)
      } else if (touched.has(element)) sync(state)
    }
  })
  root.querySelectorAll<HTMLElement>(SURFACE).forEach(attach)
  mutations.observe(root.documentElement, {
    childList: true, subtree: true, attributes: true,
    attributeFilter: ['data-dockkit-split', 'data-dockkit-pointer', 'data-dragging', 'data-asuka-school-theme', 'data-asuka-school-reduce-motion'],
  })
  reduced.addEventListener('change', cancelAll)
  return () => {
    disposed = true
    mutations.disconnect()
    resize.disconnect()
    reduced.removeEventListener('change', cancelAll)
    cancelAll()
    surfaces.clear()
  }
}
