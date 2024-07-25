import { defaultDefinitionOptions, defaultThemeName } from './constants';
import { Selector, Theme, Themes, Variable } from './types';
import { theme } from './tokens';
import { isTheme } from './typeGuards';

/**
 * Themes
 *
 * Each key represents a theme. The default theme is 'default'.
 */
export const themes: Themes = {};

export function defineThemes(): Themes {
    return themes;
}

/**
 * Adds a variable to a theme.
 *
 * If `options.default` is `true`, the variable will only be added if it does not already exist in the theme.
 */
export function addVariableToTheme(variable: Variable, options = defaultDefinitionOptions) {
    const themeInstance = isTheme(options?.theme)
        ? options.theme
        : theme(options?.theme ?? defaultThemeName);

    if (options?.default && themeInstance.variables[variable.__name]) {
        return;
    }

    themeInstance.variables[variable.__name] = variable;
    themeInstance.__keys.variables.add(variable.__name);
}

/**
 * Adds a selector to a theme.
 *
 * If `options.default` is `true`, the selector will only be added if it does not already exist in the theme.
 */
export function addSelectorToTheme(selector: Selector, options = defaultDefinitionOptions) {
    const themeInstance = isTheme(options?.theme)
        ? options.theme
        : theme(options?.theme ?? defaultThemeName);

    if (options?.default && themeInstance.selectors[selector.__name]) {
        return;
    }

    themeInstance.selectors[selector.__name] = selector;
    themeInstance.__keys.selectors.add(selector.__name);
}
