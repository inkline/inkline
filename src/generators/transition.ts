import {
    defineGenerator,
    createFieldWithVariantsGenerateFn,
    createGenericDesignTokenVariantGenerateFn
} from '../utils';
import type { ResolvedTheme } from '../types';
import { GeneratorType } from '../types';

export const generateTransition = createGenericDesignTokenVariantGenerateFn({
    key: 'animation',
    aggregate: ['property', 'duration', 'timingFunction']
});

export const transitionGenerator = defineGenerator<ResolvedTheme['transition']>({
    key: 'transition',
    type: GeneratorType.CssVariables,
    generate: createFieldWithVariantsGenerateFn(generateTransition)
});
