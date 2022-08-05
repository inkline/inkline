import { SidesVariant, Theme, UserConfiguration } from '../types';
import { sidesPropertyKeys } from '../constants';
import { codegenGetCSSVariable, codegenSetCSSVariable, codegenSidesVariant } from '../helpers';

export const paddingGenerators: UserConfiguration.GeneratorPlugin<{}, Theme['padding']> = () => [
    {
        name: 'spacing',
        test: /(.*)padding$/,
        skip: /^variants/,
        generate: ({ value }) => ['/**', ' * Padding variables', ' */']
            .concat(
                sidesPropertyKeys.map(
                    (side) => codegenSetCSSVariable(`padding-${side}`, value[side])
                )
            )
            .concat([
                codegenSetCSSVariable('padding', sidesPropertyKeys.map(
                    (side) => codegenGetCSSVariable(`padding-${side}`)
                ).join(' '))
            ])
    },
    {
        name: 'spacing',
        test: /variants\.padding\.(.+)$/,
        generate: ({ config, value, path }) => {
            const key = path[path.length - 1];

            return ['/**', ` * Padding ${key} variant variables`, ' */']
                .concat(codegenSidesVariant(config, 'padding', key, value as SidesVariant));
        }
    }
];
