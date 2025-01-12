import {
    ref,
    selector,
    nsvariables,
    multiply,
    vref,
    setExportsNamespace,
    toVariableKey,
    DefinitionOptions
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

const ns = 'modal';

const defaultModalColor = 'light';
const defaultModalColors = [
    'light',
    'dark',
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info'
] as const;

const defaultModalSize = 'md';
const defaultModalSizes = ['sm', 'md', 'lg'] as const;

type ModalColorVariant = (typeof defaultModalColors)[number];
type ModalSizeVariant = (typeof defaultModalSizes)[number];

/**
 * Config
 */

export function useModalThemeColorConfig(variant: ModalColorVariant, options: DefinitionOptions) {
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
            color: ref(contrastTextColorLight),
            /**
             * @element header
             */
            header: {
                background: ref(colorLightShade50)
            },
            /**
             * @element footer
             */
            footer: {
                background: ref(colorLightShade50)
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

export function useModalThemeSizeConfig(variant: ModalSizeVariant, options: DefinitionOptions) {
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

export function useModalThemeConfig(options: DefinitionOptions) {
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
        useModalThemeColorConfig(defaultModalColor, options),
        useModalThemeSizeConfig(defaultModalSize, options)
    );
}

/**
 * Variables
 */

export function useModalThemeColorVariables(
    variant: ModalColorVariant,
    options: DefinitionOptions
) {
    return nsvariables(ns, useModalThemeColorConfig(variant, options), {
        ...options,
        registerComposed: false
    });
}

export function useModalThemeSizeVariables(variant: ModalSizeVariant, options: DefinitionOptions) {
    return nsvariables(ns, useModalThemeSizeConfig(variant, options), {
        ...options,
        registerComposed: false
    });
}

export function useModalThemeVariables(options: DefinitionOptions) {
    return nsvariables(ns, useModalThemeConfig(options), {
        ...options,
        registerComposed: false
    });
}

/**
 * Selectors
 */

export function useModalThemeLayoutSelectors(options: DefinitionOptions) {
    const { modalZIndex } = useModalThemeVariables(options);

    selector(
        '.modal-wrapper',
        {
            position: 'fixed',
            top: '0',
            left: '0',
            zIndex: ref(modalZIndex),
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
            '.modal-wrapper.-alert > .modal > .modal-footer',
            '.modal-wrapper.-confirm > .modal > .modal-footer',
            '.modal-wrapper.-prompt > .modal > .modal-footer'
        ],
        {
            display: 'flex',
            justifyContent: 'flex-end'
        },
        options
    );

    selector(
        '.modal',
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
        '.modal > .modal-header',
        {
            display: 'flex',
            justifyContent: 'space-between'
        },
        options
    );

    selector(
        '.modal > .modal-body',
        {
            display: 'flex',
            flexDirection: 'row'
        },
        options
    );

    selector(
        '.modal > .modal-footer',
        {
            display: 'flex',
            justifyContent: 'flex-end'
        },
        options
    );

    selector(
        '.modal .modal-content',
        {
            width: '100%',
            display: 'block'
        },
        options
    );

    selector(
        '.modal .modal-close',
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

export function useModalThemeBaseSelectors(options: DefinitionOptions) {
    const {
        modalBorderStyle,
        modalBorderTopColor,
        modalBorderRightColor,
        modalBorderBottomColor,
        modalBorderLeftColor,
        modalBorderWidth,
        modalPadding,
        modalBorderRadius,
        modalBoxShadow,
        modalBackground,
        modalColor,
        modalFontSize,
        modalTransitionProperty,
        modalTransitionDuration,
        modalTransitionTimingFunction,
        modalWrapperBackground,
        modalMaxWidth,
        modalWidth,
        modalHeaderBackground,
        modalFooterBackground,
        modalFooterButtonMargin,
        modalIconMargin
    } = useModalThemeVariables(options);

    selector(
        '.modal-wrapper',
        {
            background: vref(modalWrapperBackground)
        },
        options
    );

    selector(
        '.modal',
        {
            maxWidth: ref(modalMaxWidth),
            width: ref(modalWidth),
            boxShadow: vref(modalBoxShadow),
            color: vref(modalColor),
            fontSize: ref(modalFontSize)
        },
        options
    );

    selector(
        '.modal-header',
        {
            background: vref(modalHeaderBackground),
            borderRadius: vref(modalBorderRadius),
            color: vref(modalColor),
            borderStyle: vref(modalBorderStyle),
            borderTopColor: vref(modalBorderTopColor),
            borderRightColor: vref(modalBorderRightColor),
            borderBottomColor: vref(modalBorderBottomColor),
            borderLeftColor: vref(modalBorderLeftColor),
            borderWidth: vref(modalBorderWidth),
            padding: vref(modalPadding),
            transitionProperty: ref(modalTransitionProperty),
            transitionDuration: ref(modalTransitionDuration),
            transitionTimingFunction: ref(modalTransitionTimingFunction)
        },
        options
    );

    selector(
        '.modal-body',
        {
            background: vref(modalBackground),
            borderRadius: vref(modalBorderRadius),
            borderStyle: vref(modalBorderStyle),
            borderTopColor: vref(modalBorderTopColor),
            borderRightColor: vref(modalBorderRightColor),
            borderBottomColor: vref(modalBorderBottomColor),
            borderLeftColor: vref(modalBorderLeftColor),
            borderWidth: vref(modalBorderWidth),
            color: vref(modalColor),
            padding: vref(modalPadding),
            transitionProperty: ref(modalTransitionProperty),
            transitionDuration: ref(modalTransitionDuration),
            transitionTimingFunction: ref(modalTransitionTimingFunction)
        },
        options
    );

    selector(
        '.modal-footer',
        {
            background: vref(modalFooterBackground),
            borderRadius: vref(modalBorderRadius),
            color: vref(modalColor),
            borderStyle: vref(modalBorderStyle),
            borderTopColor: vref(modalBorderTopColor),
            borderRightColor: vref(modalBorderRightColor),
            borderBottomColor: vref(modalBorderBottomColor),
            borderLeftColor: vref(modalBorderLeftColor),
            borderWidth: vref(modalBorderWidth),
            padding: vref(modalPadding),
            transitionProperty: ref(modalTransitionProperty),
            transitionDuration: ref(modalTransitionDuration),
            transitionTimingFunction: ref(modalTransitionTimingFunction)
        },
        options
    );

    selector(
        '.modal-header + .modal-body',
        {
            borderTop: '0'
        },
        options
    );

    selector(
        '.modal-body:has(+ .modal-footer)',
        {
            borderBottom: '0'
        },
        options
    );

    selector(
        '.modal > *:not(:first-child)',
        {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0
        },
        options
    );

    selector(
        '.modal > *:not(:last-child)',
        {
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0
        },
        options
    );

    selector(
        '.modal .modal-close',
        {
            color: vref(modalColor)
        },
        options
    );

    selector(
        '.modal .modal-icon',
        {
            margin: vref(modalIconMargin),
            alignItems: 'center',
            display: 'flex'
        },
        options
    );

    selector(
        '.modal-wrapper .modal-footer .button + .button',
        {
            margin: vref(modalFooterButtonMargin)
        },
        options
    );
}

export function useModalThemeColorSelectors(
    variant: ModalColorVariant,
    options: DefinitionOptions
) {
    const {
        modalBorderTopColor,
        modalBorderRightColor,
        modalBorderBottomColor,
        modalBorderLeftColor,
        modalBackground,
        modalColor
    } = useModalThemeVariables(options);

    const {
        variantBorderTopColor,
        variantBorderRightColor,
        variantBorderBottomColor,
        variantBorderLeftColor,
        variantBackground,
        variantColor
    } = setExportsNamespace(useModalThemeColorVariables(variant, options), 'variant');

    selector(
        [`.modal.-${variant}`],
        {
            [toVariableKey(modalBorderTopColor)]: ref(variantBorderTopColor),
            [toVariableKey(modalBorderRightColor)]: ref(variantBorderRightColor),
            [toVariableKey(modalBorderBottomColor)]: ref(variantBorderBottomColor),
            [toVariableKey(modalBorderLeftColor)]: ref(variantBorderLeftColor),
            [toVariableKey(modalBackground)]: ref(variantBackground),
            [toVariableKey(modalColor)]: ref(variantColor)
        },
        options
    );
}

export function useModalThemeSizeSelectors(variant: ModalSizeVariant, options: DefinitionOptions) {
    const {
        modalBorderTopLeftRadius,
        modalBorderTopRightRadius,
        modalBorderBottomRightRadius,
        modalBorderBottomLeftRadius,
        modalFontSize,
        modalMaxWidth,
        modalPaddingTop,
        modalPaddingRight,
        modalPaddingBottom,
        modalPaddingLeft
    } = useModalThemeVariables(options);

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
    } = setExportsNamespace(useModalThemeSizeVariables(variant, options), 'variant');

    selector(
        `.modal.-${variant}`,
        {
            [toVariableKey(modalBorderTopLeftRadius)]: ref(variantBorderTopLeftRadius),
            [toVariableKey(modalBorderTopRightRadius)]: ref(variantBorderTopRightRadius),
            [toVariableKey(modalBorderBottomRightRadius)]: ref(variantBorderBottomRightRadius),
            [toVariableKey(modalBorderBottomLeftRadius)]: ref(variantBorderBottomLeftRadius),
            [toVariableKey(modalFontSize)]: ref(variantFontSize),
            [toVariableKey(modalMaxWidth)]: ref(variantMaxWidth),
            [toVariableKey(modalPaddingTop)]: ref(variantPaddingTop),
            [toVariableKey(modalPaddingRight)]: ref(variantPaddingRight),
            [toVariableKey(modalPaddingBottom)]: ref(variantPaddingBottom),
            [toVariableKey(modalPaddingLeft)]: ref(variantPaddingLeft)
        },
        options
    );
}

export function useModalThemeVariantsSelectors(options: DefinitionOptions) {
    selector(
        '.modal.-fullscreen',
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
            '.modal.-fullscreen > .modal-header',
            '.modal.-fullscreen > .modal-body',
            '.modal.-fullscreen > .modal-footer'
        ],
        {
            borderRadius: 0
        },
        options
    );

    selector(
        '.modal.-fullscreen > .modal-body',
        {
            flex: '1',
            overflow: 'auto'
        },
        options
    );
}

/**
 * Composables
 */

export function useModalThemeColors(colors: ModalColorVariant[], options: DefinitionOptions) {
    colors.forEach((color) => useModalThemeColorSelectors(color, options));
}

export function useModalThemeSizes(sizes: ModalSizeVariant[], options: DefinitionOptions) {
    sizes.forEach((size) => useModalThemeSizeSelectors(size, options));
}

export function useModalTheme(options: DefinitionOptions) {
    useModalThemeVariables(options);
    useModalThemeLayoutSelectors(options);
    useModalThemeBaseSelectors(options);
    useModalThemeColors([...defaultModalColors], options);
    useModalThemeSizes([...defaultModalSizes], options);
    useModalThemeVariantsSelectors(options);
}
