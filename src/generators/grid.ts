import {
    codegenCssVariables,
    codegenScssVariables,
    createFieldWithVariantsGenerateFn,
    defineGenerator,
    getResolvedPath,
    toUnitValue
} from '../utils';
import { GeneratorPriority, GeneratorType, ResolvedTheme } from '../types';

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

export const gridContainerGenerator = defineGenerator<ResolvedTheme['grid']['container']>({
    key: 'grid.container',
    type: GeneratorType.CssVariables,
    generate: createFieldWithVariantsGenerateFn((value, meta) => {
        const path = getResolvedPath(meta);
        const variantName = path[path.length - 1];

        if (variantName === 'default') {
            return [];
        }

        const resolvedVariantName = `-${variantName}`;
        const variantValue = toUnitValue(value);

        return [codegenCssVariables.set(`container${resolvedVariantName}`, variantValue)];
    })
});

export const gridGutterGenerator = defineGenerator<ResolvedTheme['grid']['container']>({
    key: 'grid.gutter',
    type: GeneratorType.CssVariables,
    generate: createFieldWithVariantsGenerateFn((value, meta) => {
        const path = getResolvedPath(meta);
        const variantName = path[path.length - 1];
        const resolvedVariantName = variantName === 'default' ? '' : `-${variantName}`;
        const variantValue = toUnitValue(value);

        return [codegenCssVariables.set(`gutter${resolvedVariantName}`, variantValue)];
    })
});
