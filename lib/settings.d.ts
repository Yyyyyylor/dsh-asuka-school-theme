import z from '@deepseek-ai/schemastery';
export * from './shared/settings.js';
export declare const ASUKA_SETTINGS_NAMESPACE: import("@deepseek-ai/dsh-settings").SettingsNamespace;
export declare const AsukaThemeSettingsSchema: z<Schemastery.ObjectS<{
    mode: z<"off" | "after-class" | "tokyo3-night", "off" | "after-class" | "tokyo3-night">;
    wallpaperEnabled: z<boolean, boolean>;
    wallpaperPeriod: z<"auto" | "morning" | "noon" | "night", "auto" | "morning" | "noon" | "night">;
    wallpaperOpacity: z<number, number>;
    wallpaperBlurPx: z<number, number>;
    decorativeDetails: z<boolean, boolean>;
    reduceMotion: z<boolean, boolean>;
}>, Schemastery.ObjectT<{
    mode: z<"off" | "after-class" | "tokyo3-night", "off" | "after-class" | "tokyo3-night">;
    wallpaperEnabled: z<boolean, boolean>;
    wallpaperPeriod: z<"auto" | "morning" | "noon" | "night", "auto" | "morning" | "noon" | "night">;
    wallpaperOpacity: z<number, number>;
    wallpaperBlurPx: z<number, number>;
    decorativeDetails: z<boolean, boolean>;
    reduceMotion: z<boolean, boolean>;
}>>;
//# sourceMappingURL=settings.d.ts.map