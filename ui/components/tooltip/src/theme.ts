import {
    multiply,
    ref,
    selector,
    defaultDefinitionOptions,
    nsvariables,
    DefinitionOptions,
    vref,
    setExportsNamespace,
    toVariableKey
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

const ns = 'tooltip';

const defaultTooltipColor = 'light';
const defaultTooltipColors = ['light', 'dark'] as const;

const defaultTooltipSize = 'md';
const defaultTooltipSizes = ['sm', 'md', 'lg'] as const;

type TooltipColorVariant = (typeof defaultTooltipColors)[number];
type TooltipSizeVariant = (typeof defaultTooltipSizes)[number];

/**
 * Config
 */

export function useTooltipThemeColorConfig(
    variant: TooltipColorVariant,
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

export function useTooltipThemeSizeConfig(
    variant: TooltipSizeVariant,
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

export function useTooltipThemeConfig(userOptions: DefinitionOptions) {
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
            zIndex: 2000
        },
        useTooltipThemeColorConfig(defaultTooltipColor, options),
        useTooltipThemeSizeConfig(defaultTooltipSize, options)
    );
}

/**
 * Variables
 */

export function useTooltipThemeColorVariables(
    variant: TooltipColorVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables([ns, variant] as const, useTooltipThemeColorConfig(variant, options), {
        ...options,
        registerComposed: false
    });
}

export function useTooltipThemeSizeVariables(
    variant: TooltipSizeVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables([ns, variant] as const, useTooltipThemeSizeConfig(variant, options), {
        ...options,
        registerComposed: false
    });
}

export function useTooltipThemeVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables(ns, useTooltipThemeConfig(options), {
        ...options,
        registerComposed: false
    });
}

/**
 * Selectors
 */

export function useTooltipThemeLayout(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { tooltipZIndex } = useTooltipThemeVariables(options);

    selector(
        '.tooltip',
        {
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            wordWrap: 'break-word',
            backgroundClip: 'border-box',
            zIndex: ref(tooltipZIndex)
        },
        options
    );

    selector(
        '.tooltip-trigger',
        {
            display: 'inline-flex'
        },
        options
    );

    selector(
        '.tooltip[data-popup-placement^="top"]',
        {
            transformOrigin: 'center bottom'
        },
        options
    );

    selector(
        '.tooltip[data-popup-placement^="right"]',
        {
            transformOrigin: 'left center'
        },
        options
    );

    selector(
        '.tooltip[data-popup-placement^="bottom"]',
        {
            transformOrigin: 'center top'
        },
        options
    );

    selector(
        '.tooltip[data-popup-placement^="left"]',
        {
            transformOrigin: 'right center'
        },
        options
    );

    selector(
        '.tooltip-arrow',
        {
            position: 'absolute'
        },
        options
    );

    selector(
        ['.tooltip-arrow', '.tooltip-arrow::after'],
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
        '.tooltip-arrow::after',
        {
            content: '""'
        },
        options
    );

    selector(
        [
            '.tooltip[data-popup-placement^="top"] .tooltip-arrow',
            '.tooltip[data-popup-placement^="top"] .tooltip-arrow::after'
        ],
        {
            borderBottomWidth: 0
        },
        options
    );

    selector(
        [
            '.tooltip[data-popup-placement^="bottom"] .tooltip-arrow',
            '.tooltip[data-popup-placement^="bottom"] .tooltip-arrow::after'
        ],
        {
            borderTopWidth: 0
        },
        options
    );

    selector(
        [
            '.tooltip[data-popup-placement^="right"] .tooltip-arrow',
            '.tooltip[data-popup-placement^="right"] .tooltip-arrow::after'
        ],
        {
            borderLeftWidth: 0
        },
        options
    );

    selector(
        [
            '.tooltip[data-popup-placement^="left"] .tooltip-arrow',
            '.tooltip[data-popup-placement^="left"] .tooltip-arrow::after'
        ],
        {
            borderRightWidth: 0
        },
        options
    );
}

export function useTooltipThemeBase(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        tooltipBorderStyle,
        tooltipBorderColor,
        tooltipBorderTopColor,
        tooltipBorderRightColor,
        tooltipBorderBottomColor,
        tooltipBorderLeftColor,
        tooltipBorderWidth,
        tooltipPadding,
        tooltipBorderRadius,
        tooltipBoxShadow,
        tooltipBackground,
        tooltipColor,
        tooltipFontSize,
        tooltipTransitionProperty,
        tooltipTransitionDuration,
        tooltipTransitionTimingFunction,
        tooltipArrowSize
    } = useTooltipThemeVariables(options);

    selector(
        '.tooltip',
        {
            boxShadow: ref(tooltipBoxShadow),
            color: ref(tooltipColor),
            fontSize: ref(tooltipFontSize)
        },
        options
    );

    selector(
        '.tooltip-content',
        {
            background: ref(tooltipBackground),
            borderStyle: vref(tooltipBorderStyle),
            borderColor: vref(tooltipBorderColor),
            borderWidth: vref(tooltipBorderWidth),
            borderRadius: vref(tooltipBorderRadius),
            padding: vref(tooltipPadding),
            transitionProperty: ref(tooltipTransitionProperty),
            transitionDuration: ref(tooltipTransitionDuration),
            transitionTimingFunction: ref(tooltipTransitionTimingFunction)
        },
        options
    );

    selector(
        ['.tooltip-arrow', '.tooltip-arrow::after'],
        {
            width: ref(tooltipArrowSize),
            height: ref(tooltipArrowSize)
        },
        options
    );

    selector(
        ['.tooltip-arrow', '.tooltip-arrow::after'],
        {
            borderWidth: ref(tooltipArrowSize)
        },
        options
    );

    selector(
        [
            '.tooltip[data-popup-placement^="top"] .tooltip-arrow::after',
            '.tooltip[data-popup-placement^="bottom"] .tooltip-arrow::after'
        ],
        {
            marginLeft: multiply(ref(tooltipArrowSize), -1)
        },
        options
    );

    selector(
        [
            '.tooltip[data-popup-placement^="left"] .tooltip-arrow::after',
            '.tooltip[data-popup-placement^="right"] .tooltip-arrow::after'
        ],
        {
            marginTop: multiply(ref(tooltipArrowSize), -1)
        },
        options
    );

    selector(
        '.tooltip[data-popup-placement^="top"] .tooltip-arrow::after',
        {
            bottom: '1px',
            borderTopColor: ref(tooltipBackground)
        },
        options
    );

    selector(
        '.tooltip[data-popup-placement^="top"] .tooltip-arrow',
        {
            borderTopColor: ref(tooltipBorderTopColor)
        },
        options
    );

    selector(
        '.tooltip[data-popup-placement^="bottom"] .tooltip-arrow::after',
        {
            top: '1px',
            borderBottomColor: ref(tooltipBackground)
        },
        options
    );

    selector(
        '.tooltip[data-popup-placement^="bottom"] .tooltip-arrow',
        {
            borderBottomColor: ref(tooltipBorderBottomColor)
        },
        options
    );

    selector(
        '.tooltip[data-popup-placement^="left"] .tooltip-arrow::after',
        {
            right: '1px',
            borderLeftColor: ref(tooltipBackground)
        },
        options
    );

    selector(
        '.tooltip[data-popup-placement^="left"] .tooltip-arrow',
        {
            borderLeftColor: ref(tooltipBorderLeftColor)
        },
        options
    );

    selector(
        '.tooltip[data-popup-placement^="right"] .tooltip-arrow::after',
        {
            left: '1px',
            borderRightColor: ref(tooltipBackground)
        },
        options
    );

    selector(
        '.tooltip[data-popup-placement^="right"] .tooltip-arrow',
        {
            borderRightColor: ref(tooltipBorderRightColor)
        },
        options
    );
}

export function useTooltipThemeSizeSelectors(
    variant: TooltipSizeVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        tooltipPaddingTop,
        tooltipPaddingRight,
        tooltipPaddingBottom,
        tooltipPaddingLeft,
        tooltipBorderTopLeftRadius,
        tooltipBorderTopRightRadius,
        tooltipBorderBottomRightRadius,
        tooltipBorderBottomLeftRadius,
        tooltipFontSize
    } = useTooltipThemeVariables(options);

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
    } = setExportsNamespace(useTooltipThemeSizeVariables(variant, options), 'variant');

    selector(
        `.tooltip.-${variant}`,
        {
            [toVariableKey(tooltipBorderTopLeftRadius)]: ref(variantBorderTopLeftRadius),
            [toVariableKey(tooltipBorderTopRightRadius)]: ref(variantBorderTopRightRadius),
            [toVariableKey(tooltipBorderBottomRightRadius)]: ref(variantBorderBottomRightRadius),
            [toVariableKey(tooltipBorderBottomLeftRadius)]: ref(variantBorderBottomLeftRadius),
            [toVariableKey(tooltipFontSize)]: ref(variantFontSize),
            [toVariableKey(tooltipPaddingTop)]: ref(variantPaddingTop),
            [toVariableKey(tooltipPaddingRight)]: ref(variantPaddingRight),
            [toVariableKey(tooltipPaddingBottom)]: ref(variantPaddingBottom),
            [toVariableKey(tooltipPaddingLeft)]: ref(variantPaddingLeft)
        },
        options
    );
}

export function useTooltipThemeSizes(sizes: TooltipSizeVariant[], userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    sizes.forEach((size) => useTooltipThemeSizeSelectors(size, options));
}

export function useTooltipThemeColorSelectors(
    variant: TooltipColorVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        tooltipBorderTopColor,
        tooltipBorderRightColor,
        tooltipBorderBottomColor,
        tooltipBorderLeftColor,
        tooltipBackground,
        tooltipColor
    } = useTooltipThemeVariables(options);
    const {
        variantBorderTopColor,
        variantBorderRightColor,
        variantBorderBottomColor,
        variantBorderLeftColor,
        variantBackground,
        variantColor
    } = setExportsNamespace(useTooltipThemeColorVariables(variant, options), 'variant');

    selector(
        `.tooltip.-${variant}`,
        {
            [toVariableKey(tooltipBorderTopColor)]: ref(variantBorderTopColor),
            [toVariableKey(tooltipBorderRightColor)]: ref(variantBorderRightColor),
            [toVariableKey(tooltipBorderBottomColor)]: ref(variantBorderBottomColor),
            [toVariableKey(tooltipBorderLeftColor)]: ref(variantBorderLeftColor),
            [toVariableKey(tooltipBackground)]: ref(variantBackground),
            [toVariableKey(tooltipColor)]: ref(variantColor)
        },
        options
    );
}

export function useTooltipThemeColors(
    colors: TooltipColorVariant[],
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    colors.forEach((color) => useTooltipThemeColorSelectors(color, options));
}

export function useTooltipTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useTooltipThemeVariables(options);
    useTooltipThemeLayout(options);
    useTooltipThemeBase(options);
    useTooltipThemeSizes([...defaultTooltipSizes], options);
    useTooltipThemeColors([...defaultTooltipColors], options);
}
