const SVG_NS = 'http://www.w3.org/2000/svg'
const SURFACES = [
  '[data-composer-card]',
  "[data-slot='sidebar'] > *",
  'header:has(> [data-conversation-header-leading])',
  "[data-sidebar-right-panel] [data-dockkit-host='dock'] > [data-dockkit-pane]",
  '[data-sidebar-right-panel] [data-dockkit-empty]',
  "[data-menu-material='translucent']",
  "div[role='presentation']:has(> [aria-hidden='true'] + [role='dialog'][aria-modal='true']) > [role='dialog'][aria-modal='true']",
].join(',')

/** A rounded-rectangle lens: neutral center, smooth inward sampling at its rim.
 * R/G encode signed displacement; no noise, copied wallpaper or animated map. */
export function createLensMap(width: number, height: number, radius: number): {
  width: number, height: number, pixels: Uint8ClampedArray, scale: number
} {
  const ratio = Math.min(1, 512 / Math.max(width, height))
  const w = Math.max(2, Math.round(width * ratio))
  const h = Math.max(2, Math.round(height * ratio))
  const r = Math.max(1, Math.min(radius, width / 2, height / 2))
  const rim = Math.min(18, Math.max(6, r * 0.85), Math.min(width, height) / 3)
  const pixels = new Uint8ClampedArray(w * h * 4)
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const px = (x + 0.5) * width / w - width / 2
      const py = (y + 0.5) * height / h - height / 2
      const qx = Math.abs(px) - (width / 2 - r)
      const qy = Math.abs(py) - (height / 2 - r)
      const ax = Math.max(qx, 0), ay = Math.max(qy, 0)
      const length = Math.hypot(ax, ay)
      const distance = r - (length + Math.min(Math.max(qx, qy), 0))
      let nx = 0, ny = 0
      if (length > 0) { nx = ax / length; ny = ay / length }
      else if (qx > qy) nx = 1
      else ny = 1
      // A curved shoulder, peaking just inside the edge and fading to a flat
      // center. Keep outside pixels neutral to avoid colored clipping fringes.
      const t = Math.max(0, Math.min(1, distance / rim))
      const bend = distance >= 0 && distance < rim ? Math.sin(Math.PI * t) * 0.48 : 0
      const offset = (y * w + x) * 4
      pixels[offset] = Math.round(127.5 - Math.sign(px) * nx * bend * 255)
      pixels[offset + 1] = Math.round(127.5 - Math.sign(py) * ny * bend * 255)
      pixels[offset + 2] = 128
      pixels[offset + 3] = 255
    }
  }
  return { width: w, height: h, pixels, scale: rim * 1.65 }
}

interface Lens {
  filter: SVGFilterElement
  size: string
  ready: boolean
  property: string
  priority: string
  attribute: string | null
}

/** Chromium's same-document SVG backdrop path is an enhancement. Other engines,
 * missing canvas/observers and map failures retain the existing frosted glass.
 * This is Web refraction of the page, not an OS/native Liquid Glass material. */
export function installLiquidGlass(root: Document = document): () => void {
  const view = root.defaultView
  if (!view || !view.ResizeObserver || !view.MutationObserver
    || !/\b(?:Chrome|Chromium|Edg)\//.test(view.navigator.userAgent)
    || !view.CSS?.supports('backdrop-filter', 'url("#asuka-lens-probe")')) return () => {}
  const canvas = root.createElement('canvas')
  const context = canvas.getContext('2d')
  if (!context) return () => {}
  const svg = root.createElementNS(SVG_NS, 'svg')
  svg.setAttribute('aria-hidden', 'true')
  svg.setAttribute('width', '0')
  svg.setAttribute('height', '0')
  svg.style.cssText = 'position:absolute;pointer-events:none;overflow:hidden'
  const defs = root.createElementNS(SVG_NS, 'defs')
  svg.append(defs)
  root.body.append(svg)
  const lenses = new Map<HTMLElement, Lens>()
  const reduced = view.matchMedia('(prefers-reduced-motion: reduce)')
  let sequence = 0, timer = 0, frame = 0, disposed = false
  let light: HTMLElement | undefined
  let pointer: { element: HTMLElement, x: number, y: number } | undefined
  const active = () => root.body.hasAttribute('data-asuka-school-theme')
  const motion = () => active() && !reduced.matches && root.body.dataset.asukaSchoolReduceMotion !== 'true'
  const clearLight = () => {
    light?.style.removeProperty('--asuka-liquid-light-x')
    light?.style.removeProperty('--asuka-liquid-light-y')
    light = undefined
    pointer = undefined
    if (frame) view.cancelAnimationFrame(frame)
    frame = 0
  }
  const release = (element: HTMLElement, lens: Lens) => {
    resize.unobserve(element)
    lens.filter.remove()
    if (lens.attribute === null) element.removeAttribute('data-asuka-liquid-glass')
    else element.setAttribute('data-asuka-liquid-glass', lens.attribute)
    if (lens.property) element.style.setProperty('--asuka-liquid-filter', lens.property, lens.priority)
    else element.style.removeProperty('--asuka-liquid-filter')
    if (light === element) clearLight()
    lenses.delete(element)
  }
  const primitive = (name: string, attributes: Record<string, string>) => {
    const node = root.createElementNS(SVG_NS, name)
    for (const [key, value] of Object.entries(attributes)) node.setAttribute(key, value)
    return node
  }
  const update = (element: HTMLElement, lens: Lens) => {
    const rect = element.getBoundingClientRect()
    const width = Math.round(rect.width), height = Math.round(rect.height)
    if (width < 2 || height < 2 || element.closest('[hidden]')) {
      element.removeAttribute('data-asuka-liquid-glass')
      return
    }
    const radius = Number.parseFloat(view.getComputedStyle(element).borderTopLeftRadius) || 16
    const size = `${width}:${height}:${radius}`
    if (lens.size === size) {
      if (lens.ready) element.setAttribute('data-asuka-liquid-glass', 'true')
      return
    }
    lens.size = size
    lens.ready = false
    element.removeAttribute('data-asuka-liquid-glass')
    try {
      const map = createLensMap(width, height, radius)
      canvas.width = map.width
      canvas.height = map.height
      const data = context.createImageData(map.width, map.height)
      data.data.set(map.pixels)
      context.putImageData(data, 0, 0)
      const href = canvas.toDataURL()
      lens.filter.replaceChildren(primitive('feImage', {
        href, x: '0', y: '0', width: String(width), height: String(height),
        preserveAspectRatio: 'none', result: 'lens',
      }))
      const displace = (result: string, scale: number) => primitive('feDisplacementMap', {
        in: 'SourceGraphic', in2: 'lens', scale: String(scale), xChannelSelector: 'R', yChannelSelector: 'G', result,
      })
      lens.filter.append(displace('refracted', map.scale))
      // Restrained optical dispersion only on compact controls. Large reading
      // and navigation panes use a single displacement pass.
      if (width * height < 220_000 && element.matches('[data-composer-card], [data-menu-material], header')) {
        lens.filter.append(
          primitive('feColorMatrix', { in: 'refracted', type: 'matrix', values: '0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0', result: 'green' }),
          displace('red-offset', map.scale + 0.8),
          primitive('feColorMatrix', { in: 'red-offset', type: 'matrix', values: '1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0', result: 'red' }),
          displace('blue-offset', map.scale - 0.8),
          primitive('feColorMatrix', { in: 'blue-offset', type: 'matrix', values: '0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0', result: 'blue' }),
          primitive('feComposite', { in: 'green', in2: 'red', operator: 'arithmetic', k2: '1', k3: '1', result: 'red-green' }),
          primitive('feComposite', { in: 'red-green', in2: 'blue', operator: 'arithmetic', k2: '1', k3: '1' }),
        )
      }
      // Verify that this document can actually decode the data image (including
      // its CSP) before enabling an SVG filter that depends on it.
      const image = new view.Image()
      image.src = href
      void image.decode().then(() => {
        if (disposed || !active() || lenses.get(element) !== lens || lens.size !== size) return
        lens.ready = true
        element.style.setProperty('--asuka-liquid-filter', `url("#${lens.filter.id}")`)
        element.setAttribute('data-asuka-liquid-glass', 'true')
      }, () => { /* Remain on frosted glass until a different size is requested. */ })
    } catch {
      // A blocked data image or unavailable encoder must not blank the surface.
      element.removeAttribute('data-asuka-liquid-glass')
    }
  }
  const sync = () => {
    timer = 0
    if (disposed) return
    if (!motion()) clearLight()
    const found = active() ? new Set(root.querySelectorAll<HTMLElement>(SURFACES)) : new Set<HTMLElement>()
    for (const [element, lens] of lenses) if (!found.has(element)) release(element, lens)
    for (const element of found) {
      let lens = lenses.get(element)
      if (!lens) {
        if (lenses.size >= 12) continue
        const filter = root.createElementNS(SVG_NS, 'filter')
        filter.id = `asuka-liquid-lens-${++sequence}`
        filter.setAttribute('filterUnits', 'objectBoundingBox')
        filter.setAttribute('primitiveUnits', 'userSpaceOnUse')
        filter.setAttribute('x', '0')
        filter.setAttribute('y', '0')
        filter.setAttribute('width', '1')
        filter.setAttribute('height', '1')
        filter.setAttribute('color-interpolation-filters', 'sRGB')
        defs.append(filter)
        lens = { filter, size: '', ready: false, property: element.style.getPropertyValue('--asuka-liquid-filter'),
          priority: element.style.getPropertyPriority('--asuka-liquid-filter'), attribute: element.getAttribute('data-asuka-liquid-glass') }
        lenses.set(element, lens)
        resize.observe(element)
      }
      update(element, lens)
    }
  }
  const schedule = () => {
    if (timer) view.clearTimeout(timer)
    timer = view.setTimeout(sync, 100)
  }
  const resize = new view.ResizeObserver(entries => {
    // During native resize/split motion use the frosted fallback. Rasterize once
    // dimensions settle, rather than rebuilding maps on every animation frame.
    for (const entry of entries) (entry.target as HTMLElement).removeAttribute('data-asuka-liquid-glass')
    schedule()
  })
  const tree = new view.MutationObserver(records => {
    // Ignore streamed text and our own SVG primitives. Discover only structural
    // surface additions/removals, rather than rescanning the page per token.
    const changed = [...lenses.keys()].some(element => !element.isConnected)
      || records.some(record => [...record.addedNodes].some(node => node instanceof view.HTMLElement
        && (node.matches(SURFACES) || node.querySelector(SURFACES))))
    if (changed && !timer) timer = view.setTimeout(sync, 100)
  })
  tree.observe(root.body, { childList: true, subtree: true })
  const appearance = new view.MutationObserver(() => {
    if (!active()) for (const [element, lens] of lenses) release(element, lens)
    if (!motion()) clearLight()
    schedule()
  })
  appearance.observe(root.body, { attributes: true, attributeFilter: ['data-asuka-school-theme', 'data-asuka-school-scene', 'data-asuka-school-reduce-motion'] })
  const move = (event: PointerEvent) => {
    if (!motion() || event.pointerType === 'touch') return
    const element = event.target instanceof view.Element ? event.target.closest<HTMLElement>(SURFACES) : null
    if (!element || !lenses.has(element)) { clearLight(); return }
    if (light !== element) { clearLight(); light = element }
    const rect = element.getBoundingClientRect()
    pointer = { element, x: (event.clientX - rect.left) / rect.width * 100, y: (event.clientY - rect.top) / rect.height * 100 }
    if (frame) return
    frame = view.requestAnimationFrame(() => {
      frame = 0
      if (!pointer || !motion()) return
      pointer.element.style.setProperty('--asuka-liquid-light-x', `${pointer.x.toFixed(1)}%`)
      pointer.element.style.setProperty('--asuka-liquid-light-y', `${pointer.y.toFixed(1)}%`)
    })
  }
  root.addEventListener('pointermove', move, { passive: true })
  root.addEventListener('pointerleave', clearLight)
  reduced.addEventListener('change', clearLight)
  sync()
  return () => {
    disposed = true
    if (timer) view.clearTimeout(timer)
    clearLight()
    tree.disconnect()
    appearance.disconnect()
    resize.disconnect()
    for (const [element, lens] of lenses) release(element, lens)
    svg.remove()
    root.removeEventListener('pointermove', move)
    root.removeEventListener('pointerleave', clearLight)
    reduced.removeEventListener('change', clearLight)
  }
}
