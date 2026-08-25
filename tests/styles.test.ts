import { describe, expect, it } from 'vitest'
import { ASUKA_STYLES } from '../src/client/styles.js'

describe('wallpaper compositing styles', () => {
  it('keeps the wallpaper visible above the app shell and keeps each crossfading layer self-contained', () => {
    expect(ASUKA_STYLES).toContain('#asuka-school-wallpaper-root {\n  position: fixed;\n  inset: 0;\n  z-index: 1;')
    expect(ASUKA_STYLES).not.toContain('body > :not(#asuka-school-wallpaper-root)')
    expect(ASUKA_STYLES).toContain('var(--asuka-wallpaper-mask-start)')
    expect(ASUKA_STYLES).toContain('opacity 1s cubic-bezier')
  })

  it('protects the sidebar and animates palette-bearing UI surfaces across scenes', () => {
    expect(ASUKA_STYLES).toContain('body[data-asuka-school-theme] aside')
    expect(ASUKA_STYLES).toContain('z-index: 2;')
    expect(ASUKA_STYLES).toContain("body[data-asuka-school-transitioning='true']")
  })
})
