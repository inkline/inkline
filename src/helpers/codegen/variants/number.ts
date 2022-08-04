import { Configuration, NumberVariant } from '../../../types';
import { codegenGetCSSVariable, codegenSetCSSVariable } from '../variable';
import { numberModifierAliases, numberModifiers } from '../../../generators/modifiers';

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
