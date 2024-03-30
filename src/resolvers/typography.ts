import {
    codegenCssVariables,
    defineResolver,
    defineResolverValueFn,
    defineResolverVariantFn,
    createFieldWithOptionalVariantsResolveFn,
    createFieldWithoutVariantsResolveFn,
    createMultipleFieldsWithOptionalVariantsResolveFn
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
    ResolvedTheme,
    ResolvedThemeTypographyColor,
    ResolvedThemeTypographyContrastColor,
    ResolvedThemeTypographyFontFamily,
    ResolvedThemeTypographyFontSize,
    ResolvedThemeTypographyFontWeight,
    ResolvedThemeTypographyLetterSpacing,
    ResolvedThemeTypographyLineHeight,
    ResolvedThemeTypographyTextAlignment
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
    RawTheme['typography']['color'],
    ResolvedTheme['typography']['color']
>({
    key: 'typography.color',
    resolve: createMultipleFieldsWithOptionalVariantsResolveFn(
        resolveTypographyColor,
        resolveTypographyColorVariant
    )
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
    RawTheme['typography']['contrastColor'],
    ResolvedTheme['typography']['contrastColor']
>({
    key: 'typography.contrastColor',
    resolve: createMultipleFieldsWithOptionalVariantsResolveFn(
        resolveTypographyContrastColor,
        resolveTypographyContrastColorVariant
    )
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
    RawTheme['typography']['fontFamily'],
    ResolvedTheme['typography']['fontFamily']
>({
    key: 'typography.fontFamily',
    resolve: createFieldWithOptionalVariantsResolveFn(
        resolveTypographyFontFamily,
        resolveTypographyFontFamilyVariant
    )
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
    RawTheme['typography']['fontSize'],
    ResolvedTheme['typography']['fontSize']
>({
    key: 'typography.fontSize',
    resolve: createFieldWithOptionalVariantsResolveFn(
        resolveTypographyFontSize,
        resolveTypographyFontSizeVariant
    )
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
    RawTheme['typography']['fontWeight'],
    ResolvedTheme['typography']['fontWeight']
>({
    key: 'typography.fontWeight',
    resolve: createFieldWithOptionalVariantsResolveFn(
        resolveTypographyFontWeight,
        resolveTypographyFontWeightVariant
    )
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
    RawTheme['typography']['letterSpacing'],
    ResolvedTheme['typography']['letterSpacing']
>({
    key: 'typography.letterSpacing',
    resolve: createFieldWithOptionalVariantsResolveFn(
        resolveTypographyLetterSpacing,
        resolveTypographyLetterSpacingVariant
    )
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
    RawTheme['typography']['lineHeight'],
    ResolvedTheme['typography']['lineHeight']
>({
    key: 'typography.lineHeight',
    resolve: createFieldWithOptionalVariantsResolveFn(
        resolveTypographyLineHeight,
        resolveTypographyLineHeightVariant
    )
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

export const typographyTextAlignmentResolver = defineResolver<
    RawTheme['typography']['textAlign'],
    ResolvedTheme['typography']['textAlign']
>({
    key: 'typography.textAlign',
    resolve: createFieldWithoutVariantsResolveFn(resolveTypographyTextAlignment)
});
