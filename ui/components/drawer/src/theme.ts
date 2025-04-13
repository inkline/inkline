import {
    ref,
    selector,
    nsvariables,
    multiply,
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

const ns = 'drawer';

const defaultDrawerColor = 'light';
const defaultDrawerColors = [
    'light',
    'dark',
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info'
] as const;

const defaultDrawerSize = 'md';
const defaultDrawerSizes = ['sm', 'md', 'lg'] as const;

type DrawerColorVariant = (typeof defaultDrawerColors)[number];
type DrawerSizeVariant = (typeof defaultDrawerSizes)[number];

/**
 * Config
 */

export function useDrawerThemeColorConfig(
    variant: DrawerColorVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        colorWhite,
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
            background: ref(colorWhite),
            color: ref(contrastTextColorLight),
            /**
             * @element header
             */
            header: {
                background: ref(colorLight)
            },
            /**
             * @element footer
             */
            footer: {
                background: ref(colorLight)
            }
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
            /**
             * @element header
             */
            header: {
                background: ref(colorDarkTint50)
            },
            /**
             * @element footer
             */
            footer: {
                background: ref(colorDarkTint50)
            }
        },
        /**
         * @variant primary
         */
        primary: {
            border: {
                color: ref(colorPrimaryShade50)
            },
            background: ref(colorPrimary),
            color: ref(contrastTextColorPrimary),
            /**
             * @element header
             */
            header: {
                background: ref(colorPrimaryShade50)
            },
            /**
             * @element footer
             */
            footer: {
                background: ref(colorPrimaryShade50)
            }
        },
        /**
         * @variant secondary
         */
        secondary: {
            border: {
                color: ref(colorSecondaryShade50)
            },
            background: ref(colorSecondary),
            color: ref(contrastTextColorSecondary),
            /**
             * @element header
             */
            header: {
                background: ref(colorSecondaryShade50)
            },
            /**
             * @element footer
             */
            footer: {
                background: ref(colorSecondaryShade50)
            }
        },
        /**
         * @variant success
         */
        success: {
            border: {
                color: ref(colorSuccessShade50)
            },
            background: ref(colorSuccess),
            color: ref(contrastTextColorSuccess),
            /**
             * @element header
             */
            header: {
                background: ref(colorSuccessShade50)
            },
            /**
             * @element footer
             */
            footer: {
                background: ref(colorSuccessShade50)
            }
        },
        /**
         * @variant danger
         */
        danger: {
            border: {
                color: ref(colorDangerShade50)
            },
            background: ref(colorDanger),
            color: ref(contrastTextColorDanger),
            /**
             * @element header
             */
            header: {
                background: ref(colorDangerShade50)
            },
            /**
             * @element footer
             */
            footer: {
                background: ref(colorDangerShade50)
            }
        },
        /**
         * @variant warning
         */
        warning: {
            border: {
                color: ref(colorWarningShade50)
            },
            background: ref(colorWarning),
            color: ref(contrastTextColorWarning),
            /**
             * @element header
             */
            header: {
                background: ref(colorWarningShade50)
            },
            /**
             * @element footer
             */
            footer: {
                background: ref(colorWarningShade50)
            }
        },
        /**
         * @variant info
         */
        info: {
            border: {
                color: ref(colorInfoShade50)
            },
            background: ref(colorInfo),
            color: ref(contrastTextColorInfo),
            /**
             * @element header
             */
            header: {
                background: ref(colorInfoShade50)
            },
            /**
             * @element footer
             */
            footer: {
                background: ref(colorInfoShade50)
            }
        }
    }[variant];
}

export function useDrawerThemeSizeConfig(
    variant: DrawerSizeVariant,
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
            maxWidth: multiply(ref(spacingSm), 30),
            /**
             * @element close
             */
            close: {
                size: multiply(ref(fontSizeSm), 1.5),
                fontSize: multiply(ref(fontSizeSm), 0.5)
            },
            /**
             * @element icon
             */
            icon: {
                margin: {
                    right: ref(spacingSm)
                }
            },
            /**
             * @element footer
             */
            footer: {
                /**
                 * @element button
                 */
                button: {
                    margin: {
                        left: multiply(ref(spacingSm), 0.5)
                    }
                }
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
            maxWidth: multiply(ref(spacingMd), 30),
            /**
             * @element close
             */
            close: {
                size: multiply(ref(fontSizeMd), 1.5),
                fontSize: multiply(ref(fontSizeMd), 0.5)
            },
            /**
             * @element icon
             */
            icon: {
                margin: {
                    right: ref(spacingMd)
                }
            },
            /**
             * @element footer
             */
            footer: {
                /**
                 * @element button
                 */
                button: {
                    margin: {
                        left: multiply(ref(spacingMd), 0.5)
                    }
                }
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
            maxWidth: multiply(ref(spacingLg), 30),
            /**
             * @element close
             */
            close: {
                size: multiply(ref(fontSizeLg), 1.5),
                fontSize: multiply(ref(fontSizeLg), 0.5)
            },
            /**
             * @element icon
             */
            icon: {
                margin: {
                    right: ref(spacingLg)
                }
            },
            /**
             * @element footer
             */
            footer: {
                /**
                 * @element button
                 */
                button: {
                    margin: {
                        left: multiply(ref(spacingLg), 0.5)
                    }
                }
            }
        }
    }[variant];
}

export function useDrawerThemeConfig(userOptions: DefinitionOptions) {
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
    const { contrastTextColorLight } = useContrastTextColor(options);
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
            width: '100%',
            zIndex: 2000,
            /**
             * @element wrapper
             */
            wrapper: {
                background: 'rgba(0, 0, 0, 0.75)'
            },
            /**
             * @element close
             */
            close: {
                color: ref(contrastTextColorLight),
                hover: {
                    background: 'rgba(0, 0, 0, 0.1)'
                },
                active: {
                    background: 'rgba(0, 0, 0, 0.15)'
                }
            }
        },
        useDrawerThemeColorConfig(defaultDrawerColor, options),
        useDrawerThemeSizeConfig(defaultDrawerSize, options)
    );
}

/**
 * Variables
 */

export function useDrawerThemeColorVariables(
    variant: DrawerColorVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables([ns, variant] as const, useDrawerThemeColorConfig(variant, options), {
        ...options,
        registerComposed: false
    });
}

export function useDrawerThemeSizeVariables(
    variant: DrawerSizeVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables([ns, variant] as const, useDrawerThemeSizeConfig(variant, options), {
        ...options,
        registerComposed: false
    });
}

export function useDrawerThemeVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables(ns, useDrawerThemeConfig(options), {
        ...options,
        registerComposed: false
    });
}

/**
 * Selectors
 */

export function useDrawerThemeLayoutSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { drawerZIndex } = useDrawerThemeVariables(options);

    selector(
        '.drawer-wrapper',
        {
            position: 'fixed',
            top: '0',
            left: '0',
            zIndex: ref(drawerZIndex),
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        options
    );

    selector(
        [
            '.drawer-wrapper.-alert > .drawer > .drawer-footer',
            '.drawer-wrapper.-confirm > .drawer > .drawer-footer',
            '.drawer-wrapper.-prompt > .drawer > .drawer-footer'
        ],
        {
            display: 'flex',
            justifyContent: 'flex-end'
        },
        options
    );

    selector(
        '.drawer',
        {
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            minWidth: '0',
            wordWrap: 'break-word',
            backgroundClip: 'border-box',
            textAlign: 'left'
        },
        options
    );

    selector(
        '.drawer > .drawer-header',
        {
            display: 'flex',
            justifyContent: 'space-between'
        },
        options
    );

    selector(
        '.drawer > .drawer-body',
        {
            display: 'flex',
            flexDirection: 'row'
        },
        options
    );

    selector(
        '.drawer > .drawer-footer',
        {
            display: 'flex',
            justifyContent: 'flex-end'
        },
        options
    );

    selector(
        '.drawer .drawer-content',
        {
            width: '100%',
            display: 'block'
        },
        options
    );

    selector(
        '.drawer .drawer-close',
        {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '1.5rem',
            width: '1.5rem',
            lineHeight: '1.5rem',
            fontSize: '0.5rem',
            cursor: 'pointer',
            padding: '0',
            border: '0',
            transition: 'background-color 0.3s ease',
            backgroundColor: 'transparent'
        },
        options
    );
}

export function useDrawerThemeBaseSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        drawerBorderStyle,
        drawerBorderTopColor,
        drawerBorderRightColor,
        drawerBorderBottomColor,
        drawerBorderLeftColor,
        drawerBorderWidth,
        drawerPadding,
        drawerBorderRadius,
        drawerBoxShadow,
        drawerBackground,
        drawerColor,
        drawerFontSize,
        drawerTransitionProperty,
        drawerTransitionDuration,
        drawerTransitionTimingFunction,
        drawerWrapperBackground,
        drawerMaxWidth,
        drawerWidth,
        drawerHeaderBackground,
        drawerFooterBackground,
        drawerFooterButtonMargin,
        drawerIconMargin
    } = useDrawerThemeVariables(options);

    selector(
        '.drawer-wrapper',
        {
            background: ref(drawerWrapperBackground)
        },
        options
    );

    selector(
        '.drawer',
        {
            maxWidth: ref(drawerMaxWidth),
            width: ref(drawerWidth),
            boxShadow: vref(drawerBoxShadow),
            color: ref(drawerColor),
            fontSize: ref(drawerFontSize)
        },
        options
    );

    selector(
        '.drawer-header',
        {
            background: ref(drawerHeaderBackground),
            borderRadius: vref(drawerBorderRadius),
            color: ref(drawerColor),
            borderStyle: vref(drawerBorderStyle),
            borderTopColor: ref(drawerBorderTopColor),
            borderRightColor: ref(drawerBorderRightColor),
            borderBottomColor: ref(drawerBorderBottomColor),
            borderLeftColor: ref(drawerBorderLeftColor),
            borderWidth: vref(drawerBorderWidth),
            padding: vref(drawerPadding),
            transitionProperty: ref(drawerTransitionProperty),
            transitionDuration: ref(drawerTransitionDuration),
            transitionTimingFunction: ref(drawerTransitionTimingFunction)
        },
        options
    );

    selector(
        '.drawer-body',
        {
            background: ref(drawerBackground),
            borderRadius: vref(drawerBorderRadius),
            borderStyle: vref(drawerBorderStyle),
            borderTopColor: ref(drawerBorderTopColor),
            borderRightColor: ref(drawerBorderRightColor),
            borderBottomColor: ref(drawerBorderBottomColor),
            borderLeftColor: ref(drawerBorderLeftColor),
            borderWidth: vref(drawerBorderWidth),
            color: ref(drawerColor),
            padding: vref(drawerPadding),
            transitionProperty: ref(drawerTransitionProperty),
            transitionDuration: ref(drawerTransitionDuration),
            transitionTimingFunction: ref(drawerTransitionTimingFunction)
        },
        options
    );

    selector(
        '.drawer-footer',
        {
            background: ref(drawerFooterBackground),
            borderRadius: vref(drawerBorderRadius),
            color: ref(drawerColor),
            borderStyle: vref(drawerBorderStyle),
            borderTopColor: ref(drawerBorderTopColor),
            borderRightColor: ref(drawerBorderRightColor),
            borderBottomColor: ref(drawerBorderBottomColor),
            borderLeftColor: ref(drawerBorderLeftColor),
            borderWidth: vref(drawerBorderWidth),
            padding: vref(drawerPadding),
            transitionProperty: ref(drawerTransitionProperty),
            transitionDuration: ref(drawerTransitionDuration),
            transitionTimingFunction: ref(drawerTransitionTimingFunction)
        },
        options
    );

    selector(
        '.drawer-header + .drawer-body',
        {
            borderTop: '0'
        },
        options
    );

    selector(
        '.drawer-body:has(+ .drawer-footer)',
        {
            borderBottom: '0'
        },
        options
    );

    selector(
        '.drawer > *:not(:first-child)',
        {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0
        },
        options
    );

    selector(
        '.drawer > *:not(:last-child)',
        {
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0
        },
        options
    );

    selector(
        '.drawer .drawer-close',
        {
            color: ref(drawerColor)
        },
        options
    );

    selector(
        '.drawer .drawer-icon',
        {
            margin: vref(drawerIconMargin),
            alignItems: 'center',
            display: 'flex'
        },
        options
    );

    selector(
        '.drawer-wrapper .drawer-footer .button + .button',
        {
            margin: vref(drawerFooterButtonMargin)
        },
        options
    );
}

export function useDrawerThemeColorSelectors(
    variant: DrawerColorVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        drawerBorderTopColor,
        drawerBorderRightColor,
        drawerBorderBottomColor,
        drawerBorderLeftColor,
        drawerBackground,
        drawerColor,
        drawerHeaderBackground,
        drawerFooterBackground
    } = useDrawerThemeVariables(options);

    const {
        variantBorderTopColor,
        variantBorderRightColor,
        variantBorderBottomColor,
        variantBorderLeftColor,
        variantBackground,
        variantColor,
        variantHeaderBackground,
        variantFooterBackground
    } = setExportsNamespace(useDrawerThemeColorVariables(variant, options), 'variant');

    selector(
        [`.drawer.-${variant}`],
        {
            [toVariableKey(drawerBorderTopColor)]: ref(variantBorderTopColor),
            [toVariableKey(drawerBorderRightColor)]: ref(variantBorderRightColor),
            [toVariableKey(drawerBorderBottomColor)]: ref(variantBorderBottomColor),
            [toVariableKey(drawerBorderLeftColor)]: ref(variantBorderLeftColor),
            [toVariableKey(drawerBackground)]: ref(variantBackground),
            [toVariableKey(drawerColor)]: ref(variantColor),
            [toVariableKey(drawerHeaderBackground)]: ref(variantHeaderBackground),
            [toVariableKey(drawerFooterBackground)]: ref(variantFooterBackground)
        },
        options
    );
}

export function useDrawerThemeSizeSelectors(
    variant: DrawerSizeVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        drawerBorderTopLeftRadius,
        drawerBorderTopRightRadius,
        drawerBorderBottomRightRadius,
        drawerBorderBottomLeftRadius,
        drawerFontSize,
        drawerMaxWidth,
        drawerPaddingTop,
        drawerPaddingRight,
        drawerPaddingBottom,
        drawerPaddingLeft
    } = useDrawerThemeVariables(options);

    const {
        variantBorderTopLeftRadius,
        variantBorderTopRightRadius,
        variantBorderBottomRightRadius,
        variantBorderBottomLeftRadius,
        variantFontSize,
        variantMaxWidth,
        variantPaddingTop,
        variantPaddingRight,
        variantPaddingBottom,
        variantPaddingLeft
    } = setExportsNamespace(useDrawerThemeSizeVariables(variant, options), 'variant');

    selector(
        `.drawer.-${variant}`,
        {
            [toVariableKey(drawerBorderTopLeftRadius)]: ref(variantBorderTopLeftRadius),
            [toVariableKey(drawerBorderTopRightRadius)]: ref(variantBorderTopRightRadius),
            [toVariableKey(drawerBorderBottomRightRadius)]: ref(variantBorderBottomRightRadius),
            [toVariableKey(drawerBorderBottomLeftRadius)]: ref(variantBorderBottomLeftRadius),
            [toVariableKey(drawerFontSize)]: ref(variantFontSize),
            [toVariableKey(drawerMaxWidth)]: ref(variantMaxWidth),
            [toVariableKey(drawerPaddingTop)]: ref(variantPaddingTop),
            [toVariableKey(drawerPaddingRight)]: ref(variantPaddingRight),
            [toVariableKey(drawerPaddingBottom)]: ref(variantPaddingBottom),
            [toVariableKey(drawerPaddingLeft)]: ref(variantPaddingLeft)
        },
        options
    );
}

export function useDrawerThemeVariantsSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    // Fullscreen variant
    selector(
        '.drawer.-fullscreen',
        {
            width: '100%',
            height: '100%',
            maxWidth: '100%',
            display: 'flex',
            flexDirection: 'column'
        },
        options
    );

    selector(
        [
            '.drawer.-fullscreen > .drawer-header',
            '.drawer.-fullscreen > .drawer-body',
            '.drawer.-fullscreen > .drawer-footer'
        ],
        {
            borderRadius: 0
        },
        options
    );

    selector(
        '.drawer.-fullscreen > .drawer-body',
        {
            flex: '1',
            overflow: 'auto'
        },
        options
    );
    
    // Position variants
    selector(
        ['.drawer-wrapper.-top', '.drawer-wrapper.-bottom', '.drawer-wrapper.-left', '.drawer-wrapper.-right'],
        {
            justifyContent: 'flex-start',
            alignItems: 'flex-start'
        },
        options
    );

    // Top position
    selector(
        '.drawer.-top',
        {
            width: '100%',
            maxWidth: '100%',
            marginTop: '0',
            marginBottom: '0',
            height: 'auto',
            maxHeight: '80vh',
            transformOrigin: 'top center',
            borderTopLeftRadius: '0',
            borderTopRightRadius: '0'
        },
        options
    );

    // Right position
    selector(
        '.drawer.-right',
        {
            height: '100%',
            maxHeight: '100%',
            marginRight: '0',
            marginLeft: 'auto',
            width: 'auto',
            maxWidth: '80vw',
            transformOrigin: 'center right',
            borderTopRightRadius: '0',
            borderBottomRightRadius: '0'
        },
        options
    );

    // Bottom position
    selector(
        '.drawer.-bottom',
        {
            width: '100%',
            maxWidth: '100%',
            marginTop: 'auto',
            marginBottom: '0',
            height: 'auto',
            maxHeight: '80vh',
            transformOrigin: 'bottom center',
            borderBottomLeftRadius: '0',
            borderBottomRightRadius: '0'
        },
        options
    );

    // Left position
    selector(
        '.drawer.-left',
        {
            height: '100%',
            maxHeight: '100%',
            marginRight: 'auto',
            marginLeft: '0',
            width: 'auto',
            maxWidth: '80vw',
            transformOrigin: 'center left',
            borderTopLeftRadius: '0',
            borderBottomLeftRadius: '0'
        },
        options
    );
}

/**
 * Composables
 */

export function useDrawerThemeColors(colors: DrawerColorVariant[], userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    colors.forEach((color) => useDrawerThemeColorSelectors(color, options));
}

export function useDrawerThemeSizes(sizes: DrawerSizeVariant[], userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    sizes.forEach((size) => useDrawerThemeSizeSelectors(size, options));
}

export function useDrawerTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useDrawerThemeVariables(options);
    useDrawerThemeLayoutSelectors(options);
    useDrawerThemeBaseSelectors(options);
    useDrawerThemeColors([...defaultDrawerColors], options);
    useDrawerThemeSizes([...defaultDrawerSizes], options);
    useDrawerThemeVariantsSelectors(options);
}
