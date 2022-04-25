import { Configuration, Theme } from './types';
import { applyGenerators, applyResolvers } from './apply';

export function build (config: Configuration) {
    const theme = applyResolvers(config, config.theme) as Theme;
    const code = applyGenerators(config, theme);

    console.log(theme, code);

    return code;
}
