import { Configuration, SpacingVariant, Theme, UserConfiguration } from '../types';
import { sidesPropertyKeys } from '../constants';
import { codegenGetCSSVariable, codegenSetCSSVariable } from '../helpers';
import { spacingModifierAliases as modifierAliases, spacingModifiers as modifiers } from './modifiers';

/**
 * Generate the code for a specific variant if needed
 *
 * @param config
 * @param variantName
 * @param variant
 */
const codegenVariant = (config: Configuration, variantName: string, variant: SpacingVariant): string[] => {
    const variantValue: Theme['padding'] = {
        top: codegenGetCSSVariable('padding-top'),
        right: codegenGetCSSVariable('padding-right'),
        bottom: codegenGetCSSVariable('padding-bottom'),
        left: codegenGetCSSVariable('padding-left')
    };

    Object.keys(variant).forEach((modifier) => {
        (modifiers[modifier] || modifiers[modifierAliases[modifier]])(variantValue, variant[modifier]);
    });

    return sidesPropertyKeys.map((side) =>
        codegenSetCSSVariable(`padding-${side}-${variantName}`, variantValue[side])
    );
};

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
    },
    {
        test: /variants.padding\.(.+)$/,
        generate: ({ config, value, path }) => {
            const key = path[path.length - 1];

            return codegenVariant(config, key, value as SpacingVariant);
        }
    }
];
