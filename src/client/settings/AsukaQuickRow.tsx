import type { PropsLocale, PropsRuntime, PropsStore } from '@deepseek-ai/dsh-client-ui-slots'
import { resolveWallpaperPeriod, type AsukaMode, type WallpaperPeriod } from '../../shared/settings.js'
import type { createAsukaSettingsStore } from './settings-store.js'

interface AsukaQuickRowInjected {
  setMode: (mode: AsukaMode) => void
  setScene: (period: WallpaperPeriod) => void
}

type AsukaQuickRowProps = PropsRuntime<'settings.general.item'>
  & PropsStore<ReturnType<typeof createAsukaSettingsStore>>
  & PropsLocale<'settings.asuka-school'>
  & AsukaQuickRowInjected

const SCENES = ['off', 'morning', 'noon', 'night'] as const
type Scene = (typeof SCENES)[number]

export function AsukaQuickRow({ t, useStore, setMode, setScene }: AsukaQuickRowProps) {
  const status = useStore(state => state.status)
  const mode = useStore(state => state.settings.mode)
  const wallpaperPeriod = useStore(state => state.settings.wallpaperPeriod)
  const disabled = status !== 'ready'
  const selectedScene: Scene = mode === 'off'
    ? 'off'
    : resolveWallpaperPeriod(wallpaperPeriod)

  return (
    <section className="asuka-quick-row" aria-label={t('quick.label')}>
      <div className="asuka-quick-copy">
        <span className="asuka-kicker">{t('quick.kicker')}</span>
        <strong>{t('quick.label')}</strong>
        <p>{disabled ? t('section.loading') : t('quick.description')}</p>
      </div>
      <div className="asuka-mode-switch" role="group" aria-label={t('quick.label')}>
        {SCENES.map(scene => (
          <button
            key={scene}
            className="asuka-mode-button"
            type="button"
            aria-pressed={selectedScene === scene}
            disabled={disabled}
            onClick={() => scene === 'off' ? setMode('off') : setScene(scene)}
          >
            {scene === 'off' ? t('mode.off') : t(`scene.${scene}`)}
          </button>
        ))}
      </div>
    </section>
  )
}
