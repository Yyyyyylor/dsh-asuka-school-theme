import { beforeEach, describe, expect, it, vi } from 'vitest'

const presentation = vi.hoisted(() => ({ apply: vi.fn(), clear: vi.fn() }))
const wallpaper = vi.hoisted(() => ({ apply: vi.fn(), clear: vi.fn(), updateAppearance: vi.fn() }))

vi.mock('../src/client/presentation.js', () => ({
  applyAsukaPresentation: presentation.apply,
  clearAsukaPresentation: presentation.clear,
}))
vi.mock('../src/client/wallpaper/runtime.js', () => ({
  applyWallpaper: wallpaper.apply,
  clearWallpaper: wallpaper.clear,
  updateWallpaperAppearance: wallpaper.updateAppearance,
}))

import { createAsukaThemeController } from '../src/client/controller.js'
import type { AsukaThemeSettings } from '../src/shared/settings.js'
import type { AsukaSettingsViewState } from '../src/client/settings/settings-store.js'

describe('Asuka theme controller', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('keeps one scene visually selected while its three persisted fields settle', async () => {
    let value: AsukaThemeSettings = {
      mode: 'off', wallpaperEnabled: true, wallpaperPeriod: 'auto', wallpaperOpacity: 0.2, wallpaperBlurPx: 0, decorativeDetails: true, reduceMotion: false,
    }
    const watchers = new Set<() => void>()
    const writes: Array<[string, unknown]> = []
    const scope = {
      getSnapshot: () => ({ status: 'ready' as const, value, revision: 1, base: {}, user: {}, writable: true, mode: 'host' as const }),
      subscribe: (listener: () => void) => { watchers.add(listener); return () => watchers.delete(listener) },
      set: async (field: string, next: unknown) => {
        writes.push([field, next])
        value = { ...value, [field]: next }
        watchers.forEach(listener => listener())
      },
      unset: async () => undefined,
    }
    const views: AsukaSettingsViewState[] = []
    const controller = createAsukaThemeController({
      settings: scope as never,
      syncView: view => views.push(view),
    })

    expect(views).toHaveLength(1)
    const beforeScene = views.length

    controller.setScene('noon')
    await Promise.resolve()
    await Promise.resolve()

    expect(writes).toContainEqual(['mode', 'after-class'])
    expect(writes).toContainEqual(['wallpaperEnabled', true])
    expect(writes).toContainEqual(['wallpaperPeriod', 'noon'])
    expect(value).toMatchObject({ mode: 'after-class', wallpaperEnabled: true, wallpaperPeriod: 'noon' })
    expect(views.slice(beforeScene).every(view => view.settings.mode === 'after-class' && view.settings.wallpaperPeriod === 'noon')).toBe(true)

    controller.setMode('off')
    await Promise.resolve()

    expect(writes).toContainEqual(['mode', 'off'])
    controller.dispose()
  })

  it('applies opacity changes without rewriting theme tokens or resetting the auto timer', async () => {
    vi.useFakeTimers()
    let value: AsukaThemeSettings = {
      mode: 'after-class', wallpaperEnabled: true, wallpaperPeriod: 'auto', wallpaperOpacity: 0.2, wallpaperBlurPx: 0, decorativeDetails: true, reduceMotion: false,
    }
    const watchers = new Set<() => void>()
    const writes: Array<[string, unknown]> = []
    const scope = {
      getSnapshot: () => ({ status: 'ready' as const, value, revision: 1, base: {}, user: {}, writable: true, mode: 'host' as const }),
      subscribe: (listener: () => void) => { watchers.add(listener); return () => watchers.delete(listener) },
      set: async (field: string, next: unknown) => {
        writes.push([field, next])
        value = { ...value, [field]: next }
        watchers.forEach(listener => listener())
      },
      unset: async () => undefined,
    }
    const controller = createAsukaThemeController({ settings: scope as never, syncView: () => undefined })

    expect(presentation.apply).toHaveBeenCalledTimes(1)
    expect(wallpaper.apply).toHaveBeenCalledTimes(1)
    expect(vi.getTimerCount()).toBe(1)

    controller.setOpacity(0.437)
    await Promise.resolve()

    expect(writes).toContainEqual(['wallpaperOpacity', 0.44])
    expect(presentation.apply).toHaveBeenCalledTimes(1)
    expect(wallpaper.apply).toHaveBeenCalledTimes(1)
    expect(wallpaper.updateAppearance).toHaveBeenLastCalledWith(0.44, 0, expect.any(String))
    expect(vi.getTimerCount()).toBe(1)

    controller.previewBlur(7.6)
    expect(wallpaper.updateAppearance).toHaveBeenLastCalledWith(0.44, 8, expect.any(String))
    expect(writes).not.toContainEqual(['wallpaperBlurPx', 8])

    controller.dispose()
    expect(vi.getTimerCount()).toBe(0)
    vi.useRealTimers()
  })

  it('does not resync a rejected scene write after disposal', async () => {
    let rejectWrite: ((reason?: unknown) => void) | undefined
    const failedWrite = new Promise<void>((_resolve, reject) => { rejectWrite = reject })
    const value: AsukaThemeSettings = {
      mode: 'off', wallpaperEnabled: false, wallpaperPeriod: 'auto', wallpaperOpacity: 0.2, wallpaperBlurPx: 0, decorativeDetails: true, reduceMotion: false,
    }
    const scope = {
      getSnapshot: () => ({ status: 'ready' as const, value, revision: 1, base: {}, user: {}, writable: true, mode: 'host' as const }),
      subscribe: () => () => undefined,
      set: () => failedWrite,
      unset: async () => undefined,
    }
    const views: AsukaSettingsViewState[] = []
    const controller = createAsukaThemeController({ settings: scope as never, syncView: view => views.push(view) })

    controller.setScene('night')
    expect(views).toHaveLength(2)
    controller.dispose()
    rejectWrite?.(new Error('host closed'))
    await Promise.resolve()
    await Promise.resolve()

    expect(views).toHaveLength(2)
    expect(wallpaper.apply).toHaveBeenCalledTimes(2)
  })
})
