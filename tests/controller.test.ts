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
import { DEFAULT_ASUKA_SETTINGS, type AsukaThemeSettings } from '../src/shared/settings.js'
import type { AsukaSettingsViewState } from '../src/client/settings/settings-store.js'

describe('Asuka theme controller', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('keeps one scene selected while its atomic three-field mutation settles', async () => {
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
      mutate: async (ops: Array<{ op: string, path: string[], value?: unknown }>) => {
        for (const op of ops) {
          writes.push([op.path[0], op.value])
          value = { ...value, [op.path[0]]: op.value }
        }
        watchers.forEach(listener => listener())
        return true
      },
      unset: async () => true,
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
      mutate: async (ops: Array<{ op: string, path: string[], value?: unknown }>) => {
        for (const op of ops) {
          writes.push([op.path[0], op.value])
          value = { ...value, [op.path[0]]: op.value }
        }
        watchers.forEach(listener => listener())
        return true
      },
      unset: async () => true,
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
      mutate: () => failedWrite,
      unset: async () => true,
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

  it('restores accepted settings when ConfigForm refuses a scene and resets in one mutation', async () => {
    const value = { ...DEFAULT_ASUKA_SETTINGS }
    const mutate = vi.fn().mockResolvedValue(false)
    const scope = {
      getSnapshot: () => ({ status: 'ready' as const, value, revision: 1 }),
      subscribe: () => () => undefined,
      mutate,
    }
    const views: AsukaSettingsViewState[] = []
    const controller = createAsukaThemeController({ settings: scope as never, syncView: view => views.push(view) })
    controller.setScene('night')
    expect(views.at(-1)?.settings.wallpaperPeriod).toBe('night')
    await Promise.resolve()
    expect(views.at(-1)?.settings).toEqual(DEFAULT_ASUKA_SETTINGS)
    expect(mutate).toHaveBeenCalledTimes(1)
    expect(mutate.mock.calls[0][0]).toHaveLength(3)
    controller.reset()
    expect(mutate.mock.calls[1][0]).toEqual(Object.keys(DEFAULT_ASUKA_SETTINGS).map(field => ({ op: 'unset', path: [field] })))
    controller.dispose()
  })

  it('does not let an older refused mutation erase a newer pending scene', async () => {
    const replies: Array<(accepted: boolean) => void> = []
    const scope = {
      getSnapshot: () => ({ status: 'ready' as const, value: DEFAULT_ASUKA_SETTINGS, revision: 1 }),
      subscribe: () => () => undefined,
      mutate: () => new Promise<boolean>(resolve => { replies.push(resolve) }),
    }
    const views: AsukaSettingsViewState[] = []
    const controller = createAsukaThemeController({ settings: scope as never, syncView: view => views.push(view) })
    controller.setScene('morning')
    controller.setScene('night')
    replies[0](false)
    await Promise.resolve()
    expect(views.at(-1)?.settings.wallpaperPeriod).toBe('night')
    replies[1](false)
    await Promise.resolve()
    expect(views.at(-1)?.settings).toEqual(DEFAULT_ASUKA_SETTINGS)
    controller.dispose()
  })
})
