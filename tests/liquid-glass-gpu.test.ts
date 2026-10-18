import { afterEach, describe, expect, it, vi } from 'vitest'
import { createGlassGPU, lensGeometry } from '../src/client/liquid-glass-gpu.js'

afterEach(() => vi.unstubAllGlobals())

function fixture() {
  let lose!: () => void
  const device = {
    lost: new Promise<void>(resolve => { lose = resolve }),
    addEventListener: vi.fn(), destroy: vi.fn(),
    createShaderModule: vi.fn(() => ({})),
    createRenderPipelineAsync: vi.fn(async () => ({ getBindGroupLayout: () => ({}) })),
    createBuffer: vi.fn(() => ({ destroy: vi.fn() })),
    createBindGroup: vi.fn(() => ({})),
    pushErrorScope: vi.fn(), popErrorScope: vi.fn(async (): Promise<{ message: string } | null> => null),
    queue: { writeBuffer: vi.fn(), submit: vi.fn() },
    createCommandEncoder: () => ({ beginRenderPass: () => ({ setPipeline() {}, setBindGroup() {}, draw() {}, end() {} }), finish() {} }),
  }
  const context = { configure: vi.fn(), unconfigure: vi.fn(), getCurrentTexture: () => ({ createView: () => ({}) }) }
  const canvas = { width: 0, height: 0, getContext: () => context, toDataURL: vi.fn(() => 'data:image/png;base64,test') }
  const root = { defaultView: { isSecureContext: true, navigator: { gpu: { requestAdapter: async () => ({ requestDevice: async () => device }) } } },
    createElement: () => canvas } as unknown as Document
  vi.stubGlobal('GPUBufferUsage', { UNIFORM: 64, COPY_DST: 8 })
  return { root, device, context, canvas, lose }
}

describe('WebGPU optics lifecycle', () => {
  it('bounds DPR allocation and retains CSS-space optical depth', () => {
    const small = lensGeometry(200, 100, 16, 2)
    expect(small.width).toBe(400)
    expect(small.height).toBe(200)
    expect(small.scale).toBe(lensGeometry(200, 100, 16, 1).scale)
    const large = lensGeometry(3840, 2160, 16, 3)
    expect(large.width).toBe(1024)
    expect(large.height).toBe(576)
  })

  it('returns fallback for unavailable adapters and denied device creation', async () => {
    expect(await createGlassGPU({ defaultView: null } as Document, vi.fn())).toBeUndefined()
    const { root, device } = fixture()
    device.createRenderPipelineAsync.mockRejectedValueOnce(new Error('Unsupported shader'))
    expect(await createGlassGPU(root, vi.fn())).toBeUndefined()
    expect(device.destroy).toHaveBeenCalledOnce()
  })

  it('serializes shared-canvas snapshots and surfaces validation errors', async () => {
    const { root, device } = fixture()
    const gpu = (await createGlassGPU(root, vi.fn()))!
    let finish!: (value: null) => void
    device.popErrorScope.mockImplementationOnce(() => new Promise(resolve => { finish = resolve }))
    const first = gpu.render(200, 100, 16, 1)
    const second = gpu.render(400, 200, 16, 2)
    await Promise.resolve()
    expect(device.queue.submit).toHaveBeenCalledOnce()
    finish(null)
    await Promise.all([first, second])
    expect(device.queue.submit).toHaveBeenCalledTimes(2)
    Object.defineProperty(root, 'hidden', { value: true, configurable: true })
    await expect(gpu.render(200, 100, 16, 1)).rejects.toThrow('hidden')
    expect(device.queue.submit).toHaveBeenCalledTimes(2)
    Object.defineProperty(root, 'hidden', { value: false, configurable: true })
    device.popErrorScope.mockResolvedValueOnce({ message: 'GPU validation failed' })
    await expect(gpu.render(200, 100, 16, 1)).rejects.toThrow('GPU validation failed')
    gpu.dispose()
  })

  it('disposes once on device loss, rejects later draws and does not notify on normal teardown', async () => {
    const { root, device, context, lose } = fixture()
    const lost = vi.fn()
    const gpu = (await createGlassGPU(root, lost))!
    lose()
    await Promise.resolve()
    expect(lost).toHaveBeenCalledOnce()
    expect(context.unconfigure).toHaveBeenCalledOnce()
    await expect(gpu.render(200, 100, 16, 1)).rejects.toThrow('disposed')
    gpu.dispose()
    expect(device.destroy).toHaveBeenCalledOnce()
    const next = fixture()
    const normalLost = vi.fn()
    const normal = (await createGlassGPU(next.root, normalLost))!
    normal.dispose()
    next.lose()
    await Promise.resolve()
    expect(normalLost).not.toHaveBeenCalled()
  })
})
