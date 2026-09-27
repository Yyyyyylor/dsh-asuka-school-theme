# Compatibility

Current release baseline: plugin `3.1.0`, DSH `0.1.7-rc.2`, Cordis `4.0.4`,
Schemastery `3.18.4`, Node.js `>=20` and pnpm `11.19.0`. Exact DSH peers
deliberately reject older interfaces;
the manifest declares only `0.1.7-rc.2` in `dsh.compatibility.dshReleases`.
This is an author interface-compatibility declaration, not evidence for every
install/start/uninstall/rollback operation or DSH Store approval.

## Interface audit (2026-09-27)

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

## Settings shell lifecycle

The installed ui-settings-general Client now uses a shared launcher store
rather than the old private React `open` state. `SettingsPanel` delegates modal
handling to `useModalLayer(panel, true, onClose)`; the mask, close button and
section callback still invoke the shell's close action. `open && SettingsPanel`
still unmounts immediately, with no additive exit/Presence lifecycle. Existing
entrance animation and both reduced-motion guards remain; no DOM cloning,
event interception, delayed native closure or focus override was added.

## Verification boundaries

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
