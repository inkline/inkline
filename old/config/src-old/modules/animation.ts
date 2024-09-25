import { GeneratorOutput, Animation } from '../types';
import {
    createGenericVariantGenerateFn,
    createGenericVariantResolveFn,
    defineGenerator,
    defineGeneratorValueFn,
    defineModule,
    defineResolver,
    defineResolverValueFn,
    resolveStringValue
} from '../utils';

/**
 * Types
 */

export type RawThemeAnimation = string | Animation;

export type ResolvedThemeAnimation = Animation;

/**
 * Utils
 */

const properties = ['name', 'duration', 'iterationCount', 'direction'];

/**
 * Resolver
 */

export const resolveAnimation = defineResolverValueFn(
    createGenericVariantResolveFn<RawThemeAnimation, ResolvedThemeAnimation>((animation) => {
        if (typeof animation === 'string') {
            return resolveStringValue<ResolvedThemeAnimation>(animation, properties);
        }

        return animation;
    })
);

export const animationResolver = defineResolver({
    key: [/^animation\.[^.]+$/, /.*\.animation$/],
    resolve: resolveAnimation
});

/**
 * Generator
 */

export const generateAnimation = defineGeneratorValueFn(
    createGenericVariantGenerateFn<ResolvedThemeAnimation>({
        aggregate: properties
    })
);

export const animationGenerator = defineGenerator({
    key: [/^animation\.[^.]+$/, /.*\.animation$/],
    output: GeneratorOutput.CssVariables,
    generate: generateAnimation
});

/**
 * Module
 */

export const animation = defineModule(({ registerGenerator, registerResolver }) => {
    registerResolver(animationResolver);
    registerGenerator(animationGenerator);
});
