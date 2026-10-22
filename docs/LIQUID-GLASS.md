# Liquid Glass development implementation

Version `3.3.0` includes these optics and the DSH `0.2.1-rc.2` adaptation.
Install the prebuilt GitHub Release asset or build the fixed source tag. This is a Web approximation of
rounded glass, not Apple's native Liquid Glass material.

## WebGPU optics (2026-10-18, included in 3.3.0)

The visual targets come from Apple's [Meet Liquid Glass](https://developer.apple.com/videos/play/wwdc2025/219/):
curved lensing, geometry-dependent highlights, separation from underlying content,
and readable controls. The native material also adapts shadows/tint to content
and morphs between controls. This implementation does not reproduce that whole
system or claim 100% equivalence.

The [WebGPU source contract](https://www.w3.org/TR/2026/CRD-webgpu-20260109/#dictdef-gpucopyexternalimagesourceinfo)
accepts images, video and canvases, not arbitrary HTML elements or the compositor's
backdrop. A standalone WebGPU canvas cannot directly refract all live DOM. Copying
the wallpaper would miss overlapping text/controls. Screen capture would add a
permission prompt and capture feedback; DOM rasterizers would introduce incomplete
snapshots and dependencies. Neither is used here.

Instead, `liquid-glass-gpu.ts` renders optical data with a real WebGPU render
pipeline. A rounded-rectangle distance field supplies the outward normal; a
smooth convex shoulder and WGSL `refract` at IOR 1.46 generate signed displacement.
R/G encode that displacement; B encodes Fresnel, specular and restrained caustic
light. This is an artistic single-interface lens model, not spectral ray tracing.
The live background remains browser-owned: the existing SVG `feDisplacementMap`
uses this map to bend the Backdrop Root Image; a screen blend adds the GPU light.
Compact controls retain restrained RGB dispersion. Scene tint, labels and pointer
highlights retain their existing tokens and CSS behavior.

The canvas contains geometry only. It exports a PNG snapshot in the render task,
before the [WebGPU canvas texture expires](https://gpuweb.github.io/gpuweb/#automatic-expiry),
then validates the scoped GPU commands and decodes the image before installation.
No page image reaches JavaScript. Actual sampling is limited to the CSS Backdrop
Root (including its clipping/stacking rules), not every DOM node or OS window.
This is a WebGPU optical-map + SVG compositor implementation, not a pure WebGPU
framebuffer renderer. Optical highlights are geometry-based; adaptive native
content analysis, control fusion, elastic morphing and environment lighting are
still absent. No performance improvement over the CPU fallback is claimed.

- One device, uniform buffer and offscreen canvas are shared across at most 12
  surfaces. Snapshots are serialized; DPR is capped at 2 and the longest map side
  at 1024 pixels. The previous map stays visible until its replacement decodes.
- Geometry/viewport changes regenerate maps after the existing 100ms debounce;
  browser composition samples scrolling/live content using those maps without a
  JavaScript GPU frame loop. Hidden pages defer regeneration and clear pointer
  work; visibility restoration rechecks geometry. Both reduced-motion preferences
  keep static optics but stop the existing nonessential motion/highlights.
- GPU initialization is lazy per theme-enable cycle. Insecure contexts, absent
  adapters, shader/device creation failure, validation failure and device loss
  fall back to the existing CPU map + SVG path. Unsupported backdrop engines
  retain frosted glass. There is no automatic retry loop; Off/On retries.
- Off/disposal destroys GPU resources and invalidates queued/late results;
  surface identity, dimensions and renderer epochs fence map/decode races.
  Each installed surface exposes `data-asuka-liquid-renderer="webgpu"` only
  after its GPU map has decoded; fallback maps expose `svg`. These attributes
  are diagnostics, not configuration or a public host API.
- No host DOM replacement, new clipping/containing block, new setting, runtime
  dependency, external request or screen-capture permission is introduced.
  `@webgpu/types` is a development-only type package.

Windows Codex in-app browser verified actual WebGPU maps (neutral center and
opposite signed edge displacement), live DOM stripe/text refraction, real device
destruction fallback, simulated adapter unavailability, Off/On and teardown.
An isolated DSH `0.2.1-rc.2` loaded GPU maps on sidebar/header/composer/dock,
menus and Settings. See [COMPATIBILITY.md](COMPATIBILITY.md) for the bounded
integration evidence. Neither Apple native comparison nor a new Ubuntu run was
performed. The implementation below describes the retained CPU/SVG baseline.

## Renderer and Desktop evidence

The official [DSH Desktop README at dsh-v0.2.0-rc.2](https://github.com/deepseek-ai/deepseek-harness/blob/dsh-v0.2.0-rc.2/apps/desktop/README.md)
describes an Electron shell loading the packaged Web UI through `dsh-app://app/`.
Its [package manifest](https://github.com/deepseek-ai/deepseek-harness/blob/dsh-v0.2.0-rc.2/apps/desktop/package.json)
declares Electron `^44.0.0`; the [same-tag lockfile](https://github.com/deepseek-ai/deepseek-harness/blob/dsh-v0.2.0-rc.2/pnpm-lock.yaml)
locks `44.0.0`. The [Electron release mapping](https://releases.electronjs.org/release/v44.0.0)
lists Chromium `152.0.7977.54`. This does not prove the version of a user's
installed Desktop binary or imply faster rendering than Web.

Desktop's [main window implementation](https://github.com/deepseek-ai/deepseek-harness/blob/dsh-v0.2.0-rc.2/apps/desktop/src/main.ts)
uses macOS sidebar vibrancy. It supplies no native Liquid Glass interface to
this plugin. The Welcome window's material is separate from Web surfaces.

Chromium's [SVG backdrop WPT](https://chromium.googlesource.com/external/w3c/web-platform-tests/+/master/css/filter-effects/backdrop-filter-svg.html)
covers a same-document filter reference. [Filter Effects Level 2](https://drafts.csswg.org/filter-effects-2/#BackdropFilterProperty)
defines filtering of the Backdrop Root Image and border-box/radius clipping.
These justify trying SVG displacement; target GPU correctness still needs a
render check. `CSS.supports()` proves syntax support only. The enhancement uses
a Chromium user-agent gate plus that check, not a cross-browser promise.

## Implementation

- `liquid-glass.ts` installs one owned, non-interactive SVG defs container.
  Each major surface with a nonzero layout box gets a rounded displacement map:
  red and green encode the inward normal, the center is neutral, and a smooth
  shoulder concentrates bending within a 6–18px rim. It samples actual page
  pixels via SVG `feDisplacementMap`; it does not copy or rescale the wallpaper.
- Maps match each surface's current dimensions and radius, with a maximum
  512px raster side. At most 12 surfaces are retained. Large panes use one
  displacement pass; compact composer/header/menu surfaces below 220,000 square
  CSS pixels split RGB sampling by less than one pixel of displacement scale.
  This is restrained dispersion, not full spectral optics.
- The existing non-interactive `::before` layers and native MenuSurface material
  child receive the filter. Composer, sidebar/header/dock content and Settings
  keep `backdrop-filter: none`; no new transform or overflow changes their fixed
  menus, tooltip positioning, scrollports or sticky code.
- The input-trigger menu retains its native `::after` bottom scroll fade. Its
  full-height glass rim lives on the material child's `::after`, so the native
  16px hint cannot constrain the rim into a bright stripe inside the menu.
  Both reduced-motion preferences and decorative-detail dimming cover this rim.
- A lifecycle-owned `data-asuka-liquid-engine` capability marker lets supported
  menus paint their final 5px blur, saturation, depth and rim from the first
  frame, before a map is decoded. Each menu resets its local filter to `blur(0px)`
  in CSS until it has its own decoded URL, preventing inheritance of a parent
  composer/menu lens. Structural additions/removals are reconciled immediately
  in MutationObserver's pre-paint delivery; existing surfaces keep their resize
  debounce. Settings also keeps its final rim opacity before lens activation.
  Menu interaction and glass paint are never delayed. A separate 180ms entrance
  animates an inherited progress property on each MenuSurface mount, fading and
  lifting only button labels/icons and group headings by up to 4px. New rows and
  model-pane changes reuse the surface's progress rather than replaying motion.
  The shell, material layer and content wrappers get no opacity or transform,
  preserving backdrop sampling, fixed submenu placement and native hit targets.
  Both reduced-motion preferences disable the entrance. DSH's Menu and trigger
  MenuView conditionally remove their lists immediately; there is no exit phase,
  and this plugin does not retain/clone removed menus or delay native dismissal.
- The material uses scene tokens for tint, paired labels, rim and inset depth.
  Composer is clearer; navigation has an 8px blur and a stronger scene fill;
  Settings has a 48px background blur and its original translucent scene fill
  and modal tint, with its existing local label/control palette. Settings keeps
  the blur on its background pseudo-element from the first paint, with a fixed
  2px modal-mask blur; lens decoding only adds the optical filter. The dialog
  moves/scales on entrance while only its content fades, avoiding an opacity
  Backdrop Root around the background layer. The same blur token applies to
  the frosted fallback when lenses are unavailable. Reply,
  reasoning, tool and code materials are unchanged.
- Settings paints its tint and blur together on `::before`, leaving the dialog
  shell transparent. Its edge gradient and pointer highlight are masked to the
  two-pixel `::after` rim, so the border no longer adds a full-panel tint. The
  non-inherited paint properties are assigned to their owning pseudo-elements;
  scene transitions and both reduced-motion preferences cover those layers.
- A passive pointer listener coalesces highlight coordinates to one animation
  frame. A local 110px reflection responds within 64px of the rim, eases its
  position for 140ms and fades for 180ms. Leaving keeps its last position while
  strength decays to zero. Only the pseudo-element's non-inherited paint
  properties transition; there is no continuous render loop or change to hit
  targets. Both reduced-motion preferences clear the moving highlight;
  decorative-details Off dims the rim. Static refraction remains available.
- Native resizing keeps the decoded glass material attached and stretches its
  existing map to the current layout box. Once dimensions settle for 100ms, a
  replacement map is built offscreen, decoded and installed atomically without
  changing the filter URL or blur/tint rules. Replacement failures retain the
  decoded map; initial failures retain frosted glass. Maps use untransformed
  layout dimensions. Structural surface changes are observed;
  streamed text and the plugin's own SVG primitives do not cause rescans.
- Non-Chromium engines, missing capabilities/canvas, encoder failure or data
  image decode rejection retain frosted glass. Decode is verified before
  activation; late results are fenced by surface identity, dimensions, theme
  activation and disposal. A GPU-specific failure after successful decoding
  cannot be detected by this capability check.
- Off releases filter nodes and restores the owned inline filter property and
  marker. Disposal also removes the SVG container, observers, listeners, pending
  timeout and frame. No setting, dependency, Host route, external request or
  host component replacement is added. The existing controller continues to own
  theme/settings/wallpaper behavior.
  Disposal restores the capability marker's prior value; unsupported engines
  never receive it and retain the original frosted material.

## Verification boundary

See the 0.2.1-rc.2 integration check in [COMPATIBILITY.md](COMPATIBILITY.md).
Browser screenshots are stored outside the repository; the published README
preview remains the historical `3.2.2` screenshot. GPU cost and optical appearance depend on
viewport, wallpaper opacity/blur and browser compositing. No Apple material
equivalence or measured frame-rate improvement is claimed.
