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
padding. It does not change frame padding, tracks, handles, dock transforms or
overflow. The host's dock panes retain their own rounded overflow clipping;
non-interactive background pseudo-elements supply blur without filtering their
content ancestors. Fixed popups, floating panes, Settings and sticky code keep
their existing positioning. The header's title-edit cluster can wrap utilities
when the center becomes too narrow; no action is removed. Unsupported backdrop
filter falls back to the existing scene-aware opaque Settings glass token.

The workspace and Agent preset triggers above the composer share the medium
glass surface, soft edge, height, and padding. The native workspace trigger is
scoped to the hero row; the Agent trigger is scoped to its additive slot. Menus
keep their existing behavior. These host adaptations disappear when the theme
is off.

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
