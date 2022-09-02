import { Generator, GeneratorPriority, ResolvedTheme } from '../types';
import { codegenSetCSSVariable } from '../helpers';
import { toDashCase } from '@grozav/utils';
import { MATCH_VARIANTS_REGEX, MATCH_ELEMENTS_REGEX } from '../constants';

export const scaleRatioGenerator: Generator<ResolvedTheme['scaleRatio']> = {
    name: 'scale-ratio',
    location: 'root',
    test: /(.*)scaleRatio$/,
    skip: [MATCH_VARIANTS_REGEX, MATCH_ELEMENTS_REGEX],
    priority: GeneratorPriority.High,
    apply: ({ value }) => {
        return ['/**', ' * Scale ratio variables', ' */']
            .concat(
                Object.keys(value)
                    .filter((ratioName) => ratioName !== 'primary')
                    .map((ratioName) => codegenSetCSSVariable(`scale-ratio-${toDashCase(ratioName)}`, value[ratioName])),
                [
                    codegenSetCSSVariable('scale-ratio', value.primary),
                    codegenSetCSSVariable('scale-ratio-pow-1', 'var(--scale-ratio)'),
                    codegenSetCSSVariable('scale-ratio-pow-2', 'calc(var(--scale-ratio-pow-1) * var(--scale-ratio))'),
                    codegenSetCSSVariable('scale-ratio-pow-3', 'calc(var(--scale-ratio-pow-2) * var(--scale-ratio))'),
                    codegenSetCSSVariable('scale-ratio-pow-4', 'calc(var(--scale-ratio-pow-3) * var(--scale-ratio))'),
                    codegenSetCSSVariable('scale-ratio-pow-5', 'calc(var(--scale-ratio-pow-4) * var(--scale-ratio))'),
                    codegenSetCSSVariable('scale-ratio-pow-6', 'calc(var(--scale-ratio-pow-5) * var(--scale-ratio))')
                ]
            );
    }
};

export const scaleRatioGenerators = [
    scaleRatioGenerator
];
