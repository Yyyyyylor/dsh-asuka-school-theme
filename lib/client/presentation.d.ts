import type { ThemeDefinition } from '@deepseek-ai/dsh-client-ui-theme/client';
import type { AsukaMode, WallpaperPeriod } from '../shared/settings.js';
/** Resolve the complete token palette that is presented directly by this plugin. */
export declare function asukaThemeForMode(mode: AsukaMode, period?: WallpaperPeriod): ThemeDefinition | undefined;
/**
 * Present the selected palette as plugin-owned inline variables.
 *
 * ThemeRuntime is a registry/event service in the current DSH client build;
 * it does not itself project third-party theme definitions into the document.
 * Keeping this small presenter here makes the intended button/sidebar/code
 * tokens deterministic and lets `off` restore the exact previous appearance.
 */
export declare function applyAsukaPresentation(mode: AsukaMode, period?: WallpaperPeriod, reduceMotion?: boolean): void;
/** Restore only values and attributes that this plugin captured before activation. */
export declare function clearAsukaPresentation(): void;
//# sourceMappingURL=presentation.d.ts.map