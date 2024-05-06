import type {
    Classifier,
    ClassifierMeta,
    Generator,
    GeneratorMeta,
    RawTheme,
    ResolvedTheme,
    Resolver,
    ResolverMeta
} from '../types';
import { defaultClassifiers, defaultGenerators, defaultResolvers, defaultThemes } from '../presets';
import { applyResolvers } from '../apply';

export function createTestingClassifierMeta(options?: {
    path?: string[];
    theme?: Partial<RawTheme>;
    classifiers?: Classifier[];
}): ClassifierMeta {
    return {
        path: options?.path ?? [],
        theme: (options?.theme ?? defaultThemes.default) as RawTheme,
        classifiers: options?.classifiers ?? defaultClassifiers
    };
}

export function createTestingResolverMeta(options?: {
    path?: string[];
    theme?: Partial<RawTheme>;
    resolvers?: Resolver<any, any>[];
}): ResolverMeta {
    return {
        path: options?.path ?? [],
        theme: (options?.theme ?? defaultThemes.default) as RawTheme,
        resolvers: options?.resolvers ?? defaultResolvers
    };
}

export function createTestingGeneratorMeta(options?: {
    path?: string[];
    theme?: Partial<ResolvedTheme>;
    themeName?: string;
    generators?: Generator<any>[];
}): GeneratorMeta {
    return {
        path: options?.path ?? [],
        theme: (options?.theme ??
            applyResolvers(defaultThemes.default, {
                path: [],
                theme: defaultThemes.default,
                resolvers: defaultResolvers
            })) as ResolvedTheme,
        themeName: options?.themeName ?? 'default',
        generators: options?.generators ?? defaultGenerators
    };
}
