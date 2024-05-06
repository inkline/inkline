import {
    defineGenerator,
    createGenerateFn,
    createGenericDesignTokenVariantGenerateFn
} from '../utils';
import { GeneratorType, ResolvedTheme, ResolvedThemeValueType } from '../types';

export const generateBoxShadow = createGenericDesignTokenVariantGenerateFn({
    aggregate: ['offsetX', 'offsetY', 'blurRadius', 'spreadRadius', 'color']
});

export const boxShadowGenerator = defineGenerator<
    ResolvedThemeValueType<ResolvedTheme['boxShadow']>
>({
    key: [/^boxShadow\.[^.]+$/, /.*\.boxShadow$/],
    type: GeneratorType.CssVariables,
    generate: createGenerateFn(generateBoxShadow)
});
