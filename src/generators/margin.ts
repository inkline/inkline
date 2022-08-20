import { Generator, ResolvedTheme, ThemeVariants } from '../types';
import { sidesPropertyKeys } from '../constants';
import { codegenGetCSSVariable, codegenSetCSSVariable, codegenSidesPropertyVariant } from '../helpers';

export const marginGenerator: Generator<ResolvedTheme['margin']> = {
    name: 'spacing',
    location: 'root',
    test: /(.*)margin$/,
    skip: /^variants/,
    apply: ({ value }) => ['/**', ' * Margin variables', ' */']
        .concat(
            sidesPropertyKeys.map(
                (side) => codegenSetCSSVariable(`margin-${side}`, value[side])
            )
        )
        .concat([
            codegenSetCSSVariable('margin', sidesPropertyKeys.map(
                (side) => codegenGetCSSVariable(`margin-${side}`)
            ).join(' '))
        ])
};

export const marginVariantGenerator: Generator<ThemeVariants['margin']> = {
    name: 'spacing',
    location: 'root',
    test: /variants\.margin\.(.+)$/,
    apply: ({ config, value, path }) => {
        const key = path[path.length - 1];

        return ['/**', ` * Margin ${key} variant variables`, ' */']
            .concat(codegenSidesPropertyVariant(config, 'margin', key, value));
    }
};

export const marginGenerators = [
    marginGenerator,
    marginVariantGenerator
];
