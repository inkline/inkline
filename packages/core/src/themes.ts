import { DefinitionOptions, Selector, SelectorOptions, Themes, Variable } from './types';
import { isTheme } from './typeGuards';
import { theme } from './tokens';
import { defaultThemeName } from './constants';

/**
 * Themes
 *
 * Each key represents a theme. The default theme is 'default'.
 */
export const themes: Themes = {};

/**
 * Adds a variable to a theme.
 *
 * If `options.default` is `true`, the variable will only be added if it does not already exist in the theme.
 */
export function addVariableToTheme(variable: Variable, options?: DefinitionOptions) {
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
export function addSelectorToTheme(selector: Selector, options?: SelectorOptions) {
    const themeInstance = isTheme(options?.theme)
        ? options.theme
        : theme(options?.theme ?? defaultThemeName);

    if (options?.default && themeInstance.selectors[selector.__name]) {
        return;
    }

    if (options?.replace) {
        themeInstance.selectors[selector.__name] = selector;
    } else {
        themeInstance.selectors[selector.__name] = {
            ...selector,
            __value: {
                ...themeInstance.selectors[selector.__name]?.__value,
                ...selector.__value
            }
        };
    }

    themeInstance.__keys.selectors.add(selector.__name);
}
