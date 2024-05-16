import { RawConfiguration, RawTheme, ResolvedConfiguration, ResolvedTheme } from './types';
import { loadConfig as c12, LoadConfigOptions } from 'c12';
import { defaultConfig } from './presets';
import { applyClassifiers, applyResolvers } from './apply';

export function resolveConfiguration(config: RawConfiguration): ResolvedConfiguration {
    const classifiedThemes = Object.keys(config.themes).reduce<Record<string, RawTheme>>(
        (themes, themeName) => {
            const theme = config.themes[themeName] as RawTheme;

            themes[themeName] = applyClassifiers(theme, {
                path: [],
                theme,
                classifiers: config.classifiers
            });

            return themes;
        },
        {}
    );

    const themes = Object.keys(classifiedThemes).reduce<Record<string, ResolvedTheme>>(
        (themes, themeName) => {
            const theme = classifiedThemes[themeName];

            themes[themeName] = applyResolvers(theme, {
                path: [],
                theme: theme as RawTheme,
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

export async function loadConfiguration(
    options: LoadConfigOptions<RawConfiguration> = {}
): Promise<ResolvedConfiguration> {
    const { config } = await c12<RawConfiguration>({
        name: undefined,
        defaults: defaultConfig,
        ...options
    });

    if (!config) {
        throw new Error('Could not load configuration.');
    }

    return resolveConfiguration(config);
}

export async function loadConfigurationFromFile(
    options: LoadConfigOptions<RawConfiguration> = {}
): Promise<ResolvedConfiguration> {
    return await loadConfiguration({ name: 'inkline', ...options });
}
