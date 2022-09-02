import { Generator, ResolvedTheme, ThemeVariants } from '../types';
import { MATCH_VARIANTS_REGEX, MATCH_ELEMENTS_REGEX, sidesPropertyKeys } from '../constants';
import { codegenGetCSSVariable, codegenSetCSSVariable, codegenSidesPropertyVariant } from '../helpers';

export const paddingGenerator: Generator<ResolvedTheme['padding']> = {
    name: 'spacing',
    location: 'root',
    test: /(.*)padding$/,
    skip: [MATCH_VARIANTS_REGEX, MATCH_ELEMENTS_REGEX],
    apply: ({ value }) => ['/**', ' * Padding variables', ' */']
        .concat(
            sidesPropertyKeys.map(
                (side) => codegenSetCSSVariable(`padding-${side}`, value[side])
            )
        )
        .concat([
            codegenSetCSSVariable('padding', sidesPropertyKeys.map(
                (side) => codegenGetCSSVariable(`padding-${side}`)
            ).join(' '))
        ])
};

export const paddingVariantGenerator: Generator<ThemeVariants['padding']> = {
    name: 'spacing',
    location: 'root',
    test: /variants\.padding\.(.+)$/,
    apply: ({ config, value, path }) => {
        const key = path[path.length - 1];

        return ['/**', ` * Padding ${key} variant variables`, ' */']
            .concat(codegenSidesPropertyVariant(config, 'padding', key, value));
    }
};

export const paddingGenerators = [
    paddingGenerator,
    paddingVariantGenerator
];
