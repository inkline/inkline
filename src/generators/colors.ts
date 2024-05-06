import {
    codegenCssVariables,
    defineGenerator,
    defineGeneratorValueFn,
    createGenerateFn,
    getCssVariablePreamble,
    shouldGenerateAggregateValue,
    getResolvedCssVariableVariantName,
    getCssVariableVariantName,
    getCssVariablePreamblePath,
    getCssVariableName
} from '../utils';
import { GeneratorType, ResolvedTheme, ResolvedThemeColor, ResolvedThemeValueType } from '../types';

export const createColorGenerateFn = (variableName: string) => {
    return defineGeneratorValueFn<ResolvedThemeColor>((color, meta) => {
        if (typeof color === 'string') {
            return [codegenCssVariables.set(variableName, color)];
        }

        const tokens = [];
        const { h, s, l, a } = color;

        const resolvedH = typeof h === 'string' ? h : h.toString();
        const resolvedS = typeof s === 'string' ? s : `${s}%`;
        const resolvedL = typeof l === 'string' ? l : `${l}%`;
        const resolvedA = typeof a === 'string' ? a : a.toString();

        tokens.push(codegenCssVariables.set(`${variableName}--h`, resolvedH));
        tokens.push(codegenCssVariables.set(`${variableName}--s`, resolvedS));
        tokens.push(codegenCssVariables.set(`${variableName}--l`, resolvedL));
        tokens.push(codegenCssVariables.set(`${variableName}--a`, resolvedA));

        if (shouldGenerateAggregateValue(meta)) {
            tokens.push(
                codegenCssVariables.set(
                    `${variableName}`,
                    `hsla(${[
                        codegenCssVariables.get(`${variableName}--h`),
                        codegenCssVariables.get(`${variableName}--s`),
                        codegenCssVariables.get(`${variableName}--l`)
                    ].join(' ')} / ${codegenCssVariables.get(`${variableName}--a`)})`
                )
            );
        }

        return tokens;
    });
};

export const colorsGenerator = defineGenerator<
    ResolvedThemeValueType<ResolvedTheme['colors'][string]>
>({
    key: [/^colors\.[^.]+\.[^.]+$/],
    type: GeneratorType.CssVariables,
    generate: createGenerateFn((value, meta) => {
        const variablePath = meta.path.slice(-2).filter((part) => part !== 'default');

        return createColorGenerateFn(`color-${variablePath.join('-')}`)(value, meta);
    })
});

export const colorGenerator = defineGenerator<
    ResolvedThemeValueType<ResolvedTheme['colors'][string]>
>({
    key: [/.*\.color$/, /.*\.background$/],
    ignore: [/^typography\.[^.]+$/, /border\..*/, /boxShadow\..*/],
    type: GeneratorType.CssVariables,
    generate: createGenerateFn((value, meta) => {
        const variablePreamblePath = getCssVariablePreamblePath(meta);
        const variablePreamble = getCssVariablePreamble(variablePreamblePath);
        const variableName = getCssVariableName(meta);
        const variantName = getCssVariableVariantName(meta);
        const resolvedVariantName = getResolvedCssVariableVariantName(variantName);

        return createColorGenerateFn(`${variablePreamble}${variableName}${resolvedVariantName}`)(
            value,
            meta
        );
    })
});
