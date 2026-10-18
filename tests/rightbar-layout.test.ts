import { describe, expect, it } from 'vitest'
import { matchesRightbarShortcut, narrowRightbarWidths } from '../src/client/rightbar-layout.js'

describe('narrow rightbar room', () => {
  it.each([735, 620, 375])('shares the %ipx frame without covering its main column', width => {
    const { left, right } = narrowRightbarWidths(width, 56)
    expect(left).toBe(56)
    expect(right).toBeCloseTo((width - 56) * 0.45)
    expect(width - left - right).toBeGreaterThan(right)
  })
  it('keeps an expanded left sidebar and bounds invalid or large available room', () => {
    expect(narrowRightbarWidths(735, 280)).toEqual({ left: 280, right: 204.75 })
    expect(narrowRightbarWidths(0, 56)).toEqual({ left: 0, right: 0 })
    expect(narrowRightbarWidths(1280, -1)).toEqual({ left: 0, right: 340 })
  })
})

describe('narrow rightbar fullscreen shortcut', () => {
  const key = (patch: Partial<KeyboardEvent> = {}) => ({
    key: 'Enter', code: 'Enter', ctrlKey: true, altKey: true, shiftKey: false, metaKey: false,
    isComposing: false, keyCode: 13, getModifierState: () => false, ...patch,
  }) as KeyboardEvent

  it('uses the effective host binding rather than hardcoding Ctrl+Alt+Enter', () => {
    expect(matchesRightbarShortcut(key(), 'Control+Alt+Enter')).toBe(true)
    expect(matchesRightbarShortcut(key({ ctrlKey: false, metaKey: true }), 'Meta+Alt+Enter')).toBe(true)
    expect(matchesRightbarShortcut(key({ key: 'F', code: 'KeyF', altKey: false, shiftKey: true }), 'Control+Shift+F')).toBe(true)
    expect(matchesRightbarShortcut(key(), '')).toBe(false)
    expect(matchesRightbarShortcut(key(), 'Control+Enter')).toBe(false)
    expect(matchesRightbarShortcut(key({ shiftKey: true }), 'Control+Alt+Enter')).toBe(false)
    expect(matchesRightbarShortcut(key({ code: 'NumpadEnter' }), 'Control+Alt+Enter')).toBe(false)
  })

  it('leaves composition and AltGraph input alone', () => {
    expect(matchesRightbarShortcut(key({ isComposing: true }), 'Control+Alt+Enter')).toBe(false)
    expect(matchesRightbarShortcut(key({ keyCode: 229 }), 'Control+Alt+Enter')).toBe(false)
    expect(matchesRightbarShortcut(key({ getModifierState: () => true }), 'Control+Alt+Enter')).toBe(false)
  })
})
