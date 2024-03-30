import {
    createFieldWithoutVariantsGenerateFn,
    createFieldWithVariantsGenerateFn,
    createGenericDesignTokenVariantGenerateFn,
    createMultipleFieldsWithVariantsGenerateFn,
    defineGenerator
} from '../utils';
import { GeneratorType, ResolvedTheme } from '../types';
import { generateColor } from './colors';

export const typographyColorGenerator = defineGenerator<ResolvedTheme['typography']['color']>({
    key: 'typography.color',
    type: GeneratorType.CssVariables,
    generate: createMultipleFieldsWithVariantsGenerateFn((value, meta) =>
        generateColor(value, {
            ...meta,
            path: meta.path.map((p) => (p === 'color' ? 'textColor' : p))
        })
    )
});

export const typographyContrastColorGenerator = defineGenerator<
    ResolvedTheme['typography']['contrastColor']
>({
    key: 'typography.contrastColor',
    type: GeneratorType.CssVariables,
    generate: createMultipleFieldsWithVariantsGenerateFn((value, meta) =>
        generateColor(value, {
            ...meta,
            path: meta.path.map((p) => (p === 'contrastColor' ? 'contrastTextColor' : p))
        })
    )
});

export const typographyFontFamilyGenerator = defineGenerator<
    ResolvedTheme['typography']['fontFamily']
>({
    key: 'typography.fontFamily',
    type: GeneratorType.CssVariables,
    generate: createFieldWithVariantsGenerateFn(
        createGenericDesignTokenVariantGenerateFn({
            aggregate: ['base'],
            replacePath: (path) => path.filter((p) => p !== 'typography')
        })
    )
});

export const typographyFontSizeGenerator = defineGenerator<ResolvedTheme['typography']['fontSize']>(
    {
        key: 'typography.fontSize',
        type: GeneratorType.CssVariables,
        generate: createFieldWithVariantsGenerateFn(
            createGenericDesignTokenVariantGenerateFn({
                replacePath: (path) => path.filter((p) => p !== 'typography')
            })
        )
    }
);

export const typographyFontWeightGenerator = defineGenerator<
    ResolvedTheme['typography']['fontWeight']
>({
    key: 'typography.fontWeight',
    type: GeneratorType.CssVariables,
    generate: createFieldWithVariantsGenerateFn(
        createGenericDesignTokenVariantGenerateFn({
            replacePath: (path) => path.filter((p) => p !== 'typography')
        })
    )
});

export const typographyLineHeightGenerator = defineGenerator<
    ResolvedTheme['typography']['lineHeight']
>({
    key: 'typography.lineHeight',
    type: GeneratorType.CssVariables,
    generate: createFieldWithVariantsGenerateFn(
        createGenericDesignTokenVariantGenerateFn({
            replacePath: (path) => path.filter((p) => p !== 'typography')
        })
    )
});

export const typographyLetterSpacingGenerator = defineGenerator<
    ResolvedTheme['typography']['letterSpacing']
>({
    key: 'typography.letterSpacing',
    type: GeneratorType.CssVariables,
    generate: createFieldWithVariantsGenerateFn(
        createGenericDesignTokenVariantGenerateFn({
            replacePath: (path) => path.filter((p) => p !== 'typography')
        })
    )
});

export const typographyTextAlignmentGenerator = defineGenerator<
    ResolvedTheme['typography']['textAlign']
>({
    key: 'typography.textAlign',
    type: GeneratorType.CssVariables,
    generate: createFieldWithoutVariantsGenerateFn(
        createGenericDesignTokenVariantGenerateFn({
            replacePath: (path) => path.filter((p) => p !== 'typography')
        })
    )
});
