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
    "--asuka-code-block-sticky-mask": ASUKA_COLORS.nightNavy,
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
  "--asuka-code-block-sticky-mask": "#E8E9E4",
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
  "--dsw-alias-label-secondary": "#354B59",
  "--dsw-alias-label-tertiary": "#465C69",
  "--dsw-alias-label-caption": "#405663",
  "--dsw-alias-label-dimmed": "#536874",
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
    "--asuka-code-block-sticky-mask": "#DBC4B0",
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
  const draft = document.createElement("div");
  draft.style.cssText = body.style.cssText;
  let changed = false;
  for (const [name, value] of Object.entries(definition.tokens)) {
    if (!baseline.tokens.has(name)) baseline.tokens.set(name, readInlineProperty(body, name));
    if (body.style.getPropertyValue(name) !== value || body.style.getPropertyPriority(name) !== "important") {
      draft.style.setProperty(name, value, "important");
      changed = true;
    }
  }
  if (changed) body.style.cssText = draft.style.cssText;
}
function clearAsukaPresentation() {
  if (typeof document === "undefined" || document.body === null || baseline === void 0) return;
  const body = document.body;
  const root = document.documentElement;
  body.removeAttribute(THEME_ATTRIBUTE);
  body.removeAttribute(REDUCED_MOTION_ATTRIBUTE);
  body.toggleAttribute("data-ds-dark-theme", baseline.darkTheme);
  writeInlineProperty(root, "color-scheme", baseline.colorScheme);
  const draft = document.createElement("div");
  draft.style.cssText = body.style.cssText;
  for (const [name, property] of baseline.tokens) writeInlineProperty(draft, name, property);
  if (body.style.cssText !== draft.style.cssText) body.style.cssText = draft.style.cssText;
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
var WALLPAPER_ASSET_VERSION = "2.2.1";
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
var pendingPeriod;
var requestToken = 0;
var preloadTimer;
var preloadIdleHandle;
var preloadFallbackTimer;
var preloaded;
var decodedImages = /* @__PURE__ */ new Map();
var wallpaperEnabled = false;
var autoPreloadEnabled = false;
var preloadGeneration = 0;
var scheduledFrames = /* @__PURE__ */ new Set();
var scheduledFrameFallbacks = /* @__PURE__ */ new Set();
var CROSSFADE_SETTLE_MS = 620;
function applyWallpaper(settings, period) {
  if (typeof document === "undefined" || document.body === null) return;
  const body = document.body;
  const enabled = settings.mode !== "off" && settings.wallpaperEnabled;
  wallpaperEnabled = enabled;
  autoPreloadEnabled = enabled && settings.wallpaperPeriod === "auto";
  body.setAttribute(ATTRIBUTE_ENABLED, enabled ? "true" : "false");
  body.setAttribute(ATTRIBUTE_MODE, settings.mode);
  body.setAttribute(ATTRIBUTE_DETAILS, settings.decorativeDetails ? "true" : "false");
  body.setAttribute(ATTRIBUTE_REDUCED_MOTION, settings.reduceMotion ? "true" : "false");
  body.setAttribute(ATTRIBUTE_SCENE, period);
  const root = document.getElementById(WALLPAPER_ROOT_ID);
  if (!enabled) {
    requestToken += 1;
    pendingPeriod = void 0;
    cancelScheduledFrames();
    cancelPreload();
    preloaded = void 0;
    if (root !== null) root.dataset.enabled = "false";
    return;
  }
  const created = root === null;
  const layers = getWallpaperLayers(root ?? createWallpaperRoot());
  const wallpaperRoot = layers[0].parentElement;
  const wasEnabled = wallpaperRoot.dataset.enabled === "true";
  updateWallpaperAppearance(settings.wallpaperOpacity, settings.wallpaperBlurPx, period);
  if (period === activePeriod) {
    if (pendingPeriod !== void 0) {
      requestToken += 1;
      pendingPeriod = void 0;
    }
    if (!wasEnabled) {
      const token2 = ++requestToken;
      cancelScheduledFrames();
      wallpaperRoot.dataset.enabled = "false";
      scheduleFrame(() => {
        if (token2 !== requestToken || !wallpaperEnabled || !wallpaperRoot.isConnected) return;
        wallpaperRoot.dataset.enabled = "true";
      });
    }
    if (autoPreloadEnabled) scheduleNextPreload(period);
    else cancelPreload();
    return;
  }
  if (period === pendingPeriod) return;
  pendingPeriod = period;
  const token = ++requestToken;
  cancelScheduledFrames();
  cancelPreload();
  const url = wallpaperAssetUrl(period);
  void ensurePeriodReady(period, url).then((ready) => {
    if (token !== requestToken || pendingPeriod !== period) return;
    if (!ready) {
      pendingPeriod = void 0;
      return;
    }
    commitWallpaperScene(wallpaperRoot, period, url, created, token);
  });
}
function updateWallpaperAppearance(opacity, blurPx, period) {
  if (typeof document === "undefined") return;
  const root = document.getElementById(WALLPAPER_ROOT_ID);
  if (root === null) return;
  root.style.setProperty("--asuka-wallpaper-opacity", String(wallpaperOpacityForPeriod(opacity, period)));
  root.style.setProperty("--asuka-wallpaper-blur", `${blurPx}px`);
}
function commitWallpaperScene(wallpaperRoot, period, url, created, token) {
  const layers = getWallpaperLayers(wallpaperRoot);
  const nextIndex = activePeriod === void 0 ? activeLayerIndex : 1 - activeLayerIndex;
  const nextLayer = layers[nextIndex];
  const previousLayer = layers[1 - nextIndex];
  const profile = wallpaperLayerProfileForPeriod(period);
  nextLayer.style.setProperty("--asuka-wallpaper-image", `url("${url}")`);
  nextLayer.style.setProperty("--asuka-wallpaper-mask-start", profile.maskStart);
  nextLayer.style.setProperty("--asuka-wallpaper-mask-middle", profile.maskMiddle);
  nextLayer.style.setProperty("--asuka-wallpaper-mask-end", profile.maskEnd);
  nextLayer.style.setProperty("--asuka-wallpaper-filter", profile.filter);
  nextLayer.dataset.active = "false";
  if (created) wallpaperRoot.dataset.enabled = "false";
  scheduleFrame(() => {
    if (token !== requestToken || !wallpaperEnabled || !wallpaperRoot.isConnected) return;
    scheduleFrame(() => {
      if (token !== requestToken || !wallpaperEnabled || !wallpaperRoot.isConnected) return;
      wallpaperRoot.dataset.enabled = "true";
      nextLayer.dataset.active = "true";
      previousLayer.dataset.active = "false";
      activeLayerIndex = nextIndex;
      activePeriod = period;
      pendingPeriod = void 0;
      if (autoPreloadEnabled) scheduleNextPreload(period);
    });
  });
}
function clearWallpaper() {
  if (typeof document === "undefined") return;
  requestToken += 1;
  wallpaperEnabled = false;
  autoPreloadEnabled = false;
  pendingPeriod = void 0;
  cancelScheduledFrames();
  cancelPreload();
  preloaded = void 0;
  decodedImages.clear();
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
function loadAndDecodeImage(url) {
  if (typeof Image === "undefined") return Promise.resolve(true);
  const cached = decodedImages.get(url);
  if (cached !== void 0) return cached.ready;
  const image = new Image();
  const ready = new Promise((resolve) => {
    const finish = (success) => {
      image.onload = null;
      image.onerror = null;
      if (!success && decodedImages.get(url)?.image === image) decodedImages.delete(url);
      resolve(success);
    };
    image.onload = () => {
      if (typeof image.decode !== "function") {
        finish(true);
        return;
      }
      void image.decode().then(() => finish(true), () => finish(true));
    };
    image.onerror = () => finish(false);
  });
  decodedImages.set(url, { image, ready });
  image.src = url;
  return ready;
}
function ensurePeriodReady(period, url) {
  if (preloaded?.period !== period) return loadForScene(url);
  const candidate = preloaded;
  return candidate.ready.then((ready) => ready ? true : loadForScene(url)).finally(() => {
    if (preloaded === candidate) preloaded = void 0;
  });
}
async function loadForScene(url) {
  if (await loadAndDecodeImage(url)) return true;
  return loadAndDecodeImage(url);
}
function scheduleNextPreload(period) {
  cancelPreload();
  const generation = preloadGeneration;
  preloadTimer = setTimeout(() => {
    preloadTimer = void 0;
    if (generation !== preloadGeneration || !autoPreloadEnabled || !canPreload()) return;
    const nextPeriod = period === "morning" ? "noon" : period === "noon" ? "night" : "morning";
    const token = requestToken;
    const preload = () => {
      preloadIdleHandle = void 0;
      preloadFallbackTimer = void 0;
      if (generation !== preloadGeneration || !autoPreloadEnabled || token !== requestToken || activePeriod !== period) return;
      preloaded = { period: nextPeriod, ready: loadAndDecodeImage(wallpaperAssetUrl(nextPeriod)) };
    };
    const idle = window.requestIdleCallback;
    if (typeof idle === "function") preloadIdleHandle = idle(preload);
    else preloadFallbackTimer = setTimeout(preload, 0);
  }, CROSSFADE_SETTLE_MS);
}
function cancelPreload() {
  preloadGeneration += 1;
  if (preloadTimer !== void 0) clearTimeout(preloadTimer);
  preloadTimer = void 0;
  if (preloadIdleHandle !== void 0 && typeof window !== "undefined") {
    const cancelIdle = window.cancelIdleCallback;
    if (typeof cancelIdle === "function") cancelIdle(preloadIdleHandle);
  }
  preloadIdleHandle = void 0;
  if (preloadFallbackTimer !== void 0) clearTimeout(preloadFallbackTimer);
  preloadFallbackTimer = void 0;
}
function canPreload() {
  if (document.visibilityState === "hidden") return false;
  if (typeof navigator === "undefined") return true;
  const connection = navigator.connection;
  if (connection?.saveData === true) return false;
  return connection?.effectiveType !== "slow-2g" && connection?.effectiveType !== "2g";
}
function scheduleFrame(callback) {
  if (typeof requestAnimationFrame === "function") {
    const handle2 = requestAnimationFrame(() => {
      scheduledFrames.delete(handle2);
      callback();
    });
    scheduledFrames.add(handle2);
    return;
  }
  const handle = setTimeout(() => {
    scheduledFrameFallbacks.delete(handle);
    callback();
  }, 0);
  scheduledFrameFallbacks.add(handle);
}
function cancelScheduledFrames() {
  if (typeof cancelAnimationFrame === "function") {
    for (const handle of scheduledFrames) cancelAnimationFrame(handle);
  }
  scheduledFrames.clear();
  for (const handle of scheduledFrameFallbacks) clearTimeout(handle);
  scheduledFrameFallbacks.clear();
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
  let applied;
  let disposed = false;
  const syncScene = (fromTimer = false) => {
    if (disposed) return;
    const period = resolveWallpaperPeriod(current.wallpaperPeriod);
    const presentationMode = resolveAsukaPresentationMode(current.mode, current.wallpaperPeriod, period);
    const previous = applied;
    if (previous === void 0 || previous.presentationMode !== presentationMode || previous.period !== period || previous.settings.reduceMotion !== current.reduceMotion) {
      applyAsukaPresentation(presentationMode, period, current.reduceMotion);
    }
    const wallpaperStructureChanged = previous === void 0 || previous.period !== period || previous.settings.mode !== current.mode || previous.settings.wallpaperEnabled !== current.wallpaperEnabled || previous.settings.wallpaperPeriod !== current.wallpaperPeriod || previous.settings.decorativeDetails !== current.decorativeDetails || previous.settings.reduceMotion !== current.reduceMotion;
    if (wallpaperStructureChanged) applyWallpaper(current, period);
    else if (previous.settings.wallpaperOpacity !== current.wallpaperOpacity || previous.settings.wallpaperBlurPx !== current.wallpaperBlurPx) {
      updateWallpaperAppearance(current.wallpaperOpacity, current.wallpaperBlurPx, period);
    }
    applied = { settings: { ...current }, period, presentationMode };
    const timerInputsChanged = fromTimer || previous === void 0 || previous.settings.mode !== current.mode || previous.settings.wallpaperEnabled !== current.wallpaperEnabled || previous.settings.wallpaperPeriod !== current.wallpaperPeriod;
    if (!timerInputsChanged) return;
    if (wallpaperTimer !== void 0) clearTimeout(wallpaperTimer);
    wallpaperTimer = void 0;
    if (current.mode === "off" || !current.wallpaperEnabled || current.wallpaperPeriod !== "auto") return;
    wallpaperTimer = setTimeout(() => syncScene(true), millisecondsUntilNextWallpaperPeriod());
  };
  const present = (status, revision) => {
    if (disposed) return;
    syncView({ status, settings: current, revision });
    if (status !== "ready") return;
    syncScene();
  };
  const syncFromSettings = () => {
    if (disposed) return;
    const snapshot = settings.getSnapshot();
    const persisted = snapshot.value ?? DEFAULT_ASUKA_SETTINGS;
    if (pendingScene !== void 0) {
      current = {
        ...persisted,
        mode: pendingScene.mode,
        wallpaperEnabled: pendingScene.wallpaperEnabled,
        wallpaperPeriod: pendingScene.wallpaperPeriod
      };
      present(snapshot.status, snapshot.revision ?? -1);
      return;
    }
    current = persisted;
    present(snapshot.status, snapshot.revision ?? -1);
  };
  const unsubscribe = settings.subscribe(syncFromSettings);
  syncFromSettings();
  return {
    setMode: (mode) => {
      if (disposed || !isAsukaMode(mode)) return;
      pendingScene = void 0;
      void settings.set("mode", mode);
    },
    setScene: (period) => {
      if (disposed) return;
      const mode = period === "night" ? "tokyo3-night" : "after-class";
      const snapshot = settings.getSnapshot();
      const nextScene = {
        ...snapshot.value ?? current,
        mode,
        wallpaperEnabled: true,
        wallpaperPeriod: period
      };
      pendingScene = nextScene;
      current = nextScene;
      present(snapshot.status, snapshot.revision ?? -1);
      const settleScene = () => {
        if (disposed || pendingScene !== nextScene) return;
        pendingScene = void 0;
        syncFromSettings();
      };
      void settings.mutate([
        { op: "set", path: ["mode"], value: mode },
        { op: "set", path: ["wallpaperEnabled"], value: true },
        { op: "set", path: ["wallpaperPeriod"], value: period }
      ]).then(settleScene, settleScene);
    },
    setWallpaperEnabled: (value) => {
      if (!disposed) void settings.set("wallpaperEnabled", Boolean(value));
    },
    setWallpaperPeriod: (value) => {
      if (!disposed && ["auto", "morning", "noon", "night"].includes(value)) void settings.set("wallpaperPeriod", value);
    },
    setOpacity: (value) => {
      if (!disposed) void settings.set("wallpaperOpacity", clampOpacity(value));
    },
    setBlur: (value) => {
      if (!disposed) void settings.set("wallpaperBlurPx", clampBlur(value));
    },
    previewOpacity: (value) => {
      if (disposed) return;
      updateWallpaperAppearance(clampOpacity(value), current.wallpaperBlurPx, resolveWallpaperPeriod(current.wallpaperPeriod));
    },
    previewBlur: (value) => {
      if (disposed) return;
      updateWallpaperAppearance(current.wallpaperOpacity, clampBlur(value), resolveWallpaperPeriod(current.wallpaperPeriod));
    },
    setDecorativeDetails: (value) => {
      if (!disposed) void settings.set("decorativeDetails", Boolean(value));
    },
    setReduceMotion: (value) => {
      if (!disposed) void settings.set("reduceMotion", Boolean(value));
    },
    reset: () => {
      if (disposed) return;
      pendingScene = void 0;
      void settings.mutate(Object.keys(DEFAULT_ASUKA_SETTINGS).map((field) => ({ op: "unset", path: [field] })));
    },
    dispose: () => {
      if (disposed) return;
      disposed = true;
      unsubscribe();
      if (wallpaperTimer !== void 0) clearTimeout(wallpaperTimer);
      clearAsukaPresentation();
      clearWallpaper();
      applied = void 0;
    }
  };
}

// src/client/locales.ts
var ASUKA_LOCALE_NAMESPACE = "settings.asuka-school";
var asukaLocales = {
  zh: {
    "quick.kicker": "ASUKA // 02",
    "quick.label": "Theme-Asuka",
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
    "section.decorativeHint": "\u663E\u793A\u6A59\u8272\u9009\u4E2D\u8F68\u3001\u4E3B\u9898\u4E13\u5C5E\u8BBE\u7F6E\u9875\u7EC6\u8282\u548C\u66F4\u9C9C\u660E\u7684\u73BB\u7483\u8FB9\u7F18\u9AD8\u5149\u3002",
    "section.motionLabel": "\u51CF\u5C11\u52A8\u6001\u6548\u679C",
    "section.motionHint": "\u5173\u95ED\u58C1\u7EB8\u6DE1\u5165\u3001\u4E3B\u9898\u8FC7\u6E21\u3001\u83DC\u5355\u52A8\u753B\u548C\u8DDF\u968F\u6307\u9488\u7684\u73BB\u7483\u9AD8\u5149\u3002",
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
    "timing.night": "\u665A \xB7 17:00\u2013\u6B21\u65E5 06:00",
    "sessionTitle.edit": "\u7F16\u8F91\u4F1A\u8BDD\u6807\u9898",
    "sessionTitle.field": "\u4F1A\u8BDD\u6807\u9898",
    "sessionTitle.confirm": "\u786E\u8BA4\u4FEE\u6539",
    "sessionTitle.cancel": "\u53D6\u6D88\u4FEE\u6539",
    "sessionTitle.saving": "\u6B63\u5728\u4FDD\u5B58\u4F1A\u8BDD\u6807\u9898",
    "sessionTitle.error": "\u65E0\u6CD5\u4FEE\u6539\u4F1A\u8BDD\u6807\u9898\uFF0C\u8BF7\u91CD\u8BD5\u3002"
  },
  en: {
    "quick.kicker": "ASUKA // 02",
    "quick.label": "Theme-Asuka",
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
    "section.decorativeHint": "Show the orange selection rail, Asuka-specific settings details and stronger glass rim highlights.",
    "section.motionLabel": "Reduce motion",
    "section.motionHint": "Disable wallpaper fades, theme transitions, menu animations and pointer-following glass highlights.",
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
    "timing.night": "Night \xB7 17:00\u201306:00",
    "sessionTitle.edit": "Edit session title",
    "sessionTitle.field": "Session title",
    "sessionTitle.confirm": "Save title",
    "sessionTitle.cancel": "Cancel title edit",
    "sessionTitle.saving": "Saving session title",
    "sessionTitle.error": "The session title could not be changed. Try again."
  }
};

// src/client/settings/AsukaQuickRow.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var SCENES = ["off", "morning", "noon", "night"];
function AsukaQuickRow({ t, useStore, setMode, setScene }) {
  const status = useStore((state) => state.status);
  const mode = useStore((state) => state.settings.mode);
  const wallpaperPeriod = useStore((state) => state.settings.wallpaperPeriod);
  const disabled = status !== "ready";
  const selectedScene = mode === "off" ? "off" : resolveWallpaperPeriod(wallpaperPeriod);
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
var import_react = require("react");

// src/client/settings/range-draft.ts
function reconcileRangeDraft(persisted, draft, dirty) {
  const next = dirty ? draft : persisted;
  return { draft: next, latest: next };
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
  previewOpacity,
  previewBlur,
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
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(RangeRow, { label: t("section.opacityLabel"), value: percentage, min: 0, max: 100, suffix: "%", onPreview: (value) => previewOpacity(value / 100), onCommit: (value) => setOpacity(value / 100) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(RangeRow, { label: t("section.blurLabel"), value: settings.wallpaperBlurPx, min: 0, max: 20, suffix: "px", onPreview: previewBlur, onCommit: setBlur })
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
function RangeRow({ label, value, min, max, suffix, onPreview, onCommit }) {
  const [draft, setDraft] = (0, import_react.useState)(value);
  const frameRef = (0, import_react.useRef)();
  const commitTimerRef = (0, import_react.useRef)();
  const latestRef = (0, import_react.useRef)(value);
  const dirtyRef = (0, import_react.useRef)(false);
  const persistedRef = (0, import_react.useRef)(value);
  const previewRef = (0, import_react.useRef)(onPreview);
  previewRef.current = onPreview;
  (0, import_react.useEffect)(() => {
    persistedRef.current = value;
    const reconciled = reconcileRangeDraft(value, draft, dirtyRef.current);
    if (!dirtyRef.current) {
      setDraft(reconciled.draft);
      latestRef.current = reconciled.latest;
    }
  }, [value]);
  (0, import_react.useEffect)(() => () => {
    if (frameRef.current !== void 0) cancelAnimationFrame(frameRef.current);
    if (commitTimerRef.current !== void 0) clearTimeout(commitTimerRef.current);
    if (dirtyRef.current) previewRef.current(persistedRef.current);
  }, []);
  const flushCommit = () => {
    if (commitTimerRef.current !== void 0) clearTimeout(commitTimerRef.current);
    commitTimerRef.current = void 0;
    if (!dirtyRef.current) return;
    dirtyRef.current = false;
    onCommit(latestRef.current);
  };
  const handleChange = (event) => {
    const next = Number(event.currentTarget.value);
    latestRef.current = next;
    dirtyRef.current = true;
    setDraft(next);
    if (frameRef.current !== void 0) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = void 0;
      onPreview(latestRef.current);
    });
    if (commitTimerRef.current !== void 0) clearTimeout(commitTimerRef.current);
    commitTimerRef.current = setTimeout(flushCommit, 140);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("label", { className: "asuka-range-row", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("b", { children: label }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("small", { children: [
        draft,
        suffix
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "range", min, max, value: draft, onChange: handleChange, onPointerUp: flushCommit, onKeyUp: flushCommit, onBlur: flushCommit })
  ] });
}

// src/client/settings/settings-store.ts
var import_dsh_client_store = require("@deepseek-ai/dsh-client-store");
function createAsukaSettingsStore() {
  return (0, import_dsh_client_store.defineStore)({
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

// src/client/session-title/SessionTitleEditor.tsx
var import_react2 = require("react");
var import_jsx_runtime3 = require("react/jsx-runtime");
function SessionTitleEditor({ sessionId, useSessions, renameTitle, t }) {
  const currentTitle = useSessions((state) => state.byId[sessionId]?.displayTitle ?? sessionId);
  const [editing, setEditing] = (0, import_react2.useState)(false);
  const [draft, setDraft] = (0, import_react2.useState)("");
  const [saving, setSaving] = (0, import_react2.useState)(false);
  const [error, setError] = (0, import_react2.useState)(null);
  const triggerRef = (0, import_react2.useRef)(null);
  const inputRef = (0, import_react2.useRef)(null);
  const composingRef = (0, import_react2.useRef)(false);
  const savingRef = (0, import_react2.useRef)(false);
  const mountedRef = (0, import_react2.useRef)(true);
  const focusTimerRef = (0, import_react2.useRef)();
  const trimmedDraft = draft.trim();
  (0, import_react2.useEffect)(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (focusTimerRef.current !== void 0) clearTimeout(focusTimerRef.current);
    };
  }, []);
  (0, import_react2.useEffect)(() => {
    if (!editing) return;
    inputRef.current?.focus();
    inputRef.current?.select();
  }, [editing]);
  const restoreTriggerFocus = (0, import_react2.useCallback)(() => {
    if (focusTimerRef.current !== void 0) clearTimeout(focusTimerRef.current);
    focusTimerRef.current = setTimeout(() => {
      focusTimerRef.current = void 0;
      triggerRef.current?.focus();
    }, 0);
  }, []);
  const openEditor = () => {
    setDraft(currentTitle);
    setError(null);
    setEditing(true);
  };
  const closeEditor = (0, import_react2.useCallback)(() => {
    if (savingRef.current) return;
    setEditing(false);
    setError(null);
    restoreTriggerFocus();
  }, [restoreTriggerFocus]);
  const confirmRename = (0, import_react2.useCallback)(async () => {
    const title = draft.trim();
    if (savingRef.current || title === "") return;
    savingRef.current = true;
    setSaving(true);
    setError(null);
    try {
      await renameTitle(title);
      if (!mountedRef.current) return;
      setEditing(false);
      restoreTriggerFocus();
    } catch (reason) {
      if (!mountedRef.current) return;
      const message = reason instanceof Error ? reason.message.trim() : String(reason).trim();
      setError(message || t("sessionTitle.error"));
      focusTimerRef.current = setTimeout(() => {
        focusTimerRef.current = void 0;
        inputRef.current?.focus();
      }, 0);
    } finally {
      savingRef.current = false;
      if (mountedRef.current) setSaving(false);
    }
  }, [draft, renameTitle, restoreTriggerFocus, t]);
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeEditor();
      return;
    }
    if (event.key !== "Enter" || composingRef.current || event.nativeEvent.isComposing) return;
    event.preventDefault();
    void confirmRename();
  };
  const handleBlur = (event) => {
    if (event.currentTarget.contains(event.relatedTarget)) return;
    closeEditor();
  };
  if (!editing) {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      "button",
      {
        ref: triggerRef,
        className: "asuka-session-title-trigger",
        type: "button",
        "aria-label": t("sessionTitle.edit"),
        title: t("sessionTitle.edit"),
        onClick: openEditor,
        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(EditIcon, {})
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
    "form",
    {
      className: "asuka-session-title-editor",
      "aria-label": t("sessionTitle.edit"),
      "aria-busy": saving,
      onSubmit: (event) => {
        event.preventDefault();
        void confirmRename();
      },
      onBlur: handleBlur,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "input",
          {
            ref: inputRef,
            className: "asuka-session-title-input",
            value: draft,
            "aria-label": t("sessionTitle.field"),
            "aria-invalid": error !== null || void 0,
            "aria-describedby": error === null ? void 0 : "asuka-session-title-error",
            autoFocus: true,
            disabled: saving,
            onFocus: (event) => event.currentTarget.select(),
            onChange: (event) => {
              setDraft(event.currentTarget.value);
              setError(null);
            },
            onCompositionStart: () => {
              composingRef.current = true;
            },
            onCompositionEnd: () => {
              composingRef.current = false;
            },
            onKeyDown: handleKeyDown
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "button",
          {
            className: "asuka-session-title-action asuka-session-title-confirm",
            type: "submit",
            "aria-label": saving ? t("sessionTitle.saving") : t("sessionTitle.confirm"),
            title: saving ? t("sessionTitle.saving") : t("sessionTitle.confirm"),
            disabled: saving || trimmedDraft === "",
            children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(CheckIcon, {})
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "button",
          {
            className: "asuka-session-title-action",
            type: "button",
            "aria-label": t("sessionTitle.cancel"),
            title: t("sessionTitle.cancel"),
            disabled: saving,
            onClick: closeEditor,
            children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(CloseIcon, {})
          }
        ),
        error !== null && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { id: "asuka-session-title-error", className: "asuka-session-title-error", role: "alert", children: error }),
        saving && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "asuka-session-title-status", role: "status", children: t("sessionTitle.saving") })
      ]
    }
  );
}
function EditIcon() {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { viewBox: "0 0 16 16", width: "16", height: "16", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { fill: "currentColor", d: "m11.7 1.8 2.5 2.5-8.4 8.4-3.2.7.7-3.2 8.4-8.4Zm-7.3 8.9-.2 1.1 1.1-.2 7.2-7.3-.8-.8-7.3 7.2Z" }) });
}
function CheckIcon() {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { viewBox: "0 0 16 16", width: "16", height: "16", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { fill: "currentColor", d: "m6.6 11.8-3.7-3.7 1-1 2.7 2.7 5.6-5.6 1 1-6.6 6.6Z" }) });
}
function CloseIcon() {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { viewBox: "0 0 16 16", width: "16", height: "16", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { fill: "currentColor", d: "m4 3 4 4 4-4 1 1-4 4 4 4-1 1-4-4-4 4-1-1 4-4-4-4 1-1Z" }) });
}

// src/client/session-title/rename.ts
async function renameSessionTitle(sessions, sessionId, title) {
  const session = sessions.binding(sessionId)?.session;
  if (session === void 0) throw new Error(`unknown session "${sessionId}"`);
  const result = await session.rename(title);
  if (!result.ok) throw new Error(result.error.message);
}

// src/client/liquid-glass-styles.ts
var ASUKA_LIQUID_STYLES = String.raw`
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
`;

// src/client/styles.ts
var STYLE_ID = "dsh-asuka-school-theme-styles";
var ASUKA_STYLES = String.raw`
/* Animate painted surfaces, not inherited tokens: token interpolation invalidates
   every descendant on every frame, including code and glass backdrop layers. */
body[data-asuka-school-theme]:not([data-asuka-school-reduce-motion='true']),
body[data-asuka-school-theme]:not([data-asuka-school-reduce-motion='true']) [data-slot='sidebar'] > *,
body[data-asuka-school-theme]:not([data-asuka-school-reduce-motion='true']) [data-slot='sidebar'] > *::before,
body[data-asuka-school-theme]:not([data-asuka-school-reduce-motion='true']) :is([data-composer-card], [class*='_bubble']:not([role='tooltip'])) {
  transition: background-color 520ms ease-in-out, border-color 420ms ease;
}
/* These paint colors are local to the Settings surfaces. Unlike inherited
   theme tokens, animating them does not invalidate the entire UI tree. */
@property --asuka-settings-paint-surface { syntax: '<color>'; inherits: false; initial-value: transparent; }
@property --asuka-settings-paint-flare-a { syntax: '<color>'; inherits: false; initial-value: transparent; }
@property --asuka-settings-paint-flare-b { syntax: '<color>'; inherits: false; initial-value: transparent; }
@property --asuka-settings-paint-edge { syntax: '<color>'; inherits: false; initial-value: transparent; }
@property --asuka-settings-paint-edge-soft { syntax: '<color>'; inherits: false; initial-value: transparent; }
@property --asuka-settings-paint-mask { syntax: '<color>'; inherits: false; initial-value: transparent; }
#asuka-school-wallpaper-root {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
  contain: paint;
  opacity: 0;
  transition: opacity 420ms ease;
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
  will-change: opacity;
  /* Filter each static image before compositing its opacity. Filtering the
     parent flattens both fading layers into a changing full-screen surface. */
  filter: var(--asuka-wallpaper-filter, saturate(0.88) contrast(0.98)) blur(var(--asuka-wallpaper-blur, 0px));
  transition: opacity 560ms cubic-bezier(0.22, 1, 0.36, 1);
}
.asuka-school-wallpaper-layer[data-active='true'] { opacity: 1; }
body[data-asuka-school-reduce-motion='true'] #asuka-school-wallpaper-root,
body[data-asuka-school-reduce-motion='true'] .asuka-school-wallpaper-layer,
body[data-asuka-school-reduce-motion='true'][data-asuka-school-theme] { transition: none; }
body[data-asuka-school-reduce-motion='true'] .asuka-school-wallpaper-layer { will-change: auto; }
@media (prefers-reduced-motion: reduce) {
  #asuka-school-wallpaper-root,
  .asuka-school-wallpaper-layer,
  body[data-asuka-school-theme],
  body[data-asuka-school-theme] [data-slot='sidebar'] > *,
  body[data-asuka-school-theme] [data-slot='sidebar'] > *::before,
  body[data-asuka-school-theme] :is([data-composer-card], [class*='_bubble']:not([role='tooltip'])) {
    transition: none;
  }
  .asuka-school-wallpaper-layer { will-change: auto; }
}
body[data-asuka-school-theme] {
  --asuka-glass-surface-soft: rgb(242 247 249 / 0.22);
  --asuka-glass-surface-medium: rgb(233 241 245 / 0.38);
  --asuka-glass-surface-strong: rgb(226 236 242 / 0.56);
  --asuka-composer-glass-surface: color-mix(in srgb, var(--asuka-glass-surface-strong) 72%, transparent);
  --asuka-reading-surface: var(--asuka-glass-surface-medium);
  --asuka-reading-surface-soft: var(--asuka-glass-surface-soft);
  --asuka-glass-code-surface: rgb(22 32 43 / 0.86);
  --asuka-glass-code-banner: #AABCC6;
  --asuka-code-banner-label: #24313D;
  --asuka-code-banner-muted: #30404D;
  --asuka-code-banner-edge: rgb(36 49 61 / 0.2);
  --asuka-sidebar-glass-surface: rgb(202 222 233 / 0.32);
  --asuka-glass-highlight: rgb(255 255 255 / 0.62);
  --asuka-glass-edge: rgb(255 255 255 / 0.52);
  --asuka-glass-edge-soft: rgb(187 223 244 / 0.18);
  --asuka-glass-shadow: rgb(7 24 39 / 0.28);
  --asuka-glass-sheen: linear-gradient(145deg, rgb(255 255 255 / 0.18), transparent 38%, rgb(165 222 255 / 0.07) 72%, rgb(255 255 255 / 0.1));
  --asuka-glass-blur: 20px;
  --asuka-glass-saturate: 1.55;
  --asuka-glass-brightness: 1.04;
  --asuka-settings-mask: rgb(31 46 58 / 0.16);
  --asuka-settings-mask-brightness: 0.92;
  --asuka-settings-glass-blur: 48px;
  --asuka-settings-glass-surface: color-mix(in srgb, var(--asuka-glass-surface-strong) 78%, transparent);
  --asuka-settings-glass-layer-1: color-mix(in srgb, var(--asuka-glass-surface-soft) 78%, transparent);
  --asuka-settings-glass-layer-2: color-mix(in srgb, var(--asuka-glass-surface-medium) 78%, transparent);
  --asuka-settings-glass-layer-3: color-mix(in srgb, var(--asuka-glass-surface-strong) 58%, transparent);
  --asuka-settings-glass-highlight: var(--asuka-glass-highlight);
  --asuka-settings-glass-edge: color-mix(in srgb, var(--asuka-glass-edge) 82%, white);
  --asuka-settings-glass-edge-soft: var(--asuka-glass-edge-soft);
  --asuka-settings-glass-flare-a: rgb(165 222 255 / 0.2);
  --asuka-settings-glass-flare-b: rgb(255 171 195 / 0.14);
  --asuka-settings-glass-shadow: rgb(7 24 39 / 0.4);
  --asuka-settings-glass-fallback: rgb(231 238 242 / 0.96);
  --asuka-settings-glass-brightness: 1.06;
}
body[data-asuka-school-theme][data-asuka-school-scene='morning'] {
  --asuka-glass-surface-soft: rgb(255 244 234 / 0.24);
  --asuka-glass-surface-medium: rgb(252 234 219 / 0.4);
  --asuka-glass-surface-strong: rgb(248 226 208 / 0.58);
  --asuka-glass-code-surface: rgb(34 30 34 / 0.88);
  --asuka-glass-code-banner: #C4AA91;
  --asuka-sidebar-glass-surface: rgb(245 219 198 / 0.34);
  --asuka-glass-edge: rgb(255 248 236 / 0.56);
  --asuka-glass-edge-soft: rgb(255 201 169 / 0.22);
  --asuka-glass-shadow: rgb(69 39 27 / 0.26);
  --asuka-glass-sheen: linear-gradient(145deg, rgb(255 255 255 / 0.2), transparent 38%, rgb(224 99 105 / 0.06) 72%, rgb(255 244 230 / 0.12));
  --asuka-settings-mask: rgb(82 52 35 / 0.12);
  --asuka-settings-mask-brightness: 0.96;
  --asuka-settings-glass-flare-a: rgb(255 247 229 / 0.3);
  --asuka-settings-glass-flare-b: rgb(224 99 105 / 0.14);
  --asuka-settings-glass-fallback: rgb(248 232 218 / 0.96);
}
body[data-asuka-school-theme][data-asuka-school-scene='night'] {
  --asuka-glass-surface-soft: rgb(25 48 69 / 0.24);
  --asuka-glass-surface-medium: rgb(20 42 64 / 0.38);
  --asuka-glass-surface-strong: rgb(18 37 58 / 0.5);
  --asuka-glass-code-surface: rgb(7 18 31 / 0.86);
  --asuka-glass-code-banner: #293846;
  --asuka-code-banner-label: #F5F8FA;
  --asuka-code-banner-muted: #C2CFD8;
  --asuka-code-banner-edge: rgb(215 232 242 / 0.24);
  --asuka-sidebar-glass-surface: rgb(19 42 63 / 0.48);
  --asuka-glass-highlight: rgb(255 255 255 / 0.3);
  --asuka-glass-edge: rgb(224 245 255 / 0.38);
  --asuka-glass-edge-soft: rgb(89 190 255 / 0.18);
  --asuka-glass-shadow: rgb(0 5 16 / 0.56);
  --asuka-glass-sheen: linear-gradient(145deg, rgb(255 255 255 / 0.1), transparent 38%, rgb(69 189 255 / 0.08) 70%, rgb(255 126 177 / 0.07));
  --asuka-glass-brightness: 1;
  --asuka-settings-mask: rgb(2 10 22 / 0.34);
  --asuka-settings-mask-brightness: 0.74;
  --asuka-settings-glass-flare-a: rgb(69 189 255 / 0.24);
  --asuka-settings-glass-flare-b: rgb(255 126 177 / 0.16);
  --asuka-settings-glass-shadow: rgb(0 5 16 / 0.64);
  --asuka-settings-glass-fallback: rgb(24 39 56 / 0.97);
  --asuka-settings-glass-brightness: 1;
}
/* Settings use immediate, local text colors so a scene change never leaves
   dark-mode labels on the new light glass. Native option popups need an opaque pair. */
body[data-asuka-school-theme='light'] div[role='presentation']:has(> [aria-hidden='true'] + [role='dialog'][aria-modal='true']) > [role='dialog'][aria-modal='true'] {
  color-scheme: light;
  --dsw-alias-label-primary: #202D38;
  --dsw-alias-label-primary-bluish: #202D38;
  --dsw-alias-label-secondary: #293B48;
  --dsw-alias-label-tertiary: #304452;
  --dsw-alias-label-caption: #304452;
  --dsw-alias-label-dimmed: #3A4D5A;
  --asuka-settings-control-bg: #F1F4F5;
  --asuka-settings-control-text: #202D38;
  color: var(--dsw-alias-label-primary);
}
body[data-asuka-school-theme='dark'] div[role='presentation']:has(> [aria-hidden='true'] + [role='dialog'][aria-modal='true']) > [role='dialog'][aria-modal='true'] {
  color-scheme: dark;
  --asuka-settings-control-bg: #182738;
  --asuka-settings-control-text: #F4F0E9;
}
body[data-asuka-school-theme] div[role='presentation']:has(> [aria-hidden='true'] + [role='dialog'][aria-modal='true']) > [role='dialog'][aria-modal='true'] select,
body[data-asuka-school-theme] div[role='presentation']:has(> [aria-hidden='true'] + [role='dialog'][aria-modal='true']) > [role='dialog'][aria-modal='true'] select option {
  color: var(--asuka-settings-control-text);
  background-color: var(--asuka-settings-control-bg);
}
/* The settings host mounts synchronously and unmounts immediately on close, so only entrance motion is safe here. */
body[data-asuka-school-theme] div[role='presentation']:has(> [aria-hidden='true'] + [role='dialog'][aria-modal='true']) > [aria-hidden='true'] {
  --asuka-settings-paint-mask: var(--asuka-settings-mask);
  background: linear-gradient(145deg, var(--asuka-settings-paint-mask), rgb(0 0 0 / 0.06));
  -webkit-backdrop-filter: blur(2px) saturate(1.15) brightness(var(--asuka-settings-mask-brightness));
  backdrop-filter: blur(2px) saturate(1.15) brightness(var(--asuka-settings-mask-brightness));
  animation: asuka-settings-mask-enter 200ms ease-out both;
}
body[data-asuka-school-theme] div[role='presentation']:has(> [aria-hidden='true'] + [role='dialog'][aria-modal='true']) > [role='dialog'][aria-modal='true'] {
  --dsw-alias-bg-layer-1: var(--asuka-settings-glass-layer-1);
  --dsw-alias-bg-layer-2: var(--asuka-settings-glass-layer-2);
  --dsw-alias-bg-layer-3: var(--asuka-settings-glass-layer-3);
  /* Native appearance switching also changes module-platform, independently
     of our scene palette. Keep controls paired with this dialog's text/glass. */
  --dsw-alias-bg-module-platform: var(--asuka-settings-glass-layer-3);
  --dsw-specific-sidebar-nav-item-hover: var(--asuka-settings-glass-layer-2);
  --dsw-specific-sidebar-nav-item-active: var(--asuka-settings-glass-layer-3);
  isolation: isolate;
  border: 1px solid transparent;
  background: transparent;
  -webkit-backdrop-filter: none;
  backdrop-filter: none;
  box-shadow:
    inset 0 1px 0 var(--asuka-settings-glass-highlight),
    inset 1px 0 0 var(--asuka-settings-glass-edge-soft),
    inset -1px 0 0 rgb(255 255 255 / 0.07),
    inset 0 -1px 0 rgb(3 15 27 / 0.12),
    0 4px 18px rgb(0 10 22 / 0.2),
    0 30px 96px var(--asuka-settings-glass-shadow);
  animation: asuka-settings-panel-enter 240ms cubic-bezier(0.16, 1, 0.3, 1) both;
}
body[data-asuka-school-theme]:not([data-asuka-school-reduce-motion='true']) div[role='presentation']:has(> [aria-hidden='true'] + [role='dialog'][aria-modal='true']) > :is([aria-hidden='true'], [role='dialog'][aria-modal='true']),
body[data-asuka-school-theme]:not([data-asuka-school-reduce-motion='true']) div[role='presentation']:has(> [aria-hidden='true'] + [role='dialog'][aria-modal='true']) > [role='dialog'][aria-modal='true']::before,
body[data-asuka-school-theme]:not([data-asuka-school-reduce-motion='true']) div[role='presentation']:has(> [aria-hidden='true'] + [role='dialog'][aria-modal='true']) > [role='dialog'][aria-modal='true']::after {
  transition:
    --asuka-settings-paint-surface 560ms ease-in-out,
    --asuka-settings-paint-flare-a 560ms ease-in-out,
    --asuka-settings-paint-flare-b 560ms ease-in-out,
    --asuka-settings-paint-edge 560ms ease-in-out,
    --asuka-settings-paint-edge-soft 560ms ease-in-out,
    --asuka-settings-paint-mask 560ms ease-in-out,
    --asuka-liquid-light-x 140ms ease-out,
    --asuka-liquid-light-y 140ms ease-out,
    --asuka-liquid-light-strength 180ms ease-out,
    background-color 560ms ease-in-out;
}
body[data-asuka-school-theme] div[role='presentation']:has(> [aria-hidden='true'] + [role='dialog'][aria-modal='true']) > [role='dialog'][aria-modal='true']::before {
  --asuka-settings-paint-surface: var(--asuka-settings-glass-surface);
  --asuka-settings-paint-flare-a: var(--asuka-settings-glass-flare-a);
  --asuka-settings-paint-flare-b: var(--asuka-settings-glass-flare-b);
  content: '';
  position: absolute;
  inset: 1px;
  z-index: -1;
  border-radius: inherit;
  pointer-events: none;
  /* Keep the same painted layer before and after asynchronous lens decoding. */
  -webkit-backdrop-filter: blur(var(--asuka-settings-glass-blur)) var(--asuka-liquid-filter, blur(0px)) saturate(1.4) brightness(var(--asuka-settings-glass-brightness));
  backdrop-filter: blur(var(--asuka-settings-glass-blur)) var(--asuka-liquid-filter, blur(0px)) saturate(1.4) brightness(var(--asuka-settings-glass-brightness));
  background:
    linear-gradient(105deg, transparent 18%, rgb(255 255 255 / 0.08) 46%, transparent 70%),
    radial-gradient(70% 18% at 50% 0%, var(--asuka-settings-glass-highlight), transparent 100%),
    radial-gradient(100% 54% at 8% 0%, var(--asuka-settings-paint-flare-a), transparent 58%),
    radial-gradient(90% 72% at 100% 100%, var(--asuka-settings-paint-flare-b), transparent 64%),
    linear-gradient(145deg, var(--asuka-settings-paint-surface), color-mix(in srgb, var(--asuka-settings-paint-surface) 78%, transparent));
  box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.055);
}
/* A border-box background also paints beneath the entire translucent center.
   Mask the edge gradient to a rim instead of adding a second panel-wide tint. */
body[data-asuka-school-theme] div[role='presentation']:has(> [aria-hidden='true'] + [role='dialog'][aria-modal='true']) > [role='dialog'][aria-modal='true']::after {
  --asuka-settings-paint-edge: var(--asuka-settings-glass-edge);
  --asuka-settings-paint-edge-soft: var(--asuka-settings-glass-edge-soft);
  --asuka-settings-paint-flare-b: var(--asuka-settings-glass-flare-b);
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 2px;
  pointer-events: none;
  background:
    radial-gradient(circle 110px at var(--asuka-liquid-light-x) var(--asuka-liquid-light-y), color-mix(in srgb, var(--asuka-settings-glass-highlight) calc(var(--asuka-liquid-light-strength) * 100%), transparent), transparent 100%),
    linear-gradient(135deg, var(--asuka-settings-paint-edge), var(--asuka-settings-paint-edge-soft) 34%, var(--asuka-settings-paint-flare-b) 70%, var(--asuka-settings-paint-edge));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
}
/* Match the decoded rim even if Settings' first map is still decoding. */
body[data-asuka-school-theme][data-asuka-liquid-engine='true'] div[role='presentation']:has(> [aria-hidden='true'] + [role='dialog'][aria-modal='true']) > [role='dialog'][aria-modal='true']::after { opacity: 0.82; }
body[data-asuka-school-theme][data-asuka-liquid-engine='true'][data-asuka-school-details='false'] div[role='presentation']:has(> [aria-hidden='true'] + [role='dialog'][aria-modal='true']) > [role='dialog'][aria-modal='true']::after { opacity: 0.38; }
@keyframes asuka-settings-mask-enter {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes asuka-settings-panel-enter {
  from { transform: translateY(10px) scale(0.98); }
  to { transform: none; }
}
/* Opacity on the dialog makes it a Backdrop Root and prevents its painted
   child from sampling the page until the fade ends. Fade only its content. */
body[data-asuka-school-theme] div[role='presentation']:has(> [aria-hidden='true'] + [role='dialog'][aria-modal='true']) > [role='dialog'][aria-modal='true'] > * {
  animation: asuka-settings-mask-enter 240ms ease-out both;
}
body[data-asuka-school-reduce-motion='true'] div[role='presentation']:has(> [aria-hidden='true'] + [role='dialog'][aria-modal='true']) > [role='dialog'][aria-modal='true'] > * {
  animation: none;
}
@media (prefers-reduced-motion: reduce) {
  body[data-asuka-school-theme] div[role='presentation']:has(> [aria-hidden='true'] + [role='dialog'][aria-modal='true']) > [role='dialog'][aria-modal='true'] > * { animation: none; }
}
body[data-asuka-school-reduce-motion='true'] div[role='presentation']:has(> [aria-hidden='true'] + [role='dialog'][aria-modal='true']) > :is([aria-hidden='true'], [role='dialog'][aria-modal='true']),
body[data-asuka-school-reduce-motion='true'] div[role='presentation']:has(> [aria-hidden='true'] + [role='dialog'][aria-modal='true']) > [role='dialog'][aria-modal='true']::before,
body[data-asuka-school-reduce-motion='true'] div[role='presentation']:has(> [aria-hidden='true'] + [role='dialog'][aria-modal='true']) > [role='dialog'][aria-modal='true']::after {
  animation: none;
  transition: none;
}
@media (prefers-reduced-motion: reduce) {
  body[data-asuka-school-theme]:not([data-asuka-school-reduce-motion='true']) div[role='presentation']:has(> [aria-hidden='true'] + [role='dialog'][aria-modal='true']) > :is([aria-hidden='true'], [role='dialog'][aria-modal='true']),
  body[data-asuka-school-theme] div[role='presentation']:has(> [aria-hidden='true'] + [role='dialog'][aria-modal='true']) > [role='dialog'][aria-modal='true']::before,
  body[data-asuka-school-theme] div[role='presentation']:has(> [aria-hidden='true'] + [role='dialog'][aria-modal='true']) > [role='dialog'][aria-modal='true']::after {
    animation: none;
    transition: none;
  }
}
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  body[data-asuka-school-theme] div[role='presentation']:has(> [aria-hidden='true'] + [role='dialog'][aria-modal='true']) > [role='dialog'][aria-modal='true'] {
    background: var(--asuka-settings-glass-fallback);
  }
}
/* Tooltip CSS modules also use _bubble; leave their fixed positioning and
   out-of-flow geometry to the host instead of treating them as message bubbles. */
/* Stable DSH surfaces share one restrained material; strength changes with information density. */
body[data-asuka-school-theme] :is([data-composer-card], [class*='_bubble']:not([role='tooltip']), [role='menu']:not([data-menu-material], [data-menu-material] *), [role='listbox']:not([data-menu-material], [data-menu-material] *), [role='dialog']:not([aria-modal='true'])) {
  border: 1px solid var(--asuka-glass-edge);
  background-color: var(--asuka-glass-surface-medium);
  background-image: var(--asuka-glass-sheen);
  box-shadow:
    inset 0 1px 0 var(--asuka-glass-highlight),
    inset 0 0 0 1px rgb(255 255 255 / 0.04),
    0 12px 36px var(--asuka-glass-shadow);
}
body[data-asuka-school-theme] :is([class*='_bubble']:not([role='tooltip']), [role='menu']:not([data-menu-material], [data-menu-material] *), [role='listbox']:not([data-menu-material], [data-menu-material] *), [role='dialog']:not([aria-modal='true'])) {
  -webkit-backdrop-filter: blur(var(--asuka-glass-blur)) saturate(var(--asuka-glass-saturate)) brightness(var(--asuka-glass-brightness));
  backdrop-filter: blur(var(--asuka-glass-blur)) saturate(var(--asuka-glass-saturate)) brightness(var(--asuka-glass-brightness));
}
body[data-asuka-school-theme] :is([role='menu']:not([data-menu-material], [data-menu-material] *), [role='listbox']:not([data-menu-material], [data-menu-material] *), [role='dialog']:not([aria-modal='true'])) {
  background-color: var(--asuka-glass-surface-strong);
}
/* ModelSelect changes its shell from menu to group in the model pane. Paint
   MenuSurface, never its inner scrolling menu. Keep nested fixed menus free of
   a filtered/clipped ancestor; the native material layer inherits its radius. */
body[data-asuka-school-theme] [data-menu-material='translucent'] {
  border: 1px solid var(--asuka-glass-edge);
  background: transparent;
  box-shadow: inset 0 1px 0 var(--asuka-glass-highlight), 0 12px 36px var(--asuka-glass-shadow);
}
body[data-asuka-school-theme] [data-menu-material='translucent'] > [aria-hidden='true']:first-child {
  background-color: var(--asuka-glass-surface-strong);
  background-image: var(--asuka-glass-sheen);
  -webkit-backdrop-filter: blur(var(--asuka-glass-blur)) saturate(var(--asuka-glass-saturate)) brightness(var(--asuka-glass-brightness));
  backdrop-filter: blur(var(--asuka-glass-blur)) saturate(var(--asuka-glass-saturate)) brightness(var(--asuka-glass-brightness));
}
/* Drive one entrance per MenuSurface mount, including portaled/nested menus.
   Keep opacity/transform off the shell and content wrappers: either can change
   backdrop sampling or the containing block of a fixed submenu. Only labels
   and icons move; native hit targets, placement and glass paint stay stable.
   DSH removes these menus immediately on close, without an exit lifecycle. */
@property --asuka-menu-progress { syntax: '<number>'; inherits: true; initial-value: 1; }
body[data-asuka-school-theme] [data-menu-material='translucent'] {
  --asuka-menu-progress: 1;
  animation: asuka-menu-content-enter 180ms cubic-bezier(0.16, 1, 0.3, 1);
}
body[data-asuka-school-theme] [data-menu-material='translucent'] button > :is(span, svg):not(:has([data-menu-material])),
body[data-asuka-school-theme] [data-menu-material='translucent'] [data-menu-group-heading] {
  opacity: var(--asuka-menu-progress);
  translate: 0 calc((1 - var(--asuka-menu-progress)) * 4px);
}
@keyframes asuka-menu-content-enter {
  from { --asuka-menu-progress: 0; }
  to { --asuka-menu-progress: 1; }
}
body[data-asuka-school-theme][data-asuka-school-reduce-motion='true'] [data-menu-material='translucent'] {
  animation: none;
}
@media (prefers-reduced-motion: reduce) {
  body[data-asuka-school-theme] [data-menu-material='translucent'] { animation: none; }
}
/* Presented deliverables use static neutral fills in DSH. Their native preview
   hit target, portal actions and clipping stay intact; only the paint changes. */
body[data-asuka-school-theme] [data-presented-file] {
  border-color: var(--asuka-glass-edge);
  background-color: var(--asuka-glass-surface-medium);
  background-image: var(--asuka-glass-sheen);
  box-shadow: inset 0 1px 0 var(--asuka-glass-highlight), 0 8px 24px var(--asuka-glass-shadow);
}
body[data-asuka-school-theme] [data-presented-file]::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  -webkit-backdrop-filter: blur(var(--asuka-glass-blur)) saturate(var(--asuka-glass-saturate)) brightness(var(--asuka-glass-brightness));
  backdrop-filter: blur(var(--asuka-glass-blur)) saturate(var(--asuka-glass-saturate)) brightness(var(--asuka-glass-brightness));
}
body[data-asuka-school-theme] [data-presented-file]:hover {
  background-color: var(--asuka-glass-surface-strong);
}
body[data-asuka-school-theme] [data-composer-card] {
  background-color: var(--asuka-composer-glass-surface);
  -webkit-backdrop-filter: none;
  backdrop-filter: none;
}
/* The add menu extends outside this card. A filter on the card creates a
   backdrop root that excludes the welcome text behind the menu. Blur only the
   card's background so MenuSurface can sample the actual page behind it. */
body[data-asuka-school-theme] [data-composer-card]::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  pointer-events: none;
  -webkit-backdrop-filter: blur(var(--asuka-glass-blur)) saturate(var(--asuka-glass-saturate)) brightness(var(--asuka-glass-brightness));
  backdrop-filter: blur(var(--asuka-glass-blur)) saturate(var(--asuka-glass-saturate)) brightness(var(--asuka-glass-brightness));
}
body[data-asuka-school-theme] :is([data-composer-card], [class*='_bubble']:not([role='tooltip'])) {
  position: relative;
  z-index: 2;
}
/* DSH paints assistant, process and tool nodes without a user-style bubble.
   Raise the column-bounded flow items, including process groups and live rows;
   leave the full-width scrollport and its gutter resize handles untouched. */
body[data-asuka-school-theme] [data-chat-flow] > * {
  position: relative;
  z-index: 2;
}
/* Match user bubbles without filtering a code banner's ancestor. The glass
   backdrop lives on a non-interactive pseudo-element behind the content. */
body[data-asuka-school-theme] [data-chat-flow-kind]:is(
  [data-chat-flow-kind='assistant-step'],
  [data-chat-flow-kind='tool-call'],
  [data-chat-flow-kind='tool-result'],
  [data-chat-flow-kind='turn-error'],
  [data-chat-flow-kind='turn-max-tokens']
) > [data-slot='conversation.chat.node'] > :not(:empty) {
  --dsw-alias-label-tertiary: var(--dsw-alias-label-secondary);
  --dsw-alias-label-caption: var(--dsw-alias-label-secondary);
  position: relative;
  z-index: 0;
  box-sizing: border-box;
  padding: 12px 16px;
  border: 1px solid var(--asuka-glass-edge);
  border-radius: 16px;
  color: var(--dsw-alias-label-primary);
  background: transparent;
  box-shadow:
    inset 0 1px 0 var(--asuka-glass-highlight),
    inset 0 0 0 1px rgb(255 255 255 / 0.04),
    0 12px 36px var(--asuka-glass-shadow);
}
body[data-asuka-school-theme] [data-chat-flow-kind]:is(
  [data-chat-flow-kind='assistant-step'],
  [data-chat-flow-kind='tool-call'],
  [data-chat-flow-kind='tool-result'],
  [data-chat-flow-kind='turn-error'],
  [data-chat-flow-kind='turn-max-tokens']
) > [data-slot='conversation.chat.node'] > :not(:empty)::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  pointer-events: none;
  background-color: var(--asuka-reading-surface);
  background-image: var(--asuka-glass-sheen);
  -webkit-backdrop-filter: blur(var(--asuka-glass-blur)) saturate(var(--asuka-glass-saturate)) brightness(var(--asuka-glass-brightness));
  backdrop-filter: blur(var(--asuka-glass-blur)) saturate(var(--asuka-glass-saturate)) brightness(var(--asuka-glass-brightness));
}
body[data-asuka-school-theme] [data-chat-flow-kind='assistant-step'][data-chat-group-part='reasoning'] > [data-slot='conversation.chat.node'] > :not(:empty) {
  --asuka-reading-surface: var(--asuka-reading-surface-soft);
}
body[data-asuka-school-theme] [data-chat-flow] :is(
  [data-turn-process],
  [data-process-activity]
) {
  padding: 4px 10px;
  border: 1px solid var(--asuka-glass-edge);
  border-radius: 8px;
  color: var(--dsw-alias-label-secondary);
  background-color: var(--asuka-reading-surface-soft);
  background-image: var(--asuka-glass-sheen);
  -webkit-backdrop-filter: blur(var(--asuka-glass-blur)) saturate(var(--asuka-glass-saturate)) brightness(var(--asuka-glass-brightness));
  backdrop-filter: blur(var(--asuka-glass-blur)) saturate(var(--asuka-glass-saturate)) brightness(var(--asuka-glass-brightness));
  box-shadow: inset 0 1px 0 var(--asuka-glass-highlight);
}
body[data-asuka-school-theme] [data-chat-flow-kind='turn-error'] code {
  overflow-wrap: anywhere;
  max-width: min(180px, 24vw);
}
/* Generic tool I/O uses the host's code background with ordinary label colors.
   Pair those labels with the scene reading surface in light and dark themes. */
body[data-asuka-school-theme] [data-chat-call-id] [class*='_ioCard'] {
  border-color: var(--asuka-glass-edge-soft);
  background-color: var(--asuka-reading-surface-soft);
}
body[data-asuka-school-theme] [data-composer-card]:focus-within {
  border-color: color-mix(in srgb, var(--asuka-glass-edge) 64%, var(--dsw-alias-brand-primary));
  box-shadow:
    inset 0 1px 0 var(--asuka-glass-highlight),
    inset 0 0 0 1px rgb(255 255 255 / 0.05),
    0 14px 42px var(--asuka-glass-shadow);
}
/* The host's active composer seat normally fades into opaque bg-base, which creates the white rectangle around the card. */
body[data-asuka-school-theme] [data-phase='active'] [data-composer-seat] {
  background: transparent;
}
/* DSH 0.2's frame solves track widths in JS. Inset the occupants instead of
   adding grid gaps/padding, which would disagree with its resize handles.
   The collapsed 56px rail needs a smaller inline inset to retain 36px targets. */
body[data-asuka-school-theme] {
  --asuka-floating-gap: 10px;
  --asuka-floating-rail-gap: 4px;
  --asuka-floating-radius: 16px;
  --asuka-floating-surface: color-mix(in srgb, var(--asuka-sidebar-glass-surface) 55%, var(--dsw-alias-bg-base));
}
/* AppFrame adds data-animating only in a follow-up layout effect. DockKit can
   flush the changed tracks before that commit, so the header snaps while the
   dock slides. Arm the native transition before either track update happens.
   Keep the host's duration/easing and instant fullscreen/drag exceptions. */
body[data-asuka-school-theme] div:has(> [data-rightbar-col]) {
  transition: grid-template-columns var(--ds-transition-duration-slow) var(--ds-ease-in-out);
}
body[data-asuka-school-theme] div:has(> [data-rightbar-col]):is([data-dragging], [data-rightbar-fullscreen], [data-rightbar-instant]) {
  transition: none;
}
@media (prefers-reduced-motion: reduce) {
  body[data-asuka-school-theme] div:has(> [data-rightbar-col]) { transition: none !important; }
}
body[data-asuka-school-theme] div:has(> [data-slot='sidebar']) {
  background: transparent;
  border-right: 0;
}
body[data-asuka-school-theme] [data-slot='sidebar'] > * {
  --asuka-floating-inline-gap: var(--asuka-floating-gap);
  --asuka-floating-shadow: 0 4px 12px -6px color-mix(in srgb, var(--asuka-glass-shadow) 60%, transparent);
  /* The native root has an inline width equal to the unmodified grid track. */
  width: calc(100% - 2 * var(--asuka-floating-inline-gap)) !important;
  height: calc(100% - 2 * var(--asuka-floating-gap));
  margin: var(--asuka-floating-gap) var(--asuka-floating-inline-gap);
  z-index: 2;
}
body[data-asuka-school-theme] [data-sidebar-collapsed] [data-slot='sidebar'] > * {
  --asuka-floating-inline-gap: var(--asuka-floating-rail-gap);
  padding-inline: 5px;
}
/* Non-portaled native tooltips share the sidebar's isolated stacking context.
   Lift it above conversation cards while a tooltip is mounted, below handles
   (11) and the native overlay layer (20). Do not filter or move the content. */
body[data-asuka-school-theme] [data-slot='sidebar'] > *:has([role='tooltip']) {
  z-index: 10;
}
body[data-asuka-school-theme] header:has(> [data-conversation-header-leading]) {
  --asuka-floating-shadow: 0 4px 12px -6px color-mix(in srgb, var(--asuka-glass-shadow) 60%, transparent);
  margin: var(--asuka-floating-gap);
  min-height: 48px;
  padding: 8px 20px;
  z-index: 8;
}
/* An editing cluster has fixed-size actions. Let utilities move to the next
   line when the available center column cannot fit both, including a manually
   expanded left sidebar on a narrow screen. No actions are hidden or clipped. */
body[data-asuka-school-theme] [data-slot='conversation.session.header'] > div:has(.asuka-session-title-editor) {
  flex-wrap: wrap;
  row-gap: 6px;
}
body[data-asuka-school-theme] [data-slot='conversation.session.header'] > div:has(.asuka-session-title-editor) > div:has([data-slot='conversation.session.header.actions']) {
  min-width: min(100%, 360px);
}
/* The panel's inline width, right anchoring and dock slide/fullscreen lifecycle
   remain native. Padding reduces the dock's measured content area, not its track.
   Do not filter/clip the panel: it also owns floating panes and fixed tooltips. */
body[data-asuka-school-theme] [data-sidebar-right-panel] {
  box-sizing: border-box;
  padding: var(--asuka-floating-gap);
  transition: width var(--ds-transition-duration-slow) var(--ds-ease-in-out);
}
/* Paint the divider only between the rounded edges. Keep the full-height native
   pointer target and its horizontal hit slop; no pane/tooltip ancestor is clipped. */
body[data-asuka-school-theme] [data-sidebar-right-panel] [data-dockkit-split] > [data-dockkit-divider]::before,
body[data-asuka-school-theme] [data-sidebar-right-panel] [data-dockkit-split] > [data-dockkit-divider]::after {
  top: var(--asuka-floating-radius);
  bottom: var(--asuka-floating-radius);
}
/* DockLayout keeps tab hosts mounted and supplies the split fractions inline.
   Give its single-pane state the same three tracks as the split state so the
   browser can interpolate them. The zero-width spare track has no occupant;
   split ratios, tab identity, focus and removal still belong to DockKit. */
body[data-asuka-school-theme] [data-sidebar-right-panel] [data-dockkit-surface] > div[data-dockkit-split]:has(> :is([data-dockkit-host='dock'], [data-dockkit-empty])) {
  transition: grid-template-columns var(--ds-transition-duration-slow) var(--ds-ease-in-out);
}
body[data-asuka-school-theme] [data-sidebar-right-panel] [data-dockkit-surface] > div:not([data-dockkit-split]):has(> :is([data-dockkit-host='dock'], [data-dockkit-empty])) {
  grid-template-columns: minmax(0, 1fr) 0px minmax(0, 0fr) !important;
}
/* Closing motion is owned by dock-motion.ts: animate the observed surface,
   rather than this grid, so DockKit refreshes room through the final width. */
/* Pointer tracking marks the native divider/tab while captured. Resizing must
   follow the pointer immediately, including the frame's outer width handle. */
body[data-asuka-school-theme] [data-dragging] [data-sidebar-right-panel],
body[data-asuka-school-theme] [data-dragging] [data-sidebar-right-panel] [data-dockkit-surface] > div,
body[data-asuka-school-theme] [data-sidebar-right-panel] [data-dockkit-surface] > div:has([data-dockkit-pointer]) {
  transition: none !important;
}
/* Interpolate the same three tracks and right-anchored panel in both modes.
   Fullscreen also folds the native clipped sidebar/center columns to zero,
   so their glass does not show through the fullscreen pane's left rim. */
@media (min-width: 768px) {
  body[data-asuka-school-theme] div:has(> [data-rightbar-col]):has([data-sidebar-right-open], [data-sidebar-right-panel='fullscreen']:not([hidden], [hidden] *)):not([data-dragging]) {
    transition: grid-template-columns var(--ds-transition-duration-slow) var(--ds-ease-in-out);
  }
  body[data-asuka-school-theme] div:has(> [data-rightbar-col]):has([data-sidebar-right-panel='fullscreen'][data-sidebar-right-open]:not([hidden], [hidden] *)) {
    grid-template-columns: 0px minmax(0, 1fr) minmax(0, 100%) !important;
  }
  body[data-asuka-school-theme] div:has(> [data-rightbar-col]):has([data-sidebar-right-open]) [data-slot='main.conversation'] > * {
    min-width: 400px;
  }
}
@media (max-width: 767px) {
  body[data-asuka-school-theme] div[data-asuka-narrow-rightbar]:has(> [data-rightbar-col]) {
    grid-template-columns: var(--asuka-narrow-sidebar-width) minmax(0, 1fr) minmax(0, var(--asuka-narrow-track-width)) !important;
    /* Native auto-fullscreen leaves its instant flag during close/reopen.
       Our push/fullscreen tracks must keep pace with the native pane slide. */
    transition: grid-template-columns var(--ds-transition-duration-slow) var(--ds-ease-in-out) !important;
  }
  body[data-asuka-school-theme] div[data-asuka-narrow-rightbar='fullscreen']:has(> [data-rightbar-col]):has([data-sidebar-right-open]) {
    grid-template-columns: 0px minmax(0, 1fr) minmax(0, var(--asuka-narrow-full-width)) !important;
  }
  body[data-asuka-school-theme] [data-asuka-narrow-rightbar='push'] [data-sidebar-right-panel] {
    width: var(--asuka-narrow-panel-width) !important;
    --dsh-sidebar-width: var(--asuka-narrow-panel-width) !important;
  }
  body[data-asuka-school-theme] [data-asuka-narrow-rightbar='fullscreen'] [data-sidebar-right-panel] {
    width: var(--asuka-narrow-full-width) !important;
  }
  /* The existing center column clips its content. Keep a readable content
     width while that column folds, rather than reflowing text into one letter
     per line or changing composer height throughout the fullscreen motion. */
  body[data-asuka-school-theme] [data-asuka-narrow-rightbar] [data-slot='main.conversation'] > * {
    min-width: calc(var(--asuka-narrow-full-width) - var(--asuka-narrow-sidebar-width) - var(--asuka-narrow-panel-width));
  }
  body[data-asuka-school-theme] [data-asuka-narrow-rightbar] [data-slot='sidebar'] > * {
    width: calc(var(--asuka-narrow-sidebar-width) - 2 * var(--asuka-floating-inline-gap)) !important;
  }
  /* The host derives an exit glyph for every narrow viewport. Show an owned
     fullscreen glyph in our push mode without replacing React's SVG nodes. */
  body[data-asuka-school-theme] [data-sidebar-right-mode][data-asuka-rightbar-mode='push'] > svg { display: none; }
  body[data-asuka-school-theme] [data-sidebar-right-mode][data-asuka-rightbar-mode='push']::before {
    content: '';
    width: 15px;
    height: 15px;
    background:
      linear-gradient(currentColor 0 0) left top / 5px 1px,
      linear-gradient(currentColor 0 0) left top / 1px 5px,
      linear-gradient(currentColor 0 0) right top / 5px 1px,
      linear-gradient(currentColor 0 0) right top / 1px 5px,
      linear-gradient(currentColor 0 0) left bottom / 5px 1px,
      linear-gradient(currentColor 0 0) left bottom / 1px 5px,
      linear-gradient(currentColor 0 0) right bottom / 5px 1px,
      linear-gradient(currentColor 0 0) right bottom / 1px 5px;
    background-repeat: no-repeat;
  }
  body[data-asuka-school-theme] [data-asuka-narrow-rightbar='push'] [class*='_heroWorkspaceRow'] {
    flex-wrap: wrap;
  }
  body[data-asuka-school-theme] [data-asuka-narrow-rightbar='push'] [class*='_heroWorkspaceRow'] > button {
    min-width: 0;
    max-width: 100%;
  }
  body[data-asuka-school-theme] div[data-asuka-narrow-rightbar][data-dragging]:has(> [data-rightbar-col]),
  body[data-asuka-school-theme][data-asuka-school-reduce-motion='true'] div[data-asuka-narrow-rightbar]:has(> [data-rightbar-col]) {
    transition: none !important;
  }
}
@media (max-width: 767px) and (prefers-reduced-motion: reduce) {
  body[data-asuka-school-theme] div[data-asuka-narrow-rightbar]:has(> [data-rightbar-col]) { transition: none !important; }
}
@media (prefers-reduced-motion: reduce) {
  body[data-asuka-school-theme] [data-sidebar-right-panel],
  body[data-asuka-school-theme] [data-sidebar-right-panel] [data-dockkit-surface] > div {
    transition: none !important;
  }
}
body[data-asuka-school-theme] :is(
  [data-slot='sidebar'] > *,
  header:has(> [data-conversation-header-leading]),
  [data-sidebar-right-panel] [data-dockkit-host='dock'] > [data-dockkit-pane],
  [data-sidebar-right-panel] [data-dockkit-empty]
) {
  position: relative;
  isolation: isolate;
  box-sizing: border-box;
  border: 1px solid var(--asuka-glass-edge);
  border-radius: var(--asuka-floating-radius);
  color: var(--dsw-alias-label-primary);
  background: transparent;
  -webkit-backdrop-filter: none;
  backdrop-filter: none;
  box-shadow:
    inset 0 1px 0 var(--asuka-glass-highlight),
    inset 0 0 0 1px var(--asuka-glass-edge-soft),
    var(--asuka-floating-shadow, 0 8px 24px var(--asuka-glass-shadow));
}
/* Only the painted sibling layer gets a filter. Content keeps viewport-fixed
   popups and its native scroll containers; the glass itself clips to the radius. */
body[data-asuka-school-theme] :is(
  [data-slot='sidebar'] > *,
  header:has(> [data-conversation-header-leading]),
  [data-sidebar-right-panel] [data-dockkit-host='dock'] > [data-dockkit-pane],
  [data-sidebar-right-panel] [data-dockkit-empty]
)::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  pointer-events: none;
  background-color: var(--asuka-floating-surface);
  background-image: var(--asuka-glass-sheen);
  -webkit-backdrop-filter: blur(var(--asuka-glass-blur)) saturate(var(--asuka-glass-saturate)) brightness(var(--asuka-glass-brightness));
  backdrop-filter: blur(var(--asuka-glass-blur)) saturate(var(--asuka-glass-saturate)) brightness(var(--asuka-glass-brightness));
}
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  body[data-asuka-school-theme] :is(
    [data-slot='sidebar'] > *,
    header:has(> [data-conversation-header-leading]),
    [data-sidebar-right-panel] [data-dockkit-host='dock'] > [data-dockkit-pane],
    [data-sidebar-right-panel] [data-dockkit-empty]
  )::before { background-color: var(--asuka-settings-glass-fallback); }
}
/* The plugin preference also stops native layout motion (the host already
   honors the OS preference). Restrict this to frame/rail/dock transitions. */
body[data-asuka-school-theme][data-asuka-school-reduce-motion='true'] :is(
  div:has(> [data-rightbar-col]),
  [data-animating]:has(> [data-rightbar-col]) > [data-side],
  [data-slot='sidebar'] [class*='_fading'] > *,
  [data-slot='sidebar'] [class*='_wide'],
  [data-slot='sidebar'] [class*='_railIn'] *,
  [data-sidebar-right-panel],
  [data-sidebar-right-panel] [data-dockkit-surface] > div,
  [data-sidebar-right-panel] [data-dockkit-host='dock'],
  [data-sidebar-right-panel] [data-dockkit-empty],
  [data-sidebar-right-panel] [data-dockkit-divider]
) { animation: none; transition: none !important; }
@media (max-width: 640px) {
  body[data-asuka-school-theme] {
    --asuka-floating-gap: 6px;
    --asuka-floating-radius: 12px;
  }
  body[data-asuka-school-theme] header:has(> [data-conversation-header-leading]) {
    padding-inline: 10px 20px;
  }
}
body[data-asuka-school-theme] [data-composer-card] button[class*='_add'] {
  background-color: var(--asuka-glass-surface-strong);
  background-image: var(--asuka-glass-sheen);
  -webkit-backdrop-filter: blur(12px) saturate(1.35);
  backdrop-filter: blur(12px) saturate(1.35);
  box-shadow: inset 0 1px 0 var(--asuka-glass-highlight), inset 0 0 0 1px var(--asuka-glass-edge-soft), 0 2px 8px rgb(20 32 40 / 0.1);
}
/* The host scroll fade ends in an opaque shell color and appears as a white
   strip over the translucent sidebar, even when there is nothing to scroll. */
body[data-asuka-school-theme] [data-slot='sidebar'] [class*='_fade'] {
  background: none;
}
/* Stable semantic details: the palette is applied by presentation.ts, while these make its school motif tangible. */
body[data-asuka-school-theme][data-asuka-school-details='true'] :is(button, [role='button']) {
  border-radius: 8px;
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.14), 0 1px 0 rgb(20 32 40 / 0.08);
  transition: box-shadow 160ms ease;
}
body[data-asuka-school-theme][data-asuka-school-details='true'] :is(button, [role='button']):not(:disabled):hover {
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.2), 0 5px 15px rgb(37 57 69 / 0.14);
}
/* Give the wordmark's frame room without squeezing its SVG or the collapse
   action. Only the expanded logo row borrows space from sidebar padding. */
body[data-asuka-school-theme] [data-slot='sidebar'] [class*='_logoRow']:has(> button[class*='_wide'] [data-slot='sidebar.brand.mark']) {
  margin-inline: -6px;
}
body[data-asuka-school-theme] [data-slot='sidebar'] button[class*='_wide']:has([data-slot='sidebar.brand.mark']) {
  box-sizing: border-box;
  padding: 6px;
}
/* Native text tabs have no top/inline padding. Keep their underline and scene
   colors while giving the shared rounded detail frame a comfortable inset. */
body[data-asuka-school-theme] [data-conversation-tabs] {
  gap: 12px;
  padding-left: 0;
}
body[data-asuka-school-theme] [data-conversation-tabs] > [role='tab'] {
  padding: 6px 12px 10px;
}
body[data-asuka-school-theme] [data-conversation-tabs] > [role='tab']::after {
  left: 12px;
  right: 12px;
}
/* Files is a button; terminal supplies a split-action wrapper with an absolute
   main button. Both outer cards and that hit target use the sidebar radius. */
body[data-asuka-school-theme] [data-sidebar-right-panel] [data-sidebar-right-guide-entry] {
  border-radius: var(--asuka-floating-radius);
}
body[data-asuka-school-theme] [data-sidebar-right-panel] [data-sidebar-right-guide-entry] > button:first-child {
  border-radius: inherit;
}
/* The native shortcut is flex:none and can consume the whole title at split
   widths. Query the guide's own width, including fullscreen and divider drag. */
body[data-asuka-school-theme] [data-sidebar-right-panel] [data-sidebar-right-guide] {
  container: asuka-dock-guide / inline-size;
  width: 100%;
  padding-inline: clamp(10px, 6%, 24px);
}
@container asuka-dock-guide (max-width: 320px) {
  body[data-asuka-school-theme] [data-sidebar-right-panel] [data-sidebar-right-guide-entry] {
    gap: 10px;
    padding-inline: 12px;
  }
  body[data-asuka-school-theme] [data-sidebar-right-panel] [data-sidebar-right-guide-entry] > :is([class*='_keys'], [class*='_shortcut']) {
    display: none;
  }
}
/* DockKit's native selected fill uses markdown-tag, which follows official
   appearance independently of scene labels. Keep the color pair local. */
body[data-asuka-school-theme] [data-sidebar-right-panel] [data-dockkit-tab][aria-selected='true'] {
  color: var(--dsw-alias-label-primary);
  background: var(--asuka-glass-surface-medium);
}
body[data-asuka-school-theme] [data-sidebar-right-panel] [data-dockkit-tab]:hover {
  background: var(--asuka-glass-surface-strong);
}
/* The full-card preview retains one rounded hit target and an inset focus ring. */
body[data-asuka-school-theme] [data-presented-file] > button:first-child {
  border-radius: inherit;
  box-shadow: none;
}
body[data-asuka-school-theme] [data-presented-file] > button:first-child:focus-visible {
  outline: none;
  box-shadow: inset 0 0 0 2px var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));
}
/* The native split action owns one outer frame. Independent button radii and
   detail shadows would draw two overlapping capsules inside that frame. */
body[data-asuka-school-theme] :is([data-slot='conversation.session.header.utilities'], [data-presented-file]) [data-open-target][data-size='compact'] {
  border-color: var(--asuka-glass-edge-soft);
  border-radius: 8px;
  background: var(--asuka-glass-surface-soft);
}
body[data-asuka-school-theme] :is([data-slot='conversation.session.header.utilities'], [data-presented-file]) [data-open-target][data-size='compact'] > button {
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}
body[data-asuka-school-theme] :is([data-slot='conversation.session.header.utilities'], [data-presented-file]) [data-open-target][data-size='compact'] > button + button {
  border-left-color: var(--asuka-glass-edge-soft);
}
body[data-asuka-school-theme] :is([data-slot='conversation.session.header.utilities'], [data-presented-file]) [data-open-target][data-size='compact'] > button:not(:disabled):is(:hover, [aria-expanded='true']) {
  background: var(--asuka-glass-surface-medium);
  box-shadow: none;
}
body[data-asuka-school-theme] :is([data-slot='conversation.session.header.utilities'], [data-presented-file]) [data-open-target][data-size='compact'] > button:focus-visible {
  outline: none;
  background: var(--asuka-glass-surface-medium);
  box-shadow: none;
}
body[data-asuka-school-theme] :is([data-slot='conversation.session.header.utilities'], [data-presented-file]) [data-open-target][data-size='compact']:has(> button:focus-visible) {
  outline: 2px solid var(--dsw-alias-brand-primary);
  outline-offset: 2px;
}
/* The sidebar already supplies the glass backdrop. Quiet navigation and icon
   actions need only hover feedback, rather than a second bright tile per row. */
body[data-asuka-school-theme] [data-slot='sidebar'] :is(
  button:not(:has([data-slot='sidebar.brand.mark'])),
  [role='treeitem'][data-row-key]
) {
  box-sizing: border-box;
  border: 1px solid transparent;
  border-radius: 8px;
  background: transparent;
  -webkit-backdrop-filter: none;
  backdrop-filter: none;
  box-shadow: none;
}
body[data-asuka-school-theme] [data-slot='sidebar'] :is(
  button:not(:has([data-slot='sidebar.brand.mark'])),
  [role='treeitem'][data-row-key]
):not(:disabled):hover {
  border-color: var(--asuka-glass-edge-soft);
  background: var(--asuka-glass-surface-soft);
  box-shadow: none;
}
body[data-asuka-school-theme] [data-slot='sidebar'] button[class*='_newSession']:not(:has([data-slot='sidebar.brand.mark'])) {
  border-color: color-mix(in srgb, var(--asuka-glass-edge) 56%, transparent);
  background-color: var(--asuka-glass-surface-medium);
  background-image: var(--asuka-glass-sheen);
  box-shadow: inset 0 1px 0 var(--asuka-glass-edge-soft);
}
body[data-asuka-school-theme] [data-slot='sidebar'] button[class*='_newSession']:not(:has([data-slot='sidebar.brand.mark'])):not(:disabled):hover {
  border-color: var(--asuka-glass-edge);
  background-color: var(--asuka-glass-surface-strong);
  background-image: var(--asuka-glass-sheen);
  box-shadow: inset 0 1px 0 var(--asuka-glass-edge-soft);
}
body[data-asuka-school-theme] [data-slot='sidebar'] [data-row-key^='session:'][aria-selected='true'] {
  border-color: var(--asuka-glass-edge-soft);
  background: var(--asuka-glass-surface-medium);
  box-shadow: none;
}
body[data-asuka-school-theme][data-asuka-school-details='true'] [data-slot='sidebar'] [data-row-key^='session:'][aria-selected='true'] {
  box-shadow: inset 2px 0 0 var(--dsw-specific-sidebar-nav-item-active-accent);
}
/* The workspace picker is native; the Agent preset comes through an additive
   slot. Give their two triggers one material without touching their menus. */
body[data-asuka-school-theme] [class*='_heroWorkspaceRow'] :is(
  button[class*='_workspace'],
  [data-slot='conversation.hero.agentPreset'] button[aria-haspopup='menu']
) {
  box-sizing: border-box;
  min-height: 30px;
  padding: 0 10px;
  border: 1px solid var(--asuka-glass-edge-soft);
  border-radius: 8px;
  color: var(--dsw-alias-label-primary);
  background-color: var(--asuka-glass-surface-medium);
  background-image: var(--asuka-glass-sheen);
  -webkit-backdrop-filter: blur(12px) saturate(1.35);
  backdrop-filter: blur(12px) saturate(1.35);
  box-shadow: inset 0 1px 0 var(--asuka-glass-edge-soft);
  font-size: 13px;
}
body[data-asuka-school-theme] [class*='_heroWorkspaceRow'] :is(
  button[class*='_workspace'],
  [data-slot='conversation.hero.agentPreset'] button[aria-haspopup='menu']
):not(:disabled):is(:hover, [aria-expanded='true']) {
  border-color: var(--asuka-glass-edge);
  background-color: var(--asuka-glass-surface-strong);
  box-shadow: inset 0 1px 0 var(--asuka-glass-edge-soft);
}
body[data-asuka-school-theme][data-asuka-school-details='true'] :is(.asuka-mode-button, .asuka-theme-card, .asuka-reset-button, .asuka-session-title-trigger, .asuka-session-title-action) {
  transition: box-shadow 160ms ease, transform 160ms ease;
}
body[data-asuka-school-theme][data-asuka-school-details='true'] :is(.asuka-mode-button, .asuka-theme-card, .asuka-reset-button, .asuka-session-title-trigger, .asuka-session-title-action):not(:disabled):hover {
  transform: translateY(-1px);
}
body[data-asuka-school-theme][data-asuka-school-details='true'] pre {
  border: 1px solid var(--dsw-alias-border-l2);
  border-left: 3px solid var(--dsw-alias-brand-primary);
  border-radius: 10px;
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.06), 0 8px 24px rgb(19 30 41 / 0.12);
}
body[data-asuka-school-theme][data-asuka-school-details='true'] .md-code-block {
  --dsw-alias-markdown-code-block: var(--asuka-glass-code-surface);
  --dsw-alias-markdown-code-block-banner: var(--asuka-glass-code-banner);
  --shiki-background: var(--asuka-glass-code-surface);
  --dsw-alias-label-primary: #F5F8FA;
  --dsw-alias-label-secondary: #DDE6EC;
  --dsw-alias-label-tertiary: #C2CFD8;
  --dsw-alias-label-caption: #9FB0BD;
  --dsw-alias-border-l2: rgb(215 232 242 / 0.32);
  overflow: clip;
  position: relative;
  z-index: 2;
  border-radius: 10px;
  background: var(--asuka-glass-sheen);
  -webkit-backdrop-filter: blur(18px) saturate(1.18) brightness(0.94);
  backdrop-filter: blur(18px) saturate(1.18) brightness(0.94);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.08), 0 12px 34px var(--asuka-glass-shadow);
}
/* Pair restrained scene fills with local labels, independently of native
   Light/Dark appearance and the optional decorative code treatment. */
body[data-asuka-school-theme] .md-code-block [data-code-block-banner='true'] {
  --dsw-alias-label-primary: var(--asuka-code-banner-label);
  --dsw-alias-label-secondary: var(--asuka-code-banner-muted);
  --dsw-alias-label-tertiary: var(--asuka-code-banner-muted);
  color: var(--dsw-alias-label-primary);
  background: var(--asuka-glass-code-banner);
  box-shadow: inset 0 -1px 0 var(--asuka-code-banner-edge);
}
/* Keep the existing sticky mask and clipping geometry. */
body[data-asuka-school-theme][data-asuka-school-details='true'] .md-code-block > :first-child {
  border-radius: 0;
  background: var(--dsw-alias-bg-base);
}
body[data-asuka-school-theme][data-asuka-school-details='true'] .md-code-block > :first-child > :first-child {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background: var(--asuka-glass-code-banner);
}
body[data-asuka-school-theme][data-asuka-school-details='true'] .md-code-block [data-code-block-banner='true'] button {
  min-width: 36px;
  min-height: 24px;
  padding: 0 6px;
}
body[data-asuka-school-theme][data-asuka-school-details='true'] .md-code-block pre {
  border-top: 0;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  background-color: var(--asuka-glass-code-surface);
  box-shadow: none;
}
.asuka-quick-row, .asuka-section { color: var(--dsw-alias-label-primary); }
body:not([data-asuka-school-theme]) :is(.asuka-quick-row, .asuka-section) {
  --asuka-glass-edge-soft: var(--dsw-alias-border-l1);
  --asuka-glass-surface-soft: var(--dsw-alias-bg-layer-2);
  --asuka-glass-sheen: none;
}
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
.asuka-mode-button { min-height: 34px; padding: 0 12px; border: 1px solid var(--asuka-glass-edge-soft); border-radius: 8px; color: var(--dsw-alias-label-secondary); background-color: var(--asuka-glass-surface-soft); background-image: var(--asuka-glass-sheen); font-size: 12px; }
.asuka-mode-button[aria-pressed='true'] { border-color: var(--dsw-alias-brand-primary); color: var(--dsw-alias-brand-primary-invert); background: var(--dsw-alias-brand-primary); }
body:not([data-asuka-school-theme]) .asuka-mode-button[aria-pressed='true'] { color: var(--dsw-alias-bg-base); }
.asuka-mode-button:focus-visible, .asuka-theme-card:focus-visible, .asuka-reset-button:focus-visible, .asuka-section input:focus-visible, .asuka-section select:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 2px; }
.asuka-section { max-width: 760px; padding: 8px 0 32px; }
.asuka-section-header { padding: 18px 20px; border-left: 3px solid var(--dsw-alias-brand-primary); background: linear-gradient(90deg, var(--dsw-alias-bg-layer-2), transparent); }
.asuka-section-header h2 { margin: 0; font-family: Georgia, 'Noto Serif SC', serif; font-size: 26px; letter-spacing: -0.02em; }
.asuka-setting-group { display: grid; gap: 14px; margin: 24px 0 0; padding: 0; border: 0; }
.asuka-setting-group legend { padding: 0; color: var(--dsw-alias-label-primary); font-size: 14px; font-weight: 700; }
.asuka-theme-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; }
.asuka-theme-card { display: grid; gap: 10px; padding: 10px; border: 1px solid var(--asuka-glass-edge-soft); border-radius: 10px; color: var(--dsw-alias-label-primary); text-align: left; background-color: var(--asuka-glass-surface-soft); background-image: var(--asuka-glass-sheen); box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.1); }
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
.asuka-select-row select { min-height: 34px; max-width: 230px; padding: 0 28px 0 10px; border: 1px solid var(--asuka-glass-edge-soft); border-radius: 6px; color: var(--dsw-alias-label-primary); background-color: var(--asuka-glass-surface-soft); background-image: var(--asuka-glass-sheen); font: inherit; }
.asuka-section-footer { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-top: 28px; padding-top: 18px; border-top: 1px solid var(--dsw-alias-border-l2); color: var(--dsw-alias-label-secondary); font-size: 12px; line-height: 1.5; }
.asuka-section-footer b { color: var(--dsw-alias-label-primary); }
.asuka-reset-button { padding: 8px 10px; border: 1px solid var(--asuka-glass-edge-soft); border-radius: 6px; color: var(--dsw-alias-label-primary); background-color: var(--asuka-glass-surface-soft); background-image: var(--asuka-glass-sheen); white-space: nowrap; }
.asuka-session-title-trigger,
.asuka-session-title-action {
  box-sizing: border-box;
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 1px solid transparent;
  border-radius: 50%;
  color: var(--dsw-alias-label-tertiary);
  background: transparent;
  cursor: pointer;
}
.asuka-session-title-trigger:hover,
.asuka-session-title-action:hover:not(:disabled) {
  color: var(--dsw-alias-label-primary);
  background: var(--dsw-alias-interactive-bg-hover);
}
.asuka-session-title-trigger:active,
.asuka-session-title-action:active:not(:disabled) {
  background: var(--dsw-alias-interactive-bg-active);
}
.asuka-session-title-trigger:focus-visible,
.asuka-session-title-action:focus-visible,
.asuka-session-title-input:focus-visible {
  outline: 2px solid var(--dsw-alias-brand-primary);
  outline-offset: 2px;
}
.asuka-session-title-action:disabled {
  color: var(--dsw-alias-label-dimmed);
  cursor: not-allowed;
}
.asuka-session-title-editor {
  position: relative;
  display: flex;
  flex: none;
  align-items: center;
  gap: 4px;
  padding: 2px;
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: 9px;
  background: var(--dsw-alias-bg-layer-1);
}
.asuka-session-title-editor[aria-busy='true'] {
  border-color: var(--dsw-alias-brand-primary);
  background: var(--dsw-alias-bg-layer-2);
}
.asuka-session-title-input {
  box-sizing: border-box;
  width: clamp(132px, 24vw, 240px);
  min-width: 0;
  height: 26px;
  padding: 2px 7px;
  border: 0;
  border-radius: 6px;
  color: var(--dsw-alias-label-primary);
  background: transparent;
  font: inherit;
  font-size: 14px;
  line-height: 20px;
}
.asuka-session-title-input:disabled {
  color: var(--dsw-alias-label-dimmed);
}
.asuka-session-title-input[aria-invalid='true'] {
  box-shadow: inset 0 -2px 0 var(--dsw-alias-state-error-primary);
}
.asuka-session-title-confirm:not(:disabled) {
  color: var(--dsw-alias-brand-primary);
}
.asuka-session-title-error {
  position: absolute;
  z-index: 20;
  top: calc(100% + 6px);
  right: 0;
  width: max-content;
  max-width: min(320px, 70vw);
  padding: 7px 9px;
  border: 1px solid var(--dsw-alias-state-error-primary);
  border-radius: 7px;
  color: var(--dsw-alias-state-error-primary);
  background: var(--dsw-alias-bg-overlay);
  box-shadow: 0 4px 14px var(--dsw-alias-bg-mask-2);
  font-size: 12px;
  line-height: 18px;
}
.asuka-session-title-status {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
body[data-asuka-school-details='true'] { --asuka-selection-rail: var(--dsw-specific-sidebar-nav-item-active-accent); }
@media (max-width: 640px) {
  .asuka-quick-row { grid-template-columns: 1fr; }
  .asuka-mode-switch { width: fit-content; }
  .asuka-theme-cards { grid-template-columns: 1fr; }
  .asuka-section-footer { align-items: flex-start; flex-direction: column; }
  .asuka-session-title-input { width: clamp(112px, 34vw, 180px); }
}
${ASUKA_LIQUID_STYLES}
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

// src/client/workspace-picker.ts
function installWorkspacePickerToggleGuard(root = document) {
  const onPointerDown = (event) => {
    if (event.button !== 0 || !(event.target instanceof Element)) return;
    const chip = event.target.closest("[class*='_heroWorkspaceRow'] > button[class*='_workspace'][aria-haspopup='menu'][aria-expanded='true']");
    if (chip === null) return;
    event.stopPropagation();
  };
  root.addEventListener("pointerdown", onPointerDown, { capture: true });
  return () => root.removeEventListener("pointerdown", onPointerDown, { capture: true });
}

// src/client/command-menu.ts
function installCommandMenuToggleGuard(root = document) {
  const onClick = (event) => {
    if (event.button !== 0 || !(event.target instanceof Element)) return;
    const trigger = event.target.closest("[data-composer-card] button[class*='_add'][aria-haspopup='listbox']:not(:disabled)");
    const card = trigger?.closest("[data-composer-card]");
    if (!card?.querySelector("[data-trigger-menu] :is([role='option'][id^='dsh-slash-option-command-'], [role='status'][data-source='command'])")) return;
    const editor = card.querySelector("[data-composer-input]");
    if (!editor || editor.getAttribute("data-composer-composing") === "true") return;
    const escape = new KeyboardEvent("keydown", { key: "Escape", code: "Escape", bubbles: true, cancelable: true });
    editor.dispatchEvent(escape);
    if (!escape.defaultPrevented) return;
    event.preventDefault();
    event.stopPropagation();
  };
  root.addEventListener("click", onClick, { capture: true });
  return () => root.removeEventListener("click", onClick, { capture: true });
}

// src/client/dock-motion.ts
var SURFACE = "[data-sidebar-right-panel] [data-dockkit-surface]";
var PANES = "[data-dockkit-host='dock']:not([hidden]) > [data-dockkit-pane]";
function installDockCloseMotion(root = document) {
  const view = root.defaultView;
  if (!view || !view.ResizeObserver || !view.MutationObserver) return () => {
  };
  const surfaces = /* @__PURE__ */ new Map();
  const reduced = view.matchMedia("(prefers-reduced-motion: reduce)");
  let disposed = false;
  const cancel = (state) => {
    state.animation?.cancel();
    state.animation = void 0;
  };
  const cancelAll = () => surfaces.forEach(cancel);
  const sample = (state) => {
    const left = state.element.getBoundingClientRect().left;
    state.bounds.clear();
    for (const pane of state.panes) {
      if (!pane.isConnected || pane.closest("[hidden]")) continue;
      const rect = pane.getBoundingClientRect();
      state.bounds.set(pane.dataset.dockkitContent, { width: rect.width, left: rect.left - left });
    }
  };
  const resize = new view.ResizeObserver((entries) => {
    for (const state of surfaces.values()) {
      if (!entries.some((entry) => entry.target === state.parent || entry.target === state.element || state.panes.has(entry.target))) continue;
      const parentWidth = state.parent.getBoundingClientRect().width;
      if (Math.abs(parentWidth - state.parentWidth) > 0.5) cancel(state);
      state.parentWidth = parentWidth;
      sample(state);
    }
  });
  const canAnimate = (state) => root.body.hasAttribute("data-asuka-school-theme") && root.body.dataset.asukaSchoolReduceMotion !== "true" && !reduced.matches && state.element.closest("[data-sidebar-right-open]") !== null && root.querySelector("[data-dragging], [data-dockkit-pointer]") === null && state.element.querySelector("[data-dockkit-host='float']:not([hidden])") === null;
  const sync = (state) => {
    const grid = state.element.firstElementChild;
    const split = grid?.hasAttribute("data-dockkit-split") === true;
    if (state.split && !split) {
      const survivor = grid?.querySelector(PANES);
      const from = survivor && state.bounds.get(survivor.dataset.dockkitContent);
      cancel(state);
      const width = state.element.getBoundingClientRect().width;
      if (from && from.width > 0 && width - from.width > 0.5 && canAnimate(state) && state.element.animate) {
        const style = view.getComputedStyle(state.element);
        const time = style.getPropertyValue("--ds-transition-duration-slow").trim();
        const duration = Number.parseFloat(time) * (time.endsWith("ms") ? 1 : 1e3) || 300;
        const animation = state.element.animate([
          { width: `${from.width}px`, marginLeft: `${Math.max(0, Math.min(from.left, width - from.width))}px`, flexGrow: 0, flexShrink: 0 },
          { width: `${width}px`, marginLeft: "0px", flexGrow: 0, flexShrink: 0 }
        ], { duration, easing: style.getPropertyValue("--ds-ease-in-out").trim() || "ease-in-out" });
        state.animation = animation;
        const settled = () => {
          if (disposed || state.animation !== animation) return;
          state.animation = void 0;
          sample(state);
        };
        void animation.finished.then(settled, settled);
      }
    } else if (split !== state.split) {
      cancel(state);
    }
    state.split = split;
    const panes = new Set(state.element.querySelectorAll(PANES));
    for (const pane of state.panes) if (!panes.has(pane)) resize.unobserve(pane);
    for (const pane of panes) if (!state.panes.has(pane)) resize.observe(pane);
    state.panes = panes;
    if (!state.animation) sample(state);
  };
  const attach = (element) => {
    if (surfaces.has(element)) return;
    const state = {
      element,
      parent: element.parentElement,
      split: element.firstElementChild?.hasAttribute("data-dockkit-split") === true,
      panes: /* @__PURE__ */ new Set(),
      bounds: /* @__PURE__ */ new Map(),
      parentWidth: element.parentElement.getBoundingClientRect().width
    };
    surfaces.set(element, state);
    resize.observe(element);
    resize.observe(state.parent);
    sync(state);
  };
  const mutations = new view.MutationObserver((records) => {
    const touched = /* @__PURE__ */ new Set();
    for (const record of records) {
      if (record.type === "attributes" && record.target === root.body) cancelAll();
      if (record.attributeName === "data-dragging" || record.attributeName === "data-dockkit-pointer") cancelAll();
      if (record.target instanceof view.Element) {
        const surface = record.target.closest(SURFACE);
        if (surface) touched.add(surface);
      }
      for (const node of record.addedNodes) {
        if (!(node instanceof view.HTMLElement)) continue;
        if (node.matches(SURFACE)) attach(node);
        node.querySelectorAll(SURFACE).forEach(attach);
      }
    }
    for (const [element, state] of surfaces) {
      if (!element.isConnected) {
        cancel(state);
        resize.unobserve(element);
        resize.unobserve(state.parent);
        state.panes.forEach((pane) => resize.unobserve(pane));
        surfaces.delete(element);
      } else if (touched.has(element)) sync(state);
    }
  });
  root.querySelectorAll(SURFACE).forEach(attach);
  mutations.observe(root.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["data-dockkit-split", "data-dockkit-pointer", "data-dragging", "data-asuka-school-theme", "data-asuka-school-reduce-motion"]
  });
  reduced.addEventListener("change", cancelAll);
  return () => {
    disposed = true;
    mutations.disconnect();
    resize.disconnect();
    reduced.removeEventListener("change", cancelAll);
    cancelAll();
    surfaces.clear();
  };
}

// src/client/liquid-glass.ts
var SVG_NS = "http://www.w3.org/2000/svg";
var SURFACES = [
  "[data-composer-card]",
  "[data-slot='sidebar'] > *",
  "header:has(> [data-conversation-header-leading])",
  "[data-sidebar-right-panel] [data-dockkit-host='dock'] > [data-dockkit-pane]",
  "[data-sidebar-right-panel] [data-dockkit-empty]",
  "[data-menu-material='translucent']",
  "div[role='presentation']:has(> [aria-hidden='true'] + [role='dialog'][aria-modal='true']) > [role='dialog'][aria-modal='true']"
].join(",");
function createLensMap(width, height, radius) {
  const ratio = Math.min(1, 512 / Math.max(width, height));
  const w = Math.max(2, Math.round(width * ratio));
  const h = Math.max(2, Math.round(height * ratio));
  const r = Math.max(1, Math.min(radius, width / 2, height / 2));
  const rim = Math.min(18, Math.max(6, r * 0.85), Math.min(width, height) / 3);
  const pixels = new Uint8ClampedArray(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const px = (x + 0.5) * width / w - width / 2;
      const py = (y + 0.5) * height / h - height / 2;
      const qx = Math.abs(px) - (width / 2 - r);
      const qy = Math.abs(py) - (height / 2 - r);
      const ax = Math.max(qx, 0), ay = Math.max(qy, 0);
      const length = Math.hypot(ax, ay);
      const distance = r - (length + Math.min(Math.max(qx, qy), 0));
      let nx = 0, ny = 0;
      if (length > 0) {
        nx = ax / length;
        ny = ay / length;
      } else if (qx > qy) nx = 1;
      else ny = 1;
      const t = Math.max(0, Math.min(1, distance / rim));
      const bend = distance >= 0 && distance < rim ? Math.sin(Math.PI * t) * 0.48 : 0;
      const offset = (y * w + x) * 4;
      pixels[offset] = Math.round(127.5 - Math.sign(px) * nx * bend * 255);
      pixels[offset + 1] = Math.round(127.5 - Math.sign(py) * ny * bend * 255);
      pixels[offset + 2] = 128;
      pixels[offset + 3] = 255;
    }
  }
  return { width: w, height: h, pixels, scale: rim * 1.65 };
}
function glassHighlight(width, height, x, y) {
  const px = Math.max(0, Math.min(width, x)), py = Math.max(0, Math.min(height, y));
  const distance = Math.min(px, py, width - px, height - py);
  return {
    x: width > 0 ? px / width * 100 : 0,
    y: height > 0 ? py / height * 100 : 0,
    strength: width > 0 && height > 0 ? 0.6 * Math.max(0, 1 - distance / 64) ** 2 : 0
  };
}
function installLiquidGlass(root = document) {
  const view = root.defaultView;
  if (!view || !view.ResizeObserver || !view.MutationObserver || !/\b(?:Chrome|Chromium|Edg)\//.test(view.navigator.userAgent) || !view.CSS?.supports("backdrop-filter", 'url("#asuka-lens-probe")')) return () => {
  };
  const canvas = root.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) return () => {
  };
  const engineAttribute = root.body.getAttribute("data-asuka-liquid-engine");
  root.body.setAttribute("data-asuka-liquid-engine", "true");
  const svg = root.createElementNS(SVG_NS, "svg");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("width", "0");
  svg.setAttribute("height", "0");
  svg.style.cssText = "position:absolute;pointer-events:none;overflow:hidden";
  const defs = root.createElementNS(SVG_NS, "defs");
  svg.append(defs);
  root.body.append(svg);
  const lenses = /* @__PURE__ */ new Map();
  const reduced = view.matchMedia("(prefers-reduced-motion: reduce)");
  let sequence = 0, timer = 0, frame = 0, disposed = false;
  let light;
  let pointer;
  const active = () => root.body.hasAttribute("data-asuka-school-theme");
  const motion = () => active() && !reduced.matches && root.body.dataset.asukaSchoolReduceMotion !== "true";
  const clearLight = () => {
    light?.style.removeProperty("--asuka-liquid-pointer-strength");
    light = void 0;
    pointer = void 0;
    if (frame) view.cancelAnimationFrame(frame);
    frame = 0;
  };
  const resetLight = () => {
    clearLight();
    for (const element of lenses.keys()) {
      element.style.removeProperty("--asuka-liquid-pointer-x");
      element.style.removeProperty("--asuka-liquid-pointer-y");
      element.style.removeProperty("--asuka-liquid-pointer-strength");
    }
  };
  const release = (element, lens) => {
    resize.unobserve(element);
    lens.filter.remove();
    if (lens.attribute === null) element.removeAttribute("data-asuka-liquid-glass");
    else element.setAttribute("data-asuka-liquid-glass", lens.attribute);
    if (lens.property) element.style.setProperty("--asuka-liquid-filter", lens.property, lens.priority);
    else element.style.removeProperty("--asuka-liquid-filter");
    if (light === element) clearLight();
    element.style.removeProperty("--asuka-liquid-pointer-x");
    element.style.removeProperty("--asuka-liquid-pointer-y");
    element.style.removeProperty("--asuka-liquid-pointer-strength");
    lenses.delete(element);
  };
  const primitive = (name, attributes) => {
    const node = root.createElementNS(SVG_NS, name);
    for (const [key, value] of Object.entries(attributes)) node.setAttribute(key, value);
    return node;
  };
  const update = (element, lens) => {
    const width = element.offsetWidth, height = element.offsetHeight;
    if (width < 2 || height < 2 || element.closest("[hidden]")) {
      element.removeAttribute("data-asuka-liquid-glass");
      return;
    }
    const radius = Number.parseFloat(view.getComputedStyle(element).borderTopLeftRadius) || 16;
    const size = `${width}:${height}:${radius}`;
    if (lens.size === size) {
      if (lens.ready) element.setAttribute("data-asuka-liquid-glass", "true");
      return;
    }
    lens.size = size;
    try {
      const map = createLensMap(width, height, radius);
      canvas.width = map.width;
      canvas.height = map.height;
      const data = context.createImageData(map.width, map.height);
      data.data.set(map.pixels);
      context.putImageData(data, 0, 0);
      const href = canvas.toDataURL();
      const parts = [primitive("feImage", {
        href,
        x: "0",
        y: "0",
        width: String(width),
        height: String(height),
        preserveAspectRatio: "none",
        result: "lens"
      })];
      const displace = (result, scale) => primitive("feDisplacementMap", {
        in: "SourceGraphic",
        in2: "lens",
        scale: String(scale),
        xChannelSelector: "R",
        yChannelSelector: "G",
        result
      });
      parts.push(displace("refracted", map.scale));
      if (width * height < 22e4 && element.matches("[data-composer-card], [data-menu-material], header")) {
        parts.push(
          primitive("feColorMatrix", { in: "refracted", type: "matrix", values: "0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0", result: "green" }),
          displace("red-offset", map.scale + 0.8),
          primitive("feColorMatrix", { in: "red-offset", type: "matrix", values: "1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0", result: "red" }),
          displace("blue-offset", map.scale - 0.8),
          primitive("feColorMatrix", { in: "blue-offset", type: "matrix", values: "0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0", result: "blue" }),
          primitive("feComposite", { in: "green", in2: "red", operator: "arithmetic", k2: "1", k3: "1", result: "red-green" }),
          primitive("feComposite", { in: "red-green", in2: "blue", operator: "arithmetic", k2: "1", k3: "1" })
        );
      }
      const image = new view.Image();
      image.src = href;
      void image.decode().then(() => {
        if (disposed || !active() || lenses.get(element) !== lens || lens.size !== size) return;
        parts[0].setAttribute("width", String(element.offsetWidth));
        parts[0].setAttribute("height", String(element.offsetHeight));
        lens.filter.replaceChildren(...parts);
        lens.ready = true;
        element.style.setProperty("--asuka-liquid-filter", `url("#${lens.filter.id}")`);
        element.setAttribute("data-asuka-liquid-glass", "true");
      }, () => {
      });
    } catch {
    }
  };
  const sync = (geometry = true) => {
    if (geometry) {
      if (timer) view.clearTimeout(timer);
      timer = 0;
    }
    if (disposed) return;
    if (!motion()) resetLight();
    const found = active() ? new Set(root.querySelectorAll(SURFACES)) : /* @__PURE__ */ new Set();
    for (const [element, lens] of lenses) if (!found.has(element)) release(element, lens);
    for (const element of found) {
      let lens = lenses.get(element);
      if (!lens) {
        if (lenses.size >= 12) continue;
        const filter = root.createElementNS(SVG_NS, "filter");
        filter.id = `asuka-liquid-lens-${++sequence}`;
        filter.setAttribute("filterUnits", "objectBoundingBox");
        filter.setAttribute("primitiveUnits", "userSpaceOnUse");
        filter.setAttribute("x", "0");
        filter.setAttribute("y", "0");
        filter.setAttribute("width", "1");
        filter.setAttribute("height", "1");
        filter.setAttribute("color-interpolation-filters", "sRGB");
        defs.append(filter);
        lens = {
          filter,
          size: "",
          ready: false,
          property: element.style.getPropertyValue("--asuka-liquid-filter"),
          priority: element.style.getPropertyPriority("--asuka-liquid-filter"),
          attribute: element.getAttribute("data-asuka-liquid-glass")
        };
        lenses.set(element, lens);
        resize.observe(element);
      }
      if (geometry || !lens.ready) update(element, lens);
    }
  };
  const schedule = () => {
    if (timer) view.clearTimeout(timer);
    timer = view.setTimeout(sync, 100);
  };
  const resize = new view.ResizeObserver((entries) => {
    for (const entry of entries) {
      const element = entry.target;
      const lens = lenses.get(element);
      const image = lens?.filter.querySelector("feImage");
      if (image && element.offsetWidth > 0 && element.offsetHeight > 0) {
        if (image.getAttribute("width") !== String(element.offsetWidth)) image.setAttribute("width", String(element.offsetWidth));
        if (image.getAttribute("height") !== String(element.offsetHeight)) image.setAttribute("height", String(element.offsetHeight));
      }
    }
    schedule();
  });
  const tree = new view.MutationObserver((records) => {
    const changed = [...lenses.keys()].some((element) => !element.isConnected) || records.some((record) => [...record.addedNodes].some((node) => node instanceof view.HTMLElement && (node.matches(SURFACES) || node.querySelector(SURFACES))));
    if (changed) sync(false);
  });
  tree.observe(root.body, { childList: true, subtree: true });
  const appearance = new view.MutationObserver(() => {
    if (!active()) for (const [element, lens] of lenses) release(element, lens);
    if (!motion()) resetLight();
    schedule();
  });
  appearance.observe(root.body, { attributes: true, attributeFilter: ["data-asuka-school-theme", "data-asuka-school-scene", "data-asuka-school-reduce-motion"] });
  const move = (event) => {
    if (!motion() || event.pointerType === "touch") {
      clearLight();
      return;
    }
    const element = event.target instanceof view.Element ? event.target.closest(SURFACES) : null;
    if (!element || !lenses.has(element)) {
      clearLight();
      return;
    }
    if (light !== element) {
      clearLight();
      light = element;
    }
    const rect = element.getBoundingClientRect();
    pointer = { element, ...glassHighlight(rect.width, rect.height, event.clientX - rect.left, event.clientY - rect.top) };
    if (frame) return;
    frame = view.requestAnimationFrame(() => {
      frame = 0;
      if (!pointer || !motion()) return;
      pointer.element.style.setProperty("--asuka-liquid-pointer-x", `${pointer.x.toFixed(1)}%`);
      pointer.element.style.setProperty("--asuka-liquid-pointer-y", `${pointer.y.toFixed(1)}%`);
      pointer.element.style.setProperty("--asuka-liquid-pointer-strength", pointer.strength.toFixed(3));
    });
  };
  root.addEventListener("pointermove", move, { passive: true });
  root.addEventListener("pointerleave", clearLight);
  reduced.addEventListener("change", resetLight);
  sync();
  return () => {
    disposed = true;
    if (timer) view.clearTimeout(timer);
    resetLight();
    tree.disconnect();
    appearance.disconnect();
    resize.disconnect();
    for (const [element, lens] of lenses) release(element, lens);
    svg.remove();
    if (engineAttribute === null) root.body.removeAttribute("data-asuka-liquid-engine");
    else root.body.setAttribute("data-asuka-liquid-engine", engineAttribute);
    root.removeEventListener("pointermove", move);
    root.removeEventListener("pointerleave", clearLight);
    reduced.removeEventListener("change", resetLight);
  };
}

// src/client/rightbar-layout.ts
var FRAME = "div:has(> [data-rightbar-col])";
var PANEL = "[data-sidebar-right-panel]";
var MARKER = "data-asuka-narrow-rightbar";
var BUTTON_MARKER = "data-asuka-rightbar-mode";
var WIDTHS = ["--asuka-narrow-sidebar-width", "--asuka-narrow-panel-width", "--asuka-narrow-track-width", "--asuka-narrow-full-width"];
function narrowRightbarWidths(width, sidebar) {
  const left = Math.max(0, Math.min(width, sidebar));
  return { left, right: Math.min(340, Math.max(0, width - left) * 0.45) };
}
function matchesRightbarShortcut(event, shortcut) {
  if (event.isComposing || event.keyCode === 229 || event.getModifierState("AltGraph")) return false;
  return shortcut.split(/\s+/).some((binding) => {
    const parts = binding.split("+");
    const key = parts.pop()?.toLowerCase();
    const modifiers = new Set(parts.map((part) => part.toLowerCase()));
    if (!key || [...modifiers].some((part) => !["control", "alt", "shift", "meta"].includes(part))) return false;
    const code = event.code.replace(/^(Key|Digit)/, "").toLowerCase();
    return (key === code || key === event.key.toLowerCase() && !event.code.startsWith("Numpad")) && event.ctrlKey === modifiers.has("control") && event.altKey === modifiers.has("alt") && event.shiftKey === modifiers.has("shift") && event.metaKey === modifiers.has("meta");
  });
}
function installNarrowRightbarLayout(root = document) {
  const view = root.defaultView;
  if (!view?.MutationObserver || !view.ResizeObserver) return () => {
  };
  const states = /* @__PURE__ */ new Map();
  let pending = 0;
  let disposed = false;
  let composing = false;
  const restoreTooltip = (state) => {
    const tip = state.tooltip;
    if (!tip) return;
    if (tip.text.data === tip.appliedLabel) tip.text.data = tip.label;
    if (tip.element.getAttribute("aria-label") === tip.appliedAria) {
      if (tip.aria === null) tip.element.removeAttribute("aria-label");
      else tip.element.setAttribute("aria-label", tip.aria);
    }
    state.tooltip = void 0;
  };
  const restoreLabel = (state) => {
    restoreTooltip(state);
    if (state.button) {
      if (state.button.getAttribute("aria-label") === state.appliedLabel) {
        if (state.label === null) state.button.removeAttribute("aria-label");
        else state.button.setAttribute("aria-label", state.label);
      }
      if (state.buttonMarker == null) state.button.removeAttribute(BUTTON_MARKER);
      else state.button.setAttribute(BUTTON_MARKER, state.buttonMarker);
      state.button = void 0;
      state.appliedLabel = void 0;
    }
  };
  const restore = (frame, state) => {
    restoreLabel(state);
    if (state.marker === null) frame.removeAttribute(MARKER);
    else frame.setAttribute(MARKER, state.marker);
    WIDTHS.forEach((name, index) => {
      const saved = state.styles[index];
      if (saved.value) frame.style.setProperty(name, saved.value, saved.priority);
      else frame.style.removeProperty(name);
    });
    resize.unobserve(frame);
    states.delete(frame);
  };
  const sync = () => {
    pending = 0;
    if (disposed) return;
    const active = root.body.hasAttribute("data-asuka-school-theme");
    const frames = new Set(root.querySelectorAll(FRAME));
    for (const [frame, state] of states) {
      if (!active || !frames.has(frame) || frame.getBoundingClientRect().width >= 768) restore(frame, state);
    }
    if (!active) return;
    for (const frame of frames) {
      const width = frame.getBoundingClientRect().width;
      if (width >= 768 || width <= 0) continue;
      const panel = frame.querySelector(`${PANEL}:not([hidden], [hidden] *)`);
      if (!panel) {
        const state2 = states.get(frame);
        if (state2) restore(frame, state2);
        continue;
      }
      let state = states.get(frame);
      if (!state) {
        state = { marker: frame.getAttribute(MARKER), styles: WIDTHS.map((name) => ({
          value: frame.style.getPropertyValue(name),
          priority: frame.style.getPropertyPriority(name)
        })), fullscreen: false, label: null };
        states.set(frame, state);
        resize.observe(frame);
      }
      if (state.panel !== panel) {
        restoreLabel(state);
        state.panel = panel;
        state.fullscreen = false;
      }
      const sidebar = Number.parseFloat(frame.style.gridTemplateColumns) || 0;
      const sizes = narrowRightbarWidths(width, sidebar);
      const values = [`${sizes.left}px`, `${sizes.right}px`, panel.hasAttribute("data-sidebar-right-open") ? `${sizes.right}px` : "0px", `${width}px`];
      WIDTHS.forEach((name, index) => {
        if (frame.style.getPropertyValue(name) !== values[index]) frame.style.setProperty(name, values[index]);
      });
      const fullscreen = state.fullscreen;
      const mode = fullscreen ? "fullscreen" : "push";
      if (frame.getAttribute(MARKER) !== mode) frame.setAttribute(MARKER, mode);
      const button = panel.querySelector("[data-sidebar-right-mode]");
      if (button !== state.button) {
        restoreLabel(state);
        state.button = button ?? void 0;
        state.label = button?.getAttribute("aria-label") ?? null;
        state.buttonMarker = button?.getAttribute(BUTTON_MARKER) ?? null;
      }
      if (button) {
        const nativeLabel = button.getAttribute("aria-label");
        if (nativeLabel !== state.appliedLabel) state.label = nativeLabel;
        const chinese = /[\u4e00-\u9fff]/.test(state.label ?? "");
        const label = fullscreen ? chinese ? "\u9000\u51FA\u5168\u5C4F" : "Exit fullscreen" : chinese ? "\u5168\u5C4F" : "Fullscreen";
        if (button.getAttribute("aria-label") !== label) button.setAttribute("aria-label", label);
        state.appliedLabel = label;
        button.setAttribute(BUTTON_MARKER, mode);
        const tip = button.nextElementSibling;
        const text = tip?.matches('[role="tooltip"]') ? tip.firstElementChild?.firstChild : null;
        if (state.tooltip?.element !== tip || state.tooltip?.text !== text) restoreTooltip(state);
        if (tip instanceof view.HTMLElement && text instanceof view.Text) {
          const saved = state.tooltip ??= {
            element: tip,
            text,
            label: text.data,
            aria: tip.getAttribute("aria-label"),
            appliedLabel: text.data,
            appliedAria: tip.getAttribute("aria-label")
          };
          if (text.data !== saved.appliedLabel) saved.label = text.data;
          if (tip.getAttribute("aria-label") !== saved.appliedAria) saved.aria = tip.getAttribute("aria-label");
          const aria = saved.aria?.startsWith(saved.label) ? label + saved.aria.slice(saved.label.length) : saved.aria;
          if (text.data !== label) text.data = label;
          if (aria !== null && tip.getAttribute("aria-label") !== aria) tip.setAttribute("aria-label", aria);
          saved.appliedLabel = label;
          saved.appliedAria = aria;
        }
      }
    }
  };
  const schedule = () => {
    if (!disposed && !pending) pending = view.requestAnimationFrame(sync);
  };
  const resize = new view.ResizeObserver(schedule);
  const mutations = new view.MutationObserver((records) => {
    if (records.some((record) => record.type === "characterData" ? record.target.parentElement?.closest('[role="tooltip"]') != null : record.type === "childList" ? [...record.addedNodes, ...record.removedNodes].some((node) => node instanceof view.HTMLElement && (node.matches(`${FRAME}, ${PANEL}, [data-sidebar-right-mode], [role="tooltip"]`) || node.querySelector(PANEL))) : record.target === root.body || record.target instanceof view.HTMLElement && (record.target.matches(`${FRAME}, ${PANEL}, [data-sidebar-right-mode], [role="tooltip"]`) || record.attributeName === "hidden"))) schedule();
  });
  mutations.observe(root.body, {
    childList: true,
    subtree: true,
    attributes: true,
    characterData: true,
    attributeFilter: ["style", "hidden", "aria-label", "data-sidebar-right-open", "data-sidebar-right-panel", "data-asuka-school-theme"]
  });
  const toggle = (event) => {
    if (!(event.target instanceof view.Element)) return;
    const button = event.target.closest("[data-sidebar-right-mode]");
    const frame = button?.closest(FRAME);
    const state = frame && states.get(frame);
    if (!frame || !state || !root.body.hasAttribute("data-asuka-school-theme") || frame.getBoundingClientRect().width >= 768) return;
    event.preventDefault();
    event.stopPropagation();
    state.fullscreen = !state.fullscreen;
    sync();
  };
  const keydown = (event) => {
    if (event.defaultPrevented || composing || !(event.target instanceof view.Element) || root.querySelector('[role="dialog"][aria-modal="true"], [role="menu"]')) return;
    const panel = event.target.closest(PANEL);
    const frame = panel?.closest(FRAME);
    const state = frame && states.get(frame);
    const button = state?.button;
    if (!frame || !panel?.hasAttribute("data-sidebar-right-open") || !state || !button || event.target.closest('[data-dockkit-host="dock"]') === null || event.target.closest("[hidden], [inert]") || button.hasAttribute("disabled") || !root.body.hasAttribute("data-asuka-school-theme") || frame.getBoundingClientRect().width >= 768 || !matchesRightbarShortcut(event, button.getAttribute("aria-keyshortcuts") ?? "")) return;
    event.preventDefault();
    if (!event.repeat) {
      state.fullscreen = !state.fullscreen;
      sync();
    }
  };
  const compositionStart = () => {
    composing = true;
  };
  const compositionEnd = () => {
    composing = false;
  };
  root.addEventListener("click", toggle, true);
  root.addEventListener("keydown", keydown);
  root.addEventListener("compositionstart", compositionStart, true);
  root.addEventListener("compositionend", compositionEnd, true);
  view.addEventListener("blur", compositionEnd);
  sync();
  return () => {
    disposed = true;
    if (pending) view.cancelAnimationFrame(pending);
    mutations.disconnect();
    resize.disconnect();
    root.removeEventListener("click", toggle, true);
    root.removeEventListener("keydown", keydown);
    root.removeEventListener("compositionstart", compositionStart, true);
    root.removeEventListener("compositionend", compositionEnd, true);
    view.removeEventListener("blur", compositionEnd);
    for (const [frame, state] of states) restore(frame, state);
  };
}

// src/client/index.ts
var inject = ["slots", "locale", "sessions", "configForms"];
function apply(ctx) {
  ctx.effect(() => installAsukaStyles(), "asuka-school-theme: owned styles");
  ctx.effect(() => installLiquidGlass(), "asuka-school-theme: liquid glass optics");
  ctx.effect(() => installWorkspacePickerToggleGuard(), "asuka-school-theme: workspace picker toggle compatibility");
  ctx.effect(() => installCommandMenuToggleGuard(), "asuka-school-theme: command menu toggle compatibility");
  ctx.effect(() => installDockCloseMotion(), "asuka-school-theme: dock close motion");
  ctx.effect(() => installNarrowRightbarLayout(), "asuka-school-theme: narrow rightbar layout");
  ctx.effect(() => ctx.locale.register(ASUKA_LOCALE_NAMESPACE, asukaLocales), "asuka-school-theme: locales");
  const scope = ctx.configForms.get(ASUKA_SETTINGS_NAMESPACE_ID);
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
  ctx.slots.inject("conversation.session.header.actions", () => ctx.slots.register({
    name: "conversation.session.header.actions",
    id: "asuka-session-title-editor",
    order: 20,
    locale: ASUKA_LOCALE_NAMESPACE,
    inject: (sessionId) => ({
      renameTitle: (title) => renameSessionTitle(ctx.sessions, sessionId, title)
    })
  }, SessionTitleEditor));
}

    return module.exports;
  },
});
