/** A rounded-rectangle lens: neutral center, smooth inward sampling at its rim.
 * R/G encode signed displacement; no noise, copied wallpaper or animated map. */
export declare function createLensMap(width: number, height: number, radius: number): {
    width: number;
    height: number;
    pixels: Uint8ClampedArray;
    scale: number;
};
/** Chromium's same-document SVG backdrop path is an enhancement. Other engines,
 * missing canvas/observers and map failures retain the existing frosted glass.
 * This is Web refraction of the page, not an OS/native Liquid Glass material. */
export declare function installLiquidGlass(root?: Document): () => void;
//# sourceMappingURL=liquid-glass.d.ts.map