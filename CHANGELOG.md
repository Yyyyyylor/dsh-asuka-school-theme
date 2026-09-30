# Changelog

All notable changes to this project are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [3.2.1] - 2026-09-30

### Changed

- Unified the left sidebar, conversation header and docked right panes as floating rounded glass panels with wallpaper-visible outer insets and gaps. The header shares the sidebar's restrained shadow. Retained native grid tracks, resize handles, dock/fullscreen behavior and popup positioning by filtering only background pseudo-elements.
- Allowed header utilities to wrap during title editing in narrow center columns, keeping confirmation and cancellation reachable. The plugin's reduced-motion preference now also stops native frame, sidebar and right-dock transitions.

### Fixed

- Softened the left sidebar's shadow in the wallpaper gap and removed overlapping rounded highlights inside the header's split open-in-app button, retaining hover, menu-open and keyboard-focus feedback.
- Kept Settings controls readable when the native appearance changes independently of the scene; raised sidebar tooltips above conversation cards and matched both right-side guide entries to the floating sidebar radius.

## [3.2.0] - 2026-09-30

### Changed

- Updated exact DSH peer/development versions, compatibility metadata and the lockfile for DSH `0.2.0-rc.2` / Cordis `4.0.4`.
- Rechecked the installed Host/Client contracts for volatile Config, ConfigForms, slots, asset routes, session rename and the lazy-CJS loader; their used interfaces remain compatible.

### Fixed

- Kept assistant replies, reasoning, tool calls/results, process summaries and error information above high-opacity wallpaper; unified their glass tint, frosted backdrop, highlights and borders with user messages and the composer. Reply/tool/error backdrop filters stay on background pseudo-elements, without filtering or clipping the transcript scrollport or sticky code ancestors.
- Unified the workspace and Agent preset selectors above the composer. Softened sidebar controls with transparent navigation/icon actions, subtle hover feedback, and restrained glass emphasis for the new-session action and selected session; retained the composer add button's glass material and removed the opaque scroll fade strip above sidebar Settings.
- Kept the DSH 0.2 sidebar above the wallpaper at 100% opacity by styling its actual sidebar slot, including its glass surface.
- Removed full-screen filter and scale interpolation from wallpaper crossfades and backdrop-filter interpolation from Settings, while retaining opacity fades and reduced-motion behavior.
- Restored readable selected and unselected scene buttons in General Settings when the theme is off, in both DSH light and dark appearance.

## [3.1.0] - 2026-09-27

### Changed

- Adapted to DSH 0.1.7-rc.2 / Cordis 4.0.4: exposed the existing settings schema as volatile Config and switched to the shared ConfigForms service, retaining the persisted entry ID for DSH's legacy migration.
- Submitted scene selection and reset as atomic mutations, restoring accepted settings when the Host refuses a scene without letting stale refusals override newer selections.
- Pinned Schemastery to 3.18.4 and aligned DSH peers/development packages and the lockfile with the audited runtime; visual design and existing interactions are retained.

### Fixed

- Kept the latest optimistic scene selected while rapid A/B/A Host acknowledgements settle, then resumed normal Host updates after the exact request completed.
- Excluded fixed-position tooltips from message-bubble glass selectors and transitioned Settings glass colors locally, preserving reduced-motion behavior without invalidating the full UI tree.

### Documentation and tests

- Added canonical repository/homepage/bugs metadata, exact DSH release compatibility and a packaged bilingual dependency/permission/failure disclosure for DSH Store #1195. Independent supply-chain and Store fixed-Commit review remain pending.
- Added volatile Config, manifest, atomic settings and transition regression coverage and updated compatibility, architecture and maintenance documentation.

## [3.0.1] - 2026-09-20

### Fixed

- Kept native DSH composer and message-action buttons stationary on hover so the send/model controls no longer jitter and message copy remains clickable without duplicate-looking hover feedback.
- Anchored code-banner copy sizing to DSH's `data-code-block-banner` contract instead of a positional child chain.

### Documentation

- Renamed the user-facing project title to `Theme Asuka` / `主题-明日香` and recorded the completed Ubuntu/WSL2 DSH Web validation.

## [3.0.0] - 2026-09-12

### Fixed

- Replaced per-frame inherited palette interpolation with surface color transitions, retaining wallpaper crossfade/zoom and settings entrance motion while reducing scene-switch style invalidation.
- Gave morning/noon settings local high-contrast labels and explicit native select/option foregrounds and backgrounds for both light and dark scenes.

### Changed

- Adapted to DSH 0.1.5-rc.2 / Cordis 4.0.2: replaced the retired client-runtime barrel with the owning store, settings, renderer, and session APIs, and registered the Host namespace directly.
- Updated dependency pins and client graph edges while retaining all existing scene, wallpaper, glass, settings, and title-editing behavior.

### Tests and documentation

- Added real Cordis/DSH settings and route lifecycle tests, published store-engine coverage, and a built client factory import check.
- Recorded the settings shell’s immediate unmount and focus-restoration paths; entrance animation remains, with no unsupported exit animation.
- Verified an isolated Windows DSH Web Host and all three asset responses; the project baseline is also verified in a real Ubuntu/WSL2 DSH Web environment.

## [2.2.1] - 2026-09-01

### Changed

- Renamed the General Settings quick row to `Theme-Asuka` in both Chinese and English.
- Bumped the wallpaper asset revision so installed clients refresh the release assets.

### Documentation

- Replaced the README preview with the current midnight Theme-Asuka interface.
- Updated English and Chinese installation commands for v2.2.1.

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

[Unreleased]: https://github.com/Yyyyyylor/dsh-asuka-school-theme/compare/v3.2.1...HEAD
[3.2.1]: https://github.com/Yyyyyylor/dsh-asuka-school-theme/compare/v3.2.0...v3.2.1
[3.2.0]: https://github.com/Yyyyyylor/dsh-asuka-school-theme/compare/v3.1.0...v3.2.0
[3.1.0]: https://github.com/Yyyyyylor/dsh-asuka-school-theme/compare/v3.0.1...v3.1.0
[3.0.1]: https://github.com/Yyyyyylor/dsh-asuka-school-theme/compare/v3.0.0...v3.0.1
[3.0.0]: https://github.com/Yyyyyylor/dsh-asuka-school-theme/compare/v2.2.1...v3.0.0
[2.2.1]: https://github.com/Yyyyyylor/dsh-asuka-school-theme/compare/v2.2.0...v2.2.1
[2.2.0]: https://github.com/Yyyyyylor/dsh-asuka-school-theme/compare/v2.1.0...v2.2.0
[2.1.0]: https://github.com/Yyyyyylor/dsh-asuka-school-theme/compare/v2.0.1...v2.1.0
[2.0.1]: https://github.com/Yyyyyylor/dsh-asuka-school-theme/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/Yyyyyylor/dsh-asuka-school-theme/compare/v1.0.1...v2.0.0
[1.0.1]: https://github.com/Yyyyyylor/dsh-asuka-school-theme/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/Yyyyyylor/dsh-asuka-school-theme/releases/tag/v1.0.0
