import {
    createFieldWithVariantsGenerateFn,
    createGenericDesignTokenVariantGenerateFn,
    defineGenerator
} from '../utils';
import { GeneratorType } from '../types';
import type { ResolvedTheme } from '../types';

export const generateAnimation = createGenericDesignTokenVariantGenerateFn({
    key: 'animation',
    aggregate: ['property', 'duration', 'timingFunction']
});

export const animationGenerator = defineGenerator<ResolvedTheme['transition']>({
    key: 'animation',
    type: GeneratorType.CssVariables,
    generate: createFieldWithVariantsGenerateFn(generateAnimation)
});
