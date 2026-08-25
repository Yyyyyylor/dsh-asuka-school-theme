import type { Context } from '@deepseek-ai/cordis'
import type { SettingsScope } from '@deepseek-ai/dsh-client-runtime/client'
import type { ThemeRuntime, ThemeSnapshot } from '@deepseek-ai/dsh-client-ui-theme/client'
import {
  asukaThemeId,
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

function isBuiltInThemePreference(value: string): value is 'light' | 'dark' | 'system' {
  return value === 'light' || value === 'dark' || value === 'system'
}

function fallbackThemePreference(snapshot: ThemeSnapshot): 'light' | 'dark' | 'system' {
  const preference = String(snapshot.preference)
  return isBuiltInThemePreference(preference) ? preference : snapshot.active.colorScheme
}

/** Single source of truth for the Quick Row, Settings page, ThemeRuntime, and wallpaper layer. */
export function createAsukaThemeController(options: AsukaThemeControllerOptions): AsukaThemeController {
  const { ctx, theme, settings, syncView } = options
  let current = DEFAULT_ASUKA_SETTINGS
  let wallpaperTimer: ReturnType<typeof setTimeout> | undefined
  let appliedMode: AsukaMode = 'off'
  let applyingOwnTheme = false
  let synchronouslyObservedOwnRevision: number | undefined
  const deferredOwnThemeRevisions = new Set<number>()
  let baseThemePreference = fallbackThemePreference(theme.getTheme())

  const mutateOwnTheme = (change: () => void): void => {
    const previousRevision = theme.getTheme().revision
    synchronouslyObservedOwnRevision = undefined
    applyingOwnTheme = true
    try {
      change()
    } finally {
      applyingOwnTheme = false
    }

    const revision = theme.getTheme().revision
    if (revision !== previousRevision && synchronouslyObservedOwnRevision !== revision) {
      deferredOwnThemeRevisions.add(revision)
    }
  }

  const syncTheme = (): void => {
    const target = asukaThemeId(current.mode)
    const snapshot = theme.getTheme()
    const preference = String(snapshot.preference)

    if (target === undefined) {
      const previousTarget = asukaThemeId(appliedMode)
      if (previousTarget !== undefined && preference === previousTarget) {
        mutateOwnTheme(() => theme.setTheme(baseThemePreference))
      } else if (isBuiltInThemePreference(preference)) {
        baseThemePreference = preference
      }
      appliedMode = 'off'
      return
    }

    if (isBuiltInThemePreference(preference)) baseThemePreference = preference
    if (preference !== target) mutateOwnTheme(() => theme.setTheme(target))
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
    syncTheme()
    syncWallpaper()
  }

  const onThemeChange = (snapshot: ThemeSnapshot): void => {
    if (applyingOwnTheme) {
      synchronouslyObservedOwnRevision = snapshot.revision
      return
    }
    if (deferredOwnThemeRevisions.delete(snapshot.revision)) return

    const preference = String(snapshot.preference)
    if (!isActiveAsukaMode(current.mode)) {
      if (isBuiltInThemePreference(preference)) baseThemePreference = preference
      return
    }

    if (preference === asukaThemeId(current.mode)) return
    if (isBuiltInThemePreference(preference)) baseThemePreference = preference
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
      clearWallpaper()
    },
  }
}
