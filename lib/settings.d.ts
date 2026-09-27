import z from '@deepseek-ai/schemastery';
export * from './shared/settings.js';
export declare const ASUKA_SETTINGS_NAMESPACE = "asuka-school-theme";
export declare const AsukaThemeSettingsSchema: z<Schemastery.ObjectS<NoInfer<{
    mode: z<"off" | "after-class" | "tokyo3-night", "off" | "after-class" | "tokyo3-night", "defined">;
    wallpaperEnabled: z<boolean, boolean, "defined">;
    wallpaperPeriod: z<"auto" | "morning" | "noon" | "night", "auto" | "morning" | "noon" | "night", "defined">;
    wallpaperOpacity: z<number, number, "defined">;
    wallpaperBlurPx: z<number, number, "defined">;
    decorativeDetails: z<boolean, boolean, "defined">;
    reduceMotion: z<boolean, boolean, "defined">;
}>>, Schemastery.ObjectT<NoInfer<{
    mode: z<"off" | "after-class" | "tokyo3-night", "off" | "after-class" | "tokyo3-night", "defined">;
    wallpaperEnabled: z<boolean, boolean, "defined">;
    wallpaperPeriod: z<"auto" | "morning" | "noon" | "night", "auto" | "morning" | "noon" | "night", "defined">;
    wallpaperOpacity: z<number, number, "defined">;
    wallpaperBlurPx: z<number, number, "defined">;
    decorativeDetails: z<boolean, boolean, "defined">;
    reduceMotion: z<boolean, boolean, "defined">;
}>>, "plain">;
//# sourceMappingURL=settings.d.ts.map