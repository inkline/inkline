import { Configuration, ResolvedConfiguration, Theme, Variants } from './types';
import { applyResolvers } from './apply';

export function resolve (config: Configuration): ResolvedConfiguration {
    const theme = applyResolvers(config, config.theme) as Theme;

    if (config.theme.variants) {
        theme.variants = applyResolvers(config, config.theme.variants, {}, ['variants'], {
            recurseOn: 'post',
            stopOnMatch: true
        }).variants as Variants;
    }

    config.theme = theme;

    return config as ResolvedConfiguration;
}
