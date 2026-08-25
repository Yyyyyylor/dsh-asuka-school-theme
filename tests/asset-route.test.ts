import { createServer } from 'node:http'
import { once } from 'node:events'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { createAssetHandler } from '../src/index.js'

describe('public wallpaper route', () => {
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
    const base = `http://127.0.0.1:${address.port}`

    try {
      const get = await fetch(`${base}/wallpaper`)
      expect(get.status).toBe(200)
      expect(get.headers.get('content-type')).toBe('image/webp')
      expect(get.headers.get('x-content-type-options')).toBe('nosniff')
      expect((await get.arrayBuffer()).byteLength).toBeGreaterThan(1024)

      const head = await fetch(`${base}/wallpaper`, { method: 'HEAD' })
      expect(head.status).toBe(200)
      expect((await head.arrayBuffer()).byteLength).toBe(0)

      const post = await fetch(`${base}/wallpaper`, { method: 'POST' })
      expect(post.status).toBe(405)
      expect(post.headers.get('allow')).toBe('GET, HEAD')

      const traversal = await fetch(`${base}/wallpaper/../private/secret.webp`)
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
      expect((await fetch(`http://127.0.0.1:${address.port}`)).status).toBe(404)
    } finally {
      server.close()
      await once(server, 'close')
    }
  })
})
