import {
    NamespacedKey,
    TokenValue,
    Variable,
    DefinitionOptions,
    NamespaceType,
    NamespacedMap
} from '../../types';
import { BorderRadiusProperty } from '../../types';
import { isCornersProperty } from '../../typeGuards';
import { resolveStringCornersPropertyValue, toExportedVariable } from '../../utils';
import { nsvariable, set } from '../variable';
import { ref } from '../ref';

export type SourceMapBorderRadius = TokenValue | BorderRadiusProperty;

export type OutputMapBorderRadius<Namespace extends NamespaceType> = NamespacedMap<
    Namespace,
    {
        borderTopLeftRadius: Variable<NamespacedKey<Namespace, 'border-top-left-radius'>>;
        borderTopRightRadius: Variable<NamespacedKey<Namespace, 'border-top-right-radius'>>;
        borderBottomRightRadius: Variable<NamespacedKey<Namespace, 'border-bottom-right-radius'>>;
        borderBottomLeftRadius: Variable<NamespacedKey<Namespace, 'border-bottom-left-radius'>>;
        borderRadius: Variable<NamespacedKey<Namespace, 'border-radius'>>;
    }
>;

export function defineBorderRadius<Namespace extends NamespaceType>(
    ns: Namespace,
    value: SourceMapBorderRadius,
    options: DefinitionOptions
): OutputMapBorderRadius<Namespace> {
    const borderTopLeftRadius = nsvariable(ns, 'border-top-left-radius', 0, options);
    const borderTopRightRadius = nsvariable(ns, 'border-top-right-radius', 0, options);
    const borderBottomRightRadius = nsvariable(ns, 'border-bottom-right-radius', 0, options);
    const borderBottomLeftRadius = nsvariable(ns, 'border-bottom-left-radius', 0, options);
    const borderRadius = nsvariable(
        ns,
        'border-radius',
        [
            ref(borderTopLeftRadius),
            ref(borderTopRightRadius),
            ref(borderBottomRightRadius),
            ref(borderBottomLeftRadius)
        ],
        {
            ...options,
            register: options.registerComposed ?? true
        }
    );

    if (isCornersProperty(value)) {
        if (value.topLeft) set(borderTopLeftRadius, value.topLeft);
        if (value.topRight) set(borderTopRightRadius, value.topRight);
        if (value.bottomRight) set(borderBottomRightRadius, value.bottomRight);
        if (value.bottomLeft) set(borderBottomLeftRadius, value.bottomLeft);
    } else if (typeof value === 'string') {
        const { topLeft, topRight, bottomRight, bottomLeft } =
            resolveStringCornersPropertyValue(value);
        if (topLeft) set(borderTopLeftRadius, topLeft);
        if (topRight) set(borderTopRightRadius, topRight);
        if (bottomRight) set(borderBottomRightRadius, bottomRight);
        if (bottomLeft) set(borderBottomLeftRadius, bottomLeft);
    } else {
        set(borderRadius, value);
    }

    return {
        ...toExportedVariable(borderTopLeftRadius),
        ...toExportedVariable(borderTopRightRadius),
        ...toExportedVariable(borderBottomRightRadius),
        ...toExportedVariable(borderBottomLeftRadius),
        ...toExportedVariable(borderRadius)
    } as OutputMapBorderRadius<Namespace>;
}
