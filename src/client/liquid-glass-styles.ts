/** Keep supported menu paint stable from its first frame; decoded lens maps
 * enhance the same layer. Unsupported engines retain the original stylesheet. */
export const ASUKA_LIQUID_STYLES = String.raw`
/* Animate only the rim's own paint properties, never inherited UI tokens. */
@property --asuka-liquid-light-x { syntax: '<percentage>'; inherits: false; initial-value: 24%; }
@property --asuka-liquid-light-y { syntax: '<percentage>'; inherits: false; initial-value: 0%; }
@property --asuka-liquid-light-strength { syntax: '<number>'; inherits: false; initial-value: 0; }
body[data-asuka-school-theme] [data-asuka-liquid-glass='true'],
body[data-asuka-school-theme][data-asuka-liquid-engine='true'] [data-menu-material='translucent'] {
  --asuka-liquid-blur: 5px;
  --asuka-liquid-rim: linear-gradient(135deg,
    var(--asuka-glass-highlight), var(--asuka-glass-edge-soft) 28%,
    transparent 46%, var(--asuka-glass-edge-soft) 70%, var(--asuka-glass-highlight));
}
/* A portal/nested menu must never inherit another surface's filter URL while
   its own map decodes. Blur, saturation, depth and rim already match the final
   material; only the local refraction is added after successful decoding. */
body[data-asuka-school-theme][data-asuka-liquid-engine='true'] [data-menu-material='translucent'] {
  --asuka-liquid-filter: blur(0px);
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
body[data-asuka-school-theme] [data-menu-material='translucent'][data-asuka-liquid-glass='true'] > [aria-hidden='true']:first-child,
body[data-asuka-school-theme][data-asuka-liquid-engine='true'] [data-menu-material='translucent'] > [aria-hidden='true']:first-child {
  -webkit-backdrop-filter: blur(var(--asuka-liquid-blur)) var(--asuka-liquid-filter) saturate(1.35) brightness(var(--asuka-glass-brightness));
  backdrop-filter: blur(var(--asuka-liquid-blur)) var(--asuka-liquid-filter) saturate(1.35) brightness(var(--asuka-glass-brightness));
  box-shadow:
    inset 0 2px 1px -1px var(--asuka-glass-highlight),
    inset 2px 0 3px -2px var(--asuka-glass-highlight),
    inset -2px -3px 5px -3px var(--asuka-glass-edge-soft),
    inset 0 -1px 1px rgb(0 8 20 / 0.2);
}
/* The trigger menu owns ::after for its 16px bottom scroll fade. Put its rim
   on the full-size material child, leaving that native hint and geometry intact. */
/* A two-pixel curved rim catches light without putting a film over labels. */
body[data-asuka-school-theme] [data-asuka-liquid-glass='true']:not([data-trigger-menu])::after,
body[data-asuka-school-theme] [data-trigger-menu][data-asuka-liquid-glass='true'] > [aria-hidden='true']:first-child::after,
body[data-asuka-school-theme][data-asuka-liquid-engine='true'] [data-menu-material='translucent']:not([data-trigger-menu])::after,
body[data-asuka-school-theme][data-asuka-liquid-engine='true'] [data-trigger-menu][data-menu-material='translucent'] > [aria-hidden='true']:first-child::after {
  --asuka-liquid-light-x: var(--asuka-liquid-pointer-x, 24%);
  --asuka-liquid-light-y: var(--asuka-liquid-pointer-y, 0%);
  --asuka-liquid-light-strength: var(--asuka-liquid-pointer-strength, 0);
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 2px;
  pointer-events: none;
  background:
    radial-gradient(circle 110px at var(--asuka-liquid-light-x) var(--asuka-liquid-light-y), color-mix(in srgb, var(--asuka-glass-highlight) calc(var(--asuka-liquid-light-strength) * 100%), transparent), transparent 100%),
    var(--asuka-liquid-rim);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  opacity: 0.82;
  transition: --asuka-liquid-light-x 140ms ease-out, --asuka-liquid-light-y 140ms ease-out, --asuka-liquid-light-strength 180ms ease-out;
}
body[data-asuka-school-theme] [data-composer-card][data-asuka-liquid-glass='true']:focus-within {
  box-shadow: inset 0 1px 0 var(--asuka-glass-highlight),
    0 0 0 2px color-mix(in srgb, var(--dsw-alias-brand-primary) 18%, transparent),
    0 14px 42px var(--asuka-glass-shadow);
}
body[data-asuka-school-theme][data-asuka-school-details='false'] [data-asuka-liquid-glass='true']:not([data-trigger-menu])::after,
body[data-asuka-school-theme][data-asuka-school-details='false'] [data-trigger-menu][data-asuka-liquid-glass='true'] > [aria-hidden='true']:first-child::after,
body[data-asuka-school-theme][data-asuka-school-details='false'][data-asuka-liquid-engine='true'] [data-menu-material='translucent']:not([data-trigger-menu])::after,
body[data-asuka-school-theme][data-asuka-school-details='false'][data-asuka-liquid-engine='true'] [data-trigger-menu][data-menu-material='translucent'] > [aria-hidden='true']:first-child::after { opacity: 0.38; }
body[data-asuka-school-reduce-motion='true'] [data-asuka-liquid-glass='true']:not([data-trigger-menu])::after,
body[data-asuka-school-reduce-motion='true'] [data-trigger-menu][data-asuka-liquid-glass='true'] > [aria-hidden='true']:first-child::after,
body[data-asuka-school-reduce-motion='true'][data-asuka-liquid-engine='true'] [data-menu-material='translucent']:not([data-trigger-menu])::after,
body[data-asuka-school-reduce-motion='true'][data-asuka-liquid-engine='true'] [data-trigger-menu][data-menu-material='translucent'] > [aria-hidden='true']:first-child::after {
  --asuka-liquid-light-strength: 0;
  transition: none;
}
@media (prefers-reduced-motion: reduce) {
  body[data-asuka-school-theme] [data-asuka-liquid-glass='true']:not([data-trigger-menu])::after,
  body[data-asuka-school-theme] [data-trigger-menu][data-asuka-liquid-glass='true'] > [aria-hidden='true']:first-child::after,
  body[data-asuka-school-theme][data-asuka-liquid-engine='true'] [data-menu-material='translucent']:not([data-trigger-menu])::after,
  body[data-asuka-school-theme][data-asuka-liquid-engine='true'] [data-trigger-menu][data-menu-material='translucent'] > [aria-hidden='true']:first-child::after {
    --asuka-liquid-light-strength: 0;
    transition: none;
  }
}
`
