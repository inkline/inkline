import {
    defineGenerator,
    createGenerateFn,
    createGenericDesignTokenVariantGenerateFn
} from '../utils';
import type { ResolvedTheme, ResolvedThemeValueType } from '../types';
import { GeneratorType } from '../types';

export const generateTransition = createGenericDesignTokenVariantGenerateFn({
    aggregate: ['property', 'duration', 'timingFunction']
});

export const transitionGenerator = defineGenerator<
    ResolvedThemeValueType<ResolvedTheme['transition']>
>({
    key: [/^transition\.[^.]+$/, /.*\.transition$/],
    type: GeneratorType.CssVariables,
    generate: createGenerateFn(generateTransition)
});
