import type { DefinitionOptions, AtRule, Selector, Variable, Utility, Variant } from '../types';
import { isTheme } from '../typeGuards';
import { theme } from '../tokens';
import { defaultThemeName } from '../constants';

/**
 * Adds a variable to a theme.
 *
 * If `options.default` is `true`, the variable will only be added if it does not already exist in the theme.
 */
export function addVariableToTheme(variable: Variable, options: DefinitionOptions) {
    const themeInstance = isTheme(options?.theme)
        ? options.theme
        : theme(options?.theme ?? defaultThemeName, options);

    if (options?.default && themeInstance.variables[variable.__name]) {
        return;
    }

    themeInstance.variables[variable.__name] = variable;
    themeInstance.__keys.variables.add(variable.__name);
}

/**
 * Adds a selector to a theme.
 */
export function addSelectorToTheme(selector: Selector | AtRule, options: DefinitionOptions) {
    const themeInstance = isTheme(options?.theme)
        ? options.theme
        : theme(options?.theme ?? defaultThemeName, options);

    themeInstance.selectors.push(selector);
    themeInstance.__keys.selectors.add(selector.__id);
}

export function removeSelectorFromTheme(id: string, options: DefinitionOptions) {
    const themeInstance = isTheme(options?.theme)
        ? options.theme
        : theme(options?.theme ?? defaultThemeName, options);

    const selectorIndex = themeInstance.selectors.findIndex((selector) => selector.__id === id);
    if (selectorIndex === -1) {
        return;
    }

    themeInstance.selectors.splice(selectorIndex, 1);
    themeInstance.__keys.selectors.delete(id);
}

/**
 * Adds a utility to a theme.
 */
export function addUtilityToTheme(utility: Utility, options: DefinitionOptions) {
    const themeInstance = isTheme(options?.theme)
        ? options.theme
        : theme(options?.theme ?? defaultThemeName, options);

    themeInstance.utilities.push(utility);
    themeInstance.__keys.utilities.add(utility.__id);
}

/**
 * Adds a variant to a theme.
 */
export function addVariantToTheme(variant: Variant, options: DefinitionOptions) {
    const themeInstance = isTheme(options?.theme)
        ? options.theme
        : theme(options?.theme ?? defaultThemeName, options);

    themeInstance.variants[variant.__name] = variant;
    themeInstance.__keys.variants.add(variant.__name);
}
