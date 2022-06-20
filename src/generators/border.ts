import { Theme, UserConfiguration } from '../types';
import { borderProperties, sidesPropertyKeys } from '../constants';
import { codegenGetCSSVariable, codegenSetCSSVariable } from '../helpers';

export const borderGenerators: UserConfiguration.GeneratorPlugin<{}, Theme['border']> = () => [
    {
        name: 'border',
        test: /(.*)border$/,
        skip: /^variants/,
        generate: ({ value }) => ['/**', ' * Border variables', ' */']
            .concat(
                borderProperties.map((property) => [
                    sidesPropertyKeys.map((side) =>
                        codegenSetCSSVariable(`border-${side}-${property}`, value[side][property])
                    ),
                    codegenSetCSSVariable(`border-${property}`, sidesPropertyKeys.map((side) =>
                        codegenGetCSSVariable(`border-${side}-${property}`)
                    ).join(' '))
                ].flat()).flat()
            )
    }
];
