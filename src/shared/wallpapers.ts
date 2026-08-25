import type { WallpaperPeriod } from './settings.js'

export const WALLPAPER_ROUTE_PREFIX = '/asuka-school/assets'
export const WALLPAPER_ASSET_VERSION = '0.2.6.1'

export const WALLPAPER_ASSET_NAMES: Readonly<Record<WallpaperPeriod, string>> = Object.freeze({
  morning: 'asuka-after-class.webp',
  noon: 'asuka-noon.webp',
  night: 'asuka-tokyo3-night.webp',
})

export function wallpaperAssetUrl(period: WallpaperPeriod): string {
  return `${WALLPAPER_ROUTE_PREFIX}/${WALLPAPER_ASSET_NAMES[period]}?v=${WALLPAPER_ASSET_VERSION}`
}

/** The slider value maps directly to the wallpaper layer, including 100%. */
export function wallpaperOpacityForPeriod(opacity: number, _period: WallpaperPeriod): number {
  return Math.min(1, Math.max(0, Math.round(opacity * 100) / 100))
}
