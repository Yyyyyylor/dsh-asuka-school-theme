import type { AsukaThemeSettings, WallpaperPeriod } from '../../shared/settings.js';
/** Update only plugin-owned document attributes; no DSH component selectors are involved. */
export declare function applyWallpaper(settings: AsukaThemeSettings, period: WallpaperPeriod): void;
/** Update the two inexpensive wallpaper custom properties without touching the scene layers. */
export declare function updateWallpaperAppearance(opacity: number, blurPx: number, period: WallpaperPeriod): void;
/** Remove exactly the document state this plugin owns. */
export declare function clearWallpaper(): void;
//# sourceMappingURL=runtime.d.ts.map