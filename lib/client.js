window.__ModuleLoader__.load({
  id: "dsh-asuka-school-theme",
  factory(require) {
    const module = { exports: {} };
    const exports = module.exports;
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.ts
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(index_exports);

// src/shared/settings.ts
var ASUKA_SETTINGS_NAMESPACE_ID = "asuka-school-theme";
var ASUKA_MODES = ["off", "after-class", "tokyo3-night"];
var DEFAULT_ASUKA_SETTINGS = Object.freeze({
  mode: "off",
  wallpaperEnabled: true,
  wallpaperPeriod: "auto",
  wallpaperOpacity: 0.12,
  wallpaperBlurPx: 0,
  decorativeDetails: true,
  reduceMotion: false
});
function isAsukaMode(value) {
  return typeof value === "string" && ASUKA_MODES.includes(value);
}
function wallpaperPeriodAt(now) {
  const hour = now.getHours();
  if (hour >= 6 && hour < 11) return "morning";
  if (hour >= 11 && hour < 17) return "noon";
  return "night";
}
function resolveWallpaperPeriod(preference, now = /* @__PURE__ */ new Date()) {
  return preference === "auto" ? wallpaperPeriodAt(now) : preference;
}
function resolveAsukaPresentationMode(mode, preference, period) {
  if (mode === "off" || preference !== "auto") return mode;
  return period === "night" ? "tokyo3-night" : "after-class";
}
function millisecondsUntilNextWallpaperPeriod(now = /* @__PURE__ */ new Date()) {
  const next = new Date(now);
  for (const hour of [6, 11, 17]) {
    next.setHours(hour, 0, 0, 0);
    if (next.getTime() > now.getTime()) return Math.max(1e3, next.getTime() - now.getTime());
  }
  next.setDate(next.getDate() + 1);
  next.setHours(6, 0, 0, 0);
  return Math.max(1e3, next.getTime() - now.getTime());
}
function clampOpacity(value) {
  return Math.min(1, Math.max(0, Math.round(value * 100) / 100));
}
function clampBlur(value) {
  return Math.min(20, Math.max(0, Math.round(value)));
}

// src/client/themes/colors.ts
var ASUKA_COLORS = Object.freeze({
  schoolBlue: "#55758C",
  schoolBlueDark: "#30485D",
  ribbonRed: "#C7474F",
  ribbonRedDeep: "#A42F3A",
  hairOrange: "#D96A36",
  hairOrangeAction: "#B8522B",
  hairOrangeHover: "#CC6337",
  hairOrangeDeep: "#8E3C21",
  warmCream: "#F4F0E9",
  warmPaper: "#FCFAF4",
  tokyoSky: "#91B9D2",
  nightNavy: "#171C24",
  panelNavy: "#202934",
  ink: "#24313D",
  cloud: "#DDE6EC",
  success: "#4C8465",
  warning: "#B67825",
  error: "#B93845"
});

// src/client/themes/dark.ts
var asukaDarkTheme = {
  id: "asuka-school-dark",
  colorScheme: "dark",
  tokens: {
    "--dsw-alias-bg-base": ASUKA_COLORS.nightNavy,
    "--dsw-alias-bg-layer-1": ASUKA_COLORS.panelNavy,
    "--dsw-alias-bg-layer-2": "#26323E",
    "--dsw-alias-bg-layer-3": "#2C3946",
    "--dsw-alias-bg-overlay": "#26313C",
    "--dsw-alias-bg-mask-1": "rgba(23, 28, 36, 0.82)",
    "--dsw-alias-bg-mask-2": "rgba(23, 28, 36, 0.66)",
    "--dsw-alias-bg-mask-3": "rgba(23, 28, 36, 0.48)",
    "--dsw-alias-border-l1": "#344452",
    "--dsw-alias-border-l2": "#4A5E6E",
    "--dsw-alias-border-l3": "#617A8D",
    "--dsw-alias-border-l4": ASUKA_COLORS.tokyoSky,
    "--dsw-alias-brand-primary": "#E35A64",
    "--dsw-alias-brand-primary-invert": "#171C24",
    "--dsw-alias-brand-text": "#FF9A8D",
    "--dsw-alias-brand-primary-new-colorprimary-new-color": ASUKA_COLORS.hairOrange,
    "--dsw-alias-label-primary": "#F4F0E9",
    "--dsw-alias-label-primary-bluish": ASUKA_COLORS.hairOrangeHover,
    "--dsw-alias-label-secondary": "#C5D2D8",
    "--dsw-alias-label-tertiary": "#9DADB7",
    "--dsw-alias-label-caption": "#AAB9C0",
    "--dsw-alias-label-dimmed": "#73838D",
    "--dsw-alias-label-primary-inverted": "#171C24",
    "--dsw-alias-button-primary-fill": "#E35A64",
    "--dsw-alias-button-primary-hover": "#F06E73",
    "--dsw-alias-button-primary-dimmed": "#77424C",
    "--dsw-alias-button-info-fill": ASUKA_COLORS.hairOrange,
    "--dsw-alias-button-info-hover": ASUKA_COLORS.hairOrangeHover,
    "--dsw-alias-button-elevated-fill": "#2A3744",
    "--dsw-alias-button-floating-fill": "#2A3744",
    "--dsw-alias-button-floating-hover": "#354656",
    "--dsw-alias-button-ghost-active-fill": "#354A57",
    "--dsw-alias-button-ghost-active-border": ASUKA_COLORS.tokyoSky,
    "--dsw-alias-interactive-bg-hover": "#2D3C48",
    "--dsw-alias-interactive-bg-active": "#3B4E5B",
    "--dsw-alias-interactive-bg-hover-accent": "#51333A",
    "--dsw-alias-state-error-primary": "#F17C82",
    "--dsw-alias-state-error-secondary": "#512E37",
    "--dsw-alias-state-success-primary": "#79B58D",
    "--dsw-alias-state-success-secondary": "#293F35",
    "--dsw-alias-state-success-tertiary": "#202F29",
    "--dsw-alias-state-business-primary": ASUKA_COLORS.hairOrange,
    "--dsw-alias-state-business-tertiary": "#4D2D25",
    "--dsw-alias-state-warn-primary": "#E9AF58",
    "--dsw-alias-state-warn-secondary": "#4C3A20",
    "--dsw-alias-state-warn-tertiary": "#382D1D",
    "--dsw-alias-state-warn-label": "#F2C877",
    "--dsw-alias-markdown-code-block": "#10161D",
    "--dsw-alias-markdown-code-block-banner": "#1B2731",
    "--dsw-alias-markdown-inline-code": "#32323A",
    "--dsw-alias-scrollbar-bg-l1": "#24313C",
    "--dsw-alias-scrollbar-bg-l2": "#344452",
    "--dsw-alias-scrollbar-hover-l1": ASUKA_COLORS.tokyoSky,
    "--dsw-alias-scrollbar-hover-l2": "#B7D7E7",
    "--dsw-specific-sidebar-fill": "#1C2731",
    "--dsw-specific-sidebar-nav-item-active": "#2E4351",
    "--dsw-specific-sidebar-nav-item-active-accent": "#F19863",
    "--dsw-specific-sidebar-nav-item-hover": "#273641",
    "--dsw-specific-bubble": "#25313C",
    "--dsw-specific-bubble-highlight": "#30343C",
    "--dsw-specific-input-major": "#202C36",
    "--dsw-static-deepseek-400": ASUKA_COLORS.hairOrangeHover,
    "--dsw-static-deepseek-450": ASUKA_COLORS.hairOrange,
    "--dsw-static-deepseek-500": ASUKA_COLORS.hairOrangeAction,
    "--dsw-static-deepseek-600": ASUKA_COLORS.hairOrangeDeep,
    "--shiki-background": "#10161D",
    "--shiki-foreground": "#E8EEF1",
    "--shiki-token-comment": "#7893A5",
    "--shiki-token-keyword": "#F09270",
    "--shiki-token-string": "#AED49A",
    "--shiki-token-function": "#F3C778",
    "--shiki-token-constant": "#E2A6C9",
    "--shiki-token-parameter": "#D7E1E5",
    "--shiki-token-punctuation": "#AEBEC7"
  }
};

// src/client/themes/light.ts
var noonTokens = {
  "--dsw-alias-bg-base": "rgba(232, 233, 228, 0.84)",
  "--dsw-alias-bg-layer-1": "rgba(244, 243, 237, 0.92)",
  "--dsw-alias-bg-layer-2": "rgba(236, 237, 232, 0.9)",
  "--dsw-alias-bg-layer-3": "rgba(224, 225, 218, 0.92)",
  "--dsw-alias-bg-overlay": "rgba(248, 247, 241, 0.94)",
  "--dsw-alias-bg-mask-1": "rgba(224, 228, 224, 0.92)",
  "--dsw-alias-bg-mask-2": "rgba(230, 233, 229, 0.7)",
  "--dsw-alias-bg-mask-3": "rgba(238, 240, 235, 0.36)",
  "--dsw-alias-border-l1": "#D7D1C5",
  "--dsw-alias-border-l2": "#B9C7D0",
  "--dsw-alias-border-l3": "#98ADBA",
  "--dsw-alias-border-l4": ASUKA_COLORS.schoolBlue,
  "--dsw-alias-brand-primary": ASUKA_COLORS.ribbonRed,
  "--dsw-alias-brand-primary-invert": "#FFFFFF",
  "--dsw-alias-brand-text": ASUKA_COLORS.ribbonRedDeep,
  "--dsw-alias-brand-primary-new-colorprimary-new-color": ASUKA_COLORS.hairOrangeAction,
  "--dsw-alias-label-primary": ASUKA_COLORS.ink,
  "--dsw-alias-label-primary-bluish": ASUKA_COLORS.hairOrangeDeep,
  "--dsw-alias-label-secondary": "#4C5F6C",
  "--dsw-alias-label-tertiary": "#71818B",
  "--dsw-alias-label-caption": "#697984",
  "--dsw-alias-label-dimmed": "#87949B",
  "--dsw-alias-label-primary-inverted": "#FFFFFF",
  "--dsw-alias-button-primary-fill": ASUKA_COLORS.ribbonRed,
  "--dsw-alias-button-primary-hover": ASUKA_COLORS.ribbonRedDeep,
  "--dsw-alias-button-primary-dimmed": "#D98C91",
  "--dsw-alias-button-info-fill": ASUKA_COLORS.hairOrangeAction,
  "--dsw-alias-button-info-hover": ASUKA_COLORS.hairOrangeHover,
  "--dsw-alias-button-elevated-fill": "#FFFFFF",
  "--dsw-alias-button-floating-fill": "#FFFFFF",
  "--dsw-alias-button-floating-hover": "#F0E8DD",
  "--dsw-alias-button-ghost-active-fill": "#DCE6E8",
  "--dsw-alias-button-ghost-active-border": ASUKA_COLORS.schoolBlue,
  "--dsw-alias-interactive-bg-hover": "#E7EEF0",
  "--dsw-alias-interactive-bg-active": "#D4E0E4",
  "--dsw-alias-interactive-bg-hover-accent": "#F3DEE0",
  "--dsw-alias-state-error-primary": ASUKA_COLORS.error,
  "--dsw-alias-state-error-secondary": "#F6DFE1",
  "--dsw-alias-state-success-primary": ASUKA_COLORS.success,
  "--dsw-alias-state-success-secondary": "#DEEEE3",
  "--dsw-alias-state-success-tertiary": "#F2F8F3",
  "--dsw-alias-state-business-primary": ASUKA_COLORS.hairOrangeAction,
  "--dsw-alias-state-business-tertiary": "#F4D7C8",
  "--dsw-alias-state-warn-primary": ASUKA_COLORS.warning,
  "--dsw-alias-state-warn-secondary": "#F8ECD8",
  "--dsw-alias-state-warn-tertiary": "#FFF8EB",
  "--dsw-alias-state-warn-label": "#754B13",
  "--dsw-alias-markdown-code-block": "#24313D",
  "--dsw-alias-markdown-code-block-banner": "#F3E8DB",
  "--dsw-alias-markdown-inline-code": "#EEE1D1",
  "--dsw-alias-scrollbar-bg-l1": "#E3DFD7",
  "--dsw-alias-scrollbar-bg-l2": "#D4D0C8",
  "--dsw-alias-scrollbar-hover-l1": ASUKA_COLORS.schoolBlue,
  "--dsw-alias-scrollbar-hover-l2": ASUKA_COLORS.schoolBlueDark,
  "--dsw-specific-sidebar-fill": "rgba(220, 228, 228, 0.97)",
  "--dsw-specific-sidebar-nav-item-active": "rgba(200, 216, 223, 0.98)",
  "--dsw-specific-sidebar-nav-item-active-accent": ASUKA_COLORS.hairOrange,
  "--dsw-specific-sidebar-nav-item-hover": "rgba(234, 240, 240, 0.98)",
  "--dsw-specific-bubble": "rgba(255, 253, 248, 0.94)",
  "--dsw-specific-bubble-highlight": "rgba(244, 234, 222, 0.94)",
  "--dsw-specific-input-major": "rgba(255, 253, 248, 0.96)",
  "--dsw-static-deepseek-400": ASUKA_COLORS.hairOrangeHover,
  "--dsw-static-deepseek-450": ASUKA_COLORS.hairOrange,
  "--dsw-static-deepseek-500": ASUKA_COLORS.hairOrangeAction,
  "--dsw-static-deepseek-600": ASUKA_COLORS.hairOrangeDeep,
  "--shiki-background": "#24313D",
  "--shiki-foreground": "#E7EDF0",
  "--shiki-token-comment": "#91B9D2",
  "--shiki-token-keyword": "#F19863",
  "--shiki-token-string": "#B9D8A7",
  "--shiki-token-function": "#F3C988",
  "--shiki-token-constant": "#D9A5C7",
  "--shiki-token-parameter": "#DDE6EC",
  "--shiki-token-punctuation": "#B7C7D0"
};
var asukaNoonTheme = {
  id: "asuka-school-noon",
  colorScheme: "light",
  tokens: noonTokens
};
var asukaMorningTheme = {
  id: "asuka-school-morning",
  colorScheme: "light",
  tokens: {
    ...noonTokens,
    "--dsw-alias-bg-base": "rgba(235, 215, 196, 0.82)",
    "--dsw-alias-bg-layer-1": "rgba(248, 234, 220, 0.92)",
    "--dsw-alias-bg-layer-2": "rgba(241, 220, 201, 0.9)",
    "--dsw-alias-bg-layer-3": "rgba(229, 199, 176, 0.92)",
    "--dsw-alias-bg-overlay": "rgba(251, 240, 229, 0.94)",
    "--dsw-alias-bg-mask-1": "rgba(104, 59, 36, 0.9)",
    "--dsw-alias-bg-mask-2": "rgba(188, 118, 74, 0.68)",
    "--dsw-alias-bg-mask-3": "rgba(239, 197, 151, 0.34)",
    "--dsw-alias-label-primary-bluish": ASUKA_COLORS.hairOrangeDeep,
    "--dsw-specific-sidebar-fill": "rgba(235, 222, 207, 0.97)",
    "--dsw-specific-sidebar-nav-item-active": "rgba(224, 199, 180, 0.98)",
    "--dsw-specific-sidebar-nav-item-hover": "rgba(246, 232, 218, 0.98)",
    "--dsw-specific-bubble": "rgba(255, 249, 242, 0.94)",
    "--dsw-specific-bubble-highlight": "rgba(246, 226, 208, 0.94)",
    "--dsw-specific-input-major": "rgba(255, 249, 242, 0.96)",
    "--dsw-alias-markdown-code-block": "#3D302C",
    "--dsw-alias-markdown-code-block-banner": "#F0D8C2"
  }
};

// src/client/presentation.ts
var THEME_ATTRIBUTE = "data-asuka-school-theme";
var REDUCED_MOTION_ATTRIBUTE = "data-asuka-school-reduce-motion";
var baseline;
function asukaThemeForMode(mode, period = "noon") {
  if (mode === "after-class") return period === "morning" ? asukaMorningTheme : asukaNoonTheme;
  if (mode === "tokyo3-night") return asukaDarkTheme;
  return void 0;
}
function applyAsukaPresentation(mode, period = "noon", reduceMotion = false) {
  if (typeof document === "undefined" || document.body === null) return;
  const definition = asukaThemeForMode(mode, period);
  if (definition === void 0) {
    clearAsukaPresentation();
    return;
  }
  const body = document.body;
  const root = document.documentElement;
  if (baseline === void 0) {
    baseline = {
      darkTheme: body.hasAttribute("data-ds-dark-theme"),
      colorScheme: readInlineProperty(root, "color-scheme"),
      tokens: /* @__PURE__ */ new Map()
    };
  }
  body.setAttribute(THEME_ATTRIBUTE, definition.colorScheme);
  body.setAttribute(REDUCED_MOTION_ATTRIBUTE, String(reduceMotion));
  body.toggleAttribute("data-ds-dark-theme", definition.colorScheme === "dark");
  root.style.setProperty("color-scheme", definition.colorScheme, "important");
  for (const [name, value] of Object.entries(definition.tokens)) {
    if (!baseline.tokens.has(name)) baseline.tokens.set(name, readInlineProperty(body, name));
    body.style.setProperty(name, value, "important");
  }
}
function clearAsukaPresentation() {
  if (typeof document === "undefined" || document.body === null || baseline === void 0) return;
  const body = document.body;
  const root = document.documentElement;
  body.removeAttribute(THEME_ATTRIBUTE);
  body.removeAttribute(REDUCED_MOTION_ATTRIBUTE);
  body.toggleAttribute("data-ds-dark-theme", baseline.darkTheme);
  writeInlineProperty(root, "color-scheme", baseline.colorScheme);
  for (const [name, property] of baseline.tokens) writeInlineProperty(body, name, property);
  baseline = void 0;
}
function readInlineProperty(element, name) {
  return {
    value: element.style.getPropertyValue(name),
    priority: element.style.getPropertyPriority(name)
  };
}
function writeInlineProperty(element, name, property) {
  if (property.value === "") element.style.removeProperty(name);
  else element.style.setProperty(name, property.value, property.priority);
}

// src/shared/wallpapers.ts
var WALLPAPER_ROUTE_PREFIX = "/asuka-school/assets";
var WALLPAPER_ASSET_VERSION = "1.0.0";
var WALLPAPER_ASSET_NAMES = Object.freeze({
  morning: "asuka-after-class.webp",
  noon: "asuka-noon.webp",
  night: "asuka-tokyo3-night.webp"
});
var WALLPAPER_LAYER_PROFILES = Object.freeze({
  morning: {
    maskStart: "rgba(104, 59, 36, 0.90)",
    maskMiddle: "rgba(188, 118, 74, 0.68)",
    maskEnd: "rgba(239, 197, 151, 0.34)",
    filter: "saturate(0.86) sepia(0.14) brightness(0.9) contrast(0.96)"
  },
  noon: {
    maskStart: "rgba(224, 228, 224, 0.92)",
    maskMiddle: "rgba(230, 233, 229, 0.70)",
    maskEnd: "rgba(238, 240, 235, 0.36)",
    filter: "saturate(0.72) brightness(0.88) contrast(0.96)"
  },
  night: {
    maskStart: "rgba(23, 28, 36, 0.90)",
    maskMiddle: "rgba(23, 28, 36, 0.70)",
    maskEnd: "rgba(23, 28, 36, 0.42)",
    filter: "saturate(0.94) brightness(0.9) contrast(1.02)"
  }
});
function wallpaperLayerProfileForPeriod(period) {
  return WALLPAPER_LAYER_PROFILES[period];
}
function wallpaperAssetUrl(period) {
  return `${WALLPAPER_ROUTE_PREFIX}/${WALLPAPER_ASSET_NAMES[period]}?v=${WALLPAPER_ASSET_VERSION}`;
}
function wallpaperOpacityForPeriod(opacity, _period) {
  return Math.min(1, Math.max(0, Math.round(opacity * 100) / 100));
}

// src/client/wallpaper/runtime.ts
var ATTRIBUTE_ENABLED = "data-asuka-school-wallpaper";
var ATTRIBUTE_MODE = "data-asuka-school-mode";
var ATTRIBUTE_DETAILS = "data-asuka-school-details";
var ATTRIBUTE_REDUCED_MOTION = "data-asuka-school-reduce-motion";
var ATTRIBUTE_SCENE = "data-asuka-school-scene";
var WALLPAPER_ROOT_ID = "asuka-school-wallpaper-root";
var WALLPAPER_LAYER_CLASS = "asuka-school-wallpaper-layer";
var activeLayerIndex = 0;
var activePeriod;
function applyWallpaper(settings, period) {
  if (typeof document === "undefined" || document.body === null) return;
  const body = document.body;
  const enabled = settings.mode !== "off" && settings.wallpaperEnabled;
  body.setAttribute(ATTRIBUTE_ENABLED, enabled ? "true" : "false");
  body.setAttribute(ATTRIBUTE_MODE, settings.mode);
  body.setAttribute(ATTRIBUTE_DETAILS, settings.decorativeDetails ? "true" : "false");
  body.setAttribute(ATTRIBUTE_REDUCED_MOTION, settings.reduceMotion ? "true" : "false");
  body.setAttribute(ATTRIBUTE_SCENE, period);
  const root = document.getElementById(WALLPAPER_ROOT_ID);
  if (!enabled) {
    if (root !== null) root.dataset.enabled = "false";
    return;
  }
  const created = root === null;
  const layers = getWallpaperLayers(root ?? createWallpaperRoot());
  const wallpaperRoot = layers[0].parentElement;
  const wasEnabled = wallpaperRoot.dataset.enabled === "true";
  wallpaperRoot.style.setProperty("--asuka-wallpaper-opacity", String(wallpaperOpacityForPeriod(settings.wallpaperOpacity, period)));
  wallpaperRoot.style.setProperty("--asuka-wallpaper-blur", `${settings.wallpaperBlurPx}px`);
  if (period === activePeriod) {
    if (!wasEnabled) {
      wallpaperRoot.dataset.enabled = "false";
      void wallpaperRoot.offsetWidth;
      wallpaperRoot.dataset.enabled = "true";
    }
    return;
  }
  const nextIndex = activePeriod === void 0 ? activeLayerIndex : 1 - activeLayerIndex;
  const nextLayer = layers[nextIndex];
  const previousLayer = layers[1 - nextIndex];
  const profile = wallpaperLayerProfileForPeriod(period);
  nextLayer.style.setProperty("--asuka-wallpaper-image", `url("${wallpaperAssetUrl(period)}")`);
  nextLayer.style.setProperty("--asuka-wallpaper-mask-start", profile.maskStart);
  nextLayer.style.setProperty("--asuka-wallpaper-mask-middle", profile.maskMiddle);
  nextLayer.style.setProperty("--asuka-wallpaper-mask-end", profile.maskEnd);
  nextLayer.style.setProperty("--asuka-wallpaper-filter", profile.filter);
  nextLayer.dataset.active = "false";
  if (created) wallpaperRoot.dataset.enabled = "false";
  void nextLayer.offsetWidth;
  wallpaperRoot.dataset.enabled = "true";
  nextLayer.dataset.active = "true";
  previousLayer.dataset.active = "false";
  activeLayerIndex = nextIndex;
  activePeriod = period;
}
function clearWallpaper() {
  if (typeof document === "undefined") return;
  const body = document.body;
  body.removeAttribute(ATTRIBUTE_ENABLED);
  body.removeAttribute(ATTRIBUTE_MODE);
  body.removeAttribute(ATTRIBUTE_DETAILS);
  body.removeAttribute(ATTRIBUTE_REDUCED_MOTION);
  body.removeAttribute(ATTRIBUTE_SCENE);
  document.getElementById(WALLPAPER_ROOT_ID)?.remove();
  activeLayerIndex = 0;
  activePeriod = void 0;
}
function createWallpaperRoot() {
  const root = document.createElement("div");
  root.id = WALLPAPER_ROOT_ID;
  root.setAttribute("aria-hidden", "true");
  root.dataset.enabled = "false";
  for (let index = 0; index < 2; index += 1) {
    const layer = document.createElement("div");
    layer.className = WALLPAPER_LAYER_CLASS;
    layer.dataset.active = "false";
    root.append(layer);
  }
  document.body.prepend(root);
  return root;
}
function getWallpaperLayers(root) {
  const layers = Array.from(root.getElementsByClassName(WALLPAPER_LAYER_CLASS));
  if (layers.length !== 2) {
    root.replaceChildren();
    activeLayerIndex = 0;
    activePeriod = void 0;
    for (let index = 0; index < 2; index += 1) {
      const layer = document.createElement("div");
      layer.className = WALLPAPER_LAYER_CLASS;
      layer.dataset.active = "false";
      root.append(layer);
    }
    return getWallpaperLayers(root);
  }
  return [layers[0], layers[1]];
}

// src/client/controller.ts
function createAsukaThemeController(options) {
  const { settings, syncView } = options;
  let current = DEFAULT_ASUKA_SETTINGS;
  let wallpaperTimer;
  let pendingScene;
  const syncScene = () => {
    if (wallpaperTimer !== void 0) clearTimeout(wallpaperTimer);
    const period = resolveWallpaperPeriod(current.wallpaperPeriod);
    const presentationMode = resolveAsukaPresentationMode(current.mode, current.wallpaperPeriod, period);
    applyAsukaPresentation(presentationMode, period, current.reduceMotion);
    applyWallpaper(current, period);
    if (current.mode === "off" || !current.wallpaperEnabled || current.wallpaperPeriod !== "auto") return;
    wallpaperTimer = setTimeout(syncScene, millisecondsUntilNextWallpaperPeriod());
  };
  const present = (status, revision) => {
    syncView({ status, settings: current, revision });
    if (status !== "ready") return;
    syncScene();
  };
  const syncFromSettings = () => {
    const snapshot = settings.getSnapshot();
    const persisted = snapshot.value ?? DEFAULT_ASUKA_SETTINGS;
    if (pendingScene !== void 0) {
      const complete = persisted.mode === pendingScene.mode && persisted.wallpaperEnabled === pendingScene.wallpaperEnabled && persisted.wallpaperPeriod === pendingScene.wallpaperPeriod;
      if (!complete) {
        present(snapshot.status, snapshot.revision ?? -1);
        return;
      }
      pendingScene = void 0;
    }
    current = persisted;
    present(snapshot.status, snapshot.revision ?? -1);
  };
  const unsubscribe = settings.subscribe(syncFromSettings);
  syncFromSettings();
  return {
    setMode: (mode) => {
      if (!isAsukaMode(mode)) return;
      pendingScene = void 0;
      void settings.set("mode", mode);
    },
    setScene: (period) => {
      const mode = period === "night" ? "tokyo3-night" : "after-class";
      const snapshot = settings.getSnapshot();
      pendingScene = {
        ...snapshot.value ?? current,
        mode,
        wallpaperEnabled: true,
        wallpaperPeriod: period
      };
      current = pendingScene;
      present(snapshot.status, snapshot.revision ?? -1);
      void Promise.all([
        settings.set("mode", mode),
        settings.set("wallpaperEnabled", true),
        settings.set("wallpaperPeriod", period)
      ]).catch(() => {
        pendingScene = void 0;
        syncFromSettings();
      });
    },
    setWallpaperEnabled: (value) => {
      void settings.set("wallpaperEnabled", Boolean(value));
    },
    setWallpaperPeriod: (value) => {
      if (["auto", "morning", "noon", "night"].includes(value)) void settings.set("wallpaperPeriod", value);
    },
    setOpacity: (value) => {
      void settings.set("wallpaperOpacity", clampOpacity(value));
    },
    setBlur: (value) => {
      void settings.set("wallpaperBlurPx", clampBlur(value));
    },
    setDecorativeDetails: (value) => {
      void settings.set("decorativeDetails", Boolean(value));
    },
    setReduceMotion: (value) => {
      void settings.set("reduceMotion", Boolean(value));
    },
    reset: () => {
      for (const field of Object.keys(DEFAULT_ASUKA_SETTINGS)) void settings.unset(field);
    },
    dispose: () => {
      unsubscribe();
      if (wallpaperTimer !== void 0) clearTimeout(wallpaperTimer);
      clearAsukaPresentation();
      clearWallpaper();
    }
  };
}

// src/client/locales.ts
var ASUKA_LOCALE_NAMESPACE = "settings.asuka-school";
var asukaLocales = {
  zh: {
    "quick.kicker": "ASUKA // 02",
    "quick.label": "\u660E\u65E5\u9999\u5B66\u56ED",
    "quick.description": "\u9009\u62E9\u65E9\u3001\u4E2D\u3001\u665A\u573A\u666F\uFF0C\u6216\u8BA9 DeepSeek Harness \u4FDD\u6301\u539F\u6709\u5916\u89C2\u3002",
    "mode.off": "\u5173\u95ED",
    "mode.afterClass": "\u4E0A\u5B66\u8DEF\u4E0A",
    "mode.tokyo3Night": "\u4E1C\u4EAC-3 \u591C",
    "scene.morning": "\u4E0A\u5B66\u8DEF\u4E0A",
    "scene.noon": "\u5348\u95F4\u6559\u5BA4",
    "scene.night": "\u4E1C\u4EAC-3 \u591C",
    "scene.morningDetail": "\u6E05\u6668\u8857\u9053 \xB7 \u6821\u670D\u84DD \xB7 \u9886\u7ED3\u7EA2",
    "scene.noonDetail": "\u660E\u4EAE\u6559\u5BA4 \xB7 \u4E2D\u6027\u65E5\u5149 \xB7 \u7A97\u5916\u57CE\u5E02",
    "scene.nightDetail": "\u591C\u84DD \xB7 \u57CE\u5E02\u706F\u5149 \xB7 EVA-02 \u4F59\u70EC",
    "section.title": "Theme-Asuka",
    "section.kicker": "ASUKA // 02",
    "section.heading": "\u65E9\u4E2D\u665A\u7684\u5DE5\u4F5C\u53F0",
    "section.description": "\u4E0A\u5B66\u8DEF\u4E0A\u3001\u5348\u95F4\u6559\u5BA4\u4E0E\u4E1C\u4EAC-3 \u591C\uFF1B\u89C6\u89C9\u4E0A\u9C9C\u660E\uFF0C\u5DE5\u4F5C\u65F6\u4F9D\u65E7\u5B89\u9759\u3002",
    "section.themeLabel": "\u573A\u666F\u9884\u8BBE",
    "section.wallpaperLabel": "\u58C1\u7EB8",
    "section.wallpaperHint": "\u4EC5\u5728\u542F\u7528\u660E\u65E5\u9999\u4E3B\u9898\u65F6\u663E\u793A\uFF0C\u5E76\u59CB\u7EC8\u4FDD\u6301\u5728\u5DE5\u4F5C\u5185\u5BB9\u4E4B\u540E\u3002",
    "section.periodLabel": "\u58C1\u7EB8\u65F6\u6BB5",
    "section.periodHint": "\u81EA\u52A8\u6A21\u5F0F\u6309\u672C\u673A\u65F6\u95F4\u5728\u8FB9\u754C\u5E73\u6ED1\u5207\u6362\uFF1B\u4E5F\u53EF\u624B\u52A8\u9501\u5B9A\u4EE5\u9884\u89C8\u3002",
    "section.opacityLabel": "\u58C1\u7EB8\u900F\u660E\u5EA6",
    "section.opacityValue": "{value}%",
    "section.blurLabel": "\u58C1\u7EB8\u6A21\u7CCA",
    "section.blurValue": "{value}px",
    "section.decorativeLabel": "\u88C5\u9970\u7EC6\u8282",
    "section.decorativeHint": "\u663E\u793A\u6A59\u8272\u9009\u4E2D\u8F68\u4E0E\u4E3B\u9898\u4E13\u5C5E\u8BBE\u7F6E\u9875\u7EC6\u8282\u3002",
    "section.motionLabel": "\u51CF\u5C11\u52A8\u6001\u6548\u679C",
    "section.motionHint": "\u5173\u95ED\u58C1\u7EB8\u6DE1\u5165\u548C\u4E3B\u9898\u8FC7\u6E21\u3002",
    "section.assetsLabel": "\u516C\u5F00\u58C1\u7EB8\u8D44\u4EA7",
    "section.assetsValue": "3 \u5F20\u539F\u521B\u751F\u6210 WebP\uFF08\u65E9 / \u5348 / \u665A\uFF0C\u968F\u63D2\u4EF6\u53D1\u5E03\uFF09",
    "section.interface": "\u754C\u9762",
    "section.afterClassDetail": "\u6E05\u6668\u8857\u9053 \xB7 \u6821\u670D\u84DD \xB7 \u9886\u7ED3\u7EA2",
    "section.tokyo3NightDetail": "\u591C\u84DD \xB7 \u57CE\u5E02\u706F\u5149 \xB7 EVA-02 \u4F59\u70EC",
    "section.offDetail": "\u6062\u590D\u5F53\u524D DSH \u5916\u89C2",
    "section.reset": "\u91CD\u7F6E\u660E\u65E5\u9999\u8BBE\u7F6E",
    "section.loading": "\u6B63\u5728\u8BFB\u53D6 DSH \u8BBE\u7F6E\u2026",
    "timing.auto": "\u81EA\u52A8\uFF08\u6309\u672C\u673A\u65F6\u95F4\uFF09",
    "timing.morning": "\u65E9 \xB7 06:00\u201311:00",
    "timing.noon": "\u5348 \xB7 11:00\u201317:00",
    "timing.night": "\u665A \xB7 17:00\u2013\u6B21\u65E5 06:00"
  },
  en: {
    "quick.kicker": "ASUKA // 02",
    "quick.label": "Asuka School",
    "quick.description": "Pick a morning, noon, or night scene, or leave DeepSeek Harness exactly as it is.",
    "mode.off": "Off",
    "mode.afterClass": "On the Way to School",
    "mode.tokyo3Night": "Tokyo-3 Night",
    "scene.morning": "On the Way to School",
    "scene.noon": "Noon Classroom",
    "scene.night": "Tokyo-3 Night",
    "scene.morningDetail": "Morning street \xB7 school blue \xB7 ribbon red",
    "scene.noonDetail": "Bright classroom \xB7 neutral daylight \xB7 city window",
    "scene.nightDetail": "Night navy \xB7 city light \xB7 EVA-02 ember",
    "section.title": "Theme-Asuka",
    "section.kicker": "ASUKA // 02",
    "section.heading": "A desk through the day",
    "section.description": "Morning commute, noon classroom, and Tokyo-3 night: lively to look at, quiet to work in.",
    "section.themeLabel": "Scene presets",
    "section.wallpaperLabel": "Wallpaper",
    "section.wallpaperHint": "Only appears while an Asuka theme is active and always stays behind your work.",
    "section.periodLabel": "Wallpaper time",
    "section.periodHint": "Auto follows local time and crossfades at each boundary; choose a period to preview it manually.",
    "section.opacityLabel": "Wallpaper opacity",
    "section.opacityValue": "{value}%",
    "section.blurLabel": "Wallpaper blur",
    "section.blurValue": "{value}px",
    "section.decorativeLabel": "Decorative details",
    "section.decorativeHint": "Show the orange selection rail and Asuka-specific settings details.",
    "section.motionLabel": "Reduce motion",
    "section.motionHint": "Disable wallpaper fades and theme transitions.",
    "section.assetsLabel": "Public wallpaper assets",
    "section.assetsValue": "3 original generated WebPs for morning, noon, and night, shipped with the plugin",
    "section.interface": "Interface",
    "section.afterClassDetail": "Morning street \xB7 school blue \xB7 ribbon red",
    "section.tokyo3NightDetail": "Night navy \xB7 city light \xB7 EVA-02 ember",
    "section.offDetail": "Return to the current DSH appearance",
    "section.reset": "Reset Asuka settings",
    "section.loading": "Reading DSH settings\u2026",
    "timing.auto": "Auto (local time)",
    "timing.morning": "Morning \xB7 06:00\u201311:00",
    "timing.noon": "Noon \xB7 11:00\u201317:00",
    "timing.night": "Night \xB7 17:00\u201306:00"
  }
};

// src/client/settings/AsukaQuickRow.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var SCENES = ["off", "morning", "noon", "night"];
function AsukaQuickRow({ t, useStore, setMode, setScene }) {
  const { settings, status } = useStore((state) => state);
  const disabled = status !== "ready";
  const selectedScene = settings.mode === "off" ? "off" : resolveWallpaperPeriod(settings.wallpaperPeriod);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "asuka-quick-row", "aria-label": t("quick.label"), children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "asuka-quick-copy", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "asuka-kicker", children: t("quick.kicker") }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t("quick.label") }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: disabled ? t("section.loading") : t("quick.description") })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "asuka-mode-switch", role: "group", "aria-label": t("quick.label"), children: SCENES.map((scene) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "button",
      {
        className: "asuka-mode-button",
        type: "button",
        "aria-pressed": selectedScene === scene,
        disabled,
        onClick: () => scene === "off" ? setMode("off") : setScene(scene),
        children: scene === "off" ? t("mode.off") : t(`scene.${scene}`)
      },
      scene
    )) })
  ] });
}

// src/client/settings/AsukaSection.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function AsukaSection({
  t,
  useStore,
  setMode,
  setScene,
  setWallpaperEnabled,
  setWallpaperPeriod,
  setOpacity,
  setBlur,
  setDecorativeDetails,
  setReduceMotion,
  reset
}) {
  const { settings, status } = useStore((state) => state);
  const disabled = status !== "ready";
  const percentage = Math.round(settings.wallpaperOpacity * 100);
  const selectedScene = settings.mode === "off" ? "off" : resolveWallpaperPeriod(settings.wallpaperPeriod);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: "asuka-section", "aria-labelledby": "asuka-school-title", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("header", { className: "asuka-section-header", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "asuka-kicker", children: t("section.kicker") }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h2", { id: "asuka-school-title", children: t("section.heading") }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: t("section.description") })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("fieldset", { className: "asuka-setting-group", disabled, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("legend", { children: t("section.themeLabel") }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "asuka-theme-cards", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SceneCard, { scene: "morning", selected: selectedScene === "morning", onSelect: setScene, title: t("scene.morning"), detail: t("scene.morningDetail") }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SceneCard, { scene: "noon", selected: selectedScene === "noon", onSelect: setScene, title: t("scene.noon"), detail: t("scene.noonDetail") }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SceneCard, { scene: "night", selected: selectedScene === "night", onSelect: setScene, title: t("scene.night"), detail: t("scene.nightDetail") }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ThemeCard, { mode: "off", selected: settings.mode === "off", onSelect: setMode, title: t("mode.off"), detail: t("section.offDetail") })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("fieldset", { className: "asuka-setting-group", disabled: disabled || settings.mode === "off", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("legend", { children: t("section.wallpaperLabel") }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ToggleRow, { label: t("section.wallpaperLabel"), hint: t("section.wallpaperHint"), checked: settings.wallpaperEnabled, onChange: setWallpaperEnabled }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        TimingRow,
        {
          label: t("section.periodLabel"),
          hint: t("section.periodHint"),
          value: settings.wallpaperPeriod,
          onChange: setWallpaperPeriod,
          options: { auto: t("timing.auto"), morning: t("timing.morning"), noon: t("timing.noon"), night: t("timing.night") }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(RangeRow, { label: t("section.opacityLabel"), value: percentage, min: 0, max: 100, suffix: "%", onChange: (event) => setOpacity(Number(event.currentTarget.value) / 100) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(RangeRow, { label: t("section.blurLabel"), value: settings.wallpaperBlurPx, min: 0, max: 20, suffix: "px", onChange: (event) => setBlur(Number(event.currentTarget.value)) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("fieldset", { className: "asuka-setting-group", disabled, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("legend", { children: t("section.interface") }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ToggleRow, { label: t("section.decorativeLabel"), hint: t("section.decorativeHint"), checked: settings.decorativeDetails, onChange: setDecorativeDetails }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ToggleRow, { label: t("section.motionLabel"), hint: t("section.motionHint"), checked: settings.reduceMotion, onChange: setReduceMotion })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("footer", { className: "asuka-section-footer", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("b", { children: t("section.assetsLabel") }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("br", {}),
        t("section.assetsValue")
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "asuka-reset-button", type: "button", disabled, onClick: reset, children: t("section.reset") })
    ] })
  ] });
}
function TimingRow({ label, hint, value, onChange, options }) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("label", { className: "asuka-select-row", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("b", { children: label }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("small", { children: hint })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("select", { value, onChange: (event) => onChange(event.currentTarget.value), children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "auto", children: options.auto }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "morning", children: options.morning }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "noon", children: options.noon }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "night", children: options.night })
    ] })
  ] });
}
function SceneCard({ scene, selected, onSelect, title, detail }) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { type: "button", className: "asuka-theme-card", "aria-pressed": selected, onClick: () => onSelect(scene), children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: `asuka-theme-swatch asuka-theme-swatch-${scene}`, "aria-hidden": "true" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("b", { children: title }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("small", { children: detail })
    ] })
  ] });
}
function ThemeCard({ mode, selected, onSelect, title, detail }) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { type: "button", className: "asuka-theme-card", "aria-pressed": selected, onClick: () => onSelect(mode), children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: `asuka-theme-swatch asuka-theme-swatch-${mode}`, "aria-hidden": "true" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("b", { children: title }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("small", { children: detail })
    ] })
  ] });
}
function ToggleRow({ label, hint, checked, onChange }) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("label", { className: "asuka-toggle-row", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("b", { children: label }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("small", { children: hint })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "checkbox", checked, onChange: (event) => onChange(event.currentTarget.checked) })
  ] });
}
function RangeRow({ label, value, min, max, suffix, onChange }) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("label", { className: "asuka-range-row", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("b", { children: label }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("small", { children: [
        value,
        suffix
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "range", min, max, value, onChange })
  ] });
}

// src/client/settings/settings-store.ts
var import_client = require("@deepseek-ai/dsh-client-runtime/client");
function createAsukaSettingsStore() {
  return (0, import_client.defineStore)({
    init: () => ({
      status: "loading",
      settings: { ...DEFAULT_ASUKA_SETTINGS },
      revision: -1
    }),
    actions: {
      sync: (draft, next) => {
        draft.status = next.status;
        draft.settings = next.settings;
        draft.revision = next.revision;
      }
    }
  });
}

// src/client/styles.ts
var STYLE_ID = "dsh-asuka-school-theme-styles";
var ASUKA_STYLES = String.raw`
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
`;
function installAsukaStyles() {
  if (typeof document === "undefined") return () => void 0;
  const existing = document.getElementById(STYLE_ID);
  if (existing !== null) return () => void 0;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = ASUKA_STYLES;
  document.head.append(style);
  return () => style.remove();
}

// src/client/index.ts
var inject = ["slots", "locale", "connection", "remote", "settingsScope"];
function apply(ctx) {
  ctx.effect(() => installAsukaStyles(), "asuka-school-theme: owned styles");
  ctx.effect(() => ctx.locale.register(ASUKA_LOCALE_NAMESPACE, asukaLocales), "asuka-school-theme: locales");
  const scope = ctx.settingsScope.bind({ namespace: ASUKA_SETTINGS_NAMESPACE_ID });
  const store = createAsukaSettingsStore();
  let actions;
  const controller = createAsukaThemeController({
    settings: scope,
    syncView: (next) => actions?.sync(next)
  });
  ctx.effect(() => () => controller.dispose(), "asuka-school-theme: controller");
  const injectActions = (bound) => {
    actions = bound;
    const snapshot = scope.getSnapshot();
    actions.sync({
      status: snapshot.status,
      settings: snapshot.value ?? { ...DEFAULT_ASUKA_SETTINGS },
      revision: snapshot.revision ?? -1
    });
    return controller;
  };
  ctx.slots.inject("settings.general.item", () => ctx.slots.register({
    name: "settings.general.item",
    id: "asuka-school-theme",
    order: 40,
    store,
    locale: ASUKA_LOCALE_NAMESPACE,
    inject: injectActions
  }, AsukaQuickRow));
  const sectionLabel = ctx.locale.bind(ASUKA_LOCALE_NAMESPACE);
  ctx.slots.inject("settings.section", () => ctx.slots.register({
    name: "settings.section",
    id: "asuka-school-theme",
    order: 40,
    label: () => sectionLabel("section.title"),
    store,
    locale: ASUKA_LOCALE_NAMESPACE,
    inject: injectActions
  }, AsukaSection));
}

    return module.exports;
  },
});
