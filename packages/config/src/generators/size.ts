import {
    codegenCssVariables,
    createGenerateFn,
    createGenericDesignTokenVariantGenerateFn,
    defineGenerator,
    defineGeneratorValueFn,
    getResolvedPath,
    getResolvedCssVariableVariantName,
    getCssVariableVariantName
} from '../utils';
import { GeneratorPriority, GeneratorType, ResolvedTheme, ResolvedThemeValueType } from '../types';

export const generateSizeMultiplier = defineGeneratorValueFn((multiplier, meta) => {
    const variantName = getCssVariableVariantName(meta);
    const resolvedVariantName = getResolvedCssVariableVariantName(variantName);

    return [codegenCssVariables.set(`size-multiplier${resolvedVariantName}`, `${multiplier}`)];
});

export const sizeMultiplierGenerator = defineGenerator<
    ResolvedThemeValueType<ResolvedTheme['size']['multiplier']>
>({
    key: /^size\.multiplier\.[^.]+$/,
    type: GeneratorType.CssVariables,
    priority: GeneratorPriority.High,
    generate: createGenerateFn(generateSizeMultiplier)
});

export const generatePercentage = defineGeneratorValueFn(
    (percentage: number | string, meta): string[] => {
        const variantName = getCssVariableVariantName(meta);
        const resolvedVariantName = getResolvedCssVariableVariantName(variantName);
        return variantName === 'default'
            ? []
            : [
                  codegenCssVariables.set(
                      `size-percentage${resolvedVariantName}`,
                      `${percentage}${typeof percentage === 'number' ? '%' : ''}`
                  )
              ];
    }
);

export const sizePercentagesGenerator = defineGenerator<
    ResolvedThemeValueType<ResolvedTheme['size']['percentages']>
>({
    key: /^size\.percentages\.[^.]+$/,
    type: GeneratorType.CssVariables,
    priority: GeneratorPriority.High,
    generate: createGenerateFn(generatePercentage)
});
