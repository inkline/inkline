import {
    codegenCssVariables,
    defineResolver,
    defineResolverValueFn,
    defineResolverVariantFn,
    createResolveFn
} from '../utils';
import {
    RawTheme,
    RawThemeTypographyColor,
    RawThemeTypographyContrastColor,
    RawThemeTypographyFontFamily,
    RawThemeTypographyFontSize,
    RawThemeTypographyFontSizeVariant,
    RawThemeTypographyFontWeight,
    RawThemeTypographyLetterSpacing,
    RawThemeTypographyLineHeight,
    RawThemeTypographyTextAlignment,
    RawThemeValueType,
    ResolvedTheme,
    ResolvedThemeTypographyColor,
    ResolvedThemeTypographyContrastColor,
    ResolvedThemeTypographyFontFamily,
    ResolvedThemeTypographyFontSize,
    ResolvedThemeTypographyFontWeight,
    ResolvedThemeTypographyLetterSpacing,
    ResolvedThemeTypographyLineHeight,
    ResolvedThemeTypographyTextAlignment,
    ResolvedThemeValueType
} from '../types';
import { fontSizeModifiers } from './modifiers';
import { resolveColor, resolveColorVariant } from './colors';

/**
 * Color
 */

export const resolveTypographyColor = defineResolverValueFn<
    RawThemeTypographyColor,
    ResolvedThemeTypographyColor
>(resolveColor);

export const resolveTypographyColorVariant = defineResolverVariantFn<
    RawThemeTypographyColor,
    ResolvedThemeTypographyColor
>(resolveColorVariant);

export const typographyColorResolver = defineResolver<
    RawThemeValueType<RawTheme['typography']['color'][string]>,
    ResolvedThemeValueType<ResolvedTheme['typography']['color'][string]>
>({
    key: /^typography\.color\.[^.]+\.[^.]+$/,
    resolve: createResolveFn(resolveTypographyColor, resolveTypographyColorVariant)
});

/**
 * Contrast color
 */

export const resolveTypographyContrastColor = defineResolverValueFn<
    RawThemeTypographyContrastColor,
    ResolvedThemeTypographyContrastColor
>(resolveColor);

export const resolveTypographyContrastColorVariant = defineResolverVariantFn<
    RawThemeTypographyContrastColor,
    ResolvedThemeTypographyContrastColor
>(resolveColorVariant);

export const typographyContrastColorResolver = defineResolver<
    RawThemeValueType<RawTheme['typography']['contrastColor'][string]>,
    ResolvedThemeValueType<ResolvedTheme['typography']['contrastColor'][string]>
>({
    key: /^typography\.contrastColor\.[^.]+\.[^.]+$/,
    resolve: createResolveFn(resolveTypographyContrastColor, resolveTypographyContrastColorVariant)
});

/**
 * Font family
 */

export const resolveTypographyFontFamily = defineResolverValueFn<
    RawThemeTypographyFontFamily,
    ResolvedThemeTypographyFontFamily
>((fontFamily, meta) => {
    return fontFamily;
});

export const resolveTypographyFontFamilyVariant = defineResolverVariantFn<
    RawThemeTypographyFontFamily,
    ResolvedThemeTypographyFontFamily
>(resolveTypographyFontFamily);

export const typographyFontFamilyResolver = defineResolver<
    RawThemeValueType<RawTheme['typography']['fontFamily']>,
    ResolvedThemeValueType<ResolvedTheme['typography']['fontFamily']>
>({
    key: /^typography\.fontFamily\.[^.]+$/,
    resolve: createResolveFn(resolveTypographyFontFamily, resolveTypographyFontFamilyVariant)
});

/**
 * Font size
 */

export const resolveTypographyFontSize = defineResolverValueFn<
    RawThemeTypographyFontSize,
    ResolvedThemeTypographyFontSize
>((fontSize, meta) => {
    return fontSize;
});

export const resolveTypographyFontSizeVariant = defineResolverVariantFn<
    RawThemeTypographyFontSizeVariant | RawThemeTypographyFontSize,
    ResolvedThemeTypographyFontSize
>((variant, meta) => {
    if (typeof variant === 'string') {
        return resolveTypographyFontSize(variant, meta);
    }

    return Object.keys(variant).reduce<ResolvedThemeTypographyFontSize>((acc, modifierName) => {
        if (modifierName in fontSizeModifiers) {
            return fontSizeModifiers[modifierName as keyof typeof fontSizeModifiers](
                acc,
                variant[modifierName]
            );
        }

        return acc;
    }, codegenCssVariables.get('font-size'));
});

export const typographyFontSizeResolver = defineResolver<
    RawThemeValueType<RawTheme['typography']['fontSize']>,
    ResolvedThemeValueType<ResolvedTheme['typography']['fontSize']>
>({
    key: /^typography\.fontSize\.[^.]+$/,
    resolve: createResolveFn(resolveTypographyFontSize, resolveTypographyFontSizeVariant)
});

/**
 * Font weight
 */

export const resolveTypographyFontWeight = defineResolverValueFn<
    RawThemeTypographyFontWeight,
    ResolvedThemeTypographyFontWeight
>((fontWeight, meta) => {
    return fontWeight;
});

export const resolveTypographyFontWeightVariant = defineResolverVariantFn<
    RawThemeTypographyFontWeight,
    ResolvedThemeTypographyFontWeight
>(resolveTypographyFontWeight);

export const typographyFontWeightResolver = defineResolver<
    RawThemeValueType<RawTheme['typography']['fontWeight']>,
    ResolvedThemeValueType<ResolvedTheme['typography']['fontWeight']>
>({
    key: /^typography\.fontWeight\.[^.]+$/,
    resolve: createResolveFn(resolveTypographyFontWeight, resolveTypographyFontWeightVariant)
});

/**
 * Letter spacing
 */

export const resolveTypographyLetterSpacing = defineResolverValueFn<
    RawThemeTypographyLetterSpacing,
    ResolvedThemeTypographyLetterSpacing
>((letterSpacing, meta) => {
    return letterSpacing;
});

export const resolveTypographyLetterSpacingVariant = defineResolverVariantFn<
    RawThemeTypographyLetterSpacing,
    ResolvedThemeTypographyLetterSpacing
>(resolveTypographyLetterSpacing);

export const typographyLetterSpacingResolver = defineResolver<
    RawThemeValueType<RawTheme['typography']['letterSpacing']>,
    ResolvedThemeValueType<ResolvedTheme['typography']['letterSpacing']>
>({
    key: /^typography\.letterSpacing\.[^.]+$/,
    resolve: createResolveFn(resolveTypographyLetterSpacing, resolveTypographyLetterSpacingVariant)
});

/**
 * Line height
 */

export const resolveTypographyLineHeight = defineResolverValueFn<
    RawThemeTypographyLineHeight,
    ResolvedThemeTypographyLineHeight
>((lineHeight, meta) => {
    return lineHeight;
});

export const resolveTypographyLineHeightVariant = defineResolverVariantFn<
    RawThemeTypographyLineHeight,
    ResolvedThemeTypographyLineHeight
>(resolveTypographyLineHeight);

export const typographyLineHeightResolver = defineResolver<
    RawThemeValueType<RawTheme['typography']['lineHeight']>,
    ResolvedThemeValueType<ResolvedTheme['typography']['lineHeight']>
>({
    key: /^typography\.lineHeight\.[^.]+$/,
    resolve: createResolveFn(resolveTypographyLineHeight, resolveTypographyLineHeightVariant)
});

/**
 * Text alignment
 */

export const resolveTypographyTextAlignment = defineResolverValueFn<
    RawThemeTypographyTextAlignment,
    ResolvedThemeTypographyTextAlignment
>((lineHeight, meta) => {
    return lineHeight;
});

export const resolveTypographyTextAlignmentVariant = defineResolverVariantFn<
    RawThemeTypographyTextAlignment,
    ResolvedThemeTypographyTextAlignment
>(resolveTypographyTextAlignment);

export const typographyTextAlignmentResolver = defineResolver<
    RawThemeValueType<RawTheme['typography']['textAlign']>,
    ResolvedThemeValueType<ResolvedTheme['typography']['textAlign']>
>({
    key: /^typography\.textAlign\.[^.]+$/,
    resolve: createResolveFn(resolveTypographyTextAlignment, resolveTypographyTextAlignmentVariant)
});
