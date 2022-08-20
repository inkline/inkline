import { Generator, ResolvedTheme } from '../types';
import { animationProperties } from '../constants';
import { codegenSetCSSVariable } from '../helpers';
import { toDashCase } from '@grozav/utils';

export const animationGenerator: Generator<ResolvedTheme['animation']> = {
    name: 'animation',
    location: 'root',
    test: /(.*)animation$/,
    skip: /^variants/,
    apply: ({ value }) => {
        return ['/**', ' * Animation variables', ' */']
            .concat(
                animationProperties.map((property) => codegenSetCSSVariable(`animation-${toDashCase(property)}`, value[property]))
            );
    }
};

export const animationGenerators = [
    animationGenerator
];
