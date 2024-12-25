import {
    NamespacedKey,
    TokenValue,
    Variable,
    DefineOptions,
    NamespaceType,
    NamespacedMap
} from '../../types';
import { MarginProperty } from '../../types';
import { isSidesProperty } from '../../typeGuards';
import { resolveStringSidesPropertyValue, toExportedVariable } from '../../utils';
import { nsvariable, set } from '../variable';
import { ref } from '../ref';

export type SourceMapMargin = TokenValue | MarginProperty;

export type OutputMapMargin<Namespace extends NamespaceType> = NamespacedMap<
    Namespace,
    {
        marginTop: Variable<NamespacedKey<Namespace, 'margin-top'>>;
        marginRight: Variable<NamespacedKey<Namespace, 'margin-right'>>;
        marginBottom: Variable<NamespacedKey<Namespace, 'margin-bottom'>>;
        marginLeft: Variable<NamespacedKey<Namespace, 'margin-left'>>;
        margin: Variable<NamespacedKey<Namespace, 'margin'>>;
    }
>;

export function defineMargin<Namespace extends NamespaceType>(
    ns: Namespace,
    value: SourceMapMargin,
    options?: DefineOptions
): OutputMapMargin<Namespace> {
    const marginTop = nsvariable(ns, 'margin-top', 0, options);
    const marginRight = nsvariable(ns, 'margin-right', 0, options);
    const marginBottom = nsvariable(ns, 'margin-bottom', 0, options);
    const marginLeft = nsvariable(ns, 'margin-left', 0, options);
    const margin = nsvariable(
        ns,
        'margin',
        [ref(marginTop), ref(marginRight), ref(marginBottom), ref(marginLeft)],
        {
            ...options,
            register: options?.registerComposed ?? true
        }
    );

    if (isSidesProperty(value)) {
        if (value.top) set(marginTop, value.top);
        if (value.right) set(marginRight, value.right);
        if (value.bottom) set(marginBottom, value.bottom);
        if (value.left) set(marginLeft, value.left);
    } else if (typeof value === 'string') {
        const { top, right, bottom, left } = resolveStringSidesPropertyValue(value);

        if (top) set(marginTop, top);
        if (right) set(marginRight, right);
        if (bottom) set(marginBottom, bottom);
        if (left) set(marginLeft, left);
    } else {
        set(margin, value);
    }

    return {
        ...toExportedVariable(marginTop),
        ...toExportedVariable(marginRight),
        ...toExportedVariable(marginBottom),
        ...toExportedVariable(marginLeft),
        ...toExportedVariable(margin)
    } as OutputMapMargin<Namespace>;
}
