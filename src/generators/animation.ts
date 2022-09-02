import { Generator, ResolvedTheme } from '../types';
import { animationProperties, MATCH_VARIANTS_REGEX, MATCH_ELEMENTS_REGEX } from '../constants';
import { codegenSetCSSVariable } from '../helpers';
import { toDashCase } from '@grozav/utils';

export const animationGenerator: Generator<ResolvedTheme['animation']> = {
    name: 'animation',
    location: 'root',
    test: /(.*)animation$/,
    skip: [MATCH_VARIANTS_REGEX, MATCH_ELEMENTS_REGEX],
    apply: ({ value }) => {
        return ['/**', ' * Animation variables', ' */']
            .concat(
                animationProperties.map((property) => codegenSetCSSVariable(`transition-${toDashCase(property)}`, value[property]))
            );
    }
};

export const animationGenerators = [
    animationGenerator
];
