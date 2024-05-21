import {
    defineResolver,
    defineResolverValueFn,
    defineResolverVariantFn,
    createResolveFn
} from '../utils';
import {
    RawTheme,
    RawThemeTransition,
    RawThemeValueType,
    ResolvedTheme,
    ResolvedThemeTransition,
    ResolvedThemeValueType,
    Transition
} from '../types';

export const resolveTransition = defineResolverValueFn<RawThemeTransition, ResolvedThemeTransition>(
    (transition) => {
        let duration: Transition['duration'],
            timingFunction: Transition['timingFunction'],
            property: Transition['property'];

        if (typeof transition === 'string') {
            const transitionParts = transition.split(/\s+/);
            if (transitionParts.length === 2) {
                [duration, timingFunction] = transitionParts;
            } else {
                [property, duration, timingFunction] = transitionParts;
            }
        } else {
            ({ property, duration, timingFunction } = transition);
        }

        return { property, duration, timingFunction };
    }
);

export const resolveTransitionVariant = defineResolverVariantFn<
    RawThemeTransition,
    ResolvedThemeTransition
>(resolveTransition);

export const transitionResolver = defineResolver<
    RawThemeValueType<RawTheme['transition']>,
    ResolvedThemeValueType<ResolvedTheme['transition']>
>({
    key: [/^transition\.[^.]+$/, /.*\.transition$/],
    resolve: createResolveFn(resolveTransition, resolveTransitionVariant)
});
