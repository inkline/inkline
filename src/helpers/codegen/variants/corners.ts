import {CornersProperty, CornersPropertyVariant, ResolvedConfiguration, ResolvedTheme, Theme} from '../../../types';
import { codegenGetCSSVariable, codegenSetCSSVariable } from '../variable';
import { cornersModifierAliases, cornersModifiers } from '../../../generators/modifiers/corners';
import { cornersPropertyKeys } from '../../../constants';
import { toDashCase } from '@grozav/utils';

/**
 * Generate the code for a specific border radius variant
 *
 * @param config
 * @param property
 * @param variantName
 * @param variant
 */
export const codegenCornersPropertyVariant = (config: ResolvedConfiguration, property: 'border-radius', variantName: string, variant: CornersPropertyVariant): string[] => {
    const variantValue: CornersProperty<string> = {
        topLeft: codegenGetCSSVariable(`${property}-top-left`),
        topRight: codegenGetCSSVariable(`${property}-top-right`),
        bottomRight: codegenGetCSSVariable(`${property}-bottom-right`),
        bottomLeft: codegenGetCSSVariable(`${property}-bottom-left`)
    };

    Object.keys(variant).forEach((modifierName) => {
        const modifier = cornersModifiers[modifierName] || cornersModifiers[cornersModifierAliases[modifierName]];

        modifier(variantValue, variant[modifierName] as string);
    });

    return cornersPropertyKeys.map((side) =>
        codegenSetCSSVariable(
            `${property}-${toDashCase(side)}-${variantName}`,
            variantValue[side]
        )
    ).concat([
        codegenSetCSSVariable(
            `${property}-${variantName}`,
            cornersPropertyKeys.map(
                (side) => codegenGetCSSVariable(`${property}-${toDashCase(side)}-${variantName}`)
            ).join(' ')
        )
    ]);
};
