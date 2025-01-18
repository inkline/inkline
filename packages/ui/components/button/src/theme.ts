import {
    add,
    DefinitionOptions,
    defaultDefinitionOptions,
    multiply,
    nsvariables,
    ref,
    selector,
    setExportsNamespace,
    toVariableKey,
    vref
} from '@inkline/core';
import { merge } from '@inkline/utils';
import {
    useBorder,
    useBorderRadius,
    useBoxShadow,
    useColors,
    useContrastTextColor,
    useFontSize,
    useLineHeight,
    useSpacing,
    useTransition
} from '@inkline/theme';

const ns = 'button';

const defaultButtonColor = 'light';
const defaultButtonColors = [
    'light',
    'dark',
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info'
] as const;

const defaultButtonSize = 'md';
const defaultButtonSizes = ['sm', 'md', 'lg'] as const;

type ButtonColorVariant = (typeof defaultButtonColors)[number];
type ButtonSizeVariant = (typeof defaultButtonSizes)[number];

export function useButtonThemeColorConfig(
    variant: ButtonColorVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        colorLight,
        colorLightShade50,
        colorLightShade100,
        colorDark,
        colorDarkTint50,
        colorDarkTint100,
        colorPrimary,
        colorPrimaryShade50,
        colorPrimaryShade100,
        colorSecondary,
        colorSecondaryShade50,
        colorSecondaryShade100,
        colorSuccess,
        colorSuccessShade50,
        colorSuccessShade100,
        colorDanger,
        colorDangerShade50,
        colorDangerShade100,
        colorWarning,
        colorWarningShade50,
        colorWarningShade100,
        colorInfo,
        colorInfoShade50,
        colorInfoShade100
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
        light: {
            border: {
                color: ref(colorLightShade50)
            },
            background: ref(colorLight),
            color: ref(contrastTextColorLight),
            /**
             * @state active
             */
            active: {
                border: {
                    color: ref(colorLightShade100)
                },
                background: ref(colorLightShade100)
            },
            /**
             * @state hover
             */
            hover: {
                border: {
                    color: ref(colorLightShade100)
                },
                background: ref(colorLightShade50)
            },
            /**
             * @state focus
             */
            focus: {
                border: {
                    color: ref(colorLightShade100)
                },
                background: ref(colorLightShade50)
            },
            /**
             * @variant outline
             */
            outline: {
                border: {
                    color: ref(colorLight)
                },
                color: ref(colorLight)
            },
            /**
             * @variant link
             */
            link: {
                color: ref(colorLight)
            }
        },
        dark: {
            border: {
                color: ref(colorDarkTint50)
            },
            background: ref(colorDark),
            color: ref(contrastTextColorDark),
            /**
             * @state active
             */
            active: {
                border: {
                    color: ref(colorDarkTint100)
                },
                background: ref(colorDarkTint100)
            },
            /**
             * @state hover
             */
            hover: {
                border: {
                    color: ref(colorDarkTint100)
                },
                background: ref(colorDarkTint50)
            },
            /**
             * @state focus
             */
            focus: {
                border: {
                    color: ref(colorDarkTint100)
                },
                background: ref(colorDarkTint50)
            },
            /**
             * @variant outline
             */
            outline: {
                border: {
                    color: ref(colorDark)
                },
                color: ref(colorDark)
            },
            /**
             * @variant link
             */
            link: {
                color: ref(colorDark)
            }
        },
        primary: {
            border: {
                color: ref(colorPrimaryShade50)
            },
            background: ref(colorPrimary),
            color: ref(contrastTextColorPrimary),
            /**
             * @state active
             */
            active: {
                border: {
                    color: ref(colorPrimaryShade100)
                },
                background: ref(colorPrimaryShade100)
            },
            /**
             * @state hover
             */
            hover: {
                border: {
                    color: ref(colorPrimaryShade100)
                },
                background: ref(colorPrimaryShade50)
            },
            /**
             * @state focus
             */
            focus: {
                border: {
                    color: ref(colorPrimaryShade100)
                },
                background: ref(colorPrimaryShade50)
            },
            /**
             * @variant outline
             */
            outline: {
                border: {
                    color: ref(colorPrimary)
                },
                color: ref(colorPrimary)
            },
            /**
             * @variant link
             */
            link: {
                color: ref(colorPrimary)
            }
        },
        secondary: {
            border: {
                color: ref(colorSecondaryShade50)
            },
            background: ref(colorSecondary),
            color: ref(contrastTextColorSecondary),
            /**
             * @state active
             */
            active: {
                border: {
                    color: ref(colorSecondaryShade100)
                },
                background: ref(colorSecondaryShade100)
            },
            /**
             * @state hover
             */
            hover: {
                border: {
                    color: ref(colorSecondaryShade100)
                },
                background: ref(colorSecondaryShade50)
            },
            /**
             * @state focus
             */
            focus: {
                border: {
                    color: ref(colorSecondaryShade100)
                },
                background: ref(colorSecondaryShade50)
            },
            /**
             * @variant outline
             */
            outline: {
                border: {
                    color: ref(colorSecondary)
                },
                color: ref(colorSecondary)
            },
            /**
             * @variant link
             */
            link: {
                color: ref(colorSecondary)
            }
        },
        success: {
            border: {
                color: ref(colorSuccessShade50)
            },
            background: ref(colorSuccess),
            color: ref(contrastTextColorSuccess),
            /**
             * @state active
             */
            active: {
                border: {
                    color: ref(colorSuccessShade100)
                },
                background: ref(colorSuccessShade100)
            },
            /**
             * @state hover
             */
            hover: {
                border: {
                    color: ref(colorSuccessShade100)
                },
                background: ref(colorSuccessShade50)
            },
            /**
             * @state focus
             */
            focus: {
                border: {
                    color: ref(colorSuccessShade100)
                },
                background: ref(colorSuccessShade50)
            },
            /**
             * @variant outline
             */
            outline: {
                border: {
                    color: ref(colorSuccess)
                },
                color: ref(colorSuccess)
            },
            /**
             * @variant link
             */
            link: {
                color: ref(colorSuccess)
            }
        },
        danger: {
            border: {
                color: ref(colorDangerShade50)
            },
            background: ref(colorDanger),
            color: ref(contrastTextColorDanger),
            /**
             * @state active
             */
            active: {
                border: {
                    color: ref(colorDangerShade100)
                },
                background: ref(colorDangerShade100)
            },
            /**
             * @state hover
             */
            hover: {
                border: {
                    color: ref(colorDangerShade100)
                },
                background: ref(colorDangerShade50)
            },
            /**
             * @state focus
             */
            focus: {
                border: {
                    color: ref(colorDangerShade100)
                },
                background: ref(colorDangerShade50)
            },
            /**
             * @variant outline
             */
            outline: {
                border: {
                    color: ref(colorDanger)
                },
                color: ref(colorDanger)
            },
            /**
             * @variant link
             */
            link: {
                color: ref(colorDanger)
            }
        },
        warning: {
            border: {
                color: ref(colorWarningShade50)
            },
            background: ref(colorWarning),
            color: ref(contrastTextColorWarning),
            /**
             * @state active
             */
            active: {
                border: {
                    color: ref(colorWarningShade100)
                },
                background: ref(colorWarningShade100)
            },
            /**
             * @state hover
             */
            hover: {
                border: {
                    color: ref(colorWarningShade100)
                },
                background: ref(colorWarningShade50)
            },
            /**
             * @state focus
             */
            focus: {
                border: {
                    color: ref(colorWarningShade100)
                },
                background: ref(colorWarningShade50)
            },
            /**
             * @variant outline
             */
            outline: {
                border: {
                    color: ref(colorWarning)
                },
                color: ref(colorWarning)
            },
            /**
             * @variant link
             */
            link: {
                color: ref(colorWarning)
            }
        },
        info: {
            border: {
                color: ref(colorInfoShade50)
            },
            background: ref(colorInfo),
            color: ref(contrastTextColorInfo),
            /**
             * @state active
             */
            active: {
                border: {
                    color: ref(colorInfoShade100)
                },
                background: ref(colorInfoShade100)
            },
            /**
             * @state hover
             */
            hover: {
                border: {
                    color: ref(colorInfoShade100)
                },
                background: ref(colorInfoShade50)
            },
            /**
             * @state focus
             */
            focus: {
                border: {
                    color: ref(colorInfoShade100)
                },
                background: ref(colorInfoShade50)
            },
            /**
             * @variant outline
             */
            outline: {
                border: {
                    color: ref(colorInfo)
                },
                color: ref(colorInfo)
            },
            /**
             * @variant link
             */
            link: {
                color: ref(colorInfo)
            }
        }
    }[variant];
}

export function useButtonThemeSizeConfig(
    variant: ButtonSizeVariant,
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
                top: multiply(ref(spacingSm), 0.5),
                right: ref(spacingSm),
                bottom: multiply(ref(spacingSm), 0.5),
                left: ref(spacingSm)
            },
            /**
             * @element loader
             */
            loader: {
                width: '1rem',
                height: '1rem'
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
                top: multiply(ref(spacingMd), 0.5),
                right: ref(spacingMd),
                bottom: multiply(ref(spacingMd), 0.5),
                left: ref(spacingMd)
            },
            /**
             * @element loader
             */
            loader: {
                width: '1rem',
                height: '1rem'
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
                top: multiply(ref(spacingLg), 0.5),
                right: ref(spacingLg),
                bottom: multiply(ref(spacingLg), 0.5),
                left: ref(spacingLg)
            },
            /**
             * @element loader
             */
            loader: {
                width: '1rem',
                height: '1rem'
            }
        }
    }[variant];
}

export function useButtonThemeConfig(userOptions: DefinitionOptions) {
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
    const { spacing, spacingXs } = useSpacing(options);
    const {
        boxShadowOffsetX,
        boxShadowOffsetY,
        boxShadowBlurRadius,
        boxShadowSpreadRadius,
        boxShadowColor
    } = useBoxShadow(options);
    const { lineHeight } = useLineHeight(options);
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
            lineHeight: ref(lineHeight),
            transition: {
                property: ref(transitionProperty),
                duration: ref(transitionDuration),
                timingFunction: ref(transitionTimingFunction)
            },
            /**
             * @state disabled
             */
            disabled: {
                opacity: '0.8'
            },
            /**
             * @variant block
             */
            block: {
                margin: { top: ref(spacing) }
            },
            /**
             * @element icon
             */
            icon: {
                margin: { left: ref(spacingXs) }
            }
        },
        useButtonThemeColorConfig(defaultButtonColor, options),
        useButtonThemeSizeConfig(defaultButtonSize, options)
    );
}

export function useButtonColorVariables(
    variant: ButtonColorVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables([ns, variant] as const, useButtonThemeColorConfig(variant, options), {
        ...options,
        registerComposed: false
    });
}

export function useButtonThemeSizeVariables(
    variant: ButtonSizeVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables([ns, variant] as const, useButtonThemeSizeConfig(variant, options), {
        ...options,
        registerComposed: false
    });
}

export function useButtonThemeVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables(ns, useButtonThemeConfig(options), {
        ...options,
        registerComposed: false
    });
}

export function useButtonThemeLayout(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    selector(
        '.button',
        {
            display: 'inline-flex',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            verticalAlign: 'middle',
            userSelect: 'none',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            textDecoration: 'none',
            outline: 0
        },
        options
    );

    // Button states

    selector(
        ['.button.-disabled', '.button:disabled'],
        {
            cursor: 'not-allowed'
        },
        options
    );

    selector(
        '.button.-loading',
        {
            cursor: 'default'
        },
        options
    );

    // Button icon and content

    selector(
        ['.button-icon', 'button-content'],
        {
            lineHeight: 1,
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        options
    );

    // Future-proof disabling of clicks on `<a>` elements

    selector(
        ['a.button.-disabled', '*:disabled a.button'],
        {
            pointerEvents: 'none'
        },
        options
    );
}

export function useButtonThemeBaseSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        buttonBorderWidth,
        buttonBorderStyle,
        buttonBorderTopColor,
        buttonBorderRightColor,
        buttonBorderBottomColor,
        buttonBorderLeftColor,
        buttonPadding,
        buttonBorderRadius,
        buttonBoxShadow,
        buttonColor,
        buttonBackground,
        buttonFontSize,
        buttonLineHeight,
        buttonTransitionProperty,
        buttonTransitionDuration,
        buttonTransitionTimingFunction,
        buttonHoverBackground,
        buttonFocusBackground,
        buttonActiveBackground,
        buttonLoaderWidth,
        buttonLoaderHeight,
        buttonIconMargin,
        buttonDisabledOpacity
    } = useButtonThemeVariables(options);

    selector(
        '.button',
        {
            borderWidth: vref(buttonBorderWidth),
            borderStyle: vref(buttonBorderStyle),
            borderTopColor: vref(buttonBorderTopColor),
            borderRightColor: vref(buttonBorderRightColor),
            borderBottomColor: vref(buttonBorderBottomColor),
            borderLeftColor: vref(buttonBorderLeftColor),
            borderRadius: vref(buttonBorderRadius),
            background: vref(buttonBackground),
            boxShadow: vref(buttonBoxShadow),
            color: vref(buttonColor),
            fontSize: ref(buttonFontSize),
            lineHeight: ref(buttonLineHeight),
            padding: vref(buttonPadding),
            transitionProperty: vref(buttonTransitionProperty),
            transitionDuration: vref(buttonTransitionDuration),
            transitionTimingFunction: vref(buttonTransitionTimingFunction)
        },
        options
    );

    // Button states

    selector(
        ['.button:hover', '.button.-hover'],
        {
            background: vref(buttonHoverBackground)
        },
        options
    );

    selector(
        ['.button:focus', '.button.-focus'],
        {
            background: vref(buttonFocusBackground)
        },
        options
    );

    selector(
        ['.button:active', '.button.-active'],
        {
            background: vref(buttonActiveBackground)
        },
        options
    );

    selector(
        ['.button:disabled', '.button.-disabled'],
        {
            background: vref(buttonBackground),
            opacity: ref(buttonDisabledOpacity),
            boxShadow: 'none'
        },
        options
    );

    // Button icon and content

    selector(
        '.button-icon + .button-content',
        {
            margin: vref(buttonIconMargin)
        },
        options
    );

    // Button loading icon

    selector(
        ['.button .loader', '.button .loader.-md'],
        {
            width: ref(buttonLoaderWidth),
            height: ref(buttonLoaderHeight)
        },
        options
    );

    selector(
        '.button .loader svg circle',
        {
            stroke: ref(buttonColor)
        },
        options
    );
}

export function useButtonThemeVariantsSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        buttonBackground,
        buttonBorderTopColor,
        buttonBorderRightColor,
        buttonBorderBottomColor,
        buttonBorderLeftColor,
        buttonColor,
        buttonFontSize,
        buttonLineHeight,
        buttonPaddingTop,
        buttonPaddingBottom,
        buttonBlockMargin
    } = useButtonThemeVariables(options);

    // Block button

    selector(
        '.button.-block',
        {
            display: 'flex',
            width: '100%'
        },
        options
    );

    selector(
        '.button.-block + .button.-block',
        {
            margin: vref(buttonBlockMargin)
        },
        options
    );

    selector(
        [
            'input[type="submit"].button.-block',
            'input[type="reset"].button.-block',
            'input[type="button"].button.-block'
        ],
        {
            width: '100%'
        },
        options
    );

    // Link button
    // Remove button background, box shadow, and border

    selector(
        '.button.-link',
        {
            boxShadow: 'none',
            backgroundColor: 'transparent',
            borderTopColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: 'transparent',
            borderLeftColor: 'transparent',
            cursor: 'pointer',
            color: vref(buttonBackground)
        },
        options
    );

    selector(
        [
            '.button.-link:active',
            '.button.-link.-active',
            '.button.-link:hover',
            '.button.-link.-hover',
            '.button.-link:focus',
            '.button.-link.-focus'
        ],
        {
            boxShadow: 'none',
            backgroundColor: 'transparent',
            borderTopColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: 'transparent',
            borderLeftColor: 'transparent',
            textDecoration: 'underline'
        },
        options
    );

    // Outline buttons
    // Remove button background

    selector(
        '.button.-outline',
        {
            background: 'transparent',
            boxShadow: 'none',
            borderTopColor: vref(buttonBackground),
            borderRightColor: vref(buttonBackground),
            borderBottomColor: vref(buttonBackground),
            borderLeftColor: vref(buttonBackground),
            color: vref(buttonBackground)
        },
        options
    );

    selector(
        ['.button.-outline:hover', '.button.-outline.-hover'],
        {
            background: vref(buttonBackground),
            boxShadow: 'none',
            borderTopColor: vref(buttonBorderTopColor),
            borderRightColor: vref(buttonBorderRightColor),
            borderBottomColor: vref(buttonBorderBottomColor),
            borderLeftColor: vref(buttonBorderLeftColor),
            color: vref(buttonColor)
        },
        options
    );

    // Circle and square button

    selector(
        ['.button.-circle', '.button.-square'],
        {
            width: add(
                ref(buttonPaddingTop),
                multiply(ref(buttonFontSize), ref(buttonLineHeight)),
                ref(buttonPaddingBottom)
            ),
            height: add(
                ref(buttonPaddingTop),
                multiply(ref(buttonFontSize), ref(buttonLineHeight)),
                ref(buttonPaddingBottom)
            ),
            padding: 0
        },
        options
    );

    selector(
        '.button.-circle',
        {
            borderRadius: '50%'
        },
        options
    );
}

export function useButtonThemeSizeSelectors(
    variant: ButtonSizeVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        buttonPaddingTop,
        buttonPaddingRight,
        buttonPaddingBottom,
        buttonPaddingLeft,
        buttonBorderTopLeftRadius,
        buttonBorderTopRightRadius,
        buttonBorderBottomRightRadius,
        buttonBorderBottomLeftRadius,
        buttonFontSize
    } = useButtonThemeVariables(options);

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
    } = setExportsNamespace(useButtonThemeSizeVariables(variant, options), 'variant');

    selector(
        `.button.-${variant}`,
        {
            [toVariableKey(buttonBorderTopLeftRadius)]: ref(variantBorderTopLeftRadius),
            [toVariableKey(buttonBorderTopRightRadius)]: ref(variantBorderTopRightRadius),
            [toVariableKey(buttonBorderBottomRightRadius)]: ref(variantBorderBottomRightRadius),
            [toVariableKey(buttonBorderBottomLeftRadius)]: ref(variantBorderBottomLeftRadius),
            [toVariableKey(buttonFontSize)]: ref(variantFontSize),
            [toVariableKey(buttonPaddingTop)]: ref(variantPaddingTop),
            [toVariableKey(buttonPaddingRight)]: ref(variantPaddingRight),
            [toVariableKey(buttonPaddingBottom)]: ref(variantPaddingBottom),
            [toVariableKey(buttonPaddingLeft)]: ref(variantPaddingLeft)
        },
        options
    );
}

export function useButtonThemeColorSelectors(
    variant: ButtonColorVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        buttonBackground,
        buttonBorderTopColor,
        buttonBorderRightColor,
        buttonBorderBottomColor,
        buttonBorderLeftColor,
        buttonColor,
        buttonHoverBackground,
        buttonHoverBorderTopColor,
        buttonHoverBorderRightColor,
        buttonHoverBorderBottomColor,
        buttonHoverBorderLeftColor,
        buttonFocusBackground,
        buttonFocusBorderTopColor,
        buttonFocusBorderRightColor,
        buttonFocusBorderBottomColor,
        buttonFocusBorderLeftColor,
        buttonActiveBackground,
        buttonActiveBorderTopColor,
        buttonActiveBorderRightColor,
        buttonActiveBorderBottomColor,
        buttonActiveBorderLeftColor
    } = useButtonThemeVariables(options);
    const {
        variantBackground,
        variantBorderTopColor,
        variantBorderRightColor,
        variantBorderBottomColor,
        variantBorderLeftColor,
        variantColor,
        variantHoverBackground,
        variantHoverBorderTopColor,
        variantHoverBorderRightColor,
        variantHoverBorderBottomColor,
        variantHoverBorderLeftColor,
        variantFocusBackground,
        variantFocusBorderTopColor,
        variantFocusBorderRightColor,
        variantFocusBorderBottomColor,
        variantFocusBorderLeftColor,
        variantActiveBackground,
        variantActiveBorderTopColor,
        variantActiveBorderRightColor,
        variantActiveBorderBottomColor,
        variantActiveBorderLeftColor
    } = setExportsNamespace(useButtonColorVariables(variant, options), 'variant');

    selector(
        `.button.-${variant}`,
        {
            [toVariableKey(buttonBorderTopColor)]: ref(variantBorderTopColor),
            [toVariableKey(buttonBorderRightColor)]: ref(variantBorderRightColor),
            [toVariableKey(buttonBorderBottomColor)]: ref(variantBorderBottomColor),
            [toVariableKey(buttonBorderLeftColor)]: ref(variantBorderLeftColor),
            [toVariableKey(buttonBackground)]: ref(variantBackground),
            [toVariableKey(buttonColor)]: ref(variantColor),
            [toVariableKey(buttonHoverBorderTopColor)]: ref(variantHoverBorderTopColor),
            [toVariableKey(buttonHoverBorderRightColor)]: ref(variantHoverBorderRightColor),
            [toVariableKey(buttonHoverBorderBottomColor)]: ref(variantHoverBorderBottomColor),
            [toVariableKey(buttonHoverBorderLeftColor)]: ref(variantHoverBorderLeftColor),
            [toVariableKey(buttonHoverBackground)]: ref(variantHoverBackground),
            [toVariableKey(buttonFocusBorderTopColor)]: ref(variantFocusBorderTopColor),
            [toVariableKey(buttonFocusBorderRightColor)]: ref(variantFocusBorderRightColor),
            [toVariableKey(buttonFocusBorderBottomColor)]: ref(variantFocusBorderBottomColor),
            [toVariableKey(buttonFocusBorderLeftColor)]: ref(variantFocusBorderLeftColor),
            [toVariableKey(buttonFocusBackground)]: ref(variantFocusBackground),
            [toVariableKey(buttonActiveBorderTopColor)]: ref(variantActiveBorderTopColor),
            [toVariableKey(buttonActiveBorderRightColor)]: ref(variantActiveBorderRightColor),
            [toVariableKey(buttonActiveBorderBottomColor)]: ref(variantActiveBorderBottomColor),
            [toVariableKey(buttonActiveBorderLeftColor)]: ref(variantActiveBorderLeftColor),
            [toVariableKey(buttonActiveBackground)]: ref(variantActiveBackground)
        },
        options
    );
}

/**
 * Composables
 */

export function useButtonThemeSizes(sizes: ButtonSizeVariant[], userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    sizes.forEach((size) => useButtonThemeSizeSelectors(size, options));
}

export function useButtonThemeColors(colors: ButtonColorVariant[], userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    colors.forEach((color) => useButtonThemeColorSelectors(color, options));
}

export function useButtonTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useButtonThemeVariables(options);
    useButtonThemeLayout(options);
    useButtonThemeBaseSelectors(options);
    useButtonThemeSizes([...defaultButtonSizes], options);
    useButtonThemeColors([...defaultButtonColors], options);
    useButtonThemeVariantsSelectors(options);
}
