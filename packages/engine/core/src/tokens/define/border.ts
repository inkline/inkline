import {
    BorderProperty,
    BorderSidesProperty,
    VariablesOptions,
    NamespacedKey,
    NamespacedMap,
    NamespaceType,
    TokenValue,
    Variable
} from '../../types';
import { isBorderProperty, isSidesProperty } from '../../typeGuards';
import { resolveStringPropertyValue, toExportedVariable } from '../../utils';
import { nsvariable, set, valueOf } from '../variable';
import { ref } from '../ref';
import { color as createColor } from '../color';

export type SourceMapBorder = TokenValue | BorderProperty | BorderSidesProperty;

export type OutputMapBorder<Namespace extends NamespaceType> = NamespacedMap<
    Namespace,
    {
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
    }
>;

export function defineBorder<Namespace extends NamespaceType>(
    ns: Namespace,
    value: SourceMapBorder,
    options: VariablesOptions
): OutputMapBorder<Namespace> {
    const borderTopWidth = nsvariable(ns, 'border-top-width', 0, options);
    const borderTopStyle = nsvariable(ns, 'border-top-style', 'none', options);
    const borderTopColor = nsvariable(ns, 'border-top-color', 'currentColor', options);

    const borderRightWidth = nsvariable(ns, 'border-right-width', 0, options);
    const borderRightStyle = nsvariable(ns, 'border-right-style', 'none', options);
    const borderRightColor = nsvariable(ns, 'border-right-color', 'currentColor', options);

    const borderBottomWidth = nsvariable(ns, 'border-bottom-width', 0, options);
    const borderBottomStyle = nsvariable(ns, 'border-bottom-style', 'none', options);
    const borderBottomColor = nsvariable(ns, 'border-bottom-color', 'currentColor', options);

    const borderLeftWidth = nsvariable(ns, 'border-left-width', 0, options);
    const borderLeftStyle = nsvariable(ns, 'border-left-style', 'none', options);
    const borderLeftColor = nsvariable(ns, 'border-left-color', 'currentColor', options);

    const borderWidth = nsvariable(
        ns,
        'border-width',
        [ref(borderTopWidth), ref(borderRightWidth), ref(borderBottomWidth), ref(borderLeftWidth)],
        {
            ...options,
            register: options.registerComposed ?? true
        }
    );
    const borderStyle = nsvariable(
        ns,
        'border-style',
        [ref(borderTopStyle), ref(borderRightStyle), ref(borderBottomStyle), ref(borderLeftStyle)],
        {
            ...options,
            register: options.registerComposed ?? true
        }
    );
    const borderColor = nsvariable(
        ns,
        'border-color',
        [ref(borderTopColor), ref(borderRightColor), ref(borderBottomColor), ref(borderLeftColor)],
        {
            ...options,
            register: options.registerComposed ?? true
        }
    );
    const borderTop = nsvariable(
        ns,
        'border-top',
        [ref(borderTopWidth), ref(borderTopStyle), ref(borderTopColor)],
        {
            ...options,
            register: options.registerComposed ?? true
        }
    );
    const borderRight = nsvariable(
        ns,
        'border-right',
        [ref(borderRightWidth), ref(borderRightStyle), ref(borderRightColor)],
        {
            ...options,
            register: options.registerComposed ?? true
        }
    );
    const borderBottom = nsvariable(
        ns,
        'border-bottom',
        [ref(borderBottomWidth), ref(borderBottomStyle), ref(borderBottomColor)],
        {
            ...options,
            register: options.registerComposed ?? true
        }
    );
    const borderLeft = nsvariable(
        ns,
        'border-left',
        [ref(borderLeftWidth), ref(borderLeftStyle), ref(borderLeftColor)],
        {
            ...options,
            register: options.registerComposed ?? true
        }
    );
    const border = nsvariable(
        ns,
        'border',
        [ref(borderTopWidth), ref(borderTopStyle), ref(borderTopColor)],
        {
            ...options,
            register: options.registerComposed ?? true
        }
    );

    if (isBorderProperty(value)) {
        if (value.width) {
            set(borderTopWidth, value.width);
            set(borderRightWidth, value.width);
            set(borderBottomWidth, value.width);
            set(borderLeftWidth, value.width);
        }

        if (value.style) {
            set(borderTopStyle, value.style);
            set(borderRightStyle, value.style);
            set(borderBottomStyle, value.style);
            set(borderLeftStyle, value.style);
        }

        if (value.color) {
            const colorVariable = createColor('color', value.color, {
                ...options,
                register: false
            });

            set(borderTopColor, valueOf(colorVariable));
            set(borderRightColor, valueOf(colorVariable));
            set(borderBottomColor, valueOf(colorVariable));
            set(borderLeftColor, valueOf(colorVariable));
        }
    }

    if (typeof value === 'object') {
        if (isSidesProperty(value)) {
            if (isBorderProperty(value.top)) {
                if (value.top.width) set(borderTopWidth, value.top.width);
                if (value.top.style) set(borderTopStyle, value.top.style);
                if (value.top.color) {
                    const colorVariable = createColor('color', value.top.color, {
                        ...options,
                        register: false
                    });

                    set(borderTopColor, valueOf(colorVariable));
                }
            }

            if (isBorderProperty(value.right)) {
                if (value.right.width) set(borderRightWidth, value.right.width);
                if (value.right.style) set(borderRightStyle, value.right.style);
                if (value.right.color) {
                    const colorVariable = createColor('color', value.right.color, {
                        ...options,
                        register: false
                    });

                    set(borderRightColor, valueOf(colorVariable));
                }
            }

            if (isBorderProperty(value.bottom)) {
                if (value.bottom.width) set(borderBottomWidth, value.bottom.width);
                if (value.bottom.style) set(borderBottomStyle, value.bottom.style);
                if (value.bottom.color) {
                    const colorVariable = createColor('color', value.bottom.color, {
                        ...options,
                        register: false
                    });

                    set(borderBottomColor, valueOf(colorVariable));
                }
            }

            if (isBorderProperty(value.left)) {
                if (value.left.width) set(borderLeftWidth, value.left.width);
                if (value.left.style) set(borderLeftStyle, value.left.style);
                if (value.left.color) {
                    const colorVariable = createColor('color', value.left.color, {
                        ...options,
                        register: false
                    });

                    set(borderLeftColor, valueOf(colorVariable));
                }
            }
        }
    } else if (typeof value === 'string') {
        const { style, width, color } = resolveStringPropertyValue(value, [
            'width',
            'style',
            'color'
        ]);

        if (width) {
            set(borderTopWidth, width);
            set(borderRightWidth, width);
            set(borderBottomWidth, width);
            set(borderLeftWidth, width);
        }

        if (style) {
            set(borderTopStyle, style);
            set(borderRightStyle, style);
            set(borderBottomStyle, style);
            set(borderLeftStyle, style);
        }

        if (color) {
            const colorVariable = createColor('color', color, {
                ...options,
                register: false
            });

            set(borderTopColor, valueOf(colorVariable));
            set(borderRightColor, valueOf(colorVariable));
            set(borderBottomColor, valueOf(colorVariable));
            set(borderLeftColor, valueOf(colorVariable));
        }
    } else {
        set(border, value);
    }

    return {
        ...toExportedVariable(borderTopWidth),
        ...toExportedVariable(borderTopStyle),
        ...toExportedVariable(borderTopColor),
        ...toExportedVariable(borderRightWidth),
        ...toExportedVariable(borderRightStyle),
        ...toExportedVariable(borderRightColor),
        ...toExportedVariable(borderBottomWidth),
        ...toExportedVariable(borderBottomStyle),
        ...toExportedVariable(borderBottomColor),
        ...toExportedVariable(borderLeftWidth),
        ...toExportedVariable(borderLeftStyle),
        ...toExportedVariable(borderLeftColor),
        ...toExportedVariable(borderWidth),
        ...toExportedVariable(borderStyle),
        ...toExportedVariable(borderColor),
        ...toExportedVariable(borderTop),
        ...toExportedVariable(borderRight),
        ...toExportedVariable(borderBottom),
        ...toExportedVariable(borderLeft),
        ...toExportedVariable(border)
    } as OutputMapBorder<Namespace>;
}
