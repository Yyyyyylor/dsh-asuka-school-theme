/** Keep the host's left rail, divide the remaining room without an overlay. */
export declare function narrowRightbarWidths(width: number, sidebar: number): {
    left: number;
    right: number;
};
/** Use the host's effective binding, including user-customized modifiers. */
export declare function matchesRightbarShortcut(event: KeyboardEvent, shortcut: string): boolean;
/** DSH derives fullscreen below 768px. Adapt only that presentation, leaving
 * its mounted docks, navigation, focus and slide lifecycle under native control. */
export declare function installNarrowRightbarLayout(root?: Document): () => void;
//# sourceMappingURL=rightbar-layout.d.ts.map