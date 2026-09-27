# Compatibility

Current development baseline: plugin `3.0.1` (unreleased changes), DSH
`0.1.7-rc.2`, Cordis `4.0.4`, Schemastery `3.18.4`, Node.js `>=20` and pnpm
`11.19.0`. Published v3.0.1 artifacts target DSH `0.1.5-rc.2`; these changes
have not been released. Exact DSH peers deliberately reject older interfaces;
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
- Previous v3.0.1 Windows and Ubuntu/WSL2 browser evidence belongs to the old
  baseline. Real DSH 0.1.7-rc.2 Web UI rendering, keyboard/IME/focus, hover/copy,
  sticky code banners, animations and third-party plugin combinations have not
  been re-verified. Automated/component tests do not replace browser evidence.
- No real user profile, global DSH installation, Store catalog or issue was
  modified. The Store's fixed-Commit automatic recheck remains external and
  unverified; no push, release or Store approval is implied.
