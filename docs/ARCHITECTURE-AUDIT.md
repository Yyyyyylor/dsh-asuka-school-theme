# Architecture audit

```text
Host settings namespace
      │
      └── asuka-school-theme
              │ settingsScope.bind()
              ▼
       Asuka theme controller
       ├── ThemeRuntime register/setTheme
       ├── General Quick Row
       ├── Asuka School section
       └── owned wallpaper document layer

Host webServer
      ├── /asuka-school/assets/asuka-after-class.webp
      ├── /asuka-school/assets/asuka-noon.webp
      └── /asuka-school/assets/asuka-tokyo3-night.webp
```

## Lifecycle

Both theme definitions, locale dictionaries, the owned style element, the
controller, and every settings registration are owned by Cordis effects. Slot
contributions wait for their declared slots with `ctx.slots.inject`, so they
are removed with their contributor and never claim a shell-owned seat.

## Theme hand-off

The controller guards its own `setTheme()` call. A later external
`theme/change` to Light, Dark, or System writes `mode: off`; the official
Appearance control then wins without an event loop.

## Wallpaper safety

The three image routes use exact registered paths, GET/HEAD only, fixed package
paths, correct WebP MIME types, immutable caching, and `nosniff`. A request
cannot select a filename or escape the package directory.
