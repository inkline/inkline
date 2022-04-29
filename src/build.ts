import {Configuration, Theme, Variants} from './types';
import { applyGenerators, applyResolvers } from './apply';

export function build (config: Configuration) {
    const theme = applyResolvers(config, config.theme) as Theme;

    if (config.theme.variants) {
        theme.variants = applyResolvers(config, config.theme.variants, {}, ['variants'], {
            recurseOn: 'post',
            stopOnMatch: true
        }).variants as Variants;
    }

    const code = applyGenerators(config, theme);

    console.log(theme, code, theme.variants.color);

    return code;
}
