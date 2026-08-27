export interface ReconciledRangeDraft {
    draft: number;
    latest: number;
}
/** Keep an in-progress pointer/keyboard edit authoritative over stale store props. */
export declare function reconcileRangeDraft(persisted: number, draft: number, dirty: boolean): ReconciledRangeDraft;
//# sourceMappingURL=range-draft.d.ts.map