import { type AsukaThemeSettings } from '../../shared/settings.js';
export interface AsukaSettingsViewState {
    status: 'loading' | 'ready' | 'unavailable';
    settings: AsukaThemeSettings;
    revision: number;
}
type AsukaSettingsStoreActions = {
    sync: (draft: AsukaSettingsViewState, next: AsukaSettingsViewState) => void;
};
export declare function createAsukaSettingsStore(): import("@deepseek-ai/dsh-client-runtime/client").EngineStoreHandle<AsukaSettingsViewState, AsukaSettingsStoreActions>;
export {};
//# sourceMappingURL=settings-store.d.ts.map