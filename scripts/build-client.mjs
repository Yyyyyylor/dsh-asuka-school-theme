import { build } from 'esbuild'
import { mkdir, writeFile } from 'node:fs/promises'

const packageId = 'dsh-asuka-school-theme'
const result = await build({
  entryPoints: ['src/client/index.ts'],
  bundle: true,
  format: 'cjs',
  platform: 'browser',
  target: 'es2022',
  write: false,
  jsx: 'automatic',
  external: ['react', 'react/*', '@deepseek-ai/*'],
  logLevel: 'info',
})

const bundled = result.outputFiles[0].text
const wrapped = `window.__ModuleLoader__.load({\n  id: ${JSON.stringify(packageId)},\n  factory(require) {\n    const module = { exports: {} };\n    const exports = module.exports;\n${bundled}\n    return module.exports;\n  },\n});\n`

await mkdir('lib', { recursive: true })
await writeFile('lib/client.js', wrapped, 'utf8')
