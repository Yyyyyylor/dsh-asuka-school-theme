import type { ThemeDefinition } from '@deepseek-ai/dsh-client-ui-theme/client'
import type { AsukaMode, WallpaperPeriod } from '../shared/settings.js'
import { asukaDarkTheme, asukaMorningTheme, asukaNoonTheme } from './themes/index.js'

const THEME_ATTRIBUTE = 'data-asuka-school-theme'
const TRANSITION_ATTRIBUTE = 'data-asuka-school-transitioning'

interface InlineProperty {
  value: string
  priority: string
}

interface BaselineAppearance {
  darkTheme: boolean
  colorScheme: InlineProperty
  tokens: Map<string, InlineProperty>
}

let baseline: BaselineAppearance | undefined
let activeThemeId: string | undefined
let transitionTimer: ReturnType<typeof setTimeout> | undefined

/** Resolve the complete token palette that is presented directly by this plugin. */
export function asukaThemeForMode(mode: AsukaMode, period: WallpaperPeriod = 'noon'): ThemeDefinition | undefined {
  if (mode === 'after-class') return period === 'morning' ? asukaMorningTheme : asukaNoonTheme
  if (mode === 'tokyo3-night') return asukaDarkTheme
  return undefined
}

/**
 * Present the selected palette as plugin-owned inline variables.
 *
 * ThemeRuntime is a registry/event service in the current DSH client build;
 * it does not itself project third-party theme definitions into the document.
 * Keeping this small presenter here makes the intended button/sidebar/code
 * tokens deterministic and lets `off` restore the exact previous appearance.
 */
export function applyAsukaPresentation(mode: AsukaMode, period: WallpaperPeriod = 'noon', reduceMotion = false): void {
  if (typeof document === 'undefined' || document.body === null) return
  const definition = asukaThemeForMode(mode, period)
  if (definition === undefined) {
    clearAsukaPresentation()
    return
  }

  const body = document.body
  const root = document.documentElement
  if (baseline === undefined) {
    baseline = {
      darkTheme: body.hasAttribute('data-ds-dark-theme'),
      colorScheme: readInlineProperty(root, 'color-scheme'),
      tokens: new Map(),
    }
  }

  const shouldTransition = !reduceMotion && activeThemeId !== undefined && activeThemeId !== definition.id
  if (shouldTransition) {
    body.setAttribute(TRANSITION_ATTRIBUTE, 'true')
    // Commit transition rules before tokens change so light and dark surfaces interpolate.
    void body.offsetWidth
  } else {
    body.removeAttribute(TRANSITION_ATTRIBUTE)
  }

  body.setAttribute(THEME_ATTRIBUTE, definition.colorScheme)
  body.toggleAttribute('data-ds-dark-theme', definition.colorScheme === 'dark')
  root.style.setProperty('color-scheme', definition.colorScheme, 'important')

  for (const [name, value] of Object.entries(definition.tokens)) {
    if (!baseline.tokens.has(name)) baseline.tokens.set(name, readInlineProperty(body, name))
    body.style.setProperty(name, value, 'important')
  }

  activeThemeId = definition.id
  if (shouldTransition) {
    if (transitionTimer !== undefined) clearTimeout(transitionTimer)
    transitionTimer = setTimeout(() => {
      if (document.body !== null) document.body.removeAttribute(TRANSITION_ATTRIBUTE)
      transitionTimer = undefined
    }, 1_050)
  }
}

/** Restore only values and attributes that this plugin captured before activation. */
export function clearAsukaPresentation(): void {
  if (typeof document === 'undefined' || document.body === null || baseline === undefined) return
  const body = document.body
  const root = document.documentElement

  body.removeAttribute(THEME_ATTRIBUTE)
  body.removeAttribute(TRANSITION_ATTRIBUTE)
  body.toggleAttribute('data-ds-dark-theme', baseline.darkTheme)
  writeInlineProperty(root, 'color-scheme', baseline.colorScheme)
  for (const [name, property] of baseline.tokens) writeInlineProperty(body, name, property)
  baseline = undefined
  activeThemeId = undefined
  if (transitionTimer !== undefined) clearTimeout(transitionTimer)
  transitionTimer = undefined
}

function readInlineProperty(element: HTMLElement, name: string): InlineProperty {
  return {
    value: element.style.getPropertyValue(name),
    priority: element.style.getPropertyPriority(name),
  }
}

function writeInlineProperty(element: HTMLElement, name: string, property: InlineProperty): void {
  if (property.value === '') element.style.removeProperty(name)
  else element.style.setProperty(name, property.value, property.priority)
}
