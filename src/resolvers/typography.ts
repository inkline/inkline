import { ResolvedTheme, Resolver, Theme, ThemeVariants } from '../types';
import { parseRecursive, parseValue } from '../helpers';

export const typographyLineHeightResolver: Resolver<Theme['typography']['lineHeight'], ResolvedTheme['typography']['lineHeight']> = {
    name: 'typography',
    test: /(.*)typography\.lineHeight$/,
    skip: /^variants/,
    set: '$1typography.lineHeight',
    apply: (context) => parseValue(context)
};

export const typographyLetterSpacingResolver: Resolver<Theme['typography']['letterSpacing'], ResolvedTheme['typography']['letterSpacing']> = {
    name: 'typography',
    test: /(.*)typography\.letterSpacing$/,
    skip: /^variants/,
    set: '$1typography.letterSpacing',
    apply: (context) => parseValue(context)
};

export const typographyFontSizeResolver: Resolver<Theme['typography']['fontSize'], ResolvedTheme['typography']['fontSize']> = {
    name: 'typography',
    test: /(.*)typography\.fontSize$/,
    skip: /^variants/,
    set: '$1typography.fontSize',
    apply: (context) => parseValue(context)
};

export const typographyFontSizeVariantResolver: Resolver<ThemeVariants['typography']['fontSize'][string], ThemeVariants['typography']['fontSize'][string]> = {
    name: 'typography',
    test: /(.*)variants\.typography\.fontSize$/,
    set: '$1variants.typography.fontSize',
    apply: (context) => typeof context.value === 'object'
        ? parseRecursive(context)
        : parseValue(context)
};

export const typographyFontWeightResolver: Resolver<Theme['typography']['fontWeight'][string], ResolvedTheme['typography']['fontWeight'][string]> = {
    name: 'typography',
    test: /(.*)typography.fontWeight\.(\w+)$/,
    skip: /^variants/,
    set: '$1typography.fontWeight.$2',
    apply: (context) => parseValue(context)
};

export const typographyFontFamilyResolver: Resolver<Theme['typography']['fontFamily'][string][string], ResolvedTheme['typography']['fontFamily'][string][string]> = {
    name: 'typography',
    test: /(.*)typography.fontFamily$/,
    skip: /^variants/,
    set: [
        '$1typography.fontFamily.primary.base',
        '$1typography.fontFamily.secondary.base'
    ],
    guard: (context) => typeof context.value === 'string',
    apply: (context) => parseValue(context)
};

export const typographyFontFamilyGroupResolver: Resolver<Theme['typography']['fontFamily'][string][string], ResolvedTheme['typography']['fontFamily'][string][string]> = {
    name: 'typography',
    test: /(.*)typography.fontFamily\.(primary|secondary)$/,
    skip: /^variants/,
    set: '$1typography.fontFamily.$2.base',
    guard: (context) => typeof context.value === 'string',
    apply: (context) => parseValue(context)
};

export const typographyFontFamilyTypeResolver: Resolver<Theme['typography']['fontFamily'][string][string], ResolvedTheme['typography']['fontFamily'][string][string]> = {
    name: 'typography',
    test: /(.*)typography.fontFamily\.(primary|secondary)\.(\w+)$/,
    skip: /^variants/,
    set: '$1typography.fontFamily.$2.$3',
    apply: (context) => parseValue(context)
};

export const typographyResolvers = [
    typographyLineHeightResolver,
    typographyLetterSpacingResolver,
    typographyFontSizeResolver,
    typographyFontSizeVariantResolver,
    typographyFontWeightResolver,
    typographyFontFamilyResolver,
    typographyFontFamilyGroupResolver,
    typographyFontFamilyTypeResolver
];
