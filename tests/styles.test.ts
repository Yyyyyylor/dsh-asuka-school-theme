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

  it('masks DSH sticky code banners behind their rounded painted surface', () => {
    expect(ASUKA_STYLES).toContain("body[data-asuka-school-theme][data-asuka-school-details='true'] .md-code-block > :first-child {")
    expect(ASUKA_STYLES).toContain('border-radius: 0;\n  background: var(--asuka-code-block-sticky-mask);')
    expect(ASUKA_STYLES).toContain("body[data-asuka-school-theme][data-asuka-school-details='true'] .md-code-block > :first-child > :first-child {")
    expect(ASUKA_STYLES).toContain('border-top-left-radius: 10px;\n  border-top-right-radius: 10px;\n  background: var(--dsw-alias-markdown-code-block-banner);')
    expect(ASUKA_STYLES).not.toContain('overflow: hidden;\n  border: 1px solid var(--dsw-alias-border-l2);')
  })

  it('renders each quick scene choice as an independent button', () => {
    expect(ASUKA_STYLES).toContain('.asuka-mode-switch { display: flex; flex-wrap: wrap; gap: 8px; }')
    expect(ASUKA_STYLES).toContain('.asuka-mode-button { min-height: 34px; padding: 0 12px; border: 1px solid var(--dsw-alias-border-l2); border-radius: 8px;')
    expect(ASUKA_STYLES).not.toContain('.asuka-mode-switch { display: flex; overflow: hidden;')
  })

  it('clips the complete code block without turning its sticky banner into a scroll container', () => {
    expect(ASUKA_STYLES).toContain("body[data-asuka-school-theme][data-asuka-school-details='true'] .md-code-block {")
    expect(ASUKA_STYLES).toContain('overflow: clip;')
    expect(ASUKA_STYLES).toContain("body[data-asuka-school-theme][data-asuka-school-details='true'] .md-code-block > :first-child {")
    expect(ASUKA_STYLES).toContain('border-radius: 0;\n  background: var(--asuka-code-block-sticky-mask);')
    expect(ASUKA_STYLES).toContain("body[data-asuka-school-theme][data-asuka-school-details='true'] .md-code-block pre {")
    expect(ASUKA_STYLES).toContain('border-top: 0;\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;')
    expect(ASUKA_STYLES).not.toContain('overflow: auto hidden;')
  })

  it('slightly enlarges only the code banner copy button', () => {
    expect(ASUKA_STYLES).toContain("body[data-asuka-school-theme][data-asuka-school-details='true'] .md-code-block > :first-child > :first-child button {")
    expect(ASUKA_STYLES).toContain('min-width: 36px;\n  min-height: 24px;\n  padding: 0 6px;')
  })
})
