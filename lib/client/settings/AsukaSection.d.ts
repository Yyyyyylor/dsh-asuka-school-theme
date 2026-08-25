import type { PropsLocale, PropsRuntime, PropsStore } from '@deepseek-ai/dsh-client-ui-slots';
import type { AsukaMode, WallpaperPeriodPreference } from '../../shared/settings.js';
import type { createAsukaSettingsStore } from './settings-store.js';
interface AsukaSectionInjected {
    setMode: (mode: AsukaMode) => void;
    setWallpaperEnabled: (value: boolean) => void;
    setWallpaperPeriod: (value: WallpaperPeriodPreference) => void;
    setOpacity: (value: number) => void;
    setBlur: (value: number) => void;
    setDecorativeDetails: (value: boolean) => void;
    setReduceMotion: (value: boolean) => void;
    reset: () => void;
}
type AsukaSectionProps = PropsRuntime<'settings.section'> & PropsStore<ReturnType<typeof createAsukaSettingsStore>> & PropsLocale<'settings.asuka-school'> & AsukaSectionInjected;
export declare function AsukaSection({ t, useStore, setMode, setWallpaperEnabled, setWallpaperPeriod, setOpacity, setBlur, setDecorativeDetails, setReduceMotion, reset, }: AsukaSectionProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=AsukaSection.d.ts.map