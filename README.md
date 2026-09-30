# Theme Asuka // 02

[简体中文](README-zh-CN.md)

An unofficial fan-made Light/Dark appearance plugin for the DeepSeek Harness
Web UI. It pairs restrained school blue, ribbon red, warm paper, and quiet
Tokyo-3 night tones with three right-composed wallpapers that follow the local
time of day.

> Not affiliated with DeepSeek, khara, Evangelion, or any original rights
> holder.

## Preview

![Theme-Asuka running in DeepSeek Harness](docs/images/theme-asuka-preview.png)

## Compatibility

- DSH: `0.2.0-rc.2`
- Cordis: `4.0.4`
- Node.js: `>=20`
- Target: Ubuntu / WSL2 Ubuntu with DSH Web and Linux Chrome

Version `3.2.1` targets DSH `0.2.0-rc.2`. Its glass surfaces and high-opacity
wallpaper behavior were checked in an isolated Windows DSH Web profile using
the Codex in-app browser. Ubuntu/WSL2 and live model streaming have not been
re-verified for this baseline. See
[COMPATIBILITY.md](docs/COMPATIBILITY.md) for the current checks and limits.

## Install

### GitHub Release (recommended)

```bash
dsh plugin --profile web add https://github.com/Yyyyyylor/dsh-asuka-school-theme/releases/download/v3.2.1/dsh-asuka-school-theme-3.2.1.tgz
```

This project is not published to npm. The Release asset contains the prebuilt
Host/Client code and all three public wallpapers. Restart the DSH Web profile
after installing, updating or removing the plugin.

### From a local checkout

In the repository root, run:

```bash
pnpm install
pnpm build
npm pack
dsh plugin --profile web add ./dsh-asuka-school-theme-3.2.1.tgz
```

The package filename should match the `.tgz` emitted by `npm pack`.

### GitHub source tag

```bash
dsh plugin --profile web add github:Yyyyyylor/dsh-asuka-school-theme#v3.2.1
```

This requires Git to be available on the host. Pin the tag instead of using
`main` so updates remain predictable.

## Use

- Open **Settings → General → Theme-Asuka** for the quick Off / On the Way to
  School / Noon Classroom / Tokyo-3 Night scene switch.
- Open **Settings → Theme-Asuka** for wallpaper period, opacity, blur,
  decorative details, reduced motion, and reset. In the default automatic
  setting, Early is 06:00–11:00, Noon is 11:00–17:00, and Night is 17:00–06:00;
  the wallpaper crossfades at each boundary.
- New-session and active-conversation composer cards share the same lighter,
  scene-aware liquid-glass surface, keeping more of the wallpaper visible.
- Assistant replies, reasoning, tool calls/output and errors share the message
  glass material and remain readable above 100% wallpaper opacity.
- The left sidebar, conversation header and docked right panes float above the
  wallpaper with matching rounded glass surfaces and visible gaps. The icon rail,
  pane resizing and narrow-window fullscreen behavior remain native; title-edit
  actions wrap when the center column runs out of room.
- Use the edit action beside a conversation title to rename the current
  session without leaving the conversation view.

The default mode is **Off**. This plugin leaves the official Light, Dark, and
System appearance unchanged; it only adds the selected wallpaper scene.

Wallpaper images are decoded before the existing crossfade starts, and likely
next scenes are preloaded while the browser is idle. Range-control previews are
frame-coalesced, so opacity and blur adjustments remain responsive without
reapplying unrelated theme tokens.

## Privacy and assets

No credentials, telemetry, image upload, or browser `localStorage` preference
store is used. Scalar preferences are stored in DSH's plugin-owned Host
entry's live Config form (`asuka-school-theme`). DSH migrates the old settings
document into the profile; the entry ID and preference fields are unchanged.
The three bundled WebPs are generated project assets; see
[assets/LICENSE.md](assets/LICENSE.md) and [docs/ASSETS.md](docs/ASSETS.md).

Do not package private artwork from `assets/private/`.

The Host reads only the three package-owned images and serves fixed GET/HEAD
routes on the existing DSH Web server. The browser uses same-origin DSH
transport for images, settings and explicit session-title edits. No third-party
service, data upload, telemetry, credentials or subprocess is used. The runtime
dependency is pinned Schemastery `3.18.4`; DSH/Cordis are host-provided optional
peers, not additional runtime installations. There are no installation lifecycle
scripts. See [Store review](STORE-REVIEW.md) for dependency, permission and
failure boundaries. Independent supply-chain review and Store automatic
rechecking remain pending; declarations do not guarantee approval.

## Development

Maintainers should start with the [project index](docs/README.md) and the
[repository-specific agent guide](AGENTS.md).

```bash
pnpm build
pnpm test
pnpm check
npm pack --dry-run
```

The package publishes prebuilt `lib/index.js` and `lib/client.js`; end users do
not need a postinstall build. See [docs/RESEARCH.md](docs/RESEARCH.md) for the
historical implementation notes and [docs/COMPATIBILITY.md](docs/COMPATIBILITY.md)
for remaining live integration checks.
