import type { LocaleDict } from '@deepseek-ai/dsh-client-locale/client'

export const ASUKA_LOCALE_NAMESPACE = 'settings.asuka-school'

export type AsukaLocaleKey =
  | 'quick.kicker'
  | 'quick.label'
  | 'quick.description'
  | 'mode.off'
  | 'mode.afterClass'
  | 'mode.tokyo3Night'
  | 'scene.morning'
  | 'scene.noon'
  | 'scene.night'
  | 'scene.morningDetail'
  | 'scene.noonDetail'
  | 'scene.nightDetail'
  | 'section.title'
  | 'section.kicker'
  | 'section.heading'
  | 'section.description'
  | 'section.themeLabel'
  | 'section.wallpaperLabel'
  | 'section.wallpaperHint'
  | 'section.periodLabel'
  | 'section.periodHint'
  | 'section.opacityLabel'
  | 'section.opacityValue'
  | 'section.blurLabel'
  | 'section.blurValue'
  | 'section.decorativeLabel'
  | 'section.decorativeHint'
  | 'section.motionLabel'
  | 'section.motionHint'
  | 'section.assetsLabel'
  | 'section.assetsValue'
  | 'section.interface'
  | 'section.afterClassDetail'
  | 'section.tokyo3NightDetail'
  | 'section.offDetail'
  | 'section.reset'
  | 'section.loading'
  | 'timing.auto'
  | 'timing.morning'
  | 'timing.noon'
  | 'timing.night'

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    'settings.asuka-school': AsukaLocaleKey
  }
}

export const asukaLocales: Record<'zh' | 'en', Record<AsukaLocaleKey, string>> = {
  zh: {
    'quick.kicker': 'ASUKA // 02',
    'quick.label': '明日香学园',
    'quick.description': '选择早、中、晚场景，或让 DeepSeek Harness 保持原有外观。',
    'mode.off': '关闭',
    'mode.afterClass': '上学路上',
    'mode.tokyo3Night': '东京-3 夜',
    'scene.morning': '上学路上',
    'scene.noon': '午间教室',
    'scene.night': '东京-3 夜',
    'scene.morningDetail': '清晨街道 · 校服蓝 · 领结红',
    'scene.noonDetail': '明亮教室 · 中性日光 · 窗外城市',
    'scene.nightDetail': '夜蓝 · 城市灯光 · EVA-02 余烬',
    'section.title': 'Theme-Asuka',
    'section.kicker': 'ASUKA // 02',
    'section.heading': '早中晚的工作台',
    'section.description': '上学路上、午间教室与东京-3 夜；视觉上鲜明，工作时依旧安静。',
    'section.themeLabel': '场景预设',
    'section.wallpaperLabel': '壁纸',
    'section.wallpaperHint': '仅在启用明日香主题时显示，并始终保持在工作内容之后。',
    'section.periodLabel': '壁纸时段',
    'section.periodHint': '自动模式按本机时间在边界平滑切换；也可手动锁定以预览。',
    'section.opacityLabel': '壁纸透明度',
    'section.opacityValue': '{value}%',
    'section.blurLabel': '壁纸模糊',
    'section.blurValue': '{value}px',
    'section.decorativeLabel': '装饰细节',
    'section.decorativeHint': '显示橙色选中轨与主题专属设置页细节。',
    'section.motionLabel': '减少动态效果',
    'section.motionHint': '关闭壁纸淡入和主题过渡。',
    'section.assetsLabel': '公开壁纸资产',
    'section.assetsValue': '3 张原创生成 WebP（早 / 午 / 晚，随插件发布）',
    'section.interface': '界面',
    'section.afterClassDetail': '清晨街道 · 校服蓝 · 领结红',
    'section.tokyo3NightDetail': '夜蓝 · 城市灯光 · EVA-02 余烬',
    'section.offDetail': '恢复当前 DSH 外观',
    'section.reset': '重置明日香设置',
    'section.loading': '正在读取 DSH 设置…',
    'timing.auto': '自动（按本机时间）',
    'timing.morning': '早 · 06:00–11:00',
    'timing.noon': '午 · 11:00–17:00',
    'timing.night': '晚 · 17:00–次日 06:00',
  },
  en: {
    'quick.kicker': 'ASUKA // 02',
    'quick.label': 'Asuka School',
    'quick.description': 'Pick a morning, noon, or night scene, or leave DeepSeek Harness exactly as it is.',
    'mode.off': 'Off',
    'mode.afterClass': 'On the Way to School',
    'mode.tokyo3Night': 'Tokyo-3 Night',
    'scene.morning': 'On the Way to School',
    'scene.noon': 'Noon Classroom',
    'scene.night': 'Tokyo-3 Night',
    'scene.morningDetail': 'Morning street · school blue · ribbon red',
    'scene.noonDetail': 'Bright classroom · neutral daylight · city window',
    'scene.nightDetail': 'Night navy · city light · EVA-02 ember',
    'section.title': 'Theme-Asuka',
    'section.kicker': 'ASUKA // 02',
    'section.heading': 'A desk through the day',
    'section.description': 'Morning commute, noon classroom, and Tokyo-3 night: lively to look at, quiet to work in.',
    'section.themeLabel': 'Scene presets',
    'section.wallpaperLabel': 'Wallpaper',
    'section.wallpaperHint': 'Only appears while an Asuka theme is active and always stays behind your work.',
    'section.periodLabel': 'Wallpaper time',
    'section.periodHint': 'Auto follows local time and crossfades at each boundary; choose a period to preview it manually.',
    'section.opacityLabel': 'Wallpaper opacity',
    'section.opacityValue': '{value}%',
    'section.blurLabel': 'Wallpaper blur',
    'section.blurValue': '{value}px',
    'section.decorativeLabel': 'Decorative details',
    'section.decorativeHint': 'Show the orange selection rail and Asuka-specific settings details.',
    'section.motionLabel': 'Reduce motion',
    'section.motionHint': 'Disable wallpaper fades and theme transitions.',
    'section.assetsLabel': 'Public wallpaper assets',
    'section.assetsValue': '3 original generated WebPs for morning, noon, and night, shipped with the plugin',
    'section.interface': 'Interface',
    'section.afterClassDetail': 'Morning street · school blue · ribbon red',
    'section.tokyo3NightDetail': 'Night navy · city light · EVA-02 ember',
    'section.offDetail': 'Return to the current DSH appearance',
    'section.reset': 'Reset Asuka settings',
    'section.loading': 'Reading DSH settings…',
    'timing.auto': 'Auto (local time)',
    'timing.morning': 'Morning · 06:00–11:00',
    'timing.noon': 'Noon · 11:00–17:00',
    'timing.night': 'Night · 17:00–06:00',
  },
}

// Guard the exact dictionary shape at compile time without creating a runtime dependency.
void (asukaLocales satisfies Record<'zh' | 'en', LocaleDict>)
