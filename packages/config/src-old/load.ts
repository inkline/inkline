import {
    BuildFile,
    Generator,
    Module,
    ModuleParameters,
    OutputModifier,
    RawTheme,
    ResolvedConfiguration,
    ResolvedTheme,
    Resolver,
    ThemeGroup,
    UserConfiguration
} from './types';
import { loadConfig as c12, LoadConfigOptions } from 'c12';
import { defaultConfig } from './presets';
import { applyResolvers } from './apply';
import { PartialDeep } from 'type-fest';
import { createRegistry } from './utils';

export function loadModules(modules: Module[]) {
    const resolverRegistry = createRegistry<Resolver<any, any>>();
    const generatorRegistry = createRegistry<Generator<any>>();
    const outputModifierRegistry = createRegistry<OutputModifier>();
    const fileRegistry = createRegistry<BuildFile>();

    const moduleParameters: ModuleParameters = {
        registerResolver: resolverRegistry.registerItem,
        registerGenerator: generatorRegistry.registerItem,
        registerOutputModifier: outputModifierRegistry.registerItem,
        registerFile: fileRegistry.registerItem
    };

    modules.forEach((module) => module(moduleParameters));

    return {
        resolvers: resolverRegistry.items,
        generators: generatorRegistry.items,
        outputModifiers: outputModifierRegistry.items,
        files: fileRegistry.items
    };
}

export async function loadConfigurationFromFile(
    options: LoadConfigOptions<UserConfiguration> = {}
): Promise<ResolvedConfiguration> {
    return await loadConfiguration({ name: 'inkline', ...options });
}

export async function loadConfiguration(
    options: LoadConfigOptions<UserConfiguration> = {}
): Promise<ResolvedConfiguration> {
    const { config } = await c12<UserConfiguration>({
        name: undefined,
        defaults: defaultConfig,
        ...options
    });

    if (!config) {
        throw new Error('Could not load configuration.');
    }

    return resolveConfiguration({
        ...config,
        ...loadModules(config.modules || [])
    });
}

export function resolveConfiguration(
    config: ResolvedConfiguration<PartialDeep<RawTheme>>
): ResolvedConfiguration {
    const themes = Object.keys(config.themes).reduce<Record<string, ResolvedTheme>>(
        (themes, themeName) => {
            const theme = config.themes[themeName] as ThemeGroup<RawTheme>;

            themes[themeName] = applyResolvers(theme, {
                path: [],
                theme,
                resolvers: config.resolvers
            });

            return themes;
        },
        {}
    );

    return {
        ...config,
        themes
    };
}
