import {
    BorderProperty,
    BorderSidesProperty,
    DefinitionOptions,
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
import { addVariableToTheme } from '../addToTheme';

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
    options: DefinitionOptions
): OutputMapBorder<Namespace> {
    const registerComposed = options.registerComposed ?? true;

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
            register: false
        }
    );
    const borderStyle = nsvariable(
        ns,
        'border-style',
        [ref(borderTopStyle), ref(borderRightStyle), ref(borderBottomStyle), ref(borderLeftStyle)],
        {
            ...options,
            register: false
        }
    );
    const borderColor = nsvariable(
        ns,
        'border-color',
        [ref(borderTopColor), ref(borderRightColor), ref(borderBottomColor), ref(borderLeftColor)],
        {
            ...options,
            register: false
        }
    );
    const borderTop = nsvariable(
        ns,
        'border-top',
        [ref(borderTopWidth), ref(borderTopStyle), ref(borderTopColor)],
        {
            ...options,
            register: false
        }
    );
    const borderRight = nsvariable(
        ns,
        'border-right',
        [ref(borderRightWidth), ref(borderRightStyle), ref(borderRightColor)],
        {
            ...options,
            register: false
        }
    );
    const borderBottom = nsvariable(
        ns,
        'border-bottom',
        [ref(borderBottomWidth), ref(borderBottomStyle), ref(borderBottomColor)],
        {
            ...options,
            register: false
        }
    );
    const borderLeft = nsvariable(
        ns,
        'border-left',
        [ref(borderLeftWidth), ref(borderLeftStyle), ref(borderLeftColor)],
        {
            ...options,
            register: false
        }
    );
    const border = nsvariable(
        ns,
        'border',
        [ref(borderTopWidth), ref(borderTopStyle), ref(borderTopColor)],
        {
            ...options,
            register: false
        }
    );

    if (isBorderProperty(value)) {
        if (value.width) {
            set(borderTopWidth, value.width);
            set(borderRightWidth, value.width);
            set(borderBottomWidth, value.width);
            set(borderLeftWidth, value.width);

            addVariableToTheme(borderTopWidth, options);
            addVariableToTheme(borderRightWidth, options);
            addVariableToTheme(borderBottomWidth, options);
            addVariableToTheme(borderLeftWidth, options);

            if (registerComposed) addVariableToTheme(borderWidth, options);
        }

        if (value.style) {
            set(borderTopStyle, value.style);
            set(borderRightStyle, value.style);
            set(borderBottomStyle, value.style);
            set(borderLeftStyle, value.style);

            addVariableToTheme(borderTopStyle, options);
            addVariableToTheme(borderRightStyle, options);
            addVariableToTheme(borderBottomStyle, options);
            addVariableToTheme(borderLeftStyle, options);

            if (registerComposed) addVariableToTheme(borderStyle, options);
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

            addVariableToTheme(borderTopColor, options);
            addVariableToTheme(borderRightColor, options);
            addVariableToTheme(borderBottomColor, options);
            addVariableToTheme(borderLeftColor, options);

            if (options.registerComposed) addVariableToTheme(borderColor, options);
        }
    }

    if (typeof value === 'object') {
        if (isSidesProperty(value)) {
            if (isBorderProperty(value.top)) {
                if (value.top.width) {
                    set(borderTopWidth, value.top.width);

                    addVariableToTheme(borderTopWidth, options);
                }

                if (value.top.style) {
                    set(borderTopStyle, value.top.style);

                    addVariableToTheme(borderTopStyle, options);
                }

                if (value.top.color) {
                    const colorVariable = createColor('color', value.top.color, {
                        ...options,
                        register: false
                    });

                    set(borderTopColor, valueOf(colorVariable));

                    addVariableToTheme(borderTopColor, options);
                }

                if (registerComposed && value.top.width && value.top.style && value.top.color) {
                    addVariableToTheme(borderTop, options);
                }
            }

            if (isBorderProperty(value.right)) {
                if (value.right.width) {
                    set(borderRightWidth, value.right.width);

                    addVariableToTheme(borderRightWidth, options);
                }

                if (value.right.style) {
                    set(borderRightStyle, value.right.style);

                    addVariableToTheme(borderRightStyle, options);
                }

                if (value.right.color) {
                    const colorVariable = createColor('color', value.right.color, {
                        ...options,
                        register: false
                    });

                    set(borderRightColor, valueOf(colorVariable));

                    addVariableToTheme(borderRightColor, options);
                }

                if (
                    registerComposed &&
                    value.right.width &&
                    value.right.style &&
                    value.right.color
                ) {
                    addVariableToTheme(borderRight, options);
                }
            }

            if (isBorderProperty(value.bottom)) {
                if (value.bottom.width) {
                    set(borderBottomWidth, value.bottom.width);

                    addVariableToTheme(borderBottomWidth, options);
                }

                if (value.bottom.style) {
                    set(borderBottomStyle, value.bottom.style);

                    addVariableToTheme(borderBottomStyle, options);
                }

                if (value.bottom.color) {
                    const colorVariable = createColor('color', value.bottom.color, {
                        ...options,
                        register: false
                    });

                    set(borderBottomColor, valueOf(colorVariable));

                    addVariableToTheme(borderBottomColor, options);
                }

                if (
                    registerComposed &&
                    value.bottom.width &&
                    value.bottom.style &&
                    value.bottom.color
                ) {
                    addVariableToTheme(borderBottom, options);
                }
            }

            if (isBorderProperty(value.left)) {
                if (value.left.width) {
                    set(borderLeftWidth, value.left.width);

                    addVariableToTheme(borderLeftWidth, options);
                }

                if (value.left.style) {
                    set(borderLeftStyle, value.left.style);

                    addVariableToTheme(borderLeftStyle, options);
                }

                if (value.left.color) {
                    const colorVariable = createColor('color', value.left.color, {
                        ...options,
                        register: false
                    });

                    set(borderLeftColor, valueOf(colorVariable));

                    addVariableToTheme(borderLeftColor, options);
                }

                if (registerComposed && value.left.width && value.left.style && value.left.color) {
                    addVariableToTheme(borderLeft, options);
                }
            }

            if (registerComposed && (value.top || value.right || value.bottom || value.left)) {
                addVariableToTheme(border, options);
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

            addVariableToTheme(borderTopWidth, options);
            addVariableToTheme(borderRightWidth, options);
            addVariableToTheme(borderBottomWidth, options);
            addVariableToTheme(borderLeftWidth, options);

            if (registerComposed) addVariableToTheme(borderWidth, options);
        }

        if (style) {
            set(borderTopStyle, style);
            set(borderRightStyle, style);
            set(borderBottomStyle, style);
            set(borderLeftStyle, style);

            addVariableToTheme(borderTopStyle, options);
            addVariableToTheme(borderRightStyle, options);
            addVariableToTheme(borderBottomStyle, options);
            addVariableToTheme(borderLeftStyle, options);

            if (registerComposed) addVariableToTheme(borderStyle, options);
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

            addVariableToTheme(borderTopColor, options);
            addVariableToTheme(borderRightColor, options);
            addVariableToTheme(borderBottomColor, options);
            addVariableToTheme(borderLeftColor, options);

            if (registerComposed) addVariableToTheme(borderColor, options);
        }

        if (registerComposed && width && style && color) {
            addVariableToTheme(borderTop, options);
            addVariableToTheme(borderRight, options);
            addVariableToTheme(borderBottom, options);
            addVariableToTheme(borderLeft, options);
            addVariableToTheme(border, options);
        }
    } else {
        set(border, value);

        if (registerComposed) addVariableToTheme(border, options);
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
