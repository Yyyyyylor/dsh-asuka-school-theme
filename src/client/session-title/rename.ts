import type { ISessions, SessionId } from '@deepseek-ai/dsh-client-runtime/client'

/** Rename through DSH's Session face so title projections settle immediately. */
export async function renameSessionTitle(sessions: ISessions, sessionId: SessionId, title: string): Promise<void> {
  const session = sessions.binding(sessionId)?.session
  if (session === undefined) throw new Error(`unknown session "${sessionId}"`)

  const result = await session.rename(title)
  if (!result.ok) throw new Error(result.error.message)
}
