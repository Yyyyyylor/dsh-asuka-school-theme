import { describe, expect, it } from 'vitest'
import { asukaThemeForMode } from '../src/client/presentation.js'
import { asukaDarkTheme } from '../src/client/themes/dark.js'
import { asukaLightTheme, asukaMorningTheme, asukaNoonTheme } from '../src/client/themes/light.js'

describe('Asuka theme definitions', () => {
  it('registers three scene palettes with semantic coverage', () => {
    expect(asukaLightTheme).toBe(asukaNoonTheme)
    expect(asukaMorningTheme).toMatchObject({ id: 'asuka-school-morning', colorScheme: 'light' })
    expect(asukaNoonTheme).toMatchObject({ id: 'asuka-school-noon', colorScheme: 'light' })
    expect(asukaDarkTheme).toMatchObject({ id: 'asuka-school-dark', colorScheme: 'dark' })

    for (const theme of [asukaMorningTheme, asukaNoonTheme, asukaDarkTheme]) {
      expect(theme.tokens['--asuka-code-block-sticky-mask']).toMatch(/^#/)
      expect(theme.tokens['--dsw-alias-bg-base']).toMatch(/^#|^rgba/)
      expect(theme.tokens['--dsw-alias-button-primary-fill']).toMatch(/^#/)
      expect(theme.tokens['--dsw-specific-sidebar-fill']).toMatch(/^#|^rgba/)
      expect(theme.tokens['--dsw-alias-markdown-code-block']).toMatch(/^#/)
      expect(theme.tokens['--shiki-background']).toMatch(/^#/)
      expect(theme.tokens['--dsw-alias-button-info-fill']).toMatch(/^#/)
      expect(theme.tokens['--dsw-static-deepseek-500']).toMatch(/^#/)
    }

    expect(asukaMorningTheme.tokens['--dsw-alias-markdown-code-block-banner']).not.toBe(asukaMorningTheme.tokens['--dsw-alias-markdown-code-block'])
    expect(asukaNoonTheme.tokens['--dsw-alias-markdown-code-block-banner']).not.toBe(asukaNoonTheme.tokens['--dsw-alias-markdown-code-block'])
    expect(asukaMorningTheme.tokens['--dsw-alias-bg-base']).not.toBe(asukaNoonTheme.tokens['--dsw-alias-bg-base'])
  })

  it('keeps light-scene navigation and conversation copy visibly darker than muted chrome', () => {
    for (const theme of [asukaMorningTheme, asukaNoonTheme]) {
      expect(theme.tokens['--dsw-alias-label-secondary']).toBe('#354B59')
      expect(theme.tokens['--dsw-alias-label-tertiary']).toBe('#465C69')
      expect(theme.tokens['--dsw-alias-label-caption']).toBe('#405663')
      expect(theme.tokens['--dsw-alias-label-dimmed']).toBe('#536874')
    }
  })

  it('maps each enabled preset to a complete directly-presented palette', () => {
    expect(asukaThemeForMode('off')).toBeUndefined()
    expect(asukaThemeForMode('after-class')).toBe(asukaLightTheme)
    expect(asukaThemeForMode('after-class', 'morning')).toBe(asukaMorningTheme)
    expect(asukaThemeForMode('after-class', 'noon')).toBe(asukaNoonTheme)
    expect(asukaThemeForMode('tokyo3-night')).toBe(asukaDarkTheme)
  })
})
