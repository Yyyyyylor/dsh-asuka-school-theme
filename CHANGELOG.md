# Changelog

All notable changes to this project are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.2.0] - 2026-08-29

### Added

- Added a reduced-motion-aware entrance transition and a scene-tinted liquid-glass surface over a frosted wallpaper mask for the host settings dialog.
- Extended the same scene-aware glass material to the sidebar, composer, user bubbles, settings controls, menus, lightweight dialogs, and code blocks.
- Added an accessible inline session-title editor with localized save, cancel, loading, and error states.

### Fixed

- Removed the host's opaque active-composer fade that appeared as a white rectangle around the bottom input card.
- Improved code-title and control contrast across all three scene presets while retaining a translucent dark-glass code surface.
- Restored the page-background mask behind sticky code banners so their rounded top corners no longer expose the dark code surface.
- Reused the Phase-1 solid theme-base surface for the square sticky wrapper while keeping the painted banner's 10px top radii.
- Increased light-scene secondary, tertiary, caption, and dimmed text contrast across the sidebar and conversation view.

### Changed

- Increased settings-dialog transparency and brightened the sidebar glass without changing the remaining surface presets.
- Reduced the sidebar's milky overlay and rebalanced its blur toward stronger wallpaper color and neutral brightness.
- Reduced the shared composer surface opacity in both new-session and active-conversation views while preserving blur, borders, and text contrast.

### Documentation

- Updated the English and Chinese installation commands and feature summaries for v2.2.0.

## [2.1.0] - 2026-08-28

### Fixed

- Preserved the code-block title's sticky behavior at the viewport boundary while masking scrolling code behind its rounded top corners.
- Removed translucent square artifacts around the rounded title corners with scene-appropriate solid backing colors.

### Changed

- Slightly enlarged the code-block copy button for a more comfortable click target.

### Tests

- Added regression coverage for sticky-title masking, rounded title surfaces, copy-button sizing, and theme mask tokens.

## [2.0.1] - 2026-08-27

### Fixed

- Clipped layered code-block backgrounds at the outer wrapper, made the sticky banner backing opaque, and removed the inner surface's conflicting top corners without disabling sticky positioning or horizontal scrolling.

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

[Unreleased]: https://github.com/Yyyyyylor/dsh-asuka-school-theme/compare/v2.2.0...HEAD
[2.2.0]: https://github.com/Yyyyyylor/dsh-asuka-school-theme/compare/v2.1.0...v2.2.0
[2.1.0]: https://github.com/Yyyyyylor/dsh-asuka-school-theme/compare/v2.0.1...v2.1.0
[2.0.1]: https://github.com/Yyyyyylor/dsh-asuka-school-theme/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/Yyyyyylor/dsh-asuka-school-theme/compare/v1.0.1...v2.0.0
[1.0.1]: https://github.com/Yyyyyylor/dsh-asuka-school-theme/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/Yyyyyylor/dsh-asuka-school-theme/releases/tag/v1.0.0
