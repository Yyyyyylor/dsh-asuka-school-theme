import { describe, expect, it } from 'vitest'
import { ASUKA_STYLES } from '../src/client/styles.js'

describe('wallpaper compositing styles', () => {
  it('keeps the wallpaper visible above the app shell and keeps each crossfading layer self-contained', () => {
    expect(ASUKA_STYLES).toContain('#asuka-school-wallpaper-root {\n  position: fixed;\n  inset: 0;\n  z-index: 1;')
    expect(ASUKA_STYLES).not.toContain('body > :not(#asuka-school-wallpaper-root)')
    expect(ASUKA_STYLES).toContain('var(--asuka-wallpaper-mask-start)')
    expect(ASUKA_STYLES).toContain('opacity 560ms cubic-bezier')
  })

  it('protects the sidebar and animates theme tokens without per-element paint churn', () => {
    expect(ASUKA_STYLES).toContain('body[data-asuka-school-theme] aside')
    expect(ASUKA_STYLES).toContain('z-index: 2;')
    expect(ASUKA_STYLES).toContain("body[data-asuka-school-theme]:not([data-asuka-school-reduce-motion='true'])")
    expect(ASUKA_STYLES).toContain('@property --dsw-alias-bg-base')
    expect(ASUKA_STYLES).toContain('--dsw-alias-markdown-code-block-banner 520ms')
    expect(ASUKA_STYLES).toContain('--dsw-specific-sidebar-fill 520ms')
    expect(ASUKA_STYLES).not.toContain("body[data-asuka-school-transitioning='true'] :is(")
  })

  it('layers a frosted mask and scene-aware liquid glass only on the settings modal', () => {
    const settingsDialog = "div[role='presentation']:has(> [aria-hidden='true'] + [role='dialog'][aria-modal='true']) > [role='dialog'][aria-modal='true']"

    expect(ASUKA_STYLES).toContain('--asuka-settings-glass-surface:')
    expect(ASUKA_STYLES).toContain(`body[data-asuka-school-theme] ${settingsDialog} {`)
    expect(ASUKA_STYLES).toContain("body[data-asuka-school-theme][data-asuka-school-scene='night'] {")
    expect(ASUKA_STYLES).toContain('backdrop-filter: blur(10px) saturate(1.2) brightness(var(--asuka-settings-mask-brightness));')
    expect(ASUKA_STYLES).toContain('backdrop-filter: blur(32px) saturate(1.72) brightness(var(--asuka-settings-glass-brightness)) contrast(1.02);')
    expect(ASUKA_STYLES).toContain('linear-gradient(135deg, var(--asuka-settings-glass-edge)')
    expect(ASUKA_STYLES).toContain("[role='dialog'][aria-modal='true']::before {")
    expect(ASUKA_STYLES).toContain('--dsw-alias-bg-layer-1: var(--asuka-settings-glass-layer-1);')
    expect(ASUKA_STYLES).toContain('animation: asuka-settings-panel-enter 240ms cubic-bezier(0.16, 1, 0.3, 1) both;')
    expect(ASUKA_STYLES).toContain('@keyframes asuka-settings-panel-enter')
    expect(ASUKA_STYLES).toContain("body[data-asuka-school-reduce-motion='true'] div[role='presentation']")
    expect(ASUKA_STYLES).toContain('@media (prefers-reduced-motion: reduce)')
    expect(ASUKA_STYLES).not.toContain("body[data-asuka-school-theme] [role='dialog'] {")
    expect(ASUKA_STYLES).not.toContain('asuka-settings-panel-exit')
  })

  it('shares glass tokens across stable major surfaces and clears the opaque composer seat', () => {
    expect(ASUKA_STYLES).toContain('--asuka-glass-surface-soft:')
    expect(ASUKA_STYLES).toContain('--asuka-composer-glass-surface: color-mix(in srgb, var(--asuka-glass-surface-strong) 72%, transparent);')
    expect(ASUKA_STYLES).toContain(":is([data-composer-card], [class*='_bubble'], [role='menu'], [role='listbox'], [role='dialog']:not([aria-modal='true']))")
    expect(ASUKA_STYLES).toContain("body[data-asuka-school-theme] [data-composer-card] {\n  background-color: var(--asuka-composer-glass-surface);")
    expect(ASUKA_STYLES).toContain("body[data-asuka-school-theme] [data-phase='active'] [data-composer-seat] {\n  background: transparent;")
    expect(ASUKA_STYLES).toContain('body[data-asuka-school-theme] aside {')
    expect(ASUKA_STYLES).toContain('--asuka-sidebar-glass-surface:')
    expect(ASUKA_STYLES).toContain('backdrop-filter: blur(20px) saturate(1.62) brightness(1.02);')
    expect(ASUKA_STYLES).toContain('--dsw-alias-markdown-code-block: var(--asuka-glass-code-surface);')
    expect(ASUKA_STYLES).toContain('--dsw-alias-label-tertiary: #C2CFD8;')
    expect(ASUKA_STYLES).toContain('--asuka-glass-code-surface: rgb(22 32 43 / 0.86);')
    expect(ASUKA_STYLES).toContain('--asuka-glass-code-surface: rgb(34 30 34 / 0.88);')
    expect(ASUKA_STYLES).toContain('--asuka-glass-code-surface: rgb(7 18 31 / 0.86);')
    expect(ASUKA_STYLES).toContain('--asuka-settings-glass-surface: color-mix(in srgb, var(--asuka-glass-surface-strong) 78%, transparent);')
    expect(ASUKA_STYLES).toContain('.asuka-theme-card { display: grid;')
    expect(ASUKA_STYLES).not.toContain('var(--dsw-alias-bg-base) 36px')
  })

  it('masks DSH sticky code banners with the Phase-1 solid theme surface', () => {
    expect(ASUKA_STYLES).toContain("body[data-asuka-school-theme][data-asuka-school-details='true'] .md-code-block > :first-child {")
    expect(ASUKA_STYLES).toContain('border-radius: 0;\n  background: var(--dsw-alias-bg-base);')
    expect(ASUKA_STYLES).not.toContain(".md-code-block > :first-child::before {")
    expect(ASUKA_STYLES).not.toContain('radial-gradient(circle at 100% 100%')
    expect(ASUKA_STYLES).not.toContain('radial-gradient(circle at 0 100%')
    expect(ASUKA_STYLES).not.toContain('background: var(--asuka-code-block-sticky-mask);')
    expect(ASUKA_STYLES).not.toContain('--asuka-code-block-sticky-mask: var(--asuka-glass-code-surface);')
    expect(ASUKA_STYLES).toContain("body[data-asuka-school-theme][data-asuka-school-details='true'] .md-code-block > :first-child > :first-child {")
    expect(ASUKA_STYLES).toContain('border-top-left-radius: 10px;\n  border-top-right-radius: 10px;\n  background: var(--dsw-alias-markdown-code-block-banner);')
    expect(ASUKA_STYLES).not.toContain('overflow: hidden;\n  border: 1px solid var(--dsw-alias-border-l2);')
  })

  it('renders each quick scene choice as an independent button', () => {
    expect(ASUKA_STYLES).toContain('.asuka-mode-switch { display: flex; flex-wrap: wrap; gap: 8px; }')
    expect(ASUKA_STYLES).toContain('.asuka-mode-button { min-height: 34px; padding: 0 12px; border: 1px solid var(--asuka-glass-edge-soft); border-radius: 8px;')
    expect(ASUKA_STYLES).not.toContain('.asuka-mode-switch { display: flex; overflow: hidden;')
  })

  it('clips the complete code block without turning its sticky banner into a scroll container', () => {
    expect(ASUKA_STYLES).toContain("body[data-asuka-school-theme][data-asuka-school-details='true'] .md-code-block {")
    expect(ASUKA_STYLES).toContain('overflow: clip;')
    expect(ASUKA_STYLES).toContain("body[data-asuka-school-theme][data-asuka-school-details='true'] .md-code-block > :first-child {")
    expect(ASUKA_STYLES).toContain('border-radius: 0;\n  background: var(--dsw-alias-bg-base);')
    expect(ASUKA_STYLES).toContain("body[data-asuka-school-theme][data-asuka-school-details='true'] .md-code-block pre {")
    expect(ASUKA_STYLES).toContain('border-top: 0;\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;')
    expect(ASUKA_STYLES).not.toContain('overflow: auto hidden;')
  })

  it('slightly enlarges only the code banner copy button', () => {
    expect(ASUKA_STYLES).toContain("body[data-asuka-school-theme][data-asuka-school-details='true'] .md-code-block > :first-child > :first-child button {")
    expect(ASUKA_STYLES).toContain('min-width: 36px;\n  min-height: 24px;\n  padding: 0 6px;')
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
