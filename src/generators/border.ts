import {
    codegenCssVariables,
    defineGenerator,
    defineGeneratorValueFn,
    createFieldWithVariantsGenerateFn,
    getCssVariableNamePreamble,
    shouldGenerateAggregateValue,
    getResolvedPath
} from '../utils';
import { BorderSide, GeneratorType, ResolvedTheme, ResolvedThemeBorder } from '../types';

export const generateBorder = defineGeneratorValueFn<ResolvedThemeBorder>((border, meta) => {
    const path = getResolvedPath(meta);
    const variableNamePreamble = getCssVariableNamePreamble(path);
    const variantName = path[path.length - 1];
    const resolvedVariantName = variantName === 'default' ? '' : `-${variantName}`;
    const sides: BorderSide[] = ['top', 'right', 'bottom', 'left'];

    const tokens: string[] = [];
    sides.forEach((side) => {
        if (!border[side]) {
            return;
        }

        const { width, style, color } = border[side];

        const widthCssVariableName = `${variableNamePreamble}border-${side}-width${resolvedVariantName}`;
        if (typeof width !== 'undefined') {
            tokens.push(codegenCssVariables.set(widthCssVariableName, width));
        }

        const styleCssVariableName = `${variableNamePreamble}border-${side}-style${resolvedVariantName}`;
        if (typeof style !== 'undefined') {
            tokens.push(codegenCssVariables.set(styleCssVariableName, style));
        }

        const colorCssVariableName = `${variableNamePreamble}border-${side}-color${resolvedVariantName}`;
        if (typeof color !== 'undefined') {
            tokens.push(codegenCssVariables.set(colorCssVariableName, color));
        }

        if (shouldGenerateAggregateValue(meta)) {
            tokens.push(
                codegenCssVariables.set(
                    `${variableNamePreamble}border-${side}${resolvedVariantName}`,
                    [
                        codegenCssVariables.get(widthCssVariableName),
                        codegenCssVariables.get(styleCssVariableName),
                        codegenCssVariables.get(colorCssVariableName)
                    ].join(' ')
                )
            );
        }
    });

    if (shouldGenerateAggregateValue(meta)) {
        ['width', 'style', 'color'].forEach((property) => {
            tokens.push(
                codegenCssVariables.set(
                    `${variableNamePreamble}border-${property}${resolvedVariantName}`,
                    sides
                        .map((side) =>
                            codegenCssVariables.get(
                                `${variableNamePreamble}border-${side}-${property}${resolvedVariantName}`
                            )
                        )
                        .join(' ')
                )
            );
        });

        if (!variableNamePreamble) {
            tokens.push(
                codegenCssVariables.set(
                    `${variableNamePreamble}border${resolvedVariantName}`,
                    `var(--${variableNamePreamble}border-top${resolvedVariantName})`
                )
            );
        }
    }

    return tokens;
});

export const borderGenerator = defineGenerator<ResolvedTheme['border']>({
    key: 'border',
    type: GeneratorType.CssVariables,
    generate: createFieldWithVariantsGenerateFn(generateBorder)
});
