import { describe, expect, it } from 'vitest'
import { createLensMap, installLiquidGlass } from '../src/client/liquid-glass.js'

function sample(map: ReturnType<typeof createLensMap>, x: number, y: number) {
  const index = (y * map.width + x) * 4
  return [...map.pixels.slice(index, index + 4)]
}

describe('rounded background lens', () => {
  it('keeps the center neutral and bends opposite edges inward without disturbing the tangent', () => {
    const map = createLensMap(200, 100, 16)
    expect(sample(map, 100, 50)).toEqual([128, 128, 128, 255])
    const left = sample(map, 7, 50), right = sample(map, 192, 50)
    const top = sample(map, 100, 7), bottom = sample(map, 100, 92)
    expect(left[0]).toBeGreaterThan(200)
    expect(right[0]).toBeLessThan(55)
    expect(left[1]).toBe(128)
    expect(top[1]).toBeGreaterThan(200)
    expect(bottom[1]).toBeLessThan(55)
    expect(top[0]).toBe(128)
    // The shoulder returns smoothly to an undisturbed reading center.
    expect(sample(map, 30, 50)).toEqual([128, 128, 128, 255])
  })

  it('follows the corner normal and leaves pixels outside the rounded lens neutral', () => {
    const map = createLensMap(200, 100, 16)
    const corner = sample(map, 8, 8)
    expect(corner[0]).toBeGreaterThan(128)
    expect(corner[1]).toBeGreaterThan(128)
    expect(corner[0]).toBe(corner[1])
    expect(sample(map, 0, 0)).toEqual([128, 128, 128, 255])
  })

  it('bounds raster memory on large panes while retaining a narrow rail and physical displacement scale', () => {
    const large = createLensMap(3840, 2160, 16)
    expect(large.width).toBe(512)
    expect(large.height).toBe(288)
    expect(large.pixels.length).toBeLessThanOrEqual(512 * 512 * 4)
    expect(large.scale).toBeCloseTo(createLensMap(200, 100, 16).scale)
    const rail = createLensMap(48, 800, 16)
    expect(rail.width).toBeGreaterThan(2)
    expect(sample(rail, Math.floor(rail.width / 2), 256).slice(0, 2)).toEqual([128, 128])
  })

  it('does not touch a document without the required backdrop engine', () => {
    expect(installLiquidGlass({ defaultView: null } as Document)).toBeTypeOf('function')
    const root = { defaultView: { ResizeObserver: class {}, MutationObserver: class {}, navigator: { userAgent: 'Firefox/140' } } }
    expect(() => installLiquidGlass(root as unknown as Document)()).not.toThrow()
  })
})
