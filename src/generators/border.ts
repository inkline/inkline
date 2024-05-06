import {
    codegenCssVariables,
    defineGenerator,
    defineGeneratorValueFn,
    createGenerateFn,
    getCssVariablePreamble,
    shouldGenerateAggregateValue,
    getResolvedPath,
    getCssVariableVariantName,
    getResolvedCssVariableVariantName,
    getCssVariablePreamblePath
} from '../utils';
import {
    BorderSide,
    GeneratorType,
    ResolvedTheme,
    ResolvedThemeBorder,
    ResolvedThemeValueType
} from '../types';

export const generateBorder = defineGeneratorValueFn<ResolvedThemeBorder>((border, meta) => {
    const variablePreamblePath = getCssVariablePreamblePath(meta);
    const variablePreamble = getCssVariablePreamble(variablePreamblePath);
    const variantName = getCssVariableVariantName(meta);
    const resolvedVariantName = getResolvedCssVariableVariantName(variantName);
    const sides: BorderSide[] = ['top', 'right', 'bottom', 'left'];

    const tokens: string[] = [];
    sides.forEach((side) => {
        if (!border[side]) {
            return;
        }

        const { width, style, color } = border[side];

        const widthCssVariableName = `${variablePreamble}border-${side}-width${resolvedVariantName}`;
        if (typeof width !== 'undefined') {
            tokens.push(codegenCssVariables.set(widthCssVariableName, width));
        }

        const styleCssVariableName = `${variablePreamble}border-${side}-style${resolvedVariantName}`;
        if (typeof style !== 'undefined') {
            tokens.push(codegenCssVariables.set(styleCssVariableName, style));
        }

        const colorCssVariableName = `${variablePreamble}border-${side}-color${resolvedVariantName}`;
        if (typeof color !== 'undefined') {
            tokens.push(codegenCssVariables.set(colorCssVariableName, color));
        }

        if (shouldGenerateAggregateValue(meta)) {
            tokens.push(
                codegenCssVariables.set(
                    `${variablePreamble}border-${side}${resolvedVariantName}`,
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
                    `${variablePreamble}border-${property}${resolvedVariantName}`,
                    sides
                        .map((side) =>
                            codegenCssVariables.get(
                                `${variablePreamble}border-${side}-${property}${resolvedVariantName}`
                            )
                        )
                        .join(' ')
                )
            );
        });

        if (!variablePreamble) {
            tokens.push(
                codegenCssVariables.set(
                    `${variablePreamble}border${resolvedVariantName}`,
                    `var(--${variablePreamble}border-top${resolvedVariantName})`
                )
            );
        }
    }

    return tokens;
});

export const borderGenerator = defineGenerator<ResolvedThemeValueType<ResolvedTheme['border']>>({
    key: [/^border\.[^.]+$/, /.*\.border$/],
    type: GeneratorType.CssVariables,
    generate: createGenerateFn(generateBorder)
});
