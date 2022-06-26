import { Theme, UserConfiguration } from '../types';
import { animationProperties } from '../constants';
import { codegenSetCSSVariable } from '../helpers';
import { toDashCase } from '@grozav/utils';

export const animationGenerators: UserConfiguration.GeneratorPlugin<{}, Theme['animation']> = () => [
    {
        name: 'animation',
        test: /(.*)animation$/,
        skip: /^variants/,
        generate: ({ value }) => {
            return ['/**', ' * Animation variables', ' */']
                .concat(
                    animationProperties.map((property) => codegenSetCSSVariable(`animation-${toDashCase(property)}`, value[property]))
                );
        }
    }
];
