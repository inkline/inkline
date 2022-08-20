import { parseCornersValue, parseRecursive, parseValue } from '../helpers';
import { BorderRadiusPropertyVariant, ResolvedTheme, Resolver, Theme } from '../types';
import * as CSS from 'csstype';

export const borderRadiusResolver: Resolver<string, ResolvedTheme['borderRadius']> = {
    name: 'borderRadius',
    test: /(.*)borderRadius$/,
    skip: /^variants/,
    set: '$1borderRadius',
    guard: (context) => typeof context.value === 'string',
    apply: (context) => parseCornersValue(context)
};

export const borderRadiusDefaultResolver: Resolver<Theme['borderRadius'], ResolvedTheme['borderRadius']> = {
    name: 'borderRadius',
    test: /(.*)borderRadius\.default$/,
    skip: /^variants/,
    set: '$1borderRadius',
    apply: (context) => parseCornersValue(context)
};

export const borderRadiusCornerResolver: Resolver<CSS.Property.BorderRadius, ResolvedTheme['borderRadius'][string]> = {
    name: 'borderRadius',
    test: /(.*)borderRadius\.(\w+)$/,
    skip: /^variants/,
    set: '$1borderRadius.$2',
    apply: (context) => parseValue(context)
};

export const borderRadiusVariantResolver: Resolver<BorderRadiusPropertyVariant, ResolvedTheme['variants']['borderRadius'][string]> = {
    name: 'borderRadius',
    test: /^variants\.borderRadius\.(\w+)$/,
    set: 'variants.borderRadius.$1',
    apply: (context) => typeof context.value === 'object'
        ? parseRecursive(context)
        : parseCornersValue(context)
};

export const borderRadiusResolvers = [
    borderRadiusResolver,
    borderRadiusDefaultResolver,
    borderRadiusCornerResolver,
    borderRadiusVariantResolver
];
