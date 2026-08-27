import { createServer, request as httpRequest } from 'node:http'
import { once } from 'node:events'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { PUBLIC_ASSETS, createAssetHandler } from '../src/index.js'
import { wallpaperAssetUrl } from '../src/shared/wallpapers.js'

describe('public wallpaper route', () => {
  it('publishes a distinct morning, noon, and night asset URL', () => {
    expect(PUBLIC_ASSETS).toHaveLength(3)
    expect(PUBLIC_ASSETS.map(asset => asset.name)).toEqual([
      'asuka-after-class.webp',
      'asuka-noon.webp',
      'asuka-tokyo3-night.webp',
    ])
    expect(wallpaperAssetUrl('morning')).toContain('asuka-after-class.webp')
    expect(wallpaperAssetUrl('noon')).toContain('asuka-noon.webp')
    expect(wallpaperAssetUrl('night')).toContain('asuka-tokyo3-night.webp')
  })

  it('serves only GET and HEAD, with a valid WebP response', async () => {
    const handler = createAssetHandler(join(process.cwd(), 'assets', 'public', 'asuka-after-class.webp'), 'image/webp')
    const server = createServer((request, response) => {
      if (request.url === '/wallpaper') return handler(request, response)
      response.writeHead(404).end()
    })
    server.listen(0, '127.0.0.1')
    await once(server, 'listening')
    const address = server.address()
    if (address === null || typeof address === 'string') throw new Error('server did not bind a TCP port')
    try {
      const get = await requestAsset(address.port, '/wallpaper')
      expect(get.status).toBe(200)
      expect(get.headers['content-type']).toBe('image/webp')
      expect(get.headers['x-content-type-options']).toBe('nosniff')
      expect(get.body.byteLength).toBeGreaterThan(1024)

      const head = await requestAsset(address.port, '/wallpaper', 'HEAD')
      expect(head.status).toBe(200)
      expect(head.body.byteLength).toBe(0)

      const post = await requestAsset(address.port, '/wallpaper', 'POST')
      expect(post.status).toBe(405)
      expect(post.headers.allow).toBe('GET, HEAD')

      const traversal = await requestAsset(address.port, '/wallpaper/../private/secret.webp')
      expect(traversal.status).toBe(404)
    } finally {
      server.close()
      await once(server, 'close')
    }
  })

  it('returns 404 when a fixed public asset is absent', async () => {
    const handler = createAssetHandler(join(process.cwd(), 'assets', 'public', 'missing.webp'), 'image/webp')
    const server = createServer(handler)
    server.listen(0, '127.0.0.1')
    await once(server, 'listening')
    const address = server.address()
    if (address === null || typeof address === 'string') throw new Error('server did not bind a TCP port')
    try {
      expect((await requestAsset(address.port, '/')).status).toBe(404)
    } finally {
      server.close()
      await once(server, 'close')
    }
  })
})

function requestAsset(port: number, path: string, method = 'GET'): Promise<{ status: number, headers: Record<string, string | string[] | undefined>, body: Buffer }> {
  return new Promise((resolve, reject) => {
    const request = httpRequest({ hostname: '127.0.0.1', port, path, method }, response => {
      const chunks: Buffer[] = []
      response.on('data', chunk => chunks.push(Buffer.from(chunk)))
      response.on('end', () => resolve({
        status: response.statusCode ?? 0,
        headers: response.headers,
        body: Buffer.concat(chunks),
      }))
    })
    request.once('error', reject)
    request.end()
  })
}
