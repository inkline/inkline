import {
    codegenCssVariables,
    createFieldWithVariantsGenerateFn,
    defineGenerator,
    defineGeneratorValueFn,
    getCssVariableNamePreamble,
    getResolvedPath,
    shouldGenerateAggregateValue,
    toUnitValue
} from '../utils';
import {
    GeneratorPriority,
    GeneratorType,
    ResolvedThemeSpacingWithSides,
    ResolvedTheme,
    ResolvedThemeSpacing,
    SpacingSide,
    ResolvedThemeMargin,
    ResolvedThemePadding
} from '../types';

/**
 * Spacing with Sides
 */

const generateSpacingWithSides = (property: string) =>
    defineGeneratorValueFn<ResolvedThemeSpacingWithSides>((spacing, meta) => {
        const path = getResolvedPath(meta);
        const tokens: string[] = [];
        const variableNamePreamble = getCssVariableNamePreamble(path);
        const variantName = path[path.length - 1];
        const resolvedVariantName = variantName === 'default' ? '' : `-${variantName}`;
        const sides: SpacingSide[] = ['top', 'right', 'bottom', 'left'];

        sides.forEach((side) => {
            const variableValue = toUnitValue(spacing[side]);
            const variableName = `${variableNamePreamble}${property}-${side}${resolvedVariantName}`;

            if (typeof spacing[side] !== 'undefined') {
                tokens.push(codegenCssVariables.set(variableName, variableValue));
            }
        });

        if (shouldGenerateAggregateValue(meta)) {
            tokens.push(
                codegenCssVariables.set(
                    `${variableNamePreamble}${property}${resolvedVariantName}`,
                    sides
                        .map((side) =>
                            codegenCssVariables.get(
                                `${variableNamePreamble}${property}-${side}${resolvedVariantName}`
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

export const marginGenerator = defineGenerator<ResolvedTheme['margin']>({
    key: 'margin',
    type: GeneratorType.CssVariables,
    priority: GeneratorPriority.Medium,
    generate: createFieldWithVariantsGenerateFn(generateMargin)
});

/**
 * Padding
 */

export const generatePadding = defineGeneratorValueFn<ResolvedThemePadding>(
    generateSpacingWithSides('padding')
);

export const paddingGenerator = defineGenerator<ResolvedTheme['padding']>({
    key: 'padding',
    type: GeneratorType.CssVariables,
    priority: GeneratorPriority.Medium,
    generate: createFieldWithVariantsGenerateFn(generatePadding)
});

/**
 * Spacing
 */

export const generateSpacing = defineGeneratorValueFn<ResolvedThemeSpacing>((spacing, meta) => {
    const path = getResolvedPath(meta);
    const preamble = getCssVariableNamePreamble(path);

    const tokens: string[] = [];
    const variantName = path[path.length - 1];
    const resolvedVariantName = variantName === 'default' ? '' : `-${variantName}`;

    const variableName = `${preamble}spacing${resolvedVariantName}`;

    tokens.push(codegenCssVariables.set(variableName, spacing));

    return tokens;
});

export const spacingGenerator = defineGenerator<ResolvedTheme['spacing']>({
    key: 'spacing',
    type: GeneratorType.CssVariables,
    priority: GeneratorPriority.High,
    generate: createFieldWithVariantsGenerateFn(generateSpacing)
});
