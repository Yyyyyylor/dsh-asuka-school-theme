# Compatibility

Current development baseline: plugin `3.0.0`, DSH `0.1.5-rc.2`, Cordis
`4.0.2`, and Schemastery `3.18.2`. Existing v2.2.1 release assets were built
for DSH `0.1.1-rc.2`; compatibility changes first shipped in v3.0.0.

## Interface audit

Primary evidence: the installed `dsh.cmd` resolves to
`C:/Users/25861/AppData/Roaming/npm/node_modules/@deepseek-ai/dsh/lib/bin.js`.
Both `dsh --version` and its package manifest report `0.1.5-rc.2`.
The DSH packages below were inspected under that package's
`node_modules/@deepseek-ai/`; Cordis reports `4.0.2`.
No globally installed files were modified.

Official source cross-check: [dsh-v0.1.5-rc.2](https://github.com/deepseek-ai/deepseek-harness/tree/dsh-v0.1.5-rc.2),
commit `fb2c4b9e698e30edb738bca4cf0618587db7d203`.

| Area | Verified contract and adaptation |
| --- | --- |
| Host settings | `dsh-settings/lib/types/index.d.ts`: `register(ns, schema, { applies: 'live' })` validates a namespace string and owns its registration on the caller's fiber. Removed `settingsNamespace()`; retained the exact stored namespace and schema. |
| Browser settings | `dsh-client-ui-settings/lib/types/client/settings-contract.d.ts` and `settings-scope.d.ts`: `bind<T>({ namespace })`, `getSnapshot`, `subscribe`, `set`, `unset` remain. Import moved from client-runtime to ui-settings; queued writes and controller behavior remain. |
| Store | `dsh-client-store` exports `defineStore`; its published engine is tested directly. Zustand and Immer are development dependencies for these tests, never bundled into the browser plugin. |
| Context/slots | Cordis exports `Context`; `dsh-client-ui-renderer/client` declares `ctx.slots`. `dsh-client-ui-slots` retains `BoundActions`, runtime/store/locale props, and list registration. Renderer, Session Controller, and Session UI are explicit client graph dependencies. |
| Settings slots | `settings.general.item` and `settings.section` remain root-scoped list slots. `ctx.slots.inject` waits for declarations. The same shared store and controller serve both entries. |
| Session title | `dsh-api-session-controller/client` owns `ISessions`; `dsh-session/types` owns `SessionId`; ui-session declares `useSessions` and session scope props. `binding(id)?.session.rename(title)` still returns `RemoteResult` with `ok`/`error.message`. Header actions still receive a session ID in their inject factory. Existing keyboard, focus, pending and error behavior is unchanged. |
| Locale | `dsh-client-locale/client`: namespace registration and `bind(namespace)` remain. Both Chinese and English dictionaries are retained. |
| Theme | `ThemeDefinition` retains `id`, `colorScheme`, and string-valued `tokens`. The existing inline presenter and palettes are unchanged. The host's separate `overrideTokens` API requires light/dark pairs, but this plugin does not call it. |
| Assets | `dsh-host-webserver/lib/types/index.d.ts`: exact `register({ kind, path, handler })` returns a disposer; handler owns the HTTP response. GET/HEAD, immutable caching and three fixed paths are unchanged. |
| Client artifact | Lazy CommonJS `window.__ModuleLoader__.load({ id, factory })` remains. [Platform seeds](https://github.com/deepseek-ai/deepseek-harness/blob/dsh-v0.1.5-rc.2/packages/client/web/src/seed.ts) include React and `dsh-client-store`; the removed client-runtime import/graph edge is gone. Seed-only store/slots packages are not plugin graph entries. |

## Settings close animation

The installed `dsh-client-ui-settings-general/lib/client.js` provides direct
evidence, matching [SettingsRoot.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/dsh-v0.1.5-rc.2/packages/client/ui-settings-general/src/client/SettingsRoot.tsx):

- Lines 99–110: `SettingsPanel` installs document-level Escape handling while mounted.
- Lines 121 and 159: the mask and close button call the same `onClose`.
- Line 167: the selected settings section receives `{ close: onClose }`.
- Lines 180 and 186–193: `open` is private React state; `close` sets it false
  immediately, clears the section, and an effect restores trigger focus.
- Lines 259–265: `open && <SettingsPanel ...>` directly removes the panel.

There is no exiting state, exposed controlled-open setter, Transition/Presence
boundary, awaited close callback, or additive lifecycle that can retain the
shell. `settings.close` contributes only close-label content, and the section's
`close` callback cannot govern Escape, mask or shell-button closure. Replacing
the occupied shell slot would exceed the theme's scope. Therefore only the
existing entrance animation remains, including both plugin `reduceMotion` and
`prefers-reduced-motion` guards. No cloned DOM, intercepted events, delayed
native closure, or modified focus restoration is introduced.

## Verification boundaries

- Windows/Node: `pnpm install`, `pnpm build`, `pnpm test`, `pnpm check`,
  `pnpm pack:check`, `git diff --check`.
- 49 automated tests include real Cordis/SettingsProvider/WebServer registration,
  settings validation/update, route removal on disposal, the published store
  engine and built lazy-CJS factory imports, plus existing scene/wallpaper,
  range-control, style and title-editor regression coverage.
- Isolated smoke: the installed CLI booted Web with a fresh temporary `DSH_HOME`,
  a patch loading this worktree's built Host entry and an OS-selected port.
  All three real wallpaper routes returned `200 image/webp`; the process was
  stopped afterwards. No existing profile was changed.
- The authenticated Web page, full browser plugin activation, real title rename,
  focus/keyboard behavior, animation rendering, code-banner sticky behavior,
  browser screenshots, Ubuntu/WSL2 and third-party plugin combinations were not
  verified. Automated/component tests do not replace those checks.
