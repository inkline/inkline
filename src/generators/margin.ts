import { Theme, UserConfiguration } from '../types';
import { sidesPropertyKeys } from '../constants';
import { codegenGetCSSVariable, codegenSetCSSVariable } from '../helpers';

export const marginGenerators: UserConfiguration.GeneratorPlugin<{}, Theme['margin']> = () => [
    {
        test: /(.*)margin$/,
        generate: ({ value }) => ['/**', ' * Margin variables', ' */']
            .concat(
                sidesPropertyKeys.map((side) =>
                    codegenSetCSSVariable(`margin-${side}`, value[side])
                )
            )
            .concat([
                codegenSetCSSVariable('margin', sidesPropertyKeys.map(
                    (side) => codegenGetCSSVariable(`margin-${side}`)
                ).join(' '))
            ])
    }
];
