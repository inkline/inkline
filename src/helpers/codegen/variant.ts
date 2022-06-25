import { Configuration, NumberVariant, SpacingVariant, Theme } from '../../types';
import { codegenGetCSSVariable, codegenSetCSSVariable } from './variable';
import { numberModifierAliases, numberModifiers, spacingModifiers, spacingModifierAliases } from '../../generators/modifiers';
import { sidesPropertyKeys } from '../../constants';

/**
 * Generate the code for a specific number variant
 *
 * @param config
 * @param name
 * @param variantName
 * @param variant
 */
export const codegenNumberVariant = (config: Configuration, name: string, variantName: string, variant: NumberVariant): string => {
    const ctx = {
        [variantName]: codegenGetCSSVariable(name)
    };

    Object.keys(variant).forEach((modifier) => {
        (numberModifiers[modifier] || numberModifiers[numberModifierAliases[modifier]])(ctx, variantName, variant[modifier] as string);
    });

    return codegenSetCSSVariable(`${name}-${variantName}`, ctx[variantName]);
};

/**
 * Generate the code for a specific spacing variant
 *
 * @param config
 * @param property
 * @param variantName
 * @param variant
 */
export const codegenSpacingVariant = (config: Configuration, property: 'margin' | 'padding', variantName: string, variant: SpacingVariant): string[] => {
    const variantValue: Theme['margin' | 'padding'] = {
        top: codegenGetCSSVariable(`${property}-top`),
        right: codegenGetCSSVariable(`${property}-right`),
        bottom: codegenGetCSSVariable(`${property}-bottom`),
        left: codegenGetCSSVariable(`${property}-left`)
    };

    Object.keys(variant).forEach((modifier) => {
        (spacingModifiers[modifier] || spacingModifiers[spacingModifierAliases[modifier]])(variantValue, variant[modifier] as string);
    });

    return sidesPropertyKeys.map((side) =>
        codegenSetCSSVariable(`${property}-${side}-${variantName}`, variantValue[side])
    ).concat([
        codegenSetCSSVariable(`${property}-${variantName}`, sidesPropertyKeys.map((side) => codegenGetCSSVariable(`${property}-${side}-${variantName}`)).join(' '))
    ]);
};
