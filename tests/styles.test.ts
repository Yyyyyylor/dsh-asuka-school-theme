import { describe, expect, it } from 'vitest'
import { ASUKA_STYLES } from '../src/client/styles.js'

describe('wallpaper compositing styles', () => {
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
    expect(ASUKA_STYLES).toContain('backdrop-filter: blur(10px) saturate(1.2) brightness(var(--asuka-settings-mask-brightness));')
    expect(ASUKA_STYLES).toContain('backdrop-filter: blur(32px) saturate(1.72) brightness(var(--asuka-settings-glass-brightness)) contrast(1.02);')
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
    expect(ASUKA_STYLES).toContain(":is([data-composer-card], [class*='_bubble']:not([role='tooltip']), [role='menu'], [role='listbox'], [role='dialog']:not([aria-modal='true']))")
    expect(ASUKA_STYLES).toContain("body[data-asuka-school-theme] [data-composer-card] {\n  background-color: var(--asuka-composer-glass-surface);")
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

  it('insets occupants without changing native tracks, handles or popup containing blocks', () => {
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
    expect(floating).not.toMatch(/grid-template|overflow:|transform:|position: fixed/)
    expect(floating).toContain("[data-asuka-school-reduce-motion='true']")
    expect(floating).toContain('@media (max-width: 640px)')
    expect(floating).toContain('background-color: var(--asuka-settings-glass-fallback);')
    expect(ASUKA_STYLES).toContain("[data-sidebar-right-panel] [data-sidebar-right-guide-entry] {\n  border-radius: var(--asuka-floating-radius);")
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
    expect(ASUKA_STYLES).toContain('border-top-left-radius: 10px;\n  border-top-right-radius: 10px;\n  background: var(--dsw-alias-markdown-code-block-banner);')
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
