import { defaultDefinitionOptions, DefinitionOptions, ref, variable } from '@inkline/core';
import { useNeutralColors } from './useColors';

export function useBorderVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { colorGray200 } = useNeutralColors(options);

    const borderStyleNone = variable('border-style--none', 'none', options);
    const borderStyleSolid = variable('border-style--solid', 'solid', options);
    const borderStyleDashed = variable('border-style--dashed', 'dashed', options);
    const borderStyleDotted = variable('border-style--dotted', 'dotted', options);
    const borderStyleDouble = variable('border-style--double', 'double', options);
    const borderStyleGroove = variable('border-style--groove', 'groove', options);

    const borderTopStyle = variable('border-top-style', ref(borderStyleSolid), options);
    const borderRightStyle = variable('border-right-style', ref(borderStyleSolid), options);
    const borderBottomStyle = variable('border-bottom-style', ref(borderStyleSolid), options);
    const borderLeftStyle = variable('border-left-style', ref(borderStyleSolid), options);
    const borderStyle = variable('border-style', [
        ref(borderTopStyle),
        ref(borderRightStyle),
        ref(borderBottomStyle),
        ref(borderLeftStyle)
    ], options);

    const borderStyleMap = {
        none: borderStyleNone,
        solid: borderStyleSolid,
        dashed: borderStyleDashed,
        dotted: borderStyleDotted,
        double: borderStyleDouble,
        groove: borderStyleGroove,
        default: borderStyle
    };

    const borderWidthNone = variable('border-width--none', 0, options);
    const borderWidthThin = variable('border-width--thin', 'thin', options);
    const borderWidthMedium = variable('border-width--medium', 'medium', options);
    const borderWidthThick = variable('border-width--thick', 'thick', options);

    const borderTopWidth = variable('border-top-width', ref(borderWidthThin), options);
    const borderRightWidth = variable('border-right-width', ref(borderWidthThin), options);
    const borderBottomWidth = variable('border-bottom-width', ref(borderWidthThin), options);
    const borderLeftWidth = variable('border-left-width', ref(borderWidthThin), options);
    const borderWidth = variable('border-width', [
        ref(borderTopWidth),
        ref(borderRightWidth),
        ref(borderBottomWidth),
        ref(borderLeftWidth)
    ], options);

    const borderWidthMap = {
        0: borderWidthNone,
        none: borderWidthNone,
        thin: borderWidthThin,
        medium: borderWidthMedium,
        thick: borderWidthThick,
        default: borderWidth
    };

    const borderTopColor = variable('border-top-color', ref(colorGray200), options);
    const borderRightColor = variable('border-right-color', ref(colorGray200), options);
    const borderBottomColor = variable('border-bottom-color', ref(colorGray200), options);
    const borderLeftColor = variable('border-left-color', ref(colorGray200), options);
    const borderColor = variable('border-color', [
        ref(borderTopColor),
        ref(borderRightColor),
        ref(borderBottomColor),
        ref(borderLeftColor)
    ], options);

    const borderColorMap = {
        default: borderColor
    };

    const borderTop = variable(
        'border-top',
        [ref(borderTopWidth), ref(borderTopStyle), ref(borderTopColor)],
        options
    );
    const borderRight = variable(
        'border-right',
        [ref(borderRightWidth), ref(borderRightStyle), ref(borderRightColor)],
        options
    );
    const borderBottom = variable(
        'border-bottom',
        [ref(borderBottomWidth), ref(borderBottomStyle), ref(borderBottomColor)],
        options
    );
    const borderLeft = variable(
        'border-left',
        [ref(borderLeftWidth), ref(borderLeftStyle), ref(borderLeftColor)],
        options
    );

    const border = variable(
        'border',
        [ref(borderWidth), ref(borderStyle), ref(borderColor)],
        options
    );

    return {
        borderStyleNone,
        borderStyleSolid,
        borderStyleDashed,
        borderStyleDotted,
        borderStyleDouble,
        borderStyleGroove,
        borderStyle,
        borderTopStyle,
        borderRightStyle,
        borderBottomStyle,
        borderLeftStyle,
        borderWidthNone,
        borderWidthThin,
        borderWidthMedium,
        borderWidthThick,
        borderWidth,
        borderTopWidth,
        borderRightWidth,
        borderBottomWidth,
        borderLeftWidth,
        borderTopColor,
        borderRightColor,
        borderBottomColor,
        borderLeftColor,
        borderColor,
        borderTop,
        borderRight,
        borderBottom,
        borderLeft,
        border,
        borderColorMap,
        borderStyleMap,
        borderWidthMap
    };
}

export function useBorder(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return useBorderVariables(options);
}
