import type { WallpaperPeriod } from './settings.js';
export declare const WALLPAPER_ROUTE_PREFIX = "/asuka-school/assets";
export declare const WALLPAPER_ASSET_VERSION = "0.2.7";
export declare const WALLPAPER_ASSET_NAMES: Readonly<Record<WallpaperPeriod, string>>;
export interface WallpaperLayerProfile {
    maskStart: string;
    maskMiddle: string;
    maskEnd: string;
    filter: string;
}
/** Each layer owns its visual treatment so old and new scenes can crossfade cleanly. */
export declare const WALLPAPER_LAYER_PROFILES: Readonly<Record<WallpaperPeriod, WallpaperLayerProfile>>;
export declare function wallpaperLayerProfileForPeriod(period: WallpaperPeriod): WallpaperLayerProfile;
export declare function wallpaperAssetUrl(period: WallpaperPeriod): string;
/** The slider value maps directly to the wallpaper layer, including 100%. */
export declare function wallpaperOpacityForPeriod(opacity: number, _period: WallpaperPeriod): number;
//# sourceMappingURL=wallpapers.d.ts.map