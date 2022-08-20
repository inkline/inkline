import { Configuration, ResolvedConfiguration, Theme } from './types';
import { applyResolvers } from './applicators';

export function resolve (config: Configuration): ResolvedConfiguration {
    Object.keys(config.theme).forEach((themeName) => {
        const theme = config.theme[themeName] as Theme;

        (config as ResolvedConfiguration).theme[themeName] = applyResolvers(config, theme, theme);
    });

    return config as ResolvedConfiguration;
}
