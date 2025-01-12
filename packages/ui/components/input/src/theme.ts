import {
    DefinitionOptions,
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
    useBrandColors,
    useColors,
    useContrastTextColor,
    useFontSize,
    useLineHeight,
    useSpacing,
    useTextColor,
    useTransition
} from '@inkline/theme';

const ns = 'input';

const defaultInputColor = 'light';
const defaultInputColors = ['light', 'dark'] as const;

const defaultInputSize = 'md';
const defaultInputSizes = ['sm', 'md', 'lg'] as const;

type InputColorVariant = (typeof defaultInputColors)[number];
type InputSizeVariant = (typeof defaultInputSizes)[number];

/**
 * Config
 */

export function useInputThemeColorConfig(variant: InputColorVariant, options: DefinitionOptions) {
    const {
        colorWhite,
        colorLight,
        colorLightTint50,
        colorLightShade50,
        colorLightShade100,
        colorDark,
        colorDarkTint50,
        colorDarkTint100,
        colorPrimary
    } = useColors(options);
    const { contrastTextColorLight } = useContrastTextColor(options);

    return {
        light: {
            border: {
                color: ref(colorLightShade50)
            },
            background: ref(colorWhite),
            color: ref(contrastTextColorLight),
            /**
             * @state hover
             */
            hover: {
                border: {
                    color: ref(colorLightShade100)
                }
            },
            /**
             * @state focus
             */
            focus: {
                border: {
                    color: ref(colorPrimary)
                }
            },
            /**
             * @state disabled
             */
            disabled: {
                background: ref(colorLight)
            },
            /**
             * @state readonly
             */
            readonly: {
                background: ref(colorLightTint50)
            }
        },
        dark: {
            border: {
                color: ref(colorDarkTint50)
            },
            background: ref(colorDark),
            color: ref(contrastTextColorLight),
            /**
             * @state hover
             */
            hover: {
                border: {
                    color: ref(colorDarkTint100)
                }
            },
            /**
             * @state focus
             */
            focus: {
                border: {
                    color: ref(colorPrimary)
                }
            },
            /**
             * @state disabled
             */
            disabled: {
                background: ref(colorDarkTint100)
            },
            /**
             * @state readonly
             */
            readonly: {
                background: ref(colorDarkTint50)
            }
        }
    }[variant];
}

export function useInputThemeSizeConfig(variant: InputSizeVariant, options: DefinitionOptions) {
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
                top: multiply(ref(spacingSm), 3 / 4),
                right: ref(spacingSm),
                bottom: multiply(ref(spacingSm), 3 / 4),
                left: ref(spacingSm)
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
                top: multiply(ref(spacingMd), 3 / 4),
                right: ref(spacingMd),
                bottom: multiply(ref(spacingMd), 3 / 4),
                left: ref(spacingMd)
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
                top: multiply(ref(spacingLg), 3 / 4),
                right: ref(spacingLg),
                bottom: multiply(ref(spacingLg), 3 / 4),
                left: ref(spacingLg)
            }
        }
    }[variant];
}

export function useInputThemeConfig(options: DefinitionOptions) {
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
    const { colorDanger } = useBrandColors(options);
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
    const { textColorWeak, textColorWeaker } = useTextColor(options);

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
             * @state error
             */
            error: {
                border: {
                    color: ref(colorDanger)
                }
            },
            /**
             * @element placeholder
             */
            placeholder: {
                color: ref(textColorWeaker)
            },
            /**
             * @element icon
             */
            icon: {
                width: 'auto',
                height: '1rem',
                color: ref(textColorWeak)
            },
            /**
             * @element prefix
             */
            prefix: {
                color: ref(textColorWeaker)
            },
            /**
             * @element suffix
             */
            suffix: {
                color: ref(textColorWeaker)
            }
        },
        useInputThemeColorConfig(defaultInputColor, options),
        useInputThemeSizeConfig(defaultInputSize, options)
    );
}

/**
 * Variables
 */

export function useInputThemeColorVariables(
    variant: InputColorVariant,
    options: DefinitionOptions
) {
    return nsvariables([ns, variant] as const, useInputThemeColorConfig(variant, options), {
        ...options,
        registerComposed: false
    });
}

export function useInputThemeSizeVariables(variant: InputSizeVariant, options: DefinitionOptions) {
    return nsvariables([ns, variant] as const, useInputThemeSizeConfig(variant, options), {
        ...options,
        registerComposed: false
    });
}

export function useInputThemeVariables(options: DefinitionOptions) {
    return nsvariables(ns, useInputThemeConfig(options), {
        ...options,
        registerComposed: false
    });
}

/**
 * Selectors
 */

export function useInputThemeLayoutSelectors(options: DefinitionOptions) {
    selector(
        '.input',
        {
            display: 'block',
            verticalAlign: 'middle',
            position: 'relative',
            flexGrow: 1,
            flexShrink: 1
        },
        options
    );

    selector(
        '.input .input-field',
        {
            display: 'flex',
            flex: '1 0 auto',
            alignItems: 'center',
            flexDirection: 'row',
            backgroundClip: 'padding-box'
        },
        options
    );

    selector(
        [
            '.input .input-field > input',
            '.input .input-field > select',
            '.input .input-field > textarea'
        ],
        {
            position: 'relative',
            flex: '1 0 auto',
            width: '1%',
            background: 'transparent',
            border: '0',
            margin: '0',
            outline: '0'
        },
        options
    );

    // Remove style for the caret on `<select>`s in E10+.
    selector(
        '.input .input-field > select::-ms-expand',
        {
            backgroundColor: 'transparent',
            border: '0'
        },
        options
    );

    // Override Firefox's unusual default opacity see https://github.com/twbs/bootstrap/pull/11526.
    selector(
        [
            '.input .input-field > input::placeholder',
            '.input .input-field > select::placeholder',
            '.input .input-field > textarea::placeholder'
        ],
        {
            opacity: 1
        },
        options
    );

    // Disabled and read-only inputs
    //
    // HTML5 says that controls under a fieldset > legend:first-child won't be
    // disabled if the fieldset is disabled. Due to implementation difficulty, we
    // don't honor that edge case we style them as disabled anyway.
    selector(
        [
            '.input .input-field > input:disabled',
            '.input .input-field > select:disabled',
            '.input .input-field > textarea:disabled',
            '.input .input-field > input[readonly]',
            '.input .input-field > select[readonly]',
            '.input .input-field > textarea[readonly]'
        ],
        {
            opacity: 1,
            cursor: 'default'
        },
        options
    );

    selector(
        [
            '.input .input-field > input:disabled',
            '.input .input-field > select:disabled',
            '.input .input-field > textarea:disabled'
        ],
        {
            cursor: 'not-allowed'
        },
        options
    );

    selector(
        [
            '.input .input-field > input[readonly]',
            '.input .input-field > select[readonly]',
            '.input .input-field > textarea[readonly]'
        ],
        {
            outline: 0
        },
        options
    );

    selector(
        ['.input .input-field .input-prefix', '.input .input-field .input-suffix'],
        {
            display: 'inline-flex',
            alignItems: 'center',
            zIndex: 1,
            fontStyle: 'normal'
        },
        options
    );

    selector(
        [
            '.input .input-field .input-prefix > button:not(.button, .select-caret)',
            '.input .input-field .input-suffix > button:not(.button, .select-caret)'
        ],
        {
            background: 'transparent',
            border: '0',
            color: 'inherit'
        },
        options
    );

    selector(
        '.input .input-field .input-icon',
        {
            width: 'auto',
            cursor: 'pointer'
        },
        options
    );

    selector(
        '.input .input-value-overlay',
        {
            position: 'absolute',
            cursor: 'default'
        },
        options
    );

    selector(
        ['.input.-prepended', '.input.-appended'],
        {
            display: 'flex',
            flexWrap: 'nowrap',
            flexDirection: 'row',
            alignItems: 'stretch',
            padding: 0
        },
        options
    );

    selector(
        ['.input.-prepended', '.input.-appended'],
        {
            display: 'flex',
            flexWrap: 'nowrap'
        },
        options
    );

    selector(
        ['.input.-prepended .input-field', '.input.-appended .input-field'],
        {
            flexShrink: 1
        },
        options
    );
}

export function useInputThemeModifiersSelectors(options: DefinitionOptions) {
    selector(
        '.input.-prepended .input-field',
        {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0
        },
        options
    );

    selector(
        '.input.-appended .input-field',
        {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0
        },
        options
    );

    selector(
        ['.input .input-prepend > *', '.input .input-append > *'],
        {
            display: 'flex',
            flex: '1 1 auto ',
            alignSelf: 'stretch !important',
            alignItems: 'center !important',
            justifySelf: 'stretch !important',
            borderRadius: '0 !important',
            border: 0,
            width: '100%',
            height: '100%'
        },
        options
    );

    // selector(
    //     ['.input.-prepended > [class$="-trigger"]', '.input.-appended > [class$="-trigger"]'],
    //     {
    //         display: 'flex',
    //         alignSelf: 'stretch'
    //     }, options
    // );
}

export function useInputThemeBaseSelectors(options: DefinitionOptions) {
    const {
        inputBackground,
        inputBorderStyle,
        inputBorderTopColor,
        inputBorderRightColor,
        inputBorderBottomColor,
        inputBorderLeftColor,
        inputBorderWidth,
        inputBorderTopLeftRadius,
        inputBorderTopRightRadius,
        inputBorderBottomRightRadius,
        inputBorderBottomLeftRadius,
        inputBorderRadius,
        inputBoxShadow,
        inputColor,
        inputFontSize,
        inputLineHeight,
        inputPadding,
        inputPaddingRight,
        inputPaddingLeft,
        inputTransitionProperty,
        inputTransitionDuration,
        inputTransitionTimingFunction,
        inputHoverBorderTopColor,
        inputHoverBorderRightColor,
        inputHoverBorderBottomColor,
        inputHoverBorderLeftColor,
        inputFocusBorderTopColor,
        inputFocusBorderRightColor,
        inputFocusBorderBottomColor,
        inputFocusBorderLeftColor,
        inputErrorBorderTopColor,
        inputErrorBorderRightColor,
        inputErrorBorderBottomColor,
        inputErrorBorderLeftColor,
        inputDisabledBackground,
        inputReadonlyBackground,
        inputPlaceholderColor,
        inputPrefixColor,
        inputSuffixColor,
        inputIconWidth,
        inputIconHeight,
        inputIconColor
    } = useInputThemeVariables(options);

    selector(
        '.input .input-field',
        {
            background: vref(inputBackground),
            borderStyle: vref(inputBorderStyle),
            borderTopColor: vref(inputBorderTopColor),
            borderRightColor: vref(inputBorderRightColor),
            borderBottomColor: vref(inputBorderBottomColor),
            borderLeftColor: vref(inputBorderLeftColor),
            borderWidth: vref(inputBorderWidth),
            borderRadius: vref(inputBorderRadius),
            boxShadow: vref(inputBoxShadow),
            fontSize: ref(inputFontSize),
            transitionProperty: ref(inputTransitionProperty),
            transitionDuration: ref(inputTransitionDuration),
            transitionTimingFunction: ref(inputTransitionTimingFunction)
        },
        options
    );

    selector(
        [
            '.input .input-field > input',
            '.input .input-field > select',
            '.input .input-field > textarea'
        ],
        {
            color: vref(inputColor),
            lineHeight: ref(inputLineHeight),
            padding: vref(inputPadding)
        },
        options
    );

    selector(
        [
            '.input .input-field > input::placeholder',
            '.input .input-field > select::placeholder',
            '.input .input-field > textarea::placeholder'
        ],
        {
            color: ref(inputPlaceholderColor)
        },
        options
    );

    selector(
        ['.input .input-field .input-prefix', '.input .input-field .input-suffix'],
        {
            borderTopColor: vref(inputBorderTopColor),
            borderRightColor: vref(inputBorderRightColor),
            borderBottomColor: vref(inputBorderBottomColor),
            borderLeftColor: vref(inputBorderLeftColor),
            paddingLeft: ref(inputPaddingLeft),
            paddingRight: ref(inputPaddingRight),
            transitionProperty: ref(inputTransitionProperty),
            transitionDuration: ref(inputTransitionDuration),
            transitionTimingFunction: ref(inputTransitionTimingFunction)
        },
        options
    );

    selector(
        '.input .input-field .input-prefix',
        {
            borderRightWidth: ref(inputBorderWidth),
            borderRightStyle: ref(inputBorderStyle),
            color: vref(inputPrefixColor)
        },
        options
    );

    selector(
        '.input .input-field .input-suffix',
        {
            borderLeftWidth: ref(inputBorderWidth),
            borderLeftStyle: ref(inputBorderStyle),
            color: vref(inputSuffixColor)
        },
        options
    );

    selector(
        '.input .input-field .input-icon',
        {
            color: vref(inputIconColor),
            width: ref(inputIconWidth),
            height: ref(inputIconHeight),
            transitionProperty: ref(inputTransitionProperty),
            transitionDuration: ref(inputTransitionDuration),
            transitionTimingFunction: ref(inputTransitionTimingFunction)
        },
        options
    );

    selector(
        ['.input.-hover .input-field', '.input:hover .input-field'],
        {
            borderTopColor: vref(inputHoverBorderTopColor),
            borderRightColor: vref(inputHoverBorderRightColor),
            borderBottomColor: vref(inputHoverBorderBottomColor),
            borderLeftColor: vref(inputHoverBorderLeftColor)
        },
        options
    );

    selector(
        ['.input.-focus .input-field', '.input:focus-within .input-field'],
        {
            borderTopColor: ref(inputFocusBorderTopColor),
            borderRightColor: ref(inputFocusBorderRightColor),
            borderBottomColor: ref(inputFocusBorderBottomColor),
            borderLeftColor: ref(inputFocusBorderLeftColor),
            outline: 0
        },
        options
    );

    selector(
        '.input.-error .input-field',
        {
            borderTopColor: ref(inputErrorBorderTopColor),
            borderRightColor: ref(inputErrorBorderRightColor),
            borderBottomColor: ref(inputErrorBorderBottomColor),
            borderLeftColor: ref(inputErrorBorderLeftColor)
        },
        options
    );

    selector(
        '.input.-readonly .input-field:focus-within',
        {
            borderTopColor: ref(inputFocusBorderTopColor),
            borderRightColor: ref(inputFocusBorderRightColor),
            borderBottomColor: ref(inputFocusBorderBottomColor),
            borderLeftColor: ref(inputFocusBorderLeftColor),
            outline: 0
        },
        options
    );

    selector(
        '.input.-disabled .input-field',
        {
            background: vref(inputDisabledBackground)
        },
        options
    );

    selector(
        '.input.-readonly .input-field',
        {
            background: vref(inputReadonlyBackground)
        },
        options
    );

    selector(
        ['.input .input-prepend', '.input .input-append'],
        {
            background: vref(inputBackground),
            borderStyle: vref(inputBorderStyle),
            borderTopColor: vref(inputBorderTopColor),
            borderRightColor: vref(inputBorderRightColor),
            borderBottomColor: vref(inputBorderBottomColor),
            borderLeftColor: vref(inputBorderLeftColor),
            borderWidth: vref(inputBorderWidth),
            fontSize: ref(inputFontSize),
            lineHeight: ref(inputLineHeight),
            transitionProperty: ref(inputTransitionProperty),
            transitionDuration: ref(inputTransitionDuration),
            transitionTimingFunction: ref(inputTransitionTimingFunction)
        },
        options
    );

    selector(
        '.input .input-prepend',
        {
            borderRightWidth: 0,
            borderTopLeftRadius: ref(inputBorderTopLeftRadius),
            borderBottomLeftRadius: ref(inputBorderBottomLeftRadius)
        },
        options
    );

    selector(
        '.input .input-append',
        {
            borderLeftWidth: 0,
            borderTopRightRadius: ref(inputBorderTopRightRadius),
            borderBottomRightRadius: ref(inputBorderBottomRightRadius)
        },
        options
    );
}

export function useInputThemeColorSelectors(
    variant: InputColorVariant,
    options: DefinitionOptions
) {
    const {
        inputBorderTopColor,
        inputBorderRightColor,
        inputBorderBottomColor,
        inputBorderLeftColor,
        inputBackground,
        inputColor,
        inputHoverBorderTopColor,
        inputHoverBorderRightColor,
        inputHoverBorderBottomColor,
        inputHoverBorderLeftColor,
        inputFocusBorderTopColor,
        inputFocusBorderRightColor,
        inputFocusBorderBottomColor,
        inputFocusBorderLeftColor,
        inputDisabledBackground,
        inputReadonlyBackground
    } = useInputThemeVariables(options);

    const {
        variantBorderTopColor,
        variantBorderRightColor,
        variantBorderBottomColor,
        variantBorderLeftColor,
        variantBackground,
        variantColor,
        variantHoverBorderTopColor,
        variantHoverBorderRightColor,
        variantHoverBorderBottomColor,
        variantHoverBorderLeftColor,
        variantFocusBorderTopColor,
        variantFocusBorderRightColor,
        variantFocusBorderBottomColor,
        variantFocusBorderLeftColor,
        variantDisabledBackground,
        variantReadonlyBackground
    } = setExportsNamespace(useInputThemeColorVariables(variant, options), 'variant');

    selector(
        `.input.-${variant}`,
        {
            [toVariableKey(inputBackground)]: ref(variantBackground),
            [toVariableKey(inputBorderTopColor)]: ref(variantBorderTopColor),
            [toVariableKey(inputBorderRightColor)]: ref(variantBorderRightColor),
            [toVariableKey(inputBorderBottomColor)]: ref(variantBorderBottomColor),
            [toVariableKey(inputBorderLeftColor)]: ref(variantBorderLeftColor),
            [toVariableKey(inputColor)]: ref(variantColor),
            [toVariableKey(inputHoverBorderTopColor)]: ref(variantHoverBorderTopColor),
            [toVariableKey(inputHoverBorderRightColor)]: ref(variantHoverBorderRightColor),
            [toVariableKey(inputHoverBorderBottomColor)]: ref(variantHoverBorderBottomColor),
            [toVariableKey(inputHoverBorderLeftColor)]: ref(variantHoverBorderLeftColor),
            [toVariableKey(inputFocusBorderTopColor)]: ref(variantFocusBorderTopColor),
            [toVariableKey(inputFocusBorderRightColor)]: ref(variantFocusBorderRightColor),
            [toVariableKey(inputFocusBorderBottomColor)]: ref(variantFocusBorderBottomColor),
            [toVariableKey(inputFocusBorderLeftColor)]: ref(variantFocusBorderLeftColor),
            [toVariableKey(inputDisabledBackground)]: ref(variantDisabledBackground),
            [toVariableKey(inputReadonlyBackground)]: ref(variantReadonlyBackground)
        },
        options
    );
}

export function useInputThemeSizeSelectors(variant: InputSizeVariant, options: DefinitionOptions) {
    const {
        inputBorderTopLeftRadius,
        inputBorderTopRightRadius,
        inputBorderBottomRightRadius,
        inputBorderBottomLeftRadius,
        inputPaddingTop,
        inputPaddingRight,
        inputPaddingBottom,
        inputPaddingLeft,
        inputFontSize
    } = useInputThemeVariables(options);

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
    } = setExportsNamespace(useInputThemeSizeVariables(variant, options), 'variant');

    selector(
        `.input.-${variant}`,
        {
            [toVariableKey(inputBorderTopLeftRadius)]: ref(variantBorderTopLeftRadius),
            [toVariableKey(inputBorderTopRightRadius)]: ref(variantBorderTopRightRadius),
            [toVariableKey(inputBorderBottomRightRadius)]: ref(variantBorderBottomRightRadius),
            [toVariableKey(inputBorderBottomLeftRadius)]: ref(variantBorderBottomLeftRadius),
            [toVariableKey(inputFontSize)]: ref(variantFontSize),
            [toVariableKey(inputPaddingTop)]: ref(variantPaddingTop),
            [toVariableKey(inputPaddingRight)]: ref(variantPaddingRight),
            [toVariableKey(inputPaddingBottom)]: ref(variantPaddingBottom),
            [toVariableKey(inputPaddingLeft)]: ref(variantPaddingLeft)
        },
        options
    );
}

/**
 * Composables
 */

export function useInputThemeColors(colors: InputColorVariant[], options: DefinitionOptions) {
    colors.forEach((color) => useInputThemeColorSelectors(color, options));
}

export function useInputThemeSizes(sizes: InputSizeVariant[], options: DefinitionOptions) {
    sizes.forEach((size) => useInputThemeSizeSelectors(size, options));
}

export function useInputTheme(options: DefinitionOptions) {
    useInputThemeVariables(options);
    useInputThemeLayoutSelectors(options);
    useInputThemeBaseSelectors(options);
    useInputThemeSizes([...defaultInputSizes], options);
    useInputThemeColors([...defaultInputColors], options);
    useInputThemeModifiersSelectors(options);
}
