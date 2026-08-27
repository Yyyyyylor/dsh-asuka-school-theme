import { describe, expect, it } from 'vitest'
import {
  asukaThemeId,
  clampBlur,
  clampOpacity,
  DEFAULT_ASUKA_SETTINGS,
  isActiveAsukaMode,
  isAsukaMode,
  isWallpaperPeriodPreference,
  millisecondsUntilNextWallpaperPeriod,
  resolveAsukaPresentationMode,
  resolveWallpaperPeriod,
  wallpaperPeriodAt,
} from '../src/shared/settings.js'
import { wallpaperLayerProfileForPeriod, wallpaperOpacityForPeriod } from '../src/shared/wallpapers.js'

describe('Asuka settings invariants', () => {
  it('starts turned off and recognizes the active Asuka display modes', () => {
    expect(DEFAULT_ASUKA_SETTINGS.mode).toBe('off')
    expect(isActiveAsukaMode('off')).toBe(false)
    expect(isActiveAsukaMode('after-class')).toBe(true)
    expect(isActiveAsukaMode('tokyo3-night')).toBe(true)
    expect(asukaThemeId('off')).toBeUndefined()
    expect(asukaThemeId('after-class')).toBe('asuka-school-light')
    expect(asukaThemeId('tokyo3-night')).toBe('asuka-school-dark')
  })

  it('keeps numeric user input inside the Host schema limits', () => {
    expect(DEFAULT_ASUKA_SETTINGS.wallpaperOpacity).toBe(0.12)
    expect(clampOpacity(-2)).toBe(0)
    expect(clampOpacity(0.276)).toBe(0.28)
    expect(clampOpacity(2)).toBe(1)
    expect(clampBlur(-2)).toBe(0)
    expect(clampBlur(7.6)).toBe(8)
    expect(clampBlur(25)).toBe(20)
    expect(wallpaperOpacityForPeriod(0.2, 'morning')).toBe(0.2)
    expect(wallpaperOpacityForPeriod(0.2, 'noon')).toBe(0.2)
    expect(wallpaperOpacityForPeriod(0.2, 'night')).toBe(0.2)
    expect(wallpaperOpacityForPeriod(1, 'morning')).toBe(1)
    expect(wallpaperOpacityForPeriod(1, 'noon')).toBe(1)
    expect(wallpaperOpacityForPeriod(1, 'night')).toBe(1)
    expect(wallpaperLayerProfileForPeriod('morning').filter).toContain('sepia')
    expect(wallpaperLayerProfileForPeriod('noon').filter).toContain('brightness')
    expect(wallpaperLayerProfileForPeriod('night').maskStart).toContain('23, 28, 36')
  })

  it('accepts no unknown theme mode', () => {
    expect(isAsukaMode('after-class')).toBe(true)
    expect(isAsukaMode('nightmare')).toBe(false)
  })

  it('resolves the requested early, noon, and night time windows exactly', () => {
    expect(wallpaperPeriodAt(new Date(2026, 0, 1, 5, 59))).toBe('night')
    expect(wallpaperPeriodAt(new Date(2026, 0, 1, 6, 0))).toBe('morning')
    expect(wallpaperPeriodAt(new Date(2026, 0, 1, 10, 59))).toBe('morning')
    expect(wallpaperPeriodAt(new Date(2026, 0, 1, 11, 0))).toBe('noon')
    expect(wallpaperPeriodAt(new Date(2026, 0, 1, 16, 59))).toBe('noon')
    expect(wallpaperPeriodAt(new Date(2026, 0, 1, 17, 0))).toBe('night')
  })

  it('supports manual period previews and schedules only the next boundary', () => {
    const atTenThirty = new Date(2026, 0, 1, 10, 30, 0)
    expect(resolveWallpaperPeriod('auto', atTenThirty)).toBe('morning')
    expect(resolveWallpaperPeriod('night', atTenThirty)).toBe('night')
    expect(millisecondsUntilNextWallpaperPeriod(atTenThirty)).toBe(30 * 60 * 1_000)
    expect(millisecondsUntilNextWallpaperPeriod(new Date(2026, 0, 1, 18, 0, 0))).toBe(12 * 60 * 60 * 1_000)
    expect(isWallpaperPeriodPreference('noon')).toBe(true)
    expect(isWallpaperPeriodPreference('dawn')).toBe(false)
  })

  it('keeps the automatic palette synchronized with the current time after restart', () => {
    expect(resolveAsukaPresentationMode('tokyo3-night', 'auto', 'morning')).toBe('after-class')
    expect(resolveAsukaPresentationMode('tokyo3-night', 'auto', 'noon')).toBe('after-class')
    expect(resolveAsukaPresentationMode('after-class', 'auto', 'night')).toBe('tokyo3-night')
    expect(resolveAsukaPresentationMode('tokyo3-night', 'night', 'night')).toBe('tokyo3-night')
    expect(resolveAsukaPresentationMode('off', 'auto', 'morning')).toBe('off')
  })
})
