import { Configuration, SidesVariant, Theme, UserConfiguration } from '../types';
import { sidesPropertyKeys } from '../constants';
import {codegenGetCSSVariable, codegenSetCSSVariable, codegenSidesVariant} from '../helpers';
import { sidesModifiers as modifiers, sidesModifierAliases as modifierAliases } from './modifiers';

/**
 * Generate the code for a specific variant if needed
 *
 * @param config
 * @param variantName
 * @param variant
 */
const codegenVariant = (config: Configuration, variantName: string, variant: SidesVariant): string[] => {
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
    ).concat([
        codegenSetCSSVariable(`margin-${variantName}`, sidesPropertyKeys.map((side) => codegenGetCSSVariable(`margin-${side}-${variantName}`)).join(' '))
    ]);
};

export const marginGenerators: UserConfiguration.GeneratorPlugin<{}, Theme['margin']> = () => [
    {
        name: 'spacing',
        test: /(.*)margin$/,
        skip: /^variants/,
        generate: ({ value }) => ['/**', ' * Margin variables', ' */']
            .concat(
                sidesPropertyKeys.map(
                    (side) => codegenSetCSSVariable(`margin-${side}`, value[side])
                )
            )
            .concat([
                codegenSetCSSVariable('margin', sidesPropertyKeys.map(
                    (side) => codegenGetCSSVariable(`margin-${side}`)
                ).join(' '))
            ])
    },
    {
        name: 'spacing',
        test: /variants\.margin\.(.+)$/,
        generate: ({ config, value, path }) => {
            const key = path[path.length - 1];

            return ['/**', ` * Margin ${key} variant variables`, ' */']
                .concat(codegenSidesVariant(config, 'margin', key, value as SidesVariant));
        }
    }
];
