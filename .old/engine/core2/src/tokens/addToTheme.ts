import type { DefinitionOptions, AtRule, Selector, Variable, Utility, Variant } from '../types';
import { isTheme } from '../typeGuards';
import { theme } from '../tokens';
import { defaultThemeName } from '../constants';
import { isUtilityDefined } from '../utils';

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
    if (!themeInstance.__keys.variables.includes(variable.__name)) {
        themeInstance.__keys.variables.push(variable.__name);
    }
}

/**
 * Adds a selector to a theme.
 */
export function addSelectorToTheme(selector: Selector | AtRule, options: DefinitionOptions) {
    const themeInstance = isTheme(options?.theme)
        ? options.theme
        : theme(options?.theme ?? defaultThemeName, options);

    if (!themeInstance.__keys.selectors.includes(selector.__id)) {
        themeInstance.selectors.push(selector);
        themeInstance.__keys.selectors.push(selector.__id);
    }
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
    if (selectorIndex !== -1) {
        themeInstance.__keys.selectors.splice(selectorIndex, 1);
    }
}

/**
 * Adds a utility to a theme.
 */
export function addUtilityToTheme(utility: Utility, options: DefinitionOptions) {
    const themeInstance = isTheme(options?.theme)
        ? options.theme
        : theme(options?.theme ?? defaultThemeName, options);

    if (options.default && isUtilityDefined(utility.__name, themeInstance)) {
        return;
    }

    themeInstance.utilities.push(utility);
    if (!themeInstance.__keys.utilities.includes(utility.__name)) {
        themeInstance.__keys.utilities.push(utility.__name);
    }
}

/**
 * Adds a variant to a theme.
 */
export function addVariantToTheme(variant: Variant, options: DefinitionOptions) {
    const themeInstance = isTheme(options?.theme)
        ? options.theme
        : theme(options?.theme ?? defaultThemeName, options);

    themeInstance.variants[variant.__name] = variant;
    if (!themeInstance.__keys.variants.includes(variant.__name)) {
        themeInstance.__keys.variants.push(variant.__name);
    }
}
