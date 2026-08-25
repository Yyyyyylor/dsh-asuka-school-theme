import type { PropsLocale, PropsRuntime, PropsStore } from '@deepseek-ai/dsh-client-ui-slots'
import type { AsukaMode } from '../../shared/settings.js'
import type { createAsukaSettingsStore } from './settings-store.js'

interface AsukaQuickRowInjected {
  setMode: (mode: AsukaMode) => void
}

type AsukaQuickRowProps = PropsRuntime<'settings.general.item'>
  & PropsStore<ReturnType<typeof createAsukaSettingsStore>>
  & PropsLocale<'settings.asuka-school'>
  & AsukaQuickRowInjected

const MODES: readonly AsukaMode[] = ['off', 'after-class', 'tokyo3-night']

export function AsukaQuickRow({ t, useStore, setMode }: AsukaQuickRowProps) {
  const { settings, status } = useStore(state => state)
  const disabled = status !== 'ready'

  return (
    <section className="asuka-quick-row" aria-label={t('quick.label')}>
      <div className="asuka-quick-copy">
        <span className="asuka-kicker">{t('quick.kicker')}</span>
        <strong>{t('quick.label')}</strong>
        <p>{disabled ? t('section.loading') : t('quick.description')}</p>
      </div>
      <div className="asuka-mode-switch" role="group" aria-label={t('quick.label')}>
        {MODES.map(mode => (
          <button
            key={mode}
            className="asuka-mode-button"
            type="button"
            aria-pressed={settings.mode === mode}
            disabled={disabled}
            onClick={() => setMode(mode)}
          >
            {mode === 'off' ? t('mode.off') : mode === 'after-class' ? t('mode.afterClass') : t('mode.tokyo3Night')}
          </button>
        ))}
      </div>
    </section>
  )
}
