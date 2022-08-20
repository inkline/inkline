import * as CSS from 'csstype';
import { MarginPropertyVariant, ResolvedTheme, Resolver, Theme } from '../types';
import { parseSidesValue, parseValue, parseRecursive } from '../helpers';

export const marginResolver: Resolver<Theme['margin'], ResolvedTheme['margin']> = {
    name: 'margin',
    test: /(.*)margin$/,
    skip: /^variants/,
    set: '$1margin',
    guard: (context) => typeof context.value === 'string',
    apply: (context) => parseSidesValue(context)
};

export const marginDefaultResolver: Resolver<Theme['margin'], ResolvedTheme['margin']> = {
    name: 'margin',
    test: /(.*)margin\.default$/,
    skip: /^variants/,
    set: '$1margin',
    apply: (context) => parseSidesValue(context)
};

export const marginSideResolver: Resolver<CSS.Property.Margin, ResolvedTheme['margin'][string]> = {
    name: 'margin',
    test: /(.*)margin\.(\w+)$/,
    skip: /^variants/,
    set: '$1margin.$2',
    apply: (context) => parseValue(context)
};

export const marginVariantResolver: Resolver<MarginPropertyVariant, ResolvedTheme['variants']['margin'][string]> = {
    name: 'margin',
    test: /^variants\.margin\.(\w+)$/,
    set: 'variants.margin.$1',
    apply: (context) => typeof context.value === 'object'
        ? parseRecursive(context)
        : parseSidesValue(context)
};

export const marginResolvers = [
    marginResolver,
    marginDefaultResolver,
    marginSideResolver,
    marginVariantResolver
];
