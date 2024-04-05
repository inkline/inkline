import type { RawTheme, ResolvedTheme } from '../types';
import { createFieldWithOptionalVariantsResolveFn, defineResolver } from '../utils';
import { resolveTransition, resolveTransitionVariant } from './transition';

export const animationResolver = defineResolver<
    RawTheme['transition'],
    ResolvedTheme['transition']
>({
    key: 'animation',
    resolve: createFieldWithOptionalVariantsResolveFn(resolveTransition, resolveTransitionVariant)
});
