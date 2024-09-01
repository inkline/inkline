import {
    NamespacedKey,
    NamespacedMap,
    TokenValue,
    Variable,
    DefinitionOptions,
    NamespaceType
} from '../types';
import { TransitionProperty } from '../types';
import { nsvariable, ref, set } from '../tokens';
import { isTransitionProperty } from '../typeGuards';
import { resolveStringPropertyValue, toExportedVariable } from '../utils';

export type SourceMapTransition = TokenValue | TransitionProperty;

export type OutputMapTransition<Namespace extends NamespaceType> = {
    transitionDuration: Variable<NamespacedKey<Namespace, 'transition-duration'>>;
    transitionProperty: Variable<NamespacedKey<Namespace, 'transition-property'>>;
    transitionTimingFunction: Variable<NamespacedKey<Namespace, 'transition-timing-function'>>;
    transition: Variable<NamespacedKey<Namespace, 'transition'>>;
};

export function defineTransition<Namespace extends NamespaceType>(
    ns: Namespace,
    value: SourceMapTransition,
    options?: DefinitionOptions
): OutputMapTransition<Namespace> {
    const transitionDuration = nsvariable(ns, 'transition-duration', 0, options);
    const transitionProperty = nsvariable(ns, 'transition-property', 'none', options);
    const transitionTimingFunction = nsvariable(ns, 'transition-timing-function', 'ease', options);
    const transition = nsvariable(
        ns,
        'transition',
        [ref(transitionDuration), ref(transitionProperty), ref(transitionTimingFunction)],
        options
    );

    if (isTransitionProperty(value)) {
        if (value.duration) set(transitionDuration, value.duration);
        if (value.property) set(transitionProperty, value.property);
        if (value.timingFunction) set(transitionTimingFunction, value.timingFunction);
    } else if (typeof value === 'string') {
        const { duration, property, timingFunction } = resolveStringPropertyValue(value, [
            'duration',
            'property',
            'timingFunction'
        ]);

        set(transitionDuration, duration);
        set(transitionProperty, property);
        set(transitionTimingFunction, timingFunction);
    } else {
        set(transition, value);
    }

    return {
        ...toExportedVariable(transitionDuration),
        ...toExportedVariable(transitionProperty),
        ...toExportedVariable(transitionTimingFunction),
        ...toExportedVariable(transition)
    } as OutputMapTransition<Namespace>;
}
