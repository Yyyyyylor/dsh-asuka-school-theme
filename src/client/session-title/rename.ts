import type { ISessions } from '@deepseek-ai/dsh-api-session-controller/client'
import type { SessionId } from '@deepseek-ai/dsh-session/types'

/** Rename through DSH's Session face so title projections settle immediately. */
export async function renameSessionTitle(sessions: ISessions, sessionId: SessionId, title: string): Promise<void> {
  const session = sessions.binding(sessionId)?.session
  if (session === undefined) throw new Error(`unknown session "${sessionId}"`)

  const result = await session.rename(title)
  if (!result.ok) throw new Error(result.error.message)
}
