import {
    useBorder,
    useBorderRadius,
    useBoxShadow,
    useFontSize,
    useTransition,
    useColors,
    useContrastTextColor,
    useFontWeight,
    useSpacing
} from '@inkline/theme';
import {
    multiply,
    ref,
    selector,
    nsvariables,
    vref,
    toVariableKey,
    setExportsNamespace,
    DefinitionOptions,
    defaultDefinitionOptions
} from '@inkline/core';
import { merge } from '@inkline/utils';

const ns = 'badge';

const defaultBadgeColor = 'light';
const defaultBadgeColors = [
    'light',
    'dark',
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info'
] as const;

const defaultBadgeSize = 'md';
const defaultBadgeSizes = ['sm', 'md', 'lg'] as const;

type BadgeColorVariant = (typeof defaultBadgeColors)[number];
type BadgeSizeVariant = (typeof defaultBadgeSizes)[number];

/**
 * Config
 */

export function useBadgeThemeColorConfig(
    variant: BadgeColorVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        colorLightShade50,
        colorLight,
        colorDarkTint50,
        colorDark,
        colorPrimaryShade50,
        colorPrimary,
        colorSecondaryShade50,
        colorSecondary,
        colorSuccessShade50,
        colorSuccess,
        colorDangerShade50,
        colorDanger,
        colorWarningShade50,
        colorWarning,
        colorInfoShade50,
        colorInfo
    } = useColors(options);
    const {
        contrastTextColorLight,
        contrastTextColorDark,
        contrastTextColorPrimary,
        contrastTextColorSecondary,
        contrastTextColorSuccess,
        contrastTextColorDanger,
        contrastTextColorWarning,
        contrastTextColorInfo
    } = useContrastTextColor(options);

    return {
        /**
         * @variant light
         */
        light: {
            border: {
                color: ref(colorLightShade50)
            },
            background: ref(colorLight),
            color: ref(contrastTextColorLight)
        },
        /**
         * @variant dark
         */
        dark: {
            border: {
                color: ref(colorDarkTint50)
            },
            background: ref(colorDark),
            color: ref(contrastTextColorDark)
        },
        /**
         * @variant primary
         */
        primary: {
            border: {
                color: ref(colorPrimaryShade50)
            },
            background: ref(colorPrimary),
            color: ref(contrastTextColorPrimary)
        },
        /**
         * @variant secondary
         */
        secondary: {
            border: {
                color: ref(colorSecondaryShade50)
            },
            background: ref(colorSecondary),
            color: ref(contrastTextColorSecondary)
        },
        /**
         * @variant success
         */
        success: {
            border: {
                color: ref(colorSuccessShade50)
            },
            background: ref(colorSuccess),
            color: ref(contrastTextColorSuccess)
        },
        /**
         * @variant danger
         */
        danger: {
            border: {
                color: ref(colorDangerShade50)
            },
            background: ref(colorDanger),
            color: ref(contrastTextColorDanger)
        },
        /**
         * @variant warning
         */
        warning: {
            border: {
                color: ref(colorWarningShade50)
            },
            background: ref(colorWarning),
            color: ref(contrastTextColorWarning)
        },
        /**
         * @variant info
         */
        info: {
            border: {
                color: ref(colorInfoShade50)
            },
            background: ref(colorInfo),
            color: ref(contrastTextColorInfo)
        }
    }[variant];
}

export function useBadgeThemeSizeConfig(variant: BadgeSizeVariant, userOptions: DefinitionOptions) {
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
    const { fontSizeXs, fontSizeSm, fontSizeMd } = useFontSize(options);
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
            fontSize: ref(fontSizeXs),
            padding: {
                top: multiply(ref(spacingSm), 0.25),
                right: multiply(ref(spacingSm), 0.5),
                bottom: multiply(ref(spacingSm), 0.25),
                left: multiply(ref(spacingSm), 0.5)
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
            fontSize: ref(fontSizeSm),
            padding: {
                top: multiply(ref(spacingMd), 0.25),
                right: multiply(ref(spacingMd), 0.5),
                bottom: multiply(ref(spacingMd), 0.25),
                left: multiply(ref(spacingMd), 0.5)
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
            fontSize: ref(fontSizeMd),
            padding: {
                top: multiply(ref(spacingLg), 0.25),
                right: multiply(ref(spacingLg), 0.5),
                bottom: multiply(ref(spacingLg), 0.25),
                left: multiply(ref(spacingLg), 0.5)
            }
        }
    }[variant];
}

export function useBadgeThemeConfig(userOptions: DefinitionOptions) {
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
            fontWeight: ref(fontWeightSemibold),
            transition: {
                property: ref(transitionProperty),
                duration: ref(transitionDuration),
                timingFunction: ref(transitionTimingFunction)
            },
            /**
             * @variant pill
             */
            pill: {
                borderRadius: {
                    topLeft: '50%',
                    topRight: '50%',
                    bottomLeft: '50%',
                    bottomRight: '50%'
                }
            }
        },
        useBadgeThemeColorConfig(defaultBadgeColor, options),
        useBadgeThemeSizeConfig(defaultBadgeSize, options)
    );
}

/**
 * Variables
 */

export function useBadgeThemeColorVariables(
    variant: BadgeColorVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables([ns, variant] as const, useBadgeThemeColorConfig(variant, options), {
        ...options,
        registerComposed: false
    });
}

export function useBadgeThemeSizeVariables(
    variant: BadgeSizeVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables([ns, variant] as const, useBadgeThemeSizeConfig(variant, options), {
        ...options,
        registerComposed: false
    });
}

export function useBadgeThemeVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables(ns, useBadgeThemeConfig(options), {
        ...options,
        registerComposed: false
    });
}

/**
 * Selectors
 */

export function useBadgeThemeLayoutSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    selector(
        '.badge',
        {
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        options
    );

    selector(
        'a:hover .badge, a:focus .badge',
        {
            textDecoration: 'none'
        },
        options
    );
}

export function useBadgeThemeBaseSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        badgeBorderStyle,
        badgeBorderTopColor,
        badgeBorderRightColor,
        badgeBorderBottomColor,
        badgeBorderLeftColor,
        badgeBorderWidth,
        badgePadding,
        badgeBorderRadius,
        badgeBoxShadow,
        badgeBackground,
        badgeColor,
        badgeFontSize,
        badgeFontWeight,
        badgeTransitionProperty,
        badgeTransitionDuration,
        badgeTransitionTimingFunction,
        badgePillBorderRadius
    } = useBadgeThemeVariables(options);

    selector(
        '.badge',
        {
            borderStyle: vref(badgeBorderStyle),
            borderTopColor: ref(badgeBorderTopColor),
            borderRightColor: ref(badgeBorderRightColor),
            borderBottomColor: ref(badgeBorderBottomColor),
            borderLeftColor: ref(badgeBorderLeftColor),
            borderWidth: vref(badgeBorderWidth),
            borderRadius: vref(badgeBorderRadius),
            boxShadow: vref(badgeBoxShadow),
            background: ref(badgeBackground),
            color: ref(badgeColor),
            fontSize: ref(badgeFontSize),
            fontWeight: vref(badgeFontWeight),
            padding: vref(badgePadding),
            transitionProperty: ref(badgeTransitionProperty),
            transitionDuration: ref(badgeTransitionDuration),
            transitionTimingFunction: ref(badgeTransitionTimingFunction)
        },
        options
    );

    selector(
        '.badge.-pill',
        {
            [toVariableKey(badgeBorderRadius)]: vref(badgePillBorderRadius)
        },
        options
    );

    selector(
        '.badge.-inherit',
        {
            fontSize: 'inherit'
        },
        options
    );
}

export function useBadgeThemeColorSelectors(
    variant: BadgeColorVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        badgeBackground,
        badgeBorderTopColor,
        badgeBorderRightColor,
        badgeBorderBottomColor,
        badgeBorderLeftColor,
        badgeColor
    } = useBadgeThemeVariables(options);

    const {
        variantBackground,
        variantBorderTopColor,
        variantBorderRightColor,
        variantBorderBottomColor,
        variantBorderLeftColor,
        variantColor
    } = setExportsNamespace(useBadgeThemeColorVariables(variant, options), 'variant');

    selector(
        `.badge.-${variant}`,
        {
            [toVariableKey(badgeBorderTopColor)]: ref(variantBorderTopColor),
            [toVariableKey(badgeBorderRightColor)]: ref(variantBorderRightColor),
            [toVariableKey(badgeBorderBottomColor)]: ref(variantBorderBottomColor),
            [toVariableKey(badgeBorderLeftColor)]: ref(variantBorderLeftColor),
            [toVariableKey(badgeBackground)]: ref(variantBackground),
            [toVariableKey(badgeColor)]: ref(variantColor)
        },
        options
    );
}

export function useBadgeThemeSizeSelectors(
    variant: BadgeSizeVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        badgeBorderTopLeftRadius,
        badgeBorderTopRightRadius,
        badgeBorderBottomRightRadius,
        badgeBorderBottomLeftRadius,
        badgeFontSize,
        badgePaddingTop,
        badgePaddingRight,
        badgePaddingBottom,
        badgePaddingLeft
    } = useBadgeThemeVariables(options);

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
    } = setExportsNamespace(useBadgeThemeSizeVariables(variant, options), 'variant');

    selector(
        `.badge.-${variant}`,
        {
            [toVariableKey(badgeBorderTopLeftRadius)]: ref(variantBorderTopLeftRadius),
            [toVariableKey(badgeBorderTopRightRadius)]: ref(variantBorderTopRightRadius),
            [toVariableKey(badgeBorderBottomRightRadius)]: ref(variantBorderBottomRightRadius),
            [toVariableKey(badgeBorderBottomLeftRadius)]: ref(variantBorderBottomLeftRadius),
            [toVariableKey(badgeFontSize)]: ref(variantFontSize),
            [toVariableKey(badgePaddingTop)]: ref(variantPaddingTop),
            [toVariableKey(badgePaddingRight)]: ref(variantPaddingRight),
            [toVariableKey(badgePaddingBottom)]: ref(variantPaddingBottom),
            [toVariableKey(badgePaddingLeft)]: ref(variantPaddingLeft)
        },
        options
    );
}

/**
 * Composables
 */

export function useBadgeThemeColors(colors: BadgeColorVariant[], userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    colors.forEach((color) => useBadgeThemeColorSelectors(color, options));
}

export function useBadgeThemeSizes(sizes: BadgeSizeVariant[], userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    sizes.forEach((size) => useBadgeThemeSizeSelectors(size, options));
}

export function useBadgeTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useBadgeThemeVariables(options);
    useBadgeThemeLayoutSelectors(options);
    useBadgeThemeBaseSelectors(options);
    useBadgeThemeColors([...defaultBadgeColors], options);
    useBadgeThemeSizes([...defaultBadgeSizes], options);
}
