import { afterEach, describe, expect, it, vi } from 'vitest'
import { installCommandMenuToggleGuard } from '../src/client/command-menu.js'

// Listener ownership/filtering only; real DSH verifies Lexical Escape, repeated
// mouse/keyboard activation, scrolling and unchanged draft contents.
class TriggerTarget {
  closest = vi.fn()
}

function click(target: unknown, button = 0) {
  const event = new Event('click', { bubbles: true, cancelable: true })
  Object.defineProperties(event, { target: { value: target }, button: { value: button } })
  return event
}

afterEach(() => vi.unstubAllGlobals())

describe('command menu toggle compatibility', () => {
  it('suppresses reopening only when the matching editor consumes Escape', () => {
    vi.stubGlobal('Element', TriggerTarget)
    vi.stubGlobal('KeyboardEvent', Event)
    const root = new EventTarget()
    const dispose = installCommandMenuToggleGuard(root as unknown as Document)
    const editor = { getAttribute: vi.fn((): string | null => null), dispatchEvent: vi.fn((event: Event) => event.preventDefault()) }
    const card = { querySelector: vi.fn((selector: string) => selector === '[data-composer-input]' ? editor : {}) }
    const target = new TriggerTarget()
    target.closest.mockReturnValue({ closest: () => card })
    try {
      const event = click(target)
      root.dispatchEvent(event)
      expect(event.defaultPrevented).toBe(true)
      expect(editor.dispatchEvent).toHaveBeenCalledOnce()

      editor.dispatchEvent.mockImplementation(() => {})
      const unconsumed = click(target)
      root.dispatchEvent(unconsumed)
      expect(unconsumed.defaultPrevented).toBe(false)

      editor.dispatchEvent.mockClear()
      editor.getAttribute.mockReturnValue('true')
      const composing = click(target)
      root.dispatchEvent(composing)
      expect(editor.dispatchEvent).not.toHaveBeenCalled()
      expect(composing.defaultPrevented).toBe(false)
    } finally {
      dispose()
    }
  })

  it('leaves unrelated clicks and disposed listeners alone', () => {
    vi.stubGlobal('Element', TriggerTarget)
    const root = new EventTarget()
    const dispose = installCommandMenuToggleGuard(root as unknown as Document)
    const target = new TriggerTarget()
    target.closest.mockReturnValue(null)
    for (const event of [click(target), click(target, 2), click(null)]) {
      root.dispatchEvent(event)
      expect(event.defaultPrevented).toBe(false)
    }
    expect(target.closest).toHaveBeenCalledOnce()
    dispose()
    target.closest.mockClear()
    root.dispatchEvent(click(target))
    expect(target.closest).not.toHaveBeenCalled()
  })
})
