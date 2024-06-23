import {
    defineResolver,
    defineResolverValueFn,
    createGenericVariantResolveFn,
    defineModule,
    createGenericVariantGenerateFn,
    defineGenerator,
    resolveStringValue,
    defineGeneratorValueFn
} from '../utils';
import { GeneratorOutput, Transition } from '../types';

/**
 * Types
 */

export type RawThemeTransition = string | Transition;

export type ResolvedThemeTransition = Transition;

/**
 * Utils
 */

const properties = ['property', 'duration', 'timingFunction'];

/**
 * Resolver
 */

export const resolveTransition = defineResolverValueFn(
    createGenericVariantResolveFn<RawThemeTransition, ResolvedThemeTransition>((transition) => {
        if (typeof transition === 'string') {
            return resolveStringValue<ResolvedThemeTransition>(transition, properties);
        }

        return transition;
    })
);

export const transitionResolver = defineResolver({
    key: [/^transition\.[^.]+$/, /.*\.transition$/],
    resolve: resolveTransition
});

/**
 * Generator
 */

export const generateTransition = defineGeneratorValueFn(
    createGenericVariantGenerateFn<ResolvedThemeTransition>({
        aggregate: properties
    })
);

export const transitionGenerator = defineGenerator({
    key: [/^transition\.[^.]+$/, /.*\.transition$/],
    output: GeneratorOutput.CssVariables,
    generate: generateTransition
});

/**
 * Module
 */

export const transition = defineModule(({ registerResolver, registerGenerator }) => {
    registerResolver(transitionResolver);
    registerGenerator(transitionGenerator);
});
