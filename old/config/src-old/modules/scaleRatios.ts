import {
    defineResolver,
    defineResolverValueFn,
    defineResolverVariantFn,
    createGenericVariantResolveFn,
    defineGeneratorValueFn,
    getResolvedPath,
    createGenericVariantGenerateFn,
    shouldGenerateAggregateValue,
    codegenCssVariables,
    defineGenerator,
    defineModule
} from '../utils';
import { GeneratorOutput, GeneratorPriority } from '../types';

/**
 * Types
 */

export type RawThemeScaleRatio = string | number;

export type ResolvedThemeScaleRatio = string | number;

/**
 * Resolver
 */

export const resolveScaleRatio = defineResolverValueFn<RawThemeScaleRatio, ResolvedThemeScaleRatio>(
    (scaleRatio) => scaleRatio
);

export const resolveScaleRatioVariant = defineResolverVariantFn<
    RawThemeScaleRatio,
    ResolvedThemeScaleRatio
>(resolveScaleRatio);

export const scaleRatiosResolver = defineResolver({
    key: /^scaleRatios\.[^.]+$/,
    resolve: createGenericVariantResolveFn(resolveScaleRatio, resolveScaleRatioVariant)
});

/**
 * Generator
 */

export const generateScaleRatio = defineGeneratorValueFn<ResolvedThemeScaleRatio>((value, meta) => {
    const path = getResolvedPath(meta);
    const tokens = createGenericVariantGenerateFn({
        replacePath: (p) => ['scaleRatio', ...p.slice(1)]
    })(value, meta);

    if (shouldGenerateAggregateValue(meta) && path[path.length - 1] === 'default') {
        [1, 2, 3, 4, 5, 6].forEach((pow) => {
            const scaleRatioCssVariable = codegenCssVariables.get(`scale-ratio`);

            tokens.push(
                codegenCssVariables.set(
                    `scale-ratio-pow-${pow}`,
                    `calc(${new Array(pow).fill(scaleRatioCssVariable).join(' * ')})`
                )
            );
        });
    }

    return tokens;
});

export const scaleRatiosGenerator = defineGenerator({
    key: /^scaleRatios\.[^.]+$/,
    output: GeneratorOutput.CssVariables,
    priority: GeneratorPriority.Highest,
    generate: generateScaleRatio
});

/**
 * Module
 */

export const scaleRatios = defineModule(({ registerResolver, registerGenerator }) => {
    registerResolver(scaleRatiosResolver);
    registerGenerator(scaleRatiosGenerator);
});
