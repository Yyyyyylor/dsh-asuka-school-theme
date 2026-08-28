import { useCallback, useEffect, useRef, useState, type FocusEvent, type KeyboardEvent } from 'react'
import type { PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import type {} from '@deepseek-ai/dsh-client-ui-conversation/client'

interface SessionTitleEditorInjected {
  renameTitle: (title: string) => Promise<void>
}

type SessionTitleEditorProps = PropsRuntime<'conversation.session.header.actions'>
  & PropsLocale<'settings.asuka-school'>
  & SessionTitleEditorInjected

export function SessionTitleEditor({ sessionId, useSessions, renameTitle, t }: SessionTitleEditorProps) {
  const currentTitle = useSessions(state => state.byId[sessionId]?.displayTitle ?? sessionId)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const composingRef = useRef(false)
  const savingRef = useRef(false)
  const mountedRef = useRef(true)
  const focusTimerRef = useRef<ReturnType<typeof setTimeout>>()
  const trimmedDraft = draft.trim()

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
      if (focusTimerRef.current !== undefined) clearTimeout(focusTimerRef.current)
    }
  }, [])

  useEffect(() => {
    if (!editing) return
    inputRef.current?.focus()
    inputRef.current?.select()
  }, [editing])

  const restoreTriggerFocus = useCallback(() => {
    if (focusTimerRef.current !== undefined) clearTimeout(focusTimerRef.current)
    focusTimerRef.current = setTimeout(() => {
      focusTimerRef.current = undefined
      triggerRef.current?.focus()
    }, 0)
  }, [])

  const openEditor = () => {
    setDraft(currentTitle)
    setError(null)
    setEditing(true)
  }

  const closeEditor = useCallback(() => {
    if (savingRef.current) return
    setEditing(false)
    setError(null)
    restoreTriggerFocus()
  }, [restoreTriggerFocus])

  const confirmRename = useCallback(async () => {
    const title = draft.trim()
    if (savingRef.current || title === '') return

    savingRef.current = true
    setSaving(true)
    setError(null)
    try {
      await renameTitle(title)
      if (!mountedRef.current) return
      setEditing(false)
      restoreTriggerFocus()
    } catch (reason) {
      if (!mountedRef.current) return
      const message = reason instanceof Error ? reason.message.trim() : String(reason).trim()
      setError(message || t('sessionTitle.error'))
      focusTimerRef.current = setTimeout(() => {
        focusTimerRef.current = undefined
        inputRef.current?.focus()
      }, 0)
    } finally {
      savingRef.current = false
      if (mountedRef.current) setSaving(false)
    }
  }, [draft, renameTitle, restoreTriggerFocus, t])

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      closeEditor()
      return
    }
    if (event.key !== 'Enter' || composingRef.current || event.nativeEvent.isComposing) return
    event.preventDefault()
    void confirmRename()
  }

  const handleBlur = (event: FocusEvent<HTMLFormElement>) => {
    if (event.currentTarget.contains(event.relatedTarget)) return
    closeEditor()
  }

  if (!editing) {
    return (
      <button
        ref={triggerRef}
        className="asuka-session-title-trigger"
        type="button"
        aria-label={t('sessionTitle.edit')}
        title={t('sessionTitle.edit')}
        onClick={openEditor}
      >
        <EditIcon />
      </button>
    )
  }

  return (
    <form
      className="asuka-session-title-editor"
      aria-label={t('sessionTitle.edit')}
      aria-busy={saving}
      onSubmit={(event) => {
        event.preventDefault()
        void confirmRename()
      }}
      onBlur={handleBlur}
    >
      <input
        ref={inputRef}
        className="asuka-session-title-input"
        value={draft}
        aria-label={t('sessionTitle.field')}
        aria-invalid={error !== null || undefined}
        aria-describedby={error === null ? undefined : 'asuka-session-title-error'}
        autoFocus
        disabled={saving}
        onFocus={event => event.currentTarget.select()}
        onChange={(event) => {
          setDraft(event.currentTarget.value)
          setError(null)
        }}
        onCompositionStart={() => { composingRef.current = true }}
        onCompositionEnd={() => { composingRef.current = false }}
        onKeyDown={handleKeyDown}
      />
      <button
        className="asuka-session-title-action asuka-session-title-confirm"
        type="submit"
        aria-label={saving ? t('sessionTitle.saving') : t('sessionTitle.confirm')}
        title={saving ? t('sessionTitle.saving') : t('sessionTitle.confirm')}
        disabled={saving || trimmedDraft === ''}
      >
        <CheckIcon />
      </button>
      <button
        className="asuka-session-title-action"
        type="button"
        aria-label={t('sessionTitle.cancel')}
        title={t('sessionTitle.cancel')}
        disabled={saving}
        onClick={closeEditor}
      >
        <CloseIcon />
      </button>
      {error !== null && (
        <span id="asuka-session-title-error" className="asuka-session-title-error" role="alert">
          {error}
        </span>
      )}
      {saving && <span className="asuka-session-title-status" role="status">{t('sessionTitle.saving')}</span>}
    </form>
  )
}

function EditIcon() {
  return <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="m11.7 1.8 2.5 2.5-8.4 8.4-3.2.7.7-3.2 8.4-8.4Zm-7.3 8.9-.2 1.1 1.1-.2 7.2-7.3-.8-.8-7.3 7.2Z" /></svg>
}

function CheckIcon() {
  return <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="m6.6 11.8-3.7-3.7 1-1 2.7 2.7 5.6-5.6 1 1-6.6 6.6Z" /></svg>
}

function CloseIcon() {
  return <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="m4 3 4 4 4-4 1 1-4 4 4 4-1 1-4-4-4 4-1-1 4-4-4-4 1-1Z" /></svg>
}
