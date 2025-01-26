import {
    multiply,
    ref,
    selector,
    nsvariables,
    keyframes,
    setExportsNamespace,
    vref,
    toVariableKey,
    defaultDefinitionOptions,
    DefinitionOptions
} from '@inkline/core';
import { merge } from '@inkline/utils';
import {
    useBorder,
    useBorderRadius,
    useBoxShadow,
    useBrandColorVariants,
    useFontSize,
    useTransition,
    useFontWeight,
    useNeutralColors,
    useContrastTextColor,
    useBrandColors,
    useSpacing
} from '@inkline/theme';

const ns = 'toast';

const defaultToastColor = 'light';
const defaultToastColors = [
    'light',
    'dark',
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info'
] as const;

const defaultToastSize = 'md';
const defaultToastSizes = ['sm', 'md', 'lg'] as const;

type ToastColorVariant = (typeof defaultToastColors)[number];
type ToastSizeVariant = (typeof defaultToastSizes)[number];

/**
 * Config
 */

export function useToastThemeColorConfig(
    variant: ToastColorVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };
    const { colorWhite } = useNeutralColors(options);
    const { colorLightShade50, colorDark } = useBrandColors(options);
    const {
        colorDarkTint50,
        colorPrimary100,
        colorPrimary800,
        colorPrimaryShade50,
        colorSecondary100,
        colorSecondary800,
        colorSecondaryShade50,
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
    const { contrastTextColorLight, contrastTextColorDark } = useContrastTextColor(options);

    const commonLight = {
        /**
         * @element progress
         */
        progress: {
            background: 'rgba(0, 0, 0, 0.05)',

            /**
             * @element bar
             */
            bar: {
                background: 'rgba(0, 0, 0, 0.15)'
            }
        },
        /**
         * @element code
         */
        code: {
            background: 'hsla(0, 0%, 0%, 0.05)'
        }
    };
    const commonDark = {
        /**
         * @element progress
         */
        progress: {
            background: 'rgba(255, 255, 255, 0.05)',
            /**
             * @element bar
             */
            bar: {
                background: 'rgba(255, 255, 255, 0.15)'
            }
        },
        /**
         * @element code
         */
        code: {
            background: 'hsla(0, 0%, 100%, 0.05)'
        }
    };

    return {
        /**
         * @variant light
         */
        light: {
            border: {
                color: ref(colorLightShade50)
            },
            background: ref(colorWhite),
            color: ref(contrastTextColorLight),
            ...commonLight
        },
        /**
         * @variant dark
         */
        dark: {
            border: {
                color: ref(colorDarkTint50)
            },
            background: ref(colorDark),
            color: ref(contrastTextColorDark),
            ...commonDark
        },
        /**
         * @variant primary
         */
        primary: {
            border: {
                color: ref(colorPrimaryShade50)
            },
            background: ref(colorPrimary100),
            color: ref(colorPrimary800),
            ...commonLight
        },
        /**
         * @variant secondary
         */
        secondary: {
            border: {
                color: ref(colorSecondaryShade50)
            },
            background: ref(colorSecondary100),
            color: ref(colorSecondary800),
            ...commonLight
        },
        /**
         * @variant info
         */
        info: {
            border: {
                color: ref(colorInfoShade50)
            },
            background: ref(colorInfo100),
            color: ref(colorInfo800),
            ...commonLight
        },
        /**
         * @variant success
         */
        success: {
            border: {
                color: ref(colorSuccessShade50)
            },
            background: ref(colorSuccess100),
            color: ref(colorSuccess800),
            ...commonLight
        },
        /**
         * @variant warning
         */
        warning: {
            border: {
                color: ref(colorWarningShade50)
            },
            background: ref(colorWarning100),
            color: ref(colorWarning800),
            ...commonLight
        },
        /**
         * @variant danger
         */
        danger: {
            border: {
                color: ref(colorDangerShade50)
            },
            background: ref(colorDanger100),
            color: ref(colorDanger800),
            ...commonLight
        }
    }[variant];
}

export function useToastThemeSizeConfig(variant: ToastSizeVariant, userOptions: DefinitionOptions) {
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
            },
            /**
             * @element progress
             */
            progress: {
                height: multiply(ref(spacingSm), 0.25)
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
            },
            /**
             * @element progress
             */
            progress: {
                height: multiply(ref(spacingMd), 0.25)
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
            },
            /**
             * @element progress
             */
            progress: {
                height: multiply(ref(spacingLg), 0.25)
            }
        }
    }[variant];
}

export function useToastThemeConfig(userOptions: DefinitionOptions) {
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
    const { fontSize } = useFontSize(options);
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
            },
            /**
             * @element title
             */
            title: {
                fontWeight: ref(fontWeightSemibold),
                fontSize: ref(fontSize)
            }
        },
        useToastThemeColorConfig(defaultToastColor, options),
        useToastThemeSizeConfig(defaultToastSize, options)
    );
}

/**
 * Variables
 */

export function useToastThemeColorVariables(
    variant: ToastColorVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables([ns, variant] as const, useToastThemeColorConfig(variant, options), {
        ...options,
        registerComposed: false
    });
}

export function useToastThemeSizeVariables(
    variant: ToastSizeVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables([ns, variant] as const, useToastThemeSizeConfig(variant, options), {
        ...options,
        registerComposed: false
    });
}

export function useToastThemeVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables(ns, useToastThemeConfig(options), {
        ...options,
        registerComposed: false
    });
}

/**
 * Selectors
 */

export function useToastThemeLayoutSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { toastProgressHeight } = useToastThemeVariables(options);

    selector(
        '.toast',
        {
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
            flex: '1 1 auto',
            alignItems: 'center',
            minWidth: 0,
            wordWrap: 'break-word',
            overflow: 'hidden',
            backgroundClip: 'border-box'
        },
        options
    );

    selector(
        '.toast-content',
        {
            flex: '0 1 100%'
        },
        options
    );

    selector(
        '.toast-icon',
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
        '.toast-dismiss',
        {
            flex: '0 0 auto',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        options
    );

    selector(
        '.toast-progress',
        {
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            zIndex: 1,
            height: ref(toastProgressHeight)
        },
        options
    );

    selector(
        '.toast-progress-bar',
        {
            animation: 'toast-duration var(--toast--duration) forwards',
            transformOrigin: 'left center',
            width: '100%',
            height: '100%'
        },
        options
    );

    keyframes(
        'toast-duration',
        {
            to: {
                transform: 'scaleX(0)'
            }
        },
        options
    );
}

export function useToastThemeBaseSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        toastBorderStyle,
        toastBorderColor,
        toastBorderWidth,
        toastPaddingRight,
        toastPaddingLeft,
        toastPadding,
        toastBorderRadius,
        toastBoxShadow,
        toastBackground,
        toastColor,
        toastFontSize,
        toastTransitionProperty,
        toastTransitionDuration,
        toastTransitionTimingFunction,
        toastLinkFontWeight,
        toastTitleFontWeight,
        toastTitleFontSize,
        toastProgressBackground,
        toastProgressBarBackground,
        toastCodeBackground
    } = useToastThemeVariables(options);

    selector(
        '.toast',
        {
            borderStyle: vref(toastBorderStyle),
            borderColor: vref(toastBorderColor),
            borderWidth: vref(toastBorderWidth),
            borderRadius: vref(toastBorderRadius),
            boxShadow: vref(toastBoxShadow),
            background: ref(toastBackground),
            color: ref(toastColor),
            fontSize: ref(toastFontSize),
            transitionProperty: ref(toastTransitionProperty),
            transitionDuration: ref(toastTransitionDuration),
            transitionTimingFunction: ref(toastTransitionTimingFunction)
        },
        options
    );

    selector(
        '.toast-content',
        {
            padding: vref(toastPadding)
        },
        options
    );

    selector(
        '.toast-content *:first-child',
        {
            marginTop: 0
        },
        options
    );

    selector(
        '.toast-content > .toast-title',
        {
            fontWeight: ref(toastTitleFontWeight),
            fontSize: ref(toastTitleFontSize)
        },
        options
    );

    selector(
        '.toast-content *:last-child',
        {
            marginBottom: 0
        },
        options
    );

    selector(
        '.toast-icon',
        {
            marginLeft: ref(toastPaddingLeft)
        },
        options
    );

    selector(
        '.toast-dismiss',
        {
            marginRight: ref(toastPaddingRight)
        },
        options
    );

    selector(
        '.toast code',
        {
            background: ref(toastCodeBackground)
        },
        options
    );

    selector(
        '.toast a',
        {
            fontWeight: ref(toastLinkFontWeight)
        },
        options
    );

    selector(
        '.toast-progress',
        {
            background: ref(toastProgressBackground)
        },
        options
    );

    selector(
        '.toast-progress-bar',
        {
            background: ref(toastProgressBarBackground)
        },
        options
    );
}

export function useToastThemeSizeSelectors(
    variant: ToastSizeVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        toastPaddingTop,
        toastPaddingRight,
        toastPaddingBottom,
        toastPaddingLeft,
        toastBorderTopLeftRadius,
        toastBorderTopRightRadius,
        toastBorderBottomRightRadius,
        toastBorderBottomLeftRadius,
        toastFontSize
    } = useToastThemeVariables(options);

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
    } = setExportsNamespace(useToastThemeSizeVariables(variant, options), 'variant');

    selector(
        `.toast.-${variant}`,
        {
            [toVariableKey(toastBorderTopLeftRadius)]: ref(variantBorderTopLeftRadius),
            [toVariableKey(toastBorderTopRightRadius)]: ref(variantBorderTopRightRadius),
            [toVariableKey(toastBorderBottomRightRadius)]: ref(variantBorderBottomRightRadius),
            [toVariableKey(toastBorderBottomLeftRadius)]: ref(variantBorderBottomLeftRadius),
            [toVariableKey(toastFontSize)]: ref(variantFontSize),
            [toVariableKey(toastPaddingTop)]: ref(variantPaddingTop),
            [toVariableKey(toastPaddingRight)]: ref(variantPaddingRight),
            [toVariableKey(toastPaddingBottom)]: ref(variantPaddingBottom),
            [toVariableKey(toastPaddingLeft)]: ref(variantPaddingLeft)
        },
        options
    );
}

export function useToastThemeColorSelectors(
    variant: ToastColorVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        toastBorderTopColor,
        toastBorderRightColor,
        toastBorderBottomColor,
        toastBorderLeftColor,
        toastBackground,
        toastColor,
        toastProgressBackground,
        toastProgressBarBackground,
        toastCodeBackground
    } = useToastThemeVariables(options);

    const {
        variantBorderTopColor,
        variantBorderRightColor,
        variantBorderBottomColor,
        variantBorderLeftColor,
        variantBackground,
        variantColor,
        variantProgressBackground,
        variantProgressBarBackground,
        variantCodeBackground
    } = setExportsNamespace(useToastThemeColorVariables(variant, options), 'variant');

    selector(
        `.toast.-${variant}`,
        {
            [toVariableKey(toastBorderTopColor)]: ref(variantBorderTopColor),
            [toVariableKey(toastBorderRightColor)]: ref(variantBorderRightColor),
            [toVariableKey(toastBorderBottomColor)]: ref(variantBorderBottomColor),
            [toVariableKey(toastBorderLeftColor)]: ref(variantBorderLeftColor),
            [toVariableKey(toastBackground)]: ref(variantBackground),
            [toVariableKey(toastColor)]: ref(variantColor),
            [toVariableKey(toastProgressBackground)]: ref(variantProgressBackground),
            [toVariableKey(toastProgressBarBackground)]: ref(variantProgressBarBackground),
            [toVariableKey(toastCodeBackground)]: ref(variantCodeBackground)
        },
        options
    );
}

/**
 * Composables
 */

export function useToastThemeSizes(sizes: ToastSizeVariant[], userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    sizes.forEach((size) => useToastThemeSizeSelectors(size, options));
}

export function useToastThemeColors(colors: ToastColorVariant[], userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    colors.forEach((color) => useToastThemeColorSelectors(color, options));
}

export function useToastTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useToastThemeLayoutSelectors(options);
    useToastThemeBaseSelectors(options);
    useToastThemeSizes([...defaultToastSizes], options);
    useToastThemeColors([...defaultToastColors], options);
}
