import { DefinitionOptions, Theme, TokenType } from '../types';

/**
 * Creates a theme token.
 *
 * This token is used to define a theme.
 * Themes can be used to store variables and selectors.
 * Themes are automatically created when variables and selectors are added.
 * Themes are used to generate CSS.
 */
export function theme(name: string, options: DefinitionOptions): Theme {
    const { themes } = options.context;

    if (themes[name]) {
        return themes[name];
    }

    const instance: Theme = {
        __type: TokenType.Theme,
        __name: name,
        __keys: {
            variables: new Set(),
            variants: new Set(),
            selectors: new Set(),
            utilities: new Set()
        },
        variables: {},
        variants: {},
        selectors: [],
        utilities: []
    };

    themes[name] = instance;

    return instance;
}
