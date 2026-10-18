const FRAME = 'div:has(> [data-rightbar-col])'
const PANEL = '[data-sidebar-right-panel]'
const MARKER = 'data-asuka-narrow-rightbar'
const BUTTON_MARKER = 'data-asuka-rightbar-mode'
const WIDTHS = ['--asuka-narrow-sidebar-width', '--asuka-narrow-panel-width', '--asuka-narrow-track-width', '--asuka-narrow-full-width'] as const

/** Keep the host's left rail, divide the remaining room without an overlay. */
export function narrowRightbarWidths(width: number, sidebar: number) {
  const left = Math.max(0, Math.min(width, sidebar))
  return { left, right: Math.min(340, Math.max(0, width - left) * 0.45) }
}

interface FrameState {
  marker: string | null
  styles: Array<{ value: string, priority: string }>
  panel?: HTMLElement
  fullscreen: boolean
  button?: HTMLElement
  label: string | null
  appliedLabel?: string
  buttonMarker?: string | null
  tooltip?: { element: HTMLElement, text: Text, label: string, aria: string | null, appliedLabel: string, appliedAria: string | null }
}

/** Use the host's effective binding, including user-customized modifiers. */
export function matchesRightbarShortcut(event: KeyboardEvent, shortcut: string): boolean {
  if (event.isComposing || event.keyCode === 229 || event.getModifierState('AltGraph')) return false
  return shortcut.split(/\s+/).some(binding => {
    const parts = binding.split('+')
    const key = parts.pop()?.toLowerCase()
    const modifiers = new Set(parts.map(part => part.toLowerCase()))
    if (!key || [...modifiers].some(part => !['control', 'alt', 'shift', 'meta'].includes(part))) return false
    const code = event.code.replace(/^(Key|Digit)/, '').toLowerCase()
    return (key === code || key === event.key.toLowerCase() && !event.code.startsWith('Numpad'))
      && event.ctrlKey === modifiers.has('control') && event.altKey === modifiers.has('alt')
      && event.shiftKey === modifiers.has('shift') && event.metaKey === modifiers.has('meta')
  })
}

/** DSH derives fullscreen below 768px. Adapt only that presentation, leaving
 * its mounted docks, navigation, focus and slide lifecycle under native control. */
export function installNarrowRightbarLayout(root: Document = document): () => void {
  const view = root.defaultView
  if (!view?.MutationObserver || !view.ResizeObserver) return () => {}
  const states = new Map<HTMLElement, FrameState>()
  let pending = 0
  let disposed = false
  let composing = false
  const restoreTooltip = (state: FrameState) => {
    const tip = state.tooltip
    if (!tip) return
    if (tip.text.data === tip.appliedLabel) tip.text.data = tip.label
    if (tip.element.getAttribute('aria-label') === tip.appliedAria) {
      if (tip.aria === null) tip.element.removeAttribute('aria-label')
      else tip.element.setAttribute('aria-label', tip.aria)
    }
    state.tooltip = undefined
  }
  const restoreLabel = (state: FrameState) => {
    restoreTooltip(state)
    if (state.button) {
      if (state.button.getAttribute('aria-label') === state.appliedLabel) {
        if (state.label === null) state.button.removeAttribute('aria-label')
        else state.button.setAttribute('aria-label', state.label)
      }
      if (state.buttonMarker == null) state.button.removeAttribute(BUTTON_MARKER)
      else state.button.setAttribute(BUTTON_MARKER, state.buttonMarker)
      state.button = undefined
      state.appliedLabel = undefined
    }
  }
  const restore = (frame: HTMLElement, state: FrameState) => {
    restoreLabel(state)
    if (state.marker === null) frame.removeAttribute(MARKER)
    else frame.setAttribute(MARKER, state.marker)
    WIDTHS.forEach((name, index) => {
      const saved = state.styles[index]!
      if (saved.value) frame.style.setProperty(name, saved.value, saved.priority)
      else frame.style.removeProperty(name)
    })
    resize.unobserve(frame)
    states.delete(frame)
  }
  const sync = () => {
    pending = 0
    if (disposed) return
    const active = root.body.hasAttribute('data-asuka-school-theme')
    const frames = new Set(root.querySelectorAll<HTMLElement>(FRAME))
    for (const [frame, state] of states) {
      if (!active || !frames.has(frame) || frame.getBoundingClientRect().width >= 768) restore(frame, state)
    }
    if (!active) return
    for (const frame of frames) {
      const width = frame.getBoundingClientRect().width
      if (width >= 768 || width <= 0) continue
      const panel = frame.querySelector<HTMLElement>(`${PANEL}:not([hidden], [hidden] *)`)
      if (!panel) {
        const state = states.get(frame)
        if (state) restore(frame, state)
        continue
      }
      let state = states.get(frame)
      if (!state) {
        state = { marker: frame.getAttribute(MARKER), styles: WIDTHS.map(name => ({
          value: frame.style.getPropertyValue(name), priority: frame.style.getPropertyPriority(name),
        })), fullscreen: false, label: null }
        states.set(frame, state)
        resize.observe(frame)
      }
      if (state.panel !== panel) { restoreLabel(state); state.panel = panel; state.fullscreen = false }
      // Read the host's requested first track, never our interpolated grid.
      const sidebar = Number.parseFloat(frame.style.gridTemplateColumns) || 0
      const sizes = narrowRightbarWidths(width, sidebar)
      const values = [`${sizes.left}px`, `${sizes.right}px`, panel.hasAttribute('data-sidebar-right-open') ? `${sizes.right}px` : '0px', `${width}px`]
      WIDTHS.forEach((name, index) => {
        if (frame.style.getPropertyValue(name) !== values[index]) frame.style.setProperty(name, values[index]!)
      })
      // Keep the panel's presentation through its native exit slide. Closing
      // releases the frame track in CSS without shrinking a fullscreen pane.
      const fullscreen = state.fullscreen
      const mode = fullscreen ? 'fullscreen' : 'push'
      if (frame.getAttribute(MARKER) !== mode) frame.setAttribute(MARKER, mode)
      const button = panel.querySelector<HTMLElement>('[data-sidebar-right-mode]')
      if (button !== state.button) {
        restoreLabel(state)
        state.button = button ?? undefined
        state.label = button?.getAttribute('aria-label') ?? null
        state.buttonMarker = button?.getAttribute(BUTTON_MARKER) ?? null
      }
      if (button) {
        // React can update copy when the locale changes. Preserve that native
        // value for restoration instead of treating our previous label as copy.
        const nativeLabel = button.getAttribute('aria-label')
        if (nativeLabel !== state.appliedLabel) state.label = nativeLabel
        const chinese = /[\u4e00-\u9fff]/.test(state.label ?? '')
        const label = fullscreen ? (chinese ? '退出全屏' : 'Exit fullscreen') : (chinese ? '全屏' : 'Fullscreen')
        if (button.getAttribute('aria-label') !== label) button.setAttribute('aria-label', label)
        state.appliedLabel = label
        button.setAttribute(BUTTON_MARKER, mode)
        // Native Tooltip is a sibling in PanelChrome's fragment. Update only
        // its label text node, retaining the host's keycaps, placement and refs.
        const tip = button.nextElementSibling
        const text = tip?.matches('[role="tooltip"]') ? tip.firstElementChild?.firstChild : null
        if (state.tooltip?.element !== tip || state.tooltip?.text !== text) restoreTooltip(state)
        if (tip instanceof view.HTMLElement && text instanceof view.Text) {
          const saved = state.tooltip ??= { element: tip, text, label: text.data,
            aria: tip.getAttribute('aria-label'), appliedLabel: text.data, appliedAria: tip.getAttribute('aria-label') }
          if (text.data !== saved.appliedLabel) saved.label = text.data
          if (tip.getAttribute('aria-label') !== saved.appliedAria) saved.aria = tip.getAttribute('aria-label')
          const aria = saved.aria?.startsWith(saved.label) ? label + saved.aria.slice(saved.label.length) : saved.aria
          if (text.data !== label) text.data = label
          if (aria !== null && tip.getAttribute('aria-label') !== aria) tip.setAttribute('aria-label', aria)
          saved.appliedLabel = label
          saved.appliedAria = aria
        }
      }
    }
  }
  const schedule = () => { if (!disposed && !pending) pending = view.requestAnimationFrame(sync) }
  const resize = new view.ResizeObserver(schedule)
  const mutations = new view.MutationObserver(records => {
    if (records.some(record => record.type === 'characterData'
      ? record.target.parentElement?.closest('[role="tooltip"]') != null
      : record.type === 'childList'
      ? [...record.addedNodes, ...record.removedNodes].some(node => node instanceof view.HTMLElement
        && (node.matches(`${FRAME}, ${PANEL}, [data-sidebar-right-mode], [role="tooltip"]`) || node.querySelector(PANEL)))
      : record.target === root.body || (record.target instanceof view.HTMLElement
        && (record.target.matches(`${FRAME}, ${PANEL}, [data-sidebar-right-mode], [role="tooltip"]`) || record.attributeName === 'hidden')))) schedule()
  })
  mutations.observe(root.body, { childList: true, subtree: true, attributes: true, characterData: true,
    attributeFilter: ['style', 'hidden', 'aria-label', 'data-sidebar-right-open', 'data-sidebar-right-panel', 'data-asuka-school-theme'] })
  const toggle = (event: MouseEvent) => {
    if (!(event.target instanceof view.Element)) return
    const button = event.target.closest('[data-sidebar-right-mode]')
    const frame = button?.closest<HTMLElement>(FRAME)
    const state = frame && states.get(frame)
    if (!frame || !state || !root.body.hasAttribute('data-asuka-school-theme') || frame.getBoundingClientRect().width >= 768) return
    // Native automatic-fullscreen exit collapses the panel. Keep its button
    // activation, but return to our narrow push layout without closing the dock.
    event.preventDefault()
    event.stopPropagation()
    state.fullscreen = !state.fullscreen
    sync()
  }
  const keydown = (event: KeyboardEvent) => {
    // Run after local controls, before the host's window-bubble dispatcher.
    // Match its modal/focus boundaries and never steal composing/local input.
    if (event.defaultPrevented || composing || !(event.target instanceof view.Element)
      || root.querySelector('[role="dialog"][aria-modal="true"], [role="menu"]')) return
    const panel = event.target.closest<HTMLElement>(PANEL)
    const frame = panel?.closest<HTMLElement>(FRAME)
    const state = frame && states.get(frame)
    const button = state?.button
    if (!frame || !panel?.hasAttribute('data-sidebar-right-open') || !state || !button
      || event.target.closest('[data-dockkit-host="dock"]') === null
      || event.target.closest('[hidden], [inert]') || button.hasAttribute('disabled')
      || !root.body.hasAttribute('data-asuka-school-theme') || frame.getBoundingClientRect().width >= 768
      || !matchesRightbarShortcut(event, button.getAttribute('aria-keyshortcuts') ?? '')) return
    event.preventDefault()
    if (!event.repeat) { state.fullscreen = !state.fullscreen; sync() }
  }
  const compositionStart = () => { composing = true }
  const compositionEnd = () => { composing = false }
  root.addEventListener('click', toggle, true)
  root.addEventListener('keydown', keydown)
  root.addEventListener('compositionstart', compositionStart, true)
  root.addEventListener('compositionend', compositionEnd, true)
  view.addEventListener('blur', compositionEnd)
  sync()
  return () => {
    disposed = true
    if (pending) view.cancelAnimationFrame(pending)
    mutations.disconnect()
    resize.disconnect()
    root.removeEventListener('click', toggle, true)
    root.removeEventListener('keydown', keydown)
    root.removeEventListener('compositionstart', compositionStart, true)
    root.removeEventListener('compositionend', compositionEnd, true)
    view.removeEventListener('blur', compositionEnd)
    for (const [frame, state] of states) restore(frame, state)
  }
}
