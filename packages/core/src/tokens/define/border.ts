import {
    BorderProperty,
    BorderSidesProperty,
    DefineOptions,
    NamespacedKey,
    NamespaceType,
    TokenValue,
    Variable
} from '../../types';
import { nsvariable, ref, set } from '../../tokens';
import { isBorderProperty, isSidesProperty } from '../../typeGuards';
import { resolveStringPropertyValue, toExportedVariable } from '../../utils';

export type SourceMapBorder = TokenValue | BorderProperty | BorderSidesProperty;

export type OutputMapBorder<Namespace extends NamespaceType> = {
    borderTopColor: Variable<NamespacedKey<Namespace, 'border-top-color'>>;
    borderTopStyle: Variable<NamespacedKey<Namespace, 'border-top-style'>>;
    borderTopWidth: Variable<NamespacedKey<Namespace, 'border-top-width'>>;
    borderRightColor: Variable<NamespacedKey<Namespace, 'border-right-color'>>;
    borderRightStyle: Variable<NamespacedKey<Namespace, 'border-right-style'>>;
    borderRightWidth: Variable<NamespacedKey<Namespace, 'border-right-width'>>;
    borderBottomColor: Variable<NamespacedKey<Namespace, 'border-bottom-color'>>;
    borderBottomStyle: Variable<NamespacedKey<Namespace, 'border-bottom-style'>>;
    borderBottomWidth: Variable<NamespacedKey<Namespace, 'border-bottom-width'>>;
    borderLeftColor: Variable<NamespacedKey<Namespace, 'border-left-color'>>;
    borderLeftStyle: Variable<NamespacedKey<Namespace, 'border-left-style'>>;
    borderLeftWidth: Variable<NamespacedKey<Namespace, 'border-left-width'>>;
    borderColor: Variable<NamespacedKey<Namespace, 'border-color'>>;
    borderStyle: Variable<NamespacedKey<Namespace, 'border-style'>>;
    borderWidth: Variable<NamespacedKey<Namespace, 'border-width'>>;
    borderTop: Variable<NamespacedKey<Namespace, 'border-top'>>;
    borderRight: Variable<NamespacedKey<Namespace, 'border-right'>>;
    borderBottom: Variable<NamespacedKey<Namespace, 'border-bottom'>>;
    borderLeft: Variable<NamespacedKey<Namespace, 'border-left'>>;
    border: Variable<NamespacedKey<Namespace, 'border'>>;
};

export function defineBorder<Namespace extends NamespaceType>(
    ns: Namespace,
    value: SourceMapBorder,
    options?: DefineOptions
): OutputMapBorder<Namespace> {
    const borderTopColor = nsvariable(ns, 'border-top-color', 'inherit', options);
    const borderTopStyle = nsvariable(ns, 'border-top-style', 'none', options);
    const borderTopWidth = nsvariable(ns, 'border-top-width', 0, options);
    const borderRightColor = nsvariable(ns, 'border-right-color', 'inherit', options);
    const borderRightStyle = nsvariable(ns, 'border-right-style', 'none', options);
    const borderRightWidth = nsvariable(ns, 'border-right-width', 0, options);
    const borderBottomColor = nsvariable(ns, 'border-bottom-color', 'inherit', options);
    const borderBottomStyle = nsvariable(ns, 'border-bottom-style', 'none', options);
    const borderBottomWidth = nsvariable(ns, 'border-bottom-width', 0, options);
    const borderLeftColor = nsvariable(ns, 'border-left-color', 'inherit', options);
    const borderLeftStyle = nsvariable(ns, 'border-left-style', 'none', options);
    const borderLeftWidth = nsvariable(ns, 'border-left-width', 0, options);
    const borderColor = nsvariable(ns, 'border-color', ref(borderTopColor), options);
    const borderStyle = nsvariable(ns, 'border-style', ref(borderTopStyle), options);
    const borderWidth = nsvariable(ns, 'border-width', ref(borderTopWidth), options);
    const borderTop = nsvariable(
        ns,
        'border-top',
        [ref(borderTopColor), ref(borderTopStyle), ref(borderTopWidth)],
        options
    );
    const borderRight = nsvariable(
        ns,
        'border-right',
        [ref(borderRightColor), ref(borderRightStyle), ref(borderRightWidth)],
        options
    );
    const borderBottom = nsvariable(
        ns,
        'border-bottom',
        [ref(borderBottomColor), ref(borderBottomStyle), ref(borderBottomWidth)],
        options
    );
    const borderLeft = nsvariable(
        ns,
        'border-left',
        [ref(borderLeftColor), ref(borderLeftStyle), ref(borderLeftWidth)],
        options
    );
    const border = nsvariable(
        ns,
        'border',
        [ref(borderTopColor), ref(borderTopStyle), ref(borderTopWidth)],
        options
    );

    if (isBorderProperty(value)) {
        if (value.color) {
            set(borderTopColor, value.color);
            set(borderRightColor, value.color);
            set(borderBottomColor, value.color);
            set(borderLeftColor, value.color);
        }

        if (value.style) {
            set(borderTopStyle, value.style);
            set(borderRightStyle, value.style);
            set(borderBottomStyle, value.style);
            set(borderLeftStyle, value.style);
        }

        if (value.width) {
            set(borderTopWidth, value.width);
            set(borderRightWidth, value.width);
            set(borderBottomWidth, value.width);
            set(borderLeftWidth, value.width);
        }
    } else if (isSidesProperty(value)) {
        if (isBorderProperty(value.top)) {
            if (value.top.color) set(borderTopColor, value.top.color);
            if (value.top.style) set(borderTopStyle, value.top.style);
            if (value.top.width) set(borderTopWidth, value.top.width);
        }

        if (isBorderProperty(value.right)) {
            if (value.right.color) set(borderRightColor, value.right.color);
            if (value.right.style) set(borderRightStyle, value.right.style);
            if (value.right.width) set(borderRightWidth, value.right.width);
        }

        if (isBorderProperty(value.bottom)) {
            if (value.bottom.color) set(borderBottomColor, value.bottom.color);
            if (value.bottom.style) set(borderBottomStyle, value.bottom.style);
            if (value.bottom.width) set(borderBottomWidth, value.bottom.width);
        }

        if (isBorderProperty(value.left)) {
            if (value.left.color) set(borderLeftColor, value.left.color);
            if (value.left.style) set(borderLeftStyle, value.left.style);
            if (value.left.width) set(borderLeftWidth, value.left.width);
        }
    } else if (typeof value === 'string') {
        const { color, style, width } = resolveStringPropertyValue(value, [
            'color',
            'style',
            'width'
        ]);

        if (color) {
            set(borderTopColor, color);
            set(borderRightColor, color);
            set(borderBottomColor, color);
            set(borderLeftColor, color);
        }

        if (style) {
            set(borderTopStyle, style);
            set(borderRightStyle, style);
            set(borderBottomStyle, style);
            set(borderLeftStyle, style);
        }

        if (width) {
            set(borderTopWidth, width);
            set(borderRightWidth, width);
            set(borderBottomWidth, width);
            set(borderLeftWidth, width);
        }
    } else {
        set(border, value);
    }

    return {
        ...toExportedVariable(borderTopColor),
        ...toExportedVariable(borderTopStyle),
        ...toExportedVariable(borderTopWidth),
        ...toExportedVariable(borderRightColor),
        ...toExportedVariable(borderRightStyle),
        ...toExportedVariable(borderRightWidth),
        ...toExportedVariable(borderBottomColor),
        ...toExportedVariable(borderBottomStyle),
        ...toExportedVariable(borderBottomWidth),
        ...toExportedVariable(borderLeftColor),
        ...toExportedVariable(borderLeftStyle),
        ...toExportedVariable(borderLeftWidth),
        ...toExportedVariable(borderColor),
        ...toExportedVariable(borderStyle),
        ...toExportedVariable(borderWidth),
        ...toExportedVariable(borderTop),
        ...toExportedVariable(borderRight),
        ...toExportedVariable(borderBottom),
        ...toExportedVariable(borderLeft),
        ...toExportedVariable(border)
    } as OutputMapBorder<Namespace>;
}
