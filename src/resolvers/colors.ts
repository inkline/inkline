import Color from 'color';
import {
    codegenCssVariables,
    defineResolver,
    defineResolverValueFn,
    defineResolverVariantFn,
    createResolveFn
} from '../utils';
import type {
    HSLAColor,
    RawTheme,
    RawThemeColor,
    RawThemeColorVariant,
    RawThemeValueType,
    ResolvedTheme,
    ResolvedThemeColor,
    ResolvedThemeValueType
} from '../types';
import { colorModifiers } from './modifiers';

export const resolveColor = defineResolverValueFn<RawThemeColor, ResolvedThemeColor>((color) => {
    let h: HSLAColor['h'], s: HSLAColor['s'], l: HSLAColor['l'], a: HSLAColor['a'];
    if (typeof color === 'string') {
        if (['transparent', 'inherit'].includes(color)) {
            return color;
        } else if (color.includes('var')) {
            const colorName = color.slice(6, -1); // remove 'var(--' and ')'
            h = codegenCssVariables.get(`${colorName}-h`);
            s = codegenCssVariables.get(`${colorName}-s`);
            l = codegenCssVariables.get(`${colorName}-l`);
            a = codegenCssVariables.get(`${colorName}-a`);
        } else {
            ({ h, s, l, alpha: a } = Color(color).hsl().object());
        }
    } else if ('r' in color) {
        const { r, g, b, a: alpha } = color;
        ({ h, s, l, alpha: a } = Color({ r, g, b, alpha }).hsl().object());
    } else {
        ({ h, s, l, a } = color);
    }

    return { h, s, l, a: a || 1 };
});

export const resolveColorVariant = defineResolverVariantFn<
    RawThemeColorVariant | RawThemeColor,
    ResolvedThemeColor
>((variant, meta) => {
    if (typeof variant === 'string' || 'r' in variant) {
        return resolveColor(variant as RawThemeColor, meta);
    }

    const propertyName = 'color';
    const colorName = meta.path[meta.path.length - 2];

    const variantValue = {
        h: codegenCssVariables.get(`${propertyName}-${colorName}-h`),
        s: codegenCssVariables.get(`${propertyName}-${colorName}-s`),
        l: codegenCssVariables.get(`${propertyName}-${colorName}-l`),
        a: codegenCssVariables.get(`${propertyName}-${colorName}-a`)
    };

    Object.keys(variant).forEach((modifierName) => {
        if (modifierName in colorModifiers) {
            colorModifiers[modifierName](
                variantValue,
                (variant as RawThemeColorVariant)[modifierName]
            );
        }
    });

    return variantValue;
});

export const colorsResolver = defineResolver<
    RawThemeValueType<RawTheme['colors'][string]>,
    ResolvedThemeValueType<ResolvedTheme['colors'][string]>
>({
    key: [/^colors\.[^.]+\.[^.]+$/, /.*\.color$/, /.*\.background$/],
    ignore: [/^typography\..*$/, /border\..*/, /boxShadow\..*/],
    resolve: createResolveFn(resolveColor, resolveColorVariant)
});
