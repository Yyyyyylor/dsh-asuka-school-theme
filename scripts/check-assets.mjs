import { readdir, readFile, stat } from 'node:fs/promises'
import { join } from 'node:path'

const publicAssets = ['asuka-after-class.webp', 'asuka-noon.webp', 'asuka-tokyo3-night.webp']
const publicDirectory = join('assets', 'public')
const privateDirectory = join('assets', 'private')

for (const name of publicAssets) {
  const file = join(publicDirectory, name)
  const [bytes, metadata] = await Promise.all([readFile(file), stat(file)])
  if (metadata.size > 1_500_000) throw new Error(`${name} exceeds the 1.5 MB wallpaper budget`)
  if (bytes.subarray(0, 4).toString() !== 'RIFF' || bytes.subarray(8, 12).toString() !== 'WEBP') {
    throw new Error(`${name} is not a valid WebP container`)
  }
}

const privateEntries = await readdir(privateDirectory)
const packedPrivateFiles = privateEntries.filter(name => name !== '.gitkeep')
if (packedPrivateFiles.length > 0) {
  throw new Error(`assets/private must be empty before release: ${packedPrivateFiles.join(', ')}`)
}
