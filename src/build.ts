import { CodegenGroup, Configuration, ResolvedConfiguration, Theme, Variants } from './types';
import { applyGenerators, applyResolvers } from './apply';

export function build (config: Configuration): CodegenGroup[] {
    const theme = applyResolvers(config, config.theme) as Theme;

    if (config.theme.variants) {
        theme.variants = applyResolvers(config, config.theme.variants, {}, ['variants'], {
            recurseOn: 'post',
            stopOnMatch: true
        }).variants as Variants;
    }

    config.theme = theme;

    return applyGenerators(config as ResolvedConfiguration, theme);
}

export function toFile (codegenGroups: CodegenGroup[]): string {
    return codegenGroups.map(({ value }) => value.join('\n')).join('\n\n');
}
