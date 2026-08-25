import type { ChangeEvent } from 'react'
import type { PropsLocale, PropsRuntime, PropsStore } from '@deepseek-ai/dsh-client-ui-slots'
import { resolveWallpaperPeriod, type AsukaMode, type WallpaperPeriod, type WallpaperPeriodPreference } from '../../shared/settings.js'
import type { createAsukaSettingsStore } from './settings-store.js'

interface AsukaSectionInjected {
  setMode: (mode: AsukaMode) => void
  setScene: (period: WallpaperPeriod) => void
  setWallpaperEnabled: (value: boolean) => void
  setWallpaperPeriod: (value: WallpaperPeriodPreference) => void
  setOpacity: (value: number) => void
  setBlur: (value: number) => void
  setDecorativeDetails: (value: boolean) => void
  setReduceMotion: (value: boolean) => void
  reset: () => void
}

type AsukaSectionProps = PropsRuntime<'settings.section'>
  & PropsStore<ReturnType<typeof createAsukaSettingsStore>>
  & PropsLocale<'settings.asuka-school'>
  & AsukaSectionInjected

export function AsukaSection({
  t,
  useStore,
  setMode,
  setScene,
  setWallpaperEnabled,
  setWallpaperPeriod,
  setOpacity,
  setBlur,
  setDecorativeDetails,
  setReduceMotion,
  reset,
}: AsukaSectionProps) {
  const { settings, status } = useStore(state => state)
  const disabled = status !== 'ready'
  const percentage = Math.round(settings.wallpaperOpacity * 100)
  const selectedScene = settings.mode === 'off' ? 'off' : resolveWallpaperPeriod(settings.wallpaperPeriod)

  return (
    <section className="asuka-section" aria-labelledby="asuka-school-title">
      <header className="asuka-section-header">
        <span className="asuka-kicker">{t('section.kicker')}</span>
        <h2 id="asuka-school-title">{t('section.heading')}</h2>
        <p>{t('section.description')}</p>
      </header>

      <fieldset className="asuka-setting-group" disabled={disabled}>
        <legend>{t('section.themeLabel')}</legend>
        <div className="asuka-theme-cards">
          <SceneCard scene="morning" selected={selectedScene === 'morning'} onSelect={setScene} title={t('scene.morning')} detail={t('scene.morningDetail')} />
          <SceneCard scene="noon" selected={selectedScene === 'noon'} onSelect={setScene} title={t('scene.noon')} detail={t('scene.noonDetail')} />
          <SceneCard scene="night" selected={selectedScene === 'night'} onSelect={setScene} title={t('scene.night')} detail={t('scene.nightDetail')} />
          <ThemeCard mode="off" selected={settings.mode === 'off'} onSelect={setMode} title={t('mode.off')} detail={t('section.offDetail')} />
        </div>
      </fieldset>

      <fieldset className="asuka-setting-group" disabled={disabled || settings.mode === 'off'}>
        <legend>{t('section.wallpaperLabel')}</legend>
        <ToggleRow label={t('section.wallpaperLabel')} hint={t('section.wallpaperHint')} checked={settings.wallpaperEnabled} onChange={setWallpaperEnabled} />
        <TimingRow
          label={t('section.periodLabel')}
          hint={t('section.periodHint')}
          value={settings.wallpaperPeriod}
          onChange={setWallpaperPeriod}
          options={{ auto: t('timing.auto'), morning: t('timing.morning'), noon: t('timing.noon'), night: t('timing.night') }}
        />
        <RangeRow label={t('section.opacityLabel')} value={percentage} min={0} max={100} suffix="%" onChange={event => setOpacity(Number(event.currentTarget.value) / 100)} />
        <RangeRow label={t('section.blurLabel')} value={settings.wallpaperBlurPx} min={0} max={20} suffix="px" onChange={event => setBlur(Number(event.currentTarget.value))} />
      </fieldset>

      <fieldset className="asuka-setting-group" disabled={disabled}>
        <legend>{t('section.interface')}</legend>
        <ToggleRow label={t('section.decorativeLabel')} hint={t('section.decorativeHint')} checked={settings.decorativeDetails} onChange={setDecorativeDetails} />
        <ToggleRow label={t('section.motionLabel')} hint={t('section.motionHint')} checked={settings.reduceMotion} onChange={setReduceMotion} />
      </fieldset>

      <footer className="asuka-section-footer">
        <span><b>{t('section.assetsLabel')}</b><br />{t('section.assetsValue')}</span>
        <button className="asuka-reset-button" type="button" disabled={disabled} onClick={reset}>{t('section.reset')}</button>
      </footer>
    </section>
  )
}

function TimingRow({ label, hint, value, onChange, options }: {
  label: string
  hint: string
  value: WallpaperPeriodPreference
  onChange: (value: WallpaperPeriodPreference) => void
  options: Record<WallpaperPeriodPreference, string>
}) {
  return (
    <label className="asuka-select-row">
      <span><b>{label}</b><small>{hint}</small></span>
      <select value={value} onChange={event => onChange(event.currentTarget.value as WallpaperPeriodPreference)}>
        <option value="auto">{options.auto}</option>
        <option value="morning">{options.morning}</option>
        <option value="noon">{options.noon}</option>
        <option value="night">{options.night}</option>
      </select>
    </label>
  )
}

function SceneCard({ scene, selected, onSelect, title, detail }: { scene: WallpaperPeriod, selected: boolean, onSelect: (scene: WallpaperPeriod) => void, title: string, detail: string }) {
  return (
    <button type="button" className="asuka-theme-card" aria-pressed={selected} onClick={() => onSelect(scene)}>
      <span className={`asuka-theme-swatch asuka-theme-swatch-${scene}`} aria-hidden="true" />
      <span><b>{title}</b><small>{detail}</small></span>
    </button>
  )
}

function ThemeCard({ mode, selected, onSelect, title, detail }: { mode: AsukaMode, selected: boolean, onSelect: (mode: AsukaMode) => void, title: string, detail: string }) {
  return (
    <button type="button" className="asuka-theme-card" aria-pressed={selected} onClick={() => onSelect(mode)}>
      <span className={`asuka-theme-swatch asuka-theme-swatch-${mode}`} aria-hidden="true" />
      <span><b>{title}</b><small>{detail}</small></span>
    </button>
  )
}

function ToggleRow({ label, hint, checked, onChange }: { label: string, hint: string, checked: boolean, onChange: (value: boolean) => void }) {
  return (
    <label className="asuka-toggle-row">
      <span><b>{label}</b><small>{hint}</small></span>
      <input type="checkbox" checked={checked} onChange={event => onChange(event.currentTarget.checked)} />
    </label>
  )
}

function RangeRow({ label, value, min, max, suffix, onChange }: { label: string, value: number, min: number, max: number, suffix: string, onChange: (event: ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <label className="asuka-range-row">
      <span><b>{label}</b><small>{value}{suffix}</small></span>
      <input type="range" min={min} max={max} value={value} onChange={onChange} />
    </label>
  )
}
