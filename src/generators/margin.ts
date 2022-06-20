import { Configuration, SpacingVariant, Theme, UserConfiguration } from '../types';
import { sidesPropertyKeys } from '../constants';
import { codegenGetCSSVariable, codegenSetCSSVariable } from '../helpers';
import { spacingModifiers as modifiers, spacingModifierAliases as modifierAliases } from './modifiers';

/**
 * Generate the code for a specific variant if needed
 *
 * @param config
 * @param variantName
 * @param variant
 */
const codegenVariant = (config: Configuration, variantName: string, variant: SpacingVariant): string[] => {
    const variantValue: Theme['margin'] = {
        top: codegenGetCSSVariable('margin-top'),
        right: codegenGetCSSVariable('margin-right'),
        bottom: codegenGetCSSVariable('margin-bottom'),
        left: codegenGetCSSVariable('margin-left')
    };

    Object.keys(variant).forEach((modifier) => {
        (modifiers[modifier] || modifiers[modifierAliases[modifier]])(variantValue, variant[modifier] as string);
    });

    return sidesPropertyKeys.map((side) =>
        codegenSetCSSVariable(`margin-${side}-${variantName}`, variantValue[side])
    );
};

export const marginGenerators: UserConfiguration.GeneratorPlugin<{}, Theme['margin']> = () => [
    {
        name: 'margin',
        test: /(.*)margin$/,
        skip: /^variants/,
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
    },
    {
        name: 'variants/margin',
        test: /variants.margin\.(.+)$/,
        generate: ({ config, value, path }) => {
            const key = path[path.length - 1];

            return codegenVariant(config, key, value as SpacingVariant);
        }
    }
];
