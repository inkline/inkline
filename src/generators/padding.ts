import { Theme, UserConfiguration } from '../types';
import { sidesPropertyKeys } from '../constants';
import { codegenGetCSSVariable, codegenSetCSSVariable } from '../helpers';

export const paddingGenerators: UserConfiguration.GeneratorPlugin<{}, Theme['padding']> = () => [
    {
        test: /(.*)padding$/,
        generate: ({ value }) => ['/**', ' * Padding variables', ' */']
            .concat(
                sidesPropertyKeys.map((side) =>
                    codegenSetCSSVariable(`padding-${side}`, value[side])
                )
            )
            .concat([
                codegenSetCSSVariable('padding', sidesPropertyKeys.map(
                    (side) => codegenGetCSSVariable(`padding-${side}`)
                ).join(' '))
            ])
    }
];
