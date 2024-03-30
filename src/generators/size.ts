import {
    codegenCssVariables,
    createFieldWithVariantsGenerateFn,
    createGenericDesignTokenVariantGenerateFn,
    defineGenerator,
    defineGeneratorValueFn,
    getResolvedPath
} from '../utils';
import { GeneratorPriority, GeneratorType, ResolvedTheme } from '../types';

export const generateSizeMultiplier = defineGeneratorValueFn((multiplier, meta) => {
    const path = getResolvedPath(meta);
    const variantName = path[path.length - 1];
    const resolvedVariantName = variantName === 'default' ? '' : `-${variantName}`;

    return [codegenCssVariables.set(`size-multiplier${resolvedVariantName}`, `${multiplier}`)];
});

export const sizeMultiplierGenerator = defineGenerator<ResolvedTheme['size']['multiplier']>({
    key: 'size.multiplier',
    type: GeneratorType.CssVariables,
    priority: GeneratorPriority.High,
    generate: createFieldWithVariantsGenerateFn(generateSizeMultiplier)
});

export const generatePercentage = defineGeneratorValueFn(
    (percentage: number | string, meta): string[] => {
        const path = getResolvedPath(meta);
        const variantName = path[path.length - 1];
        return [
            codegenCssVariables.set(
                `size-percentage-${variantName}`,
                `${percentage}${typeof percentage === 'number' ? '%' : ''}`
            )
        ];
    }
);

export const sizePercentagesGenerator = defineGenerator<ResolvedTheme['size']['percentages']>({
    key: 'size.percentages',
    type: GeneratorType.CssVariables,
    priority: GeneratorPriority.High,
    generate: (percentages, meta) => {
        const path = getResolvedPath(meta);
        return Object.entries(percentages).flatMap(([key, value]) =>
            generatePercentage(value, {
                ...meta,
                path: [...path, key]
            })
        );
    }
});
