import { defineStore } from '@deepseek-ai/dsh-client-runtime/client'
import { DEFAULT_ASUKA_SETTINGS, type AsukaThemeSettings } from '../../shared/settings.js'

export interface AsukaSettingsViewState {
  status: 'loading' | 'ready' | 'unavailable'
  settings: AsukaThemeSettings
  revision: number
}

type AsukaSettingsStoreActions = {
  sync: (draft: AsukaSettingsViewState, next: AsukaSettingsViewState) => void
}

export function createAsukaSettingsStore() {
  return defineStore<AsukaSettingsViewState, AsukaSettingsStoreActions>({
    init: () => ({
      status: 'loading',
      settings: { ...DEFAULT_ASUKA_SETTINGS },
      revision: -1,
    }),
    actions: {
      sync: (draft, next) => {
        draft.status = next.status
        draft.settings = next.settings
        draft.revision = next.revision
      },
    },
  })
}
