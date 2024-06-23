import {
    codegenCssVariables,
    createGenericVariantResolveFn,
    defineGenerator,
    defineGeneratorValueFn,
    defineModule,
    defineResolver,
    defineResolverValueFn,
    defineResolverVariantFn,
    getCssVariableVariantName,
    getResolvedCssVariableVariantName
} from '../utils';
import { GeneratorOutput, GeneratorPriority } from '../types';

/**
 * Types
 */

export type SizePercentage = string | number;

export type RawThemePercentage = SizePercentage;

export type ResolvedThemePercentage = SizePercentage;

/**
 * Resolver
 */

export const resolveSizePercentage = defineResolverValueFn<
    RawThemePercentage,
    ResolvedThemePercentage
>((percentage) => {
    return typeof percentage === 'number' ? `${percentage}%` : percentage;
});

export const resolveSizePercentageVariant = defineResolverVariantFn<
    RawThemePercentage,
    ResolvedThemePercentage
>(resolveSizePercentage);

export const sizePercentagesResolver = defineResolver({
    key: /^percentages\.[^.]+$/,
    resolve: createGenericVariantResolveFn(resolveSizePercentage, resolveSizePercentageVariant)
});

/**
 * Generator
 */

export const generatePercentage = defineGeneratorValueFn<ResolvedThemePercentage>(
    (percentage: ResolvedThemePercentage, meta): string[] => {
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

export const sizePercentagesGenerator = defineGenerator({
    key: /^percentages\.[^.]+$/,
    output: GeneratorOutput.CssVariables,
    priority: GeneratorPriority.High,
    generate: generatePercentage
});

/**
 * Module
 */

export const percentages = defineModule(({ registerGenerator, registerResolver }) => {
    registerResolver(sizePercentagesResolver);
    registerGenerator(sizePercentagesGenerator);
});
