import {
    codegenCssVariables,
    codegenScssVariables,
    createGenerateFn,
    defineGenerator,
    getResolvedPath,
    getResolvedCssVariableVariantName,
    getCssVariableVariantName,
    toUnitValue
} from '../utils';
import { GeneratorPriority, GeneratorType, ResolvedTheme, ResolvedThemeValueType } from '../types';

export const gridColumnsGenerator = defineGenerator<ResolvedTheme['grid']['columns']>({
    key: 'grid.columns',
    type: GeneratorType.CssVariables,
    generate: (columns, meta) => {
        return [codegenCssVariables.set('columns', `${columns}`)];
    }
});

export const gridColumnsMixinsGenerator = defineGenerator<ResolvedTheme['grid']['columns']>({
    key: 'grid.columns',
    type: GeneratorType.Mixins,
    priority: GeneratorPriority.Highest,
    generate: (columns, meta) => {
        return [codegenScssVariables.set('columns', columns)];
    }
});

export const gridContainerGenerator = defineGenerator<
    ResolvedThemeValueType<ResolvedTheme['grid']['container']>
>({
    key: /^grid\.container\.[^.]+$/,
    type: GeneratorType.CssVariables,
    generate: createGenerateFn((value, meta) => {
        const path = getResolvedPath(meta);
        const variantName = getCssVariableVariantName(meta);

        if (variantName === 'default') {
            return [];
        }

        const resolvedVariantName = `-${variantName}`;
        const variantValue = toUnitValue(value);

        return [codegenCssVariables.set(`container${resolvedVariantName}`, variantValue)];
    })
});

export const gridGutterGenerator = defineGenerator<
    ResolvedThemeValueType<ResolvedTheme['grid']['container']>
>({
    key: /^grid\.gutter\.[^.]+$/,
    type: GeneratorType.CssVariables,
    generate: createGenerateFn((value, meta) => {
        const variantName = getCssVariableVariantName(meta);
        const resolvedVariantName = getResolvedCssVariableVariantName(variantName);
        const variantValue = toUnitValue(value);

        return [codegenCssVariables.set(`gutter${resolvedVariantName}`, variantValue)];
    })
});
