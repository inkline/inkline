import { defaultThemeName } from '../constants';
import { Theme, TokenType } from '../types';
import { state } from '../globals';

/**
 * Creates a theme token.
 *
 * This token is used to define a theme.
 * Themes can be used to store variables and selectors.
 * Themes are automatically created when variables and selectors are added.
 * Themes are used to generate CSS.
 */
export function theme(name: string = defaultThemeName): Theme {
    if (state.themes[name]) {
        return state.themes[name];
    }

    const instance: Theme = {
        __type: TokenType.Theme,
        __name: name,
        __keys: {
            variables: new Set(),
            selectors: new Set()
        },
        variables: {},
        selectors: []
    };

    state.themes[name] = instance;

    return instance;
}
