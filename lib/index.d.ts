import type { Context } from '@deepseek-ai/cordis';
import type { ServerResponse } from 'node:http';
export declare const name = "dsh-asuka-school-theme";
export declare const inject: string[];
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
/** Register one settings namespace and immutable, fixed-name image routes. */
export declare function apply(ctx: Context): void;
/**
 * Build a read-only HTTP handler for one package-owned asset. The request path
 * never reaches filesystem resolution, so traversal is impossible by design.
 */
export declare function createAssetHandler(filePath: string, contentType: string): (request: {
    method?: string;
}, response: ServerResponse) => Promise<void>;
//# sourceMappingURL=index.d.ts.map