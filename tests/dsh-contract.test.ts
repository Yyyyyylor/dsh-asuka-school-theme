import { readFile } from 'node:fs/promises'
import { runInNewContext } from 'node:vm'
import { get } from 'node:http'
import { Context } from '@deepseek-ai/cordis'
import { SettingsProvider } from '@deepseek-ai/dsh-settings'
import WebServer from '@deepseek-ai/dsh-host-webserver'
import * as clientStore from '@deepseek-ai/dsh-client-store'
import * as React from 'react'
import * as jsxRuntime from 'react/jsx-runtime'
import { describe, expect, it } from 'vitest'
import * as plugin from '../src/index.js'
import { ASUKA_SETTINGS_NAMESPACE } from '../src/settings.js'
import { DEFAULT_ASUKA_SETTINGS } from '../src/shared/settings.js'
import { createAsukaSettingsStore } from '../src/client/settings/settings-store.js'

/** Real DSH provider; only durable storage is replaced by an isolated memory sink. */
class MemorySettings extends SettingsProvider {
  readonly writable = true
  protected async load() { return {} }
  protected async persist() {}
}

// node:http accepts OS-assigned ports that Fetch reserves for other protocols.
function readAsset(url: string): Promise<{ status: number | undefined, type: string | undefined, bytes: number }> {
  return new Promise((resolve, reject) => {
    get(url, response => {
      let bytes = 0
      response.on('data', (chunk: Buffer) => { bytes += chunk.length })
      response.on('error', reject)
      response.on('end', () => resolve({ status: response.statusCode, type: response.headers['content-type'], bytes }))
    }).on('error', reject)
  })
}

describe('DSH 0.1.5-rc.2 contracts', () => {
  it('registers settings and routes through real Cordis services and removes them on unload', async () => {
    const ctx = new Context()
    const settings = ctx.plugin(MemorySettings)
    const server = ctx.plugin(WebServer, { host: '127.0.0.1', port: 0 })
    let theme: ReturnType<Context['plugin']> | undefined
    try {
      await settings.await()
      await server.await()
      theme = ctx.plugin(plugin)
      await theme.await()
      expect(ctx.settings.get(ASUKA_SETTINGS_NAMESPACE)).toEqual(DEFAULT_ASUKA_SETTINGS)
      expect(ctx.settings.describe()[0].applies).toBe('live')
      await ctx.settings.update(ASUKA_SETTINGS_NAMESPACE, { wallpaperPeriod: 'night', wallpaperOpacity: 1 })
      expect(ctx.settings.get(ASUKA_SETTINGS_NAMESPACE)).toMatchObject({ wallpaperPeriod: 'night', wallpaperOpacity: 1 })
      await expect(ctx.settings.update(ASUKA_SETTINGS_NAMESPACE, { wallpaperOpacity: 2 })).rejects.toThrow()
      const url = `http://127.0.0.1:${ctx.webServer.port}/asuka-school/assets/asuka-noon.webp`
      const response = await readAsset(url)
      expect(response.status).toBe(200)
      expect(response.type).toBe('image/webp')
      expect(response.bytes).toBeGreaterThan(1024)
      await theme.dispose()
      expect(ctx.settings.get(ASUKA_SETTINGS_NAMESPACE)).toBeUndefined()
      expect((await readAsset(url)).status).toBe(404)
    } finally {
      await theme?.dispose()
      await server.dispose()
      await settings.dispose()
    }
  })

  it('uses the published store engine with synchronous shared action updates', () => {
    const instance = createAsukaSettingsStore().create()
    instance.actions.sync({ status: 'ready', revision: 4, settings: { ...DEFAULT_ASUKA_SETTINGS, wallpaperBlurPx: 7 } })
    expect(instance.store.getSnapshot()).toMatchObject({ status: 'ready', revision: 4, settings: { wallpaperBlurPx: 7 } })
  })

  it('materializes the built lazy-CJS bundle using only actual 0.1.5 platform seed exports', async () => {
    // The exact seed names are from packages/client/web/src/seed.ts at dsh-v0.1.5-rc.2.
    const seeds: Record<string, unknown> = { react: React, 'react/jsx-runtime': jsxRuntime, '@deepseek-ai/dsh-client-store': clientStore }
    let loaded: { id: string, factory: (require: (id: string) => unknown) => { apply: unknown } } | undefined
    runInNewContext(await readFile('lib/client.js', 'utf8'), { window: { __ModuleLoader__: { load: (entry: typeof loaded) => { loaded = entry } } } })
    expect(loaded?.id).toBe('dsh-asuka-school-theme')
    const client = loaded!.factory(id => {
      if (!(id in seeds)) throw new Error(`Unexpected platform import: ${id}`)
      return seeds[id]
    })
    expect(client.apply).toBeTypeOf('function')
  })
})
