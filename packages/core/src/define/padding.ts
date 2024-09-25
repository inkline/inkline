import {
    NamespacedKey,
    TokenValue,
    Variable,
    DefinitionOptions,
    NamespaceType
} from '../types';
import { PaddingProperty } from '../types';
import { nsvariable, ref, set } from '../tokens';
import { isSidesProperty } from '../typeGuards';
import { resolveStringSidesPropertyValue, toExportedVariable } from '../utils';

export type SourceMapPadding = TokenValue | PaddingProperty;

export type OutputMapPadding<Namespace extends NamespaceType> = {
    paddingTop: Variable<NamespacedKey<Namespace, 'padding-top'>>;
    paddingRight: Variable<NamespacedKey<Namespace, 'padding-right'>>;
    paddingBottom: Variable<NamespacedKey<Namespace, 'padding-bottom'>>;
    paddingLeft: Variable<NamespacedKey<Namespace, 'padding-left'>>;
    padding: Variable<NamespacedKey<Namespace, 'padding'>>;
};

export function definePadding<Namespace extends NamespaceType>(
    ns: Namespace,
    value: SourceMapPadding,
    options?: DefinitionOptions
): OutputMapPadding<Namespace> {
    const paddingTop = nsvariable(ns, 'padding-top', 0, options);
    const paddingRight = nsvariable(ns, 'padding-right', 0, options);
    const paddingBottom = nsvariable(ns, 'padding-bottom', 0, options);
    const paddingLeft = nsvariable(ns, 'padding-left', 0, options);
    const padding = nsvariable(
        ns,
        'padding',
        [ref(paddingTop), ref(paddingRight), ref(paddingBottom), ref(paddingLeft)],
        options
    );

    if (isSidesProperty(value)) {
        if (value.top) set(paddingTop, value.top);
        if (value.right) set(paddingRight, value.right);
        if (value.bottom) set(paddingBottom, value.bottom);
        if (value.left) set(paddingLeft, value.left);
    } else if (typeof value === 'string') {
        const { top, right, bottom, left } = resolveStringSidesPropertyValue(value);
        set(paddingTop, top);
        set(paddingRight, right);
        set(paddingBottom, bottom);
        set(paddingLeft, left);
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
