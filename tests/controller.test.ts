import { describe, expect, it } from 'vitest'
import { createAsukaThemeController } from '../src/client/controller.js'
import type { AsukaThemeSettings } from '../src/shared/settings.js'
import type { AsukaSettingsViewState } from '../src/client/settings/settings-store.js'

describe('Asuka theme controller', () => {
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
})
