import { describe, expect, it } from 'vitest'
import { reconcileRangeDraft } from '../src/client/settings/range-draft.js'

describe('range draft reconciliation', () => {
  it('does not overwrite a dirty local edit with stale persisted props', () => {
    expect(reconcileRangeDraft(20, 67, true)).toEqual({ draft: 67, latest: 67 })
  })

  it('adopts persisted props when no edit is in progress', () => {
    expect(reconcileRangeDraft(42, 20, false)).toEqual({ draft: 42, latest: 42 })
  })
})
