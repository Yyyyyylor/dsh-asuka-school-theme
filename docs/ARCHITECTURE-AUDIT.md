# Architecture audit

```text
Host volatile Config / profile entry
      │
      └── asuka-school-theme
              │ configForms.get(entryId)
              ▼
       Asuka theme controller
       ├── General Quick Row
       ├── Theme Asuka section
       └── owned wallpaper document layer

Host webServer
      ├── /asuka-school/assets/asuka-after-class.webp
      ├── /asuka-school/assets/asuka-noon.webp
      └── /asuka-school/assets/asuka-tokyo3-night.webp
```

## Lifecycle

The 0.2.0-rc.2 audit uses the installed CLI and package declarations/JS.
The preceding 0.1.7-rc.2 audit also checked the official tag
`dsh-v0.1.7-rc.2`. Host settings project volatile Config fields into
entry-owned profile forms; `settings.configure({ auto: false })` suppresses
the generated page because this plugin supplies its own section. The unchanged
entry ID lets DSH migrate the old settings document. Client `configForms.get`
provides shared, revision-fenced writes; scene selection and reset are atomic.
The former client-runtime barrel is replaced by Cordis `Context`,
`dsh-client-store`, `dsh-client-ui-settings/client`, and
`dsh-api-session-controller/client`. Slot contracts remain in `dsh-client-ui-slots`;
Session standard props are supplied by `dsh-client-ui-session/client`.

The locale dictionaries, owned style element, controller, and every settings
registration are owned by Cordis effects. Slot contributions wait for their
declared slots with `ctx.slots.inject`, so they are removed with their
contributor and never claim a shell-owned seat.

`workspace-picker.ts` owns one document capture listener through a Cordis effect.
DSH 0.2 positions WorkspacePicker's Menu with `anchor=null`, so the separate
Hero chip otherwise closes it on pointerdown and reopens it on click. The guard
stops propagation only for a primary pointer on that expanded chip; focus,
native click/keyboard toggling, menu selection and outside dismissal remain native.
It does not register into the host's single workspace slot or replace its component.
The compatibility guard remains active while the plugin is loaded, including
scene Off, and its effect removes the listener on disposal.

`dock-motion.ts` is also owned by a Cordis effect. A MutationObserver discovers
right-side dock surfaces and detects the native split-to-single change; a
ResizeObserver records visible pane bounds and container resizing. Only the
observed outer dock surface receives a temporary width/margin animation, from the
surviving pane's prior bounds to the full width. Flex growth/shrink is disabled
only during that animation. DockKit's own observer then refreshes room through the
final width, avoiding the stale narrow measurement of a grid-only closing motion.
Native removal and focus remain immediate; no close event or component is replaced.
New splits, parent resizing, dragging, scene changes and reduced motion cancel
stale animations. Disposal disconnects both observers and cancels owned animations.
Visible detached panes retain native behavior and skip this dock-close motion.

## Appearance isolation

The controller does not persist changes to DSH's Light / Dark / System preference.
The existing presenter applies inline body tokens, the dark-theme attribute, and
root color-scheme while a scene is enabled, restoring its captured baseline on Off
or disposal. This behavior is preserved in the compatibility update. The glass
palette is staged in a detached style declaration and committed with one body
style mutation, including baseline restoration. Unrelated inline properties and
their priorities are retained; unchanged palettes skip the style commit. The
stylesheet also targets semantic attributes and selected host DOM structures
(including code banners); those structures require browser regression checks
when the host changes. No host component is replaced.

## Wallpaper safety

The three image routes use exact registered paths, GET/HEAD only, fixed package
paths, correct WebP MIME types, immutable caching, and `nosniff`. A request
cannot select a filename or escape the package directory.

Wallpaper decoding retains at most the three allowlisted Image resources and
their pending/ready promises. Repeated scene selection and A/B/A races share
decoding work; failed loads are evicted so preload and foreground retries remain
possible. Disposal clears the cache, pending frames and preloads; stale completions
cannot repopulate it or revive removed layers. Each wallpaper layer applies its
scene filter and blur before the existing opacity crossfade. The root remains
an unfiltered clipping/opacity container, avoiding a blur of its changing combined
children. Glass backdrop filters and transition durations remain unchanged.
