import {
    defaultDefinitionOptions,
    multiply,
    nsvariables,
    ref,
    selector,
    stripExportsNamespace,
    subtract,
    transform
} from '@inkline/core';
import {
    ComponentBrandNeutralColor,
    ComponentSize,
    defaultComponentNeutralColors,
    defaultComponentSizes,
    useBorder,
    useBorderRadiusBase,
    useBoxShadow,
    useBrandColors,
    useBrandColorVariants,
    useContrastTextColor,
    useFontSize,
    useKeyMappedSizeMultiplier,
    useLineHeight,
    useMarginBase,
    useNeutralColors,
    useTextColor,
    useTransition
} from '@inkline/theme';

const ns = 'toggle';

export const defaultToggleColor = 'info';
export const defaultToggleColors = defaultComponentNeutralColors;
export const defaultToggleSize = 'md';
export const defaultToggleSizes = defaultComponentSizes;

export type ToggleColorVariant = ComponentBrandNeutralColor;
export type ToggleSizeVariant = ComponentSize;

export function useToggleThemeVariables(options = defaultDefinitionOptions) {
    const {
        borderTopStyle,
        borderTopWidth,
        borderRightStyle,
        borderRightWidth,
        borderBottomStyle,
        borderBottomWidth,
        borderLeftStyle,
        borderLeftWidth
    } = useBorder();
    const { colorPrimary, colorLightH, colorLightS, colorLightL, colorLightA } = useBrandColors();
    const {
        colorLightTint100,
        colorLightTint50,
        colorLightShade50,
        colorLightShade100,
        colorPrimary200,
        colorPrimary300,
        colorPrimary400
    } = useBrandColorVariants();
    const { colorWhite } = useNeutralColors();
    const { marginRight } = useMarginBase();
    const {
        borderTopLeftRadius,
        borderTopRightRadius,
        borderBottomRightRadius,
        borderBottomLeftRadius
    } = useBorderRadiusBase();
    const {
        boxShadowOffsetX,
        boxShadowOffsetY,
        boxShadowBlurRadius,
        boxShadowSpreadRadius,
        boxShadowColor
    } = useBoxShadow();
    const { colorWhiteH, colorWhiteS, colorWhiteL, colorWhiteA } = useNeutralColors();
    const { contrastTextColorLight } = useContrastTextColor();
    const { fontSize } = useFontSize();
    const { lineHeight } = useLineHeight();
    const { transitionProperty, transitionDuration, transitionTimingFunction } = useTransition();
    const { textColorWeak } = useTextColor();

    const toggleVariables = nsvariables(
        ns,
        {
            border: {
                top: {
                    width: ref(borderTopWidth),
                    style: ref(borderTopStyle),
                    color: ref(colorLightShade50)
                },
                right: {
                    width: ref(borderRightWidth),
                    style: ref(borderRightStyle),
                    color: ref(colorLightShade50)
                },
                bottom: {
                    width: ref(borderBottomWidth),
                    style: ref(borderBottomStyle),
                    color: ref(colorLightShade50)
                },
                left: {
                    width: ref(borderLeftWidth),
                    style: ref(borderLeftStyle),
                    color: ref(colorLightShade50)
                }
            },
            borderRadius: {
                topLeft: ref(borderTopLeftRadius),
                topRight: ref(borderTopRightRadius),
                bottomRight: ref(borderBottomRightRadius),
                bottomLeft: ref(borderBottomLeftRadius)
            },
            boxShadow: {
                offsetX: ref(boxShadowOffsetX),
                offsetY: ref(boxShadowOffsetY),
                blurRadius: ref(boxShadowBlurRadius),
                spreadRadius: ref(boxShadowSpreadRadius),
                color: ref(boxShadowColor)
            },
            background: {
                h: ref(colorLightH),
                s: ref(colorLightS),
                l: ref(colorLightL),
                a: ref(colorLightA)
            },
            color: ref(contrastTextColorLight),
            fontSize: ref(fontSize),
            lineHeight: ref(lineHeight),
            width: '40px',
            height: '20px',
            margin: {
                top: 0,
                right: ref(marginRight),
                bottom: 0,
                left: 0
            },
            transition: {
                property: ref(transitionProperty),
                duration: ref(transitionDuration),
                timingFunction: ref(transitionTimingFunction)
            },
            /**
             * @element indicator
             */
            indicator: {
                background: {
                    h: ref(colorWhiteH),
                    s: ref(colorWhiteS),
                    l: ref(colorWhiteL),
                    a: ref(colorWhiteA)
                },
                borderRadius: {
                    topLeft: ref(borderTopLeftRadius),
                    topRight: ref(borderTopRightRadius),
                    bottomRight: ref(borderBottomRightRadius),
                    bottomLeft: ref(borderBottomLeftRadius)
                },
                width: '1rem',
                height: '1rem',
                margin: {
                    top: '-0.5rem',
                    left: subtract('20px', '1rem')
                },
                transition: {
                    property: 'background, transform',
                    duration: ref(transitionDuration),
                    timingFunction: ref(transitionTimingFunction)
                }
            },
            /**
             * @state disabled
             */
            disabled: {
                background: ref(colorLightTint50),
                border: {
                    color: ref(colorLightShade50)
                },
                color: ref(textColorWeak),

                /**
                 * @state disabled
                 * @element indicator
                 */
                indicator: {
                    background: ref(colorLightShade100)
                }
            },
            /**
             * @state readonly
             */
            readonly: {
                background: ref(colorLightTint100),
                border: {
                    color: ref(colorLightShade50)
                },
                color: ref(textColorWeak),
                /**
                 * @state readonly
                 * @element indicator
                 */
                indicator: {
                    background: ref(colorLightShade100)
                }
            },
            /**
             * @state checked
             */
            checked: {
                background: ref(colorPrimary),
                border: {
                    color: ref(colorLightShade50)
                },
                color: ref(textColorWeak),
                /**
                 * @state checked
                 * @element indicator
                 */
                indicator: {
                    background: ref(colorWhite)
                },
                /**
                 * @state checked
                 * @state disabled
                 */
                disabled: {
                    background: ref(colorPrimary200),
                    border: {
                        color: ref(colorPrimary300)
                    }
                },
                /**
                 * @state checked
                 * @state readonly
                 */
                readonly: {
                    background: ref(colorPrimary300),
                    border: {
                        color: ref(colorPrimary400)
                    }
                }
            }
        },
        options
    );

    return {
        ...toggleVariables,
        ...nsvariables([ns, 'checked', 'disabled', 'indicator'] as const, {
            background: ref(colorWhite)
        }),
        ...nsvariables([ns, 'checked', 'readonly', 'indicator'] as const, {
            background: ref(colorWhite)
        })
    };
}

export function useToggleThemeLayout() {
    selector('.toggle', {
        position: 'relative',
        marginBottom: 0,
        display: 'flex'
    });

    selector('.toggle .toggle-label', {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        margin: 0,
        cursor: 'pointer'
    });

    selector('.toggle .toggle-label::before', {
        content: '""',
        position: 'relative',
        display: 'inline-block',
        flexShrink: 0,
        flexGrow: 0
    });

    selector('.toggle .toggle-label::after', {
        content: '""',
        position: 'absolute',
        display: 'block',
        top: '50%',
        left: 0,
        zIndex: 1,
        transform: 'translate(0, 0)'
    });

    selector('.toggle input', {
        opacity: 0,
        width: 0,
        height: 0,
        position: 'absolute',
        top: 0,
        left: 0
    });

    selector(
        [
            '.toggle input:disabled ~ .toggle-label::before',
            '.toggle input:disabled ~ .toggle-label::after'
        ],
        {
            cursor: 'not-allowed'
        }
    );

    selector(
        ['.toggle input:disabled ~ .toggle-label', '.toggle input[readonly] ~ .toggle-label'],
        {
            cursor: 'not-allowed'
        }
    );

    selector(
        ['.toggle > .input:disabled ~ .toggle-label', '.toggle > .input[readonly] ~ .toggle-label'],
        {
            cursor: 'default'
        }
    );
}

export function useToggleThemeBase() {
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
        toggleIndicatorHeight,
        toggleIndicatorWidth,
        toggleIndicatorMargin,
        toggleIndicatorMarginLeft,
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
    } = useToggleThemeVariables();

    selector('.toggle .toggle-label', {
        color: ref(toggleColor),
        fontSize: ref(toggleFontSize)
    });

    selector('.toggle .toggle-label::before', {
        background: ref(toggleBackground),
        boxShadow: ref(toggleBoxShadow),
        borderWidth: ref(toggleBorderWidth),
        borderStyle: ref(toggleBorderStyle),
        borderColor: ref(toggleBorderColor),
        borderRadius: ref(toggleBorderRadius),
        width: ref(toggleWidth),
        height: ref(toggleHeight),
        margin: ref(toggleMargin),
        transitionProperty: ref(toggleTransitionProperty),
        transitionDuration: ref(toggleTransitionDuration),
        transitionTimingFunction: ref(toggleTransitionTimingFunction)
    });

    selector('.toggle .toggle-label::after', {
        background: ref(toggleIndicatorBackground),
        borderRadius: ref(toggleIndicatorBorderRadius),
        width: ref(toggleIndicatorWidth),
        height: ref(toggleIndicatorHeight),
        margin: ref(toggleIndicatorMargin),
        transitionProperty: ref(toggleIndicatorTransitionProperty),
        transitionDuration: ref(toggleIndicatorTransitionDuration),
        transitionTimingFunction: ref(toggleIndicatorTransitionTimingFunction)
    });

    selector('.toggle input:checked ~ .toggle-label::before', {
        background: ref(toggleCheckedBackground),
        borderColor: ref(toggleCheckedBorderColor)
    });

    selector('.toggle input:checked ~ .toggle-label::after', {
        background: ref(toggleCheckedIndicatorBackground),
        transform: transform(
            'translate',
            multiply(subtract(ref(toggleWidth), ref(toggleIndicatorMarginLeft)), 0.5),
            0
        )
    });

    selector('.toggle input:focus ~ .toggle-label::before', {
        boxShadowOffsetX: 0,
        boxShadowOffsetY: 0,
        boxShadowBlurRadius: '1px',
        boxShadowColor: ref(toggleCheckedBackground)
    });

    selector('.toggle input:disabled ~ .toggle-label', {
        color: ref(toggleDisabledColor)
    });

    selector('.toggle input:disabled ~ .toggle-label::before', {
        borderColor: ref(toggleDisabledBorderColor),
        Background: ref(toggleDisabledBackground)
    });

    selector('.toggle input:disabled ~ .toggle-label::after', {
        background: ref(toggleDisabledIndicatorBackground)
    });

    selector('.toggle input[readonly] ~ .toggle-label', {
        color: ref(toggleReadonlyColor)
    });

    selector('.toggle input[readonly] ~ .toggle-label::before', {
        borderColor: ref(toggleReadonlyBorderColor),
        background: ref(toggleReadonlyBackground)
    });

    selector('.toggle input[readonly] ~ .toggle-label::after', {
        background: ref(toggleReadonlyIndicatorBackground)
    });

    selector('.toggle input:checked:disabled ~ .toggle-label::before', {
        background: ref(toggleCheckedDisabledBackground),
        borderColor: ref(toggleCheckedDisabledBorderColor)
    });

    selector('.toggle input:checked:disabled ~ .toggle-label::after', {
        background: ref(toggleCheckedDisabledIndicatorBackground)
    });

    selector('.toggle input:checked[readonly] ~ .toggle-label::before', {
        background: ref(toggleCheckedReadonlyBackground),
        borderColor: ref(toggleCheckedReadonlyBorderColor)
    });

    selector('.toggle input:checked[readonly] ~ .toggle-label::after', {
        background: ref(toggleCheckedReadonlyIndicatorBackground)
    });

    selector('.toggle.-rounded .toggle-label::before', {
        borderRadius: ref(toggleHeight)
    });

    selector('.toggle.-rounded .toggle-label::after', {
        borderRadius: ref(toggleIndicatorHeight)
    });
}

export function useToggleThemeSizeFactory(variant: ComponentSize) {
    const {
        toggleBorderTopLeftRadius,
        toggleBorderTopRightRadius,
        toggleBorderBottomRightRadius,
        toggleBorderBottomLeftRadius,
        toggleFontSize,
        toggleHeight,
        toggleWidth,
        toggleIndicatorHeight,
        toggleIndicatorWidth,
        toggleIndicatorMarginTop,
        toggleIndicatorMarginLeft
    } = useToggleThemeVariables();
    const sizeMultiplierKeyMap = useKeyMappedSizeMultiplier();
    const sizeMultiplierRef = ref(sizeMultiplierKeyMap[variant]);
    const sizeNs = [ns, variant] as const;

    const {
        fontSize,
        height,
        width,
        borderRadius,
        indicatorHeight,
        indicatorWidth,
        indicatorMargin,
        indicatorMarginLeft
    } = stripExportsNamespace(
        nsvariables(sizeNs, {
            borderRadius: {
                topLeft: multiply(ref(toggleBorderTopLeftRadius), sizeMultiplierRef),
                topRight: multiply(ref(toggleBorderTopRightRadius), sizeMultiplierRef),
                bottomRight: multiply(ref(toggleBorderBottomRightRadius), sizeMultiplierRef),
                bottomLeft: multiply(ref(toggleBorderBottomLeftRadius), sizeMultiplierRef)
            },
            fontSize: multiply(ref(toggleFontSize), sizeMultiplierRef),
            height: multiply(ref(toggleHeight), sizeMultiplierRef),
            width: multiply(ref(toggleWidth), sizeMultiplierRef),
            /**
             * @element indicator
             */
            indicator: {
                height: multiply(ref(toggleIndicatorHeight), sizeMultiplierRef),
                width: multiply(ref(toggleIndicatorWidth), sizeMultiplierRef),
                margin: {
                    top: multiply(ref(toggleIndicatorMarginTop), sizeMultiplierRef),
                    left: multiply(ref(toggleIndicatorMarginLeft), sizeMultiplierRef)
                }
            }
        })
    );

    selector(`.toggle.-${variant} .toggle-label`, {
        fontSize: ref(fontSize)
    });

    selector(`.toggle.-${variant} .toggle-label::before`, {
        borderRadius: ref(borderRadius),
        width: ref(width),
        height: ref(height)
    });

    selector(`.toggle.-${variant} .toggle-label::after`, {
        width: ref(indicatorWidth),
        height: ref(indicatorHeight),
        margin: ref(indicatorMargin)
    });

    selector(`.toggle.-${variant} input:checked ~ .toggle-label::after`, {
        transform: transform(
            'translate',
            multiply(subtract(ref(width), ref(indicatorMarginLeft)), 0.5),
            0
        )
    });

    selector(`.toggle.-${variant}.-rounded .toggle-label::before`, {
        borderRadius: ref(height)
    });

    selector(`.toggle.-${variant}.-rounded .toggle-label::after`, {
        borderRadius: ref(indicatorHeight)
    });
}

export function useToggleThemeSizes({ sizes = defaultComponentSizes } = {}) {
    sizes.forEach(useToggleThemeSizeFactory);
}

export function useToggleThemeColorFactory(_variant: ComponentBrandNeutralColor) {
    // const colorKey = capitalize(variant);
    // const shadeOrTint = variant === 'dark' ? 'Tint' : 'Shade';
    // const {
    //     colorLight,
    //     colorDark,
    //     colorPrimary,
    //     colorLightH,
    //     colorLightS,
    //     colorLightL,
    //     colorLightA,
    //     colorDarkH,
    //     colorDarkS,
    //     colorDarkL,
    //     colorDarkA
    // } = useBrandColors();
    // const {
    //     colorLightTint50,
    //     colorLightTint100,
    //     colorLightShade50,
    //     colorLightShade100,
    //     colorDarkTint50,
    //     colorDarkTint100,
    //     colorDarkShade50,
    //     colorDarkShade100,
    //     colorPrimary200,
    //     colorPrimary300,
    //     colorPrimary400,
    //     colorPrimary800
    // } = useBrandColorVariants();
    // const { colorGray100, colorGray300 } = useNeutralColors();
    //
    // const { contrastTextColorLight, contrastTextColorDark } = useContrastTextColor();
    //
    // const colorNs = [ns, variant] as const;
    //
    // const {
    //     background,
    //     borderColor,
    //     color,
    //     disabledBackground,
    //     disabledBorderColor,
    //     disabledIndicatorBackground,
    //     readonlyBackground,
    //     readonlyBorderColor,
    //     readonlyIndicatorBackground
    // } = stripExportsNamespace(
    //     nsvariables(
    //         colorNs,
    //         {
    //             light: {
    //                 background: ref(colorLight),
    //                 border: {
    //                     color: ref(colorLightShade50)
    //                 },
    //                 color: ref(contrastTextColorLight),
    //                 disabled: {
    //                     background: ref(colorLight),
    //                     border: {
    //                         color: ref(colorLightShade50)
    //                     },
    //                     indicator: {
    //                         background: ref(colorGray100)
    //                     }
    //                 },
    //                 readonly: {
    //                     background: ref(colorLight),
    //                     border: {
    //                         color: ref(colorLightShade50)
    //                     },
    //                     indicator: {
    //                         background: ref(colorGray100)
    //                     }
    //                 },
    //                 checked: {
    //                     disabled: {
    //                         background: ref(colorPrimary200),
    //                         border: {
    //                             color: ref(colorPrimary300)
    //                         }
    //                     },
    //                     readonly: {
    //                         background: ref(colorPrimary200),
    //                         border: {
    //                             color: ref(colorPrimary300)
    //                         }
    //                     }
    //                 }
    //             },
    //             dark: {
    //                 background: ref(colorDark),
    //                 border: {
    //                     color: ref(colorDarkTint50)
    //                 },
    //                 color: ref(contrastTextColorDark),
    //                 disabled: {
    //                     background: ref(colorDarkTint50),
    //                     border: {
    //                         color: ref(colorDarkTint100)
    //                     },
    //                     indicator: {
    //                         background: ref(colorGray300)
    //                     }
    //                 },
    //                 readonly: {
    //                     background: ref(colorDarkTint50),
    //                     border: {
    //                         color: ref(colorDarkTint100)
    //                     },
    //                     indicator: {
    //                         background: ref(colorGray300)
    //                     }
    //                 },
    //                 checked: {
    //                     disabled: {
    //                         background: ref(colorPrimary800)
    //                     },
    //                     readonly: {
    //                         background: ref(colorPrimary800)
    //                     }
    //                 }
    //             }
    //         }[variant]
    //     )
    // );
    //
    // selector(`.toggle.-${variant} .toggle-label`, {
    //     color: ref(color)
    // });
    //
    // selector(`.toggle.-${variant} .toggle-label::before`, {
    //     background: ref(background),
    //     borderColor: ref(borderColor),
    //     color: ref(color)
    // });
    //
    // selector(`.toggle.-${variant} input:disabled ~ .toggle-label::before`, {
    //     background: ref(disabledBackground),
    //     borderColor: ref(disabledBorderColor)
    // });
    //
    // selector(`.toggle.-${variant} input:disabled ~ .toggle-label::after`, {
    //     background: ref(disabledIndicatorBackground)
    // });
    //
    // selector(`.toggle.-${variant} input[readonly] ~ .toggle-label::before`, {
    //     background: ref(readonlyBackground),
    //     borderColor: ref(readonlyBorderColor)
    // });
    //
    // selector(`.toggle.-${variant} input[readonly] ~ .toggle-label::after`, {
    //     background: ref(readonlyIndicatorBackground)
    // });
    //
    // // const { checkedDisabledBackground, checkedDisabledBorderColor } = setExportsNamespace(
    // //     nsvariables(checkedDisabledNs, {
    // //         background: variant === 'dark' ? ref('colorPrimary800') : ref('colorPrimary200'),
    // //         border: {
    // //             color: variant === 'dark' ? ref('colorPrimary800') : ref('colorPrimary300')
    // //         }
    // //     }),
    // //     ['checked', 'disabled'] as const
    // // );
    // //
    // // selector(`.toggle.-${variant} input:checked:disabled ~ .toggle-label::before`, {
    // //     background: ref(checkedDisabledBackground),
    // //     borderColor: ref(checkedDisabledBorderColor)
    // // });
    // //
    // // const { checkedReadonlyBackground, checkedReadonlyBorderColor } = setExportsNamespace(
    // //     nsvariables(checkedReadonlyNs, {
    // //         background: variant === 'dark' ? ref('colorPrimary800') : ref('colorPrimary200'),
    // //         border: {
    // //             color: variant === 'dark' ? ref('colorPrimary800') : ref('colorPrimary300')
    // //         }
    // //     }),
    // //     ['checked', 'readonly'] as const
    // // );
    // //
    // // selector(`.toggle.-${variant} input:checked[readonly] ~ .toggle-label::before`, {
    // //     background: ref(checkedReadonlyBackground),
    // //     borderColor: ref(checkedReadonlyBorderColor)
    // // });
    // //
    // // selector(`.toggle.-${variant} input:checked ~ toggle-label::before`, {
    // //     background: ref(checkedBackground),
    // //     borderColor: ref(checkedBorderColor)
    // // });
    //
    // // selector(`.toggle.-${variant} input:checked ~ toggle-label::after`, {
    // //     background: ref(checkedIndicatorBackground)
    // // });
}

export function useToggleThemeColors({ colors = defaultComponentNeutralColors } = {}) {
    colors.forEach(useToggleThemeColorFactory);
}

export function useToggleThemeLayoutModifiers() {}

export function useToggleTheme() {
    useToggleThemeVariables();
    useToggleThemeLayout();
    useToggleThemeBase();
    useToggleThemeSizes();
    useToggleThemeColors();
    useToggleThemeLayoutModifiers();
}
