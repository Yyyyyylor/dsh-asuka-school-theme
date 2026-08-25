import { readFile } from 'node:fs/promises'

const [manifestText, client] = await Promise.all([
  readFile('package.json', 'utf8'),
  readFile('lib/client.js', 'utf8'),
])
const manifest = JSON.parse(manifestText)

if (manifest.exports['./client'].default !== './lib/client.js') throw new Error('client export must point to lib/client.js')
if (!client.includes('window.__ModuleLoader__.load')) throw new Error('client bundle is not a DSH lazy-CJS factory')
if (!client.includes('id: "dsh-asuka-school-theme"')) throw new Error('client factory id does not match the package name')
if (client.includes('react.development') || client.includes('react.production')) throw new Error('client bundle contains React instead of requesting the platform runtime')
if (client.includes('@deepseek-ai/dsh-settings') || client.includes('@deepseek-ai/schemastery')) throw new Error('client bundle imports Host-only settings modules')
