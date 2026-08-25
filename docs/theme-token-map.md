# Theme token map

The P0 inventory was extracted from the published `dsh-client-ui-theme`
client artifact. The plugin overrides semantic aliases only; it does not
target internal DOM class names.

| Area | Tokens overridden |
| --- | --- |
| Application and surfaces | `--dsw-alias-bg-base`, `bg-layer-1/2/3`, `bg-overlay`, `bg-mask-1/2/3` |
| Text and borders | `--dsw-alias-label-*`, `--dsw-alias-border-l1/2/3/4` |
| Brand and buttons | `--dsw-alias-brand-*`, `--dsw-alias-button-primary-*`, elevated/floating/ghost aliases |
| Interaction | `--dsw-alias-interactive-bg-hover`, `active`, `hover-accent` |
| Status | `--dsw-alias-state-error-*`, `success-*`, `warn-*` |
| Markdown and code | `--dsw-alias-markdown-code-block`, banner, inline code; `--shiki-*` and `--shiki-token-*` |
| Sidebar | `--dsw-specific-sidebar-fill`, nav active, nav active accent, nav hover |
| Composer and bubbles | `--dsw-specific-input-major`, `bubble`, `bubble-highlight` |
| Scrollbar | `--dsw-alias-scrollbar-bg-l1/l2`, `scrollbar-hover-l1/l2` |

The token values live in `src/client/themes/light.ts` and
`src/client/themes/dark.ts`; no settings component contains hard-coded theme
colors.
