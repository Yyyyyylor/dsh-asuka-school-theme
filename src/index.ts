import { createReadStream } from 'node:fs'
import { access, stat } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import type { Context } from '@deepseek-ai/cordis'
import type {} from '@deepseek-ai/dsh-host-webserver'
import type { ServerResponse } from 'node:http'
import {
  ASUKA_SETTINGS_NAMESPACE,
  AsukaThemeSettingsSchema,
} from './settings.js'
import { WALLPAPER_ASSET_NAMES, WALLPAPER_ROUTE_PREFIX } from './shared/wallpapers.js'

export const name = 'dsh-asuka-school-theme'
export const inject = ['settings', 'webServer']

export const ASSET_ROUTE_PREFIX = WALLPAPER_ROUTE_PREFIX
const ASSET_CACHE_CONTROL = 'public, max-age=31536000, immutable'

export const PUBLIC_ASSETS = Object.freeze([
  { name: WALLPAPER_ASSET_NAMES.morning, contentType: 'image/webp' },
  { name: WALLPAPER_ASSET_NAMES.noon, contentType: 'image/webp' },
  { name: WALLPAPER_ASSET_NAMES.night, contentType: 'image/webp' },
] as const)

/** Register one settings namespace and immutable, fixed-name image routes. */
export function apply(ctx: Context): void {
  ctx.settings.register(ASUKA_SETTINGS_NAMESPACE, AsukaThemeSettingsSchema, { applies: 'live' })

  for (const asset of PUBLIC_ASSETS) {
    const filePath = fileURLToPath(new URL(`../assets/public/${asset.name}`, import.meta.url))
    ctx.effect(() => ctx.webServer.register({
      kind: 'exact',
      path: `${ASSET_ROUTE_PREFIX}/${asset.name}`,
      handler: createAssetHandler(filePath, asset.contentType),
    }), `asuka-school-theme: asset ${asset.name}`)
  }

}

/**
 * Build a read-only HTTP handler for one package-owned asset. The request path
 * never reaches filesystem resolution, so traversal is impossible by design.
 */
export function createAssetHandler(filePath: string, contentType: string) {
  return async (request: { method?: string }, response: ServerResponse): Promise<void> => {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      response.writeHead(405, { Allow: 'GET, HEAD' })
      response.end()
      return
    }

    try {
      await access(filePath)
      const metadata = await stat(filePath)
      if (!metadata.isFile()) {
        respondNotFound(response)
        return
      }

      response.writeHead(200, {
        'Content-Type': contentType,
        'Content-Length': metadata.size,
        'Cache-Control': ASSET_CACHE_CONTROL,
        'X-Content-Type-Options': 'nosniff',
      })
      if (request.method === 'HEAD') {
        response.end()
        return
      }
      createReadStream(filePath).pipe(response)
    } catch {
      respondNotFound(response)
    }
  }
}

function respondNotFound(response: ServerResponse): void {
  response.writeHead(404, { 'Cache-Control': 'no-store' })
  response.end()
}
