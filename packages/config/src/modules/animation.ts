import { GeneratorOutput } from '../types';
import { defineGenerator, defineModule, defineResolver } from '../utils';
import { generateTransition, resolveTransition } from './transition';

/**
 * Resolver
 */

export const animationResolver = defineResolver({
    key: [/^animation\.[^.]+$/, /.*\.animation$/],
    resolve: resolveTransition
});

/**
 * Generator
 */

export const animationGenerator = defineGenerator({
    key: [/^animation\.[^.]+$/, /.*\.animation$/],
    output: GeneratorOutput.CssVariables,
    generate: generateTransition
});

/**
 * Module
 */

export const animation = defineModule(({ registerGenerator, registerResolver }) => {
    registerResolver(animationResolver);
    registerGenerator(animationGenerator);
});
