import type { WallpaperPeriod } from './settings.js';
export declare const WALLPAPER_ROUTE_PREFIX = "/asuka-school/assets";
export declare const WALLPAPER_ASSET_VERSION = "0.2.6";
export declare const WALLPAPER_ASSET_NAMES: Readonly<Record<WallpaperPeriod, string>>;
export declare function wallpaperAssetUrl(period: WallpaperPeriod): string;
/** Day scenes stay deliberately quieter than night so work controls remain legible. */
export declare function wallpaperOpacityForPeriod(opacity: number, period: WallpaperPeriod): number;
//# sourceMappingURL=wallpapers.d.ts.map