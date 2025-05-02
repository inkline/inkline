import {
    NamespacedKey,
    TokenValue,
    Variable,
    DefinitionOptions,
    NamespaceType,
    NamespacedMap
} from '../../types';
import { AnimationProperty } from '../../types';
import { isAnimationProperty } from '../../typeGuards';
import { resolveStringPropertyValue, toExportedVariable } from '../../utils';
import { ref } from '../ref';
import { nsvariable, set } from '../variable';

export type SourceMapAnimation = TokenValue | AnimationProperty;

export type OutputMapAnimation<Namespace extends NamespaceType> = NamespacedMap<
    Namespace,
    {
        animationName: Variable<NamespacedKey<Namespace, 'animation-name'>>;
        animationFillMode: Variable<NamespacedKey<Namespace, 'animation-fill-mode'>>;
        animationDelay: Variable<NamespacedKey<Namespace, 'animation-delay'>>;
        animationPlayState: Variable<NamespacedKey<Namespace, 'animation-play-state'>>;
        animationDuration: Variable<NamespacedKey<Namespace, 'animation-duration'>>;
        animationIterationCount: Variable<NamespacedKey<Namespace, 'animation-iteration-count'>>;
        animationDirection: Variable<NamespacedKey<Namespace, 'animation-direction'>>;
        animationTimingFunction: Variable<NamespacedKey<Namespace, 'animation-timing-function'>>;
        animation: Variable<NamespacedKey<Namespace, 'animation'>>;
    }
>;

export function defineAnimation<Namespace extends NamespaceType>(
    ns: Namespace,
    value: SourceMapAnimation,
    options: DefinitionOptions
): OutputMapAnimation<Namespace> {
    const animationName = nsvariable(ns, 'animation-name', 'none', options);
    const animationFillMode = nsvariable(ns, 'animation-fill-mode', 'none', options);
    const animationPlayState = nsvariable(ns, 'animation-play-state', 'running', options);
    const animationDuration = nsvariable(ns, 'animation-duration', 0, options);
    const animationIterationCount = nsvariable(ns, 'animation-iteration-count', 1, options);
    const animationDirection = nsvariable(ns, 'animation-direction', 'normal', options);
    const animationDelay = nsvariable(ns, 'animation-delay', 0, options);
    const animationTimingFunction = nsvariable(ns, 'animation-timing-function', 'linear', options);
    const animation = nsvariable(
        ns,
        'animation',
        [
            ref(animationName),
            ref(animationDuration),
            ref(animationIterationCount),
            ref(animationDirection)
        ],
        {
            ...options,
            register: options.registerComposed ?? true
        }
    );

    if (isAnimationProperty(value)) {
        if (value.name) set(animationName, value.name);
        if (value.delay) set(animationDelay, value.delay);
        if (value.playState) set(animationPlayState, value.playState);
        if (value.fillMode) set(animationFillMode, value.fillMode);
        if (value.duration) set(animationDuration, value.duration);
        if (value.iterationCount) set(animationIterationCount, value.iterationCount);
        if (value.direction) set(animationDirection, value.direction);
        if (value.timingFunction) set(animationTimingFunction, value.timingFunction);
    } else if (typeof value === 'string') {
        const {
            duration,
            timingFunction,
            delay,
            iterationCount,
            direction,
            fillMode,
            playState,
            name
        } = resolveStringPropertyValue(value, [
            'duration',
            'timingFunction',
            'delay',
            'iterationCount',
            'direction',
            'fillMode',
            'playState',
            'name'
        ]);

        if (name) set(animationName, name);
        if (delay) set(animationDelay, delay);
        if (fillMode) set(animationFillMode, fillMode);
        if (duration) set(animationDuration, duration);
        if (iterationCount) set(animationIterationCount, iterationCount);
        if (direction) set(animationDirection, direction);
        if (playState) set(animationPlayState, playState);
        if (timingFunction) set(animationTimingFunction, timingFunction);
    } else {
        set(animation, value);
    }

    return {
        ...toExportedVariable(animationName),
        ...toExportedVariable(animationFillMode),
        ...toExportedVariable(animationPlayState),
        ...toExportedVariable(animationDelay),
        ...toExportedVariable(animationTimingFunction),
        ...toExportedVariable(animationDuration),
        ...toExportedVariable(animationIterationCount),
        ...toExportedVariable(animationDirection),
        ...toExportedVariable(animation)
    } as OutputMapAnimation<Namespace>;
}
