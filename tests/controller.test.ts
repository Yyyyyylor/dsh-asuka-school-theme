import { describe, expect, it } from 'vitest'
import { createAsukaThemeController } from '../src/client/controller.js'
import type { AsukaThemeSettings } from '../src/shared/settings.js'

describe('Asuka theme controller', () => {
  it('activates the selected theme but yields to an external DSH appearance change', async () => {
    const themeListeners = new Set<(snapshot: { preference: string }) => void>()
    let value: AsukaThemeSettings = {
      mode: 'after-class', wallpaperEnabled: true, wallpaperPeriod: 'auto', wallpaperOpacity: 0.2, wallpaperBlurPx: 0, decorativeDetails: true, reduceMotion: false,
    }
    const watchers = new Set<() => void>()
    const writes: Array<[string, unknown]> = []
    let preference = 'light'

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
      getTheme: () => ({ preference }),
      setTheme: (next: string) => {
        preference = next
        themeListeners.forEach(listener => listener({ preference: next }))
      },
    }
    const views: unknown[] = []
    const controller = createAsukaThemeController({
      ctx: context as never,
      theme: theme as never,
      settings: scope as never,
      syncView: view => views.push(view),
    })

    expect(preference).toBe('asuka-school-light')
    expect(views).toHaveLength(1)

    themeListeners.forEach(listener => listener({ preference: 'dark' }))
    await Promise.resolve()

    expect(writes).toContainEqual(['mode', 'off'])
    controller.dispose()
  })
})
