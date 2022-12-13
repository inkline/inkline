import { ResolvedTheme, Resolver, SizeMultiplierPropertyVariant, Theme } from '../types';
import { parseValue } from '../helpers';

export const sizeMultiplierResolver: Resolver<
    Theme['size']['multiplier'],
    ResolvedTheme['size']['multiplier']
> = {
    name: 'sizes',
    test: /(.*)size\.multiplier$/,
    skip: /^variants/,
    set: '$1size.multiplier',
    apply: (context) => parseValue(context)
};

export const sizeMultiplierVariantResolver: Resolver<
    SizeMultiplierPropertyVariant,
    SizeMultiplierPropertyVariant
> = {
    name: 'sizes',
    test: /variants\.size\.multiplier\.([\w-]+)$/,
    set: 'variants.size.multiplier.$1',
    apply: (context) => parseValue(context)
};

export const sizePercentagesResolver: Resolver<
    Theme['size']['percentages'][string],
    Theme['size']['percentages'][string]
> = {
    name: 'sizes',
    test: /(.*)size\.percentages\.([\w-]+)$/,
    skip: /^variants/,
    set: '$1size.percentages.$2',
    apply: (context) => parseValue(context)
};

export const sizeResolvers = [
    sizeMultiplierResolver,
    sizeMultiplierVariantResolver,
    sizePercentagesResolver
];
