import { readFile } from 'node:fs/promises'
import { describe, expect, it } from 'vitest'

describe('DSH Store manifest contract', () => {
  it('keeps canonical identity, a unique package-owned entry and no installation lifecycle', async () => {
    const manifest = JSON.parse(await readFile('package.json', 'utf8'))
    const patch = await readFile('cordis.patch.yml', 'utf8')
    const repository = 'https://github.com/Yyyyyylor/dsh-asuka-school-theme'
    expect(manifest.repository).toEqual({ type: 'git', url: repository })
    expect(manifest.homepage).toBe(`${repository}#readme`)
    expect(manifest.bugs.url).toBe(`${repository}/issues`)
    expect(manifest.license).toBe('MIT')
    expect(manifest.dsh.bundle.patch).toBe('./cordis.patch.yml')
    expect([...patch.matchAll(/^\s*- id: (\S+)/gm)].map(match => match[1])).toEqual(['asuka-school-theme'])
    expect(patch).toContain("name: 'dsh-asuka-school-theme'")
    expect(patch).not.toMatch(/disabled:|@deepseek-ai\//)
    for (const hook of ['preinstall', 'install', 'postinstall', 'prepare']) expect(manifest.scripts[hook]).toBeUndefined()
    expect(manifest.files).toEqual(['lib', 'assets/public', 'assets/LICENSE.md', 'cordis.patch.yml', 'README.md', 'README-zh-CN.md', 'STORE-REVIEW.md', 'LICENSE'])
    for (const path of ['LICENSE', 'assets/LICENSE.md', 'STORE-REVIEW.md']) expect((await readFile(path, 'utf8')).length).toBeGreaterThan(100)
  })

  it('pins the audited runtime graph and DSH peers without adding platform packages to runtime dependencies', async () => {
    const manifest = JSON.parse(await readFile('package.json', 'utf8'))
    expect(manifest.dependencies).toEqual({ '@deepseek-ai/schemastery': '3.18.4' })
    expect(manifest.optionalDependencies).toBeUndefined()
    expect(manifest.dsh.compatibility.dshReleases).toEqual({ '0.2.0-rc.2': 'compatible' })
    expect(manifest.peerDependencies['@deepseek-ai/cordis']).toBe('~4.0.4')
    for (const [name, version] of Object.entries(manifest.peerDependencies)) {
      if (name.startsWith('@deepseek-ai/dsh-')) expect(version).toBe('0.2.0-rc.2')
      expect(manifest.peerDependenciesMeta[name].optional).toBe(true)
    }
    for (const name of manifest.dsh.client.inject) {
      expect(manifest.peerDependencies[name]).toBe('0.2.0-rc.2')
      expect(manifest.devDependencies[name]).toBe('0.2.0-rc.2')
    }
    expect(manifest.dsh.client.inject).not.toContain('@deepseek-ai/dsh-client-runtime')
    expect(manifest.dsh.client.inject).not.toContain('@deepseek-ai/dsh-client-store')
  })
})
