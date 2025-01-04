import {
    Color,
    ExportedName,
    HSLAColorInlineProperty,
    HSLAColorProperty,
    NamespaceType,
    TokenType,
    TokenValue,
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
import { isHSLAColorInlineProperty, isHSLAColorProperty } from '../typeGuards';

/**
 * Creates a HSLA color token
 */
export function hsla(value: HSLAColorInlineProperty): Color {
    return {
        __type: TokenType.HSLAColor,
        __value: value
    };
}

type ColorReturnType<Name extends string> = {
    [key in ExportedName<Name | `${Name}-h` | `${Name}-s` | `${Name}-l` | `${Name}-a`>]: Variable;
};

/**
 * Creates a `color` token.
 * This is a special token that allows you to define a color with the given name and value.
 * The value can be a string or HSLA color object.
 * It sets and returns the composed color, as well as h, s, l, a parts.
 */
export function color<Name extends string>(
    name: Name,
    value: TokenValue | HSLAColorProperty | HSLAColorInlineProperty,
    options = defaultDefinitionOptions
): ColorReturnType<Name> {
    const colorVariables: ColorReturnType<Name> = {} as ColorReturnType<Name>;

    let isParseableHSLAValue = true;
    let parsedColor: HSLAColorProperty = {} as HSLAColorProperty;
    if (typeof value === 'string') {
        if (['transparent', 'inherit', 'initial', 'unset'].includes(value)) {
            isParseableHSLAValue = false;
        } else {
            const { h, s, l, alpha: a } = parseColor(value).hsl().object();
            parsedColor = {
                h,
                s: resolvePercentagePropertyValue(s),
                l: resolvePercentagePropertyValue(l),
                a: a ?? 1
            };
        }
    } else if (isHSLAColorProperty(value)) {
        const { h, s, l, a } = value;

        parsedColor = {
            h,
            s,
            l,
            a
        };
    } else if (isHSLAColorInlineProperty(value)) {
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
        const colorVariable = variable(
            variableName,
            parsedColor[key as keyof typeof parsedColor],
            options
        );

        colorVariables[toExportedName(variableName) as keyof typeof colorVariables] = colorVariable;
        composedParts.push(colorVariable);
    });

    colorVariables[toExportedName(name)] = variable(
        name,
        isParseableHSLAValue
            ? hsla(composedParts.map((part) => ref(part)) as HSLAColorInlineProperty)
            : (value as TokenValue),
        options
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
    value: TokenValue | HSLAColorProperty | HSLAColorInlineProperty,
    options = defaultDefinitionOptions
) {
    return color(createNamespacedTokenName(ns, name), value, options);
}
