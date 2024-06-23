import {
    codegenCssVariables,
    defineResolver,
    defineResolverValueFn,
    defineResolverVariantFn,
    createGenericVariantResolveFn,
    defineGenerator,
    getResolvedCssVariableVariantName,
    createGenericVariantGenerateFn,
    defineGeneratorValueFn,
    defineModule,
    addModifier,
    divideModifier,
    multiplyModifier,
    subtractModifier
} from '../utils';
import { GeneratorOutput } from '../types';
import {
    createColorGenerateFn,
    RawThemeColor,
    resolveColor,
    resolveColorVariant,
    ResolvedThemeColor
} from './colors';

/**
 * Color
 */

export type RawThemeTypographyColor = RawThemeColor;
export type ResolvedThemeTypographyColor = ResolvedThemeColor;

export const resolveTypographyColor = defineResolverValueFn(resolveColor);

export const resolveTypographyColorVariant = defineResolverVariantFn(resolveColorVariant);

export const typographyColorResolver = defineResolver({
    key: /^typography\.color\.[^.]+\.[^.]+$/,
    resolve: createGenericVariantResolveFn(resolveTypographyColor, resolveTypographyColorVariant)
});

export const typographyColorGenerator = defineGenerator({
    key: [/^textColor\.[^.]+$/],
    output: GeneratorOutput.CssVariables,
    generate: defineGeneratorValueFn<ResolvedThemeTypographyColor>((value, meta) => {
        const variantName = meta.path[meta.path.length - 1];
        const resolvedVariantName = getResolvedCssVariableVariantName(variantName);

        return createColorGenerateFn(`text-color${resolvedVariantName}`)(value, meta);
    })
});

/**
 * Contrast color
 */

export type RawThemeTypographyContrastColor = RawThemeColor;
export type ResolvedThemeTypographyContrastColor = ResolvedThemeColor;

export const resolveTypographyContrastColor = defineResolverValueFn(resolveColor);

export const resolveTypographyContrastColorVariant = defineResolverVariantFn(resolveColorVariant);

export const typographyContrastColorResolver = defineResolver({
    key: /^typography\.contrastColor\.[^.]+\.[^.]+$/,
    resolve: createGenericVariantResolveFn(
        resolveTypographyContrastColor,
        resolveTypographyContrastColorVariant
    )
});

export const typographyContrastColorGenerator = defineGenerator({
    key: [/^textContrastColor\.[^.]+$/],
    output: GeneratorOutput.CssVariables,
    generate: defineGeneratorValueFn<ResolvedThemeTypographyContrastColor>((value, meta) => {
        const variantName = meta.path[meta.path.length - 1];
        const resolvedVariantName = getResolvedCssVariableVariantName(variantName);

        return createColorGenerateFn(`contrast-text-color${resolvedVariantName}`)(value, meta);
    })
});

/**
 * Font family
 */

export interface FontFamily {
    base: string;
    monospace: string;
    print: string;
}

export type RawThemeTypographyFontFamily = FontFamily;
export type ResolvedThemeTypographyFontFamily = RawThemeTypographyFontFamily;

export const resolveTypographyFontFamily = defineResolverValueFn<
    RawThemeTypographyFontFamily,
    ResolvedThemeTypographyFontFamily
>((fontFamily) => {
    return fontFamily;
});

export const resolveTypographyFontFamilyVariant = defineResolverVariantFn<
    RawThemeTypographyFontFamily,
    ResolvedThemeTypographyFontFamily
>(resolveTypographyFontFamily);

export const typographyFontFamilyResolver = defineResolver({
    key: /^typography\.fontFamily\.[^.]+$/,
    resolve: createGenericVariantResolveFn(
        resolveTypographyFontFamily,
        resolveTypographyFontFamilyVariant
    )
});

export const typographyFontFamilyGenerator = defineGenerator({
    key: [/^fontFamily\.[^.]+$/],
    output: GeneratorOutput.CssVariables,
    generate: createGenericVariantGenerateFn<ResolvedThemeTypographyFontFamily>({
        aggregate: ['base']
    })
});

/**
 * Font size
 */

export type RawThemeTypographyFontSize = string;

export type RawThemeTypographyFontSizeVariant = {
    multiply?: string | number;
    divide?: string | number;
    add?: string | number;
    subtract?: string | number;
    [key: string]: string | number | undefined;
};

export type ResolvedThemeTypographyFontSize = RawThemeTypographyFontSize;

export const fontSizeModifiers: Record<
    string,
    (fontSize: RawThemeTypographyFontSize, value?: any) => string
> = {
    add: addModifier,
    subtract: subtractModifier,
    multiply: multiplyModifier,
    divide: divideModifier
};

export const resolveTypographyFontSize = defineResolverValueFn<
    RawThemeTypographyFontSize,
    ResolvedThemeTypographyFontSize
>((fontSize) => {
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
            return fontSizeModifiers[modifierName](acc, variant[modifierName]);
        }

        return acc;
    }, codegenCssVariables.get('font-size'));
});

export const typographyFontSizeResolver = defineResolver({
    key: /^typography\.fontSize\.[^.]+$/,
    resolve: createGenericVariantResolveFn(
        resolveTypographyFontSize,
        resolveTypographyFontSizeVariant
    )
});

export const typographyFontSizeGenerator = defineGenerator({
    key: [/^fontSize\.[^.]+$/],
    output: GeneratorOutput.CssVariables,
    generate: createGenericVariantGenerateFn<ResolvedThemeTypographyFontSize>()
});

/**
 * Font weight
 */

export type RawThemeTypographyFontWeight = string | number;

export type ResolvedThemeTypographyFontWeight = RawThemeTypographyFontWeight;

export const resolveTypographyFontWeight = defineResolverValueFn<
    RawThemeTypographyFontWeight,
    ResolvedThemeTypographyFontWeight
>((fontWeight) => {
    return fontWeight;
});

export const resolveTypographyFontWeightVariant = defineResolverVariantFn<
    RawThemeTypographyFontWeight,
    ResolvedThemeTypographyFontWeight
>(resolveTypographyFontWeight);

export const typographyFontWeightResolver = defineResolver({
    key: /^typography\.fontWeight\.[^.]+$/,
    resolve: createGenericVariantResolveFn(
        resolveTypographyFontWeight,
        resolveTypographyFontWeightVariant
    )
});

export const typographyFontWeightGenerator = defineGenerator({
    key: [/^fontWeight\.[^.]+$/],
    output: GeneratorOutput.CssVariables,
    generate: createGenericVariantGenerateFn<ResolvedThemeTypographyFontWeight>()
});

/**
 * Letter spacing
 */

export type RawThemeTypographyLetterSpacing = string | number;
export type ResolvedThemeTypographyLetterSpacing = RawThemeTypographyLetterSpacing;

export const resolveTypographyLetterSpacing = defineResolverValueFn<
    RawThemeTypographyLetterSpacing,
    ResolvedThemeTypographyLetterSpacing
>((letterSpacing) => {
    return letterSpacing;
});

export const resolveTypographyLetterSpacingVariant = defineResolverVariantFn<
    RawThemeTypographyLetterSpacing,
    ResolvedThemeTypographyLetterSpacing
>(resolveTypographyLetterSpacing);

export const typographyLetterSpacingResolver = defineResolver({
    key: /^typography\.letterSpacing\.[^.]+$/,
    resolve: createGenericVariantResolveFn(
        resolveTypographyLetterSpacing,
        resolveTypographyLetterSpacingVariant
    )
});

export const typographyLetterSpacingGenerator =
    defineGenerator<ResolvedThemeTypographyLetterSpacing>({
        key: [/^letterSpacing\.[^.]+$/],
        output: GeneratorOutput.CssVariables,
        generate: createGenericVariantGenerateFn()
    });

/**
 * Line height
 */

export type RawThemeTypographyLineHeight = string | number;

export type ResolvedThemeTypographyLineHeight = RawThemeTypographyLineHeight;

export const resolveTypographyLineHeight = defineResolverValueFn<
    RawThemeTypographyLineHeight,
    ResolvedThemeTypographyLineHeight
>((lineHeight) => {
    return lineHeight;
});

export const resolveTypographyLineHeightVariant = defineResolverVariantFn<
    RawThemeTypographyLineHeight,
    ResolvedThemeTypographyLineHeight
>(resolveTypographyLineHeight);

export const typographyLineHeightResolver = defineResolver({
    key: /^typography\.lineHeight\.[^.]+$/,
    resolve: createGenericVariantResolveFn(
        resolveTypographyLineHeight,
        resolveTypographyLineHeightVariant
    )
});

export const typographyLineHeightGenerator = defineGenerator({
    key: [/^lineHeight\.[^.]+$/],
    output: GeneratorOutput.CssVariables,
    generate: createGenericVariantGenerateFn<ResolvedThemeTypographyLineHeight>()
});

/**
 * Text alignment
 */

export type RawThemeTypographyTextAlignment = 'left' | 'center' | 'right' | 'justify' | string;
export type ResolvedThemeTypographyTextAlignment = RawThemeTypographyTextAlignment;

export const resolveTypographyTextAlignment = defineResolverValueFn<
    RawThemeTypographyTextAlignment,
    ResolvedThemeTypographyTextAlignment
>((lineHeight) => {
    return lineHeight;
});

export const resolveTypographyTextAlignmentVariant = defineResolverVariantFn<
    RawThemeTypographyTextAlignment,
    ResolvedThemeTypographyTextAlignment
>(resolveTypographyTextAlignment);

export const typographyTextAlignmentResolver = defineResolver({
    key: /^typography\.textAlign\.[^.]+$/,
    resolve: createGenericVariantResolveFn(
        resolveTypographyTextAlignment,
        resolveTypographyTextAlignmentVariant
    )
});

export const typographyTextAlignmentGenerator =
    defineGenerator<ResolvedThemeTypographyTextAlignment>({
        key: [/^textAlign\.[^.]+$/],
        output: GeneratorOutput.CssVariables,
        generate: createGenericVariantGenerateFn()
    });

/**
 * Module
 */

export const typography = defineModule(({ registerGenerator, registerResolver }) => {
    registerResolver(typographyColorResolver);
    registerGenerator(typographyColorGenerator);

    registerResolver(typographyContrastColorResolver);
    registerGenerator(typographyContrastColorGenerator);

    registerResolver(typographyFontFamilyResolver);
    registerGenerator(typographyFontFamilyGenerator);

    registerResolver(typographyFontSizeResolver);
    registerGenerator(typographyFontSizeGenerator);

    registerResolver(typographyFontWeightResolver);
    registerGenerator(typographyFontWeightGenerator);

    registerResolver(typographyLetterSpacingResolver);
    registerGenerator(typographyLetterSpacingGenerator);

    registerResolver(typographyLineHeightResolver);
    registerGenerator(typographyLineHeightGenerator);

    registerResolver(typographyTextAlignmentResolver);
    registerGenerator(typographyTextAlignmentGenerator);
});
