import {
    ColorProperty,
    ColorPropertyVariant,
    ConfigurationContext,
    ResolvedColorProperty,
    ResolvedTheme,
    Resolver,
    Theme
} from '../types';
import { parseColor, parseRecursive } from '../helpers';

export const colorResolver: Resolver<Theme['color'][string], ResolvedTheme['color'][string]> = {
    name: 'color',
    test: /(.*)color\.([\w-]+)$/,
    skip: /^variants/,
    set: '$1color.$2',
    apply: (context) => parseColor(context)
};

export const colorVariantResolver: Resolver<ColorPropertyVariant, ResolvedColorProperty> = {
    name: 'color',
    test: /^variants\.(.*)color\.([\w-]+)\.([\w-]+)$/,
    set: 'variants.$1color.$2.$3',
    apply: (context) => typeof context.value === 'object'
        ? parseRecursive(context)
        : parseColor(context as ConfigurationContext<Theme, ColorProperty>)
};

export const colorResolvers = [
    colorResolver,
    colorVariantResolver
];
