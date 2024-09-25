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
    NamespaceType, ColorComposedReturnKey, ColorPartsReturnKeys, HSLAColorProperty
} from "./types";
import { isRef, isVariable } from './typeGuards';
import { insertInBetweenElements, createNamespacedTokenName, normalizePercentageValue, toExportedName } from "./utils";
import { addSelectorToTheme, addVariableToTheme, themes } from './themes';
import { defaultThemeName } from './constants';
import { defaultDefinitionOptions } from "../dist/core";
import parseColor from 'color';

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
    name: string | string[],
    value: ComponentValue,
    options?: DefinitionOptions
): Selector {
    const resolvedName = Array.isArray(name) ? name.join(', ') : name;
    const instance: Selector = {
        __type: TokenType.Selector,
        __name: resolvedName,
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

/**
 * Creates a `color` token.
 * This is a special token that allows you to define a color with the given name and value.
 * The value can be a string or HSLA color object.
 * It sets and returns the composed color, as well as h, s, l, a parts.
 */
export function color<Name extends string>(
    name: Name,
    value: string | HSLAColorInlineProperty,
    options = defaultDefinitionOptions
) {
    type ComposedReturnKey = ColorComposedReturnKey<Name>;
    type PartsReturnKey = ColorPartsReturnKeys<Name>;
    type PartsReturnType = {
        [key in PartsReturnKey]: Variable;
    };
    type ComposedReturnType = {
        [key in ComposedReturnKey]: Variable<Name>;
    };
    type ReturnType = PartsReturnType & ComposedReturnType;

    const colorVariables: ReturnType = {} as ReturnType;

    let parsedColor: HSLAColorProperty;
    if (typeof value === 'string') {
        const { h, s, l, alpha: a } = parseColor(value).hsl().object();
        parsedColor = {
            h,
            s: normalizePercentageValue(s),
            l: normalizePercentageValue(l),
            a: a ?? 1
        };
    } else {
        parsedColor = {
            h: value[0],
            s: normalizePercentageValue(value[1]),
            l: normalizePercentageValue(value[2]),
            a: value[3]
        };
    }

    const composedParts: Variable[] = [];
    Object.keys(parsedColor).forEach((key) => {
        const variableName = `${name}-${key}`;
        const colorVariable = variable(variableName, parsedColor[key as keyof typeof parsedColor], {
            default: options?.default
        });

        (colorVariables as PartsReturnType)[toExportedName(variableName) as PartsReturnKey] =
            colorVariable;
        composedParts.push(colorVariable);
    });

    (colorVariables as ComposedReturnType)[toExportedName(name)] = variable(
        name,
        hsla(composedParts.map((part) => ref(part)) as HSLAColorInlineProperty)
    );

    return colorVariables;
}

/**
 * Creates a namespaced `color` token.
 * This is a special token that allows you to define a color with the given namespace, name and value.
 * The value can be a string or HSLA color object.
 */
export function nscolor<Namespace extends NamespaceType, Name extends string>(
    ns: Namespace,
    name: Name,
    value: string | HSLAColorInlineProperty,
    options = defaultDefinitionOptions
) {
    return color(createNamespacedTokenName(ns, name), value, options);
}
