import {
    calc,
    defaultDefinitionOptions,
    divide,
    multiply,
    nsvariables,
    ref,
    replaceExportsNamespace,
    selector,
    setExportsNamespace,
    stripExportsNamespace,
    subtract,
    transform
} from '@inkline/core';
import {
    ComponentBrandColor,
    ComponentSize,
    defaultComponentBrandColors,
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
    usePaddingBase,
    useTextColor,
    useTransition
} from '@inkline/theme';
import { capitalize } from '@inkline/utils';

// export const toggle = defineComponent(
//     {
//         background: 'var(--color-light-shade-50)',
//         boxShadow: {
//             offsetX: 'var(--box-shadow-offset-x)',
//             offsetY: 'var(--box-shadow-offset-y)',
//             blurRadius: 'var(--box-shadow-blur-radius)',
//             spreadRadius: 'var(--box-shadow-spread-radius)',
//             color: 'var(--box-shadow-color)'
//         },
//         border: {
//             top: {
//                 width: 'var(--border-top-width)',
//                 style: 'var(--border-top-style)',
//                 color: 'var(--border-top-color)'
//             },
//             right: {
//                 width: 'var(--border-right-width)',
//                 style: 'var(--border-right-style)',
//                 color: 'var(--border-right-color)'
//             },
//             bottom: {
//                 width: 'var(--border-bottom-width)',
//                 style: 'var(--border-bottom-style)',
//                 color: 'var(--border-bottom-color)'
//             },
//             left: {
//                 width: 'var(--border-left-width)',
//                 style: 'var(--border-left-style)',
//                 color: 'var(--border-left-color)'
//             }
//         },
//         borderRadius: {
//             topLeft: 'var(--border-top-left-radius)',
//             topRight: 'var(--border-top-right-radius)',
//             bottomRight: 'var(--border-bottom-right-radius)',
//             bottomLeft: 'var(--border-bottom-left-radius)'
//         },
//         color: 'var(--contrast-text-color-light)',
//         fontSize: 'var(--font-size)',
//         transition: {
//             property: 'background-color, color, border-color, transform',
//             duration: 'var(--transition-duration)',
//             timingFunction: 'var(--transition-timing-function)'
//         },
//         width: '40px',
//         height: '20px',
//         margin: {
//             top: 0,
//             right: 'var(--margin-right)',
//             bottom: 0,
//             left: 0
//         },
//         indicator: {
//             background: 'var(--color-white)',
//             width: '1rem',
//             height: '1rem'
//         },
//         checked: {
//             background: 'var(--color-primary)',
//             border: {
//                 color: 'var(--color-primary-shade-50)'
//             },
//             indicator: {
//                 background: 'var(--color-white)'
//             },
//             disabled: {
//                 background: 'var(--color-primary-shade-100)'
//             },
//             readonly: {
//                 background: 'var(--color-light-shade-100)'
//             }
//         },
//         disabled: {
//             color: 'var(--text-color-weaker)',
//             background: 'var(--color-light)',
//             border: {
//                 color: 'var(--color-light-shade-50)'
//             },
//             indicator: {
//                 background: 'var(--color-light-shade-100)'
//             }
//         },
//         readonly: {
//             color: 'var(--text-color-weaker)',
//             background: 'var(--color-light)',
//             border: {
//                 color: 'var(--color-light-shade-50)'
//             },
//             indicator: {
//                 background: 'var(--color-light-shade-100)'
//             }
//         }
//     },
//     {
//         light: {
//             background: 'var(--color-light-shade-50)',
//             border: {
//                 color: 'var(--color-light-shade-100)'
//             },
//             color: 'var(--contrast-text-color-light)',
//             disabled: {
//                 background: 'var(--color-light)',
//                 border: {
//                     color: 'var(--color-light-shade-50)'
//                 },
//                 indicator: {
//                     background: 'var(--color-gray-100)'
//                 }
//             },
//             readonly: {
//                 background: 'var(--color-light)',
//                 border: {
//                     color: 'var(--color-light-shade-50)'
//                 },
//                 indicator: {
//                     background: 'var(--color-gray-100)'
//                 }
//             },
//             checked: {
//                 disabled: {
//                     background: 'var(--color-primary-200)',
//                     border: {
//                         color: 'var(--color-primary-300)'
//                     }
//                 },
//                 readonly: {
//                     background: 'var(--color-primary-200)',
//                     border: {
//                         color: 'var(--color-primary-300)'
//                     }
//                 }
//             }
//         },
//         dark: {
//             background: 'var(--color-dark)',
//             border: {
//                 color: 'var(--color-dark-tint-50)'
//             },
//             color: 'var(--contrast-text-color-dark)',
//             disabled: {
//                 background: 'var(--color-dark-tint-50)',
//                 border: {
//                     color: 'var(--color-dark-tint-100)'
//                 },
//                 indicator: {
//                     background: 'var(--color-gray-300)'
//                 }
//             },
//             readonly: {
//                 background: 'var(--color-dark-tint-50)',
//                 border: {
//                     color: 'var(--color-dark-tint-100)'
//                 },
//                 indicator: {
//                     background: 'var(--color-gray-300)'
//                 }
//             },
//             checked: {
//                 disabled: {
//                     background: 'var(--color-primary-800)'
//                 },
//                 readonly: {
//                     background: 'var(--color-primary-800)'
//                 }
//             }
//         },
//         sm: {
//             borderRadius: {
//                 topLeft: 'calc(var(--toggle--border-top-left-radius) * var(--size-multiplier-sm))',
//                 topRight:
//                     'calc(var(--toggle--border-top-right-radius) * var(--size-multiplier-sm))',
//                 bottomRight:
//                     'calc(var(--toggle--border-bottom-right-radius) * var(--size-multiplier-sm))',
//                 bottomLeft:
//                     'calc(var(--toggle--border-bottom-left-radius) * var(--size-multiplier-sm))'
//             },
//             fontSize: 'calc(var(--toggle--font-size) * var(--size-multiplier-sm))',
//             width: 'calc(var(--toggle--width) * var(--size-multiplier-sm))',
//             height: 'calc(var(--toggle--height) * var(--size-multiplier-sm))',
//             indicator: {
//                 width: 'calc(var(--toggle--indicator--width) * var(--size-multiplier-sm))',
//                 height: 'calc(var(--toggle--indicator--height) * var(--size-multiplier-sm))'
//             }
//         },
//         md: {
//             borderRadius: {
//                 topLeft: 'calc(var(--toggle--border-top-left-radius) * var(--size-multiplier-md))',
//                 topRight:
//                     'calc(var(--toggle--border-top-right-radius) * var(--size-multiplier-md))',
//                 bottomRight:
//                     'calc(var(--toggle--border-bottom-right-radius) * var(--size-multiplier-md))',
//                 bottomLeft:
//                     'calc(var(--toggle--border-bottom-left-radius) * var(--size-multiplier-md))'
//             },
//             fontSize: 'calc(var(--toggle--font-size) * var(--size-multiplier-md))',
//             width: 'calc(var(--toggle--width) * var(--size-multiplier-md))',
//             height: 'calc(var(--toggle--height) * var(--size-multiplier-md))',
//             indicator: {
//                 width: 'calc(var(--toggle--indicator--width) * var(--size-multiplier-md))',
//                 height: 'calc(var(--toggle--indicator--height) * var(--size-multiplier-md))'
//             }
//         },
//         lg: {
//             borderRadius: {
//                 topLeft: 'calc(var(--toggle--border-top-left-radius) * var(--size-multiplier-lg))',
//                 topRight:
//                     'calc(var(--toggle--border-top-right-radius) * var(--size-multiplier-lg))',
//                 bottomRight:
//                     'calc(var(--toggle--border-bottom-right-radius) * var(--size-multiplier-lg))',
//                 bottomLeft:
//                     'calc(var(--toggle--border-bottom-left-radius) * var(--size-multiplier-lg))'
//             },
//             fontSize: 'calc(var(--toggle--font-size) * var(--size-multiplier-lg))',
//             width: 'calc(var(--toggle--width) * var(--size-multiplier-lg))',
//             height: 'calc(var(--toggle--height) * var(--size-multiplier-lg))',
//             indicator: {
//                 width: 'calc(var(--toggle--indicator--width) * var(--size-multiplier-lg))',
//                 height: 'calc(var(--toggle--indicator--height) * var(--size-multiplier-lg))'
//             }
//         }
//     }
// );

// -----------------------------------------------------------------
// /**
//  * Toggle
//  */
//
// @use '../../../css/mixins/components';
// @use '../../../css/functions/properties';
//
// .toggle {
//     > input {
//         @each $state in ('disabled' 'readonly') {
//             &[#{$state}] {
//                 + .toggle-label {
//                     @include components.color('toggle' $state, 'label', true);
//
//                     cursor: default;
//
//                     &::before {
//                         @include components.background('toggle', $state, true);
//                         @include components.border-color('toggle', $state, true);
//                     }
//
//                     &::after {
//                         @include components.background('toggle', $state 'indicator', true);
//                     }
//                 }
//
//                 &:checked + .toggle-label {
//                     &::before {
//                         @include components.background('toggle', 'checked' $state, true);
//                         @include components.border-color('toggle', 'checked' $state, true);
//                     }
//
//                     &::after {
//                         @include components.background(
//                             'toggle',
//                             'checked' $state 'indicator',
//                             properties.background-h('toggle', $state 'indicator')
//                                 properties.background-s('toggle', $state 'indicator')
//                                 properties.background-l('toggle', $state 'indicator')
//                                 properties.background-a('toggle', $state 'indicator')
//                         );
//                     }
//                 }
//             }
//         }
//     }
// }

const ns = 'toggle';

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
    const { colorPrimary, colorDanger } = useBrandColors();
    const { colorLightTint100, colorLightTint50, colorLightShade50, colorLightShade100 } =
        useBrandColorVariants();
    const { colorWhite } = useNeutralColors();
    const { paddingTop, paddingRight, paddingBottom, paddingLeft } = usePaddingBase();
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
    const { textColorWeak, textColorWeaker } = useTextColor();

    return {
        ...nsvariables(
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
                    h: ref(colorWhiteH),
                    s: ref(colorWhiteS),
                    l: ref(colorWhiteL),
                    a: ref(colorWhiteA)
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
                }
            },
            options
        ),
        ...nsvariables(
            [ns, 'indicator'] as const,
            {
                background: ref(colorWhite),
                borderRadius: {
                    topLeft: ref(borderTopLeftRadius),
                    topRight: ref(borderTopRightRadius),
                    bottomRight: ref(borderBottomRightRadius),
                    bottomLeft: ref(borderBottomLeftRadius)
                },
                width: '1rem',
                height: '1rem',
                transition: {
                    property: ref(transitionProperty),
                    duration: ref(transitionDuration),
                    timingFunction: ref(transitionTimingFunction)
                }
            },
            options
        ),
        ...nsvariables([ns, 'checked'] as const, {
            background: ref(colorPrimary),
            border: {
                color: ref(colorLightShade50)
            },
            color: ref(textColorWeak)
        }),
        ...nsvariables(
            [ns, 'disabled'] as const,
            {
                background: ref(colorLightTint50),
                border: {
                    color: ref(colorLightShade50)
                },
                color: ref(textColorWeak)
            },
            options
        ),
        ...nsvariables([ns, 'indicator', 'disabled'] as const, {}),
        ...nsvariables(
            [ns, 'readonly'] as const,
            {
                background: ref(colorLightTint100),
                border: {
                    color: ref(colorLightShade50)
                },
                color: ref(textColorWeak)
            },
            options
        )
        // ...nsvariables(
        //     [ns, 'hover'] as const,
        //     {
        //         border: {
        //             color: ref(colorLightShade100)
        //         }
        //     },
        //     options
        // ),
        // ...nsvariables(
        //     [ns, 'focus'] as const,
        //     {
        //         border: {
        //             color: ref(colorPrimary)
        //         }
        //     },
        //     options
        // ),
        // ...nsvariables(
        //     [ns, 'prefix'] as const,
        //     {
        //         color: ref(textColorWeaker)
        //     },
        //     options
        // ),
        // ...nsvariables(
        //     [ns, 'suffix'] as const,
        //     {
        //         color: ref(textColorWeaker)
        //     },
        //     options
        // )
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
        margin: 0
    });

    selector('.toggle .toggle-label::before', {
        content: '""',
        position: 'relative',
        display: 'inline-block',
        cursor: 'pointer',
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

    selector('.toggle > input', {
        opacity: 0,
        width: 0,
        height: 0,
        position: 'absolute',
        top: 0,
        left: 0
    });

    selector(
        [
            '.toggle > input:disabled + .toggle-label::before',
            '.toggle > input:disabled + .toggle-label::after'
        ],
        {
            cursor: 'not-allowed'
        }
    );

    selector(
        ['.toggle > input:disabled + toggle-label', '.toggle > input:readonly + toggle-label'],
        {
            cursor: 'not-allowed'
        }
    );
}

export function useToggleThemeLayoutModifiers() {}

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
        toggleCheckedBackground,
        toggleDisabledBackground,
        toggleDisabledBorderColor,
        toggleDisabledColor,
        toggleIndicatorDisabledBackground,
        toggleReadonlyBackground,
        toggleReadonlyBorderColor,
        toggleReadonlyColor,
        toggleIndicatorReadonlyBackground
        //     toggleHoverBorderColor,
        //     toggleFocusBorderColor,
        //     toggleErrorBorderColor,
        //     toggleDisabledBackground,
        //     toggleReadonlyBackground,
        //     togglePlaceholderColor,
        //     togglePrefixColor,
        //     toggleSuffixColor,
        //     toggleIconWidth,
        //     toggleIconHeight,
        //     toggleIconColor
    } = useToggleThemeVariables();
    //
    // selector('.toggle .toggle-field', {
    //     background: ref(toggleBackground),
    //     borderStyle: ref(toggleBorderStyle),
    //     borderColor: ref(toggleBorderColor),
    //     borderWidth: ref(toggleBorderWidth),
    //     borderRadius: ref(toggleBorderRadius),
    //     boxShadow: ref(toggleBoxShadow),
    //     fontSize: ref(toggleFontSize),
    //     transitionProperty: ref(toggleTransitionProperty),
    //     transitionDuration: ref(toggleTransitionDuration),
    //     transitionTimingFunction: ref(toggleTransitionTimingFunction)
    // });
    //

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
        transitionProperty: ref(toggleIndicatorTransitionProperty),
        transitionDuration: ref(toggleIndicatorTransitionDuration),
        transitionTimingFunction: ref(toggleIndicatorTransitionTimingFunction),
        width: ref(toggleIndicatorWidth),
        height: ref(toggleIndicatorHeight),
        marginTop: divide(ref(toggleIndicatorHeight), -2),
        marginLeft: subtract(divide(ref(toggleHeight), 2), divide(ref(toggleIndicatorHeight), 2))
    });

    selector('.toggle.-rounded .toggle-label::before', {
        borderRadius: ref(toggleHeight)
    });

    selector('.toggle.-rounded .toggle-label::after', {
        borderRadius: ref(toggleIndicatorHeight)
    });

    selector('.toggle > input:checked + toggle-label::before', {
        background: ref(toggleBackground),
        borderColor: ref(toggleBorderColor)
    });

    selector('.toggle > input:checked + toggle-label::after', {
        background: ref(toggleIndicatorBackground),
        transform: transform('translate', multiply(ref(toggleWidth, 0.5)), 0)
    });

    selector('.toggle > input:focus + toggle-label::before', {
        boxShadowOffsetX: 0,
        boxShadowOffsetY: 0,
        boxShadowBlurRadius: '1px',
        boxShadowColor: ref(toggleCheckedBackground)
    });

    selector('.toggle > input:disabled + .toggle-label', {
        color: ref(toggleDisabledColor)
    });

    selector('.toggle > input:disabled + .toggle-label::before', {
        toggleBorderColor: ref(toggleDisabledBorderColor),
        toggleBackground: ref(toggleDisabledBackground)
    });

    selector('.toggle >input:disabled + .toggle-label::after', {
        background: ref(toggleIndicatorDisabledBackground)
    });

    selector('.toggle > input:readonly + .toggle-label', {
        color: ref(toggleReadonlyColor)
    });

    selector('.toggle > input:readonly + .toggle-label::before', {
        toggleBorderColor: ref(toggleReadonlyBorderColor),
        toggleBackground: ref(toggleReadonlyBackground)
    });

    selector('.toggle >input:readonly + .toggle-label::after', {
        background: ref(toggleIndicatorReadonlyBackground)
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
        toggleIndicatorHeight
    } = useToggleThemeVariables();
    const sizeMultiplierKeyMap = useKeyMappedSizeMultiplier();
    const sizeMultiplierRef = ref(sizeMultiplierKeyMap[variant]);
    const sizeNs = [ns, variant] as const;
    const indicatorSizeNs = [...sizeNs, 'indicator'] as const;

    const {
        borderTopLeftRadius,
        borderTopRightRadius,
        borderBottomRightRadius,
        borderBottomLeftRadius,
        fontSize,
        height,
        width
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
            width: multiply(ref(toggleWidth), sizeMultiplierRef)
        })
    );

    const { indicatorHeight, indicatorWidth } = setExportsNamespace(
        nsvariables(indicatorSizeNs, {
            height: multiply(ref(toggleIndicatorHeight), sizeMultiplierRef),
            width: multiply(ref(toggleIndicatorHeight), sizeMultiplierRef)
        }),
        'indicator'
    );

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

export function useToggleThemeColorFactory(variant: ComponentBrandColor) {
    // const colorKey = capitalize(variant);
    // const shadeOrTint = variant === 'dark' ? 'Tint' : 'Shade';
    // const brandColors = useBrandColors();
    // const brandColorVariants = useBrandColorVariants();
    // const neutralColors = useNeutralColors();
    // const contrastTextColors = useContrastTextColor();
    // const colorNs = [ns, variant] as const;
    //
    // const { borderColor, background, color } = stripExportsNamespace(
    //     nsvariables(colorNs, {
    //         borderColor: ref(brandColorVariants[`color${colorKey}${shadeOrTint}50`]),
    //         background: ref(
    //             variant === 'light' ? neutralColors.colorWhite : brandColors[`color${colorKey}`]
    //         ),
    //         color: ref(contrastTextColors[`contrastTextColor${colorKey}`])
    //     })
    // );
    //
    // const { hoverBorderColor } = setExportsNamespace(
    //     nsvariables([...colorNs, 'hover'] as const, {
    //         borderColor: ref(brandColorVariants[`color${colorKey}${shadeOrTint}100`])
    //     }),
    //     'hover'
    // );
    //
    // const { focusBorderColor } = setExportsNamespace(
    //     nsvariables([...colorNs, 'focus'] as const, {
    //         borderColor: ref(brandColors.colorPrimary)
    //     }),
    //     'focus'
    // );
    //
    // const { disabledBackground } = setExportsNamespace(
    //     nsvariables([...colorNs, 'disabled'] as const, {
    //         background:
    //             variant === 'light'
    //                 ? ref(brandColors.colorLight)
    //                 : ref(brandColorVariants[`color${colorKey}${shadeOrTint}100`])
    //     }),
    //     'disabled'
    // );
    //
    // const { readonlyBackground } = setExportsNamespace(
    //     nsvariables([...colorNs, 'readonly'] as const, {
    //         background:
    //             variant === 'light'
    //                 ? ref(brandColorVariants.colorLightTint50)
    //                 : ref(brandColorVariants[`color${colorKey}${shadeOrTint}50`])
    //     }),
    //     'readonly'
    // );
    //
    // selector(`.toggle.-${variant} .toggle-field`, {
    //     background: ref(background),
    //     borderColor: ref(borderColor)
    // });
    //
    // selector(
    //     [
    //         `.toggle.-${variant} .toggle-field > toggle`,
    //         `.toggle.-${variant} .toggle-field > select`,
    //         `.toggle.-${variant} .toggle-field > textarea`
    //     ],
    //     {
    //         color: ref(color)
    //     }
    // );
    //
    // selector(
    //     [`.toggle.-${variant}.-hover .toggle-field`, `.toggle.-${variant}:hover .toggle-field`],
    //     {
    //         borderColor: ref(hoverBorderColor)
    //     }
    // );
    //
    // selector(`.toggle.-${variant}.-disabled .toggle-field`, {
    //     background: ref(disabledBackground)
    // });
    //
    // selector(`.toggle.-${variant}.-readonly .toggle-field`, {
    //     background: ref(readonlyBackground)
    // });
    //
    // selector(
    //     [
    //         `.toggle.-${variant}.-focus .toggle-field`,
    //         `.toggle.-${variant}:focus-within .toggle-field`
    //     ],
    //     {
    //         borderColor: ref(focusBorderColor)
    //     }
    // );
    //
    // selector([`.toggle.-${variant} .toggle-prepend`, `.toggle.-${variant} .toggle-append`], {
    //     background: ref(background),
    //     borderColor: ref(borderColor)
    // });
    //
    // selector(`.toggle.-${variant} .toggle-field .toggle-prefix`, {
    //     borderColor: ref(borderColor)
    // });
    //
    // selector(`.toggle.-${variant} .toggle-field .toggle-suffix`, {
    //     borderColor: ref(borderColor)
    // });
}

export function useToggleThemeColors({ colors = defaultComponentBrandColors } = {}) {
    colors.forEach(useToggleThemeColorFactory);
}

export function useToggleTheme() {
    useToggleThemeVariables();
    useToggleThemeLayout();
    useToggleThemeBase();
    useToggleThemeSizes();
    useToggleThemeColors();
    useToggleThemeLayoutModifiers();
}
