import type { WallpaperPeriod } from './settings.js';
export declare const WALLPAPER_ROUTE_PREFIX = "/asuka-school/assets";
export declare const WALLPAPER_ASSET_VERSION = "0.2.6.1";
export declare const WALLPAPER_ASSET_NAMES: Readonly<Record<WallpaperPeriod, string>>;
export declare function wallpaperAssetUrl(period: WallpaperPeriod): string;
/** The slider value maps directly to the wallpaper layer, including 100%. */
export declare function wallpaperOpacityForPeriod(opacity: number, _period: WallpaperPeriod): number;
//# sourceMappingURL=wallpapers.d.ts.map