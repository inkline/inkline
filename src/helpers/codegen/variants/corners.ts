import { CornersProperty, CornersPropertyVariant, ResolvedConfiguration } from '../../../types';
import { codegenGetCSSVariable, codegenSetCSSVariable } from '../variable';
import { cornersModifierAliases, cornersModifiers } from '../../../generators/modifiers/corners';
import { cornersPropertyKeys } from '../../../constants';
import { toKebabCase } from '@grozav/utils';

/**
 * Generate the code for a specific border radius variant
 *
 * @param config
 * @param property
 * @param variantName
 * @param variant
 */
export const codegenCornersPropertyVariant = (
    config: ResolvedConfiguration,
    property: string,
    variantName: string,
    variant: CornersPropertyVariant
): string[] => {
    const [prefix, suffix] = property.split('-');
    const variantValue: CornersProperty<string> = {
        topLeft: codegenGetCSSVariable(`${prefix}-top-left-${suffix}`),
        topRight: codegenGetCSSVariable(`${prefix}-top-right-${suffix}`),
        bottomRight: codegenGetCSSVariable(`${prefix}-bottom-right-${suffix}`),
        bottomLeft: codegenGetCSSVariable(`${prefix}-bottom-left-${suffix}`)
    };

    Object.keys(variant).forEach((modifierName) => {
        const modifier =
            cornersModifiers[modifierName] ||
            cornersModifiers[cornersModifierAliases[modifierName]];

        modifier(variantValue, variant[modifierName] as string);
    });

    return cornersPropertyKeys
        .map((side) =>
            codegenSetCSSVariable(
                `${prefix}-${toKebabCase(side)}-${suffix}-${variantName}`,
                variantValue[side]
            )
        )
        .concat([
            codegenSetCSSVariable(
                `${prefix}-${suffix}-${variantName}`,
                cornersPropertyKeys
                    .map((side) =>
                        codegenGetCSSVariable(
                            `${prefix}-${toKebabCase(side)}-${suffix}-${variantName}`
                        )
                    )
                    .join(' ')
            )
        ]);
};
