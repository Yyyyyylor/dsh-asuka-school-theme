import { readFile } from 'node:fs/promises'
import { describe, expect, it } from 'vitest'

describe('DSH Store manifest contract', () => {
  it('keeps one package-owned entry, an allowlisted package, and no installation lifecycle', async () => {
    const manifest = JSON.parse(await readFile('package.json', 'utf8'))
    const patch = await readFile('cordis.patch.yml', 'utf8')
    expect(manifest.dsh.bundle.patch).toBe('./cordis.patch.yml')
    expect([...patch.matchAll(/^\s*- id: (\S+)/gm)].map(match => match[1])).toEqual(['asuka-school-theme'])
    expect(patch).toContain("name: 'dsh-asuka-school-theme'")
    expect(patch).not.toMatch(/disabled:|@deepseek-ai\//)
    for (const hook of ['preinstall', 'install', 'postinstall', 'prepare']) expect(manifest.scripts[hook]).toBeUndefined()
    expect(manifest.files).toEqual(['lib', 'assets/public', 'assets/LICENSE.md', 'cordis.patch.yml', 'README.md', 'README-zh-CN.md', 'STORE-REVIEW.md', 'LICENSE'])
  })

  it('keeps declared DSH compatibility, peers, and development packages aligned', async () => {
    const manifest = JSON.parse(await readFile('package.json', 'utf8'))
    expect(manifest.dependencies).toEqual({ '@deepseek-ai/schemastery': '3.18.4' })
    expect(manifest.optionalDependencies).toBeUndefined()
    const dshReleases = manifest.dsh.compatibility.dshReleases
    const [dshVersion] = Object.keys(dshReleases)
    expect(Object.keys(dshReleases)).toHaveLength(1)
    expect(dshReleases[dshVersion]).toBe('compatible')
    expect(manifest.peerDependencies['@deepseek-ai/cordis']).toBe('~4.0.4')
    for (const [name, version] of Object.entries(manifest.peerDependencies)) {
      if (name.startsWith('@deepseek-ai/dsh-')) expect(version).toBe(dshVersion)
      expect(manifest.peerDependenciesMeta[name].optional).toBe(true)
    }
    for (const name of manifest.dsh.client.inject) {
      expect(manifest.peerDependencies[name]).toBe(dshVersion)
      expect(manifest.devDependencies[name]).toBe(dshVersion)
    }
    expect(manifest.dsh.client.inject).not.toContain('@deepseek-ai/dsh-client-store')
  })
})
