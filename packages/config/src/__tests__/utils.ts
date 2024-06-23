import type {
    Generator,
    GeneratorMeta,
    RawTheme,
    ResolvedTheme,
    Resolver,
    ResolverMeta,
    ThemeGroup
} from '../types';
import { defaultModules, defaultThemes } from '../presets';
import { applyResolvers } from '../apply';
import { loadModules } from '../load';

const { resolvers, generators } = loadModules(defaultModules);

export function createTestingResolverMeta(options?: {
    path?: string[];
    theme?: Partial<RawTheme>;
    resolvers?: Resolver<any, any>[];
}): ResolverMeta {
    return {
        path: options?.path ?? [],
        theme: (options?.theme ?? defaultThemes.default) as ThemeGroup<RawTheme>,
        resolvers: options?.resolvers ?? resolvers
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
                theme: defaultThemes.default as ThemeGroup<RawTheme>,
                resolvers
            })) as ResolvedTheme,
        themeName: options?.themeName ?? 'default',
        generators: options?.generators ?? generators
    };
}
