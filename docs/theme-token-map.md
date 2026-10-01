# Theme token map

The inventory was rechecked against the locally installed DSH `0.1.5-rc.2`
client artifacts. All 74 DSH/Shiki token names used by the existing palettes
occur in those artifacts; palette values remain unchanged. This confirms name
availability, not visual equivalence. The separate glass stylesheet also uses
host attributes and code-block structure, so browser regression remains required.

| Area | Tokens overridden |
| --- | --- |
| Application and surfaces | `--dsw-alias-bg-base`, `bg-layer-1/2/3`, `bg-overlay`, `bg-mask-1/2/3` |
| Text and borders | `--dsw-alias-label-*`, `--dsw-alias-border-l1/2/3/4` |
| Brand and buttons | `--dsw-alias-brand-*`, `--dsw-alias-button-primary-*`, elevated/floating/ghost aliases |
| Static brand palette | `--dsw-static-deepseek-400/450/500/600` |
| Interaction | `--dsw-alias-interactive-bg-hover`, `active`, `hover-accent` |
| Status | `--dsw-alias-state-error-*`, `success-*`, `warn-*` |
| Markdown and code | `--dsw-alias-markdown-code-block`, banner, inline code; `--shiki-*` and `--shiki-token-*` |
| Sidebar | `--dsw-specific-sidebar-fill`, nav active, nav active accent, nav hover |
| Composer and bubbles | `--dsw-specific-input-major`, `bubble`, `bubble-highlight` |
| Scrollbar | `--dsw-alias-scrollbar-bg-l1/l2`, `scrollbar-hover-l1/l2` |

The token values live in `src/client/themes/light.ts` and
`src/client/themes/dark.ts`; no settings component contains hard-coded theme
colors.

In DSH `0.2.0-rc.2`, sidebar controls use the scene glass tokens with restrained
emphasis: the new-session action and selected session use the medium surface;
other rows and icon actions are transparent until hovered. They reuse the sidebar
backdrop rather than adding blur and bright borders to every row. The brand mark
is excluded via `sidebar.brand.mark`; selected sessions retain the scene accent
when decorative details are enabled.

The Settings dialog locally pairs `--dsw-alias-bg-module-platform` with its glass
layer 3 so native Light/Dark/System switching cannot introduce a dark control
behind light-scene labels. Sidebar tooltip presence raises only the sidebar's
stacking context above conversation cards, below resize handles and native
overlays. Both files and terminal guide cards use `--asuka-floating-radius`,
including the terminal's absolute main-button hit target.

The native `data-sidebar-right-guide` is an inline-size query container, with
responsive inline padding. At an available content width of 320px or less,
guide entries use smaller padding/gaps and hide their visual shortcut hints;
their native buttons, shell menu and `aria-keyshortcuts` remain intact. Widening
the guide restores hints. Docked selected tabs use the medium scene glass and
scene primary label instead of the native `markdown-tag` fill, which follows
official Light/Dark independently. Hover uses the strong scene surface.

The expanded sidebar wordmark has 6px of internal padding, with its logo row
borrowing the same amount from the sidebar inset to preserve the SVG and collapse
action. Chat/Trajectory tabs use 6px top and 12px inline padding; their native
active underline remains aligned with the text, and the tab gap absorbs the
added padding. These adaptations do not affect collapsed navigation.

Code banners use muted scene colors (`#C4AA91` warm sand in the morning,
`#AABCC6` mist blue-gray at noon, `#293846` deep blue-gray at night) plus an
inset bottom divider. Language/actions use dark labels in daytime and light
labels at night, including with decorative details off. This separates the banner from the
dark code body and the transcript, while retaining the existing sticky mask,
rounded clipping, copy and wrap controls. `check-contrast.mjs` reads these
actual stylesheet colors and checks the dimmest banner label against them.

The floating layout reuses the same glass tint, sheen, edge, highlight and shadow
tokens for the left sidebar, conversation header and docked right panes. The
header and left sidebar also share the same restrained outer shadow. Its
`--asuka-floating-surface` blends the sidebar tint with the scene's base color
for a more readable navigation surface at high wallpaper opacity. The default
outer inset is 10px with a 16px radius; below 640px it is 6px / 12px. The native
56px collapsed rail uses a 4px inline inset and preserves 36px icon targets.

DSH 0.2 computes grid tracks and resize-handle positions from the full frame
width. The stylesheet therefore insets only occupants: the left root overrides
its inline width, the header uses margins, and the right panel uses border-box
padding. It does not change frame padding, frame tracks, handles, dock transforms or
overflow. The host's dock panes retain their own rounded overflow clipping;
non-interactive background pseudo-elements supply blur without filtering their
content ancestors. Fixed popups, floating panes, Settings and sticky code keep
their existing positioning. The header's title-edit cluster can wrap utilities
when the center becomes too narrow; no action is removed. Unsupported backdrop
filter falls back to the existing scene-aware opaque Settings glass token.

Split-divider `::before` and `::after` paint starts and ends one floating radius
inside the panel. The divider element remains full height, with its native 4px
horizontal hit slop; no pane or popup ancestor receives new overflow clipping.

The frame's native grid transition is armed before track changes rather than
waiting for its follow-up `data-animating` commit. Header resizing and the dock
slide use the same host timing; drag, fullscreen/instant presentation and reduced
motion still bypass the transition. Track sizes and dock transforms remain native.

The right panel's width transitions between the host's push width and fullscreen
width using its native 300ms timing. Below 768px, the host's automatic fullscreen
slide remains unchanged. DockLayout's single-pane grid is normalized to its split
grid's three tracks, with an unoccupied zero-fraction second pane; this allows the
host's inline split fractions to interpolate when splitting. No split ratio is
overridden. Closing a split uses an owned Web Animation of the outer dock surface's
width and horizontal offset, starting at the surviving pane's previous bounds.
Its temporary zero flex growth/shrink permits the width to interpolate in either
direction. DockKit observes that surface and therefore remeasures room through the
final width; native tab removal and focus are not delayed. Native captured-pointer
attributes disable grid motion during divider/tab dragging; outer frame dragging
also disables panel width motion. Both reduced-motion preferences stop the added
transitions. The close-motion observers and their cancellation/cleanup are described
in ARCHITECTURE-AUDIT.md. No content transforms, clones or event interception are used.

Presented file cards use the medium glass tint and a non-interactive background
pseudo-element for blur. Their preview hit target inherits the card radius;
compact file actions reuse the header split action's single frame and focus ring.
Menu glass targets `data-menu-material='translucent'`, including ModelSelect's
`role='group'` model pane and the composer's add menu. Blur and tint stay on its
native material child; inner scrolling menus and listboxes are excluded from
generic glass styles. No overflow or filter is
added to menu shells, so nested fixed menus retain their containing block.
The composer's blur also lives on its non-interactive background pseudo-element.
Keeping the card free of a backdrop filter prevents it from becoming a backdrop
root that excludes welcome text outside the card; the add menu can now blur the
actual page behind it while preserving its native scrolling list and rounded material.

The workspace and Agent preset triggers above the composer share the medium
glass surface, soft edge, height, and padding. The native workspace trigger is
scoped to the hero row; the Agent trigger is scoped to its additive slot. These
visual adaptations disappear when the theme is off. The separate workspace
compatibility guard preserves click-open-click-close for DSH's external anchor;
its lifecycle and exact event scope are documented in ARCHITECTURE-AUDIT.md.

Chat flow items and process groups are raised above the wallpaper through
`data-chat-flow`, while the full-width scrollport and gutter resize controls
remain unchanged. Assistant, tool and error surfaces reuse user bubbles' medium
glass tint, sheen, bright edge, inset highlight and shadow. Reasoning and process
summaries use the soft tint. A non-interactive `::before` layer provides the same
20px backdrop blur, saturation and brightness as user messages; the content
ancestor itself has no filter, transform or overflow clipping around sticky code
banners. Secondary information keeps the theme's secondary text
color; error and success colors retain their semantic roles.
Generic tool I/O cards also use the reading surface instead of a code background
paired with ordinary light-theme labels.
