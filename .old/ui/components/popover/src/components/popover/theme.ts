import {
    multiply,
    ref,
    selector,
    nsvariables,
    vref,
    setExportsNamespace,
    toVariableKey,
    DefinitionOptions,
    defaultDefinitionOptions
} from '@inkline/core';
import { merge } from '@inkline/utils';
import {
    useBorder,
    useBorderRadius,
    useBoxShadow,
    useFontSize,
    useTransition,
    useColors,
    useContrastTextColor,
    useSpacing
} from '@inkline/theme';

const ns = 'popover';

const defaultPopoverColor = 'light';
const defaultPopoverColors = ['light', 'dark'] as const;

const defaultPopoverSize = 'md';
const defaultPopoverSizes = ['sm', 'md', 'lg'] as const;

type PopoverColorVariant = (typeof defaultPopoverColors)[number];
type PopoverSizeVariant = (typeof defaultPopoverSizes)[number];

/**
 * Config
 */

export function usePopoverThemeColorConfig(
    variant: PopoverColorVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { colorLightShade50, colorWhite, colorDarkTint50, colorDark } = useColors(options);
    const { contrastTextColorLight, contrastTextColorDark } = useContrastTextColor(options);

    return {
        light: {
            border: {
                color: ref(colorLightShade50)
            },
            background: ref(colorWhite),
            color: ref(contrastTextColorLight)
        },
        dark: {
            border: {
                color: ref(colorDarkTint50)
            },
            background: ref(colorDark),
            color: ref(contrastTextColorDark)
        }
    }[variant];
}

export function usePopoverThemeSizeConfig(
    variant: PopoverSizeVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { spacingSm, spacingMd, spacingLg } = useSpacing(options);

    return {
        sm: {
            width: multiply(ref(spacingSm), 18)
        },
        md: {
            width: multiply(ref(spacingMd), 18)
        },
        lg: {
            width: multiply(ref(spacingLg), 18)
        }
    }[variant];
}

export function usePopoverThemeConfig(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        borderTopStyle,
        borderTopWidth,
        borderRightStyle,
        borderRightWidth,
        borderBottomStyle,
        borderBottomWidth,
        borderLeftStyle,
        borderLeftWidth
    } = useBorder(options);
    const {
        borderTopLeftRadius,
        borderTopRightRadius,
        borderBottomRightRadius,
        borderBottomLeftRadius
    } = useBorderRadius(options);
    const { fontSize } = useFontSize(options);
    const { spacing } = useSpacing(options);
    const {
        boxShadowOffsetX,
        boxShadowOffsetY,
        boxShadowBlurRadius,
        boxShadowSpreadRadius,
        boxShadowColor
    } = useBoxShadow(options);
    const { transitionProperty, transitionDuration, transitionTimingFunction } =
        useTransition(options);

    return merge(
        {
            border: {
                top: {
                    width: ref(borderTopWidth),
                    style: ref(borderTopStyle)
                },
                right: {
                    width: ref(borderRightWidth),
                    style: ref(borderRightStyle)
                },
                bottom: {
                    width: ref(borderBottomWidth),
                    style: ref(borderBottomStyle)
                },
                left: {
                    width: ref(borderLeftWidth),
                    style: ref(borderLeftStyle)
                }
            },
            borderRadius: {
                topLeft: ref(borderTopLeftRadius),
                topRight: ref(borderTopRightRadius),
                bottomRight: ref(borderBottomRightRadius),
                bottomLeft: ref(borderBottomLeftRadius)
            },
            fontSize: ref(fontSize),
            padding: {
                top: multiply(ref(spacing), 3 / 4),
                right: ref(spacing),
                bottom: multiply(ref(spacing), 3 / 4),
                left: ref(spacing)
            },
            boxShadow: {
                offsetX: ref(boxShadowOffsetX),
                offsetY: ref(boxShadowOffsetY),
                blurRadius: ref(boxShadowBlurRadius),
                spreadRadius: ref(boxShadowSpreadRadius),
                color: ref(boxShadowColor)
            },
            transition: {
                property: ref(transitionProperty),
                duration: ref(transitionDuration),
                timingFunction: ref(transitionTimingFunction)
            },
            maxWidth: '90vw',
            zIndex: 2000,
            /**
             * @element arrow
             */
            arrow: {
                size: multiply(ref(spacing), 0.5)
            }
        },
        usePopoverThemeColorConfig(defaultPopoverColor, options),
        usePopoverThemeSizeConfig(defaultPopoverSize, options)
    );
}

/**
 * Variables
 */

export function usePopoverThemeColorVariables(
    variant: PopoverColorVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables([ns, variant] as const, usePopoverThemeColorConfig(variant, options), {
        ...options,
        registerComposed: false
    });
}

export function usePopoverThemeSizeVariables(
    variant: PopoverSizeVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables([ns, variant] as const, usePopoverThemeSizeConfig(variant, options), {
        ...options,
        registerComposed: false
    });
}

export function usePopoverThemeVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables(ns, usePopoverThemeConfig(options), {
        ...options,
        registerComposed: false
    });
}

/**
 * Selectors
 */

export function usePopoverThemeLayout(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { popoverZIndex, popoverWidth, popoverMaxWidth } = usePopoverThemeVariables(options);

    selector(
        '.popover',
        {
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            wordWrap: 'break-word',
            backgroundClip: 'border-box',
            width: ref(popoverWidth),
            maxWidth: ref(popoverMaxWidth),
            zIndex: ref(popoverZIndex)
        },
        options
    );

    selector(
        '.popover-trigger',
        {
            display: 'inline-flex'
        },
        options
    );

    selector(
        '.popover[data-popup-placement^="top"]',
        {
            transformOrigin: 'center bottom'
        },
        options
    );

    selector(
        '.popover[data-popup-placement^="right"]',
        {
            transformOrigin: 'left center'
        },
        options
    );

    selector(
        '.popover[data-popup-placement^="bottom"]',
        {
            transformOrigin: 'center top'
        },
        options
    );

    selector(
        '.popover[data-popup-placement^="left"]',
        {
            transformOrigin: 'right center'
        },
        options
    );

    selector(
        '.popover-arrow',
        {
            position: 'absolute'
        },
        options
    );

    selector(
        ['.popover-arrow', '.popover-arrow::after'],
        {
            display: 'block',
            width: 0,
            height: 0,
            borderColor: 'transparent',
            borderStyle: 'solid',
            position: 'absolute',
            boxSizing: 'border-box'
        },
        options
    );

    selector(
        '.popover-arrow::after',
        {
            content: '""'
        },
        options
    );

    selector(
        [
            '.popover[data-popup-placement^="top"] .popover-arrow',
            '.popover[data-popup-placement^="top"] .popover-arrow::after'
        ],
        {
            borderBottomWidth: 0
        },
        options
    );

    selector(
        [
            '.popover[data-popup-placement^="bottom"] .popover-arrow',
            '.popover[data-popup-placement^="bottom"] .popover-arrow::after'
        ],
        {
            borderTopWidth: 0
        },
        options
    );

    selector(
        [
            '.popover[data-popup-placement^="right"] .popover-arrow',
            '.popover[data-popup-placement^="right"] .popover-arrow::after'
        ],
        {
            borderLeftWidth: 0
        },
        options
    );

    selector(
        [
            '.popover[data-popup-placement^="left"] .popover-arrow',
            '.popover[data-popup-placement^="left"] .popover-arrow::after'
        ],
        {
            borderRightWidth: 0
        },
        options
    );
}

export function usePopoverThemeBaseSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        popoverBorderStyle,
        popoverBorderColor,
        popoverBorderWidth,
        popoverPadding,
        popoverPaddingTop,
        popoverPaddingRight,
        popoverPaddingBottom,
        popoverPaddingLeft,
        popoverBorderTopColor,
        popoverBorderRightColor,
        popoverBorderBottomColor,
        popoverBorderLeftColor,
        popoverBorderRadius,
        popoverBorderTopLeftRadius,
        popoverBorderTopRightRadius,
        popoverBorderBottomRightRadius,
        popoverBorderBottomLeftRadius,
        popoverBoxShadow,
        popoverBackground,
        popoverColor,
        popoverFontSize,
        popoverTransitionProperty,
        popoverTransitionDuration,
        popoverTransitionTimingFunction,
        popoverArrowSize
    } = usePopoverThemeVariables(options);

    selector(
        '.popover',
        {
            boxShadow: vref(popoverBoxShadow),
            color: ref(popoverColor),
            fontSize: ref(popoverFontSize),
            background: ref(popoverBackground),
            borderStyle: vref(popoverBorderStyle),
            borderColor: vref(popoverBorderColor),
            borderWidth: vref(popoverBorderWidth),
            borderRadius: vref(popoverBorderRadius),
            padding: vref(popoverPadding),
            transitionProperty: ref(popoverTransitionProperty),
            transitionDuration: ref(popoverTransitionDuration),
            transitionTimingFunction: ref(popoverTransitionTimingFunction)
        },
        options
    );

    selector(
        ['.popover-header', '.popover-footer'],
        {
            borderStyle: vref(popoverBorderStyle),
            borderColor: vref(popoverBorderColor),
            borderWidth: vref(popoverBorderWidth),
            padding: vref(popoverPadding)
        },
        options
    );

    selector(
        '.popover-header',
        {
            borderRightWidth: 0,
            borderLeftWidth: 0,
            marginTop: multiply(ref(popoverPaddingTop), -1),
            marginRight: multiply(ref(popoverPaddingRight), -1),
            marginBottom: vref(popoverPaddingBottom),
            marginLeft: multiply(ref(popoverPaddingLeft), -1)
        },
        options
    );

    selector(
        '.popover-footer',
        {
            borderRightWidth: 0,
            borderLeftWidth: 0,
            marginTop: vref(popoverPaddingTop),
            marginRight: multiply(ref(popoverPaddingRight), -1),
            marginBottom: multiply(ref(popoverPaddingBottom), -1),
            marginLeft: multiply(ref(popoverPaddingLeft), -1)
        },
        options
    );

    selector(
        ['.popover .popover-header:first-child', '.popover .popover-footer:first-child'],
        {
            borderTopWidth: 0,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            borderTopLeftRadius: vref(popoverBorderTopLeftRadius),
            borderTopRightRadius: vref(popoverBorderTopRightRadius)
        },
        options
    );

    selector(
        ['.popover .popover-header:last-child', '.popover .popover-footer:last-child'],
        {
            borderBottomWidth: 0,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomRightRadius: vref(popoverBorderBottomRightRadius),
            borderBottomLeftRadius: vref(popoverBorderBottomLeftRadius)
        },
        options
    );

    selector(
        ['.popover-arrow', '.popover-arrow::after'],
        {
            width: ref(popoverArrowSize),
            height: ref(popoverArrowSize)
        },
        options
    );

    selector(
        ['.popover-arrow', '.popover-arrow::after'],
        {
            borderWidth: ref(popoverArrowSize)
        },
        options
    );

    selector(
        [
            '.popover[data-popup-placement^="top"] .popover-arrow::after',
            '.popover[data-popup-placement^="bottom"] .popover-arrow::after'
        ],
        {
            marginLeft: multiply(ref(popoverArrowSize), -1)
        },
        options
    );

    selector(
        [
            '.popover[data-popup-placement^="left"] .popover-arrow::after',
            '.popover[data-popup-placement^="right"] .popover-arrow::after'
        ],
        {
            marginTop: multiply(ref(popoverArrowSize), -1)
        },
        options
    );

    selector(
        '.popover[data-popup-placement^="top"] .popover-arrow::after',
        {
            bottom: '1px',
            borderTopColor: ref(popoverBackground)
        },
        options
    );

    selector(
        '.popover[data-popup-placement^="top"] .popover-arrow',
        {
            borderTopColor: ref(popoverBorderTopColor)
        },
        options
    );

    selector(
        '.popover[data-popup-placement^="bottom"] .popover-arrow::after',
        {
            top: '1px',
            borderBottomColor: ref(popoverBackground)
        },
        options
    );

    selector(
        '.popover[data-popup-placement^="bottom"] .popover-arrow',
        {
            borderBottomColor: ref(popoverBorderBottomColor)
        },
        options
    );

    selector(
        '.popover[data-popup-placement^="left"] .popover-arrow::after',
        {
            right: '1px',
            borderLeftColor: ref(popoverBackground)
        },
        options
    );

    selector(
        '.popover[data-popup-placement^="left"] .popover-arrow',
        {
            borderLeftColor: ref(popoverBorderLeftColor)
        },
        options
    );

    selector(
        '.popover[data-popup-placement^="right"] .popover-arrow::after',
        {
            left: '1px',
            borderRightColor: ref(popoverBackground)
        },
        options
    );

    selector(
        '.popover[data-popup-placement^="right"] .popover-arrow',
        {
            borderRightColor: ref(popoverBorderRightColor)
        },
        options
    );
}

export function usePopoverThemeSizeSelectors(
    variant: PopoverSizeVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { popoverWidth } = usePopoverThemeVariables(options);

    const { variantWidth } = setExportsNamespace(
        usePopoverThemeSizeVariables(variant, options),
        'variant'
    );

    selector(
        `.popover.-${variant}`,
        {
            [toVariableKey(popoverWidth)]: ref(variantWidth)
        },
        options
    );
}

export function usePopoverThemeColorSelectors(
    variant: PopoverColorVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        popoverBorderTopColor,
        popoverBorderRightColor,
        popoverBorderBottomColor,
        popoverBorderLeftColor,
        popoverBackground,
        popoverColor
    } = usePopoverThemeVariables(options);
    const {
        variantBorderTopColor,
        variantBorderRightColor,
        variantBorderBottomColor,
        variantBorderLeftColor,
        variantBackground,
        variantColor
    } = setExportsNamespace(usePopoverThemeColorVariables(variant, options), 'variant');

    selector(
        `.popover.-${variant}`,
        {
            [toVariableKey(popoverBorderTopColor)]: ref(variantBorderTopColor),
            [toVariableKey(popoverBorderRightColor)]: ref(variantBorderRightColor),
            [toVariableKey(popoverBorderBottomColor)]: ref(variantBorderBottomColor),
            [toVariableKey(popoverBorderLeftColor)]: ref(variantBorderLeftColor),
            [toVariableKey(popoverBackground)]: ref(variantBackground),
            [toVariableKey(popoverColor)]: ref(variantColor)
        },
        options
    );
}

/**
 * Composables
 */

export function usePopoverThemeColors(
    colors: PopoverColorVariant[],
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    colors.forEach((color) => usePopoverThemeColorSelectors(color, options));
}

export function usePopoverThemeSizes(sizes: PopoverSizeVariant[], userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    sizes.forEach((size) => usePopoverThemeSizeSelectors(size, options));
}

export function usePopoverTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    usePopoverThemeVariables(options);
    usePopoverThemeLayout(options);
    usePopoverThemeBaseSelectors(options);
    usePopoverThemeSizes([...defaultPopoverSizes], options);
    usePopoverThemeColors([...defaultPopoverColors], options);
}
