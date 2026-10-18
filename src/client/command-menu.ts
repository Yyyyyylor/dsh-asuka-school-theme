/* In DSH 0.2, focusing the draft can clear the programmatic launcher's state
   while leaving its command menu visible. The next native + click then opens
   it again. Use the editor's existing Escape arbitration for this close only. */
export function installCommandMenuToggleGuard(root: Document = document): () => void {
  const onClick = (event: MouseEvent) => {
    if (event.button !== 0 || !(event.target instanceof Element)) return
    const trigger = event.target.closest("[data-composer-card] button[class*='_add'][aria-haspopup='listbox']:not(:disabled)")
    const card = trigger?.closest('[data-composer-card]')
    if (!card?.querySelector("[data-trigger-menu] :is([role='option'][id^='dsh-slash-option-command-'], [role='status'][data-source='command'])")) return
    const editor = card.querySelector<HTMLElement>('[data-composer-input]')
    if (!editor || editor.getAttribute('data-composer-composing') === 'true') return
    const escape = new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', bubbles: true, cancelable: true })
    editor.dispatchEvent(escape)
    // Only suppress the reopening click if the native editor consumed Escape.
    // Opening, outside dismissal, selection, caret and draft stay host-owned.
    if (!escape.defaultPrevented) return
    event.preventDefault()
    event.stopPropagation()
  }
  root.addEventListener('click', onClick, { capture: true })
  return () => root.removeEventListener('click', onClick, { capture: true })
}
