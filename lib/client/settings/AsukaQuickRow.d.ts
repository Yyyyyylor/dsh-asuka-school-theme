import type { PropsLocale, PropsRuntime, PropsStore } from '@deepseek-ai/dsh-client-ui-slots';
import { type AsukaMode, type WallpaperPeriod } from '../../shared/settings.js';
import type { createAsukaSettingsStore } from './settings-store.js';
interface AsukaQuickRowInjected {
    setMode: (mode: AsukaMode) => void;
    setScene: (period: WallpaperPeriod) => void;
}
type AsukaQuickRowProps = PropsRuntime<'settings.general.item'> & PropsStore<ReturnType<typeof createAsukaSettingsStore>> & PropsLocale<'settings.asuka-school'> & AsukaQuickRowInjected;
export declare function AsukaQuickRow({ t, useStore, setMode, setScene }: AsukaQuickRowProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=AsukaQuickRow.d.ts.map