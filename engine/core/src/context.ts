import type {
    Theme,
    Reference,
    TokenValue,
    Variable,
    CSS,
    DefinitionOptions,
    Selector,
    Media,
    Keyframes,
    ComponentValue,
    Utility,
    Variant
} from './types';
import { isTheme, isVariable } from './typeGuards';
import { defaultDefinitionOptions } from './constants';

export function createContext() {
    const themes: Theme[] = [];

    /**
     * Creates a theme token.
     *
     * This token is used to define a theme.
     * Themes can be used to store variables and selectors.
     * Themes are automatically created when variables and selectors are added.
     * Themes are used to generate CSS.
     */
    function theme<Name extends string = string>(name: Name): Theme<Name> {
        const existing = themes.find((t) => t.name === name);
        if (existing) {
            return existing as Theme<Name>;
        }

        const instance: Theme<Name> = {
            type: 'theme',
            name,
            variables: [],
            selectors: [],
            variants: [],
            utilities: []
        };

        themes.push(instance);

        return instance;
    }

    /**
     * Creates a variable token.
     *
     * This token is used to define a variable.
     * Variables can be used to store primitive values or references to other variables.
     * Variables automatically get added to the theme when created.
     * Using the variable function will override the stored value unless `options.default` is specified.
     */
    function variable<Name extends string = string>(
        name: Name,
        value: Variable['value'],
        userOptions: DefinitionOptions = {}
    ): Variable<Name> {
        const options = { ...defaultDefinitionOptions, ...userOptions };
        const currentTheme = isTheme(options.theme) ? options.theme : theme(options.theme);
        const existingVariable = currentTheme.variables.find((v) => v.name === name);
        if (existingVariable) {
            if (!options.default) {
                existingVariable.value = value;
            }

            return existingVariable as Variable<Name>;
        }

        const instance: Variable<Name> = {
            type: 'variable',
            name,
            value
        };

        if (options.register) {
            currentTheme.variables.push(instance);
        }

        return instance;
    }

    /**
     * Creates a reference token.
     *
     * This token is used to reference other variables.
     */
    function ref<Name extends string = string>(
        value: Name | Variable<Name>,
        fallback?: Reference['fallback']
    ): Reference<Name> {
        const instance: Reference<Name> = {
            type: 'reference',
            name: isVariable(value) ? value.name : value,
            ...(fallback ? { fallback } : {})
        };

        return instance;
    }

    /**
     * Creates a CSS token.
     *
     * This token is used to define a CSS string with interpolations.
     */
    function css(strings: TemplateStringsArray, ...interpolations: TokenValue[]): CSS {
        const value = strings.reduce<TokenValue[]>((acc, str, i) => {
            acc.push(str);

            if (i < interpolations.length) {
                acc.push(interpolations[i]);
            }

            return acc;
        }, []);

        const instance: CSS = {
            type: 'css',
            value
        };

        return instance;
    }

    /**
     * Creates a selector token.
     *
     * This token is used to define a CSS selector.
     * Selectors can be used to store component values.
     * Selectors automatically added to the theme when created.
     */
    function selector(
        query: string | string[],
        declaration: Selector['declaration'],
        userOptions: DefinitionOptions = {}
    ): Selector {
        const options = { ...defaultDefinitionOptions, ...userOptions };
        const currentTheme = isTheme(options.theme) ? options.theme : theme(options.theme);

        const resolvedQuery = Array.isArray(query) ? query.join(', ') : query;
        const instance: Selector = {
            type: 'selector',
            query: resolvedQuery,
            declaration
        };

        if (options.register) {
            currentTheme.selectors.push(instance);
        }

        return instance;
    }

    /**
     * Creates a media token
     *
     * This token is used to define a CSS media query.
     * Media queries can be used to store one or more selectors.
     * Media queries automatically get added to the theme when created.
     */
    function media(
        mediaQuery: Media['query'],
        selectorQuery: Selector['query'],
        declaration: Selector['declaration'],
        userOptions: DefinitionOptions = {}
    ): Media {
        const options = { ...defaultDefinitionOptions, ...userOptions };
        const currentTheme = isTheme(options.theme) ? options.theme : theme(options.theme);
        const instance: Media = {
            type: 'media',
            query: mediaQuery,
            selector: selector(selectorQuery, declaration, {
                ...options,
                register: false
            })
        };

        if (options.register) {
            currentTheme.selectors.push(instance);
        }

        return instance;
    }

    /**
     * Creates a keyframes token.
     *
     * This token is used to define a CSS keyframes animation.
     * Keyframes can be used to store one or more keyframe selectors in key-value format.
     * Keyframes automatically get added to the theme when created.
     */
    function keyframes(
        name: string,
        declaration: Record<string, ComponentValue>,
        userOptions: DefinitionOptions = {}
    ): Keyframes {
        const options = { ...defaultDefinitionOptions, ...userOptions };
        const currentTheme = isTheme(options.theme) ? options.theme : theme(options.theme);

        const instance: Keyframes = {
            type: 'keyframes',
            name,
            declaration
        };

        if (options.register) {
            currentTheme.selectors.push(instance);
        }

        return instance;
    }

    /**
     * Creates a utility token.
     *
     * This token is used to define a utility CSS selector.
     * Utilities are used to store utility classes
     * Utilities automatically added to the theme when created.
     */
    function utility(
        name: string,
        declaration: Utility['declaration'],
        modifier: Utility['modifier'] = 'default',
        userOptions: DefinitionOptions = {}
    ): Utility {
        const options = { ...defaultDefinitionOptions, ...userOptions };
        const currentTheme = isTheme(options.theme) ? options.theme : theme(options.theme);

        const instance: Utility = {
            type: 'utility',
            name,
            declaration,
            modifier
        };

        if (options.register) {
            currentTheme.utilities.push(instance);
        }

        return instance;
    }

    /**
     * Creates a variant token.
     *
     * This token is used to define a variant rule.
     */
    function variant(
        name: string,
        declaration: Variant['declaration'],
        modifier: Utility['modifier'] = 'default',
        userOptions: DefinitionOptions = {}
    ): Variant {
        const options = { ...defaultDefinitionOptions, ...userOptions };
        const currentTheme = isTheme(options.theme) ? options.theme : theme(options.theme);
        const instance: Variant = {
            type: 'variant',
            name,
            declaration,
            modifier
        };

        if (options.register) {
            currentTheme.variants.push(instance);
        }

        return instance;
    }

    return {
        themes,
        theme,
        variable,
        ref,
        css,
        selector,
        media,
        keyframes,
        utility,
        variant
    };
}
