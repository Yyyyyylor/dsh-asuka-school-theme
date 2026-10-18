import { describe, expect, it } from 'vitest'
import { ASUKA_STYLES } from '../src/client/styles.js'

describe('wallpaper compositing styles', () => {
  it('animates menu labels once per surface without filtering or moving popup ancestors', () => {
    const motion = ASUKA_STYLES.slice(ASUKA_STYLES.indexOf('/* Drive one entrance per MenuSurface mount'), ASUKA_STYLES.indexOf('/* Presented deliverables'))
    const surface = motion.split("body[data-asuka-school-theme] [data-menu-material='translucent'] {")[1]?.split('}')[0]
    expect(surface).toContain('--asuka-menu-progress: 1;')
    expect(surface).toContain('animation: asuka-menu-content-enter 180ms')
    expect(surface).not.toMatch(/opacity:|transform:|translate:|filter:|will-change:/)
    expect(motion).toContain("@property --asuka-menu-progress { syntax: '<number>'; inherits: true; initial-value: 1; }")
    expect(motion).toContain("button > :is(span, svg):not(:has([data-menu-material]))")
    expect(motion).toContain('translate: 0 calc((1 - var(--asuka-menu-progress)) * 4px);')
    expect(motion).not.toContain("[aria-hidden='true']:first-child")
    expect(motion).toContain("[data-asuka-school-reduce-motion='true'] [data-menu-material='translucent'] {\n  animation: none;")
    expect(motion).toContain("@media (prefers-reduced-motion: reduce) {\n  body[data-asuka-school-theme] [data-menu-material='translucent'] { animation: none; }")
  })

  it('gives light settings readable labels and native options an opaque color pair', () => {
    expect(ASUKA_STYLES).toContain("body[data-asuka-school-theme='light'] div[role='presentation']")
    expect(ASUKA_STYLES).toContain('--dsw-alias-label-tertiary: #304452;')
    expect(ASUKA_STYLES).toContain('color-scheme: light;')
    expect(ASUKA_STYLES).toContain('color-scheme: dark;')
    expect(ASUKA_STYLES).toContain("[role='dialog'][aria-modal='true'] select option")
    expect(ASUKA_STYLES).toContain('background-color: var(--asuka-settings-control-bg);')
    expect(ASUKA_STYLES).toContain('--dsw-alias-bg-module-platform: var(--asuka-settings-glass-layer-3);')
  })

  it('keeps the wallpaper visible above the app shell and keeps each crossfading layer self-contained', () => {
    expect(ASUKA_STYLES).toContain('#asuka-school-wallpaper-root {\n  position: fixed;\n  inset: 0;\n  z-index: 1;')
    expect(ASUKA_STYLES).not.toContain('body > :not(#asuka-school-wallpaper-root)')
    expect(ASUKA_STYLES).toContain('var(--asuka-wallpaper-mask-start)')
    expect(ASUKA_STYLES).toContain('opacity 560ms cubic-bezier')
    const root = ASUKA_STYLES.match(/#asuka-school-wallpaper-root \{([^}]+)\}/)?.[1]
    expect(root).not.toMatch(/\bfilter:/)
    expect(ASUKA_STYLES).toContain('filter: var(--asuka-wallpaper-filter, saturate(0.88) contrast(0.98)) blur(var(--asuka-wallpaper-blur, 0px));')
  })

  it('protects the DSH sidebar and transitions surfaces without inherited-token animation', () => {
    expect(ASUKA_STYLES).toContain("body[data-asuka-school-theme] [data-slot='sidebar'] > *")
    expect(ASUKA_STYLES).toContain('z-index: 2;')
    expect(ASUKA_STYLES).toContain("body[data-asuka-school-theme]:not([data-asuka-school-reduce-motion='true'])")
    expect(ASUKA_STYLES).not.toContain('@property --dsw-')
    expect(ASUKA_STYLES).toContain('transition: background-color 520ms')
    expect(ASUKA_STYLES).toContain('will-change: opacity;')
    expect(ASUKA_STYLES).not.toContain('filter 420ms ease')
    expect(ASUKA_STYLES).not.toContain('backdrop-filter 560ms ease-in-out')
    expect(ASUKA_STYLES).not.toContain("body[data-asuka-school-transitioning='true'] :is(")
  })

  it('layers a frosted mask and scene-aware liquid glass only on the settings modal', () => {
    const settingsDialog = "div[role='presentation']:has(> [aria-hidden='true'] + [role='dialog'][aria-modal='true']) > [role='dialog'][aria-modal='true']"

    expect(ASUKA_STYLES).toContain('--asuka-settings-glass-surface:')
    expect(ASUKA_STYLES).toContain(`body[data-asuka-school-theme] ${settingsDialog} {`)
    expect(ASUKA_STYLES).toContain("body[data-asuka-school-theme][data-asuka-school-scene='night'] {")
    expect(ASUKA_STYLES).toContain('backdrop-filter: blur(2px) saturate(1.15) brightness(var(--asuka-settings-mask-brightness));')
    expect(ASUKA_STYLES).toContain('--asuka-settings-glass-blur: 48px;')
    expect(ASUKA_STYLES).toContain('backdrop-filter: blur(var(--asuka-settings-glass-blur)) var(--asuka-liquid-filter, blur(0px)) saturate(1.4) brightness(var(--asuka-settings-glass-brightness));')
    const dialogRule = ASUKA_STYLES.split(`body[data-asuka-school-theme] ${settingsDialog} {`)[1]?.split('}')[0]
    expect(dialogRule).toContain('backdrop-filter: none;')
    expect(dialogRule).toContain('background: transparent;')
    expect(dialogRule).not.toContain('var(--asuka-settings-paint-edge)')
    expect(dialogRule).not.toContain('border-box;')
    const rimRule = ASUKA_STYLES.split(`body[data-asuka-school-theme] ${settingsDialog}::after {`)[1]?.split('}')[0]
    expect(rimRule).toContain('var(--asuka-settings-paint-edge)')
    expect(rimRule).toContain('mask-composite: exclude;')
    expect(rimRule).toContain('pointer-events: none;')
    expect(rimRule).toContain('--asuka-settings-paint-edge: var(--asuka-settings-glass-edge);')
    expect(rimRule).toContain('circle 110px at var(--asuka-liquid-light-x)')
    expect(ASUKA_STYLES).toContain("@property --asuka-liquid-light-strength { syntax: '<number>'; inherits: false; initial-value: 0; }")
    expect(ASUKA_STYLES).toContain('--asuka-liquid-light-strength 180ms ease-out;')
    expect(ASUKA_STYLES).toContain(`body[data-asuka-school-theme][data-asuka-liquid-engine='true'] ${settingsDialog}::after { opacity: 0.82; }`)
    expect(ASUKA_STYLES).toContain(`body[data-asuka-school-theme][data-asuka-liquid-engine='true'][data-asuka-school-details='false'] ${settingsDialog}::after { opacity: 0.38; }`)
    const paintRule = ASUKA_STYLES.split(`body[data-asuka-school-theme] ${settingsDialog}::before {`)[1]?.split('}')[0]
    expect(paintRule).toContain('--asuka-settings-paint-surface: var(--asuka-settings-glass-surface);')
    expect(paintRule).toContain('linear-gradient(145deg, var(--asuka-settings-paint-surface)')
    const entrance = ASUKA_STYLES.split('@keyframes asuka-settings-panel-enter {')[1]?.split('/*')[0]
    expect(entrance).toContain('translateY(10px) scale(0.98)')
    expect(entrance).not.toContain('opacity:')
    expect(ASUKA_STYLES).toContain(`${settingsDialog} > * {\n  animation: asuka-settings-mask-enter 240ms ease-out both;`)
    expect(ASUKA_STYLES).toContain('linear-gradient(135deg, var(--asuka-settings-paint-edge)')
    expect(ASUKA_STYLES).toContain("[role='dialog'][aria-modal='true']::before {")
    expect(ASUKA_STYLES).toContain('--dsw-alias-bg-layer-1: var(--asuka-settings-glass-layer-1);')
    expect(ASUKA_STYLES).toContain('animation: asuka-settings-panel-enter 240ms cubic-bezier(0.16, 1, 0.3, 1) both;')
    expect(ASUKA_STYLES).toContain('@keyframes asuka-settings-panel-enter')
    expect(ASUKA_STYLES).toContain("@property --asuka-settings-paint-surface { syntax: '<color>'; inherits: false; initial-value: transparent; }")
    expect(ASUKA_STYLES).toContain('--asuka-settings-paint-surface 560ms ease-in-out')
    expect(ASUKA_STYLES).toContain("body[data-asuka-school-reduce-motion='true'] div[role='presentation']")
    expect(ASUKA_STYLES).toMatch(/@media \(prefers-reduced-motion: reduce\)[\s\S]*?animation: none;\s+transition: none;/)
    expect(ASUKA_STYLES).not.toContain("body[data-asuka-school-theme] [role='dialog'] {")
    expect(ASUKA_STYLES).not.toContain('asuka-settings-panel-exit')
  })

  it('shares glass tokens across stable major surfaces and clears the opaque composer seat', () => {
    expect(ASUKA_STYLES).toContain('--asuka-glass-surface-soft:')
    expect(ASUKA_STYLES).toContain('--asuka-composer-glass-surface: color-mix(in srgb, var(--asuka-glass-surface-strong) 72%, transparent);')
    expect(ASUKA_STYLES).toContain("[role='menu']:not([data-menu-material], [data-menu-material] *)")
    expect(ASUKA_STYLES).toContain("[role='listbox']:not([data-menu-material], [data-menu-material] *)")
    expect(ASUKA_STYLES).toContain("body[data-asuka-school-theme] [data-composer-card] {\n  background-color: var(--asuka-composer-glass-surface);")
    expect(ASUKA_STYLES).toMatch(/\[data-composer-card\] \{[^}]*backdrop-filter: none;/)
    expect(ASUKA_STYLES).toMatch(/\[data-composer-card\]::before \{[^}]*pointer-events: none;[^}]*backdrop-filter: blur\(var\(--asuka-glass-blur\)\)/)
    expect(ASUKA_STYLES).toContain("body[data-asuka-school-theme] [data-phase='active'] [data-composer-seat] {\n  background: transparent;")
    expect(ASUKA_STYLES).toContain("body[data-asuka-school-theme] [data-slot='sidebar'] > * {")
    expect(ASUKA_STYLES).toContain('--asuka-sidebar-glass-surface:')
    expect(ASUKA_STYLES).toContain('background-color: var(--asuka-floating-surface);')
    expect(ASUKA_STYLES).toContain('--dsw-alias-markdown-code-block: var(--asuka-glass-code-surface);')
    expect(ASUKA_STYLES).toContain('--dsw-alias-label-tertiary: #C2CFD8;')
    expect(ASUKA_STYLES).toContain('--asuka-glass-code-surface: rgb(22 32 43 / 0.86);')
    expect(ASUKA_STYLES).toContain('--asuka-glass-code-surface: rgb(34 30 34 / 0.88);')
    expect(ASUKA_STYLES).toContain('--asuka-glass-code-surface: rgb(7 18 31 / 0.86);')
    expect(ASUKA_STYLES).toContain('--asuka-settings-glass-surface: color-mix(in srgb, var(--asuka-glass-surface-strong) 78%, transparent);')
    expect(ASUKA_STYLES).toContain('.asuka-theme-card { display: grid;')
    expect(ASUKA_STYLES).not.toContain('var(--dsw-alias-bg-base) 36px')
  })

  it('insets occupants and changes tracks only for split normalization and narrow rightbar room', () => {
    const floating = ASUKA_STYLES.slice(ASUKA_STYLES.indexOf('/* DSH 0.2\'s frame'), ASUKA_STYLES.indexOf("body[data-asuka-school-theme] [data-composer-card] button"))
    expect(floating).toContain("[data-sidebar-collapsed] [data-slot='sidebar'] > *")
    expect(floating).toContain('--asuka-floating-rail-gap: 4px;')
    expect(floating).toContain('width: calc(100% - 2 * var(--asuka-floating-inline-gap)) !important;')
    expect(floating).toContain("header:has(> [data-conversation-header-leading])")
    expect(floating).toContain("[data-slot='sidebar'] > *,\n  header:has(> [data-conversation-header-leading]),")
    expect(floating).toContain("[data-slot='conversation.session.header'] > div:has(.asuka-session-title-editor)")
    expect(floating).toContain('min-width: min(100%, 360px);')
    expect(floating).toContain("[data-sidebar-right-panel] [data-dockkit-host='dock'] > [data-dockkit-pane]")
    expect(floating).toContain('border-radius: var(--asuka-floating-radius);')
    expect(floating).toContain('pointer-events: none;')
    expect(floating).toContain("[data-slot='sidebar'] > *:has([role='tooltip']) {\n  z-index: 10;")
    expect(floating).toContain('backdrop-filter: none;')
    expect(floating).toMatch(/\)::before \{[^}]*backdrop-filter: blur\(var\(--asuka-glass-blur\)\)/)
    expect(floating).not.toMatch(/overflow:|transform:|position: fixed/)
    expect(floating).toContain("[data-dockkit-split] > [data-dockkit-divider]::after {\n  top: var(--asuka-floating-radius);\n  bottom: var(--asuka-floating-radius);")
    expect(floating.match(/grid-template-columns\s*:/g)).toHaveLength(4)
    expect(floating).toContain("div[data-asuka-narrow-rightbar]:has(> [data-rightbar-col])")
    expect(floating).toContain('grid-template-columns: var(--asuka-narrow-sidebar-width) minmax(0, 1fr) minmax(0, var(--asuka-narrow-track-width)) !important;')
    expect(floating).toContain('grid-template-columns: minmax(0, 1fr) 0px minmax(0, 0fr) !important;')
    expect(floating).toContain("[data-asuka-school-reduce-motion='true']")
    expect(floating).toContain('@media (max-width: 640px)')
    expect(floating).toContain('background-color: var(--asuka-settings-glass-fallback);')
    expect(ASUKA_STYLES).toContain("[data-sidebar-right-panel] [data-sidebar-right-guide-entry] {\n  border-radius: var(--asuka-floating-radius);")
  })

  it('arms native track motion before the host animation flag and preserves instant layout paths', () => {
    expect(ASUKA_STYLES).toContain("div:has(> [data-rightbar-col]) {\n  transition: grid-template-columns var(--ds-transition-duration-slow) var(--ds-ease-in-out);")
    expect(ASUKA_STYLES).toContain(":is([data-dragging], [data-rightbar-fullscreen], [data-rightbar-instant]) {\n  transition: none;")
    expect(ASUKA_STYLES).toContain("body[data-asuka-school-theme] div:has(> [data-rightbar-col]) { transition: none !important; }")
    expect(ASUKA_STYLES).toMatch(/\[data-asuka-school-reduce-motion='true'\] :is\(\s+div:has\(> \[data-rightbar-col\]\)/)
  })

  it('shows a fullscreen glyph only for the adapted narrow push button without replacing host artwork', () => {
    const narrow = ASUKA_STYLES.slice(ASUKA_STYLES.indexOf('/* Interpolate the same three tracks'), ASUKA_STYLES.indexOf('@media (max-width: 767px) and (prefers-reduced-motion: reduce)'))
    expect(narrow).toContain("[data-sidebar-right-mode][data-asuka-rightbar-mode='push'] > svg { display: none; }")
    expect(narrow).toContain("[data-sidebar-right-mode][data-asuka-rightbar-mode='push']::before {")
    expect(narrow).toContain('width: 15px;\n    height: 15px;')
    expect(narrow).toContain('background-repeat: no-repeat;')
    expect(narrow).not.toContain("[data-asuka-rightbar-mode='fullscreen'] > svg")
  })

  it('interpolates dock split tracks and fullscreen width without delaying captured pointer resizing', () => {
    const panel = ASUKA_STYLES.match(/\[data-sidebar-right-panel\] \{([^}]+)\}/)?.[1]
    expect(panel).toContain('transition: width var(--ds-transition-duration-slow) var(--ds-ease-in-out);')
    expect(ASUKA_STYLES).toContain("div[data-dockkit-split]:has(> :is([data-dockkit-host='dock'], [data-dockkit-empty])) {\n  transition: grid-template-columns")
    expect(ASUKA_STYLES).toContain("div:not([data-dockkit-split]):has(> :is([data-dockkit-host='dock'], [data-dockkit-empty]))")
    const singlePane = ASUKA_STYLES.match(/div:not\(\[data-dockkit-split\]\)[^{]+\{([^}]+)\}/)?.[1]
    expect(singlePane).not.toContain('transition:')
    expect(ASUKA_STYLES).toContain('grid-template-columns: minmax(0, 1fr) 0px minmax(0, 0fr) !important;')
    expect(ASUKA_STYLES).toContain('div:has([data-dockkit-pointer]) {\n  transition: none !important;')
    expect(ASUKA_STYLES).toContain('[data-dragging] [data-sidebar-right-panel],')
    expect(ASUKA_STYLES).toContain("div[data-asuka-narrow-rightbar='fullscreen']:has(> [data-rightbar-col]):has([data-sidebar-right-open]) {\n    grid-template-columns: 0px minmax(0, 1fr) minmax(0, var(--asuka-narrow-full-width)) !important;")
    expect(ASUKA_STYLES).not.toContain('body[data-asuka-school-theme] [data-sidebar-right-panel] { transition: none; }')
    expect(ASUKA_STYLES).toContain('grid-template-columns: 0px minmax(0, 1fr) minmax(0, 100%) !important;')
    expect(ASUKA_STYLES).toContain("[data-asuka-narrow-rightbar] [data-slot='main.conversation'] > * {\n    min-width: calc(var(--asuka-narrow-full-width) - var(--asuka-narrow-sidebar-width) - var(--asuka-narrow-panel-width));")
    const reduced = ASUKA_STYLES.slice(ASUKA_STYLES.indexOf("body[data-asuka-school-theme][data-asuka-school-reduce-motion='true'] :is("))
    expect(reduced).toContain('[data-sidebar-right-panel],')
    expect(reduced).toContain('[data-sidebar-right-panel] [data-dockkit-surface] > div,')
    expect(reduced).toContain(') { animation: none; transition: none !important; }')
  })

  it('keeps narrow open/close tracks moving through native auto-fullscreen instant flags', () => {
    const narrow = ASUKA_STYLES.slice(ASUKA_STYLES.indexOf('@media (max-width: 767px) {'), ASUKA_STYLES.indexOf('@media (max-width: 767px) and (prefers-reduced-motion: reduce)'))
    expect(narrow).toContain('transition: grid-template-columns var(--ds-transition-duration-slow) var(--ds-ease-in-out) !important;')
    expect(narrow).not.toContain('[data-rightbar-instant]')
    expect(narrow).toContain("[data-asuka-narrow-rightbar][data-dragging]")
    expect(narrow).toContain("[data-asuka-school-reduce-motion='true']")
    expect(narrow).toContain("[data-asuka-narrow-rightbar='fullscreen'] [data-sidebar-right-panel] {\n    width: var(--asuka-narrow-full-width) !important;")
    expect(ASUKA_STYLES).toContain(":has([data-sidebar-right-panel='fullscreen'][data-sidebar-right-open]:not([hidden], [hidden] *)) {\n    grid-template-columns: 0px")
  })

  it('paints menu shells and file cards without filtering their interactive content ancestors', () => {
    const menuShell = ASUKA_STYLES.match(/\[data-menu-material='translucent'\] \{([^}]+)\}/)?.[1]
    expect(menuShell).toBeDefined()
    expect(menuShell).not.toMatch(/backdrop-filter|overflow|transform/)
    expect(ASUKA_STYLES).toContain("[data-menu-material='translucent'] > [aria-hidden='true']:first-child")
    const fileShell = ASUKA_STYLES.match(/\[data-presented-file\] \{([^}]+)\}/)?.[1]
    expect(fileShell).toContain('background-color: var(--asuka-glass-surface-medium);')
    expect(fileShell).not.toMatch(/backdrop-filter|overflow|transform/)
    expect(ASUKA_STYLES).toContain(":is([data-slot='conversation.session.header.utilities'], [data-presented-file]) [data-open-target][data-size='compact'] > button {\n  border-radius: 0;")
    expect(ASUKA_STYLES).toContain("[data-size='compact']:has(> button:focus-visible)")
  })

  it('keeps trigger-menu scroll hints separate from the full-size liquid rim', () => {
    expect(ASUKA_STYLES).toContain("[data-asuka-liquid-glass='true']:not([data-trigger-menu])::after,")
    expect(ASUKA_STYLES).toContain("[data-trigger-menu][data-asuka-liquid-glass='true'] > [aria-hidden='true']:first-child::after,")
    expect(ASUKA_STYLES).not.toContain("[data-asuka-liquid-glass='true']::after {")
    const rim = ASUKA_STYLES.split("[data-trigger-menu][data-menu-material='translucent'] > [aria-hidden='true']:first-child::after {")[1]?.split('}')[0]
    expect(rim).toContain('inset: 0;')
    expect(rim).toContain('mask-composite: exclude;')
    expect(rim).toContain('pointer-events: none;')
    expect(ASUKA_STYLES).not.toMatch(/\[data-overflow-below\][^{]*\{/)
  })

  it('uses the final menu material before the asynchronous lens is ready', () => {
    const firstPaint = "body[data-asuka-school-theme][data-asuka-liquid-engine='true'] [data-menu-material='translucent']"
    expect(ASUKA_STYLES).toContain(`${firstPaint} {\n  --asuka-liquid-blur: 5px;`)
    expect(ASUKA_STYLES).toContain(`${firstPaint} {\n  --asuka-liquid-filter: blur(0px);`)
    const material = ASUKA_STYLES.split(`${firstPaint} > [aria-hidden='true']:first-child {`)[1]?.split('}')[0]
    expect(material).toContain('backdrop-filter: blur(var(--asuka-liquid-blur)) var(--asuka-liquid-filter) saturate(1.35)')
    expect(material).toContain('inset 0 2px 1px -1px var(--asuka-glass-highlight)')
    expect(ASUKA_STYLES).toContain(`${firstPaint}:not([data-trigger-menu])::after,`)
  })

  it('masks DSH sticky code banners with the Phase-1 solid theme surface', () => {
    expect(ASUKA_STYLES).toContain("body[data-asuka-school-theme][data-asuka-school-details='true'] .md-code-block {")
    expect(ASUKA_STYLES).toContain('overflow: clip;')
    expect(ASUKA_STYLES).toContain("body[data-asuka-school-theme][data-asuka-school-details='true'] .md-code-block > :first-child {")
    expect(ASUKA_STYLES).toContain('border-radius: 0;\n  background: var(--dsw-alias-bg-base);')
    expect(ASUKA_STYLES).not.toContain(".md-code-block > :first-child::before {")
    expect(ASUKA_STYLES).not.toContain('radial-gradient(circle at 100% 100%')
    expect(ASUKA_STYLES).not.toContain('radial-gradient(circle at 0 100%')
    expect(ASUKA_STYLES).not.toContain('background: var(--asuka-code-block-sticky-mask);')
    expect(ASUKA_STYLES).not.toContain('--asuka-code-block-sticky-mask: var(--asuka-glass-code-surface);')
    expect(ASUKA_STYLES).toContain("body[data-asuka-school-theme][data-asuka-school-details='true'] .md-code-block > :first-child > :first-child {")
    expect(ASUKA_STYLES).toContain('border-top-left-radius: 10px;\n  border-top-right-radius: 10px;\n  background: var(--asuka-glass-code-banner);')
    expect(ASUKA_STYLES).toContain("body[data-asuka-school-theme][data-asuka-school-details='true'] .md-code-block pre {")
    expect(ASUKA_STYLES).toContain('border-top: 0;\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;')
    expect(ASUKA_STYLES).not.toContain('overflow: hidden;\n  border: 1px solid var(--dsw-alias-border-l2);')
    expect(ASUKA_STYLES).not.toContain('overflow: auto hidden;')
  })

  it('renders each quick scene choice as an independent button', () => {
    expect(ASUKA_STYLES).toContain('.asuka-mode-switch { display: flex; flex-wrap: wrap; gap: 8px; }')
    expect(ASUKA_STYLES).toContain('.asuka-mode-button { min-height: 34px; padding: 0 12px; border: 1px solid var(--asuka-glass-edge-soft); border-radius: 8px;')
    expect(ASUKA_STYLES).toContain("body:not([data-asuka-school-theme]) .asuka-mode-button[aria-pressed='true'] { color: var(--dsw-alias-bg-base); }")
    expect(ASUKA_STYLES).toContain('--asuka-glass-surface-soft: var(--dsw-alias-bg-layer-2);')
    expect(ASUKA_STYLES).not.toContain('.asuka-mode-switch { display: flex; overflow: hidden;')
  })

  it('anchors the code copy target to the host banner contract', () => {
    expect(ASUKA_STYLES).toContain("body[data-asuka-school-theme][data-asuka-school-details='true'] .md-code-block [data-code-block-banner='true'] button {")
    expect(ASUKA_STYLES).toContain('min-width: 36px;\n  min-height: 24px;\n  padding: 0 6px;')
    expect(ASUKA_STYLES).not.toContain('.md-code-block > :first-child > :first-child button {')
  })

  it('never moves host buttons across their hover hit boundary', () => {
    const hostButtonRule = ASUKA_STYLES.match(/:is\(button, \[role='button'\]\):not\(:disabled\):hover \{([^}]*)\}/)?.[1]

    expect(hostButtonRule).toBeDefined()
    expect(hostButtonRule).not.toContain('transform:')
    expect(ASUKA_STYLES).toContain(":is(.asuka-mode-button, .asuka-theme-card, .asuka-reset-button, .asuka-session-title-trigger, .asuka-session-title-action):not(:disabled):hover {")
    expect(ASUKA_STYLES).toContain('transform: translateY(-1px);')
  })

  it('styles every title-edit state through existing DSH theme tokens', () => {
    expect(ASUKA_STYLES).toContain('.asuka-session-title-trigger,')
    expect(ASUKA_STYLES).toContain('background: var(--dsw-alias-interactive-bg-hover);')
    expect(ASUKA_STYLES).toContain('.asuka-session-title-editor[aria-busy=\'true\'] {')
    expect(ASUKA_STYLES).toContain('outline: 2px solid var(--dsw-alias-brand-primary);')
    expect(ASUKA_STYLES).toContain('.asuka-session-title-action:disabled {')
    expect(ASUKA_STYLES).toContain('box-shadow: inset 0 -2px 0 var(--dsw-alias-state-error-primary);')
  })
})
