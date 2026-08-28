const STYLE_ID = 'dsh-asuka-school-theme-styles'

export const ASUKA_STYLES = String.raw`
@property --asuka-code-block-sticky-mask { syntax: '<color>'; inherits: true; initial-value: transparent; }
@property --dsw-alias-bg-base { syntax: '<color>'; inherits: true; initial-value: transparent; }
@property --dsw-alias-bg-layer-1 { syntax: '<color>'; inherits: true; initial-value: transparent; }
@property --dsw-alias-bg-layer-2 { syntax: '<color>'; inherits: true; initial-value: transparent; }
@property --dsw-alias-bg-layer-3 { syntax: '<color>'; inherits: true; initial-value: transparent; }
@property --dsw-alias-bg-overlay { syntax: '<color>'; inherits: true; initial-value: transparent; }
@property --dsw-alias-bg-mask-1 { syntax: '<color>'; inherits: true; initial-value: transparent; }
@property --dsw-alias-bg-mask-2 { syntax: '<color>'; inherits: true; initial-value: transparent; }
@property --dsw-alias-bg-mask-3 { syntax: '<color>'; inherits: true; initial-value: transparent; }
@property --dsw-alias-border-l1 { syntax: '<color>'; inherits: true; initial-value: transparent; }
@property --dsw-alias-border-l2 { syntax: '<color>'; inherits: true; initial-value: transparent; }
@property --dsw-alias-border-l3 { syntax: '<color>'; inherits: true; initial-value: transparent; }
@property --dsw-alias-border-l4 { syntax: '<color>'; inherits: true; initial-value: transparent; }
@property --dsw-alias-brand-primary { syntax: '<color>'; inherits: true; initial-value: transparent; }
@property --dsw-alias-brand-text { syntax: '<color>'; inherits: true; initial-value: transparent; }
@property --dsw-alias-label-primary { syntax: '<color>'; inherits: true; initial-value: transparent; }
@property --dsw-alias-label-primary-bluish { syntax: '<color>'; inherits: true; initial-value: transparent; }
@property --dsw-alias-label-secondary { syntax: '<color>'; inherits: true; initial-value: transparent; }
@property --dsw-alias-label-tertiary { syntax: '<color>'; inherits: true; initial-value: transparent; }
@property --dsw-alias-label-caption { syntax: '<color>'; inherits: true; initial-value: transparent; }
@property --dsw-alias-label-dimmed { syntax: '<color>'; inherits: true; initial-value: transparent; }
@property --dsw-alias-button-primary-fill { syntax: '<color>'; inherits: true; initial-value: transparent; }
@property --dsw-alias-button-primary-hover { syntax: '<color>'; inherits: true; initial-value: transparent; }
@property --dsw-alias-button-info-fill { syntax: '<color>'; inherits: true; initial-value: transparent; }
@property --dsw-alias-button-info-hover { syntax: '<color>'; inherits: true; initial-value: transparent; }
@property --dsw-alias-interactive-bg-hover { syntax: '<color>'; inherits: true; initial-value: transparent; }
@property --dsw-alias-interactive-bg-active { syntax: '<color>'; inherits: true; initial-value: transparent; }
@property --dsw-alias-markdown-code-block { syntax: '<color>'; inherits: true; initial-value: transparent; }
@property --dsw-alias-markdown-code-block-banner { syntax: '<color>'; inherits: true; initial-value: transparent; }
@property --dsw-specific-sidebar-fill { syntax: '<color>'; inherits: true; initial-value: transparent; }
@property --dsw-specific-sidebar-nav-item-active { syntax: '<color>'; inherits: true; initial-value: transparent; }
@property --dsw-specific-sidebar-nav-item-hover { syntax: '<color>'; inherits: true; initial-value: transparent; }
@property --dsw-specific-bubble { syntax: '<color>'; inherits: true; initial-value: transparent; }
@property --dsw-specific-bubble-highlight { syntax: '<color>'; inherits: true; initial-value: transparent; }
@property --dsw-specific-input-major { syntax: '<color>'; inherits: true; initial-value: transparent; }
@property --shiki-background { syntax: '<color>'; inherits: true; initial-value: transparent; }
body[data-asuka-school-theme]:not([data-asuka-school-reduce-motion='true']) {
  transition:
    --asuka-code-block-sticky-mask 520ms cubic-bezier(0.22, 1, 0.36, 1),
    --dsw-alias-bg-base 520ms cubic-bezier(0.22, 1, 0.36, 1),
    --dsw-alias-bg-layer-1 520ms cubic-bezier(0.22, 1, 0.36, 1),
    --dsw-alias-bg-layer-2 520ms cubic-bezier(0.22, 1, 0.36, 1),
    --dsw-alias-bg-layer-3 520ms cubic-bezier(0.22, 1, 0.36, 1),
    --dsw-alias-bg-overlay 520ms cubic-bezier(0.22, 1, 0.36, 1),
    --dsw-alias-bg-mask-1 520ms cubic-bezier(0.22, 1, 0.36, 1),
    --dsw-alias-bg-mask-2 520ms cubic-bezier(0.22, 1, 0.36, 1),
    --dsw-alias-bg-mask-3 520ms cubic-bezier(0.22, 1, 0.36, 1),
    --dsw-alias-border-l1 520ms cubic-bezier(0.22, 1, 0.36, 1),
    --dsw-alias-border-l2 520ms cubic-bezier(0.22, 1, 0.36, 1),
    --dsw-alias-border-l3 520ms cubic-bezier(0.22, 1, 0.36, 1),
    --dsw-alias-border-l4 520ms cubic-bezier(0.22, 1, 0.36, 1),
    --dsw-alias-brand-primary 420ms ease,
    --dsw-alias-brand-text 420ms ease,
    --dsw-alias-label-primary 420ms ease,
    --dsw-alias-label-primary-bluish 420ms ease,
    --dsw-alias-label-secondary 420ms ease,
    --dsw-alias-label-tertiary 420ms ease,
    --dsw-alias-label-caption 420ms ease,
    --dsw-alias-label-dimmed 420ms ease,
    --dsw-alias-button-primary-fill 420ms ease,
    --dsw-alias-button-primary-hover 420ms ease,
    --dsw-alias-button-info-fill 420ms ease,
    --dsw-alias-button-info-hover 420ms ease,
    --dsw-alias-interactive-bg-hover 420ms ease,
    --dsw-alias-interactive-bg-active 420ms ease,
    --dsw-alias-markdown-code-block 520ms cubic-bezier(0.22, 1, 0.36, 1),
    --dsw-alias-markdown-code-block-banner 520ms cubic-bezier(0.22, 1, 0.36, 1),
    --dsw-specific-sidebar-fill 520ms cubic-bezier(0.22, 1, 0.36, 1),
    --dsw-specific-sidebar-nav-item-active 520ms cubic-bezier(0.22, 1, 0.36, 1),
    --dsw-specific-sidebar-nav-item-hover 520ms cubic-bezier(0.22, 1, 0.36, 1),
    --dsw-specific-bubble 520ms cubic-bezier(0.22, 1, 0.36, 1),
    --dsw-specific-bubble-highlight 520ms cubic-bezier(0.22, 1, 0.36, 1),
    --dsw-specific-input-major 520ms cubic-bezier(0.22, 1, 0.36, 1),
    --shiki-background 520ms cubic-bezier(0.22, 1, 0.36, 1);
}
#asuka-school-wallpaper-root {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
  contain: paint;
  opacity: 0;
  filter: blur(var(--asuka-wallpaper-blur, 0px));
  transform: scale(1.015);
  transition: opacity 420ms ease, filter 420ms ease;
}
#asuka-school-wallpaper-root[data-enabled='true'] { opacity: var(--asuka-wallpaper-opacity, 0.12); }
.asuka-school-wallpaper-layer {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(90deg, var(--asuka-wallpaper-mask-start) 0%, var(--asuka-wallpaper-mask-middle) 44%, var(--asuka-wallpaper-mask-end) 72%, transparent 100%), var(--asuka-wallpaper-image);
  background-position: center, right center;
  background-size: cover, cover;
  background-repeat: no-repeat;
  opacity: 0;
  filter: var(--asuka-wallpaper-filter, saturate(0.88) contrast(0.98));
  transform: scale(1.015);
  transition: opacity 560ms cubic-bezier(0.22, 1, 0.36, 1), transform 620ms cubic-bezier(0.22, 1, 0.36, 1);
}
.asuka-school-wallpaper-layer[data-active='true'] { opacity: 1; transform: scale(1); }
body[data-asuka-school-reduce-motion='true'] #asuka-school-wallpaper-root,
body[data-asuka-school-reduce-motion='true'] .asuka-school-wallpaper-layer,
body[data-asuka-school-reduce-motion='true'][data-asuka-school-theme] { transition: none; }
body[data-asuka-school-theme] aside {
  position: relative;
  z-index: 2;
  background-color: var(--dsw-specific-sidebar-fill);
  background-image: linear-gradient(180deg, color-mix(in srgb, var(--dsw-specific-sidebar-fill) 98%, white), var(--dsw-specific-sidebar-fill));
  border-right-color: var(--dsw-alias-border-l2);
}
/* Stable semantic details: the palette is applied by presentation.ts, while these make its school motif tangible. */
body[data-asuka-school-theme][data-asuka-school-details='true'] :is(button, [role='button']) {
  border-radius: 8px;
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.14), 0 1px 0 rgb(20 32 40 / 0.08);
  transition: box-shadow 160ms ease, transform 160ms ease;
}
body[data-asuka-school-theme][data-asuka-school-details='true'] :is(button, [role='button']):not(:disabled):hover {
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.2), 0 5px 15px rgb(37 57 69 / 0.14);
  transform: translateY(-1px);
}
body[data-asuka-school-theme][data-asuka-school-details='true'] pre {
  border: 1px solid var(--dsw-alias-border-l2);
  border-left: 3px solid var(--dsw-alias-brand-primary);
  border-radius: 10px;
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.06), 0 8px 24px rgb(19 30 41 / 0.12);
}
body[data-asuka-school-theme][data-asuka-school-details='true'] .md-code-block {
  overflow: clip;
}
/* DSH rc.2 keeps this wrapper sticky; mask it square and let its painted child own the top radii, as <pre> owns the bottom radii. */
body[data-asuka-school-theme][data-asuka-school-details='true'] .md-code-block > :first-child {
  border-radius: 0;
  background: var(--asuka-code-block-sticky-mask);
}
body[data-asuka-school-theme][data-asuka-school-details='true'] .md-code-block > :first-child > :first-child {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background: var(--dsw-alias-markdown-code-block-banner);
}
body[data-asuka-school-theme][data-asuka-school-details='true'] .md-code-block > :first-child > :first-child button {
  min-width: 36px;
  min-height: 24px;
  padding: 0 6px;
}
body[data-asuka-school-theme][data-asuka-school-details='true'] .md-code-block pre {
  border-top: 0;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.asuka-quick-row, .asuka-section { color: var(--dsw-alias-label-primary); }
.asuka-quick-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 20px;
  align-items: center;
  padding: 18px 0;
  border-top: 1px solid var(--dsw-alias-border-l1);
}
.asuka-quick-copy, .asuka-section-header { display: grid; gap: 5px; }
.asuka-kicker {
  color: var(--dsw-alias-brand-text);
  font-family: Georgia, 'Noto Serif SC', serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
}
.asuka-quick-copy strong { font-size: 15px; }
.asuka-quick-copy p, .asuka-section-header p { margin: 0; color: var(--dsw-alias-label-secondary); font-size: 13px; line-height: 1.55; }
.asuka-mode-switch { display: flex; flex-wrap: wrap; gap: 8px; }
.asuka-mode-button, .asuka-theme-card, .asuka-reset-button { font: inherit; cursor: pointer; }
.asuka-mode-button { min-height: 34px; padding: 0 12px; border: 1px solid var(--dsw-alias-border-l2); border-radius: 8px; color: var(--dsw-alias-label-secondary); background: var(--dsw-alias-bg-layer-1); font-size: 12px; }
.asuka-mode-button[aria-pressed='true'] { border-color: var(--dsw-alias-brand-primary); color: var(--dsw-alias-brand-primary-invert); background: var(--dsw-alias-brand-primary); }
.asuka-mode-button:focus-visible, .asuka-theme-card:focus-visible, .asuka-reset-button:focus-visible, .asuka-section input:focus-visible, .asuka-section select:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 2px; }
.asuka-section { max-width: 760px; padding: 8px 0 32px; }
.asuka-section-header { padding: 18px 20px; border-left: 3px solid var(--dsw-alias-brand-primary); background: linear-gradient(90deg, var(--dsw-alias-bg-layer-2), transparent); }
.asuka-section-header h2 { margin: 0; font-family: Georgia, 'Noto Serif SC', serif; font-size: 26px; letter-spacing: -0.02em; }
.asuka-setting-group { display: grid; gap: 14px; margin: 24px 0 0; padding: 0; border: 0; }
.asuka-setting-group legend { padding: 0; color: var(--dsw-alias-label-primary); font-size: 14px; font-weight: 700; }
.asuka-theme-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; }
.asuka-theme-card { display: grid; gap: 10px; padding: 10px; border: 1px solid var(--dsw-alias-border-l1); border-radius: 10px; color: var(--dsw-alias-label-primary); text-align: left; background: var(--dsw-alias-bg-layer-1); }
.asuka-theme-card[aria-pressed='true'] { border-color: var(--dsw-alias-brand-primary); box-shadow: inset 3px 0 0 var(--dsw-alias-brand-primary); }
.asuka-theme-card span:last-child { display: grid; gap: 3px; }
.asuka-theme-card b { font-size: 13px; }
.asuka-theme-card small, .asuka-toggle-row small, .asuka-range-row small, .asuka-select-row small { color: var(--dsw-alias-label-tertiary); font-size: 11px; line-height: 1.4; }
.asuka-theme-swatch { display: block; height: 42px; border-radius: 6px; }
.asuka-theme-swatch-morning { background: linear-gradient(120deg, #F4F0E9 0%, #DCE6E8 52%, #C7474F 100%); }
.asuka-theme-swatch-noon { background: linear-gradient(120deg, #E8EDF0 0%, #9FC2E2 54%, #6D93B8 100%); }
.asuka-theme-swatch-night { background: linear-gradient(120deg, #171C24 0%, #30485D 55%, #D96A36 100%); }
.asuka-theme-swatch-off { background: repeating-linear-gradient(-45deg, var(--dsw-alias-bg-layer-2), var(--dsw-alias-bg-layer-2) 8px, var(--dsw-alias-bg-layer-1) 8px, var(--dsw-alias-bg-layer-1) 16px); }
.asuka-toggle-row, .asuka-range-row, .asuka-select-row { display: grid; gap: 8px; padding: 14px 0; border-top: 1px solid var(--dsw-alias-border-l1); }
.asuka-toggle-row, .asuka-select-row { grid-template-columns: minmax(0, 1fr) auto; align-items: center; }
.asuka-toggle-row span, .asuka-range-row span, .asuka-select-row span { display: grid; gap: 3px; }
.asuka-toggle-row input { width: 18px; height: 18px; accent-color: var(--dsw-alias-brand-primary); }
.asuka-range-row input { width: min(100%, 420px); accent-color: var(--dsw-alias-brand-primary); }
.asuka-select-row select { min-height: 34px; max-width: 230px; padding: 0 28px 0 10px; border: 1px solid var(--dsw-alias-border-l2); border-radius: 6px; color: var(--dsw-alias-label-primary); background: var(--dsw-alias-bg-layer-1); font: inherit; }
.asuka-section-footer { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-top: 28px; padding-top: 18px; border-top: 1px solid var(--dsw-alias-border-l2); color: var(--dsw-alias-label-secondary); font-size: 12px; line-height: 1.5; }
.asuka-section-footer b { color: var(--dsw-alias-label-primary); }
.asuka-reset-button { padding: 8px 10px; border: 1px solid var(--dsw-alias-border-l2); border-radius: 6px; color: var(--dsw-alias-label-primary); background: var(--dsw-alias-bg-layer-1); white-space: nowrap; }
body[data-asuka-school-details='true'] { --asuka-selection-rail: var(--dsw-specific-sidebar-nav-item-active-accent); }
@media (max-width: 640px) {
  .asuka-quick-row { grid-template-columns: 1fr; }
  .asuka-mode-switch { width: fit-content; }
  .asuka-theme-cards { grid-template-columns: 1fr; }
  .asuka-section-footer { align-items: flex-start; flex-direction: column; }
}
`

export function installAsukaStyles(): () => void {
  if (typeof document === 'undefined') return () => undefined
  const existing = document.getElementById(STYLE_ID)
  if (existing !== null) return () => undefined

  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = ASUKA_STYLES
  document.head.append(style)
  return () => style.remove()
}
