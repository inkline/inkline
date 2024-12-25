import {
    NamespacedKey,
    TokenValue,
    Variable,
    DefineOptions,
    NamespaceType,
    NamespacedMap
} from '../../types';
import { TransitionProperty } from '../../types';
import { nsvariable, ref, set } from '../../tokens';
import { isTransitionProperty } from '../../typeGuards';
import { resolveStringPropertyValue, toExportedVariable } from '../../utils';

export type SourceMapTransition = TokenValue | TransitionProperty;

export type OutputMapTransition<Namespace extends NamespaceType> = NamespacedMap<
    Namespace,
    {
        transitionDuration: Variable<NamespacedKey<Namespace, 'transition-duration'>>;
        transitionProperty: Variable<NamespacedKey<Namespace, 'transition-property'>>;
        transitionTimingFunction: Variable<NamespacedKey<Namespace, 'transition-timing-function'>>;
        transition: Variable<NamespacedKey<Namespace, 'transition'>>;
    }
>;

export function defineTransition<Namespace extends NamespaceType>(
    ns: Namespace,
    value: SourceMapTransition,
    options?: DefineOptions
): OutputMapTransition<Namespace> {
    const transitionProperty = nsvariable(ns, 'transition-property', 'none', options);
    const transitionDuration = nsvariable(ns, 'transition-duration', 0, options);
    const transitionTimingFunction = nsvariable(ns, 'transition-timing-function', 'ease', options);
    const transition = nsvariable(
        ns,
        'transition',
        [ref(transitionProperty), ref(transitionDuration), ref(transitionTimingFunction)],
        {
            ...options,
            register: options?.registerComposed ?? true
        }
    );

    if (isTransitionProperty(value)) {
        if (value.property) set(transitionProperty, value.property);
        if (value.duration) set(transitionDuration, value.duration);
        if (value.timingFunction) set(transitionTimingFunction, value.timingFunction);
    } else if (typeof value === 'string') {
        const { property, duration, timingFunction } = resolveStringPropertyValue(value, [
            'property',
            'duration',
            'timingFunction'
        ]);

        if (property) set(transitionProperty, property);
        if (duration) set(transitionDuration, duration);
        if (timingFunction) set(transitionTimingFunction, timingFunction);
    } else {
        set(transition, value);
    }

    return {
        ...toExportedVariable(transitionProperty),
        ...toExportedVariable(transitionDuration),
        ...toExportedVariable(transitionTimingFunction),
        ...toExportedVariable(transition)
    } as OutputMapTransition<Namespace>;
}
