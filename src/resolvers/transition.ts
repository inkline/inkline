import {
    defineResolver,
    defineResolverValueFn,
    defineResolverVariantFn,
    createFieldWithOptionalVariantsResolveFn
} from '../utils';
import {
    RawTheme,
    RawThemeTransition,
    ResolvedTheme,
    ResolvedThemeTransition,
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
    RawTheme['transition'],
    ResolvedTheme['transition']
>({
    key: 'transition',
    resolve: createFieldWithOptionalVariantsResolveFn(resolveTransition, resolveTransitionVariant)
});
