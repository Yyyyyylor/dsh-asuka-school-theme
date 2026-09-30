# Compatibility

Current release baseline: plugin `3.2.1`, DSH
`0.2.0-rc.2`, Cordis `4.0.4`, Schemastery `3.18.4`, Node.js `>=20` and
pnpm `11.19.0`. Exact DSH peers and `dsh.compatibility.dshReleases` declare
only the audited `0.2.0-rc.2`. This interface-compatibility declaration is not
evidence of complete Web UI behavior, an Ubuntu/WSL run, or DSH Store approval.

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
