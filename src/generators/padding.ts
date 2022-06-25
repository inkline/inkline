import { Configuration, SpacingVariant, Theme, UserConfiguration } from '../types';
import { sidesPropertyKeys } from '../constants';
import {codegenGetCSSVariable, codegenSetCSSVariable, codegenSpacingVariant} from '../helpers';
import { spacingModifierAliases as modifierAliases, spacingModifiers as modifiers } from './modifiers';

export const paddingGenerators: UserConfiguration.GeneratorPlugin<{}, Theme['padding']> = () => [
    {
        name: 'padding',
        test: /(.*)padding$/,
        skip: /^variants/,
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
    },
    {
        name: 'variants.padding',
        test: /variants\.padding\.(.+)$/,
        generate: ({ config, value, path }) => {
            const key = path[path.length - 1];

            return ['/**', ` * Padding ${key} variant variables`, ' */']
                .concat(codegenSpacingVariant(config, 'padding', key, value as SpacingVariant));
        }
    }
];
