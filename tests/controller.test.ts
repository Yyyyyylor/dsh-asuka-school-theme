import { describe, expect, it } from 'vitest'
import { createAsukaThemeController } from '../src/client/controller.js'
import type { AsukaThemeSettings } from '../src/shared/settings.js'

describe('Asuka theme controller', () => {
  it('selects registered Asuka themes and releases the official appearance only on a user change', async () => {
    let value: AsukaThemeSettings = {
      mode: 'after-class', wallpaperEnabled: true, wallpaperPeriod: 'auto', wallpaperOpacity: 0.2, wallpaperBlurPx: 0, decorativeDetails: true, reduceMotion: false,
    }
    const watchers = new Set<() => void>()
    const writes: Array<[string, unknown]> = []
    const themeListeners = new Set<(snapshot: { preference: string, active: { colorScheme: 'light' | 'dark' }, revision: number }) => void>()
    let preference = 'light'
    let revision = 0
    const snapshot = () => ({ preference, active: { colorScheme: preference === 'asuka-school-dark' || preference === 'dark' ? 'dark' as const : 'light' as const }, revision })
    const theme = {
      getTheme: snapshot,
      setTheme: (next: string) => {
        if (preference === next) return
        preference = next
        revision += 1
        themeListeners.forEach(listener => listener(snapshot()))
      },
    }
    const ctx = {
      on: (_event: string, listener: (snapshot: ReturnType<typeof snapshot>) => void) => {
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
    const views: unknown[] = []
    const controller = createAsukaThemeController({
      ctx: ctx as never,
      theme: theme as never,
      settings: scope as never,
      syncView: view => views.push(view),
    })

    expect(views).toHaveLength(1)
    expect(preference).toBe('asuka-school-light')
    expect(writes).not.toContainEqual(['mode', 'off'])

    controller.setScene('noon')
    await Promise.resolve()

    expect(writes).toContainEqual(['mode', 'after-class'])
    expect(writes).toContainEqual(['wallpaperEnabled', true])
    expect(writes).toContainEqual(['wallpaperPeriod', 'noon'])
    expect(preference).toBe('asuka-school-light')

    theme.setTheme('dark')
    await Promise.resolve()

    expect(writes).toContainEqual(['mode', 'off'])
    expect(preference).toBe('dark')

    controller.setMode('off')
    await Promise.resolve()

    expect(writes).toContainEqual(['mode', 'off'])
    controller.dispose()
  })
})
