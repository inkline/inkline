import type { RawTheme, RawThemeValueType, ResolvedTheme, ResolvedThemeValueType } from '../types';
import { createResolveFn, defineResolver } from '../utils';
import { resolveTransition, resolveTransitionVariant } from './transition';

export const animationResolver = defineResolver<
    RawThemeValueType<RawTheme['transition']>,
    ResolvedThemeValueType<ResolvedTheme['transition']>
>({
    key: [/^animation\.[^.]+$/, /.*\.animation$/],
    resolve: createResolveFn(resolveTransition, resolveTransitionVariant)
});
