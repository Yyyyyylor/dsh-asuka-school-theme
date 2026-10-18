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

`command-menu.ts` owns a separate capture-click compatibility guard for the
composer's add button. DSH 0.2's draft-focus tracking can clear the programmatic
launcher without closing its menu. A visible command menu, including pending
command candidates, is closed through the same editor's native Escape arbitration;
the click is suppressed only if Escape was consumed, preventing immediate reopening.
Other sources, composing drafts, opening and outside clicks retain native behavior.
The guard does not access private React/editor state or add service dependencies;
Cordis disposal removes its listener.

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

Fullscreen presentation keeps matching frame-track and panel-width transitions
in both directions. The sidebar and center tracks fold to zero while the open
right track grows to the frame width, using their existing overflow clipping to
remove underlying glass from the fullscreen rim. Conversation content retains
its normal narrow push width (400px minimum on wide frames), avoiding repeated
text/composer reflow during the fold. A closed panel releases the full-width track
even when its local fullscreen choice is retained for reopening. Wide frames use
native panel mode/open state, rather than the frame's delayed fullscreen report.
Narrow adapted tracks ignore the native automatic-fullscreen instant flag, and
wide fullscreen panels retain track motion through their exit/reopening. Panel
width/mode stays fixed during the native exit slide; only the occupied frame
track is released. Dragging and both reduced-motion preferences remain immediate.

`rightbar-layout.ts` adapts DSH's derived fullscreen rule below 768px while the
theme is active. It retains the host's requested left track, assigns 45% of the
remaining room (capped at 340px) to the right panel, and reserves that track only
while expanded. Docks stay mounted and retain their native edge slide, focus,
navigation and room measurement. Native automatic-fullscreen exit collapses the
panel; the adapter instead toggles its local presentation with matching accessible
copy, tooltip text/keycaps and glyph. The original SVG stays mounted; CSS supplies
the fullscreen glyph only in adapted push mode. The effective `aria-keyshortcuts`
binding routes the same toggle from a visible docked pane, after local handlers
and before the host's window-bubble dispatch. Modals/menus, composition, AltGraph,
repeats and unrelated/hidden/floating focus do not trigger a second native action.
This temporary choice resets when leaving the narrow breakpoint; no DSH preference
or Session layout is rewritten. Off/disposal restores owned markers, CSS variables
and button/tooltip labels and releases observers, the animation frame, click/key
and composition listeners. Native tooltip nodes, positioning and focus stay owned
by the host; the adapter restores only label values it still owns.

## Appearance isolation

The unreleased rounded-refraction enhancement is a separate Cordis effect in
`liquid-glass.ts`. It observes activation from the existing presenter, discovers
major paint surfaces, and owns per-surface SVG lens resources and passive
pointer highlights. It adds no settings synchronizer or Host/API service.
Filtering stays on background siblings, including the Settings background;
Off/disposal restores markers and inline filter properties and releases maps.
Resize settling, decode fences, engine fallback and resource budgets are
documented in [LIQUID-GLASS.md](LIQUID-GLASS.md).

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
