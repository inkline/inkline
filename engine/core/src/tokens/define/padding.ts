import {
    NamespacedKey,
    TokenValue,
    Variable,
    DefinitionOptions,
    NamespaceType,
    NamespacedMap
} from '../../types';
import { PaddingProperty } from '../../types';
import { nsvariable, ref, set } from '../../tokens';
import { isSidesProperty } from '../../typeGuards';
import { resolveStringSidesPropertyValue, toExportedVariable } from '../../utils';

export type SourceMapPadding = TokenValue | PaddingProperty;

export type OutputMapPadding<Namespace extends NamespaceType> = NamespacedMap<
    Namespace,
    {
        paddingTop: Variable<NamespacedKey<Namespace, 'padding-top'>>;
        paddingRight: Variable<NamespacedKey<Namespace, 'padding-right'>>;
        paddingBottom: Variable<NamespacedKey<Namespace, 'padding-bottom'>>;
        paddingLeft: Variable<NamespacedKey<Namespace, 'padding-left'>>;
        padding: Variable<NamespacedKey<Namespace, 'padding'>>;
    }
>;

export function definePadding<Namespace extends NamespaceType>(
    ns: Namespace,
    value: SourceMapPadding,
    options: DefinitionOptions
): OutputMapPadding<Namespace> {
    const paddingTop = nsvariable(ns, 'padding-top', 0, options);
    const paddingRight = nsvariable(ns, 'padding-right', 0, options);
    const paddingBottom = nsvariable(ns, 'padding-bottom', 0, options);
    const paddingLeft = nsvariable(ns, 'padding-left', 0, options);
    const padding = nsvariable(
        ns,
        'padding',
        [ref(paddingTop), ref(paddingRight), ref(paddingBottom), ref(paddingLeft)],
        {
            ...options,
            register: options?.registerComposed ?? true
        }
    );

    if (isSidesProperty(value)) {
        if (value.top) set(paddingTop, value.top);
        if (value.right) set(paddingRight, value.right);
        if (value.bottom) set(paddingBottom, value.bottom);
        if (value.left) set(paddingLeft, value.left);
    } else if (typeof value === 'string') {
        const { top, right, bottom, left } = resolveStringSidesPropertyValue(value);
        if (top) set(paddingTop, top);
        if (right) set(paddingRight, right);
        if (bottom) set(paddingBottom, bottom);
        if (left) set(paddingLeft, left);
    } else {
        set(padding, value);
    }

    return {
        ...toExportedVariable(paddingTop),
        ...toExportedVariable(paddingRight),
        ...toExportedVariable(paddingBottom),
        ...toExportedVariable(paddingLeft),
        ...toExportedVariable(padding)
    } as OutputMapPadding<Namespace>;
}
