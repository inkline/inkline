import {
    defineGenerator,
    defineGeneratorValueFn,
    defineModule,
    defineResolver,
    defineResolverValueFn
} from '../utils';
import { GeneratorOutput, GeneratorPriority } from '../types';

/**
 * Types
 */

export type RawThemeLayers = string[];

export type ResolvedThemeLayers = RawThemeLayers;

/**
 * Resolver
 */

export const layersResolver = defineResolver({
    key: 'layers',
    resolve: defineResolverValueFn<RawThemeLayers, ResolvedThemeLayers>((value) => value)
});

/**
 * Generator
 */

export const layersGenerator = defineGenerator({
    key: 'layers',
    priority: GeneratorPriority.Highest,
    output: GeneratorOutput.Default,
    generate: defineGeneratorValueFn<ResolvedThemeLayers>((layers) =>
        layers.map((layer) => `@layer ${layer};`)
    )
});

/**
 * Module
 */

export const layers = defineModule(({ registerGenerator, registerResolver }) => {
    registerResolver(layersResolver);
    registerGenerator(layersGenerator);
});
