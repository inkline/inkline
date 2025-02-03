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

    const {
        borderTopLeftRadiusSm,
        borderTopRightRadiusSm,
        borderBottomRightRadiusSm,
        borderBottomLeftRadiusSm,
        borderTopLeftRadiusMd,
        borderTopRightRadiusMd,
        borderBottomRightRadiusMd,
        borderBottomLeftRadiusMd,
        borderTopLeftRadiusLg,
        borderTopRightRadiusLg,
        borderBottomRightRadiusLg,
        borderBottomLeftRadiusLg
    } = useBorderRadius(options);
    const { fontSizeSm, fontSizeMd, fontSizeLg } = useFontSize(options);
    const { spacingSm, spacingMd, spacingLg } = useSpacing(options);

    return {
        sm: {
            borderRadius: {
                topLeft: ref(borderTopLeftRadiusSm),
                topRight: ref(borderTopRightRadiusSm),
                bottomRight: ref(borderBottomRightRadiusSm),
                bottomLeft: ref(borderBottomLeftRadiusSm)
            },
            fontSize: ref(fontSizeSm),
            padding: {
                top: multiply(ref(spacingSm), 3 / 4),
                right: ref(spacingSm),
                bottom: multiply(ref(spacingSm), 3 / 4),
                left: ref(spacingSm)
            },
            width: multiply(ref(spacingSm), 18),
            /**
             * @element arrow
             */
            arrow: {
                size: multiply(ref(spacingSm), 0.5)
            }
        },
        md: {
            borderRadius: {
                topLeft: ref(borderTopLeftRadiusMd),
                topRight: ref(borderTopRightRadiusMd),
                bottomRight: ref(borderBottomRightRadiusMd),
                bottomLeft: ref(borderBottomLeftRadiusMd)
            },
            fontSize: ref(fontSizeMd),
            padding: {
                top: multiply(ref(spacingMd), 3 / 4),
                right: ref(spacingMd),
                bottom: multiply(ref(spacingMd), 3 / 4),
                left: ref(spacingMd)
            },
            width: multiply(ref(spacingMd), 18),
            /**
             * @element arrow
             */
            arrow: {
                size: multiply(ref(spacingMd), 0.5)
            }
        },
        lg: {
            borderRadius: {
                topLeft: ref(borderTopLeftRadiusLg),
                topRight: ref(borderTopRightRadiusLg),
                bottomRight: ref(borderBottomRightRadiusLg),
                bottomLeft: ref(borderBottomLeftRadiusLg)
            },
            fontSize: ref(fontSizeLg),
            padding: {
                top: multiply(ref(spacingLg), 3 / 4),
                right: ref(spacingLg),
                bottom: multiply(ref(spacingLg), 3 / 4),
                left: ref(spacingLg)
            },
            width: multiply(ref(spacingLg), 18),
            /**
             * @element arrow
             */
            arrow: {
                size: multiply(ref(spacingLg), 0.5)
            }
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
            zIndex: 2000
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
        popoverBorderTopColor,
        popoverBorderRightColor,
        popoverBorderBottomColor,
        popoverBorderLeftColor,
        popoverBorderWidth,
        popoverPadding,
        popoverBorderTopLeftRadius,
        popoverBorderTopRightRadius,
        popoverBorderBottomLeftRadius,
        popoverBorderBottomRightRadius,
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
            fontSize: ref(popoverFontSize)
        },
        options
    );

    selector(
        ['.popover-header', '.popover-body', '.popover-footer'],
        {
            background: ref(popoverBackground),
            borderStyle: vref(popoverBorderStyle),
            borderTopColor: ref(popoverBorderTopColor),
            borderRightColor: ref(popoverBorderRightColor),
            borderBottomColor: ref(popoverBorderBottomColor),
            borderLeftColor: ref(popoverBorderLeftColor),
            borderWidth: vref(popoverBorderWidth),
            padding: vref(popoverPadding),
            transitionProperty: ref(popoverTransitionProperty),
            transitionDuration: ref(popoverTransitionDuration),
            transitionTimingFunction: ref(popoverTransitionTimingFunction)
        },
        options
    );

    selector(
        '.popover-header + .popover-body',
        {
            borderTop: 0
        },
        options
    );

    selector(
        '.popover-body:has(+ .popover-footer)',
        {
            borderBottom: 0
        },
        options
    );

    selector(
        ['.popover > *:first-child:not(.popover-arrow)', '.popover > .popover-arrow + *'],
        {
            borderTopLeftRadius: ref(popoverBorderTopLeftRadius),
            borderTopRightRadius: ref(popoverBorderTopRightRadius)
        },
        options
    );

    selector(
        '.popover > *:last-child',
        {
            borderBottomRightRadius: ref(popoverBorderBottomRightRadius),
            borderBottomLeftRadius: ref(popoverBorderBottomLeftRadius)
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

    const {
        popoverPaddingTop,
        popoverPaddingRight,
        popoverPaddingBottom,
        popoverPaddingLeft,
        popoverBorderTopLeftRadius,
        popoverBorderTopRightRadius,
        popoverBorderBottomRightRadius,
        popoverBorderBottomLeftRadius,
        popoverFontSize
    } = usePopoverThemeVariables(options);

    const {
        variantBorderTopLeftRadius,
        variantBorderTopRightRadius,
        variantBorderBottomRightRadius,
        variantBorderBottomLeftRadius,
        variantFontSize,
        variantPaddingTop,
        variantPaddingRight,
        variantPaddingBottom,
        variantPaddingLeft
    } = setExportsNamespace(usePopoverThemeSizeVariables(variant, options), 'variant');

    selector(
        `.popover.-${variant}`,
        {
            [toVariableKey(popoverBorderTopLeftRadius)]: ref(variantBorderTopLeftRadius),
            [toVariableKey(popoverBorderTopRightRadius)]: ref(variantBorderTopRightRadius),
            [toVariableKey(popoverBorderBottomRightRadius)]: ref(variantBorderBottomRightRadius),
            [toVariableKey(popoverBorderBottomLeftRadius)]: ref(variantBorderBottomLeftRadius),
            [toVariableKey(popoverFontSize)]: ref(variantFontSize),
            [toVariableKey(popoverPaddingTop)]: ref(variantPaddingTop),
            [toVariableKey(popoverPaddingRight)]: ref(variantPaddingRight),
            [toVariableKey(popoverPaddingBottom)]: ref(variantPaddingBottom),
            [toVariableKey(popoverPaddingLeft)]: ref(variantPaddingLeft)
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
