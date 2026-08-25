const STYLE_ID = 'dsh-asuka-school-theme-styles'

const ASUKA_STYLES = String.raw`
#asuka-school-wallpaper-root {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  overflow: hidden;
  opacity: 0;
  filter: blur(var(--asuka-wallpaper-blur, 0px));
  transform: scale(1.015);
  transition: opacity 320ms ease, filter 320ms ease;
}
#asuka-school-wallpaper-root[data-enabled='true'] { opacity: var(--asuka-wallpaper-opacity, 0.2); }
.asuka-school-wallpaper-layer {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(90deg, var(--dsw-alias-bg-mask-1) 0%, var(--dsw-alias-bg-mask-2) 44%, var(--dsw-alias-bg-mask-3) 72%, transparent 100%), var(--asuka-wallpaper-image);
  background-position: center, right center;
  background-size: cover, cover;
  background-repeat: no-repeat;
  opacity: 0;
  transition: opacity 900ms cubic-bezier(0.22, 1, 0.36, 1);
}
.asuka-school-wallpaper-layer[data-active='true'] { opacity: 1; }
body[data-asuka-school-reduce-motion='true'] #asuka-school-wallpaper-root,
body[data-asuka-school-reduce-motion='true'] .asuka-school-wallpaper-layer { transition: none; }
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
.asuka-mode-switch { display: flex; overflow: hidden; border: 1px solid var(--dsw-alias-border-l2); border-radius: 8px; background: var(--dsw-alias-bg-layer-1); }
.asuka-mode-button, .asuka-theme-card, .asuka-reset-button { font: inherit; cursor: pointer; }
.asuka-mode-button { min-height: 34px; padding: 0 10px; border: 0; border-right: 1px solid var(--dsw-alias-border-l1); color: var(--dsw-alias-label-secondary); background: transparent; font-size: 12px; }
.asuka-mode-button:last-child { border-right: 0; }
.asuka-mode-button[aria-pressed='true'] { color: var(--dsw-alias-brand-primary-invert); background: var(--dsw-alias-brand-primary); }
.asuka-mode-button:focus-visible, .asuka-theme-card:focus-visible, .asuka-reset-button:focus-visible, .asuka-section input:focus-visible, .asuka-section select:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 2px; }
.asuka-section { max-width: 760px; padding: 8px 0 32px; }
.asuka-section-header { padding: 18px 20px; border-left: 3px solid var(--dsw-alias-brand-primary); background: linear-gradient(90deg, var(--dsw-alias-bg-layer-2), transparent); }
.asuka-section-header h2 { margin: 0; font-family: Georgia, 'Noto Serif SC', serif; font-size: 26px; letter-spacing: -0.02em; }
.asuka-setting-group { display: grid; gap: 14px; margin: 24px 0 0; padding: 0; border: 0; }
.asuka-setting-group legend { padding: 0; color: var(--dsw-alias-label-primary); font-size: 14px; font-weight: 700; }
.asuka-theme-cards { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
.asuka-theme-card { display: grid; gap: 10px; padding: 10px; border: 1px solid var(--dsw-alias-border-l1); border-radius: 10px; color: var(--dsw-alias-label-primary); text-align: left; background: var(--dsw-alias-bg-layer-1); }
.asuka-theme-card[aria-pressed='true'] { border-color: var(--dsw-alias-brand-primary); box-shadow: inset 3px 0 0 var(--dsw-alias-brand-primary); }
.asuka-theme-card span:last-child { display: grid; gap: 3px; }
.asuka-theme-card b { font-size: 13px; }
.asuka-theme-card small, .asuka-toggle-row small, .asuka-range-row small, .asuka-select-row small { color: var(--dsw-alias-label-tertiary); font-size: 11px; line-height: 1.4; }
.asuka-theme-swatch { display: block; height: 42px; border-radius: 6px; }
.asuka-theme-swatch-after-class { background: linear-gradient(120deg, #F4F0E9 0%, #DCE6E8 52%, #C7474F 100%); }
.asuka-theme-swatch-tokyo3-night { background: linear-gradient(120deg, #171C24 0%, #30485D 55%, #D96A36 100%); }
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
