import {
    createGenerateFn,
    createGenericDesignTokenVariantGenerateFn,
    defineGenerator
} from '../utils';
import { GeneratorType, ResolvedThemeValueType } from '../types';
import type { ResolvedTheme } from '../types';

export const generateAnimation = createGenericDesignTokenVariantGenerateFn({
    aggregate: ['property', 'duration', 'timingFunction']
});

export const animationGenerator = defineGenerator<
    ResolvedThemeValueType<ResolvedTheme['transition']>
>({
    key: [/^animation\.[^.]+$/, /.*\.animation$/],
    type: GeneratorType.CssVariables,
    generate: createGenerateFn(generateAnimation)
});
