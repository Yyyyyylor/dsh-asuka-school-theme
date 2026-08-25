import { describe, expect, it } from 'vitest'
import { createAsukaThemeController } from '../src/client/controller.js'
import type { AsukaThemeSettings } from '../src/shared/settings.js'

describe('Asuka theme controller', () => {
  it('keeps the selected mode when its own delayed theme event arrives, then yields to an external DSH appearance change', async () => {
    const themeListeners = new Set<(snapshot: { preference: string }) => void>()
    let value: AsukaThemeSettings = {
      mode: 'after-class', wallpaperEnabled: true, wallpaperPeriod: 'auto', wallpaperOpacity: 0.2, wallpaperBlurPx: 0, decorativeDetails: true, reduceMotion: false,
    }
    const watchers = new Set<() => void>()
    const writes: Array<[string, unknown]> = []
    let preference = 'light'
    let revision = 0
    const delayedThemeEvents: Array<{ preference: string, revision: number }> = []

    const context = {
      on: (_event: string, listener: (snapshot: { preference: string }) => void) => {
        themeListeners.add(listener)
        return () => themeListeners.delete(listener)
      },
    }
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
    const theme = {
      getTheme: () => ({ preference, revision }),
      overrideTokens: () => {
        revision += 1
        delayedThemeEvents.push({ preference, revision })
        return () => {
          revision += 1
          delayedThemeEvents.push({ preference, revision })
        }
      },
    }
    const views: unknown[] = []
    const controller = createAsukaThemeController({
      ctx: context as never,
      theme: theme as never,
      settings: scope as never,
      syncView: view => views.push(view),
    })

    expect(views).toHaveLength(1)

    delayedThemeEvents.forEach(snapshot => themeListeners.forEach(listener => listener(snapshot)))
    await Promise.resolve()

    expect(writes).not.toContainEqual(['mode', 'off'])

    preference = 'dark'
    revision += 1
    themeListeners.forEach(listener => listener({ preference, revision }))
    await Promise.resolve()

    expect(writes).toContainEqual(['mode', 'off'])
    controller.dispose()
  })
})
