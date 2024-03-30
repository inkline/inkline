import {
    codegenCssVariables,
    defineGenerator,
    defineGeneratorValueFn,
    createMultipleFieldsWithVariantsGenerateFn,
    createFieldWithVariantsGenerateFn,
    getCssVariableNamePreamble,
    shouldGenerateAggregateValue,
    getResolvedPath,
    toKebabCase
} from '../utils';
import { GeneratorType, ResolvedTheme, ResolvedThemeColor } from '../types';

export const generateColor = defineGeneratorValueFn<ResolvedThemeColor>((color, meta) => {
    const path = getResolvedPath(meta);
    const variableNamePreamble = getCssVariableNamePreamble(path).replace(/colors?--/, 'color-');
    const variantName = toKebabCase(path[path.length - 1]);
    const colorName = toKebabCase(path[path.length - 2]);

    const tokens = [];
    const { h, s, l, a } = color;

    const resolvedVariantName = variantName === 'default' ? '' : `-${variantName}`;
    const resolvedH = typeof h === 'string' ? h : h.toString();
    const resolvedS = typeof s === 'string' ? s : `${s}%`;
    const resolvedL = typeof l === 'string' ? l : `${l}%`;
    const resolvedA = typeof a === 'string' ? a : a.toString();

    const cssVariableNameBase = `${variableNamePreamble}${colorName}${resolvedVariantName}`;

    tokens.push(codegenCssVariables.set(`${cssVariableNameBase}--h`, resolvedH));
    tokens.push(codegenCssVariables.set(`${cssVariableNameBase}--s`, resolvedS));
    tokens.push(codegenCssVariables.set(`${cssVariableNameBase}--l`, resolvedL));
    tokens.push(codegenCssVariables.set(`${cssVariableNameBase}--a`, resolvedA));

    if (shouldGenerateAggregateValue(meta)) {
        tokens.push(
            codegenCssVariables.set(
                `${cssVariableNameBase}`,
                `hsla(${[
                    codegenCssVariables.get(`${cssVariableNameBase}--h`),
                    codegenCssVariables.get(`${cssVariableNameBase}--s`),
                    codegenCssVariables.get(`${cssVariableNameBase}--l`)
                ].join(' ')} / ${codegenCssVariables.get(`${cssVariableNameBase}--a`)})`
            )
        );
    }

    return tokens;
});

export const colorsGenerator = defineGenerator<ResolvedTheme['colors']>({
    key: 'colors',
    type: GeneratorType.CssVariables,
    generate: createMultipleFieldsWithVariantsGenerateFn(generateColor)
});

export const colorGenerator = defineGenerator<ResolvedTheme['colors'][string]>({
    key: 'color',
    type: GeneratorType.CssVariables,
    generate: createFieldWithVariantsGenerateFn(generateColor)
});

export const backgroundGenerator = defineGenerator<ResolvedTheme['colors'][string]>({
    key: 'background',
    type: GeneratorType.CssVariables,
    generate: createFieldWithVariantsGenerateFn(generateColor)
});
