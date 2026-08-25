import type { BoundActions } from '@deepseek-ai/dsh-client-ui-slots'
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import type {} from '@deepseek-ai/dsh-client-locale/client'
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import type {} from '@deepseek-ai/dsh-client-ui-settings-general/client'
import type {} from '@deepseek-ai/dsh-client-ui-theme/client'
import { ASUKA_SETTINGS_NAMESPACE_ID, DEFAULT_ASUKA_SETTINGS, type AsukaThemeSettings } from '../shared/settings.js'
import { createAsukaThemeController } from './controller.js'
import { ASUKA_LOCALE_NAMESPACE, asukaLocales } from './locales.js'
import { AsukaQuickRow } from './settings/AsukaQuickRow.js'
import { AsukaSection } from './settings/AsukaSection.js'
import { createAsukaSettingsStore } from './settings/settings-store.js'
import { installAsukaStyles } from './styles.js'
import { asukaDarkTheme, asukaLightTheme } from './themes/index.js'

export const inject = ['theme', 'slots', 'locale', 'connection', 'remote', 'settingsScope']

export function apply(ctx: ClientContext): void {
  ctx.effect(() => installAsukaStyles(), 'asuka-school-theme: owned styles')
  ctx.effect(() => ctx.locale.register(ASUKA_LOCALE_NAMESPACE, asukaLocales), 'asuka-school-theme: locales')
  ctx.effect(() => ctx.theme.register(asukaLightTheme), 'asuka-school-theme: register light theme')
  ctx.effect(() => ctx.theme.register(asukaDarkTheme), 'asuka-school-theme: register dark theme')

  const scope = ctx.settingsScope.bind<AsukaThemeSettings>({ namespace: ASUKA_SETTINGS_NAMESPACE_ID })
  const store = createAsukaSettingsStore()
  let actions: BoundActions<typeof store> | undefined
  const controller = createAsukaThemeController({
    ctx,
    theme: ctx.theme,
    settings: scope,
    syncView: next => actions?.sync(next),
  })
  ctx.effect(() => () => controller.dispose(), 'asuka-school-theme: controller')

  const injectActions = (bound: BoundActions<typeof store>) => {
    actions = bound
    const snapshot = scope.getSnapshot()
    actions.sync({
      status: snapshot.status,
      settings: snapshot.value ?? { ...DEFAULT_ASUKA_SETTINGS },
      revision: snapshot.revision ?? -1,
    })
    return controller
  }

  ctx.slots.inject('settings.general.item', () => ctx.slots.register({
    name: 'settings.general.item',
    id: 'asuka-school-theme',
    order: 40,
    store,
    locale: ASUKA_LOCALE_NAMESPACE,
    inject: injectActions,
  }, AsukaQuickRow))

  const sectionLabel = ctx.locale.bind(ASUKA_LOCALE_NAMESPACE)
  ctx.slots.inject('settings.section', () => ctx.slots.register({
    name: 'settings.section',
    id: 'asuka-school-theme',
    order: 40,
    label: () => sectionLabel('section.title'),
    store,
    locale: ASUKA_LOCALE_NAMESPACE,
    inject: injectActions,
  }, AsukaSection))
}
