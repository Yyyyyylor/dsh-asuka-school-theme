import type { Context } from '@deepseek-ai/cordis'
import type { SettingsScope } from '@deepseek-ai/dsh-client-runtime/client'
import type { ThemeRuntime, ThemeSnapshot, ThemeTokenOverrides } from '@deepseek-ai/dsh-client-ui-theme/client'
import {
  clampBlur,
  clampOpacity,
  DEFAULT_ASUKA_SETTINGS,
  isActiveAsukaMode,
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
import { asukaDarkTheme, asukaLightTheme } from './themes/index.js'

const ASUKA_THEME_OVERRIDE_SOURCE = 'asuka-school-theme'

function asukaThemeOverrides(mode: Exclude<AsukaMode, 'off'>): ThemeTokenOverrides {
  const definition = mode === 'after-class' ? asukaLightTheme : asukaDarkTheme
  return Object.fromEntries(
    Object.entries(definition.tokens).map(([name, value]) => [name, { light: value, dark: value }]),
  )
}

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
  ctx: Context
  theme: ThemeRuntime
  settings: SettingsScope<AsukaThemeSettings>
  syncView: (next: AsukaSettingsViewState) => void
}

/** Single source of truth for the Quick Row, Settings page, ThemeRuntime and wallpaper. */
export function createAsukaThemeController(options: AsukaThemeControllerOptions): AsukaThemeController {
  const { ctx, theme, settings, syncView } = options
  let applyingOwnTheme = false
  let current = DEFAULT_ASUKA_SETTINGS
  let wallpaperTimer: ReturnType<typeof setTimeout> | undefined
  let clearThemeOverride: (() => void) | undefined
  let appliedMode: AsukaMode = 'off'
  let baseThemePreference = String(theme.getTheme().preference)
  const ownThemeRevisions = new Set<number>()

  const mutateOwnTheme = (change: () => void): void => {
    applyingOwnTheme = true
    try {
      change()
      ownThemeRevisions.add(theme.getTheme().revision)
    } finally {
      applyingOwnTheme = false
    }
  }

  const syncThemeOverride = (): void => {
    if (current.mode === appliedMode) return

    if (isActiveAsukaMode(current.mode) && !isActiveAsukaMode(appliedMode)) {
      baseThemePreference = String(theme.getTheme().preference)
    }

    mutateOwnTheme(() => {
      clearThemeOverride?.()
      clearThemeOverride = isActiveAsukaMode(current.mode)
        ? theme.overrideTokens(ASUKA_THEME_OVERRIDE_SOURCE, asukaThemeOverrides(current.mode))
        : undefined
    })
    appliedMode = current.mode
  }

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
    syncThemeOverride()
    syncWallpaper()
  }

  const onThemeChange = (snapshot: ThemeSnapshot): void => {
    if (applyingOwnTheme || ownThemeRevisions.delete(snapshot.revision)) return
    const preference = String(snapshot.preference)
    if (!isActiveAsukaMode(current.mode)) {
      baseThemePreference = preference
      return
    }
    if (preference === baseThemePreference) return

    baseThemePreference = preference
    void settings.set('mode', 'off')
  }

  const unsubscribe = settings.subscribe(syncFromSettings)
  const removeThemeListener = ctx.on('theme/change', onThemeChange)
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
      removeThemeListener()
      if (wallpaperTimer !== undefined) clearTimeout(wallpaperTimer)
      clearThemeOverride?.()
      clearWallpaper()
    },
  }
}
