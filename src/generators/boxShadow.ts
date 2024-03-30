import {
    defineGenerator,
    createFieldWithVariantsGenerateFn,
    createGenericDesignTokenVariantGenerateFn
} from '../utils';
import { GeneratorType, ResolvedTheme } from '../types';

export const generateBoxShadow = createGenericDesignTokenVariantGenerateFn({
    key: 'boxShadow',
    aggregate: ['offsetX', 'offsetY', 'blurRadius', 'spreadRadius', 'color']
});

export const boxShadowGenerator = defineGenerator<ResolvedTheme['boxShadow']>({
    key: 'boxShadow',
    type: GeneratorType.CssVariables,
    generate: createFieldWithVariantsGenerateFn(generateBoxShadow)
});
