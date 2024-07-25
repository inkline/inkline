import {
    Calc,
    ComponentValue,
    DefinitionOptions,
    Reference,
    Selector,
    Theme,
    TokenType,
    TokenValue,
    Variable
} from './types';
import { isVariable } from './typeGuards';
import { insertInBetweenElements } from './utils';
import { addSelectorToTheme, addVariableToTheme, themes } from './themes';
import { defaultThemeName } from './constants';

/**
 * Creates a variable token.
 *
 * This token is used to define a variable.
 * Variables can be used to store primitive values or references to other variables.
 * Variables automatically get added to the theme when created.
 * Using the variable function will override the stored value unless `options.default` is specified.
 */
export function variable<Value extends TokenValue = TokenValue, Name extends string = string>(
    name: Name,
    value: Value,
    options?: DefinitionOptions
): Variable<Value, Name> {
    const instance: Variable<Value, Name> = {
        __type: TokenType.Variable,
        __name: name,
        __value: value
    };

    addVariableToTheme(instance, options);

    return instance;
}

/**
 * Creates a reference token.
 *
 * This token is used to reference other variables.
 */
export function ref(value: string | Variable, fallback?: TokenValue): Reference {
    return {
        __type: TokenType.Reference,
        __name: typeof value === 'string' ? value : value.__name,
        ...(fallback ? { __fallback: fallback } : {})
    };
}

/**
 * Creates a `calc` token.
 * This is a special token that allows you to perform math operations
 * on variable references and primitive values.
 */
export function calc(...args: TokenValue[]): Calc {
    return {
        __type: TokenType.Calc,
        __value: args.map((arg) => (isVariable(arg) ? ref(arg) : arg))
    };
}

/**
 * Math operation calc tokens
 */

export function multiply(...args: TokenValue[]): Calc {
    return calc(...insertInBetweenElements(args, '*'));
}

export function divide(...args: TokenValue[]): Calc {
    return calc(...insertInBetweenElements(args, '/'));
}

export function add(...args: TokenValue[]): Calc {
    return calc(...insertInBetweenElements(args, '+'));
}

export function subtract(...args: TokenValue[]): Calc {
    return calc(...insertInBetweenElements(args, '-'));
}

/**
 * Creates a selector token.
 *
 * This token is used to define a CSS selector.
 * Selectors can be used to store component values.
 * Selectors automatically added to the theme when created.
 */
export function selector(
    name: string,
    value: ComponentValue,
    options?: DefinitionOptions
): Selector {
    const instance: Selector = {
        __type: TokenType.Selector,
        __name: name,
        __value: value
    };

    addSelectorToTheme(instance, options);

    return instance;
}

/**
 * Creates a theme token.
 *
 * This token is used to define a theme.
 * Themes can be used to store variables and selectors.
 * Themes are automatically created when variables and selectors are added.
 * Themes are used to generate CSS.
 */
export function theme(name: string = defaultThemeName): Theme {
    if (themes[name]) {
        return themes[name];
    }

    const instance: Theme = {
        __type: TokenType.Theme,
        __name: name,
        __keys: {
            variables: new Set(),
            selectors: new Set()
        },
        variables: {},
        selectors: {}
    };

    themes[name] = instance;

    return instance;
}
