import type {
    Generator,
    GeneratorMeta,
    RawTheme,
    ResolvedTheme,
    Resolver,
    ResolverMeta
} from '../types';
import { defaultGenerators, defaultResolvers, defaultThemes } from '../presets';
import { applyResolvers } from '../apply';

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
        themeName: 'default',
        generators: options?.generators ?? defaultGenerators
    };
}
