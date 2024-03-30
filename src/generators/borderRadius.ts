import {
    codegenCssVariables,
    defineGenerator,
    defineGeneratorValueFn,
    createFieldWithVariantsGenerateFn,
    toKebabCase,
    getCssVariableNamePreamble,
    shouldGenerateAggregateValue,
    getResolvedPath
} from '../utils';
import {
    BorderRadiusCorner,
    GeneratorType,
    ResolvedTheme,
    ResolvedThemeBorderRadius
} from '../types';

export const generateBorderRadius = defineGeneratorValueFn<ResolvedThemeBorderRadius>(
    (borderRadius, meta) => {
        const path = getResolvedPath(meta);
        const variableNamePreamble = getCssVariableNamePreamble(path);
        const variantName = path[path.length - 1];
        const resolvedVariantName = variantName === 'default' ? '' : `-${variantName}`;
        const corners: BorderRadiusCorner[] = ['topLeft', 'topRight', 'bottomRight', 'bottomLeft'];

        const tokens: string[] = [];
        const cornerCssVariables: string[] = [];

        corners.forEach((corner) => {
            const resolvedCornerName = toKebabCase(corner);
            const cssVariableName = `${variableNamePreamble}border-${resolvedCornerName}-radius${resolvedVariantName}`;

            if (typeof borderRadius[corner] !== 'undefined') {
                tokens.push(codegenCssVariables.set(cssVariableName, borderRadius[corner]));
                cornerCssVariables.push(codegenCssVariables.get(cssVariableName));
            }
        });

        if (shouldGenerateAggregateValue(meta)) {
            tokens.push(
                codegenCssVariables.set(
                    `${variableNamePreamble}border-radius${resolvedVariantName}`,
                    cornerCssVariables.join(' ')
                )
            );
        }

        return tokens;
    }
);

export const borderRadiusGenerator = defineGenerator<ResolvedTheme['borderRadius']>({
    key: 'borderRadius',
    type: GeneratorType.CssVariables,
    generate: createFieldWithVariantsGenerateFn(generateBorderRadius)
});
