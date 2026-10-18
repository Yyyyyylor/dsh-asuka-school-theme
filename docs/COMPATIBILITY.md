# Compatibility

Current version baseline: plugin `3.2.2`, DSH
`0.2.0-rc.2`, Cordis `4.0.4`, Schemastery `3.18.4`, Node.js `>=20` and
pnpm `11.19.0`. Exact DSH peers and `dsh.compatibility.dshReleases` declare
only the audited `0.2.0-rc.2`. This interface-compatibility declaration is not
evidence of complete Web UI behavior, an Ubuntu/WSL run, or DSH Store approval.

## Right-sidebar open/close timing (2026-10-12)

Real 735px DSH Web samples reproduced the host's automatic-fullscreen exit
leaving `data-rightbar-instant` set across close/reopen. The frame jumped between
373.45px and 679px of center room while the native pane continued its 300ms slide.
The narrow adapter now keeps its track transition armed through that host flag.
It also retains the selected panel mode/width while closed, releasing only the
frame track so fullscreen exit no longer shrinks the pane during its slide.
Wide fullscreen tracks use the native panel mode/open attributes because the
host reports frame fullscreen only after entrance transforms finish.

Windows isolated DSH Web checks covered ordinary and fullscreen open/close at
735px and 1280px, plus quick Ctrl+Shift+B close/reopen. Intermediate geometry kept
the pane's left edge 10px inside the frame divider; the same 8px/filter URL stayed
attached. Fullscreen exit retained 715px pane content at 735px and 1260px content
at 1280px through the slide. Plugin reduced motion retained immediate open/close
and hidden exit content. The default viewport, normal motion and open push-mode
right sidebar were restored; Morning/System, Chinese, 33% wallpaper opacity,
0px blur and enabled details were retained.

Runtime edits are limited to the right-sidebar adapter and its layout rules;
other content/material rules are unchanged. Build, 88 tests and
type/asset/contrast/package checks passed. OS reduced motion, Ubuntu/WSL,
standalone Desktop/titlebar, detached panes and live streaming were not rechecked.
No model/terminal/feedback request or real profile change was made.

## Fullscreen rim and synchronized layout motion (2026-10-12)

The isolated preview reproduced a doubled left rim caused by the navigation
glass remaining behind the fullscreen panel. Narrow fullscreen also disabled
panel-width motion and frame-track entry motion, while exit animated only the
center track. Both modes now interpolate the same three tracks and panel width
with the host's 300ms easing. Fullscreen folds navigation/center tracks to zero
through their existing clipping, exposing wallpaper behind a single glass rim.
Conversation content retains its push width (at least 400px on wide frames),
preventing vertical text and composer-height jumps as its column folds. Closed
panels release the fullscreen track. No content transform/opacity, new clipping
ancestor, glass-filter change or host component replacement was introduced.

Real Windows DSH Web checks covered 735px and 1280px fullscreen entry/exit,
mouse and Ctrl+Alt+Enter, full-panel collapse/reopening, Morning/Noon Light and
Night Dark. Geometry samples kept the panel edge aligned with the frame divider
through intermediate widths in both directions, retaining the same 8px/filter
URL. Narrow exit retained a 373.44px conversation and 116px composer height while
the panel shrank from 735px to 305.55px. Plugin reduced motion set both frame
and panel transitions to none. Restored the default viewport, Morning/System,
Chinese, 33% wallpaper opacity, 0px blur, normal motion and enabled details.

Build, 87 tests, type/asset/contrast/package checks passed. OS reduced motion is
covered statically, not toggled live. Ubuntu/WSL, standalone Desktop/titlebar,
live conversation/code streaming and detached panes were not rechecked. Samples
and screenshots establish observed layout/rendering, not a GPU frame-rate
guarantee. No model/terminal/feedback request or real profile change was made.

## Narrow right-sidebar fullscreen controls (2026-10-12)

The isolated Windows DSH Web preview reproduced a narrow-window mismatch:
after exiting local fullscreen, the native glyph and tooltip still said Exit
fullscreen, while the native fullscreen shortcut collapsed the sidebar. The
installed host derives automatic fullscreen below 768px; its exit command
collapses the panel before changing mode to push.

The narrow layout adapter now synchronizes the button label, glyph and native
tooltip with the displayed mode. It retains the native SVG and tooltip/keycap
nodes, drawing the push-mode glyph through a scoped CSS marker. The shortcut
uses the button's effective `aria-keyshortcuts`, runs after local handlers and
before host window-bubble dispatch, and restores push without closing the dock.
Modal/menu, composition, AltGraph, hidden/inert and dock-focus guards keep its
scope narrow. Wide windows, theme Off and disposal restore native controls.

Real browser checks covered mouse activation, Enter/Space and Ctrl+Alt+Enter,
tooltip text/keycaps, 735px/1280px breakpoint transitions, a Settings modal,
Chinese/English locale changes and theme Off/on. Exiting fullscreen kept the
sidebar open beside the main area. The original viewport, Chinese language,
Morning/System theme, 24% wallpaper opacity, 0px blur, normal motion and enabled
details were restored, leaving the right sidebar open in push mode.

Build, 87 tests and type/asset/contrast/package checks passed. Unit checks cover
customized bindings, modifier mismatch, numpad, IME and AltGraph exclusions;
those input variants were not all exercised in the live browser. Ubuntu/WSL,
standalone Desktop, detached dock and terminal shortcut handling were not
rechecked. No model/command/feedback request or real user profile change was made.

## Small-menu entrance motion (2026-10-12)

Installed DSH `0.2.0-rc.2` primitives expose an owner-controlled `Menu` whose
list is rendered with `open && MenuSurface`; input-trigger `MenuView` returns
null when closed. Neither retains a closing state. This checkout therefore adds
entrance motion only, with no host edits, retained DOM or dismissal interception.
Each native translucent MenuSurface animates one inherited progress value for
180ms. Button labels/icons and group headings fade in and rise by up to 4px;
the glass layer, shell, scrolling wrappers and native hit targets remain still.
The progress resets locally for each nested menu, and replacement/filter rows
reuse the current progress instead of replaying an entrance. Both reduced-motion
preferences disable it; the theme Off state restores the native styles.

Real isolated Windows DSH Web checks covered add, workspace, preset, permission,
model and Settings language menus at 735px, plus the model menu at 1280px.
Opening samples captured intermediate text opacity/offset and then opacity 1 /
zero offset. Menu shells retained opacity 1, no transform/translate and 5px glass;
header/composer retained their 8px/3px filters. Add/workspace second-click close,
Escape and outside dismissal remained functional. The model pane's menu-to-group
change kept progress 1. Morning/Noon Light and Night Dark screenshots retained
readable labels and the glass rim. Plugin reduced motion produced animation none,
0s duration and fully visible labels; theme Off restored native 40px menu blur.
Restored the original viewport, Morning/System, 24% wallpaper opacity, 0px blur,
normal motion, enabled details and closed right sidebar.

Build, 84 tests, type/asset/contrast/package and pack checks passed. Static tests
cover the shell/material boundary and both motion guards. OS reduced motion was
not toggled in the browser; Ubuntu/WSL, standalone Desktop, live model streaming
and nested fixed-submenu interaction were not rechecked. No model/command/feedback
request or real user profile change was made.

## Stable menu opening material (2026-10-12)

The isolated Windows DSH Web preview reproduced add-menu opening with a 20px
frosted background, followed by a 5px SVG glass background after the runtime's
100ms discovery delay. Supported menus now use their final blur, saturation,
inset depth and rim before map readiness. The optional local decoded filter is
added to that same material layer; nested menus explicitly reset inherited
filter URLs until their own lens is ready. Settings retains its 48px blur and
final rim opacity from the first frame, including decorative-details Off.
MutationObserver reconciles added/removed surfaces before paint without
cancelling existing resize debounces. Native entrance/close behavior, pointer
lighting and optical parameters are retained; no popup is hidden or delayed.

Real browser checks covered add, workspace, preset, permission and model menus,
the model pane's menu-to-group change, Settings, three repeated open/close cycles,
735px/1280px windows, Morning/Noon Light and Night Dark. Opening samples retained
5px menu material and the existing rim; header/composer retained their filter
URLs and 8px/3px blur. Settings retained its transform entrance, 48px blur and
shell opacity 1. Plugin reduced motion plus details Off gave zero moving light,
`0s` rim transitions and opacity 0.38. Theme Off removed all lens markers and
owned filter URLs, and the permission menu restored native 40px glass.
Returned to the original viewport, Morning/System, 44% wallpaper opacity,
0px wallpaper blur, normal motion, enabled details and closed right sidebar.

Build, all 83 tests, type/asset/contrast/package and pack checks passed. Static
regression checks cover first-paint material, local filter isolation and Settings
rim opacity. Browser samples and screenshots are separate rendering evidence,
not a frame-by-frame GPU guarantee. Ubuntu/WSL, standalone Desktop, OS reduced
motion, forced image-decode failures and live model streaming were not rechecked.
No command/model/feedback request or real user profile change was made.

## Add-menu rim and repeat-toggle correction (2026-10-12)

The isolated Windows DSH Web preview reproduced a 16px-high liquid rim inside
the add menu: its native bottom scroll hint and the plugin rim shared `::after`.
The rim now uses the native material child's full-size pseudo-element, leaving
the host scroll fade, scrolling list, rounded clipping and backdrop blur intact.
The same preview reproduced the launcher becoming false while the command menu
remained visible after draft focusing. A capture-click guard closes that menu
through the same editor's native Escape handling and suppresses reopening only
when Escape was consumed. Pending commands are included; other source menus and
IME composition are left to the host.

Real browser checks covered 735px and 1280px, Morning/Noon Light and Night Dark,
second clicks, rapid double-click, repeated keyboard activation, Escape, outside
clicks, keyboard scrolling to the last command and preservation of a test draft.
The scroll fade retained its native 16px height/bottom inset and disappeared at
the bottom; the independent rim retained full material height and glass blur.
Plugin reduced motion gave the rim zero strength and `0s` transitions. Restored
Morning, System appearance, 44% opacity, 0px wallpaper blur, normal motion and
the original viewport; removed the temporary unsent test draft.

Build, all 82 tests, type/asset/contrast/package and pack checks passed. Guard
unit tests cover filtering, consumed/unconsumed close events, IME bypass and
listener disposal; CSS checks cover layer separation. These are separate from
the real browser checks. Ubuntu/WSL, standalone Desktop, OS reduced motion and
actual command execution were not rechecked; no model or feedback was sent.

## Continuous glass during right-sidebar motion (2026-10-12)

In the real isolated Windows DSH Web preview, opening the right sidebar
reproduced header/composer lens markers disappearing during width motion:
their backgrounds switched to the 20px frosted fallback and returned to
8px/3px SVG glass afterwards. The runtime now keeps the decoded filter attached,
stretches its map through room changes, and atomically installs the next decoded
map after the 100ms settling debounce. Replacement failures retain the old map.

The pointer reflection is now a local 110px light, attenuated by distance from
the rim, with 140ms position easing and 180ms strength fading on the painted
pseudo-element. Leaving a surface preserves its last coordinates while fading
strength to zero. Reduced motion clears owned pointer properties and transitions.

Checked open/close transition samples at 735px and 1280px, three rapid keyboard
toggles, matching image/layout widths during motion, and pointer transfer from
header to composer. Samples retained the same filter URLs and 8px/3px blur.
The header's light visibly eased to zero at its last coordinates rather than
jumping to a corner. Plugin reduced motion produced zero strength and `0s`
rim transitions; theme Off left zero owned filter/pointer references and lens
markers. Re-enabling restored glass. Restored the original viewport, Morning,
44% wallpaper opacity, 0px wallpaper blur and normal motion.

Build, all 79 tests, type/asset/contrast/package and pack checks passed. The new
pure highlight test covers center suppression, edge attenuation and bounds;
static rules cover local paint easing. Real browser samples are separate from
those tests and do not constitute frame-by-frame GPU verification. Ubuntu/WSL,
standalone Desktop, OS reduced motion and injected decode failures were not
rechecked. No model request or real user profile change was made.

## Settings glass center correction (2026-10-12)

Follow-up visual feedback showed that stable blur alone did not preserve the
glass appearance. The old border-box gradient painted beneath the full center,
stacking with the translucent fill. Settings now paints its existing tint once
on the blurred pseudo-element, leaves the shell transparent, and masks the
edge gradient/pointer highlight to a two-pixel rim. Tint/blur constants were not
increased. Local non-inherited paint colors are assigned on their actual layers.

Real isolated Windows DSH Web checks used the 735px in-app browser with 100%
wallpaper opacity and 0px wallpaper blur. The Morning/Noon/Night settings panes
retained background color variations with softened image details and sharp
controls; computed styles confirmed a transparent shell, 48px background blur
and excluded center in the rim mask. Returned to Morning, 44% wallpaper opacity
(the value present at the start of this correction) and 0px wallpaper blur.
Build, 78 tests, type/asset/contrast/package and pack checks passed. Screenshots
remain outside the repository. These are targeted Windows browser checks;
Ubuntu/WSL, standalone Desktop and non-Chromium painting were not rechecked.

## Settings entrance material stabilization (2026-10-12)

The isolated Windows DSH `0.2.0-rc.2` Web preview reproduced two different
entrance states: a 48px filter on the dialog with a 10px mask, followed by a
48px filter on its pseudo-element with a 2px mask after lens decoding. The
dialog also faded/scaled while maps used transformed bounding-box dimensions.

Settings now keeps its 48px blur on the background pseudo-element and the
mask at 2px before and after decoding, retaining the translucent tint and rim.
The shell retains its transform entrance and its children fade independently;
the shell's opacity stays at 1 so it does not isolate its child's backdrop.
Maps use layout dimensions, and an initial ResizeObserver delivery no longer
detaches a map that already matches those dimensions.

In the real Codex in-app browser, checked repeated Settings opens in Morning
Light at 735px, Night Dark at 1280px, and Noon Light at 620px. Initial and
settled DOM samples confirmed the same filter layer, 48px blur, mask and shell
opacity, with only the optional lens URL added. Screenshots showed retained
glass/rim and contained content. Plugin reduced motion removed both shell and
content animations while retaining blur. Restored the original viewport and
Morning/normal-motion preview afterwards. This is targeted rendering evidence,
not a frame-by-frame recording or an OS/GPU-wide flicker guarantee.

Build, all 78 tests, type/asset/contrast/package checks and pack structure
checks passed. Static CSS regression checks cover the stable background layer
and separate content fade; these do not replace the browser checks. Ubuntu/WSL,
standalone Desktop, non-Chromium fallback painting and OS reduced motion were
not rechecked. No model request or real user profile change was made.

## Narrow right sidebar room (2026-10-12)

DSH's installed `0.2.0-rc.2` sidebar derives automatic fullscreen below
768px. The plugin now reserves 45% of the room after the left sidebar for
the right pane (up to 340px), allowing the main area to shrink alongside it.
The existing mode button toggles manual fullscreen within this narrow layout.
Wide windows and theme Off restore the native tracks and button label.

Real Windows DSH Web checks used the isolated
`%TEMP%/asuka-liquid-glass-20261004` profile and the rebuilt, locally linked
plugin in the Codex in-app browser. At 735px, the collapsed left rail, main
area and right pane measured 56px / 373.45px / 305.55px without overlap.
Also checked 620px and 375px, the expanded left sidebar, manual fullscreen
and return, collapse/reopen, 1280px native layout restoration, theme Off
restoration, and plugin reduced motion (`0s` frame/dock transitions).
The 375px new-session workspace/preset controls wrap inside the main area;
document width matched each narrow viewport. Temporary viewport overrides
were reset. Screenshots remain outside the repository.

The 78 automated tests, build, type/asset/contrast/package checks and pack
structure check passed. Pure width tests and static CSS contracts are separate
from the real browser checks above. Ubuntu/WSL, standalone Desktop, OS-level
reduced motion, live streaming and third-party sidebar combinations were not
rechecked. No model request or real user profile change was made.

## Settings background blur correction (2026-10-12)

Restored the original translucent Settings fill, gradient and modal mask,
superseding the opacity increase recorded below. Settings now uses a shared
48px blur token: on the background pseudo-element with refraction active, or
the original frosted dialog when lenses are unavailable. Rim highlights,
refraction, local label/control colors and other surface blur values remain.

`pnpm build`, all 74 tests, `pnpm check`, `pnpm pack:check` and
`git diff --check` passed. Style checks cover the translucent fill and shared
blur token in both paths; these are static contracts, not rendered evidence.
The isolated DSH Web server started successfully, but both the in-app browser
and Edge navigation returned `ERR_BLOCKED_BY_CLIENT` from the browser tool.
The new 48px material therefore has no fresh visual verification in this run;
the 2026-10-04 screenshots below describe the prior material. Ubuntu/WSL and
Desktop were not rechecked. No model request or user profile change was made.

## Unreleased rounded refraction development check (2026-10-04)

This worktree adds Web background refraction; published `3.2.2` and its earlier
WSL verification do not include this change. Renderer evidence and resource
budgets are documented in [LIQUID-GLASS.md](LIQUID-GLASS.md).

- Built and loaded the development Client through the real installed DSH
  `0.2.0-rc.2` Web Host in a new `%TEMP%/asuka-liquid-glass-20261004` home on
  loopback port 5184. No credentials or existing profile were copied. Only
  existing offline fixture sessions were copied; telemetry capture was disabled.
  No model request, tool execution or external application launch was performed.
- Windows Codex in-app browser checks used 1280 × 800 and 620 × 800 viewports,
  with 100% wallpaper opacity and 0px wallpaper blur. Visually checked all six
  native Light/Dark and morning/noon/night combinations in Settings, as well as
  composer, sidebar/header, native add menu, right-pane guide and the offline
  transcript's table and short highlighted code block. The original browser
  viewport was restored afterwards. Screenshots remain outside the repository.
- Observed bending of wallpaper/window lines at the composer rim. Computed
  backdrop filters include same-document `url("#asuka-liquid-lens-…")` on
  composer/sidebar/header/dock background layers and the native menu material
  child. Menu shells and dock content retain `none`. Settings content has `none`
  while its background has the 18px blur plus lens. This is background pixel
  displacement, not a wallpaper duplicate or an Apple native material.
- After increasing Settings opacity, reloaded the rebuilt Client and confirmed
  the new 94% mix of the scene fallback fill was loaded. Rechecked Settings in
  native Light/Dark with all three scenes at 100% wallpaper opacity and 0px blur;
  labels and controls were readable with substantially less background bleed.
  Checked General and the plugin's wallpaper controls, plus the Morning settings
  page at 620px: document width remained 620px and the panel remained contained.
  Retained rim highlights/refraction and restored the temporary viewport override.
- At 620px, document width remained 620px, labels and code stayed contained,
  and the scene-aware code banner retained its controls/highlighting. Plugin
  reduced motion removed inline pointer-highlight coordinates and gave both
  wallpaper layers `0s` transitions while retaining static lenses. Off removed
  all SVG filter nodes, lens markers and inline filter references, restoring the
  captured native appearance. Re-enabling rebuilt lenses normally. Browser
  console inspection found no captured warnings/errors.
- `pnpm build`, 74 automated tests, `pnpm check`, `pnpm pack:check` and
  `git diff --check` passed. Tests include rounded-map normals, a neutral center,
  outside-corner behavior, raster memory bounds and the unsupported-engine gate;
  contrast checks cover palette/code colors, not screenshot pixel contrast.
  Build required access to the worktree's parent-directory metadata; npm pack's
  cache was placed in this task's temporary directory.

Standalone Electron/Desktop (including its `dsh-app` scheme), Ubuntu/WSL,
non-Chromium paint fallback, GPU-specific filter failure, OS reduced-motion
emulation, long-code sticky/copy behavior, live streaming and controlled frame
timing were not rechecked. No performance gain or native Liquid Glass equivalence
is claimed. The earlier `3.2.2` target-environment confirmation remains evidence
only for that released version.

## Preset transition work reduction (2026-10-01)

The rebuilt Client was checked in the same real isolated Windows DSH Web profile.
The wallpaper root computed to `filter: none`; both individual layers retained
their scene treatment plus the selected blur and their 560ms opacity crossfade.
Checked all three scenes, rapid return to Morning, 20px blur, and reduced motion
(both layers computed to `0s`); restored Light/Morning, 15% opacity, 1px blur and
normal motion afterwards. Existing Settings glass and scene colors were preserved.

A temporary local frame probe sampled 850ms after each General-row preset click
at 1280 × 720. Maximum frame gaps for Noon/Night/Morning were 30/40/50.2ms before
and 24.7/40.3/45.1ms after; p95 gaps were 20/20.1/20ms before and
19.9/20.1/24.6ms after. No long tasks were recorded. These short desktop samples
show reduced work in some switches, not a consistent frame-rate gain or the
elimination of every hitch. The probe was removed from the isolated Client after
verification and is not part of the plugin. Automated cache/race/disposal and
existing failure-retry checks passed with all 70 tests; build and `pnpm check`
also passed. This run did not recheck Ubuntu/WSL, live streaming or other plugins.

The subsequent palette-batching pass produced exactly one body style mutation
per scene change in the same browser. Its maximum Noon/Night/Morning gaps were
30.1/34.9/44.9ms, with p95 gaps of 19.9/19.9/24.8ms; no long tasks were recorded.
Off removed the plugin's inline palette and restored native Light color-scheme.
An unrelated temporary inline property retained its value and `important`
priority through switching and restoration. The diagnostic property and probe
were removed by loading the clean rebuilt Client after verification. These samples
retain the same limited performance conclusion; the batching change directly
reduces live DOM style writes without changing transition timing or glass effects.

## Wordmark/tab spacing and coordinated banners (2026-10-01)

The rebuilt Client was checked in the real isolated Windows DSH Web profile.
The expanded DeepSeek HARNESS wordmark retained its full SVG and collapse action
with 6px internal padding. Chat/Trajectory tabs had 6px top and 12px inline
padding; switching both tabs preserved selection and content. At a 620px viewport,
the visible conversation tabs retained their padding without overlap, and the
collapsed sidebar remained intact. The temporary viewport override was reset.

All six native Light/Dark and morning/noon/night combinations used the intended
banner fills and local label colors. Morning is warm sand, noon mist blue-gray,
and night deep blue-gray. The Night banner also retained its fill and readable
labels with decorative details disabled. The minimum checked banner-label
contrast is 4.83:1. Build, all 67 tests and `pnpm check` passed; browser console
inspection found no errors. This used offline fixture content and did not rerun
Ubuntu/WSL or real streaming verification for these latest style changes.

## 3.2.2 WSL Ubuntu confirmation (2026-10-01)

After the preset transition optimization, the user reconfirmed that the final
state, designated `3.2.2`, passed state testing and real model streaming in WSL
Ubuntu, with normal behavior. The user
also supplied the screenshot now used by both READMEs. This is user-reported
target-environment verification, separate from the agent's Windows browser and
automated checks. No detailed test matrix, logs or browser/model versions were
provided; this confirmation does not imply checks of every condition listed
below. Earlier statements that Ubuntu/WSL2 or streaming were not checked remain
historical boundaries of those individual runs, rather than the current overall
verification status. This target-environment report does not imply npm
publication or Store approval; the release uses the project's GitHub tag and
prebuilt Release asset distribution.

## Narrow guides, code banners and dock labels (2026-10-01)

Rechecked the installed `0.2.0-rc.2` guide DOM and native DockKit stylesheet.
Guide shortcut hints are fixed flex items that can consume all title space;
selected tabs use `--dsw-alias-markdown-tag`, which follows native appearance
independently of scene labels. Local CSS now queries the actual
`data-sidebar-right-guide` element and pairs selected tab paint with scene text.
Code banners have opaque scene mid-tones and an inset divider; existing sticky
mask, copy/wrap controls and clipping geometry remain intact.

- Real Windows DSH Web verification used the existing isolated profile at
  `%TEMP%/asuka-ui-fixes-20261001`, with the rebuilt Client. Checked all six
  native Light/Dark and morning/noon/night combinations, including changing
  native appearance after enabling a scene. Selected labels/close icons stayed
  readable, and banners were distinct from code and transcript backgrounds.
- At a 173px guide width, titles retained available space and both shortcut
  hints were hidden without entry overflow; at 379px they returned. The narrow
  terminal shell menu remained correctly positioned. No terminal was started.
  At a 620px viewport, document width remained 620px and guide entries stayed
  contained. The temporary viewport override was reset afterwards.
- Checked code wrap on/off and Night banners with decorative details disabled.
  Restored the original Light/Night and decorative-detail preferences. This run
  used fixed offline content; it did not send model requests or execute tools.
- `pnpm build`, all 67 automated tests, and `pnpm check` passed. The contrast
  checker now reads actual banner fills; the dimmest banner label exceeds
  4.5:1 in all three scenes. Automated color checks are separate from browser
  observations. This run did not recheck long-code sticky scrolling, clipboard
  completeness, Ubuntu/WSL2, other plugins or live streaming.

## 0.2.0-rc.2 interface audit (2026-09-30)

Primary evidence: the installed `dsh --version` and package tree at
`C:/Users/25861/AppData/Roaming/npm/node_modules/@deepseek-ai/dsh/` report
`0.2.0-rc.2`. The package's `node_modules/@deepseek-ai/` declarations, JS,
manifests and built Web frontend were checked against the plugin's imports and
injection graph. No globally installed package was modified.

| Area | Installed 0.2.0-rc.2 contract and decision |
| --- | --- |
| Host Config and settings | `SettingsForms.configure({ auto: false })` and its disposer remain; volatile `Config` still projects entry-owned live fields. Keep the existing entry ID and schema. |
| Client settings | `configForms.get<T>(entryId)`, snapshot/subscribe, `set`, `unset` and atomic `mutate` retain their signatures and refusal behavior. Keep the single controller and optimistic scene settling. |
| Slots | `settings.general.item` and `settings.section` remain root list slots; `conversation.session.header.actions` remains a session list slot. The installed UI bundles still render these seats. Keep additive registrations. |
| Session title | `sessions.binding(id)?.session.rename(title)` still returns `RemoteResult` with `ok` and error details. Keep the editor behavior. |
| Assets | `webServer.register({ kind: 'exact', path, handler })` still returns a disposer. Keep the fixed GET/HEAD wallpaper routes. |
| Client graph and loader | All eight declared `dsh.client.inject` packages are present in the installed graph. The Web seed still provides React, JSX runtime and `dsh-client-store`; `__ModuleLoader__.load({ id, factory })` remains the lazy-CJS registration form. Keep React and DSH external. |
| Dependencies | The installed DSH packages are `0.2.0-rc.2`, Cordis is `4.0.4` and Schemastery is `3.18.4`. Update exact peers/dev dependencies and lockfile; leave the runtime schema dependency unchanged. |

`pnpm install` added explicit `minimumReleaseAgeExclude` entries for the 68
newly released packages in this exact DSH dependency graph. It did not add a
wildcard exception or change the project's runtime permissions.

No Host/Client API break in the plugin's used surface required an implementation
change. The 0.2.0 UI's visual DOM and browser interactions still require a real
Web run to establish visual compatibility; type/build checks do not prove them.

### Current verification boundary

- `pnpm build`, `pnpm test` (56 tests), `pnpm check`, `pnpm pack:check` and
  `git diff --check` passed in this worktree. The package includes prebuilt
  Host/Client output and all three allowlisted WebPs.
- An isolated local `DSH_HOME` profile installed the generated `3.2.0-rc.1`
  tarball and started the installed DSH `0.2.0-rc.2` Web server on loopback.
  Real Host routes returned 200/WebP for all three HEAD requests and one GET,
  405 for POST, and 404 for an unknown filename. This verified startup and
  routes.
- The isolated profile was opened in the Codex in-app browser on Windows.
  Morning, noon and night controls changed scenes; an intermediate opacity
  reading confirmed that the two wallpaper layers still crossfade. At 100%
  wallpaper opacity, the sidebar remained visible above the wallpaper in
  morning and night. General Settings' off choice was visually legible in
  DSH light and dark appearance. These checks used the rebuilt local package.
- A validated 12-event offline Session fixture rendered fixed assistant text,
  reasoning, tool input/output, a table and a short code block through the real
  DSH UI. At 100% wallpaper opacity, morning/noon/night replies and expanded
  tools displayed the shared frosted-glass material above the wallpaper. The
  existing missing-credential error was also legible in night glass. Expansion,
  collapse and vertical conversation scrolling worked; a 620px viewport had
  no document-level horizontal overflow. Switching the theme off removed the
  reading surfaces and restored DSH's original dark appearance. No model or
  tool was invoked for the fixture; live streaming, long-code sticky behavior
  and clipboard output were not re-verified in this run.
- No controlled frame-rate measurement was captured. Ubuntu/WSL2, full
  install/update/removal behavior, persistence across restart, clock-boundary
  transitions, IME, injected failure paths and third-party plugin combinations
  remain unverified for this development build.

### Floating glass layout development check (2026-09-30)

The installed `0.2.0-rc.2` layout, sidebar, conversation and right-sidebar
bundles were inspected alongside their real DOM and computed styles. The frame
solves tracks and handles in JS; dock panes own their clipping and slide/fullscreen
lifecycle. Only plugin styles changed; the layout implementation was not replaced.

- `pnpm build`, `pnpm test` (57 tests), `pnpm check`, `pnpm pack:check`
  and `git diff --check` passed. Contrast checks cover existing palette pairs,
  not screenshot pixel measurements of translucent navigation surfaces.
- A fresh `%TEMP%/asuka-floating-glass-20260930` home installed the local
  `3.2.0` package, then loaded this worktree's rebuilt plugin Client. The real
  Windows DSH Web ran on loopback in the Codex in-app browser, with telemetry
  disabled and no model credentials. A 12-event offline Session fixture was
  rendered; no model request or tool execution was sent.
- Morning/noon/night were visually checked at 100% wallpaper opacity. Left
  sidebar, header and right dock had rounded glass edges and visible wallpaper
  gaps. A 1280px viewport measured 10px outer insets and a 20px header/dock gap;
  dragging the right track from 576px to 456px preserved those gaps.
- Expanded/collapsed left sidebar, right open/close, its narrow-screen fullscreen
  adaptation, Settings open/close and the header menu were checked. The 56px
  rail retained 36px icon controls. At 620px, including a manually expanded left
  sidebar, and 390px, title confirmation/cancellation remained clickable without
  document-level horizontal overflow. Enter saved the fixture title and Escape
  cancelled editing. Utilities wrap only when editing needs more space.
- Computed `backdrop-filter` was `none` on all three content ancestors and
  `blur(20px)` on their background pseudo-elements. The plugin's reduced-motion
  preference stopped frame/rail/dock transitions. Switching off restored the
  native full-height sidebar, header at y=0 and right padding of 0px. No browser
  console errors were captured.
- Follow-up checks reproduced native Dark appearance making controls dark on
  noon Settings glass. After locally adapting `bg-module-platform`, noon with
  native Dark, night with native Light, and morning Settings remained legible.
  Both pointer hover and keyboard focus showed the complete Settings tooltip
  above the composer. Files/terminal guide cards measured the sidebar's 16px
  radius at 1280px and 12px at 600px; narrow fullscreen retained no document
  horizontal overflow. Targeted theme/style tests (14) and `pnpm check` passed.
- Screenshots were saved outside the repository. Ubuntu/WSL2, standalone Chrome,
  OS reduced-motion emulation, unsupported-filter fallback, IME, long-code sticky
  scrolling/copy, live streaming, floating/detached pane combinations and other
  plugins were not re-verified in this run. No user profile or installed DSH core
  was modified; this development change has not been published.

### Header motion, file cards and model submenu development check (2026-10-01)

The installed DSH `0.2.0-rc.2` AppFrame, SidebarRight, PresentedFileCard,
OpenTargetButton and MenuSurface implementations were inspected. Only plugin
styles changed; Host components, actions and model transport remain native.

- Real Windows DSH Web ran on loopback in the Codex in-app browser under a
  separate `%TEMP%/asuka-ui-fixes-20261001` home, with telemetry disabled and
  no model credentials. A fixed Session fixture, including one declared local
  text file, supplied the content. This was real DSH rendering of offline events,
  not a mock HTML page or a live model/tool run.
- Before the fix, close sampling showed the header already at its final 980px
  width while the dock was still moving. Afterward, both opening and closing
  samples showed continuous header widths alongside the dock position. The native
  300ms timing was retained. Dragging the right track from 576px to 456px retained
  a 20px header/dock gap.
- Morning, noon and night file cards used glass. Both compact action buttons
  computed to `0px` radius and no individual shadow within the shared `8px`
  frame. File preview read the fixture in the right pane; the action menu opened
  and Escape dismissed it. Keyboard focus displayed a 2px shared frame outline.
  Native application launch and a browser download were not executed.
- The model pane's outer group and material layer retained a 16px radius; its
  inner scrolling menu had transparent paint and no filter. ArrowDown/Enter
  selected the other configured model and restored focus to the trigger without
  sending a model request. Desktop and 620px menu corners were visually checked.
- Settings opened/closed; the transcript's short code block and composer stayed
  usable. At 620px, right-panel fullscreen remained native and document width
  matched viewport width. The plugin reduced-motion preference produced `0s`
  frame and dock transitions. No browser console errors were captured.
- `pnpm build`, `pnpm test` (59 tests), `pnpm check`, `pnpm pack:check` and
  `git diff --check` passed. These are separate from the browser checks above.
  Ubuntu/WSL2, system-level reduced-motion emulation, long-code sticky scrolling,
  detached panes and live model streaming were not re-verified in this run.

### Sidebar split and fullscreen transitions (2026-10-01)

This records the initial CSS-only motion check. The subsequent dock-surface
close animation below supersedes its immediate-removal limitation.

The installed SidebarPanel/RightbarSeat implementation and DockLayout from the
actual Web frontend seed were inspected. The panel supplies push/fullscreen width
inline; DockLayout keeps tab hosts stable and supplies one or three grid tracks.
The plugin adds only CSS transitions and a zero-fraction spare track in the
single-pane state; split ratios, focus, actions and frame tracks remain native.

- Real Windows DSH Web used the same isolated offline fixture home above. No model
  request, terminal command or external application launch was initiated.
- Fullscreen exit samples progressed from 1280px through 1219px, 899px, 694px and
  600px to the native 576px push width. Entry was also observed interpolating to
  1280px. Both use the host's 300ms timing.
- Splitting expanded the new track from 0px through 31px, 269px, 432px and 617px to
  630px in fullscreen; focus moved to the new native pane. Divider dragging retained
  the changed split ratio, with `0s` grid transitions while its native pointer
  capture marker was present. Outer sidebar dragging also produced `0s` panel/grid
  transitions. Enter toggled fullscreen through the native button.
- Animating pane removal with grid transitions was found to leave DockKit's cached room measurement
  based on a transient narrow pane, disabling the split button after removal.
  Removal was therefore kept immediate in that initial implementation; closing
  the second pane restored an enabled split button.
- The plugin's reduced-motion preference produced `0s` width and split-grid
  transitions, including an actual split operation. The OS media-query guard is
  covered by the stylesheet contract; OS-level emulation was unavailable.
- At 620px, automatic fullscreen retained the native slide and `0s` panel-width
  transition; splitting still used 300ms. Document width stayed 620px. Morning,
  noon and night Settings/docked/fullscreen surfaces, the composer and the fixture's
  short code block were visually checked. Panel content still had no filter or
  transform. No browser console errors were captured.
- `pnpm build`, `pnpm test` (60 tests), `pnpm check`, `pnpm pack:check` and
  `git diff --check` passed. Screenshots remain outside the repository. Ubuntu/WSL2,
  detached panes, long-code sticky scrolling and live model streaming were not
  re-verified. No global DSH package or user profile was modified.

### Add-menu corners, workspace toggle and split-divider ends (2026-10-01)

The same installed DSH bundles and real DOM identified three causes: generic
listbox glass covered TriggerMenu's rounded material; WorkspacePicker passes a
null Menu anchor and a separate Hero chip, so outside pointerdown dismissal races
with its native click toggle; DockKit's divider paint spans the whole panel.
The fixes exclude material-owned listboxes, install an effect-owned capture guard
only on the expanded workspace chip, and inset divider pseudo-elements by the
floating radius. The workspace single slot and native components remain intact.

- The rebuilt Client was loaded in `%TEMP%/asuka-ui-fixes-20261001`, using real
  Windows DSH Web in the Codex browser. No model request or terminal execution
  was sent. The global DSH installation and real user profile were unchanged.
- Four consecutive workspace clicks produced open/closed/open/closed. Enter
  toggling, Escape, outside click and selecting the existing workspace all closed
  the native menu. Listener filtering and removal are covered separately by tests.
- The add-menu shell/material retained a 16px radius; its inner listbox had no
  background, border or filter. Arrow-key navigation still scrolled to the last
  command, and Escape closed it. Morning, noon and night visuals were inspected.
- Both divider paint layers start/end 16px inside the desktop panel and 12px
  inside the 620px viewport. The target stays full height with its native 4px
  horizontal hit slop. Narrow document width remained 620px; no new clipping or
  transform was added to pane content.
- `pnpm build`, `pnpm test` (62 tests), `pnpm check`, `pnpm pack:check` and
  `git diff --check` passed. Ubuntu/WSL2, live streaming, long-code sticky behavior
  and OS-level reduced motion were not re-verified for these fixes. The preceding
  split/fullscreen motion checks remain separate evidence.

### Add-menu backdrop sampling and dock-surface close motion (2026-10-01)

The actual composer card's backdrop filter formed a backdrop root, excluding
the welcome text outside it from the add menu's blur. The prior corner check did
not establish backdrop sampling. Composer blur now lives on its own background
pseudo-element; the card computes `backdrop-filter: none`, while the rounded
MenuSurface material retains the shared 20px blur. No menu shell is clipped or
filtered. Both new-session and active-conversation composers use this path.

For split closure, DockKit's outer surface is animated from the surviving pane's
previous width/position to the full width, with temporary zero flex growth/shrink.
Native tab removal is immediate; native ResizeObserver readings continue through
the final width. Owned observers detect layout changes and record pane bounds;
native components, close actions, room rules and focus logic are not replaced.

- Real Windows DSH Web used the existing isolated offline profile. Morning, noon
  and night add menus now visually blur background text; 16px corners remain.
  The active composer, short code block, presented file card, Settings and model
  submenu remained readable and correctly positioned. No model/tool was invoked.
- Both left and right close controls, including Enter activation, produced
  intermediate widths and left positions before the final native 638px dock
  surface. The split button was enabled afterwards and repeated splits worked.
- Reopening a split during close cancelled its old surface animation and restored
  the fullscreen surface to 1442px; the new grid then interpolated to two 721px
  panes. Exiting fullscreen during close also cancelled the stale width target
  and retained the original panel-width transition.
- At 620px, close samples progressed from 312px through 444px, 557px and 607px to
  608px, with the split button enabled at completion. Document width stayed 620px.
  The plugin's reduced-motion preference made real split/close operations
  immediate; the OS preference is covered by runtime tests, not OS emulation.
- `pnpm build`, `pnpm test` (67 tests), `pnpm check`, `pnpm pack:check` and
  `git diff --check` passed. Observer/animation tests cover direction, parent-resize
  cancellation, disposal and both reduced-motion preferences; these adapters do
  not substitute for the native room checks above. Ubuntu/WSL2, detached-pane
  combinations, live streaming and long-code sticky scrolling were not re-verified.
  No frame-rate measurement, global DSH edit, commit or release was performed.

## Previous 0.1.7-rc.2 audit and verification (historical)

The following findings describe the published plugin `3.1.0` and its former DSH
baseline. Its Windows/Ubuntu evidence does not carry over to `0.2.0-rc.2`.

### Interface audit (2026-09-27)

Primary evidence: `dsh --version` and
`C:/Users/25861/AppData/Roaming/npm/node_modules/@deepseek-ai/dsh/package.json`
both report `0.1.7-rc.2`. Its `node_modules/@deepseek-ai/` packages supply the
actual JS, declarations, manifests and client graph used for this audit.
Installed Cordis is `4.0.4`; Schemastery is `3.18.4`. No globally installed
package was modified. Development dependencies match these versions.

Official cross-check: [dsh-v0.1.7-rc.2](https://github.com/deepseek-ai/deepseek-harness/tree/dsh-v0.1.7-rc.2),
especially [Web seeds](https://github.com/deepseek-ai/deepseek-harness/blob/dsh-v0.1.7-rc.2/packages/client/web/src/seed.ts)
and [ConfigForms](https://github.com/deepseek-ai/deepseek-harness/blob/dsh-v0.1.7-rc.2/packages/client/ui-settings/src/client/config-form.ts).

| Area | Actual contract and adaptation |
| --- | --- |
| Host settings | `dsh-settings/lib/types/index.d.ts` exports `SettingsForms`, not `SettingsProvider`; `register` and `get` are removed. Forms derive from a Loader entry's volatile `Config`. The plugin exports its existing schema as `Config = AsukaThemeSettingsSchema.volatile()` and owns `settings.configure({ auto: false })` through an effect. The custom Theme-Asuka page remains. |
| Persistence/migration | `dsh-settings/lib/index.js` imports legacy `settings.yaml` into profile entry configs after Loader settlement, renaming it to `.imported` first. The Bundle entry ID stays `asuka-school-theme`, identical to the previous namespace. Fields and defaults are unchanged; no plugin-written migration or arbitrary profile editing is introduced. A rejected section is retained in DSH's migration record and logged by DSH. |
| Client settings | `dsh-client-ui-settings/client` replaces `SettingsScope` / `settingsScope.bind` with `ConfigForm` / `configForms.get(entryId)`. Snapshots, subscribe, set and unset remain; `mutate` provides atomic operations and returns `boolean` (transport failure rejects). The controller submits a scene's three fields and reset's seven clears atomically, and recovers a refused scene without allowing an older refusal to override a newer selection. |
| Inject graph | Host still requires `settings` and `webServer`. Client now requires `slots`, `locale`, `sessions`, `configForms`; the settings provider owns remote/connection dependencies. Package-level renderer/session-controller/session/conversation/settings/general/theme/locale edges remain valid in the installed manifests. Store/slots are platform seeds, not plugin graph entries. |
| Slots/renderer | Renderer still provides `ctx.slots`; `settings.general.item` and `settings.section` are root-scoped list slots, and `conversation.session.header.actions` is a session-scoped list. `slots.inject/register`, `BoundActions`, store/runtime/locale props and session-ID injection retain their public contracts. Settings row type ownership is now ui-settings. |
| Store/loader | Published `dsh-client-store` retains `defineStore`. Web seeds include React, JSX runtime, Cordis and store/slots. Built `window.__ModuleLoader__.load({ id, factory })` materializes using the real seed exports; React and DSH remain external. No Host-only module is imported into Client JS. |
| Locale/theme | `locale.register` / `bind` and `ThemeDefinition` (`id`, `colorScheme`, string tokens) remain valid. Dictionaries, palettes, baseline restoration and reduced motion are unchanged. The plugin never calls the official theme-preference write API. |
| Session/conversation | `ISessions.binding(id)?.session.rename(title)` still returns `RemoteResult` with `ok` / `error.message`; `SessionId`, `useSessions` and session scoped props remain. Native renderer/conversation components are neither replaced nor modified. Existing title-editor behavior is preserved. |
| Assets/WebServer | Exact `webServer.register({ kind, path, handler })` and its disposer remain. The three GET/HEAD routes, fixed paths, MIME, immutable cache and `nosniff` are unchanged. |
| Dependency boundary | Cordis peers now use `~4.0.4`; DSH peers/dev packages pin `0.1.7-rc.2`; Schemastery runtime dependency pins `3.18.4`. See [STORE-REVIEW.md](../STORE-REVIEW.md) for the resolved graph and independent review boundary. |

### Settings shell lifecycle

The installed ui-settings-general Client now uses a shared launcher store
rather than the old private React `open` state. `SettingsPanel` delegates modal
handling to `useModalLayer(panel, true, onClose)`; the mask, close button and
section callback still invoke the shell's close action. `open && SettingsPanel`
still unmounts immediately, with no additive exit/Presence lifecycle. Existing
entrance animation and both reduced-motion guards remain; no DOM cloning,
event interception, delayed native closure or focus override was added.

### Verification boundaries

- This adaptation changes APIs, dependency metadata and settings persistence;
  it does not edit UI components, styles, palettes or wallpaper behavior.
- Automated tests cover the actual Cordis volatile schema, SettingsForms API
  shape, real WebServer routes and disposal, built Client factory imports,
  manifest identity/dependencies, atomic scene writes/refusal/reset, and existing
  scene/wallpaper, ranges, styles and title-editor behavior. The page-policy
  sink in the route test is isolated; it does not prove Host persistence.
- The full command set is `pnpm build`, `pnpm test`, `pnpm check`,
  `pnpm pack:check`, `git diff --check`; all passed, with 56 automated tests.
- Isolated installed Host API smoke passed using DSH's actual `boot`, Loader,
  SettingsForms, ConfigEditor and WebServer with a fresh temporary home/profile.
  It verified legacy migration to `.imported`, persisted atomic live updates
  without remount, invalid/conflicting write refusal, readback after reboot,
  all three GET/HEAD responses, 405 for POST, and 404 for unknown/traversal paths.
  The context/server was disposed afterwards. This was a minimal Host API
  composition, not a CLI package-install or full Web/browser smoke.
- One Store-recommended `build-dsh-plugin` marketplace preflight at commit
  `16393774a52bf93c02ebd461d1fee426a3b3ac83` returned `direct` /
  `READY_FOR_CATALOG_ENTRY`, with no local structural errors/blockers/warnings.
  It found the canonical repository, MIT license, unique Bundle entry and no
  install lifecycle scripts. No catalog entry/registry was supplied: fixed-source
  verification, permission scanning, supply-chain review and Registry CI are
  not proven by this result. Its live release window was `0.1.7-alpha.2`,
  `0.1.7-rc.1`, `0.1.7-rc.2`; this project declares only the audited rc.2.
- A separate full CLI install and real Web/browser verification completed on
  Windows on 2026-09-27, using the locally packed checkout at commit
  `35baf45b60d32745d1a4e62c3d90e91a2ad34771`, Node.js `24.19.0` and the
  Codex in-app browser. The temporary home was
  `%TEMP%/asuka-017-cli-web-20260927`; `dsh plugin --profile web add <local.tgz>`
  installed the plugin and its three transitive/runtime packages, and
  `dsh web --host 127.0.0.1 --port 0 --no-open` started the full Web profile.
  Telemetry was disabled with `DSH_TELEMETRY_DISABLED=1`; no model credentials
  were supplied and no model request was sent.
  - Verified all three scene presets, the General quick row, rapid preset
    changes ending on the selected scene, opacity/blur keyboard controls,
    wallpaper-period selection, reset to the seven defaults, and restoration
    of the original System appearance when switched off.
  - Restarted the CLI server and reloaded the browser: Night, 30% opacity,
    1px blur and reduced motion were restored from the profile. Reduced motion
    produced `0s` wallpaper transitions. Auto selected the actual current Noon
    wallpaper; a real clock-boundary transition was not waited for.
  - Loaded a locally generated, validated seven-event Session log containing
    fixed user/assistant text and 40 JavaScript lines. This was fixture content
    rendered by the real DSH UI, not a live model response. Chinese title save,
    Escape cancellation, disabled blank-title confirmation, code-copy completeness,
    wrap toggle, horizontal scroll, sticky language/copy header, rounded clipping,
    vertical conversation scrolling and the bottom composer were checked.
  - Inspected the normal 807px viewport and a 600px narrow viewport, including
    Settings and sidebar. Document width matched viewport width at 600px; the
    settings cards wrapped and the pane remained scrollable. No browser console
    errors were captured. Screenshots were saved outside the repository.
  - Visual finding: current Shiki spans use
    `color: var(--shiki-token-string-expression)`, while the plugin projects
    `--shiki-token-string`. In the Noon scene, the old token was `#B9D8A7`,
    but the rendered string color was `rgb(43, 138, 62)` against the dark
    `rgba(22, 32, 43, 0.86)` code surface. Strings appeared too dark; their
    estimated contrast over the scene surface was about 2.6:1 (an estimate,
    not a screenshot pixel measurement). This compatibility issue is recorded
    but not fixed by this verification-only change; visual compatibility is
    therefore not a clean pass.
- Previous Ubuntu/WSL2 evidence belongs to v3.0.1's old baseline. The new
  baseline has not been re-verified on Ubuntu/WSL2 or standalone Chrome.
  IME composition, injected rename/asset failures, OS-level reduced-motion
  preference, clock-boundary timing and third-party plugin combinations remain
  outside this browser run. Automated/component tests remain separate evidence.
- No real user profile, global DSH installation, Store catalog or issue was
  modified during verification. The Store's fixed-Commit automatic recheck
  remains external and unverified; publishing v3.1.0 does not imply Store approval.
