# Changelog

All notable changes to this project are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.0] - 2026-08-27

### Changed

- Applied theme tokens only when theme-affecting settings change, while wallpaper opacity and blur now update independently.
- Coalesced range-control previews into animation frames and debounced persisted writes without changing the existing visual transitions.
- Decoded wallpapers before crossfading, preloaded likely next scenes during idle time, and added stale-request cancellation plus safe fallback behavior for failed image loads.

### Tests

- Added regression coverage for differential controller updates, range-control scheduling, wallpaper decoding, preloading, race handling, and fallback behavior.

## [1.0.1] - 2026-08-27

### Fixed

- Made the four quick scene controls independent buttons instead of one enclosed segmented control.
- Made the public wallpaper-route test independent of Fetch's forbidden-port list.

### Documentation

- Added a Theme-Asuka runtime preview to both English and Chinese READMEs.
- Updated installation and settings navigation references for v1.0.1 and `Theme-Asuka`.

## [1.0.0] - 2026-08-27

### Added

- Established the first stable release with three time-of-day scenes: morning commute, noon classroom, and Tokyo-3 night.

### Changed

- Renamed the settings entry to `Theme-Asuka`.
- Reworked scene changes to interpolate theme tokens at the document root for smoother, lower-overhead transitions.
- Standardized primary information and business accents on Asuka hair-orange tones while preserving semantic success colors.

### Fixed

- Kept the color preset synchronized with automatic wallpaper timing after restarting DSH.
- Improved daytime code-block title readability and preserved sidebar visibility at full wallpaper opacity.

[Unreleased]: https://github.com/Yyyyyylor/dsh-asuka-school-theme/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/Yyyyyylor/dsh-asuka-school-theme/compare/v1.0.1...v2.0.0
[1.0.1]: https://github.com/Yyyyyylor/dsh-asuka-school-theme/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/Yyyyyylor/dsh-asuka-school-theme/releases/tag/v1.0.0
