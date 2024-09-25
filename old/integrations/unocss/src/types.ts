import type { PresetOptions } from "unocss";
import type { ResolvedTheme } from "@inkline/config";

export type Theme = ResolvedTheme;

export interface UserOptions {
    configFile?: string;
    outputDir?: string;
    extName?: `.${string}`;
}

export interface PresetMediaQueryMatcher {
    matcher: string;
    mediaQuery: string;
}

export interface PresetInklineOptions extends PresetOptions {
    /**
     * Utils prefix
     *
     * @default _
     */
    prefix?: string;

    /**
     * Custom media matchers
     */
    media?: PresetMediaQueryMatcher[];
}
