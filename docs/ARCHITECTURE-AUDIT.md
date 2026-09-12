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

The 0.1.5-rc.2 audit uses the installed CLI and official tag
`dsh-v0.1.5-rc.2` (`fb2c4b9e698e30edb738bca4cf0618587db7d203`).
The former client-runtime barrel is replaced by Cordis `Context`,
`dsh-client-store`, `dsh-client-ui-settings/client`, and
`dsh-api-session-controller/client`. Slot contracts remain in `dsh-client-ui-slots`;
Session standard props are supplied by `dsh-client-ui-session/client`.

The locale dictionaries, owned style element, controller, and every settings
registration are owned by Cordis effects. Slot contributions wait for their
declared slots with `ctx.slots.inject`, so they are removed with their
contributor and never claim a shell-owned seat.

## Appearance isolation

The controller does not persist changes to DSH's Light / Dark / System preference.
The existing presenter applies inline body tokens, the dark-theme attribute, and
root color-scheme while a scene is enabled, restoring its captured baseline on Off
or disposal. This behavior is preserved in the compatibility update. The glass
stylesheet also targets semantic attributes and selected host DOM structures
(including code banners); those structures require browser regression checks
when the host changes. No host component is replaced.

## Wallpaper safety

The three image routes use exact registered paths, GET/HEAD only, fixed package
paths, correct WebP MIME types, immutable caching, and `nosniff`. A request
cannot select a filename or escape the package directory.
