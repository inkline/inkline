import {
    Color,
    ColorComposedReturnKey,
    ColorPartsReturnKeys,
    HSLAColorInlineProperty,
    HSLAColorProperty,
    NamespaceType,
    TokenType,
    Variable
} from '../types';
import { defaultDefinitionOptions } from '../constants';
import parseColor from 'color';
import { variable } from './variable';
import { ref } from './ref';
import {
    createNamespacedTokenName,
    resolvePercentagePropertyValue,
    toExportedName
} from '../utils';

/**
 * Creates a HSLA color token
 */
export function hsla(value: HSLAColorInlineProperty): Color {
    return {
        __type: TokenType.HSLAColor,
        __value: value
    };
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
            s: resolvePercentagePropertyValue(s),
            l: resolvePercentagePropertyValue(l),
            a: a ?? 1
        };
    } else {
        parsedColor = {
            h: value[0],
            s: resolvePercentagePropertyValue(value[1]),
            l: resolvePercentagePropertyValue(value[2]),
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
