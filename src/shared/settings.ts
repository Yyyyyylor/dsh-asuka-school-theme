export const ASUKA_SETTINGS_NAMESPACE_ID = 'asuka-school-theme'

export const ASUKA_MODES = ['off', 'after-class', 'tokyo3-night'] as const
export type AsukaMode = (typeof ASUKA_MODES)[number]

export const WALLPAPER_PERIOD_PREFERENCES = ['auto', 'morning', 'noon', 'night'] as const
export type WallpaperPeriodPreference = (typeof WALLPAPER_PERIOD_PREFERENCES)[number]
export type WallpaperPeriod = Exclude<WallpaperPeriodPreference, 'auto'>

export interface AsukaThemeSettings {
  mode: AsukaMode
  wallpaperEnabled: boolean
  wallpaperPeriod: WallpaperPeriodPreference
  wallpaperOpacity: number
  wallpaperBlurPx: number
  decorativeDetails: boolean
  reduceMotion: boolean
}

export const DEFAULT_ASUKA_SETTINGS: Readonly<AsukaThemeSettings> = Object.freeze({
  mode: 'off',
  wallpaperEnabled: true,
  wallpaperPeriod: 'auto',
  wallpaperOpacity: 0.2,
  wallpaperBlurPx: 0,
  decorativeDetails: true,
  reduceMotion: false,
})

export function isAsukaMode(value: unknown): value is AsukaMode {
  return typeof value === 'string' && (ASUKA_MODES as readonly string[]).includes(value)
}

export function isWallpaperPeriodPreference(value: unknown): value is WallpaperPeriodPreference {
  return typeof value === 'string' && (WALLPAPER_PERIOD_PREFERENCES as readonly string[]).includes(value)
}

/** Resolve the requested wallpaper period from the user's local clock. */
export function wallpaperPeriodAt(now: Date): WallpaperPeriod {
  const hour = now.getHours()
  if (hour >= 6 && hour < 11) return 'morning'
  if (hour >= 11 && hour < 17) return 'noon'
  return 'night'
}

export function resolveWallpaperPeriod(preference: WallpaperPeriodPreference, now = new Date()): WallpaperPeriod {
  return preference === 'auto' ? wallpaperPeriodAt(now) : preference
}

/** Delay until the next 06:00, 11:00, or 17:00 local-time wallpaper boundary. */
export function millisecondsUntilNextWallpaperPeriod(now = new Date()): number {
  const next = new Date(now)

  for (const hour of [6, 11, 17]) {
    next.setHours(hour, 0, 0, 0)
    if (next.getTime() > now.getTime()) return Math.max(1_000, next.getTime() - now.getTime())
  }

  next.setDate(next.getDate() + 1)
  next.setHours(6, 0, 0, 0)
  return Math.max(1_000, next.getTime() - now.getTime())
}

export function isActiveAsukaMode(mode: AsukaMode): mode is Exclude<AsukaMode, 'off'> {
  return mode !== 'off'
}

export function asukaThemeId(mode: AsukaMode): 'asuka-school-light' | 'asuka-school-dark' | undefined {
  if (mode === 'after-class') return 'asuka-school-light'
  if (mode === 'tokyo3-night') return 'asuka-school-dark'
  return undefined
}

export function clampOpacity(value: number): number {
  return Math.min(0.4, Math.max(0, Math.round(value * 100) / 100))
}

export function clampBlur(value: number): number {
  return Math.min(20, Math.max(0, Math.round(value)))
}
