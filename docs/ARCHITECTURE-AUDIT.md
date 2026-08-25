# Architecture audit

```text
Host settings namespace
      │
      └── asuka-school-theme
              │ settingsScope.bind()
              ▼
       Asuka theme controller
       ├── ThemeRuntime overrideTokens
       ├── General Quick Row
       ├── Asuka School section
       └── owned wallpaper document layer

Host webServer
      ├── /asuka-school/assets/asuka-after-class.webp
      ├── /asuka-school/assets/asuka-noon.webp
      └── /asuka-school/assets/asuka-tokyo3-night.webp
```

## Lifecycle

The locale dictionaries, owned style element, controller, theme-token override,
and every settings registration are owned by Cordis effects. Slot contributions
wait for their declared slots with `ctx.slots.inject`, so they are removed with
their contributor and never claim a shell-owned seat.

## Theme hand-off

The controller renders its selected mode with a plugin-owned `overrideTokens()`
layer and never writes a third-party value to DSH's persisted Light / Dark /
System preference. Its own `theme/change` revision is ignored; a later change
to the official appearance preference writes `mode: off`, so the official
Appearance control wins without an event loop.

## Wallpaper safety

The three image routes use exact registered paths, GET/HEAD only, fixed package
paths, correct WebP MIME types, immutable caching, and `nosniff`. A request
cannot select a filename or escape the package directory.
