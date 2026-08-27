import type { SettingsScope } from '@deepseek-ai/dsh-client-runtime/client'
import {
  clampBlur,
  clampOpacity,
  DEFAULT_ASUKA_SETTINGS,
  isAsukaMode,
  millisecondsUntilNextWallpaperPeriod,
  resolveAsukaPresentationMode,
  resolveWallpaperPeriod,
  type AsukaMode,
  type AsukaThemeSettings,
  type WallpaperPeriod,
  type WallpaperPeriodPreference,
} from '../shared/settings.js'
import { applyAsukaPresentation, clearAsukaPresentation } from './presentation.js'
import { applyWallpaper, clearWallpaper, updateWallpaperAppearance } from './wallpaper/runtime.js'
import type { AsukaSettingsViewState } from './settings/settings-store.js'

export interface AsukaThemeController {
  setMode(mode: AsukaMode): void
  setScene(period: WallpaperPeriod): void
  setWallpaperEnabled(value: boolean): void
  setWallpaperPeriod(value: WallpaperPeriodPreference): void
  setOpacity(value: number): void
  setBlur(value: number): void
  previewOpacity(value: number): void
  previewBlur(value: number): void
  setDecorativeDetails(value: boolean): void
  setReduceMotion(value: boolean): void
  reset(): void
  dispose(): void
}

interface AsukaThemeControllerOptions {
  settings: SettingsScope<AsukaThemeSettings>
  syncView: (next: AsukaSettingsViewState) => void
}

/** Single source of truth for the Quick Row, Settings page, presentation, and wallpaper layer. */
export function createAsukaThemeController(options: AsukaThemeControllerOptions): AsukaThemeController {
  const { settings, syncView } = options
  let current = DEFAULT_ASUKA_SETTINGS
  let wallpaperTimer: ReturnType<typeof setTimeout> | undefined
  let pendingScene: AsukaThemeSettings | undefined
  let applied: { settings: AsukaThemeSettings, period: WallpaperPeriod, presentationMode: AsukaMode } | undefined
  let disposed = false

  const syncScene = (fromTimer = false): void => {
    if (disposed) return
    const period = resolveWallpaperPeriod(current.wallpaperPeriod)
    const presentationMode = resolveAsukaPresentationMode(current.mode, current.wallpaperPeriod, period)
    const previous = applied
    if (previous === undefined
      || previous.presentationMode !== presentationMode
      || previous.period !== period
      || previous.settings.reduceMotion !== current.reduceMotion) {
      applyAsukaPresentation(presentationMode, period, current.reduceMotion)
    }

    const wallpaperStructureChanged = previous === undefined
      || previous.period !== period
      || previous.settings.mode !== current.mode
      || previous.settings.wallpaperEnabled !== current.wallpaperEnabled
      || previous.settings.wallpaperPeriod !== current.wallpaperPeriod
      || previous.settings.decorativeDetails !== current.decorativeDetails
      || previous.settings.reduceMotion !== current.reduceMotion
    if (wallpaperStructureChanged) applyWallpaper(current, period)
    else if (previous.settings.wallpaperOpacity !== current.wallpaperOpacity
      || previous.settings.wallpaperBlurPx !== current.wallpaperBlurPx) {
      updateWallpaperAppearance(current.wallpaperOpacity, current.wallpaperBlurPx, period)
    }
    applied = { settings: { ...current }, period, presentationMode }

    const timerInputsChanged = fromTimer || previous === undefined
      || previous.settings.mode !== current.mode
      || previous.settings.wallpaperEnabled !== current.wallpaperEnabled
      || previous.settings.wallpaperPeriod !== current.wallpaperPeriod
    if (!timerInputsChanged) return
    if (wallpaperTimer !== undefined) clearTimeout(wallpaperTimer)
    wallpaperTimer = undefined
    if (current.mode === 'off' || !current.wallpaperEnabled || current.wallpaperPeriod !== 'auto') return
    wallpaperTimer = setTimeout(() => syncScene(true), millisecondsUntilNextWallpaperPeriod())
  }

  const present = (status: AsukaSettingsViewState['status'], revision: number): void => {
    if (disposed) return
    syncView({ status, settings: current, revision })
    if (status !== 'ready') return
    syncScene()
  }

  const syncFromSettings = (): void => {
    if (disposed) return
    const snapshot = settings.getSnapshot()
    const persisted = snapshot.value ?? DEFAULT_ASUKA_SETTINGS
    if (pendingScene !== undefined) {
      const complete = persisted.mode === pendingScene.mode
        && persisted.wallpaperEnabled === pendingScene.wallpaperEnabled
        && persisted.wallpaperPeriod === pendingScene.wallpaperPeriod
      if (!complete) {
        present(snapshot.status, snapshot.revision ?? -1)
        return
      }
      pendingScene = undefined
    }

    current = persisted
    present(snapshot.status, snapshot.revision ?? -1)
  }

  const unsubscribe = settings.subscribe(syncFromSettings)
  syncFromSettings()

  return {
    setMode: (mode) => {
      if (disposed || !isAsukaMode(mode)) return
      pendingScene = undefined
      void settings.set('mode', mode)
    },
    setScene: (period) => {
      if (disposed) return
      const mode: AsukaMode = period === 'night' ? 'tokyo3-night' : 'after-class'
      const snapshot = settings.getSnapshot()
      pendingScene = {
        ...(snapshot.value ?? current),
        mode,
        wallpaperEnabled: true,
        wallpaperPeriod: period,
      }
      current = pendingScene
      present(snapshot.status, snapshot.revision ?? -1)
      void Promise.all([
        settings.set('mode', mode),
        settings.set('wallpaperEnabled', true),
        settings.set('wallpaperPeriod', period),
      ]).catch(() => {
        if (disposed) return
        pendingScene = undefined
        syncFromSettings()
      })
    },
    setWallpaperEnabled: (value) => { if (!disposed) void settings.set('wallpaperEnabled', Boolean(value)) },
    setWallpaperPeriod: (value) => { if (!disposed && ['auto', 'morning', 'noon', 'night'].includes(value)) void settings.set('wallpaperPeriod', value) },
    setOpacity: (value) => { if (!disposed) void settings.set('wallpaperOpacity', clampOpacity(value)) },
    setBlur: (value) => { if (!disposed) void settings.set('wallpaperBlurPx', clampBlur(value)) },
    previewOpacity: (value) => {
      if (disposed) return
      updateWallpaperAppearance(clampOpacity(value), current.wallpaperBlurPx, resolveWallpaperPeriod(current.wallpaperPeriod))
    },
    previewBlur: (value) => {
      if (disposed) return
      updateWallpaperAppearance(current.wallpaperOpacity, clampBlur(value), resolveWallpaperPeriod(current.wallpaperPeriod))
    },
    setDecorativeDetails: (value) => { if (!disposed) void settings.set('decorativeDetails', Boolean(value)) },
    setReduceMotion: (value) => { if (!disposed) void settings.set('reduceMotion', Boolean(value)) },
    reset: () => {
      if (disposed) return
      for (const field of Object.keys(DEFAULT_ASUKA_SETTINGS)) void settings.unset(field)
    },
    dispose: () => {
      if (disposed) return
      disposed = true
      unsubscribe()
      if (wallpaperTimer !== undefined) clearTimeout(wallpaperTimer)
      clearAsukaPresentation()
      clearWallpaper()
      applied = undefined
    },
  }
}
