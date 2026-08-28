import { act, create, type ReactTestInstance, type ReactTestRenderer } from 'react-test-renderer'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { SessionTitleEditor } from '../src/client/session-title/SessionTitleEditor.js'

const titleState = {
  byId: {
    session: { displayTitle: 'Current session title' },
  },
}

function renderEditor(renameTitle = vi.fn<() => Promise<void>>().mockResolvedValue(undefined)) {
  const triggerFocus = vi.fn()
  const inputFocus = vi.fn()
  const inputSelect = vi.fn()
  let renderer!: ReactTestRenderer
  act(() => {
    renderer = create(<SessionTitleEditor {...({
      sessionId: 'session',
      useSessions: (selector: (state: typeof titleState) => unknown) => selector(titleState),
      renameTitle,
      t: (key: string) => key,
    } as never)} />, {
      createNodeMock: element => {
        if (element.type === 'input') return { focus: inputFocus, select: inputSelect }
        if (element.type === 'button') return { focus: triggerFocus }
        return {}
      },
    })
  })
  return { renderer, renameTitle, triggerFocus, inputFocus, inputSelect }
}

function open(renderer: ReactTestRenderer): ReactTestInstance {
  const trigger = renderer.root.findByProps({ className: 'asuka-session-title-trigger' })
  act(() => { trigger.props.onClick() })
  return renderer.root.findByType('input')
}

function keyEvent(key: string, isComposing = false) {
  return {
    key,
    nativeEvent: { isComposing },
    preventDefault: vi.fn(),
  }
}

describe('SessionTitleEditor', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('opens from the title action, focuses the current title, and submits a trimmed rename with Enter', async () => {
    const view = renderEditor()
    const trigger = view.renderer.root.findByProps({ className: 'asuka-session-title-trigger' })
    expect(trigger.props['aria-label']).toBe('sessionTitle.edit')

    const input = open(view.renderer)
    expect(input.props.value).toBe('Current session title')
    expect(view.inputFocus).toHaveBeenCalled()
    expect(view.inputSelect).toHaveBeenCalled()

    act(() => { input.props.onChange({ currentTarget: { value: '  A clearer title  ' } }) })
    const event = keyEvent('Enter')
    await act(async () => {
      view.renderer.root.findByType('input').props.onKeyDown(event)
      await Promise.resolve()
    })

    expect(event.preventDefault).toHaveBeenCalled()
    expect(view.renameTitle).toHaveBeenCalledWith('A clearer title')
    expect(view.renderer.root.findAllByType('input')).toHaveLength(0)
    act(() => { vi.runAllTimers() })
    expect(view.triggerFocus).toHaveBeenCalled()
    act(() => { view.renderer.unmount() })
  })

  it('does not submit an IME composition and supports Escape or focus-leave cancellation', () => {
    const view = renderEditor()
    let input = open(view.renderer)
    act(() => { input.props.onCompositionStart() })
    act(() => { input.props.onKeyDown(keyEvent('Enter', true)) })
    expect(view.renameTitle).not.toHaveBeenCalled()

    act(() => { input.props.onCompositionEnd() })
    act(() => { input.props.onKeyDown(keyEvent('Escape')) })
    expect(view.renderer.root.findAllByType('input')).toHaveLength(0)

    input = open(view.renderer)
    const form = view.renderer.root.findByType('form')
    act(() => {
      form.props.onBlur({
        currentTarget: { contains: () => false },
        relatedTarget: null,
      })
    })
    expect(view.renderer.root.findAllByType('input')).toHaveLength(0)
    act(() => { view.renderer.unmount() })
  })

  it('keeps the draft open on a Host error, exposes an alert, and clears it when edited', async () => {
    const renameTitle = vi.fn<() => Promise<void>>().mockRejectedValue(new Error('Host rejected rename'))
    const view = renderEditor(renameTitle)
    const input = open(view.renderer)

    await act(async () => {
      input.props.onKeyDown(keyEvent('Enter'))
      await Promise.resolve()
    })

    const alert = view.renderer.root.findByProps({ role: 'alert' })
    expect(alert.children).toEqual(['Host rejected rename'])
    expect(view.renderer.root.findByType('input').props['aria-invalid']).toBe(true)

    act(() => {
      view.renderer.root.findByType('input').props.onChange({ currentTarget: { value: 'Retry title' } })
    })
    expect(view.renderer.root.findAllByProps({ role: 'alert' })).toHaveLength(0)
    act(() => { view.renderer.unmount() })
  })

  it('locks the editor while a rename is pending and does not dismiss it on blur', async () => {
    let resolveRename!: () => void
    const renameTitle = vi.fn<() => Promise<void>>().mockImplementation(() => new Promise<void>((resolve) => {
      resolveRename = resolve
    }))
    const view = renderEditor(renameTitle)
    const input = open(view.renderer)

    act(() => { input.props.onKeyDown(keyEvent('Enter')) })

    const form = view.renderer.root.findByType('form')
    expect(form.props['aria-busy']).toBe(true)
    expect(view.renderer.root.findByType('input').props.disabled).toBe(true)
    expect(view.renderer.root.findAllByType('button').every(button => button.props.disabled)).toBe(true)
    expect(view.renderer.root.findByProps({ role: 'status' }).children).toEqual(['sessionTitle.saving'])
    act(() => {
      form.props.onBlur({ currentTarget: { contains: () => false }, relatedTarget: null })
    })
    expect(view.renderer.root.findAllByType('input')).toHaveLength(1)

    await act(async () => {
      resolveRename()
      await Promise.resolve()
    })
    expect(view.renderer.root.findAllByType('input')).toHaveLength(0)
    act(() => { view.renderer.unmount() })
  })
})
