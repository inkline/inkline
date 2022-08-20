import {Border, ResolvedBorderProperty, ResolvedTheme, Resolver, Theme} from '../types';
import { parseGenericComposedValue, parseValue } from '../helpers';
import * as CSS from "csstype";

export const setBorderFieldsFn = (target: Border, [width, style, color]: string[]) => {
    target.width = width;
    target.style = style;
    target.color = color;
};

export const borderResolver: Resolver<string, ResolvedTheme['border']> = {
    name: 'border',
    test: /(.*)border$/,
    skip: /^variants/,
    set: '$1border',
    guard: (context) => typeof context.value === 'string',
    apply: (context) => {
        const border = parseGenericComposedValue(context, setBorderFieldsFn);

        return {
            top: border,
            right: border,
            bottom: border,
            left: border
        };
    }
};

export const borderDefaultResolver: Resolver<string, ResolvedTheme['border']> = {
    name: 'border',
    test: /(.*)border\.default$/,
    skip: /^variants/,
    set: '$1border',
    apply: (context) => {
        const border = parseGenericComposedValue(context, setBorderFieldsFn);

        return {
            top: border,
            right: border,
            bottom: border,
            left: border
        };
    }
};

export const borderFieldResolver: Resolver<Border[string], ResolvedTheme['border'][string][string]> = {
    name: 'border',
    test: /(.*)border\.(width|style|color)$/,
    skip: /^variants/,
    set: ['$1border.top.$2', '$1border.right.$2', '$1border.bottom.$2', '$1border.left.$2'],
    apply: (context) => parseValue(context)
};

export const borderSideResolver: Resolver<string, ResolvedTheme['border'][string]> = {
    name: 'border',
    test: /(.*)border\.(\w+)$/,
    skip: /^variants/,
    set: '$1border.$2',
    guard: (context) => typeof context.value === 'string',
    apply: (context) => parseGenericComposedValue(context, setBorderFieldsFn)
};

export const borderSideFieldResolver: Resolver<string, ResolvedTheme['border'][string][string]> = {
    name: 'border',
    test: /(.*)border\.(\w+)\.(\w+)$/,
    skip: /^variants/,
    set: '$1border.$2.$3',
    apply: (context) => parseValue(context)
};

export const borderResolvers = [
    borderResolver,
    borderDefaultResolver,
    borderFieldResolver,
    borderSideResolver,
    borderSideFieldResolver
];
