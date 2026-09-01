import type { WallpaperPeriod } from './settings.js'

export const WALLPAPER_ROUTE_PREFIX = '/asuka-school/assets'
export const WALLPAPER_ASSET_VERSION = '2.2.1'

export const WALLPAPER_ASSET_NAMES: Readonly<Record<WallpaperPeriod, string>> = Object.freeze({
  morning: 'asuka-after-class.webp',
  noon: 'asuka-noon.webp',
  night: 'asuka-tokyo3-night.webp',
})

export interface WallpaperLayerProfile {
  maskStart: string
  maskMiddle: string
  maskEnd: string
  filter: string
}

/** Each layer owns its visual treatment so old and new scenes can crossfade cleanly. */
export const WALLPAPER_LAYER_PROFILES: Readonly<Record<WallpaperPeriod, WallpaperLayerProfile>> = Object.freeze({
  morning: {
    maskStart: 'rgba(104, 59, 36, 0.90)',
    maskMiddle: 'rgba(188, 118, 74, 0.68)',
    maskEnd: 'rgba(239, 197, 151, 0.34)',
    filter: 'saturate(0.86) sepia(0.14) brightness(0.9) contrast(0.96)',
  },
  noon: {
    maskStart: 'rgba(224, 228, 224, 0.92)',
    maskMiddle: 'rgba(230, 233, 229, 0.70)',
    maskEnd: 'rgba(238, 240, 235, 0.36)',
    filter: 'saturate(0.72) brightness(0.88) contrast(0.96)',
  },
  night: {
    maskStart: 'rgba(23, 28, 36, 0.90)',
    maskMiddle: 'rgba(23, 28, 36, 0.70)',
    maskEnd: 'rgba(23, 28, 36, 0.42)',
    filter: 'saturate(0.94) brightness(0.9) contrast(1.02)',
  },
})

export function wallpaperLayerProfileForPeriod(period: WallpaperPeriod): WallpaperLayerProfile {
  return WALLPAPER_LAYER_PROFILES[period]
}

export function wallpaperAssetUrl(period: WallpaperPeriod): string {
  return `${WALLPAPER_ROUTE_PREFIX}/${WALLPAPER_ASSET_NAMES[period]}?v=${WALLPAPER_ASSET_VERSION}`
}

/** The slider value maps directly to the wallpaper layer, including 100%. */
export function wallpaperOpacityForPeriod(opacity: number, _period: WallpaperPeriod): number {
  return Math.min(1, Math.max(0, Math.round(opacity * 100) / 100))
}
