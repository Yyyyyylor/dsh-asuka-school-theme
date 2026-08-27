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

  it('contains DSH code-block surfaces in one rounded wrapper without changing pre scrolling', () => {
    expect(ASUKA_STYLES).toContain('body[data-asuka-school-theme] .md-code-block {')
    expect(ASUKA_STYLES).toContain('overflow: hidden;\n  border: 1px solid var(--dsw-alias-border-l2);')
    expect(ASUKA_STYLES).toContain('.md-code-block > :first-child {\n  position: sticky;\n  top: 0;\n  z-index: 2;')
    expect(ASUKA_STYLES).toContain('background: var(--dsw-alias-markdown-code-block-banner);')
    expect(ASUKA_STYLES).toContain('.md-code-block :where(pre) {')
    expect(ASUKA_STYLES).toContain('overflow: auto;\n  border: 0;\n  border-radius: var(--asuka-code-block-radius);')
  })

  it('renders each quick scene choice as an independent button', () => {
    expect(ASUKA_STYLES).toContain('.asuka-mode-switch { display: flex; flex-wrap: wrap; gap: 8px; }')
    expect(ASUKA_STYLES).toContain('.asuka-mode-button { min-height: 34px; padding: 0 12px; border: 1px solid var(--dsw-alias-border-l2); border-radius: 8px;')
    expect(ASUKA_STYLES).not.toContain('.asuka-mode-switch { display: flex; overflow: hidden;')
  })
})
