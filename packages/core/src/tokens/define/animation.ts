import { NamespacedKey, TokenValue, Variable, DefineOptions, NamespaceType } from '../../types';
import { AnimationProperty } from '../../types';
import { nsvariable, ref, set } from '../../tokens';
import { isAnimationProperty } from '../../typeGuards';
import { resolveStringPropertyValue, toExportedVariable } from '../../utils';

export type SourceMapAnimation = TokenValue | AnimationProperty;

export type OutputMapAnimation<Namespace extends NamespaceType> = {
    animationName: Variable<NamespacedKey<Namespace, 'animation-name'>>;
    animationDuration: Variable<NamespacedKey<Namespace, 'animation-duration'>>;
    animationIterationCount: Variable<NamespacedKey<Namespace, 'animation-iteration-count'>>;
    animationDirection: Variable<NamespacedKey<Namespace, 'animation-direction'>>;
    animation: Variable<NamespacedKey<Namespace, 'animation'>>;
};

export function defineAnimation<Namespace extends NamespaceType>(
    ns: Namespace,
    value: SourceMapAnimation,
    options?: DefineOptions
): OutputMapAnimation<Namespace> {
    const animationName = nsvariable(ns, 'animation-name', 'none', options);
    const animationDuration = nsvariable(ns, 'animation-duration', 0, options);
    const animationIterationCount = nsvariable(ns, 'animation-iteration-count', 1, options);
    const animationDirection = nsvariable(ns, 'animation-direction', 'normal', options);
    const animation = nsvariable(
        ns,
        'animation',
        [
            ref(animationName),
            ref(animationDuration),
            ref(animationIterationCount),
            ref(animationDirection)
        ],
        options
    );

    if (isAnimationProperty(value)) {
        if (value.name) set(animationName, value.name);
        if (value.duration) set(animationDuration, value.duration);
        if (value.iterationCount) set(animationIterationCount, value.iterationCount);
        if (value.direction) set(animationDirection, value.direction);
    } else if (typeof value === 'string') {
        const { name, duration, iterationCount, direction } = resolveStringPropertyValue(value, [
            'name',
            'duration',
            'iterationCount',
            'direction'
        ]);

        set(animationName, name);
        set(animationDuration, duration);
        set(animationIterationCount, iterationCount);
        set(animationDirection, direction);
    } else {
        set(animation, value);
    }

    return {
        ...toExportedVariable(animationName),
        ...toExportedVariable(animationDuration),
        ...toExportedVariable(animationIterationCount),
        ...toExportedVariable(animationDirection),
        ...toExportedVariable(animation)
    } as OutputMapAnimation<Namespace>;
}
