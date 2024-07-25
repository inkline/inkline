import {
    defineResolver,
    defineResolverValueFn,
    defineResolverVariantFn,
    codegenCssVariables,
    createGenericVariantResolveFn,
    defineGeneratorValueFn,
    getCssVariableVariantName,
    getResolvedCssVariableVariantName,
    defineGenerator,
    defineModule,
    addModifier,
    divideModifier,
    multiplyModifier,
    subtractModifier
} from '../utils';
import { GeneratorOutput, GeneratorPriority } from '../types';

/**
 * Types
 */

export type SizeMultiplier = string | number;

export type RawThemeSizeMultiplier = SizeMultiplier;

export type RawThemeSizeMultiplierVariant =
    | SizeMultiplier
    | {
          add?: number | string;
          subtract?: number | string;
          multiply?: number | string;
          divide?: number | string;
          [key: string]: number | string | undefined;
      };

export type ResolvedThemeSizeMultiplier = SizeMultiplier;

/**
 * Utils
 */

export const sizeMultiplierModifiers: Record<
    string,
    (sizeMultiplier: RawThemeSizeMultiplier, value?: any) => string
> = {
    add: addModifier,
    subtract: subtractModifier,
    multiply: multiplyModifier,
    divide: divideModifier
};

/**
 * Resolver
 */

export const resolveSizeMultiplier = defineResolverValueFn<
    RawThemeSizeMultiplier,
    ResolvedThemeSizeMultiplier
>((multiplier) => {
    return multiplier;
});

export const resolveSizeMultiplierVariant = defineResolverVariantFn<
    RawThemeSizeMultiplierVariant | RawThemeSizeMultiplier,
    ResolvedThemeSizeMultiplier
>((variant, meta) => {
    if (typeof variant === 'string' || typeof variant === 'number') {
        return resolveSizeMultiplier(variant, meta);
    }

    return Object.keys(variant).reduce((acc, modifierName) => {
        if (modifierName in sizeMultiplierModifiers) {
            return sizeMultiplierModifiers[modifierName](acc, variant[modifierName]);
        }

        return acc;
    }, codegenCssVariables.get('size-multiplier'));
});

export const sizeMultiplierResolver = defineResolver({
    key: /^sizeMultiplier\.[^.]+$/,
    resolve: createGenericVariantResolveFn(resolveSizeMultiplier, resolveSizeMultiplierVariant)
});

/**
 * Generator
 */

export const generateSizeMultiplier = defineGeneratorValueFn<ResolvedThemeSizeMultiplier>(
    (multiplier, meta) => {
        const variantName = getCssVariableVariantName(meta);
        const resolvedVariantName = getResolvedCssVariableVariantName(variantName);

        return [codegenCssVariables.set(`size-multiplier${resolvedVariantName}`, `${multiplier}`)];
    }
);

export const sizeMultiplierGenerator = defineGenerator({
    key: /^sizeMultiplier\.[^.]+$/,
    output: GeneratorOutput.CssVariables,
    priority: GeneratorPriority.High,
    generate: generateSizeMultiplier
});

/**
 * Module
 */

export const sizeMultiplier = defineModule(({ registerGenerator, registerResolver }) => {
    registerResolver(sizeMultiplierResolver);
    registerGenerator(sizeMultiplierGenerator);
});
