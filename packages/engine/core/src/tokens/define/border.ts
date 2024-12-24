import {
    BorderProperty,
    BorderSidesProperty,
    DefineOptions,
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
import { hsla, color as parseColor } from '../color';

export type SourceMapBorder = TokenValue | BorderProperty | BorderSidesProperty;

export type OutputMapBorder<Namespace extends NamespaceType> = NamespacedMap<
    Namespace,
    {
        borderTopColor: Variable<NamespacedKey<Namespace, 'border-top-color'>>;
        borderTopColorH: Variable<NamespacedKey<Namespace, 'border-top-color-h'>>;
        borderTopColorS: Variable<NamespacedKey<Namespace, 'border-top-color-s'>>;
        borderTopColorL: Variable<NamespacedKey<Namespace, 'border-top-color-l'>>;
        borderTopColorA: Variable<NamespacedKey<Namespace, 'border-top-color-a'>>;
        borderTopStyle: Variable<NamespacedKey<Namespace, 'border-top-style'>>;
        borderTopWidth: Variable<NamespacedKey<Namespace, 'border-top-width'>>;
        borderRightColor: Variable<NamespacedKey<Namespace, 'border-right-color'>>;
        borderRightColorH: Variable<NamespacedKey<Namespace, 'border-right-color-h'>>;
        borderRightColorS: Variable<NamespacedKey<Namespace, 'border-right-color-s'>>;
        borderRightColorL: Variable<NamespacedKey<Namespace, 'border-right-color-l'>>;
        borderRightColorA: Variable<NamespacedKey<Namespace, 'border-right-color-a'>>;
        borderRightStyle: Variable<NamespacedKey<Namespace, 'border-right-style'>>;
        borderRightWidth: Variable<NamespacedKey<Namespace, 'border-right-width'>>;
        borderBottomColor: Variable<NamespacedKey<Namespace, 'border-bottom-color'>>;
        borderBottomColorH: Variable<NamespacedKey<Namespace, 'border-bottom-color-h'>>;
        borderBottomColorS: Variable<NamespacedKey<Namespace, 'border-bottom-color-s'>>;
        borderBottomColorL: Variable<NamespacedKey<Namespace, 'border-bottom-color-l'>>;
        borderBottomColorA: Variable<NamespacedKey<Namespace, 'border-bottom-color-a'>>;
        borderBottomStyle: Variable<NamespacedKey<Namespace, 'border-bottom-style'>>;
        borderBottomWidth: Variable<NamespacedKey<Namespace, 'border-bottom-width'>>;
        borderLeftColor: Variable<NamespacedKey<Namespace, 'border-left-color'>>;
        borderLeftColorH: Variable<NamespacedKey<Namespace, 'border-left-color-h'>>;
        borderLeftColorS: Variable<NamespacedKey<Namespace, 'border-left-color-s'>>;
        borderLeftColorL: Variable<NamespacedKey<Namespace, 'border-left-color-l'>>;
        borderLeftColorA: Variable<NamespacedKey<Namespace, 'border-left-color-a'>>;
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
    options?: DefineOptions
): OutputMapBorder<Namespace> {
    const borderTopWidth = nsvariable(ns, 'border-top-width', 0, options);
    const borderTopStyle = nsvariable(ns, 'border-top-style', 'none', options);
    const borderTopColorH = nsvariable(ns, 'border-top-color-h', 'from currentColor h', options);
    const borderTopColorS = nsvariable(ns, 'border-top-color-s', 'from currentColor s', options);
    const borderTopColorL = nsvariable(ns, 'border-top-color-l', 'from currentColor l', options);
    const borderTopColorA = nsvariable(ns, 'border-top-color-a', 'from currentColor a', options);
    const borderTopColor = nsvariable(
        ns,
        'border-top-color',
        hsla([
            ref(borderTopColorH),
            ref(borderTopColorS),
            ref(borderTopColorL),
            ref(borderTopColorA)
        ]),
        {
            ...options,
            register: options?.registerComposed ?? true
        }
    );

    const borderRightWidth = nsvariable(ns, 'border-right-width', 0, options);
    const borderRightStyle = nsvariable(ns, 'border-right-style', 'none', options);
    const borderRightColorH = nsvariable(
        ns,
        'border-right-color-h',
        'from currentColor h',
        options
    );
    const borderRightColorS = nsvariable(
        ns,
        'border-right-color-s',
        'from currentColor s',
        options
    );
    const borderRightColorL = nsvariable(
        ns,
        'border-right-color-l',
        'from currentColor l',
        options
    );
    const borderRightColorA = nsvariable(
        ns,
        'border-right-color-a',
        'from currentColor a',
        options
    );
    const borderRightColor = nsvariable(
        ns,
        'border-right-color',
        hsla([
            ref(borderRightColorH),
            ref(borderRightColorS),
            ref(borderRightColorL),
            ref(borderRightColorA)
        ]),
        {
            ...options,
            register: options?.registerComposed ?? true
        }
    );

    const borderBottomWidth = nsvariable(ns, 'border-bottom-width', 0, options);
    const borderBottomStyle = nsvariable(ns, 'border-bottom-style', 'none', options);
    const borderBottomColorH = nsvariable(
        ns,
        'border-bottom-color-h',
        'from currentColor h',
        options
    );
    const borderBottomColorS = nsvariable(
        ns,
        'border-bottom-color-s',
        'from currentColor s',
        options
    );
    const borderBottomColorL = nsvariable(
        ns,
        'border-bottom-color-l',
        'from currentColor l',
        options
    );
    const borderBottomColorA = nsvariable(
        ns,
        'border-bottom-color-a',
        'from currentColor a',
        options
    );
    const borderBottomColor = nsvariable(
        ns,
        'border-bottom-color',
        hsla([
            ref(borderBottomColorH),
            ref(borderBottomColorS),
            ref(borderBottomColorL),
            ref(borderBottomColorA)
        ]),
        {
            ...options,
            register: options?.registerComposed ?? true
        }
    );

    const borderLeftWidth = nsvariable(ns, 'border-left-width', 0, options);
    const borderLeftStyle = nsvariable(ns, 'border-left-style', 'none', options);
    const borderLeftColorH = nsvariable(ns, 'border-left-color-h', 'from currentColor h', options);
    const borderLeftColorS = nsvariable(ns, 'border-left-color-s', 'from currentColor s', options);
    const borderLeftColorL = nsvariable(ns, 'border-left-color-l', 'from currentColor l', options);
    const borderLeftColorA = nsvariable(ns, 'border-left-color-a', 'from currentColor a', options);
    const borderLeftColor = nsvariable(
        ns,
        'border-left-color',
        hsla([
            ref(borderLeftColorH),
            ref(borderLeftColorS),
            ref(borderLeftColorL),
            ref(borderLeftColorA)
        ]),
        {
            ...options,
            register: options?.registerComposed ?? true
        }
    );

    const borderWidth = nsvariable(
        ns,
        'border-width',
        [ref(borderTopWidth), ref(borderRightWidth), ref(borderBottomWidth), ref(borderLeftWidth)],
        {
            ...options,
            register: options?.registerComposed ?? true
        }
    );
    const borderStyle = nsvariable(
        ns,
        'border-style',
        [ref(borderTopStyle), ref(borderRightStyle), ref(borderBottomStyle), ref(borderLeftStyle)],
        {
            ...options,
            register: options?.registerComposed ?? true
        }
    );
    const borderColor = nsvariable(
        ns,
        'border-color',
        [ref(borderTopColor), ref(borderRightColor), ref(borderBottomColor), ref(borderLeftColor)],
        {
            ...options,
            register: options?.registerComposed ?? true
        }
    );
    const borderTop = nsvariable(
        ns,
        'border-top',
        [ref(borderTopWidth), ref(borderTopStyle), ref(borderTopColor)],
        {
            ...options,
            register: options?.registerComposed ?? true
        }
    );
    const borderRight = nsvariable(
        ns,
        'border-right',
        [ref(borderRightWidth), ref(borderRightStyle), ref(borderRightColor)],
        {
            ...options,
            register: options?.registerComposed ?? true
        }
    );
    const borderBottom = nsvariable(
        ns,
        'border-bottom',
        [ref(borderBottomWidth), ref(borderBottomStyle), ref(borderBottomColor)],
        {
            ...options,
            register: options?.registerComposed ?? true
        }
    );
    const borderLeft = nsvariable(
        ns,
        'border-left',
        [ref(borderLeftWidth), ref(borderLeftStyle), ref(borderLeftColor)],
        {
            ...options,
            register: options?.registerComposed ?? true
        }
    );
    const border = nsvariable(
        ns,
        'border',
        [ref(borderTopWidth), ref(borderTopStyle), ref(borderTopColor)],
        {
            ...options,
            register: options?.registerComposed ?? true
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
            const { colorH, colorS, colorL, colorA } = parseColor('color', value.color, {
                register: false
            });

            if (colorH) {
                set(borderTopColorH, valueOf(colorH));
                set(borderRightColorH, valueOf(colorH));
                set(borderBottomColorH, valueOf(colorH));
                set(borderLeftColorH, valueOf(colorH));
            }

            if (colorS) {
                set(borderTopColorS, valueOf(colorS));
                set(borderRightColorS, valueOf(colorS));
                set(borderBottomColorS, valueOf(colorS));
                set(borderLeftColorS, valueOf(colorS));
            }
            if (colorL) {
                set(borderTopColorL, valueOf(colorL));
                set(borderRightColorL, valueOf(colorL));
                set(borderBottomColorL, valueOf(colorL));
                set(borderLeftColorL, valueOf(colorL));
            }
            if (colorA) {
                set(borderTopColorA, valueOf(colorA));
                set(borderRightColorA, valueOf(colorA));
                set(borderBottomColorA, valueOf(colorA));
                set(borderLeftColorA, valueOf(colorA));
            }
        }
    } else if (isSidesProperty(value)) {
        if (isBorderProperty(value.top)) {
            if (value.top.width) set(borderTopWidth, value.top.width);
            if (value.top.style) set(borderTopStyle, value.top.style);
            if (value.top.color) {
                const { colorH, colorS, colorL, colorA } = parseColor('color', value.top.color, {
                    register: false
                });

                if (colorH) set(borderTopColorH, valueOf(colorH));
                if (colorS) set(borderTopColorS, valueOf(colorS));
                if (colorL) set(borderTopColorL, valueOf(colorL));
                if (colorA) set(borderTopColorA, valueOf(colorA));
            }
        }

        if (isBorderProperty(value.right)) {
            if (value.right.width) set(borderRightWidth, value.right.width);
            if (value.right.style) set(borderRightStyle, value.right.style);
            if (value.right.color) {
                const { colorH, colorS, colorL, colorA } = parseColor('color', value.right.color, {
                    register: false
                });

                if (colorH) set(borderRightColorH, valueOf(colorH));
                if (colorS) set(borderRightColorS, valueOf(colorS));
                if (colorL) set(borderRightColorL, valueOf(colorL));
                if (colorA) set(borderRightColorA, valueOf(colorA));
            }
        }

        if (isBorderProperty(value.bottom)) {
            if (value.bottom.width) set(borderBottomWidth, value.bottom.width);
            if (value.bottom.style) set(borderBottomStyle, value.bottom.style);
            if (value.bottom.color) {
                const { colorH, colorS, colorL, colorA } = parseColor('color', value.bottom.color, {
                    register: false
                });

                if (colorH) set(borderBottomColorH, valueOf(colorH));
                if (colorS) set(borderBottomColorS, valueOf(colorS));
                if (colorL) set(borderBottomColorL, valueOf(colorL));
                if (colorA) set(borderBottomColorA, valueOf(colorA));
            }
        }

        if (isBorderProperty(value.left)) {
            if (value.left.width) set(borderLeftWidth, value.left.width);
            if (value.left.style) set(borderLeftStyle, value.left.style);
            if (value.left.color) {
                const { colorH, colorS, colorL, colorA } = parseColor('color', value.left.color, {
                    register: false
                });

                if (colorH) set(borderLeftColorH, valueOf(colorH));
                if (colorS) set(borderLeftColorS, valueOf(colorS));
                if (colorL) set(borderLeftColorL, valueOf(colorL));
                if (colorA) set(borderLeftColorA, valueOf(colorA));
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
            const { colorH, colorS, colorL, colorA } = parseColor('color', color, {
                register: false
            });

            if (colorH) {
                set(borderTopColorH, valueOf(colorH));
                set(borderRightColorH, valueOf(colorH));
                set(borderBottomColorH, valueOf(colorH));
                set(borderLeftColorH, valueOf(colorH));
            }

            if (colorS) {
                set(borderTopColorS, valueOf(colorS));
                set(borderRightColorS, valueOf(colorS));
                set(borderBottomColorS, valueOf(colorS));
                set(borderLeftColorS, valueOf(colorS));
            }

            if (colorL) {
                set(borderTopColorL, valueOf(colorL));
                set(borderRightColorL, valueOf(colorL));
                set(borderBottomColorL, valueOf(colorL));
                set(borderLeftColorL, valueOf(colorL));
            }

            if (colorA) {
                set(borderTopColorA, valueOf(colorA));
                set(borderRightColorA, valueOf(colorA));
                set(borderBottomColorA, valueOf(colorA));
                set(borderLeftColorA, valueOf(colorA));
            }
        }
    } else {
        set(border, value);
    }

    return {
        ...toExportedVariable(borderTopColorH),
        ...toExportedVariable(borderTopColorS),
        ...toExportedVariable(borderTopColorL),
        ...toExportedVariable(borderTopColorA),
        ...toExportedVariable(borderTopColor),
        ...toExportedVariable(borderTopStyle),
        ...toExportedVariable(borderTopWidth),
        ...toExportedVariable(borderRightColorH),
        ...toExportedVariable(borderRightColorS),
        ...toExportedVariable(borderRightColorL),
        ...toExportedVariable(borderRightColorA),
        ...toExportedVariable(borderRightColor),
        ...toExportedVariable(borderRightStyle),
        ...toExportedVariable(borderRightWidth),
        ...toExportedVariable(borderBottomColorH),
        ...toExportedVariable(borderBottomColorS),
        ...toExportedVariable(borderBottomColorL),
        ...toExportedVariable(borderBottomColorA),
        ...toExportedVariable(borderBottomColor),
        ...toExportedVariable(borderBottomStyle),
        ...toExportedVariable(borderBottomWidth),
        ...toExportedVariable(borderLeftColorH),
        ...toExportedVariable(borderLeftColorS),
        ...toExportedVariable(borderLeftColorL),
        ...toExportedVariable(borderLeftColorA),
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
