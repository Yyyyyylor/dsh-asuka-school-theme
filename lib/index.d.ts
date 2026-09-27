import type { Context } from '@deepseek-ai/cordis';
import type { ServerResponse } from 'node:http';
export declare const name = "dsh-asuka-school-theme";
export declare const inject: string[];
export declare const Config: import("@deepseek-ai/schemastery").default<NoInfer<Schemastery.ObjectS<NoInfer<{
    mode: import("@deepseek-ai/schemastery").default<"off" | "after-class" | "tokyo3-night", "off" | "after-class" | "tokyo3-night", "defined">;
    wallpaperEnabled: import("@deepseek-ai/schemastery").default<boolean, boolean, "defined">;
    wallpaperPeriod: import("@deepseek-ai/schemastery").default<"auto" | "morning" | "noon" | "night", "auto" | "morning" | "noon" | "night", "defined">;
    wallpaperOpacity: import("@deepseek-ai/schemastery").default<number, number, "defined">;
    wallpaperBlurPx: import("@deepseek-ai/schemastery").default<number, number, "defined">;
    decorativeDetails: import("@deepseek-ai/schemastery").default<boolean, boolean, "defined">;
    reduceMotion: import("@deepseek-ai/schemastery").default<boolean, boolean, "defined">;
}>>>, NoInfer<Schemastery.ObjectT<NoInfer<{
    mode: import("@deepseek-ai/schemastery").default<"off" | "after-class" | "tokyo3-night", "off" | "after-class" | "tokyo3-night", "defined">;
    wallpaperEnabled: import("@deepseek-ai/schemastery").default<boolean, boolean, "defined">;
    wallpaperPeriod: import("@deepseek-ai/schemastery").default<"auto" | "morning" | "noon" | "night", "auto" | "morning" | "noon" | "night", "defined">;
    wallpaperOpacity: import("@deepseek-ai/schemastery").default<number, number, "defined">;
    wallpaperBlurPx: import("@deepseek-ai/schemastery").default<number, number, "defined">;
    decorativeDetails: import("@deepseek-ai/schemastery").default<boolean, boolean, "defined">;
    reduceMotion: import("@deepseek-ai/schemastery").default<boolean, boolean, "defined">;
}>>>, "volatile">;
export declare const ASSET_ROUTE_PREFIX = "/asuka-school/assets";
export declare const PUBLIC_ASSETS: readonly [{
    readonly name: string;
    readonly contentType: "image/webp";
}, {
    readonly name: string;
    readonly contentType: "image/webp";
}, {
    readonly name: string;
    readonly contentType: "image/webp";
}];
/** Expose the custom settings page and immutable, fixed-name image routes. */
export declare function apply(ctx: Context): void;
/**
 * Build a read-only HTTP handler for one package-owned asset. The request path
 * never reaches filesystem resolution, so traversal is impossible by design.
 */
export declare function createAssetHandler(filePath: string, contentType: string): (request: {
    method?: string;
}, response: ServerResponse) => Promise<void>;
//# sourceMappingURL=index.d.ts.map