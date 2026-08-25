import { createReadStream } from "node:fs";
import { access, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import z from "@deepseek-ai/schemastery";
import { settingsNamespace } from "@deepseek-ai/dsh-settings";

//#region src/shared/settings.ts
const ASUKA_SETTINGS_NAMESPACE_ID = "asuka-school-theme";
const ASUKA_MODES = [
	"off",
	"after-class",
	"tokyo3-night"
];
const WALLPAPER_PERIOD_PREFERENCES = [
	"auto",
	"morning",
	"noon",
	"night"
];
const DEFAULT_ASUKA_SETTINGS = Object.freeze({
	mode: "off",
	wallpaperEnabled: true,
	wallpaperPeriod: "auto",
	wallpaperOpacity: .2,
	wallpaperBlurPx: 0,
	decorativeDetails: true,
	reduceMotion: false
});

//#endregion
//#region src/settings.ts
const ASUKA_SETTINGS_NAMESPACE = settingsNamespace(ASUKA_SETTINGS_NAMESPACE_ID);
const AsukaThemeSettingsSchema = z.object({
	mode: z.union(ASUKA_MODES.map((mode) => z.const(mode))).default(DEFAULT_ASUKA_SETTINGS.mode),
	wallpaperEnabled: z.boolean().default(DEFAULT_ASUKA_SETTINGS.wallpaperEnabled),
	wallpaperPeriod: z.union(WALLPAPER_PERIOD_PREFERENCES.map((period) => z.const(period))).default(DEFAULT_ASUKA_SETTINGS.wallpaperPeriod),
	wallpaperOpacity: z.number().min(0).max(.4).step(.01).default(DEFAULT_ASUKA_SETTINGS.wallpaperOpacity),
	wallpaperBlurPx: z.number().min(0).max(20).step(1).default(DEFAULT_ASUKA_SETTINGS.wallpaperBlurPx),
	decorativeDetails: z.boolean().default(DEFAULT_ASUKA_SETTINGS.decorativeDetails),
	reduceMotion: z.boolean().default(DEFAULT_ASUKA_SETTINGS.reduceMotion)
});

//#endregion
//#region src/shared/wallpapers.ts
const WALLPAPER_ROUTE_PREFIX = "/asuka-school/assets";
const WALLPAPER_ASSET_NAMES = Object.freeze({
	morning: "asuka-after-class.webp",
	noon: "asuka-noon.webp",
	night: "asuka-tokyo3-night.webp"
});

//#endregion
//#region src/index.ts
const name = "dsh-asuka-school-theme";
const inject = ["settings", "webServer"];
const ASSET_ROUTE_PREFIX = WALLPAPER_ROUTE_PREFIX;
const ASSET_CACHE_CONTROL = "public, max-age=31536000, immutable";
const PUBLIC_ASSETS = Object.freeze([
	{
		name: WALLPAPER_ASSET_NAMES.morning,
		contentType: "image/webp"
	},
	{
		name: WALLPAPER_ASSET_NAMES.noon,
		contentType: "image/webp"
	},
	{
		name: WALLPAPER_ASSET_NAMES.night,
		contentType: "image/webp"
	}
]);
/** Register one settings namespace and immutable, fixed-name image routes. */
function apply(ctx) {
	ctx.settings.register(ASUKA_SETTINGS_NAMESPACE, AsukaThemeSettingsSchema, { applies: "live" });
	for (const asset of PUBLIC_ASSETS) {
		const filePath = fileURLToPath(new URL(`../assets/public/${asset.name}`, import.meta.url));
		ctx.effect(() => ctx.webServer.register({
			kind: "exact",
			path: `${ASSET_ROUTE_PREFIX}/${asset.name}`,
			handler: createAssetHandler(filePath, asset.contentType)
		}), `asuka-school-theme: asset ${asset.name}`);
	}
}
/**
* Build a read-only HTTP handler for one package-owned asset. The request path
* never reaches filesystem resolution, so traversal is impossible by design.
*/
function createAssetHandler(filePath, contentType) {
	return async (request, response) => {
		if (request.method !== "GET" && request.method !== "HEAD") {
			response.writeHead(405, { Allow: "GET, HEAD" });
			response.end();
			return;
		}
		try {
			await access(filePath);
			const metadata = await stat(filePath);
			if (!metadata.isFile()) {
				respondNotFound(response);
				return;
			}
			response.writeHead(200, {
				"Content-Type": contentType,
				"Content-Length": metadata.size,
				"Cache-Control": ASSET_CACHE_CONTROL,
				"X-Content-Type-Options": "nosniff"
			});
			if (request.method === "HEAD") {
				response.end();
				return;
			}
			createReadStream(filePath).pipe(response);
		} catch {
			respondNotFound(response);
		}
	};
}
function respondNotFound(response) {
	response.writeHead(404, { "Cache-Control": "no-store" });
	response.end();
}

//#endregion
export { ASSET_ROUTE_PREFIX, PUBLIC_ASSETS, apply, createAssetHandler, inject, name };