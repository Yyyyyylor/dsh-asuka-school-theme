import type { PropsLocale, PropsRuntime, PropsStore } from '@deepseek-ai/dsh-client-ui-slots';
import { type AsukaMode, type WallpaperPeriod, type WallpaperPeriodPreference } from '../../shared/settings.js';
import type { createAsukaSettingsStore } from './settings-store.js';
interface AsukaSectionInjected {
    setMode: (mode: AsukaMode) => void;
    setScene: (period: WallpaperPeriod) => void;
    setWallpaperEnabled: (value: boolean) => void;
    setWallpaperPeriod: (value: WallpaperPeriodPreference) => void;
    setOpacity: (value: number) => void;
    setBlur: (value: number) => void;
    previewOpacity: (value: number) => void;
    previewBlur: (value: number) => void;
    setDecorativeDetails: (value: boolean) => void;
    setReduceMotion: (value: boolean) => void;
    reset: () => void;
}
type AsukaSectionProps = PropsRuntime<'settings.section'> & PropsStore<ReturnType<typeof createAsukaSettingsStore>> & PropsLocale<'settings.asuka-school'> & AsukaSectionInjected;
export declare function AsukaSection({ t, useStore, setMode, setScene, setWallpaperEnabled, setWallpaperPeriod, setOpacity, setBlur, previewOpacity, previewBlur, setDecorativeDetails, setReduceMotion, reset, }: AsukaSectionProps): import("react").JSX.Element;
export declare function RangeRow({ label, value, min, max, suffix, onPreview, onCommit }: {
    label: string;
    value: number;
    min: number;
    max: number;
    suffix: string;
    onPreview: (value: number) => void;
    onCommit: (value: number) => void;
}): import("react").JSX.Element;
export {};
//# sourceMappingURL=AsukaSection.d.ts.map