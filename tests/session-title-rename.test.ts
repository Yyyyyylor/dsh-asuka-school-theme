import { describe, expect, it, vi } from 'vitest'
import { renameSessionTitle } from '../src/client/session-title/rename.js'

describe('renameSessionTitle', () => {
  it('uses the DSH Session rename face', async () => {
    const rename = vi.fn().mockResolvedValue({ ok: true, value: { title: 'Accepted', seq: 12 } })
    const sessions = { binding: () => ({ session: { rename } }) }

    await renameSessionTitle(sessions as never, 'session' as never, 'Requested')

    expect(rename).toHaveBeenCalledWith('Requested')
  })

  it('surfaces Host business errors and missing session bindings', async () => {
    const rejected = {
      binding: () => ({
        session: {
          rename: vi.fn().mockResolvedValue({ ok: false, error: { code: 'title-invalid', message: 'Invalid title' } }),
        },
      }),
    }
    await expect(renameSessionTitle(rejected as never, 'session' as never, '   ')).rejects.toThrow('Invalid title')
    await expect(renameSessionTitle({ binding: () => undefined } as never, 'missing' as never, 'Title')).rejects.toThrow('unknown session "missing"')
  })
})
