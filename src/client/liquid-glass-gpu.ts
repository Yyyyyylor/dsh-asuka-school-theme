/** WebGPU computes optical maps; SVG backdrop composition samples live DOM.
 * There is deliberately no DOM capture, wallpaper copy or permanent frame loop. */
export const GLASS_SHADER = /* wgsl */ `
struct Lens { size: vec2f, raster: vec2f, radius: f32, rim: f32, scale: f32, pad: f32 }
@group(0) @binding(0) var<uniform> lens: Lens;
@vertex fn vertex(@builtin(vertex_index) i: u32) -> @builtin(position) vec4f {
  let p = array<vec2f, 3>(vec2f(-1, -1), vec2f(3, -1), vec2f(-1, 3));
  return vec4f(p[i], 0, 1);
}
@fragment fn fragment(@builtin(position) pos: vec4f) -> @location(0) vec4f {
  let p = pos.xy / lens.raster * lens.size - lens.size * 0.5;
  let q = abs(p) - (lens.size * 0.5 - lens.radius);
  let a = max(q, vec2f(0));
  let distance = lens.radius - (length(a) + min(max(q.x, q.y), 0.0));
  if (distance < 0 || distance >= lens.rim) { return vec4f(0.5, 0.5, 0, 1); }
  var outward = vec2f(0, 1);
  if (q.x > q.y) { outward = vec2f(1, 0); }
  if (length(a) > 0.0001) { outward = normalize(a); }
  outward *= sign(p);
  // Smooth convex shoulder: flat at both ends, steeper inside the bevel.
  let t = clamp(distance / lens.rim, 0.0, 1.0);
  let slope = sin(t * 3.14159265) * 1.8;
  let normal = normalize(vec3f(outward * slope, 1));
  let ray = refract(vec3f(0, 0, -1), normal, 1.0 / 1.46);
  let thickness = lens.rim * (0.65 + 0.35 * sqrt(max(0.0, 1.0 - (1.0-t)*(1.0-t))));
  let offset = ray.xy / max(0.1, -ray.z) * thickness;
  let fresnel = 0.035 + 0.965 * pow(1.0 - normal.z, 5.0);
  let light = normalize(vec3f(-0.45, -0.6, 1));
  let specular = pow(max(0.0, dot(normal, light)), 24.0);
  let caustic = pow(max(0.0, sin(t * 3.14159265)), 8.0) * 0.16;
  return vec4f(clamp(vec2f(0.5) + offset / lens.scale, vec2f(0.02), vec2f(0.98)),
    clamp(specular * 0.75 + fresnel + caustic, 0.0, 1.0), 1);
}`

export function lensGeometry(width: number, height: number, radius: number, dpr = 1) {
  const ratio = Math.min(Math.max(1, Math.min(2, dpr)), 1024 / Math.max(width, height))
  const r = Math.max(1, Math.min(radius, width / 2, height / 2))
  const rim = Math.min(22, Math.max(6, r), Math.min(width, height) / 3)
  return { width: Math.max(2, Math.round(width * ratio)), height: Math.max(2, Math.round(height * ratio)),
    radius: r, rim, scale: rim * 2.4 }
}

export interface GlassGPU {
  render(width: number, height: number, radius: number, dpr: number): Promise<{ href: string, scale: number }>
  dispose(): void
}

/** The device is owned by a single enable cycle. Caller fences late results.
 * Initialization/validation/device-loss failures leave the CPU/SVG path intact. */
export async function createGlassGPU(root: Document, onLost: () => void): Promise<GlassGPU | undefined> {
  const gpu = (root.defaultView?.navigator as (Navigator & { gpu?: GPU }) | undefined)?.gpu
  if (!gpu || !root.defaultView?.isSecureContext) return
  let device: GPUDevice | undefined
  let context: GPUCanvasContext | null = null
  let uniform: GPUBuffer | undefined
  let closed = false
  const dispose = () => {
    if (closed) return
    closed = true
    context?.unconfigure()
    uniform?.destroy()
    device?.destroy()
  }
  try {
    const adapter = await gpu.requestAdapter({ powerPreference: 'low-power' })
    if (!adapter) return
    device = await adapter.requestDevice()
    const ownedDevice = device
    void device.lost.then(() => { if (!closed) { dispose(); onLost() } })
    device.addEventListener('uncapturederror', () => { if (!closed) { dispose(); onLost() } })
    const canvas = root.createElement('canvas')
    context = canvas.getContext('webgpu')
    if (!context) { dispose(); return }
    const ownedContext = context
    // unorm, not sRGB: R/G are displacement data, not display colors.
    const format: GPUTextureFormat = 'rgba8unorm'
    context.configure({ device, format, alphaMode: 'opaque' })
    const module = device.createShaderModule({ label: 'Asuka glass optics', code: GLASS_SHADER })
    const pipeline = await device.createRenderPipelineAsync({
      layout: 'auto', vertex: { module, entryPoint: 'vertex' },
      fragment: { module, entryPoint: 'fragment', targets: [{ format }] },
      primitive: { topology: 'triangle-list' },
    })
    if (closed) return
    uniform = device.createBuffer({ size: 32, usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST })
    const ownedUniform = uniform
    const group = device.createBindGroup({ layout: pipeline.getBindGroupLayout(0), entries: [{ binding: 0, resource: { buffer: uniform } }] })
    // Serialize snapshots: all surfaces share one small offscreen canvas.
    let queue: Promise<unknown> = Promise.resolve()
    return {
      render(width, height, radius, dpr) {
        const result = queue.then(async () => {
          if (closed) throw new Error('Glass GPU disposed')
          if (root.hidden) throw new Error('Glass page hidden')
          const map = lensGeometry(width, height, radius, dpr)
          canvas.width = map.width
          canvas.height = map.height
          ownedDevice.pushErrorScope('validation')
          let href: string
          try {
            ownedDevice.queue.writeBuffer(ownedUniform, 0, new Float32Array([width, height, map.width, map.height, map.radius, map.rim, map.scale, 0]))
            const encoder = ownedDevice.createCommandEncoder()
            const pass = encoder.beginRenderPass({ colorAttachments: [{
              view: ownedContext.getCurrentTexture().createView(), clearValue: [0.5, 0.5, 0, 1], loadOp: 'clear', storeOp: 'store',
            }] })
            pass.setPipeline(pipeline)
            pass.setBindGroup(0, group)
            pass.draw(3)
            pass.end()
            ownedDevice.queue.submit([encoder.finish()])
            // Snapshot in this task before WebGPU expires the canvas texture.
            href = canvas.toDataURL('image/png')
          } finally {
            const error = await ownedDevice.popErrorScope()
            if (error) throw new Error(error.message)
          }
          if (closed || !href.startsWith('data:image/png')) throw new Error('Glass GPU snapshot unavailable')
          return { href, scale: map.scale }
        })
        queue = result.catch(() => {})
        return result
      },
      dispose,
    }
  } catch {
    dispose()
    return
  }
}
