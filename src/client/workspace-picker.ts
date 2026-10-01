/* DSH 0.2's WorkspacePicker positions Menu through getAnchorRect with anchor=null.
   Its outside-pointer listener therefore treats the separate Hero chip as outside:
   pointerdown closes, then the chip's native click toggles it open again. */
export function installWorkspacePickerToggleGuard(root: Document = document): () => void {
  const onPointerDown = (event: PointerEvent) => {
    if (event.button !== 0 || !(event.target instanceof Element)) return
    const chip = event.target.closest("[class*='_heroWorkspaceRow'] > button[class*='_workspace'][aria-haspopup='menu'][aria-expanded='true']")
    if (chip === null) return
    // Preserve focus and the native click/keyboard toggle; suppress only the
    // pointer event that would dismiss this already-open picker's own trigger.
    event.stopPropagation()
  }
  root.addEventListener('pointerdown', onPointerDown, { capture: true })
  return () => root.removeEventListener('pointerdown', onPointerDown, { capture: true })
}
