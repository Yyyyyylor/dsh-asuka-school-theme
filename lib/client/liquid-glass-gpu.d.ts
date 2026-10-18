/** WebGPU computes optical maps; SVG backdrop composition samples live DOM.
 * There is deliberately no DOM capture, wallpaper copy or permanent frame loop. */
export declare const GLASS_SHADER = "\nstruct Lens { size: vec2f, raster: vec2f, radius: f32, rim: f32, scale: f32, pad: f32 }\n@group(0) @binding(0) var<uniform> lens: Lens;\n@vertex fn vertex(@builtin(vertex_index) i: u32) -> @builtin(position) vec4f {\n  let p = array<vec2f, 3>(vec2f(-1, -1), vec2f(3, -1), vec2f(-1, 3));\n  return vec4f(p[i], 0, 1);\n}\n@fragment fn fragment(@builtin(position) pos: vec4f) -> @location(0) vec4f {\n  let p = pos.xy / lens.raster * lens.size - lens.size * 0.5;\n  let q = abs(p) - (lens.size * 0.5 - lens.radius);\n  let a = max(q, vec2f(0));\n  let distance = lens.radius - (length(a) + min(max(q.x, q.y), 0.0));\n  if (distance < 0 || distance >= lens.rim) { return vec4f(0.5, 0.5, 0, 1); }\n  var outward = vec2f(0, 1);\n  if (q.x > q.y) { outward = vec2f(1, 0); }\n  if (length(a) > 0.0001) { outward = normalize(a); }\n  outward *= sign(p);\n  // Smooth convex shoulder: flat at both ends, steeper inside the bevel.\n  let t = clamp(distance / lens.rim, 0.0, 1.0);\n  let slope = sin(t * 3.14159265) * 1.8;\n  let normal = normalize(vec3f(outward * slope, 1));\n  let ray = refract(vec3f(0, 0, -1), normal, 1.0 / 1.46);\n  let thickness = lens.rim * (0.65 + 0.35 * sqrt(max(0.0, 1.0 - (1.0-t)*(1.0-t))));\n  let offset = ray.xy / max(0.1, -ray.z) * thickness;\n  let fresnel = 0.035 + 0.965 * pow(1.0 - normal.z, 5.0);\n  let light = normalize(vec3f(-0.45, -0.6, 1));\n  let specular = pow(max(0.0, dot(normal, light)), 24.0);\n  let caustic = pow(max(0.0, sin(t * 3.14159265)), 8.0) * 0.16;\n  return vec4f(clamp(vec2f(0.5) + offset / lens.scale, vec2f(0.02), vec2f(0.98)),\n    clamp(specular * 0.75 + fresnel + caustic, 0.0, 1.0), 1);\n}";
export declare function lensGeometry(width: number, height: number, radius: number, dpr?: number): {
    width: number;
    height: number;
    radius: number;
    rim: number;
    scale: number;
};
export interface GlassGPU {
    render(width: number, height: number, radius: number, dpr: number): Promise<{
        href: string;
        scale: number;
    }>;
    dispose(): void;
}
/** The device is owned by a single enable cycle. Caller fences late results.
 * Initialization/validation/device-loss failures leave the CPU/SVG path intact. */
export declare function createGlassGPU(root: Document, onLost: () => void): Promise<GlassGPU | undefined>;
//# sourceMappingURL=liquid-glass-gpu.d.ts.map