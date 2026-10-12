# Liquid Glass development implementation

This work is unreleased and isolated from the main checkout. Package version and
published installation commands remain `3.2.2`; the new optics are available
only by building this development checkout. This is a Web approximation of
rounded glass, not Apple's native Liquid Glass material.

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
- The material uses scene tokens for tint, paired labels, rim and inset depth.
  Composer is clearer; navigation has an 8px blur and a stronger scene fill;
  Settings has a 48px background blur and its original translucent scene fill
  and modal mask, with its existing local label/control palette. The same blur
  token also applies to the frosted fallback when lenses are unavailable. Reply,
  reasoning, tool and code materials are unchanged.
- A passive pointer listener coalesces highlight coordinates to one animation
  frame. There is no continuous render loop, animated displacement or change to
  hit targets. Both reduced-motion preferences clear the moving highlight;
  decorative-details Off dims the rim. Static refraction remains available.
- Native resizing temporarily uses the existing frosted glass, then rebuilds
  once dimensions settle for 100ms. Structural surface changes are observed;
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

## Verification boundary

See the current development check in [COMPATIBILITY.md](COMPATIBILITY.md).
Browser screenshots are stored outside the repository; the published README
preview still shows released `3.2.2`. GPU cost and optical appearance depend on
viewport, wallpaper opacity/blur and browser compositing. No Apple material
equivalence or measured frame-rate improvement is claimed.
