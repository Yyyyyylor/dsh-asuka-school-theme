import { afterEach, describe, expect, it, vi } from 'vitest'
import { installWorkspacePickerToggleGuard } from '../src/client/workspace-picker.js'

// EventTarget covers listener filtering/lifetime only. Native Menu ordering,
// focus and click-open-click-close are checked separately in real DSH Web.
class ChipTarget {
  closest = vi.fn((): ChipTarget | null => this)
}

function pointer(target: unknown, button = 0) {
  const event = new Event('pointerdown', { bubbles: true, cancelable: true })
  Object.defineProperties(event, { target: { value: target }, button: { value: button } })
  return event
}

afterEach(() => vi.unstubAllGlobals())

describe('workspace picker toggle compatibility', () => {
  it('guards only primary pointers on an expanded chip and preserves default focus/click', () => {
    vi.stubGlobal('Element', ChipTarget)
    const root = new EventTarget()
    const dispose = installWorkspacePickerToggleGuard(root as unknown as Document)
    try {
      const chip = new ChipTarget()
      const press = pointer(chip)
      const stop = vi.spyOn(press, 'stopPropagation')
      root.dispatchEvent(press)
      expect(stop).toHaveBeenCalledOnce()
      expect(press.defaultPrevented).toBe(false)
      expect(chip.closest).toHaveBeenCalledWith(expect.stringContaining("[aria-expanded='true']"))

      for (const event of [pointer(chip, 2), pointer(null), pointer({})]) {
        const ignored = vi.spyOn(event, 'stopPropagation')
        root.dispatchEvent(event)
        expect(ignored).not.toHaveBeenCalled()
      }
      chip.closest.mockReturnValue(null)
      const outside = pointer(chip)
      const ignored = vi.spyOn(outside, 'stopPropagation')
      root.dispatchEvent(outside)
      expect(ignored).not.toHaveBeenCalled()
    } finally {
      dispose()
    }
  })

  it('removes the capture listener when the plugin effect is disposed', () => {
    vi.stubGlobal('Element', ChipTarget)
    const root = new EventTarget()
    const added = vi.spyOn(root, 'addEventListener')
    const removed = vi.spyOn(root, 'removeEventListener')
    const dispose = installWorkspacePickerToggleGuard(root as unknown as Document)
    const listener = added.mock.calls[0]![1]
    expect(added).toHaveBeenCalledWith('pointerdown', listener, { capture: true })
    dispose()
    expect(removed).toHaveBeenCalledWith('pointerdown', listener, { capture: true })
    const event = pointer(new ChipTarget())
    const stop = vi.spyOn(event, 'stopPropagation')
    root.dispatchEvent(event)
    expect(stop).not.toHaveBeenCalled()
  })
})
