# P0 research record

Date: 2026-08-25  
Compatibility baseline: `@deepseek-ai/dsh 0.1.1-rc.2`

## Evidence used

The local development machine did not have the `dsh` executable installed.
The audit therefore uses the published `0.1.1-rc.2` type packages and the
official source at the matching current version. The following facts were
verified against those packages:

- `@deepseek-ai/dsh` and the client packages publish `0.1.1-rc.2`.
- `@deepseek-ai/cordis` is `4.0.1` (not `0.1.1-rc.2`).
- Host settings use `ctx.settings.register(settingsNamespace(...), schema, { applies: 'live' })`.
- Browser settings use `ctx.settingsScope.bind({ namespace })`.
- `settings.general.item` and `settings.section` are additive list slots and must be registered through `ctx.slots.inject(...)`.
- `ctx.webServer.register({ kind: 'exact', path, handler })` supplies a lifecycle-owned static asset route.
- Third-party client artifacts must register a lazy CommonJS factory through `window.__ModuleLoader__.load(...)`.

## Resolved implementation choices

- Scalar preferences live solely in the Host `asuka-school-theme` namespace.
- The browser bundle imports only React's runtime and DSH's seeded client runtime; it does not bundle React or pull the Host settings packages into the browser.
- Wallpaper routes are three exact allowlist entries. No requested URL is used in a filesystem path.
- The package starts in `mode: off`, so installation does not alter the user's active appearance.

## Remaining live validation

This workspace cannot start a DSH Web profile. Before release, install the
packed tarball into DSH 0.1.1-rc.2 and verify the Settings surfaces,
persistence, `theme/change` hand-off, route serving, and browser screenshots
on the target Ubuntu/WSL2 profile.
