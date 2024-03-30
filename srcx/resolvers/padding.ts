import * as CSS from 'csstype';
import { PaddingPropertyVariant, ResolvedTheme, Resolver, Theme } from '../types';
import { parseSidesValue, parseValue, parseRecursive } from '../helpers';

export const paddingResolver: Resolver<Theme['padding'], ResolvedTheme['padding']> = {
    name: 'padding',
    test: /(.*)padding$/,
    skip: /^variants/,
    set: '$1padding',
    guard: (context) => typeof context.value === 'string',
    apply: (context) => parseSidesValue(context)
};

export const paddingDefaultResolver: Resolver<Theme['padding'], ResolvedTheme['padding']> = {
    name: 'padding',
    test: /(.*)padding\.default$/,
    skip: /^variants/,
    set: '$1padding',
    apply: (context) => parseSidesValue(context)
};

export const paddingSideResolver: Resolver<CSS.Property.Padding, ResolvedTheme['padding'][string]> =
    {
        name: 'padding',
        test: /(.*)padding\.([\w-]+)$/,
        skip: /^variants/,
        set: '$1padding.$2',
        apply: (context) => parseValue(context)
    };

export const paddingVariantResolver: Resolver<
    PaddingPropertyVariant,
    ResolvedTheme['variants']['padding'][string]
> = {
    name: 'padding',
    test: /^variants\.padding\.([\w-]+)$/,
    set: 'variants.padding.$1',
    apply: (context) =>
        typeof context.value === 'object' ? parseRecursive(context) : parseSidesValue(context)
};

export const paddingResolvers = [
    paddingResolver,
    paddingDefaultResolver,
    paddingSideResolver,
    paddingVariantResolver
];
