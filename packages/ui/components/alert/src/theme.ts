import {
    ref,
    selector,
    nsvariables,
    setExportsNamespace,
    toVariableKey,
    vref,
    DefinitionOptions
} from '@inkline/core';
import { merge } from '@inkline/utils';
import {
    useBorder,
    useBoxShadow,
    useBrandColorVariants,
    useFontSize,
    useTransition,
    useFontWeight,
    useBorderRadius,
    useSpacing
} from '@inkline/theme';

const ns = 'alert';

const defaultAlertColor = 'info';
const defaultAlertColors = ['info', 'success', 'warning', 'danger'] as const;

const defaultAlertSize = 'md';
const defaultAlertSizes = ['sm', 'md', 'lg'] as const;

type AlertColorVariant = (typeof defaultAlertColors)[number];
type AlertSizeVariant = (typeof defaultAlertSizes)[number];

/**
 * Config
 */

export function useAlertThemeColorConfig(variant: AlertColorVariant, options: DefinitionOptions) {
    const {
        colorInfo100,
        colorInfo800,
        colorInfoShade50,
        colorSuccess100,
        colorSuccess800,
        colorSuccessShade50,
        colorWarning100,
        colorWarning800,
        colorWarningShade50,
        colorDanger100,
        colorDanger800,
        colorDangerShade50
    } = useBrandColorVariants(options);

    return {
        /**
         * @variant info
         */
        info: {
            border: {
                color: ref(colorInfoShade50)
            },
            background: ref(colorInfo100),
            color: ref(colorInfo800)
        },
        /**
         * @variant success
         */
        success: {
            border: {
                color: ref(colorSuccessShade50)
            },
            background: ref(colorSuccess100),
            color: ref(colorSuccess800)
        },
        /**
         * @variant warning
         */
        warning: {
            border: {
                color: ref(colorWarningShade50)
            },
            background: ref(colorWarning100),
            color: ref(colorWarning800)
        },
        /**
         * @variant danger
         */
        danger: {
            border: {
                color: ref(colorDangerShade50)
            },
            background: ref(colorDanger100),
            color: ref(colorDanger800)
        }
    }[variant];
}

export function useAlertThemeSizeConfig(variant: AlertSizeVariant, options: DefinitionOptions) {
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
        /**
         * @variant sm
         */
        sm: {
            borderRadius: {
                topLeft: ref(borderTopLeftRadiusSm),
                topRight: ref(borderTopRightRadiusSm),
                bottomRight: ref(borderBottomRightRadiusSm),
                bottomLeft: ref(borderBottomLeftRadiusSm)
            },
            fontSize: ref(fontSizeSm),
            padding: {
                top: ref(spacingSm),
                right: ref(spacingSm),
                bottom: ref(spacingSm),
                left: ref(spacingSm)
            }
        },
        /**
         * @variant md
         */
        md: {
            borderRadius: {
                topLeft: ref(borderTopLeftRadiusMd),
                topRight: ref(borderTopRightRadiusMd),
                bottomRight: ref(borderBottomRightRadiusMd),
                bottomLeft: ref(borderBottomLeftRadiusMd)
            },
            fontSize: ref(fontSizeMd),
            padding: {
                top: ref(spacingMd),
                right: ref(spacingMd),
                bottom: ref(spacingMd),
                left: ref(spacingMd)
            }
        },
        /**
         * @variant lg
         */
        lg: {
            borderRadius: {
                topLeft: ref(borderTopLeftRadiusLg),
                topRight: ref(borderTopRightRadiusLg),
                bottomRight: ref(borderBottomRightRadiusLg),
                bottomLeft: ref(borderBottomLeftRadiusLg)
            },
            fontSize: ref(fontSizeLg),
            padding: {
                top: ref(spacingLg),
                right: ref(spacingLg),
                bottom: ref(spacingLg),
                left: ref(spacingLg)
            }
        }
    }[variant];
}

export function useAlertThemeConfig(options: DefinitionOptions) {
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
    const { fontWeightSemibold } = useFontWeight(options);
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
            /**
             * @element link
             */
            link: {
                fontWeight: ref(fontWeightSemibold)
            }
        },
        useAlertThemeColorConfig(defaultAlertColor, options),
        useAlertThemeSizeConfig(defaultAlertSize, options)
    );
}

/**
 * Variables
 */

export function useAlertThemeColorVariables(
    variant: AlertColorVariant,
    options: DefinitionOptions
) {
    return nsvariables([ns, variant] as const, useAlertThemeColorConfig(variant, options), {
        ...options
        // registerComposed: false
    });
}

export function useAlertThemeSizeVariables(variant: AlertSizeVariant, options: DefinitionOptions) {
    return nsvariables([ns, variant] as const, useAlertThemeSizeConfig(variant, options), {
        ...options
        // registerComposed: false
    });
}

export function useAlertThemeVariables(options: DefinitionOptions) {
    return nsvariables(ns, useAlertThemeConfig(options), {
        ...options,
        registerComposed: false
    });
}

/**
 * Selectors
 */

export function useAlertThemeLayoutSelectors(options: DefinitionOptions) {
    selector(
        '.alert',
        {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        },
        options
    );

    selector(
        '.alert-content',
        {
            flex: '0 1 100%'
        },
        options
    );

    selector(
        '.alert-icon',
        {
            flex: 1,
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        },
        options
    );

    selector(
        '.alert-dismiss',
        {
            flex: '0 0 auto',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        options
    );
}

export function useAlertThemeBaseSelectors(options: DefinitionOptions) {
    const {
        alertBorderStyle,
        alertBorderColor,
        alertBorderWidth,
        alertPaddingRight,
        alertPaddingLeft,
        alertPadding,
        alertBorderRadius,
        alertBoxShadow,
        alertBackground,
        alertColor,
        alertFontSize,
        alertTransitionProperty,
        alertTransitionDuration,
        alertTransitionTimingFunction,
        alertLinkFontWeight
    } = useAlertThemeVariables(options);

    selector(
        '.alert',
        {
            borderStyle: vref(alertBorderStyle),
            borderColor: vref(alertBorderColor),
            borderWidth: vref(alertBorderWidth),
            borderRadius: vref(alertBorderRadius),
            boxShadow: vref(alertBoxShadow),
            background: vref(alertBackground),
            color: vref(alertColor),
            fontSize: ref(alertFontSize),
            transitionProperty: vref(alertTransitionProperty),
            transitionDuration: vref(alertTransitionDuration),
            transitionTimingFunction: vref(alertTransitionTimingFunction)
        },
        options
    );

    selector(
        '.alert-content',
        {
            padding: vref(alertPadding)
        },
        options
    );

    selector(
        '.alert-content *:first-child',
        {
            marginTop: 0
        },
        options
    );

    selector(
        '.alert-content *:last-child',
        {
            marginBottom: 0
        },
        options
    );

    selector(
        '.alert-icon',
        {
            marginLeft: ref(alertPaddingLeft)
        },
        options
    );

    selector(
        '.alert-dismiss',
        {
            marginRight: ref(alertPaddingRight)
        },
        options
    );

    selector(
        '.alert code',
        {
            background: 'hsla(0, 0%, 0%, 0.05)'
        },
        options
    );

    selector(
        '.alert a',
        {
            color: vref(alertColor),
            fontWeight: ref(alertLinkFontWeight)
        },
        options
    );
}

export function useAlertThemeColorSelectors(
    variant: AlertColorVariant,
    options: DefinitionOptions
) {
    const {
        alertBackground,
        alertBorderTopColor,
        alertBorderRightColor,
        alertBorderBottomColor,
        alertBorderLeftColor,
        alertColor
    } = useAlertThemeVariables(options);

    const {
        variantBackground,
        variantBorderTopColor,
        variantBorderRightColor,
        variantBorderBottomColor,
        variantBorderLeftColor,
        variantColor
    } = setExportsNamespace(useAlertThemeColorVariables(variant, options), 'variant');

    selector(
        `.alert.-${variant}`,
        {
            [toVariableKey(alertBorderTopColor)]: ref(variantBorderTopColor),
            [toVariableKey(alertBorderRightColor)]: ref(variantBorderRightColor),
            [toVariableKey(alertBorderBottomColor)]: ref(variantBorderBottomColor),
            [toVariableKey(alertBorderLeftColor)]: ref(variantBorderLeftColor),
            [toVariableKey(alertBackground)]: ref(variantBackground),
            [toVariableKey(alertColor)]: ref(variantColor)
        },
        options
    );
}

export function useAlertThemeSizeSelectors(variant: AlertSizeVariant, options: DefinitionOptions) {
    const {
        alertPaddingTop,
        alertPaddingRight,
        alertPaddingBottom,
        alertPaddingLeft,
        alertBorderTopLeftRadius,
        alertBorderTopRightRadius,
        alertBorderBottomRightRadius,
        alertBorderBottomLeftRadius,
        alertFontSize
    } = useAlertThemeVariables(options);

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
    } = setExportsNamespace(useAlertThemeSizeVariables(variant, options), 'variant');

    selector(
        `.alert.-${variant}`,
        {
            [toVariableKey(alertBorderTopLeftRadius)]: ref(variantBorderTopLeftRadius),
            [toVariableKey(alertBorderTopRightRadius)]: ref(variantBorderTopRightRadius),
            [toVariableKey(alertBorderBottomRightRadius)]: ref(variantBorderBottomRightRadius),
            [toVariableKey(alertBorderBottomLeftRadius)]: ref(variantBorderBottomLeftRadius),
            [toVariableKey(alertFontSize)]: ref(variantFontSize),
            [toVariableKey(alertPaddingTop)]: ref(variantPaddingTop),
            [toVariableKey(alertPaddingRight)]: ref(variantPaddingRight),
            [toVariableKey(alertPaddingBottom)]: ref(variantPaddingBottom),
            [toVariableKey(alertPaddingLeft)]: ref(variantPaddingLeft)
        },
        options
    );
}

/**
 * Composables
 */

export function useAlertThemeColors(colors: AlertColorVariant[], options: DefinitionOptions) {
    colors.forEach((color) => useAlertThemeColorSelectors(color, options));
}

export function useAlertThemeSizes(sizes: AlertSizeVariant[], options: DefinitionOptions) {
    sizes.forEach((size) => useAlertThemeSizeSelectors(size, options));
}

export function useAlertTheme(options: DefinitionOptions) {
    useAlertThemeVariables(options);
    useAlertThemeLayoutSelectors(options);
    useAlertThemeBaseSelectors(options);
    useAlertThemeColors([...defaultAlertColors], options);
    useAlertThemeSizes([...defaultAlertSizes], options);
}
