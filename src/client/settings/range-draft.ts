export interface ReconciledRangeDraft {
  draft: number
  latest: number
}

/** Keep an in-progress pointer/keyboard edit authoritative over stale store props. */
export function reconcileRangeDraft(persisted: number, draft: number, dirty: boolean): ReconciledRangeDraft {
  const next = dirty ? draft : persisted
  return { draft: next, latest: next }
}
