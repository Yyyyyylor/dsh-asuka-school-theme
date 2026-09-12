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
