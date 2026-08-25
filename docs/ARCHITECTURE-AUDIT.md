# Architecture audit

```text
Host settings namespace
      │
      └── asuka-school-theme
              │ settingsScope.bind()
              ▼
       Asuka theme controller
       ├── General Quick Row
       ├── Asuka School section
       └── owned wallpaper document layer

Host webServer
      ├── /asuka-school/assets/asuka-after-class.webp
      ├── /asuka-school/assets/asuka-noon.webp
      └── /asuka-school/assets/asuka-tokyo3-night.webp
```

## Lifecycle

The locale dictionaries, owned style element, controller, and every settings
registration are owned by Cordis effects. Slot contributions wait for their
declared slots with `ctx.slots.inject`, so they are removed with their
contributor and never claim a shell-owned seat.

## Appearance isolation

The controller never writes DSH's Light / Dark / System preference or injects
global theme-token overrides. This prevents a wallpaper scene from changing the
official controls' color-scheme branch; the plugin owns only its settings UI
and non-interactive wallpaper layer.

## Wallpaper safety

The three image routes use exact registered paths, GET/HEAD only, fixed package
paths, correct WebP MIME types, immutable caching, and `nosniff`. A request
cannot select a filename or escape the package directory.
