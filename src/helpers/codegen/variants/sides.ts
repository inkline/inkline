import { ResolvedConfiguration, SidesProperty, SidesPropertyVariant } from '../../../types';
import { codegenGetCSSVariable, codegenSetCSSVariable } from '../variable';
import { sidesModifierAliases, sidesModifiers } from '../../../generators/modifiers';
import { sidesPropertyKeys } from '../../../constants';

/**
 * Generate the code for a specific sides variant
 *
 * @param config
 * @param property
 * @param variantName
 * @param variant
 */
export const codegenSidesPropertyVariant = (config: ResolvedConfiguration, property: 'margin' | 'padding', variantName: string, variant: SidesPropertyVariant): string[] => {
    const variantValue: SidesProperty<string> = {
        top: codegenGetCSSVariable(`${property}-top`),
        right: codegenGetCSSVariable(`${property}-right`),
        bottom: codegenGetCSSVariable(`${property}-bottom`),
        left: codegenGetCSSVariable(`${property}-left`)
    };

    Object.keys(variant).forEach((modifierName) => {
        const modifier = sidesModifiers[modifierName] || sidesModifiers[sidesModifierAliases[modifierName]];

        modifier(variantValue, variant[modifierName] as string);
    });

    return sidesPropertyKeys.map((side) =>
        codegenSetCSSVariable(`${property}-${side}-${variantName}`, variantValue[side])
    ).concat([
        codegenSetCSSVariable(`${property}-${variantName}`, sidesPropertyKeys.map((side) => codegenGetCSSVariable(`${property}-${side}-${variantName}`)).join(' '))
    ]);
};
