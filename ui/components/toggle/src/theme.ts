import {
    DefinitionOptions,
    defaultDefinitionOptions,
    multiply,
    nsvariables,
    ref,
    selector,
    subtract,
    vref,
    setExportsNamespace,
    toVariableKey
} from '@inkline/core';
import {
    useBorder,
    useBorderRadius,
    useBoxShadow,
    useBrandColors,
    useBrandColorVariants,
    useContrastTextColor,
    useFontSize,
    useLineHeight,
    useNeutralColors,
    useSpacing,
    useTextColor,
    useTransition
} from '@inkline/theme';
import { merge } from '@inkline/utils';

const ns = 'toggle';

const defaultToggleColor = 'light';
const defaultToggleColors = ['light', 'dark'] as const;

const defaultToggleSize = 'md';
const defaultToggleSizes = ['sm', 'md', 'lg'] as const;

type ToggleColorVariant = (typeof defaultToggleColors)[number];
type ToggleSizeVariant = (typeof defaultToggleSizes)[number];

/**
 * Config
 */

export function useToggleThemeColorConfig(
    variant: ToggleColorVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { colorLight, colorDark, colorPrimary } = useBrandColors(options);
    const {
        colorLightShade50,
        colorLightShade150,
        colorLightTint50,
        colorLightTint100,
        colorDarkTint50,
        colorDarkTint100,
        colorDarkTint150,
        colorPrimary200,
        colorPrimary300,
        colorPrimary400,
        colorPrimary600,
        colorPrimary700,
        colorPrimary800,
        colorPrimaryShade50,
        colorPrimaryTint50
    } = useBrandColorVariants(options);
    const { colorWhite, colorGray300 } = useNeutralColors(options);

    const { contrastTextColorLight, contrastTextColorDark } = useContrastTextColor(options);

    return {
        /**
         * @variant light
         */
        light: {
            background: ref(colorLight),
            border: {
                color: ref(colorLightShade50)
            },
            color: ref(contrastTextColorLight),
            disabled: {
                background: ref(colorLight),
                border: {
                    color: ref(colorLightShade50)
                },
                indicator: {
                    background: ref(colorLightShade150)
                }
            },
            readonly: {
                background: ref(colorLightTint50),
                border: {
                    color: ref(colorLightShade50)
                },
                indicator: {
                    background: ref(colorLightShade50)
                }
            },
            checked: {
                background: ref(colorPrimary),
                border: {
                    color: ref(colorPrimaryShade50)
                },
                disabled: {
                    background: ref(colorPrimary200),
                    border: {
                        color: ref(colorPrimary300)
                    },
                    indicator: {
                        background: ref(colorLightTint50)
                    }
                },
                readonly: {
                    background: ref(colorPrimary300),
                    border: {
                        color: ref(colorPrimary400)
                    },
                    indicator: {
                        background: ref(colorLightTint100)
                    }
                },
                indicator: {
                    background: ref(colorWhite)
                }
            },
            indicator: {
                background: ref(colorWhite)
            }
        },
        /**
         * @variant dark
         */
        dark: {
            background: ref(colorDark),
            border: {
                color: ref(colorDarkTint50)
            },
            color: ref(contrastTextColorDark),
            disabled: {
                background: ref(colorDarkTint100),
                border: {
                    color: ref(colorDarkTint150)
                },
                indicator: {
                    background: ref(colorGray300)
                }
            },
            readonly: {
                background: ref(colorDarkTint50),
                border: {
                    color: ref(colorDarkTint100)
                },
                indicator: {
                    background: ref(colorGray300)
                }
            },
            checked: {
                background: ref(colorPrimary),
                border: {
                    color: ref(colorPrimaryTint50)
                },
                disabled: {
                    background: ref(colorPrimary800),
                    border: {
                        color: ref(colorPrimary700)
                    },
                    indicator: {
                        background: ref(colorGray300)
                    }
                },
                readonly: {
                    background: ref(colorPrimary700),
                    border: {
                        color: ref(colorPrimary600)
                    },
                    indicator: {
                        background: ref(colorLight)
                    }
                },
                indicator: {
                    background: ref(colorWhite)
                }
            },
            indicator: {
                background: ref(colorWhite)
            }
        }
    }[variant];
}

export function useToggleThemeSizeConfig(
    variant: ToggleSizeVariant,
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
            margin: {
                top: 0,
                right: multiply(ref(spacingSm), 0.5),
                bottom: 0,
                left: 0
            },
            width: multiply(ref(spacingSm), 2),
            height: ref(spacingSm),
            /**
             * @element indicator
             */
            indicator: {
                margin: 0,
                borderRadius: {
                    topLeft: ref(borderTopLeftRadiusSm),
                    topRight: ref(borderTopRightRadiusSm),
                    bottomRight: ref(borderBottomRightRadiusSm),
                    bottomLeft: ref(borderBottomLeftRadiusSm)
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
            margin: {
                top: 0,
                right: multiply(ref(spacingMd), 0.5),
                bottom: 0,
                left: 0
            },
            width: multiply(ref(spacingMd), 2),
            height: ref(spacingMd),
            /**
             * @element indicator
             */
            indicator: {
                margin: 0,
                borderRadius: {
                    topLeft: ref(borderTopLeftRadiusMd),
                    topRight: ref(borderTopRightRadiusMd),
                    bottomRight: ref(borderBottomRightRadiusMd),
                    bottomLeft: ref(borderBottomLeftRadiusMd)
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
            margin: {
                top: 0,
                right: multiply(ref(spacingLg), 0.5),
                bottom: 0,
                left: 0
            },
            width: multiply(ref(spacingLg), 2),
            height: ref(spacingLg),
            /**
             * @element indicator
             */
            indicator: {
                margin: 0,
                borderRadius: {
                    topLeft: ref(borderTopLeftRadiusLg),
                    topRight: ref(borderTopRightRadiusLg),
                    bottomRight: ref(borderBottomRightRadiusLg),
                    bottomLeft: ref(borderBottomLeftRadiusLg)
                }
            }
        }
    }[variant];
}

export function useToggleThemeConfig(userOptions: DefinitionOptions) {
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
    const { lineHeight } = useLineHeight(options);
    const { transitionProperty, transitionDuration, transitionTimingFunction } =
        useTransition(options);
    const { textColorWeak } = useTextColor(options);

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
            fontSize: ref(fontSize),
            lineHeight: ref(lineHeight),
            transition: {
                property: ref(transitionProperty),
                duration: ref(transitionDuration),
                timingFunction: ref(transitionTimingFunction)
            },
            /**
             * @element indicator
             */
            indicator: {
                scale: 0.8,
                transition: {
                    property: 'background, transform, top, left',
                    duration: ref(transitionDuration),
                    timingFunction: ref(transitionTimingFunction)
                }
            },
            /**
             * @state disabled
             */
            disabled: {
                color: ref(textColorWeak)
            },
            /**
             * @state readonly
             */
            readonly: {
                color: ref(textColorWeak)
            }
        },
        useToggleThemeColorConfig(defaultToggleColor, options),
        useToggleThemeSizeConfig(defaultToggleSize, options)
    );
}

/**
 * Variables
 */

export function useToggleThemeColorVariables(
    variant: ToggleColorVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables([ns, variant] as const, useToggleThemeColorConfig(variant, options), {
        ...options,
        registerComposed: false
    });
}

export function useToggleThemeSizeVariables(
    variant: ToggleSizeVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables([ns, variant] as const, useToggleThemeSizeConfig(variant, options), {
        ...options,
        registerComposed: false
    });
}

export function useToggleThemeVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables(ns, useToggleThemeConfig(options), {
        ...options,
        registerComposed: false
    });
}

/**
 * Selectors
 */

export function useToggleThemeLayout(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    selector(
        '.toggle',
        {
            position: 'relative',
            marginBottom: 0,
            display: 'flex'
        },
        options
    );

    selector(
        '.toggle .toggle-label',
        {
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            margin: 0,
            cursor: 'pointer'
        },
        options
    );

    selector(
        '.toggle .toggle-label::before',
        {
            content: '""',
            position: 'relative',
            display: 'inline-block',
            flexShrink: 0,
            flexGrow: 0
        },
        options
    );

    selector(
        '.toggle .toggle-label::after',
        {
            content: '""',
            position: 'absolute',
            display: 'block',
            zIndex: 1
        },
        options
    );

    selector(
        '.toggle input',
        {
            opacity: 0,
            width: 0,
            height: 0,
            position: 'absolute',
            top: 0,
            left: 0
        },
        options
    );

    selector(
        [
            '.toggle input:disabled ~ .toggle-label::before',
            '.toggle input:disabled ~ .toggle-label::after'
        ],
        {
            cursor: 'not-allowed'
        },
        options
    );

    selector(
        ['.toggle input:disabled ~ .toggle-label', '.toggle input[readonly] ~ .toggle-label'],
        {
            cursor: 'not-allowed'
        },
        options
    );

    selector(
        ['.toggle > .input:disabled ~ .toggle-label', '.toggle > .input[readonly] ~ .toggle-label'],
        {
            cursor: 'default'
        },
        options
    );
}

export function useToggleThemeBase(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        toggleBackground,
        toggleBorderStyle,
        toggleBorderColor,
        toggleBorderWidth,
        toggleBorderRadius,
        toggleBoxShadow,
        toggleColor,
        toggleFontSize,
        toggleWidth,
        toggleHeight,
        toggleMargin,
        toggleTransitionProperty,
        toggleTransitionDuration,
        toggleTransitionTimingFunction,
        toggleIndicatorBackground,
        toggleIndicatorBorderRadius,
        toggleIndicatorTransitionProperty,
        toggleIndicatorTransitionDuration,
        toggleIndicatorTransitionTimingFunction,
        toggleIndicatorScale,
        toggleIndicatorMargin,
        toggleDisabledBackground,
        toggleDisabledBorderColor,
        toggleDisabledColor,
        toggleDisabledIndicatorBackground,
        toggleReadonlyBackground,
        toggleReadonlyBorderColor,
        toggleReadonlyColor,
        toggleReadonlyIndicatorBackground,
        toggleCheckedBackground,
        toggleCheckedBorderColor,
        toggleCheckedIndicatorBackground,
        toggleCheckedDisabledBackground,
        toggleCheckedDisabledBorderColor,
        toggleCheckedDisabledIndicatorBackground,
        toggleCheckedReadonlyBackground,
        toggleCheckedReadonlyBorderColor,
        toggleCheckedReadonlyIndicatorBackground
    } = useToggleThemeVariables(options);

    selector(
        '.toggle .toggle-label',
        {
            color: ref(toggleColor),
            fontSize: ref(toggleFontSize)
        },
        options
    );

    selector(
        '.toggle .toggle-label::before',
        {
            background: ref(toggleBackground),
            boxShadow: vref(toggleBoxShadow),
            borderWidth: vref(toggleBorderWidth),
            borderStyle: vref(toggleBorderStyle),
            borderColor: vref(toggleBorderColor),
            borderRadius: vref(toggleBorderRadius),
            width: ref(toggleWidth),
            height: ref(toggleHeight),
            margin: vref(toggleMargin),
            transitionProperty: ref(toggleTransitionProperty),
            transitionDuration: ref(toggleTransitionDuration),
            transitionTimingFunction: ref(toggleTransitionTimingFunction)
        },
        options
    );

    selector(
        '.toggle .toggle-label::after',
        {
            background: ref(toggleIndicatorBackground),
            borderRadius: vref(toggleIndicatorBorderRadius),
            top: '50%',
            left: multiply(ref(toggleHeight), subtract(1, ref(toggleIndicatorScale)), 0.5),
            width: multiply(ref(toggleHeight), ref(toggleIndicatorScale)),
            height: multiply(ref(toggleHeight), ref(toggleIndicatorScale)),
            margin: vref(toggleIndicatorMargin),
            transitionProperty: ref(toggleIndicatorTransitionProperty),
            transitionDuration: ref(toggleIndicatorTransitionDuration),
            transitionTimingFunction: ref(toggleIndicatorTransitionTimingFunction),
            transform: 'translate(1px, -50%)' // Account for border-width
        },
        options
    );

    selector(
        '.toggle input:checked ~ .toggle-label::before',
        {
            background: ref(toggleCheckedBackground),
            borderColor: vref(toggleCheckedBorderColor)
        },
        options
    );

    selector(
        '.toggle input:checked ~ .toggle-label::after',
        {
            background: ref(toggleCheckedIndicatorBackground),
            left: subtract(
                ref(toggleWidth),
                multiply(ref(toggleHeight), subtract(1, ref(toggleIndicatorScale)), 0.5)
            ),
            transform: ['translate(-100%, -50%)', 'translateX(1px)'] // Account for border-width
        },
        options
    );

    selector(
        '.toggle input:focus ~ .toggle-label::before',
        {
            boxShadowOffsetX: 0,
            boxShadowOffsetY: 0,
            boxShadowBlurRadius: '1px',
            boxShadowColor: ref(toggleCheckedBackground)
        },
        options
    );

    selector(
        '.toggle input:disabled ~ .toggle-label',
        {
            color: ref(toggleDisabledColor)
        },
        options
    );

    selector(
        '.toggle input:disabled ~ .toggle-label::before',
        {
            borderColor: vref(toggleDisabledBorderColor),
            background: ref(toggleDisabledBackground)
        },
        options
    );

    selector(
        '.toggle input:disabled ~ .toggle-label::after',
        {
            background: ref(toggleDisabledIndicatorBackground)
        },
        options
    );

    selector(
        '.toggle input[readonly] ~ .toggle-label',
        {
            color: ref(toggleReadonlyColor)
        },
        options
    );

    selector(
        '.toggle input[readonly] ~ .toggle-label::before',
        {
            borderColor: vref(toggleReadonlyBorderColor),
            background: ref(toggleReadonlyBackground)
        },
        options
    );

    selector(
        '.toggle input[readonly] ~ .toggle-label::after',
        {
            background: ref(toggleReadonlyIndicatorBackground)
        },
        options
    );

    selector(
        '.toggle input:checked:disabled ~ .toggle-label::before',
        {
            background: ref(toggleCheckedDisabledBackground),
            borderColor: vref(toggleCheckedDisabledBorderColor)
        },
        options
    );

    selector(
        '.toggle input:checked:disabled ~ .toggle-label::after',
        {
            background: ref(toggleCheckedDisabledIndicatorBackground)
        },
        options
    );

    selector(
        '.toggle input:checked[readonly] ~ .toggle-label::before',
        {
            background: ref(toggleCheckedReadonlyBackground),
            borderColor: vref(toggleCheckedReadonlyBorderColor)
        },
        options
    );

    selector(
        '.toggle input:checked[readonly] ~ .toggle-label::after',
        {
            background: ref(toggleCheckedReadonlyIndicatorBackground)
        },
        options
    );

    selector(
        ['.toggle.-rounded .toggle-label::before', '.toggle.-rounded .toggle-label::after'],
        {
            borderRadius: ref(toggleHeight)
        },
        options
    );
}

export function useToggleThemeColorSelectors(
    variant: ToggleColorVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        toggleBackground,
        toggleBorderTopColor,
        toggleBorderRightColor,
        toggleBorderBottomColor,
        toggleBorderLeftColor,
        toggleColor,
        toggleIndicatorBackground,
        toggleDisabledBackground,
        toggleDisabledBorderTopColor,
        toggleDisabledBorderRightColor,
        toggleDisabledBorderBottomColor,
        toggleDisabledBorderLeftColor,
        toggleDisabledIndicatorBackground,
        toggleReadonlyBackground,
        toggleReadonlyBorderTopColor,
        toggleReadonlyBorderRightColor,
        toggleReadonlyBorderBottomColor,
        toggleReadonlyBorderLeftColor,
        toggleReadonlyIndicatorBackground,
        toggleCheckedBackground,
        toggleCheckedBorderTopColor,
        toggleCheckedBorderRightColor,
        toggleCheckedBorderBottomColor,
        toggleCheckedBorderLeftColor,
        toggleCheckedDisabledBackground,
        toggleCheckedDisabledBorderTopColor,
        toggleCheckedDisabledBorderRightColor,
        toggleCheckedDisabledBorderBottomColor,
        toggleCheckedDisabledBorderLeftColor,
        toggleCheckedDisabledIndicatorBackground,
        toggleCheckedReadonlyBackground,
        toggleCheckedReadonlyBorderTopColor,
        toggleCheckedReadonlyBorderRightColor,
        toggleCheckedReadonlyBorderBottomColor,
        toggleCheckedReadonlyBorderLeftColor,
        toggleCheckedReadonlyIndicatorBackground
    } = useToggleThemeVariables(options);

    const {
        variantBackground,
        variantBorderTopColor,
        variantBorderRightColor,
        variantBorderBottomColor,
        variantBorderLeftColor,
        variantColor,
        variantIndicatorBackground,
        variantDisabledBackground,
        variantDisabledBorderTopColor,
        variantDisabledBorderRightColor,
        variantDisabledBorderBottomColor,
        variantDisabledBorderLeftColor,
        variantDisabledIndicatorBackground,
        variantReadonlyBackground,
        variantReadonlyBorderTopColor,
        variantReadonlyBorderRightColor,
        variantReadonlyBorderBottomColor,
        variantReadonlyBorderLeftColor,
        variantReadonlyIndicatorBackground,
        variantCheckedBackground,
        variantCheckedBorderTopColor,
        variantCheckedBorderRightColor,
        variantCheckedBorderBottomColor,
        variantCheckedBorderLeftColor,
        variantCheckedDisabledBackground,
        variantCheckedDisabledBorderTopColor,
        variantCheckedDisabledBorderRightColor,
        variantCheckedDisabledBorderBottomColor,
        variantCheckedDisabledBorderLeftColor,
        variantCheckedDisabledIndicatorBackground,
        variantCheckedReadonlyBackground,
        variantCheckedReadonlyBorderTopColor,
        variantCheckedReadonlyBorderRightColor,
        variantCheckedReadonlyBorderBottomColor,
        variantCheckedReadonlyBorderLeftColor,
        variantCheckedReadonlyIndicatorBackground
    } = setExportsNamespace(useToggleThemeColorVariables(variant, options), 'variant');

    selector(
        `.toggle.-${variant}`,
        {
            [toVariableKey(toggleColor)]: ref(variantColor),
            [toVariableKey(toggleBackground)]: ref(variantBackground),
            [toVariableKey(toggleBorderTopColor)]: ref(variantBorderTopColor),
            [toVariableKey(toggleBorderRightColor)]: ref(variantBorderRightColor),
            [toVariableKey(toggleBorderBottomColor)]: ref(variantBorderBottomColor),
            [toVariableKey(toggleBorderLeftColor)]: ref(variantBorderLeftColor),
            [toVariableKey(toggleIndicatorBackground)]: ref(variantIndicatorBackground),
            [toVariableKey(toggleDisabledBackground)]: ref(variantDisabledBackground),
            [toVariableKey(toggleDisabledBorderTopColor)]: ref(variantDisabledBorderTopColor),
            [toVariableKey(toggleDisabledBorderRightColor)]: ref(variantDisabledBorderRightColor),
            [toVariableKey(toggleDisabledBorderBottomColor)]: ref(variantDisabledBorderBottomColor),
            [toVariableKey(toggleDisabledBorderLeftColor)]: ref(variantDisabledBorderLeftColor),
            [toVariableKey(toggleDisabledIndicatorBackground)]: ref(
                variantDisabledIndicatorBackground
            ),
            [toVariableKey(toggleReadonlyBackground)]: ref(variantReadonlyBackground),
            [toVariableKey(toggleReadonlyBorderTopColor)]: ref(variantReadonlyBorderTopColor),
            [toVariableKey(toggleReadonlyBorderRightColor)]: ref(variantReadonlyBorderRightColor),
            [toVariableKey(toggleReadonlyBorderBottomColor)]: ref(variantReadonlyBorderBottomColor),
            [toVariableKey(toggleReadonlyBorderLeftColor)]: ref(variantReadonlyBorderLeftColor),
            [toVariableKey(toggleReadonlyIndicatorBackground)]: ref(
                variantReadonlyIndicatorBackground
            ),
            [toVariableKey(toggleCheckedBackground)]: ref(variantCheckedBackground),
            [toVariableKey(toggleCheckedBorderTopColor)]: ref(variantCheckedBorderTopColor),
            [toVariableKey(toggleCheckedBorderRightColor)]: ref(variantCheckedBorderRightColor),
            [toVariableKey(toggleCheckedBorderBottomColor)]: ref(variantCheckedBorderBottomColor),
            [toVariableKey(toggleCheckedBorderLeftColor)]: ref(variantCheckedBorderLeftColor),
            [toVariableKey(toggleCheckedDisabledBackground)]: ref(variantCheckedDisabledBackground),
            [toVariableKey(toggleCheckedDisabledBorderTopColor)]: ref(
                variantCheckedDisabledBorderTopColor
            ),
            [toVariableKey(toggleCheckedDisabledBorderRightColor)]: ref(
                variantCheckedDisabledBorderRightColor
            ),
            [toVariableKey(toggleCheckedDisabledBorderBottomColor)]: ref(
                variantCheckedDisabledBorderBottomColor
            ),
            [toVariableKey(toggleCheckedDisabledBorderLeftColor)]: ref(
                variantCheckedDisabledBorderLeftColor
            ),
            [toVariableKey(toggleCheckedDisabledIndicatorBackground)]: ref(
                variantCheckedDisabledIndicatorBackground
            ),
            [toVariableKey(toggleCheckedReadonlyBackground)]: ref(variantCheckedReadonlyBackground),
            [toVariableKey(toggleCheckedReadonlyBorderTopColor)]: ref(
                variantCheckedReadonlyBorderTopColor
            ),
            [toVariableKey(toggleCheckedReadonlyBorderRightColor)]: ref(
                variantCheckedReadonlyBorderRightColor
            ),
            [toVariableKey(toggleCheckedReadonlyBorderBottomColor)]: ref(
                variantCheckedReadonlyBorderBottomColor
            ),
            [toVariableKey(toggleCheckedReadonlyBorderLeftColor)]: ref(
                variantCheckedReadonlyBorderLeftColor
            ),
            [toVariableKey(toggleCheckedReadonlyIndicatorBackground)]: ref(
                variantCheckedReadonlyIndicatorBackground
            )
        },
        options
    );
}

export function useToggleThemeSizeSelectors(
    variant: ToggleSizeVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        toggleBorderTopLeftRadius,
        toggleBorderTopRightRadius,
        toggleBorderBottomRightRadius,
        toggleBorderBottomLeftRadius,
        toggleFontSize,
        toggleHeight,
        toggleWidth,
        toggleIndicatorMarginTop,
        toggleIndicatorMarginRight,
        toggleIndicatorMarginBottom,
        toggleIndicatorMarginLeft
    } = useToggleThemeVariables(options);
    const {
        variantFontSize,
        variantHeight,
        variantWidth,
        variantBorderTopLeftRadius,
        variantBorderTopRightRadius,
        variantBorderBottomRightRadius,
        variantBorderBottomLeftRadius,
        variantIndicatorMarginTop,
        variantIndicatorMarginRight,
        variantIndicatorMarginBottom,
        variantIndicatorMarginLeft
    } = setExportsNamespace(useToggleThemeSizeVariables(variant, options), 'variant');

    selector(
        `.toggle.-${variant}`,
        {
            [toVariableKey(toggleFontSize)]: ref(variantFontSize),
            [toVariableKey(toggleHeight)]: ref(variantHeight),
            [toVariableKey(toggleWidth)]: ref(variantWidth),
            [toVariableKey(toggleBorderTopLeftRadius)]: ref(variantBorderTopLeftRadius),
            [toVariableKey(toggleBorderTopRightRadius)]: ref(variantBorderTopRightRadius),
            [toVariableKey(toggleBorderBottomRightRadius)]: ref(variantBorderBottomRightRadius),
            [toVariableKey(toggleBorderBottomLeftRadius)]: ref(variantBorderBottomLeftRadius),
            [toVariableKey(toggleIndicatorMarginTop)]: ref(variantIndicatorMarginTop),
            [toVariableKey(toggleIndicatorMarginRight)]: ref(variantIndicatorMarginRight),
            [toVariableKey(toggleIndicatorMarginBottom)]: ref(variantIndicatorMarginBottom),
            [toVariableKey(toggleIndicatorMarginLeft)]: ref(variantIndicatorMarginLeft)
        },
        options
    );
}

/**
 * Composables
 */

export function useToggleThemeColors(colors: ToggleColorVariant[], userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    colors.forEach((color) => useToggleThemeColorSelectors(color, options));
}

export function useToggleThemeSizes(sizes: ToggleSizeVariant[], userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    sizes.forEach((size) => useToggleThemeSizeSelectors(size, options));
}

export function useToggleTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useToggleThemeVariables(options);
    useToggleThemeLayout(options);
    useToggleThemeBase(options);
    useToggleThemeSizes([...defaultToggleSizes], options);
    useToggleThemeColors([...defaultToggleColors], options);
}
