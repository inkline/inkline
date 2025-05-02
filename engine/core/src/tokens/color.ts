import {
    Color,
    CSS,
    HSLAColorInlineProperty,
    HSLAColorProperty,
    NamespaceType,
    TokenType,
    TokenValue,
    Variable,
    DefinitionOptions
} from '../types';
import parseColor from 'color';
import { variable } from './variable';
import { createNamespacedTokenName, resolvePercentagePropertyValue } from '../utils';
import { isHSLAColorInlineProperty, isHSLAColorProperty } from '../typeGuards';

/**
 * Creates a HSLA color token
 */
export function hsla(value: HSLAColorInlineProperty | CSS): Color {
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
    value: TokenValue | HSLAColorProperty | HSLAColorInlineProperty,
    options: DefinitionOptions
): Variable<Name> {
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
    } else {
        isParseableHSLAValue = false;
    }

    return variable(
        name,
        isParseableHSLAValue
            ? hsla([parsedColor.h, parsedColor.s, parsedColor.l, parsedColor.a])
            : (value as TokenValue),
        options
    );
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
    options: DefinitionOptions
) {
    return color(createNamespacedTokenName(ns, name), value, options);
}
