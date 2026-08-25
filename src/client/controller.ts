import type { SettingsScope } from '@deepseek-ai/dsh-client-runtime/client'
import {
  clampBlur,
  clampOpacity,
  DEFAULT_ASUKA_SETTINGS,
  isAsukaMode,
  millisecondsUntilNextWallpaperPeriod,
  resolveWallpaperPeriod,
  type AsukaMode,
  type AsukaThemeSettings,
  type WallpaperPeriod,
  type WallpaperPeriodPreference,
} from '../shared/settings.js'
import { applyWallpaper, clearWallpaper } from './wallpaper/runtime.js'
import type { AsukaSettingsViewState } from './settings/settings-store.js'

export interface AsukaThemeController {
  setMode(mode: AsukaMode): void
  setScene(period: WallpaperPeriod): void
  setWallpaperEnabled(value: boolean): void
  setWallpaperPeriod(value: WallpaperPeriodPreference): void
  setOpacity(value: number): void
  setBlur(value: number): void
  setDecorativeDetails(value: boolean): void
  setReduceMotion(value: boolean): void
  reset(): void
  dispose(): void
}

interface AsukaThemeControllerOptions {
  settings: SettingsScope<AsukaThemeSettings>
  syncView: (next: AsukaSettingsViewState) => void
}

/** Single source of truth for the Quick Row, Settings page, and wallpaper layer. */
export function createAsukaThemeController(options: AsukaThemeControllerOptions): AsukaThemeController {
  const { settings, syncView } = options
  let current = DEFAULT_ASUKA_SETTINGS
  let wallpaperTimer: ReturnType<typeof setTimeout> | undefined

  const syncWallpaper = (): void => {
    if (wallpaperTimer !== undefined) clearTimeout(wallpaperTimer)
    applyWallpaper(current, resolveWallpaperPeriod(current.wallpaperPeriod))

    if (current.mode === 'off' || !current.wallpaperEnabled || current.wallpaperPeriod !== 'auto') return
    wallpaperTimer = setTimeout(syncWallpaper, millisecondsUntilNextWallpaperPeriod())
  }

  const syncFromSettings = (): void => {
    const snapshot = settings.getSnapshot()
    current = snapshot.value ?? DEFAULT_ASUKA_SETTINGS
    syncView({
      status: snapshot.status,
      settings: current,
      revision: snapshot.revision ?? -1,
    })

    if (snapshot.status !== 'ready') return
    syncWallpaper()
  }

  const unsubscribe = settings.subscribe(syncFromSettings)
  syncFromSettings()

  return {
    setMode: (mode) => { if (isAsukaMode(mode)) void settings.set('mode', mode) },
    setScene: (period) => {
      const mode: AsukaMode = period === 'night' ? 'tokyo3-night' : 'after-class'
      void settings.set('mode', mode)
      void settings.set('wallpaperEnabled', true)
      void settings.set('wallpaperPeriod', period)
    },
    setWallpaperEnabled: (value) => { void settings.set('wallpaperEnabled', Boolean(value)) },
    setWallpaperPeriod: (value) => { if (['auto', 'morning', 'noon', 'night'].includes(value)) void settings.set('wallpaperPeriod', value) },
    setOpacity: (value) => { void settings.set('wallpaperOpacity', clampOpacity(value)) },
    setBlur: (value) => { void settings.set('wallpaperBlurPx', clampBlur(value)) },
    setDecorativeDetails: (value) => { void settings.set('decorativeDetails', Boolean(value)) },
    setReduceMotion: (value) => { void settings.set('reduceMotion', Boolean(value)) },
    reset: () => {
      for (const field of Object.keys(DEFAULT_ASUKA_SETTINGS)) void settings.unset(field)
    },
    dispose: () => {
      unsubscribe()
      if (wallpaperTimer !== undefined) clearTimeout(wallpaperTimer)
      clearWallpaper()
    },
  }
}
