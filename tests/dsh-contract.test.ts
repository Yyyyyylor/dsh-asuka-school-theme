import { readFile } from 'node:fs/promises'
import { runInNewContext } from 'node:vm'
import { get } from 'node:http'
import { Context, resolveConfig } from '@deepseek-ai/cordis'
import { SettingsForms } from '@deepseek-ai/dsh-settings'
import WebServer from '@deepseek-ai/dsh-host-webserver'
import * as clientStore from '@deepseek-ai/dsh-client-store'
import * as React from 'react'
import * as jsxRuntime from 'react/jsx-runtime'
import { describe, expect, it } from 'vitest'
import * as plugin from '../src/index.js'
import { DEFAULT_ASUKA_SETTINGS } from '../src/shared/settings.js'

/** Only the page-policy sink is isolated; persistence is covered by the Host smoke. */
function pagePolicySink(ctx: Context, policies: Set<object>) {
  ctx.provide('settings', { configure: (policy: object) => {
    policies.add(policy)
    return () => { policies.delete(policy) }
  } })
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

describe('DSH 0.2.0-rc.2 contracts', () => {
  it('exports a fully live Config with defaults and validates the actual Cordis schema contract', () => {
    expect(typeof SettingsForms.prototype.configure).toBe('function')
    expect('register' in SettingsForms.prototype).toBe(false)
    expect(plugin.Config.meta.volatile).toBe(true)
    expect(resolveConfig(plugin, {}).get()).toEqual(DEFAULT_ASUKA_SETTINGS)
    expect(resolveConfig(plugin, { wallpaperPeriod: 'night', wallpaperOpacity: 1 }).get()).toMatchObject({ wallpaperPeriod: 'night', wallpaperOpacity: 1 })
    expect(() => resolveConfig(plugin, { wallpaperOpacity: 2 })).toThrow()
  })

  it('registers the custom page policy and real WebServer routes with owned disposers', async () => {
    const ctx = new Context()
    const policies = new Set<object>()
    pagePolicySink(ctx, policies)
    const server = ctx.plugin(WebServer, { host: '127.0.0.1', port: 0 })
    let theme: ReturnType<Context['plugin']> | undefined
    try {
      await server.await()
      theme = ctx.plugin(plugin)
      await theme.await()
      expect(policies).toEqual(new Set([{ auto: false }]))
      const url = `http://127.0.0.1:${ctx.webServer.port}/asuka-school/assets/asuka-noon.webp`
      const response = await readAsset(url)
      expect(response.status).toBe(200)
      expect(response.type).toBe('image/webp')
      expect(response.bytes).toBeGreaterThan(1024)
      await theme.dispose()
      expect(policies.size).toBe(0)
      expect((await readAsset(url)).status).toBe(404)
    } finally {
      await theme?.dispose()
      await server.dispose()
    }
  })

  it('materializes the built lazy-CJS bundle using only actual 0.2.0 platform seed exports', async () => {
    // These imports are present in the installed 0.2.0-rc.2 Web frontend's staticModules seed.
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
