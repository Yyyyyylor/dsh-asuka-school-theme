import z from '@deepseek-ai/schemastery'
import { settingsNamespace } from '@deepseek-ai/dsh-settings'
import {
  ASUKA_SETTINGS_NAMESPACE_ID,
  ASUKA_MODES,
  DEFAULT_ASUKA_SETTINGS,
  WALLPAPER_PERIOD_PREFERENCES,
} from './shared/settings.js'
export * from './shared/settings.js'

export const ASUKA_SETTINGS_NAMESPACE = settingsNamespace(ASUKA_SETTINGS_NAMESPACE_ID)

export const AsukaThemeSettingsSchema = z.object({
  mode: z.union(ASUKA_MODES.map(mode => z.const(mode))).default(DEFAULT_ASUKA_SETTINGS.mode),
  wallpaperEnabled: z.boolean().default(DEFAULT_ASUKA_SETTINGS.wallpaperEnabled),
  wallpaperPeriod: z.union(WALLPAPER_PERIOD_PREFERENCES.map(period => z.const(period))).default(DEFAULT_ASUKA_SETTINGS.wallpaperPeriod),
  wallpaperOpacity: z.number().min(0).max(0.4).step(0.01).default(DEFAULT_ASUKA_SETTINGS.wallpaperOpacity),
  wallpaperBlurPx: z.number().min(0).max(20).step(1).default(DEFAULT_ASUKA_SETTINGS.wallpaperBlurPx),
  decorativeDetails: z.boolean().default(DEFAULT_ASUKA_SETTINGS.decorativeDetails),
  reduceMotion: z.boolean().default(DEFAULT_ASUKA_SETTINGS.reduceMotion),
})
