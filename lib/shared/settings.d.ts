export declare const ASUKA_SETTINGS_NAMESPACE_ID = "asuka-school-theme";
export declare const ASUKA_MODES: readonly ["off", "after-class", "tokyo3-night"];
export type AsukaMode = (typeof ASUKA_MODES)[number];
export declare const WALLPAPER_PERIOD_PREFERENCES: readonly ["auto", "morning", "noon", "night"];
export type WallpaperPeriodPreference = (typeof WALLPAPER_PERIOD_PREFERENCES)[number];
export type WallpaperPeriod = Exclude<WallpaperPeriodPreference, 'auto'>;
export interface AsukaThemeSettings {
    mode: AsukaMode;
    wallpaperEnabled: boolean;
    wallpaperPeriod: WallpaperPeriodPreference;
    wallpaperOpacity: number;
    wallpaperBlurPx: number;
    decorativeDetails: boolean;
    reduceMotion: boolean;
}
export declare const DEFAULT_ASUKA_SETTINGS: Readonly<AsukaThemeSettings>;
export declare function isAsukaMode(value: unknown): value is AsukaMode;
export declare function isWallpaperPeriodPreference(value: unknown): value is WallpaperPeriodPreference;
/** Resolve the requested wallpaper period from the user's local clock. */
export declare function wallpaperPeriodAt(now: Date): WallpaperPeriod;
export declare function resolveWallpaperPeriod(preference: WallpaperPeriodPreference, now?: Date): WallpaperPeriod;
/** Delay until the next 06:00, 11:00, or 17:00 local-time wallpaper boundary. */
export declare function millisecondsUntilNextWallpaperPeriod(now?: Date): number;
export declare function isActiveAsukaMode(mode: AsukaMode): mode is Exclude<AsukaMode, 'off'>;
export declare function clampOpacity(value: number): number;
export declare function clampBlur(value: number): number;
//# sourceMappingURL=settings.d.ts.map