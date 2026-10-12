/** These rules apply only after a real-sized lens map is ready. The original
 * stylesheet remains the fallback while resizing and on unsupported engines. */
export const ASUKA_LIQUID_STYLES = String.raw`
body[data-asuka-school-theme] [data-asuka-liquid-glass='true'] {
  --asuka-liquid-blur: 5px;
  --asuka-liquid-light-x: 24%;
  --asuka-liquid-light-y: 0%;
  --asuka-liquid-rim: linear-gradient(135deg,
    var(--asuka-glass-highlight), var(--asuka-glass-edge-soft) 28%,
    transparent 46%, var(--asuka-glass-edge-soft) 70%, var(--asuka-glass-highlight));
}
body[data-asuka-school-theme] [data-composer-card][data-asuka-liquid-glass='true'] {
  --asuka-liquid-blur: 3px;
  background-color: color-mix(in srgb, var(--asuka-composer-glass-surface) 80%, transparent);
}
body[data-asuka-school-theme] :is(
  [data-slot='sidebar'] > *,
  header:has(> [data-conversation-header-leading]),
  [data-sidebar-right-panel] [data-dockkit-pane],
  [data-sidebar-right-panel] [data-dockkit-empty]
)[data-asuka-liquid-glass='true'] {
  --asuka-liquid-blur: 8px;
  --asuka-floating-surface: color-mix(in srgb, var(--asuka-sidebar-glass-surface) 68%, var(--dsw-alias-bg-base));
}
/* Optics belong to the painted sibling, never the content ancestor. Rounded
   clipping is local to this layer; menus/tooltips retain their containing block. */
body[data-asuka-school-theme] [data-asuka-liquid-glass='true']:not([data-menu-material])::before,
body[data-asuka-school-theme] :is(
  [data-slot='sidebar'] > *,
  header:has(> [data-conversation-header-leading]),
  [data-sidebar-right-panel] [data-dockkit-host='dock'] > [data-dockkit-pane],
  [data-sidebar-right-panel] [data-dockkit-empty]
)[data-asuka-liquid-glass='true']::before,
body[data-asuka-school-theme] [data-menu-material='translucent'][data-asuka-liquid-glass='true'] > [aria-hidden='true']:first-child {
  -webkit-backdrop-filter: blur(var(--asuka-liquid-blur)) var(--asuka-liquid-filter) saturate(1.35) brightness(var(--asuka-glass-brightness));
  backdrop-filter: blur(var(--asuka-liquid-blur)) var(--asuka-liquid-filter) saturate(1.35) brightness(var(--asuka-glass-brightness));
  box-shadow:
    inset 0 2px 1px -1px var(--asuka-glass-highlight),
    inset 2px 0 3px -2px var(--asuka-glass-highlight),
    inset -2px -3px 5px -3px var(--asuka-glass-edge-soft),
    inset 0 -1px 1px rgb(0 8 20 / 0.2);
}
/* A two-pixel curved rim catches light without putting a film over labels. */
body[data-asuka-school-theme] [data-asuka-liquid-glass='true']::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 2px;
  pointer-events: none;
  background:
    radial-gradient(ellipse at var(--asuka-liquid-light-x) var(--asuka-liquid-light-y), var(--asuka-glass-highlight), transparent 58%),
    var(--asuka-liquid-rim);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  opacity: 0.82;
}
body[data-asuka-school-theme] [data-composer-card][data-asuka-liquid-glass='true']:focus-within {
  box-shadow: inset 0 1px 0 var(--asuka-glass-highlight),
    0 0 0 2px color-mix(in srgb, var(--dsw-alias-brand-primary) 18%, transparent),
    0 14px 42px var(--asuka-glass-shadow);
}
/* The native Settings shell already has this background pseudo-element. Move
   its blur off the dialog so the lens samples the page, with controls untouched. */
body[data-asuka-school-theme] div[role='presentation']:has(> [aria-hidden='true'] + [role='dialog'][aria-modal='true'][data-asuka-liquid-glass='true']) > [aria-hidden='true'] {
  -webkit-backdrop-filter: blur(2px) saturate(1.15) brightness(var(--asuka-settings-mask-brightness));
  backdrop-filter: blur(2px) saturate(1.15) brightness(var(--asuka-settings-mask-brightness));
}
body[data-asuka-school-theme] div[role='presentation']:has(> [aria-hidden='true'] + [role='dialog'][aria-modal='true']) > [role='dialog'][aria-modal='true'][data-asuka-liquid-glass='true'] {
  --asuka-liquid-blur: var(--asuka-settings-glass-blur);
  -webkit-backdrop-filter: none;
  backdrop-filter: none;
}
body[data-asuka-school-theme] div[role='presentation']:has(> [aria-hidden='true'] + [role='dialog'][aria-modal='true']) > [role='dialog'][aria-modal='true'][data-asuka-liquid-glass='true']::before {
  -webkit-backdrop-filter: blur(var(--asuka-liquid-blur)) var(--asuka-liquid-filter) saturate(1.4) brightness(var(--asuka-settings-glass-brightness));
  backdrop-filter: blur(var(--asuka-liquid-blur)) var(--asuka-liquid-filter) saturate(1.4) brightness(var(--asuka-settings-glass-brightness));
}
body[data-asuka-school-theme][data-asuka-school-details='false'] [data-asuka-liquid-glass='true']::after { opacity: 0.38; }
body[data-asuka-school-reduce-motion='true'] [data-asuka-liquid-glass='true']::after {
  --asuka-liquid-light-x: 24%;
  --asuka-liquid-light-y: 0%;
}
@media (prefers-reduced-motion: reduce) {
  body[data-asuka-school-theme] [data-asuka-liquid-glass='true']::after {
    --asuka-liquid-light-x: 24%;
    --asuka-liquid-light-y: 0%;
  }
}
`
