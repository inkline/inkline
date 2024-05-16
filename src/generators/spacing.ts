import {
    codegenCssVariables,
    createGenerateFn,
    defineGenerator,
    defineGeneratorValueFn,
    getCssVariablePreamble,
    getResolvedCssVariableVariantName,
    getCssVariableVariantName,
    shouldGenerateAggregateValue,
    toUnitValue,
    getCssVariablePreamblePath
} from '../utils';
import {
    GeneratorPriority,
    GeneratorType,
    ResolvedThemeSpacingWithSides,
    ResolvedTheme,
    ResolvedThemeSpacing,
    ResolvedThemeMargin,
    ResolvedThemePadding,
    ResolvedThemeValueType
} from '../types';
import { sidesPropertyKeys } from '../constants';

/**
 * Spacing with Sides
 */

const generateSpacingWithSides = (property: string) =>
    defineGeneratorValueFn<ResolvedThemeSpacingWithSides>((spacing, meta) => {
        const tokens: string[] = [];
        const variablePreamblePath = getCssVariablePreamblePath(meta);
        const variablePreamble = getCssVariablePreamble(variablePreamblePath);
        const variantName = getCssVariableVariantName(meta);
        const resolvedVariantName = getResolvedCssVariableVariantName(variantName);

        sidesPropertyKeys.forEach((side) => {
            const variableValue = toUnitValue(spacing[side]);
            const variableName = `${variablePreamble}${property}-${side}${resolvedVariantName}`;

            if (typeof spacing[side] !== 'undefined') {
                tokens.push(codegenCssVariables.set(variableName, variableValue));
            }
        });

        if (shouldGenerateAggregateValue(meta)) {
            tokens.push(
                codegenCssVariables.set(
                    `${variablePreamble}${property}${resolvedVariantName}`,
                    sidesPropertyKeys
                        .map((side) =>
                            codegenCssVariables.get(
                                `${variablePreamble}${property}-${side}${resolvedVariantName}`
                            )
                        )
                        .join(' ')
                )
            );
        }

        return tokens;
    });

/**
 * Margin
 */

export const generateMargin = defineGeneratorValueFn<ResolvedThemeMargin>(
    generateSpacingWithSides('margin')
);

export const marginGenerator = defineGenerator<ResolvedThemeValueType<ResolvedTheme['margin']>>({
    key: [/^margin\.[^.]+$/, /.*\.margin$/],
    type: GeneratorType.CssVariables,
    priority: GeneratorPriority.Medium,
    generate: createGenerateFn(generateMargin)
});

/**
 * Padding
 */

export const generatePadding = defineGeneratorValueFn<ResolvedThemePadding>(
    generateSpacingWithSides('padding')
);

export const paddingGenerator = defineGenerator<ResolvedThemeValueType<ResolvedTheme['padding']>>({
    key: [/^padding\.[^.]+$/, /.*\.padding$/],
    type: GeneratorType.CssVariables,
    priority: GeneratorPriority.Medium,
    generate: createGenerateFn(generatePadding)
});

/**
 * Spacing
 */

export const generateSpacing = defineGeneratorValueFn<ResolvedThemeSpacing>((spacing, meta) => {
    const variablePreamblePath = getCssVariablePreamblePath(meta);
    const variablePreamble = getCssVariablePreamble(variablePreamblePath);

    const tokens: string[] = [];
    const variantName = getCssVariableVariantName(meta);
    const resolvedVariantName = getResolvedCssVariableVariantName(variantName);

    const variableName = `${variablePreamble}spacing${resolvedVariantName}`;

    tokens.push(codegenCssVariables.set(variableName, spacing));

    return tokens;
});

export const spacingGenerator = defineGenerator<ResolvedThemeValueType<ResolvedTheme['spacing']>>({
    key: [/^spacing\.[^.]+$/, /.*\.spacing$/],
    type: GeneratorType.CssVariables,
    priority: GeneratorPriority.High,
    generate: createGenerateFn(generateSpacing)
});
