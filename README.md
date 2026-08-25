# Asuka School // 02

[简体中文](README.zh-CN.md)

An unofficial fan-made Light/Dark appearance plugin for the DeepSeek Harness
Web UI. It pairs restrained school blue, ribbon red, warm paper, and quiet
Tokyo-3 night tones with three right-composed wallpapers that follow the local
time of day.

> Not affiliated with DeepSeek, khara, Evangelion, or any original rights
> holder.

## Compatibility

- DSH: `0.1.1-rc.2`
- Cordis: `4.0.1`
- Target: Ubuntu / WSL2 Ubuntu with DSH Web and Linux Chrome

## Install

### From GitHub Release (recommended)

```bash
dsh plugin --profile web add https://github.com/Yyyyyylor/dsh-asuka-school-theme/releases/download/v0.2.1/dsh-asuka-school-theme-0.2.1.tgz
```

This project is not published to npm. The GitHub Release asset is a prebuilt,
versioned package and is the preferred installation source.

### From GitHub source

```bash
dsh plugin --profile web add github:Yyyyyylor/dsh-asuka-school-theme#v0.2.1
```

This requires Git to be available on the host. Pin the tag instead of using
`main` so updates remain predictable.

### From a local checkout

```bash
pnpm install
pnpm build
npm pack
dsh plugin --profile web add ./dsh-asuka-school-theme-0.2.1.tgz
```

Restart the DSH Web profile after installing, updating, or removing the
plugin. The final filename should match the `.tgz` emitted by `npm pack`.

## Use

- Open **Settings → General → Asuka School** for the quick Off / After Class /
  Tokyo-3 Night switch.
- Open **Settings → Asuka School** for wallpaper period, opacity, blur,
  decorative details, reduced motion, and reset. In the default automatic
  setting, Early is 06:00–11:00, Noon is 11:00–17:00, and Night is 17:00–06:00;
  the wallpaper crossfades at each boundary.

The default mode is **Off**. Choosing the official Light, Dark, or System
appearance later turns this plugin off, so the built-in appearance choice
always takes priority.

## Privacy and assets

No credentials, telemetry, image upload, or browser `localStorage` preference
store is used. Scalar preferences are stored in DSH's plugin-owned Host
settings namespace. The three bundled WebPs are generated project assets; see
[assets/LICENSE.md](assets/LICENSE.md) and [docs/ASSETS.md](docs/ASSETS.md).

Do not package private artwork from `assets/private/`.

## Development

```bash
pnpm build
pnpm test
pnpm check
npm pack --dry-run
```

The package publishes prebuilt `lib/index.js` and `lib/client.js`; end users do
not need a postinstall build. See [docs/RESEARCH.md](docs/RESEARCH.md) for the
current DSH runtime-audit limitation and [docs/COMPATIBILITY.md](docs/COMPATIBILITY.md)
for remaining live integration checks.
