import {
    defaultDefinitionOptions,
    multiply,
    nsvariables,
    ref,
    selector,
    setExportsNamespace,
    stripExportsNamespace
} from '@inkline/core';
import { capitalize } from '@inkline/utils';
import {
    useBorder,
    useBorderRadiusBase,
    useBoxShadow,
    useBrandColors,
    useBrandColorVariants,
    useContrastTextColor,
    useFontSize,
    useKeyMappedSizeMultiplier,
    useLineHeight,
    useNeutralColors,
    usePaddingBase,
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

export function useInputThemeVariables(options = defaultDefinitionOptions) {
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
    const { paddingTop, paddingRight, paddingBottom, paddingLeft } = usePaddingBase();
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
                padding: {
                    top: multiply(ref(paddingTop), 3 / 4),
                    right: ref(paddingRight),
                    bottom: multiply(ref(paddingBottom), 3 / 4),
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
        ...nsvariables(
            [ns, 'placeholder'] as const,
            {
                color: ref(textColorWeaker)
            },
            options
        ),
        ...nsvariables(
            [ns, 'icon'] as const,
            {
                width: 'auto',
                height: '1rem',
                color: ref(textColorWeak)
            },
            options
        ),
        ...nsvariables(
            [ns, 'error'] as const,
            {
                border: {
                    color: ref(colorDanger)
                }
            },
            options
        ),
        ...nsvariables(
            [ns, 'disabled'] as const,
            {
                background: ref(colorLightTint50)
            },
            options
        ),
        ...nsvariables(
            [ns, 'readonly'] as const,
            {
                background: ref(colorLightTint100)
            },
            options
        ),
        ...nsvariables(
            [ns, 'hover'] as const,
            {
                border: {
                    color: ref(colorLightShade100)
                }
            },
            options
        ),
        ...nsvariables(
            [ns, 'focus'] as const,
            {
                border: {
                    color: ref(colorPrimary)
                }
            },
            options
        ),
        ...nsvariables(
            [ns, 'prefix'] as const,
            {
                color: ref(textColorWeaker)
            },
            options
        ),
        ...nsvariables(
            [ns, 'suffix'] as const,
            {
                color: ref(textColorWeaker)
            },
            options
        )
    };
}

export function useInputThemeLayout() {
    selector('.input', {
        display: 'block',
        verticalAlign: 'middle',
        position: 'relative',
        flexGrow: 1,
        flexShrink: 1
    });

    selector('.input .input-field', {
        display: 'flex',
        flex: '1 0 auto',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundClip: 'padding-box'
    });

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
        }
    );

    // Remove style for the caret on `<select>`s in E10+.
    selector('.input .input-field > select::-ms-expand', {
        backgroundColor: 'transparent',
        border: '0'
    });

    // Override Firefox's unusual default opacity see https://github.com/twbs/bootstrap/pull/11526.
    selector(
        [
            '.input .input-field > input::placeholder',
            '.input .input-field > select::placeholder',
            '.input .input-field > textarea::placeholder'
        ],
        {
            opacity: 1
        }
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
        }
    );

    selector(
        [
            '.input .input-field > input:disabled',
            '.input .input-field > select:disabled',
            '.input .input-field > textarea:disabled'
        ],
        {
            cursor: 'not-allowed'
        }
    );

    selector(
        [
            '.input .input-field > input[readonly]',
            '.input .input-field > select[readonly]',
            '.input .input-field > textarea[readonly]'
        ],
        {
            outline: 0
        }
    );

    selector(['.input .input-field .input-prefix', '.input .input-field .input-suffix'], {
        display: 'inline-flex',
        alignItems: 'center',
        zIndex: 1,
        fontStyle: 'normal'
    });

    selector(
        [
            '.input .input-field .input-prefix > button:not(.button, .select-caret)',
            '.input .input-field .input-suffix > button:not(.button, .select-caret)'
        ],
        {
            background: 'transparent',
            border: '0',
            color: 'inherit'
        }
    );

    selector('.input .input-field .input-icon', {
        width: 'auto',
        cursor: 'pointer'
    });

    selector('.input .input-value-overlay', {
        position: 'absolute',
        cursor: 'default'
    });

    selector(['.input.-prepended', '.input.-appended'], {
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',
        alignItems: 'stretch',
        padding: 0
    });

    selector(['.input.-prepended', '.input.-appended'], {
        display: 'flex',
        flexWrap: 'nowrap'
    });

    selector(['.input.-prepended .input-field', '.input.-appended .input-field'], {
        flexShrink: 1
    });
}

export function useInputThemeLayoutModifiers() {
    selector('.input.-prepended .input-field', {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0
    });

    selector('.input.-appended .input-field', {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
    });

    selector(['.input .input-prepend > *', '.input .input-append > *'], {
        display: 'flex',
        flex: '1 1 auto ',
        alignSelf: 'stretch !important',
        alignItems: 'center !important',
        justifySelf: 'stretch !important',
        borderRadius: '0 !important',
        border: 0,
        width: '100%',
        height: '100%'
    });

    // selector(
    //     ['.input.-prepended > [class$="-trigger"]', '.input.-appended > [class$="-trigger"]'],
    //     {
    //         display: 'flex',
    //         alignSelf: 'stretch'
    //     }
    // );
}

export function useInputThemeBase() {
    const {
        inputBackground,
        inputBorderStyle,
        inputBorderColor,
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
        inputTransitionProperty,
        inputTransitionDuration,
        inputTransitionTimingFunction,
        inputHoverBorderColor,
        inputFocusBorderColor,
        inputErrorBorderColor,
        inputDisabledBackground,
        inputReadonlyBackground,
        inputPlaceholderColor,
        inputPrefixColor,
        inputSuffixColor,
        inputIconWidth,
        inputIconHeight,
        inputIconColor
    } = useInputThemeVariables();

    selector('.input .input-field', {
        background: ref(inputBackground),
        borderStyle: ref(inputBorderStyle),
        borderColor: ref(inputBorderColor),
        borderWidth: ref(inputBorderWidth),
        borderRadius: ref(inputBorderRadius),
        boxShadow: ref(inputBoxShadow),
        fontSize: ref(inputFontSize),
        transitionProperty: ref(inputTransitionProperty),
        transitionDuration: ref(inputTransitionDuration),
        transitionTimingFunction: ref(inputTransitionTimingFunction)
    });

    selector(
        [
            '.input .input-field > input',
            '.input .input-field > select',
            '.input .input-field > textarea'
        ],
        {
            color: ref(inputColor),
            lineHeight: ref(inputLineHeight),
            padding: ref(inputPadding)
        }
    );

    selector(
        [
            '.input .input-field > input::placeholder',
            '.input .input-field > select::placeholder',
            '.input .input-field > textarea::placeholder'
        ],
        {
            color: ref(inputPlaceholderColor)
        }
    );

    selector(['.input .input-field .input-prefix', '.input .input-field .input-suffix'], {
        borderColor: ref(inputBorderColor),
        paddingLeft: ref(inputPadding),
        paddingRight: ref(inputPadding),
        transitionProperty: ref(inputTransitionProperty),
        transitionDuration: ref(inputTransitionDuration),
        transitionTimingFunction: ref(inputTransitionTimingFunction)
    });

    selector('.input .input-field .input-prefix', {
        borderRightWidth: ref(inputBorderWidth),
        borderRightStyle: ref(inputBorderStyle),
        color: ref(inputPrefixColor)
    });

    selector('.input .input-field .input-suffix', {
        borderLeftWidth: ref(inputBorderWidth),
        borderLeftStyle: ref(inputBorderStyle),
        color: ref(inputSuffixColor)
    });

    selector('.input .input-field .input-icon', {
        color: ref(inputIconColor),
        width: ref(inputIconWidth),
        height: ref(inputIconHeight),
        transitionProperty: ref(inputTransitionProperty),
        transitionDuration: ref(inputTransitionDuration),
        transitionTimingFunction: ref(inputTransitionTimingFunction)
    });

    selector(['.input.-hover .input-field', '.input:hover .input-field'], {
        borderColor: ref(inputHoverBorderColor)
    });

    selector(['.input.-focus .input-field', '.input:focus-within .input-field'], {
        borderColor: ref(inputFocusBorderColor),
        outline: 0
    });

    selector('.input.-error .input-field', {
        borderColor: ref(inputErrorBorderColor)
    });

    selector('.input.-readonly .input-field:focus-within', {
        borderColor: ref(inputFocusBorderColor),
        outline: 0
    });

    selector('.input.-disabled .input-field', {
        background: ref(inputDisabledBackground)
    });

    selector('.input.-readonly .input-field', {
        background: ref(inputReadonlyBackground)
    });

    selector(['.input .input-prepend', '.input .input-append'], {
        background: ref(inputBackground),
        borderStyle: ref(inputBorderStyle),
        borderColor: ref(inputBorderColor),
        borderWidth: ref(inputBorderWidth),
        fontSize: ref(inputFontSize),
        lineHeight: ref(inputLineHeight),
        transitionProperty: ref(inputTransitionProperty),
        transitionDuration: ref(inputTransitionDuration),
        transitionTimingFunction: ref(inputTransitionTimingFunction)
    });

    selector('.input .input-prepend', {
        borderRightWidth: 0,
        borderTopLeftRadius: ref(inputBorderTopLeftRadius),
        borderBottomLeftRadius: ref(inputBorderBottomLeftRadius)
    });

    selector('.input .input-append', {
        borderLeftWidth: 0,
        borderTopRightRadius: ref(inputBorderTopRightRadius),
        borderBottomRightRadius: ref(inputBorderBottomRightRadius)
    });
}

export function useInputThemeSizeFactory(variant: InputSizeVariant) {
    const {
        inputPaddingTop,
        inputPaddingRight,
        inputPaddingBottom,
        inputPaddingLeft,
        inputBorderTopLeftRadius,
        inputBorderTopRightRadius,
        inputBorderBottomRightRadius,
        inputBorderBottomLeftRadius,
        inputFontSize
    } = useInputThemeVariables();
    const sizeMultiplierKeyMap = useKeyMappedSizeMultiplier();
    const sizeMultiplierRef = ref(sizeMultiplierKeyMap[variant]);
    const sizeNs = [ns, variant] as const;

    const {
        borderTopLeftRadius,
        borderTopRightRadius,
        borderBottomRightRadius,
        borderBottomLeftRadius,
        fontSize,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft
    } = stripExportsNamespace(
        nsvariables(sizeNs, {
            borderRadius: {
                topLeft: multiply(ref(inputBorderTopLeftRadius), sizeMultiplierRef),
                topRight: multiply(ref(inputBorderTopRightRadius), sizeMultiplierRef),
                bottomRight: multiply(ref(inputBorderBottomRightRadius), sizeMultiplierRef),
                bottomLeft: multiply(ref(inputBorderBottomLeftRadius), sizeMultiplierRef)
            },
            fontSize: multiply(ref(inputFontSize), sizeMultiplierRef),
            padding: {
                top: multiply(ref(inputPaddingTop), sizeMultiplierRef),
                right: multiply(ref(inputPaddingRight), sizeMultiplierRef),
                bottom: multiply(ref(inputPaddingBottom), sizeMultiplierRef),
                left: multiply(ref(inputPaddingLeft), sizeMultiplierRef)
            }
        })
    );

    selector(`.input.-${variant}`, {
        fontSize: ref(fontSize)
    });

    selector(
        [
            `.input.-${variant} .input-header`,
            `.input.-${variant} .input-body`,
            `.input.-${variant} .input-footer`
        ],
        {
            fontSize: ref(fontSize),
            padding: [ref(paddingTop), ref(paddingRight), ref(paddingBottom), ref(paddingLeft)]
        }
    );

    selector(`.input.-${variant} .input-field`, {
        borderTopLeftRadius: ref(borderTopLeftRadius),
        borderTopRightRadius: ref(borderTopRightRadius),
        borderBottomRightRadius: ref(borderBottomRightRadius),
        borderBottomLeftRadius: ref(borderBottomLeftRadius),
        fontSize: ref(fontSize)
    });

    selector(
        [
            `.input.-${variant} .input-field > input`,
            `.input.-${variant} .input-field > select`,
            `.input.-${variant} .input-field > textarea`
        ],
        {
            paddingTop: ref(paddingTop),
            paddingRight: ref(paddingRight),
            paddingBottom: ref(paddingBottom),
            paddingLeft: ref(paddingLeft)
        }
    );

    selector([`.input.-${variant} .input-prepend`, `.input.-${variant} .input-append`], {
        fontSize: ref(fontSize)
    });

    selector(`.input.-${variant} .input-prepend`, {
        borderTopLeftRadius: ref(borderTopLeftRadius),
        borderBottomLeftRadius: ref(borderBottomLeftRadius)
    });

    selector(`.input.-${variant} .input-append`, {
        borderTopRightRadius: ref(borderTopRightRadius),
        borderBottomRightRadius: ref(borderBottomRightRadius)
    });

    selector(['.input .input-field .input-prefix', '.input .input-field .input-suffix'], {
        paddingLeft: ref(paddingLeft),
        paddingRight: ref(paddingRight)
    });
}

export function useInputThemeSizes(sizes = defaultInputSizes) {
    sizes.forEach(useInputThemeSizeFactory);
}

export function useInputThemeColorFactory(variant: InputColorVariant) {
    const colorKey = capitalize(variant);
    const shadeOrTint = variant === 'dark' ? 'Tint' : 'Shade';
    const brandColors = useBrandColors();
    const brandColorVariants = useBrandColorVariants();
    const neutralColors = useNeutralColors();
    const contrastTextColors = useContrastTextColor();
    const colorNs = [ns, variant] as const;

    const { borderColor, background, color } = stripExportsNamespace(
        nsvariables(colorNs, {
            borderColor: ref(brandColorVariants[`color${colorKey}${shadeOrTint}50`]),
            background: ref(
                variant === 'light' ? neutralColors.colorWhite : brandColors[`color${colorKey}`]
            ),
            color: ref(contrastTextColors[`contrastTextColor${colorKey}`])
        })
    );

    const { hoverBorderColor } = setExportsNamespace(
        nsvariables([...colorNs, 'hover'] as const, {
            borderColor: ref(brandColorVariants[`color${colorKey}${shadeOrTint}100`])
        }),
        'hover'
    );

    const { focusBorderColor } = setExportsNamespace(
        nsvariables([...colorNs, 'focus'] as const, {
            borderColor: ref(brandColors.colorPrimary)
        }),
        'focus'
    );

    const { disabledBackground } = setExportsNamespace(
        nsvariables([...colorNs, 'disabled'] as const, {
            background:
                variant === 'light'
                    ? ref(brandColors.colorLight)
                    : ref(brandColorVariants[`color${colorKey}${shadeOrTint}100`])
        }),
        'disabled'
    );

    const { readonlyBackground } = setExportsNamespace(
        nsvariables([...colorNs, 'readonly'] as const, {
            background:
                variant === 'light'
                    ? ref(brandColorVariants.colorLightTint50)
                    : ref(brandColorVariants[`color${colorKey}${shadeOrTint}50`])
        }),
        'readonly'
    );

    selector(`.input.-${variant} .input-field`, {
        background: ref(background),
        borderColor: ref(borderColor)
    });

    selector(
        [
            `.input.-${variant} .input-field > input`,
            `.input.-${variant} .input-field > select`,
            `.input.-${variant} .input-field > textarea`
        ],
        {
            color: ref(color)
        }
    );

    selector([`.input.-${variant}.-hover .input-field`, `.input.-${variant}:hover .input-field`], {
        borderColor: ref(hoverBorderColor)
    });

    selector(`.input.-${variant}.-disabled .input-field`, {
        background: ref(disabledBackground)
    });

    selector(`.input.-${variant}.-readonly .input-field`, {
        background: ref(readonlyBackground)
    });

    selector(
        [`.input.-${variant}.-focus .input-field`, `.input.-${variant}:focus-within .input-field`],
        {
            borderColor: ref(focusBorderColor)
        }
    );

    selector([`.input.-${variant} .input-prepend`, `.input.-${variant} .input-append`], {
        background: ref(background),
        borderColor: ref(borderColor)
    });

    selector(`.input.-${variant} .input-field .input-prefix`, {
        borderColor: ref(borderColor)
    });

    selector(`.input.-${variant} .input-field .input-suffix`, {
        borderColor: ref(borderColor)
    });
}

export function useInputThemeColors({ colors = defaultInputColors } = {}) {
    colors.forEach(useInputThemeColorFactory);
}

export function useInputTheme() {
    useInputThemeVariables();
    useInputThemeLayout();
    useInputThemeBase();
    useInputThemeSizes();
    useInputThemeColors();
    useInputThemeLayoutModifiers();
}
