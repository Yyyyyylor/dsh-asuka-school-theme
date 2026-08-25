import { describe, expect, it } from 'vitest'
import { asukaThemeForMode } from '../src/client/presentation.js'
import { asukaDarkTheme } from '../src/client/themes/dark.js'
import { asukaLightTheme } from '../src/client/themes/light.js'

describe('Asuka theme definitions', () => {
  it('registers one Light and one Dark theme with semantic coverage', () => {
    expect(asukaLightTheme).toMatchObject({ id: 'asuka-school-light', colorScheme: 'light' })
    expect(asukaDarkTheme).toMatchObject({ id: 'asuka-school-dark', colorScheme: 'dark' })

    for (const theme of [asukaLightTheme, asukaDarkTheme]) {
      expect(theme.tokens['--dsw-alias-bg-base']).toMatch(/^#|^rgba/)
      expect(theme.tokens['--dsw-alias-button-primary-fill']).toMatch(/^#/)
      expect(theme.tokens['--dsw-specific-sidebar-fill']).toMatch(/^#/)
      expect(theme.tokens['--dsw-alias-markdown-code-block']).toMatch(/^#/)
      expect(theme.tokens['--shiki-background']).toMatch(/^#/)
    }
  })

  it('maps each enabled preset to a complete directly-presented palette', () => {
    expect(asukaThemeForMode('off')).toBeUndefined()
    expect(asukaThemeForMode('after-class')).toBe(asukaLightTheme)
    expect(asukaThemeForMode('tokyo3-night')).toBe(asukaDarkTheme)
  })
})
