import {
    multiply,
    ref,
    selector,
    nsvariables,
    defaultDefinitionOptions,
    add,
    hsla,
    DefinitionOptions,
    css,
    vref,
    setExportsNamespace,
    toVariableKey
} from '@inkline/core';
import { merge } from '@inkline/utils';
import {
    useBorder,
    useBoxShadow,
    useFontSize,
    useTransition,
    useTextColor,
    useBrandColors,
    useBrandColorVariants,
    useNeutralColors,
    useContrastTextColor,
    useSpacing
} from '@inkline/theme';

const ns = 'radio';

const defaultRadioColor = 'light';
const defaultRadioColors = ['light', 'dark'] as const;

const defaultRadioSize = 'md';
const defaultRadioSizes = ['sm', 'md', 'lg'] as const;

type RadioColorVariant = (typeof defaultRadioColors)[number];
type RadioSizeVariant = (typeof defaultRadioSizes)[number];

const circleIconUrl =
    'data:image/svg+xml; utf8, <svg fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28"><title>check</title><circle cx="14" cy="14" r="12"></circle></svg>';

/**
 * Config
 */

export function useRadioThemeColorConfig(
    variant: RadioColorVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { colorDark } = useBrandColors(options);
    const {
        colorDarkTint50,
        colorLightShade50,
        colorPrimary300,
        colorPrimary400,
        colorPrimary500,
        colorPrimary600,
        colorPrimary700,
        colorPrimary800
    } = useBrandColorVariants(options);
    const { colorWhite, colorGray100, colorGray200, colorGray600, colorGray700 } =
        useNeutralColors(options);

    const { contrastTextColorLight, contrastTextColorDark } = useContrastTextColor(options);

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
             * @state disabled
             */
            disabled: {
                background: ref(colorGray100),
                border: {
                    color: ref(colorGray200)
                }
            },
            /**
             * @state readonly
             */
            readonly: {
                background: ref(colorGray100),
                border: {
                    color: ref(colorGray200)
                }
            },
            /**
             * @state checked
             */
            checked: {
                /**
                 * @state checked disabled
                 */
                disabled: {
                    background: ref(colorPrimary300),
                    border: {
                        color: ref(colorPrimary400)
                    }
                },
                /**
                 * @state checked readonly
                 */
                readonly: {
                    background: ref(colorPrimary400),
                    border: {
                        color: ref(colorPrimary500)
                    }
                }
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
             * @state disabled
             */
            disabled: {
                background: ref(colorGray600),
                border: {
                    color: ref(colorGray700)
                }
            },
            /**
             * @state readonly
             */
            readonly: {
                background: ref(colorGray600),
                border: {
                    color: ref(colorGray700)
                }
            },
            /**
             * @state checked
             */
            checked: {
                /**
                 * @state checked disabled
                 */
                disabled: {
                    background: ref(colorPrimary700),
                    border: {
                        color: ref(colorPrimary800)
                    }
                },
                /**
                 * @state checked readonly
                 */
                readonly: {
                    background: ref(colorPrimary600),
                    border: {
                        color: ref(colorPrimary700)
                    }
                }
            }
        }
    }[variant];
}

export function useRadioThemeSizeConfig(variant: RadioSizeVariant, userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { fontSizeSm, fontSizeMd, fontSizeLg } = useFontSize(options);
    const { spacingSm, spacingMd, spacingLg } = useSpacing(options);

    return {
        sm: {
            fontSize: ref(fontSizeSm),
            margin: {
                top: 0,
                right: multiply(ref(spacingSm), 0.5),
                bottom: multiply(ref(spacingSm), 0.5),
                left: 0
            },
            width: ref(spacingSm),
            height: ref(spacingSm),
            /**
             * @element circle
             */
            circle: {
                width: multiply(ref(spacingSm), 0.5),
                height: multiply(ref(spacingSm), 0.5)
            }
        },
        md: {
            fontSize: ref(fontSizeMd),
            margin: {
                top: 0,
                right: multiply(ref(spacingMd), 0.5),
                bottom: multiply(ref(spacingMd), 0.5),
                left: 0
            },
            width: ref(spacingMd),
            height: ref(spacingMd),
            /**
             * @element circle
             */
            circle: {
                width: multiply(ref(spacingMd), 0.5),
                height: multiply(ref(spacingMd), 0.5)
            }
        },
        lg: {
            fontSize: ref(fontSizeLg),
            margin: {
                top: 0,
                right: multiply(ref(spacingLg), 0.5),
                bottom: multiply(ref(spacingLg), 0.5),
                left: 0
            },
            width: ref(spacingLg),
            height: ref(spacingLg),
            /**
             * @element circle
             */
            circle: {
                width: multiply(ref(spacingLg), 0.5),
                height: multiply(ref(spacingLg), 0.5)
            }
        }
    }[variant];
}

export function useRadioThemeConfig(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { colorPrimary } = useBrandColors(options);
    const { colorPrimaryShade50 } = useBrandColorVariants(options);
    const { colorWhite } = useNeutralColors(options);
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
    const { textColorWeak } = useTextColor(options);
    const { transitionDuration, transitionTimingFunction } = useTransition(options);

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
                topLeft: '50%',
                topRight: '50%',
                bottomRight: '50%',
                bottomLeft: '50%'
            },
            boxShadow: {
                offsetX: ref(boxShadowOffsetX),
                offsetY: ref(boxShadowOffsetY),
                blurRadius: ref(boxShadowBlurRadius),
                spreadRadius: ref(boxShadowSpreadRadius),
                color: ref(boxShadowColor)
            },
            transition: {
                property: 'background-color, color, border-color, transform',
                duration: ref(transitionDuration),
                timingFunction: ref(transitionTimingFunction)
            },
            /**
             * @element circle
             */
            circle: {
                color: ref(colorWhite)
            },
            /**
             * @state checked
             */
            checked: {
                background: ref(colorPrimary),
                border: {
                    color: ref(colorPrimaryShade50)
                }
            },
            /**
             * @state disabled
             */
            disabled: {
                color: ref(textColorWeak)
            },
            /**
             * @state focus
             */
            focus: {
                boxShadow: {
                    offsetX: 0,
                    offsetY: 0,
                    blurRadius: 0,
                    spreadRadius: '3px',
                    color: hsla(css`from ${ref(colorPrimary)} h s l / 0.25`)
                }
            }
        },
        useRadioThemeColorConfig(defaultRadioColor, options),
        useRadioThemeSizeConfig(defaultRadioSize, options)
    );
}

/**
 * Variables
 */

export function useRadioThemeColorVariables(
    variant: RadioColorVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables([ns, variant] as const, useRadioThemeColorConfig(variant, options), {
        ...options,
        registerComposed: false
    });
}

export function useRadioThemeSizeVariables(
    variant: RadioSizeVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables([ns, variant] as const, useRadioThemeSizeConfig(variant, options), {
        ...options,
        registerComposed: false
    });
}

export function useRadioThemeVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables(ns, useRadioThemeConfig(options), {
        ...options,
        registerComposed: false
    });
}

/**
 * Selectors
 */

export function useRadioThemeLayoutSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { radioWidth, radioHeight, radioCircleWidth, radioCircleHeight } =
        useRadioThemeVariables(options);

    selector(
        '.radio',
        {
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            whiteSpace: 'nowrap',
            outline: 0
        },
        options
    );

    selector(
        '.radio:last-of-type',
        {
            marginRight: 0
        },
        options
    );

    selector(
        '.radio .radio-label',
        {
            cursor: 'pointer',
            marginBottom: 0,
            display: 'inline-flex',
            alignItems: 'center',
            position: 'relative'
        },
        options
    );

    selector(
        ['.radio .radio-label::before', '.radio .radio-label::after'],
        {
            position: 'absolute',
            top: '50%',
            left: 0,
            display: 'inline-flex',
            cursor: 'pointer',
            width: ref(radioWidth),
            height: ref(radioHeight)
        },
        options
    );

    selector(
        '.radio .radio-label::before',
        {
            content: '""',
            userSelect: 'none',
            transform: 'translate(0, -50%)'
        },
        options
    );

    selector(
        '.radio .radio-label::after',
        {
            content: '""',
            zIndex: 1,
            textAlign: 'center',
            transform: 'scale(0) translate(0, -50%)',
            border: '1px solid transparent',
            transformOrigin: 'center top',
            maskImage: `url('${circleIconUrl}')`,
            maskSize: [ref(radioCircleWidth), ref(radioCircleHeight)],
            maskPosition: 'center center',
            maskRepeat: 'no-repeat'
        },
        options
    );

    selector(
        '.radio input',
        {
            top: 0,
            left: 0,
            position: 'absolute',
            zIndex: 0,
            opacity: 0,
            height: 0,
            width: 0
        },
        options
    );

    selector(
        ['.radio .radio-label', '.radio input', '.radio input:focus', '.radio input:active'],
        {
            outline: 0
        },
        options
    );

    selector(
        ['.radio input:checked ~ .radio-label::after'],
        {
            content: '""',
            maskPosition: 'center center',
            maskRepeat: 'no-repeat',
            transform: 'scale(1) translate(0, -50%)'
        },
        options
    );

    selector(
        ['.radio input:disabled ~ .radio-label', '.radio input[readonly] ~ .radio-label'],
        {
            cursor: 'default'
        },
        options
    );

    selector(
        [
            '.radio input:disabled ~ .radio-label::after',
            '.radio input[readonly] ~ .radio-label::after',
            '.radio input:checked:disabled ~ .radio-label::after',
            '.radio input:checked[readonly] ~ .radio-label::after'
        ],
        {
            cursor: 'not-allowed'
        },
        options
    );
}

export function useRadioThemeBaseSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        radioBackground,
        radioBorderColor,
        radioBorderStyle,
        radioBorderWidth,
        radioBorderRadius,
        radioBoxShadow,
        radioColor,
        radioFontSize,
        radioMargin,
        radioMarginRight,
        radioWidth,
        radioTransitionDuration,
        radioTransitionTimingFunction,
        radioTransitionProperty,
        radioCheckedBackground,
        radioCheckedBorderColor,
        radioCheckedDisabledBackground,
        radioCheckedDisabledBorderColor,
        radioCheckedReadonlyBackground,
        radioCheckedReadonlyBorderColor,
        radioDisabledColor,
        radioDisabledBackground,
        radioReadonlyBackground,
        radioCircleColor,
        radioFocusBoxShadow
    } = useRadioThemeVariables(options);

    selector(
        '.radio',
        {
            margin: vref(radioMargin)
        },
        options
    );

    selector(
        '.radio .radio-label',
        {
            color: ref(radioColor),
            fontSize: ref(radioFontSize),
            transitionProperty: ref(radioTransitionProperty),
            transitionDuration: ref(radioTransitionDuration),
            transitionTimingFunction: ref(radioTransitionTimingFunction),
            paddingLeft: add(ref(radioWidth), ref(radioMarginRight))
        },
        options
    );

    selector(
        '.radio .radio-label::before',
        {
            background: ref(radioBackground),
            borderColor: vref(radioBorderColor),
            borderWidth: vref(radioBorderWidth),
            borderStyle: vref(radioBorderStyle),
            borderRadius: vref(radioBorderRadius),
            boxShadow: vref(radioBoxShadow),
            transitionProperty: ref(radioTransitionProperty),
            transitionDuration: ref(radioTransitionDuration),
            transitionTimingFunction: ref(radioTransitionTimingFunction)
        },
        options
    );

    selector(
        '.radio .radio-label::after',
        {
            background: ref(radioCircleColor),
            transitionProperty: ref(radioTransitionProperty),
            transitionDuration: ref(radioTransitionDuration),
            transitionTimingFunction: ref(radioTransitionTimingFunction)
        },
        options
    );

    selector(
        '.radio:not(.-disabled) .radio-label:focus::before',
        {
            boxShadow: vref(radioFocusBoxShadow)
        },
        options
    );

    selector(
        ['.radio input:checked ~ .radio-label::before'],
        {
            background: ref(radioCheckedBackground),
            borderColor: vref(radioCheckedBorderColor)
        },
        options
    );

    selector(
        '.radio input:disabled ~ .radio-label',
        {
            color: ref(radioDisabledColor),
            cursor: 'default'
        },
        options
    );

    selector(
        ['.radio input:disabled ~ .radio-label::before'],
        {
            background: ref(radioDisabledBackground),
            cursor: 'not-allowed'
        },
        options
    );

    selector(
        ['.radio input[readonly] ~ .radio-label::before'],
        {
            background: ref(radioReadonlyBackground),
            cursor: 'not-allowed'
        },
        options
    );

    selector(
        '.radio input:checked:disabled ~ .radio-label::before',
        {
            background: ref(radioCheckedDisabledBackground),
            borderColor: vref(radioCheckedDisabledBorderColor)
        },
        options
    );

    selector(
        '.radio input[readonly]:checked ~ .radio-label::before',
        {
            background: ref(radioCheckedReadonlyBackground),
            borderColor: vref(radioCheckedReadonlyBorderColor)
        },
        options
    );
}

export function useRadioThemeSizeSelectors(
    variant: RadioSizeVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        radioMarginRight,
        radioMarginBottom,
        radioFontSize,
        radioWidth,
        radioHeight,
        radioCircleWidth,
        radioCircleHeight
    } = useRadioThemeVariables(options);

    const {
        variantFontSize,
        variantWidth,
        variantHeight,
        variantCircleWidth,
        variantCircleHeight,
        variantMarginRight,
        variantMarginBottom
    } = setExportsNamespace(useRadioThemeSizeVariables(variant, options), 'variant');

    selector(
        `.radio.-${variant}`,
        {
            [toVariableKey(radioFontSize)]: ref(variantFontSize),
            [toVariableKey(radioWidth)]: ref(variantWidth),
            [toVariableKey(radioHeight)]: ref(variantHeight),
            [toVariableKey(radioCircleWidth)]: ref(variantCircleWidth),
            [toVariableKey(radioCircleHeight)]: ref(variantCircleHeight),
            [toVariableKey(radioMarginRight)]: ref(variantMarginRight),
            [toVariableKey(radioMarginBottom)]: ref(variantMarginBottom)
        },
        options
    );
}

export function useRadioThemeSizes(sizes: RadioSizeVariant[], userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    sizes.forEach((size) => useRadioThemeSizeSelectors(size, options));
}

export function useRadioThemeColorSelectors(
    variant: RadioColorVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        radioColor,
        radioBackground,
        radioBorderTopColor,
        radioBorderRightColor,
        radioBorderBottomColor,
        radioBorderLeftColor,
        radioDisabledBackground,
        radioDisabledBorderTopColor,
        radioDisabledBorderRightColor,
        radioDisabledBorderBottomColor,
        radioDisabledBorderLeftColor,
        radioReadonlyBackground,
        radioReadonlyBorderTopColor,
        radioReadonlyBorderRightColor,
        radioReadonlyBorderBottomColor,
        radioReadonlyBorderLeftColor,
        radioCheckedDisabledBackground,
        radioCheckedDisabledBorderTopColor,
        radioCheckedDisabledBorderRightColor,
        radioCheckedDisabledBorderBottomColor,
        radioCheckedDisabledBorderLeftColor,
        radioCheckedReadonlyBackground,
        radioCheckedReadonlyBorderTopColor,
        radioCheckedReadonlyBorderRightColor,
        radioCheckedReadonlyBorderBottomColor,
        radioCheckedReadonlyBorderLeftColor
    } = useRadioThemeVariables(options);

    const {
        variantColor,
        variantBackground,
        variantBorderTopColor,
        variantBorderRightColor,
        variantBorderBottomColor,
        variantBorderLeftColor,
        variantDisabledBackground,
        variantDisabledBorderTopColor,
        variantDisabledBorderRightColor,
        variantDisabledBorderBottomColor,
        variantDisabledBorderLeftColor,
        variantReadonlyBackground,
        variantReadonlyBorderTopColor,
        variantReadonlyBorderRightColor,
        variantReadonlyBorderBottomColor,
        variantReadonlyBorderLeftColor,
        variantCheckedDisabledBackground,
        variantCheckedDisabledBorderTopColor,
        variantCheckedDisabledBorderRightColor,
        variantCheckedDisabledBorderBottomColor,
        variantCheckedDisabledBorderLeftColor,
        variantCheckedReadonlyBackground,
        variantCheckedReadonlyBorderTopColor,
        variantCheckedReadonlyBorderRightColor,
        variantCheckedReadonlyBorderBottomColor,
        variantCheckedReadonlyBorderLeftColor
    } = setExportsNamespace(useRadioThemeColorVariables(variant, options), 'variant');

    selector(
        `.radio.-${variant}`,
        {
            [toVariableKey(radioColor)]: ref(variantColor),
            [toVariableKey(radioBackground)]: ref(variantBackground),
            [toVariableKey(radioBorderTopColor)]: ref(variantBorderTopColor),
            [toVariableKey(radioBorderRightColor)]: ref(variantBorderRightColor),
            [toVariableKey(radioBorderBottomColor)]: ref(variantBorderBottomColor),
            [toVariableKey(radioBorderLeftColor)]: ref(variantBorderLeftColor),
            [toVariableKey(radioDisabledBackground)]: ref(variantDisabledBackground),
            [toVariableKey(radioDisabledBorderTopColor)]: ref(variantDisabledBorderTopColor),
            [toVariableKey(radioDisabledBorderRightColor)]: ref(variantDisabledBorderRightColor),
            [toVariableKey(radioDisabledBorderBottomColor)]: ref(variantDisabledBorderBottomColor),
            [toVariableKey(radioDisabledBorderLeftColor)]: ref(variantDisabledBorderLeftColor),
            [toVariableKey(radioReadonlyBackground)]: ref(variantReadonlyBackground),
            [toVariableKey(radioReadonlyBorderTopColor)]: ref(variantReadonlyBorderTopColor),
            [toVariableKey(radioReadonlyBorderRightColor)]: ref(variantReadonlyBorderRightColor),
            [toVariableKey(radioReadonlyBorderBottomColor)]: ref(variantReadonlyBorderBottomColor),
            [toVariableKey(radioReadonlyBorderLeftColor)]: ref(variantReadonlyBorderLeftColor),
            [toVariableKey(radioCheckedDisabledBackground)]: ref(variantCheckedDisabledBackground),
            [toVariableKey(radioCheckedDisabledBorderTopColor)]: ref(
                variantCheckedDisabledBorderTopColor
            ),
            [toVariableKey(radioCheckedDisabledBorderRightColor)]: ref(
                variantCheckedDisabledBorderRightColor
            ),
            [toVariableKey(radioCheckedDisabledBorderBottomColor)]: ref(
                variantCheckedDisabledBorderBottomColor
            ),
            [toVariableKey(radioCheckedDisabledBorderLeftColor)]: ref(
                variantCheckedDisabledBorderLeftColor
            ),
            [toVariableKey(radioCheckedReadonlyBackground)]: ref(variantCheckedReadonlyBackground),
            [toVariableKey(radioCheckedReadonlyBorderTopColor)]: ref(
                variantCheckedReadonlyBorderTopColor
            ),
            [toVariableKey(radioCheckedReadonlyBorderRightColor)]: ref(
                variantCheckedReadonlyBorderRightColor
            ),
            [toVariableKey(radioCheckedReadonlyBorderBottomColor)]: ref(
                variantCheckedReadonlyBorderBottomColor
            ),
            [toVariableKey(radioCheckedReadonlyBorderLeftColor)]: ref(
                variantCheckedReadonlyBorderLeftColor
            )
        },
        options
    );
}

export function useRadioThemeColors(colors: RadioColorVariant[], userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    colors.forEach((color) => useRadioThemeColorSelectors(color, options));
}

export function useRadioThemeVariants(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { radioMarginRight } = useRadioThemeVariables(options);

    selector(
        '.radio.-native input',
        {
            top: 'auto',
            left: 'auto',
            position: 'relative',
            opacity: 1,
            height: 'auto',
            width: 'auto'
        },
        options
    );

    selector(
        '.radio.-native .radio-label',
        {
            paddingLeft: ref(radioMarginRight)
        },
        options
    );

    selector(
        ['.radio.-native .radio-label::before', '.radio.-native .radio-label::after'],
        {
            display: 'none'
        },
        options
    );
}

/**
 * Composables
 */

export function useRadioTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useRadioThemeLayoutSelectors(options);
    useRadioThemeBaseSelectors(options);
    useRadioThemeSizes([...defaultRadioSizes], options);
    useRadioThemeColors([...defaultRadioColors], options);
    useRadioThemeVariants(options);
}
