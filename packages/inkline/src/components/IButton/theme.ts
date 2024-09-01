// import { defineComponent } from '../../../../../utils';
//
// export const button = defineComponent(
//     {
//         primary: {
//             color: 'var(--contrast-text-color-dark)',
//             background: 'var(--color-primary)',
//             border: {
//                 color: 'var(--color-primary-shade-50)'
//             },
//             hover: {
//                 background: 'var(--color-primary-shade-50)'
//             },
//             focus: {
//                 background: 'var(--color-primary-shade-50)'
//             },
//             active: {
//                 background: 'var(--color-primary-shade-100)'
//             }
//         },
//         secondary: {
//             color: 'var(--contrast-text-color-dark)',
//             background: 'var(--color-secondary)',
//             border: {
//                 color: 'var(--color-secondary-shade-50)'
//             },
//             hover: {
//                 background: 'var(--color-secondary-shade-50)'
//             },
//             focus: {
//                 background: 'var(--color-secondary-shade-50)'
//             },
//             active: {
//                 background: 'var(--color-secondary-shade-100)'
//             }
//         },
//         info: {
//             color: 'var(--contrast-text-color-light)',
//             background: 'var(--color-info)',
//             border: {
//                 color: 'var(--color-info-shade-50)'
//             },
//             hover: {
//                 background: 'var(--color-info-shade-50)'
//             },
//             focus: {
//                 background: 'var(--color-info-shade-50)'
//             },
//             active: {
//                 background: 'var(--color-info-shade-100)'
//             }
//         },
//         success: {
//             color: 'var(--contrast-text-color-light)',
//             background: 'var(--color-success)',
//             border: {
//                 color: 'var(--color-success-shade-50)'
//             },
//             hover: {
//                 background: 'var(--color-success-shade-50)'
//             },
//             focus: {
//                 background: 'var(--color-success-shade-50)'
//             },
//             active: {
//                 background: 'var(--color-success-shade-100)'
//             }
//         },
//         warning: {
//             color: 'var(--contrast-text-color-light)',
//             background: 'var(--color-warning)',
//             border: {
//                 color: 'var(--color-warning-shade-50)'
//             },
//             hover: {
//                 background: 'var(--color-warning-shade-50)'
//             },
//             focus: {
//                 background: 'var(--color-warning-shade-50)'
//             },
//             active: {
//                 background: 'var(--color-warning-shade-100)'
//             }
//         },
//         danger: {
//             color: 'var(--contrast-text-color-light)',
//             background: 'var(--color-danger)',
//             border: {
//                 color: 'var(--color-danger-shade-50)'
//             },
//             hover: {
//                 background: 'var(--color-danger-shade-50)'
//             },
//             focus: {
//                 background: 'var(--color-danger-shade-50)'
//             },
//             active: {
//                 background: 'var(--color-danger-shade-100)'
//             }
//         },
//         light: {
//             color: 'var(--contrast-text-color-light)',
//             background: 'var(--color-light)',
//             border: {
//                 color: 'var(--color-light-shade-50)'
//             },
//             hover: {
//                 background: 'var(--color-light-shade-50)'
//             },
//             focus: {
//                 background: 'var(--color-light-shade-50)'
//             },
//             active: {
//                 background: 'var(--color-light-shade-100)'
//             }
//         },
//         dark: {
//             color: 'var(--contrast-text-color-dark)',
//             background: 'var(--color-dark)',
//             border: {
//                 color: 'var(--color-dark-tint-50)'
//             },
//             hover: {
//                 background: 'var(--color-dark-tint-50)'
//             },
//             focus: {
//                 background: 'var(--color-dark-tint-50)'
//             },
//             active: {
//                 background: 'var(--color-dark-tint-100)'
//             }
//         },
//         sm: {
//             padding: {
//                 top: 'calc(var(--button--padding-top) * var(--size-multiplier-sm))',
//                 right: 'calc(var(--button--padding-right) * var(--size-multiplier-sm))',
//                 bottom: 'calc(var(--button--padding-bottom) * var(--size-multiplier-sm))',
//                 left: 'calc(var(--button--padding-left) * var(--size-multiplier-sm))'
//             },
//             borderRadius: {
//                 topLeft: 'calc(var(--button--border-top-left-radius) * var(--size-multiplier-sm))',
//                 topRight:
//                     'calc(var(--button--border-top-right-radius) * var(--size-multiplier-sm))',
//                 bottomRight:
//                     'calc(var(--button--border-bottom-right-radius) * var(--size-multiplier-sm))',
//                 bottomLeft:
//                     'calc(var(--button--border-bottom-left-radius) * var(--size-multiplier-sm))'
//             },
//             fontSize: 'calc(var(--button--font-size) * var(--size-multiplier-sm))',
//             circle: {
//                 width: 'calc(50px * var(--size-multiplier-sm))',
//                 height: 'calc(50px * var(--size-multiplier-sm))'
//             },
//             square: {
//                 width: 'calc(50px * var(--size-multiplier-sm))',
//                 height: 'calc(50px * var(--size-multiplier-sm))'
//             }
//         },
//         md: {
//             padding: {
//                 top: 'calc(var(--button--padding-top) * var(--size-multiplier-md))',
//                 right: 'calc(var(--button--padding-right) * var(--size-multiplier-md))',
//                 bottom: 'calc(var(--button--padding-bottom) * var(--size-multiplier-md))',
//                 left: 'calc(var(--button--padding-left) * var(--size-multiplier-md))'
//             },
//             borderRadius: {
//                 topLeft: 'calc(var(--button--border-top-left-radius) * var(--size-multiplier-md))',
//                 topRight:
//                     'calc(var(--button--border-top-right-radius) * var(--size-multiplier-md))',
//                 bottomRight:
//                     'calc(var(--button--border-bottom-right-radius) * var(--size-multiplier-md))',
//                 bottomLeft:
//                     'calc(var(--button--border-bottom-left-radius) * var(--size-multiplier-md))'
//             },
//             fontSize: 'calc(var(--button--font-size) * var(--size-multiplier-md))',
//             circle: {
//                 width: 'calc(50px * var(--size-multiplier-md))',
//                 height: 'calc(50px * var(--size-multiplier-md))'
//             },
//             square: {
//                 width: 'calc(50px * var(--size-multiplier-md))',
//                 height: 'calc(50px * var(--size-multiplier-md))'
//             }
//         },
//         lg: {
//             padding: {
//                 top: 'calc(var(--button--padding-top) * var(--size-multiplier-lg))',
//                 right: 'calc(var(--button--padding-right) * var(--size-multiplier-lg))',
//                 bottom: 'calc(var(--button--padding-bottom) * var(--size-multiplier-lg))',
//                 left: 'calc(var(--button--padding-left) * var(--size-multiplier-lg))'
//             },
//             borderRadius: {
//                 topLeft: 'calc(var(--button--border-top-left-radius) * var(--size-multiplier-lg))',
//                 topRight:
//                     'calc(var(--button--border-top-right-radius) * var(--size-multiplier-lg))',
//                 bottomRight:
//                     'calc(var(--button--border-bottom-right-radius) * var(--size-multiplier-lg))',
//                 bottomLeft:
//                     'calc(var(--button--border-bottom-left-radius) * var(--size-multiplier-lg))'
//             },
//             fontSize: 'calc(var(--button--font-size) * var(--size-multiplier-lg))',
//             circle: {
//                 width: 'calc(50px * var(--size-multiplier-lg))',
//                 height: 'calc(50px * var(--size-multiplier-lg))'
//             },
//             square: {
//                 width: 'calc(50px * var(--size-multiplier-lg))',
//                 height: 'calc(50px * var(--size-multiplier-lg))'
//             }
//         }
//     }
// );

import {
    ComponentColor,
    ComponentSize,
    defaultComponentBrandColors,
    defaultComponentSizes,
    defaultDefinitionOptions,
    multiply,
    nsdefine,
    ref,
    selector,
    useBorder,
    useBorderRadiusBase,
    useBoxShadow,
    useBrandColors,
    useBrandColorVariants,
    useContrastTextColor,
    useFontSize,
    useMarginBase,
    usePaddingBase,
    useTransition
} from '@inkline/config';

const ns = 'button';

export function useButtonThemeVariables(options = defaultDefinitionOptions) {
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
    const { colorLightShade50, colorLightShade100 } = useBrandColorVariants();
    const { paddingTop, paddingRight, paddingBottom, paddingLeft, padding } = usePaddingBase();
    const { marginLeft } = useMarginBase();
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
    const { colorLightH, colorLightS, colorLightL, colorLightA } = useBrandColors();
    const { contrastTextColorLight } = useContrastTextColor();
    const { fontSize } = useFontSize();
    const { transitionProperty, transitionDuration, transitionTimingFunction, transition } =
        useTransition();

    return {
        ...nsdefine(
            ns,
            {
                color: ref(contrastTextColorLight),
                background: {
                    h: ref(colorLightH),
                    s: ref(colorLightS),
                    l: ref(colorLightL),
                    a: ref(colorLightA)
                },
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
                fontSize: ref(fontSize),
                padding: {
                    top: ref(paddingTop),
                    right: ref(paddingRight),
                    bottom: ref(paddingBottom),
                    left: ref(paddingLeft)
                },
                transition: {
                    property: ref(transitionProperty),
                    duration: ref(transitionDuration),
                    timingFunction: ref(transitionTimingFunction)
                }
            },
            options
        ),
        ...nsdefine(
            [ns, 'active'] as const,
            {
                background: ref(colorLightShade100)
            },
            options
        ),
        ...nsdefine([ns, 'hover'] as const, { background: ref(colorLightShade50) }, options),
        ...nsdefine([ns, 'focus'] as const, { background: ref(colorLightShade50) }, options),
        ...nsdefine([ns, 'disabled'] as const, { opacity: '0.8' }, options),
        ...nsdefine(
            [ns, 'circle'] as const,
            {
                width: '50px',
                height: '50px'
            },
            options
        ),
        ...nsdefine(
            [ns, 'square'] as const,
            {
                width: '50px',
                height: '50px'
            },
            options
        ),
        ...nsdefine([ns, 'loader'], { width: '1rem', height: '1rem' }, options),
        ...nsdefine(
            [ns, 'icon'],
            { margin: { top: 0, right: 0, bottom: 0, left: multiply(ref(marginLeft), 0.5) } },
            options
        )
    };
}

// .button {
//     // Target non disabled buttons
//      &:not(:disabled, .-disabled, .-link, .-outline) {
//         // Add "hand" cursor to non-disabled .button elements
//         cursor: pointer;
//
//     &:active,
//     &.-active,
//     &:hover,
//     &.-hover,
//     &:focus,
//     &.-focus {
//             text-decoration: none;
//         }
//
//     &:not(:active, .-active) {
//             // Focus and hover state
//         &:hover,
//         &.-hover,
//         &:focus,
//         &.-focus {
//                 outline: 0;
//             }
//
//         &:hover,
//         &.-hover {
//             @include components.background('button', 'hover', true);
//             @include components.border-color('button', 'hover', true);
//             @include components.color('button', 'hover', true);
//             }
//
//         &:focus,
//         &.-focus {
//             @include components.background('button', 'focus', true);
//             @include components.border-color('button', 'focus', true);
//             @include components.color('button', 'focus', true);
//             }
//         }
//
//     &:active,
//     &.-active {
//         @include components.background('button', 'active', true);
//         @include components.border-color('button', 'active', true);
//         @include components.color('button', 'active', true);
//         }
//     }
//
//     // Block buttons
//     // Make buttons span the whole parent width
// &.-block {
//         display: flex;
//         width: 100%;
//
//         + .button.-block {
//         @include components.margin('button', 'block');
//         }
//     }
//
//     // Link buttons
//     // Make a button look and behave like a link
// &.-link {
//     @include components.color(
//             'button',
//             'link',
//             properties.background-h('button') properties.background-s('button')
//         properties.background-l('button') properties.background-a('button')
//     );
//
//         box-shadow: none;
//         background-color: transparent;
//         border-color: transparent;
//
//     &:not(:disabled, .-disabled) {
//         &:hover,
//         &.-hover,
//         &:focus,
//         &.-focus,
//         &:active,
//         &.-active {
//                 background: transparent;
//                 border-color: transparent;
//                 box-shadow: none;
//                 text-decoration: underline;
//             }
//
//         &:hover,
//         &.-hover {
//             @include components.color(
//                     'button' 'link',
//                     'hover',
//                 properties.background-h('button', 'hover')
//                 properties.background-s('button', 'hover')
//                 properties.background-l('button', 'hover')
//                 properties.background-a('button', 'hover')
//             );
//             }
//
//         &:focus,
//         &.-focus {
//             @include components.color(
//                     'button' 'link',
//                     'focus',
//                 properties.background-h('button', 'focus')
//                 properties.background-s('button', 'focus')
//                 properties.background-l('button', 'focus')
//                 properties.background-a('button', 'focus')
//             );
//             }
//
//         &:active,
//         &.-active {
//             @include components.color(
//                     'button' 'link',
//                     'active',
//                 properties.background-h('button', 'active')
//                 properties.background-s('button', 'active')
//                 properties.background-l('button', 'active')
//                 properties.background-a('button', 'active')
//             );
//             }
//         }
//
//     &:disabled,
//     &.-disabled {
//             pointer-events: none;
//         }
//     }
//
//     // Outline buttons
//     // Remove button background and add a beautiful transition on hover
// &.-outline {
//     &:not(:hover, &.-hover, :focus, &.-focus) {
//             background: transparent;
//             color: properties.background('button');
//         }
//     }
//
//     // Circle button
// &.-circle {
//     @include components.size('button', 'circle');
//
//         border-radius: 50%;
//         padding: 0;
//     }
//
//     // Square button
// &.-square {
//     @include components.size('button', 'square');
//
//         padding: 0;
//     }
//
// &.-loading {
//         pointer-events: none;
//         cursor: default;
//     }
//
// .loader {
//     @include components.size('button', 'loader');
//
//     > svg > circle {
//             stroke: properties.color('button') !important;
//         }
//     }
//
// .button-icon,
// .button-content {
//         line-height: 1;
//         display: inline-flex;
//         justify-content: center;
//         align-items: center;
//     }
//
// .button-icon {
//         + .button-content {
//         @include components.margin('button', 'icon');
//         }
//     }
//
//     //
//     // Button group border accent
//     //
//
// .button-group:not(.-vertical) > &:not(:first-of-type) {
//     @include components.border-left-color('button');
//     }
//
// .button-group.-vertical > &:not(:first-of-type) {
//     @include components.border-top-color('button');
//     }
// }
//
// // Future-proof disabling of clicks on `<a>` elements
// a.button.-disabled,
// *:disabled a.button {
//     pointer-events: none;
// }
//
// // Specificity overrides
// input[type='submit'],
//     input[type='reset'],
//     input[type='button'] {
// &.-block {
//         width: 100%;
//     }
// }

export function useButtonThemeLayout() {
    const { buttonDisabledOpacity } = useButtonThemeVariables();

    selector('.button', {
        display: 'inline-flex',
        textAlign: 'center',
        whiteSpace: 'nowrap',
        verticalAlign: 'middle',
        userSelect: 'none',
        justifyContent: 'center',
        alignItems: 'center'
    });

    selector('.button.-disabled, .button:disabled', {
        cursor: 'not-allowed',
        boxShadow: 'none',
        opacity: ref(buttonDisabledOpacity)
    });
}

export function useButtonThemeBase() {
    const {
        buttonBorderWidth,
        buttonBorderStyle,
        buttonBorderColor,
        buttonPadding,
        buttonBorderRadius,
        buttonBoxShadow,
        buttonColor,
        buttonBackground,
        buttonFontSize,
        buttonTransition
    } = useButtonThemeVariables();

    selector('.button', {
        borderWidth: ref(buttonBorderWidth),
        borderStyle: ref(buttonBorderStyle),
        borderColor: ref(buttonBorderColor),
        borderRadius: ref(buttonBorderRadius),
        color: ref(buttonColor),
        background: ref(buttonBackground),
        boxShadow: ref(buttonBoxShadow),
        fontSize: ref(buttonFontSize),
        padding: ref(buttonPadding),
        transition: ref(buttonTransition)
    });
}

export function useButtonThemeSizeFactory(size: ComponentSize) {}

export function useButtonThemeColorFactory(color: ComponentColor) {}

export function useButtonThemeSizes(sizes = defaultComponentSizes) {}

export function useButtonThemeColors(colors = defaultComponentBrandColors) {}

export function useButtonTheme() {
    useButtonThemeVariables();
    useButtonThemeLayout();
    useButtonThemeBase();
    useButtonThemeSizes();
    useButtonThemeColors();
}
