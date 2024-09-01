import {
    Calc,
    ComponentValue,
    DefinitionOptions,
    Color,
    HSLAColorInlineProperty,
    Reference,
    Selector,
    Theme,
    TokenType,
    TokenValue,
    Variable,
    NamespacedKey,
    NamespaceType
} from './types';
import { isRef, isVariable } from './typeGuards';
import { insertInBetweenElements, createNamespacedTokenName } from './utils';
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
export function variable<Name extends string = string>(
    name: Name,
    value: TokenValue,
    options?: DefinitionOptions
): Variable<Name> {
    const instance: Variable<Name> = {
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
 * Creates a `hsla` token
 * This token is used to define a HSLA color.
 */

export function hsla(value: HSLAColorInlineProperty): Color {
    return {
        __type: TokenType.HSLAColor,
        __value: value
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

/**
 * Creates a namespace for a variable.
 *
 * This function is used to create a namespaced variable from an existing variable.
 * Namespaced variables are used to group related variables together.
 */
export function namespace<Namespace extends NamespaceType, Name extends string>(
    ns: Namespace,
    instance: Variable<Name>,
    options?: DefinitionOptions
) {
    const namespacedValue = Array.isArray(instance.__value)
        ? instance.__value.map((value) =>
              isRef(value)
                  ? ref(createNamespacedTokenName(ns, value.__name), value.__fallback)
                  : value
          )
        : ref(instance);

    return nsvariable(ns, instance.__name, namespacedValue, options);
}

/**
 * Creates a namespaced variable token.
 *
 * This token is used to define a namespaced variable.
 * Namespaced variables are used to group related variables together.
 * Namespaced variables automatically get added to the theme when created.
 * Using the nsvariable function will override the stored value unless `options.default` is specified.
 */
export function nsvariable<Namespace extends NamespaceType, Name extends string>(
    ns: Namespace,
    nameOrInstance: Variable<Name> | Name,
    value: TokenValue,
    options?: DefinitionOptions
): Variable<NamespacedKey<Namespace, Name>> {
    const name = isVariable(nameOrInstance) ? nameOrInstance.__name : nameOrInstance;

    return variable(createNamespacedTokenName(ns, name), value, options);
}

/**
 * Sets a variable or reference value
 */
export function set<Name extends string>(instance: Variable<Name>, value: TokenValue) {
    instance.__value = value;
}
