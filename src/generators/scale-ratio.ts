import { Theme, UserConfiguration } from '../types';
import { codegenSetCSSVariable } from '../helpers';
import { toDashCase } from '@grozav/utils';
import { GeneratorPriority } from '../constants';

export const scaleRatioGenerators: UserConfiguration.GeneratorPlugin<{}, Theme['scaleRatio']> = () => [
    {
        name: 'scaleRatio',
        test: /(.*)scaleRatio$/,
        skip: /^variants/,
        priority: GeneratorPriority.High,
        generate: ({ value }) => {
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
    }
];
