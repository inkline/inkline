import {
    createGenerateFn,
    createGenericDesignTokenVariantGenerateFn,
    defineGenerator,
    getCssVariableName,
    getCssVariablePreamblePath,
    getCssVariableVariantName,
    getResolvedCssVariableVariantName,
    getResolvedPath
} from '../utils';
import { GeneratorType, ResolvedTheme, ResolvedThemeValueType } from '../types';
import { createColorGenerateFn } from './colors';

export const typographyColorGenerator = defineGenerator<
    ResolvedThemeValueType<ResolvedTheme['typography']['color'][string]>
>({
    key: [/^typography.color\.[^.]+\.[^.]+$/],
    type: GeneratorType.CssVariables,
    generate: createGenerateFn((value, meta) => {
        const variableName = meta.path[meta.path.length - 2];
        const variantName = meta.path[meta.path.length - 1];
        const resolvedVariantName = getResolvedCssVariableVariantName(variantName);

        return createColorGenerateFn(`text-color-${variableName}${resolvedVariantName}`)(
            value,
            meta
        );
    })
});

export const typographyContrastColorGenerator = defineGenerator<
    ResolvedThemeValueType<ResolvedTheme['typography']['contrastColor'][string]>
>({
    key: [/^typography.contrastColor\.[^.]+\.[^.]+$/],
    type: GeneratorType.CssVariables,
    generate: createGenerateFn((value, meta) => {
        const variableName = meta.path[meta.path.length - 2];
        const variantName = meta.path[meta.path.length - 1];
        const resolvedVariantName = getResolvedCssVariableVariantName(variantName);

        return createColorGenerateFn(`contrast-text-color-${variableName}${resolvedVariantName}`)(
            value,
            meta
        );
    })
});

export const typographyFontFamilyGenerator = defineGenerator<
    ResolvedThemeValueType<ResolvedTheme['typography']['fontFamily']>
>({
    key: [/^typography.fontFamily\.[^.]+$/],
    type: GeneratorType.CssVariables,
    generate: createGenerateFn(
        createGenericDesignTokenVariantGenerateFn({
            aggregate: ['base']
        })
    )
});

export const typographyFontSizeGenerator = defineGenerator<
    ResolvedThemeValueType<ResolvedTheme['typography']['fontSize']>
>({
    key: [/^typography.fontSize\.[^.]+$/],
    type: GeneratorType.CssVariables,
    generate: createGenerateFn(createGenericDesignTokenVariantGenerateFn())
});

export const typographyFontWeightGenerator = defineGenerator<
    ResolvedThemeValueType<ResolvedTheme['typography']['fontWeight']>
>({
    key: [/^typography.fontWeight\.[^.]+$/],
    type: GeneratorType.CssVariables,
    generate: createGenerateFn(createGenericDesignTokenVariantGenerateFn())
});

export const typographyLineHeightGenerator = defineGenerator<
    ResolvedThemeValueType<ResolvedTheme['typography']['lineHeight']>
>({
    key: [/^typography.lineHeight\.[^.]+$/],
    type: GeneratorType.CssVariables,
    generate: createGenerateFn(createGenericDesignTokenVariantGenerateFn())
});

export const typographyLetterSpacingGenerator = defineGenerator<
    ResolvedThemeValueType<ResolvedTheme['typography']['letterSpacing']>
>({
    key: [/^typography.letterSpacing\.[^.]+$/],
    type: GeneratorType.CssVariables,
    generate: createGenerateFn(createGenericDesignTokenVariantGenerateFn())
});

export const typographyTextAlignmentGenerator = defineGenerator<
    ResolvedThemeValueType<ResolvedTheme['typography']['textAlign']>
>({
    key: [/^typography.textAlign\.[^.]+$/],
    type: GeneratorType.CssVariables,
    generate: createGenerateFn(createGenericDesignTokenVariantGenerateFn())
});
