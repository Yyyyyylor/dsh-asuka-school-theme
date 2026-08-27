import { act, create, type ReactTestInstance, type ReactTestRenderer } from 'react-test-renderer'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { RangeRow } from '../src/client/settings/AsukaSection.js'

let frameCallbacks: Map<number, FrameRequestCallback>
let nextFrame: number

function renderRange(onPreview = vi.fn(), onCommit = vi.fn()): {
  input: () => ReactTestInstance
  onPreview: ReturnType<typeof vi.fn>
  onCommit: ReturnType<typeof vi.fn>
  renderer: ReactTestRenderer
} {
  let renderer!: ReactTestRenderer
  act(() => {
    renderer = create(<RangeRow label="Opacity" value={20} min={0} max={100} suffix="%" onPreview={onPreview} onCommit={onCommit} />)
  })
  return {
    input: () => renderer.root.findByType('input'),
    onPreview,
    onCommit,
    renderer,
  }
}

function change(input: ReactTestInstance, value: string): void {
  input.props.onChange({ currentTarget: { value } })
}

function drainFrames(): void {
  const callbacks = [...frameCallbacks.values()]
  frameCallbacks.clear()
  for (const callback of callbacks) callback(0)
}

describe('RangeRow', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
    frameCallbacks = new Map()
    nextFrame = 1
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
      const handle = nextFrame++
      frameCallbacks.set(handle, callback)
      return handle
    })
    vi.stubGlobal('cancelAnimationFrame', (handle: number) => { frameCallbacks.delete(handle) })
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it('coalesces previews into one animation frame and debounces persistence for 140ms', () => {
    const view = renderRange()
    act(() => {
      change(view.input(), '35')
      change(view.input(), '48')
    })

    expect(frameCallbacks.size).toBe(1)
    act(drainFrames)
    expect(view.onPreview).toHaveBeenCalledTimes(1)
    expect(view.onPreview).toHaveBeenLastCalledWith(48)
    expect(view.input().props.value).toBe(48)

    act(() => { vi.advanceTimersByTime(139) })
    expect(view.onCommit).not.toHaveBeenCalled()
    act(() => { vi.advanceTimersByTime(1) })
    expect(view.onCommit).toHaveBeenCalledTimes(1)
    expect(view.onCommit).toHaveBeenCalledWith(48)
    act(() => { view.renderer.unmount() })
  })

  it.each(['onPointerUp', 'onKeyUp', 'onBlur'] as const)('flushes a pending commit through %s', handler => {
    const view = renderRange()
    act(() => { change(view.input(), '61') })
    act(() => { view.input().props[handler]({}) })

    expect(view.onCommit).toHaveBeenCalledTimes(1)
    expect(view.onCommit).toHaveBeenCalledWith(61)
    act(() => { vi.advanceTimersByTime(200) })
    expect(view.onCommit).toHaveBeenCalledTimes(1)
    act(() => { view.renderer.unmount() })
  })

  it('cancels pending work and restores the persisted appearance on unmount', () => {
    const view = renderRange()
    act(() => { change(view.input(), '73') })
    act(drainFrames)
    expect(view.onPreview).toHaveBeenLastCalledWith(73)

    act(() => { view.renderer.unmount() })

    expect(view.onPreview).toHaveBeenLastCalledWith(20)
    expect(frameCallbacks.size).toBe(0)
    act(() => { vi.advanceTimersByTime(200) })
    expect(view.onCommit).not.toHaveBeenCalled()
  })
})
