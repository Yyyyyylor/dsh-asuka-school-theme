import type { ISessions } from '@deepseek-ai/dsh-api-session-controller/client';
import type { SessionId } from '@deepseek-ai/dsh-session/types';
/** Rename through DSH's Session face so title projections settle immediately. */
export declare function renameSessionTitle(sessions: ISessions, sessionId: SessionId, title: string): Promise<void>;
//# sourceMappingURL=rename.d.ts.map