import { Theme, UserConfiguration } from '../types';
import { codegenNumberVariant, codegenSetCSSVariable } from '../helpers';
import { toDashCase } from '@grozav/utils';
import { GeneratorPriority } from '../constants';

export const sizeGenerators: UserConfiguration.GeneratorPlugin<{}, Theme['size']> = () => [
    {
        name: 'size',
        test: /(.*)size\.multiplier$/,
        skip: /^variants/,
        priority: GeneratorPriority.High,
        generate: ({ value }) => {
            return ['/**', ' * Size multiplier variable', ' */']
                .concat([
                    codegenSetCSSVariable('size-multiplier', value)
                ]);
        }
    },
    {
        name: 'size',
        test: /(.*)size\.percentages$/,
        skip: /^variants/,
        priority: GeneratorPriority.High,
        generate: ({ value }) => {
            return ['/**', ' * Size percentage variables', ' */']
                .concat(
                    Object.keys(value)
                        .map((sizeName) => codegenSetCSSVariable(
                            `size-percentages-${toDashCase(sizeName)}`,
                            value[sizeName])
                        )
                );
        }
    },
    {
        name: 'size',
        test: /variants\.size\.multiplier$/,
        priority: GeneratorPriority.High,
        generate: ({ config, value }) => {
            return ['/**', ' * Size multiplier variants variables', ' */']
                .concat(
                    Object.keys(value).map((sizeMultiplierName) =>
                        codegenNumberVariant(config, 'size-multiplier', sizeMultiplierName, value[sizeMultiplierName])
                    )
                );
        }
    }
];
