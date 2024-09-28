import type { OutputFile, Themes } from "./types";


/**
 * Themes
 *
 * Each key represents a theme. The default theme is 'default'.
 */

export const themes: Themes = {};

/**
 * Output files
 *
 * Each entry represents a file that will be generated.
 */

export const files: OutputFile[] = [];

export const state: {
    themes: Themes,
    files: OutputFile[]
} = {
    themes,
    files
};
