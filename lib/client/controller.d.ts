import type { SettingsScope } from '@deepseek-ai/dsh-client-runtime/client';
import { type AsukaMode, type AsukaThemeSettings, type WallpaperPeriod, type WallpaperPeriodPreference } from '../shared/settings.js';
import type { AsukaSettingsViewState } from './settings/settings-store.js';
export interface AsukaThemeController {
    setMode(mode: AsukaMode): void;
    setScene(period: WallpaperPeriod): void;
    setWallpaperEnabled(value: boolean): void;
    setWallpaperPeriod(value: WallpaperPeriodPreference): void;
    setOpacity(value: number): void;
    setBlur(value: number): void;
    setDecorativeDetails(value: boolean): void;
    setReduceMotion(value: boolean): void;
    reset(): void;
    dispose(): void;
}
interface AsukaThemeControllerOptions {
    settings: SettingsScope<AsukaThemeSettings>;
    syncView: (next: AsukaSettingsViewState) => void;
}
/** Single source of truth for the Quick Row, Settings page, and wallpaper layer. */
export declare function createAsukaThemeController(options: AsukaThemeControllerOptions): AsukaThemeController;
export {};
//# sourceMappingURL=controller.d.ts.map