import {
    multiply,
    ref,
    selector,
    nsvariables,
    defaultDefinitionOptions,
    stripExportsNamespace,
    replaceExportsNamespace,
    add,
    hsla
} from '@inkline/core';
import { capitalize } from '@inkline/utils';
import {
    useBorder,
    useBoxShadow,
    useFontSize,
    useKeyMappedSizeMultiplier,
    useMargin,
    useTransition,
    useTextColor,
    useBrandColors,
    useBrandColorVariants,
    useNeutralColors,
    useColors,
    useContrastTextColor
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

export function useRadioThemeVariables(options = defaultDefinitionOptions) {
    const { colorPrimary, colorPrimaryH, colorPrimaryS, colorPrimaryL } = useBrandColors();
    const {
        colorLightShade50,
        colorPrimary300,
        colorPrimary400,
        colorPrimary500,
        colorPrimaryShade50
    } = useBrandColorVariants();
    const { colorWhite, colorGray100 } = useNeutralColors();
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
    const {
        boxShadowOffsetX,
        boxShadowOffsetY,
        boxShadowBlurRadius,
        boxShadowSpreadRadius,
        boxShadowColor
    } = useBoxShadow();
    const { textColorWeak } = useTextColor();
    const { fontSize } = useFontSize();
    const { marginRight, marginBottom } = useMargin();
    const { transitionDuration, transitionTimingFunction } = useTransition();
    const { contrastTextColorLight } = useContrastTextColor();

    return {
        ...nsvariables(
            ns,
            {
                background: ref(colorWhite),
                border: {
                    top: {
                        color: ref(colorLightShade50),
                        width: ref(borderTopWidth),
                        style: ref(borderTopStyle)
                    },
                    right: {
                        color: ref(colorLightShade50),
                        width: ref(borderRightWidth),
                        style: ref(borderRightStyle)
                    },
                    bottom: {
                        color: ref(colorLightShade50),
                        width: ref(borderBottomWidth),
                        style: ref(borderBottomStyle)
                    },
                    left: {
                        color: ref(colorLightShade50),
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
                color: ref(contrastTextColorLight),
                fontSize: ref(fontSize),
                margin: {
                    top: 0,
                    right: multiply(ref(marginRight), 0.5),
                    bottom: multiply(ref(marginBottom), 0.5),
                    left: 0
                },
                width: '1rem',
                height: '1rem',
                transition: {
                    property: 'background-color, color, border-color, transform',
                    duration: ref(transitionDuration),
                    timingFunction: ref(transitionTimingFunction)
                }
            },
            options
        ),
        ...nsvariables(
            [ns, 'circle'] as const,
            {
                color: ref(colorWhite),
                width: '0.5rem',
                height: '0.5rem'
            },
            options
        ),
        ...nsvariables(
            [ns, 'checked'] as const,
            {
                background: ref(colorPrimary),
                border: {
                    color: ref(colorPrimaryShade50)
                }
            },
            options
        ),
        ...nsvariables(
            [ns, 'disabled'] as const,
            {
                color: ref(textColorWeak),
                background: ref(colorGray100)
            },
            options
        ),
        ...nsvariables(
            [ns, 'readonly'] as const,
            {
                background: ref(colorGray100)
            },
            options
        ),
        ...nsvariables(
            [ns, 'focus'] as const,
            {
                boxShadow: {
                    offsetX: 0,
                    offsetY: 0,
                    blurRadius: 0,
                    spreadRadius: '3px',
                    color: hsla([ref(colorPrimaryH), ref(colorPrimaryS), ref(colorPrimaryL), 0.25])
                }
            },
            options
        ),
        ...nsvariables([ns, 'checked', 'disabled'] as const, {
            background: ref(colorPrimary300),
            border: {
                color: ref(colorPrimary400)
            }
        }),
        ...nsvariables([ns, 'checked', 'readonly'] as const, {
            background: ref(colorPrimary400),
            border: {
                color: ref(colorPrimary500)
            }
        })
    };
}

export function useRadioThemeLayout() {
    const { radioWidth, radioHeight, radioCircleWidth, radioCircleHeight } =
        useRadioThemeVariables();

    selector('.radio', {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        outline: 0
    });

    selector('.radio:last-of-type', {
        marginRight: 0
    });

    selector('.radio .radio-label', {
        cursor: 'pointer',
        marginBottom: 0,
        display: 'inline-flex',
        alignItems: 'center',
        position: 'relative'
    });

    selector(['.radio .radio-label::before', '.radio .radio-label::after'], {
        position: 'absolute',
        top: '50%',
        left: 0,
        display: 'inline-flex',
        cursor: 'pointer',
        width: ref(radioWidth),
        height: ref(radioHeight)
    });

    selector('.radio .radio-label::before', {
        content: '""',
        userSelect: 'none',
        transform: 'translate(0, -50%)'
    });

    selector('.radio .radio-label::after', {
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
    });

    selector('.radio input', {
        top: 0,
        left: 0,
        position: 'absolute',
        zIndex: 0,
        opacity: 0,
        height: 0,
        width: 0
    });

    selector(['.radio .radio-label', '.radio input', '.radio input:focus', '.radio input:active'], {
        outline: 0
    });

    selector(['.radio input:checked ~ .radio-label::after'], {
        content: '""',
        maskPosition: 'center center',
        maskRepeat: 'no-repeat',
        transform: 'scale(1) translate(0, -50%)'
    });

    selector(['.radio input:disabled ~ .radio-label', '.radio input[readonly] ~ .radio-label'], {
        cursor: 'default'
    });

    selector(
        [
            '.radio input:disabled ~ .radio-label::after',
            '.radio input[readonly] ~ .radio-label::after',
            '.radio input:checked:disabled ~ .radio-label::after',
            '.radio input:checked[readonly] ~ .radio-label::after'
        ],
        {
            cursor: 'not-allowed'
        }
    );
}

export function useRadioThemeBase() {
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
        radioTransition,
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
    } = useRadioThemeVariables();

    selector('.radio', {
        margin: ref(radioMargin)
    });

    selector('.radio .radio-label', {
        color: ref(radioColor),
        fontSize: ref(radioFontSize),
        transition: ref(radioTransition),
        paddingLeft: add(ref(radioWidth), ref(radioMarginRight))
    });

    selector('.radio .radio-label::before', {
        background: ref(radioBackground),
        borderColor: ref(radioBorderColor),
        borderWidth: ref(radioBorderWidth),
        borderStyle: ref(radioBorderStyle),
        borderRadius: ref(radioBorderRadius),
        boxShadow: ref(radioBoxShadow),
        transition: ref(radioTransition)
    });

    selector('.radio .radio-label::after', {
        background: ref(radioCircleColor),
        transitionDuration: ref(radioTransitionDuration),
        transitionTimingFunction: ref(radioTransitionTimingFunction)
    });

    selector('.radio:not(.-disabled) .radio-label:focus::before', {
        boxShadow: ref(radioFocusBoxShadow)
    });

    selector(['.radio input:checked ~ .radio-label::before'], {
        background: ref(radioCheckedBackground),
        borderColor: ref(radioCheckedBorderColor)
    });

    selector('.radio input:disabled ~ .radio-label', {
        color: ref(radioDisabledColor),
        cursor: 'default'
    });

    selector(['.radio input:disabled ~ .radio-label::before'], {
        background: ref(radioDisabledBackground),
        cursor: 'not-allowed'
    });

    selector(['.radio input[readonly] ~ .radio-label::before'], {
        background: ref(radioReadonlyBackground),
        cursor: 'not-allowed'
    });

    selector('.radio input:checked:disabled ~ .radio-label::before', {
        background: ref(radioCheckedDisabledBackground),
        borderColor: ref(radioCheckedDisabledBorderColor)
    });

    selector('.radio input[readonly]:checked ~ .radio-label::before', {
        background: ref(radioCheckedReadonlyBackground),
        borderColor: ref(radioCheckedReadonlyBorderColor)
    });
}

export function useRadioThemeSizeFactory(variant: RadioSizeVariant) {
    const {
        radioMarginRight,
        radioMarginBottom,
        radioBorderTopLeftRadius,
        radioBorderTopRightRadius,
        radioBorderBottomRightRadius,
        radioBorderBottomLeftRadius,
        radioFontSize,
        radioWidth,
        radioHeight,
        radioCircleWidth,
        radioCircleHeight
    } = useRadioThemeVariables();
    const sizeMultiplierKeyMap = useKeyMappedSizeMultiplier();
    const sizeMultiplierRef = ref(sizeMultiplierKeyMap[variant]);
    const sizeNs = [ns, variant] as const;

    const {
        borderTopLeftRadius,
        borderTopRightRadius,
        borderBottomRightRadius,
        borderBottomLeftRadius,
        fontSize,
        width,
        height
    } = stripExportsNamespace(
        nsvariables(sizeNs, {
            borderRadius: {
                topLeft: multiply(ref(radioBorderTopLeftRadius), sizeMultiplierRef),
                topRight: multiply(ref(radioBorderTopRightRadius), sizeMultiplierRef),
                bottomRight: multiply(ref(radioBorderBottomRightRadius), sizeMultiplierRef),
                bottomLeft: multiply(ref(radioBorderBottomLeftRadius), sizeMultiplierRef)
            },
            fontSize: multiply(ref(radioFontSize), sizeMultiplierRef),
            margin: {
                top: 0,
                right: multiply(ref(radioMarginRight), sizeMultiplierRef),
                bottom: multiply(ref(radioMarginBottom), sizeMultiplierRef),
                left: 0
            },
            width: multiply(ref(radioWidth), sizeMultiplierRef),
            height: multiply(ref(radioHeight), sizeMultiplierRef)
        })
    );

    const { circleWidth, circleHeight } = replaceExportsNamespace(
        nsvariables([...sizeNs, 'circle'] as const, {
            width: multiply(ref(radioCircleWidth), sizeMultiplierRef),
            height: multiply(ref(radioCircleHeight), sizeMultiplierRef)
        }),
        [...sizeNs, 'circle'] as const,
        'circle'
    );

    selector(`.radio.-${variant}`, {
        fontSize: ref(fontSize)
    });

    selector(`.radio.-${variant} .radio-label`, {
        fontSize: ref(radioFontSize),
        paddingLeft: add(ref(width), ref(radioMarginRight))
    });

    selector(
        [`.radio.-${variant} .radio-label::before`, `.radio.-${variant} .radio-label::after`],
        {
            width: ref(width),
            height: ref(height)
        }
    );

    selector(`.radio.-${variant} .radio-label::before`, {
        borderTopLeftRadius: ref(borderTopLeftRadius),
        borderTopRightRadius: ref(borderTopRightRadius),
        borderBottomRightRadius: ref(borderBottomRightRadius),
        borderBottomLeftRadius: ref(borderBottomLeftRadius)
    });

    selector(`.radio.-${variant} .radio-label::after`, {
        maskSize: [ref(circleWidth), ref(circleHeight)]
    });
}

export function useRadioThemeSizes(sizes = defaultRadioSizes) {
    sizes.forEach(useRadioThemeSizeFactory);
}

export function useRadioThemeColorFactory(variant: RadioColorVariant) {
    const colorKey = capitalize(variant);
    const shadeOrTint = variant === 'dark' ? 'Tint' : 'Shade';
    const colorNs = [ns, variant] as const;

    const colors = useColors();
    const contrastTextColors = useContrastTextColor();

    const { borderColor, background, color } = stripExportsNamespace(
        nsvariables(colorNs, {
            borderColor: ref(colors[`color${colorKey}${shadeOrTint}50`]),
            background: ref(variant === 'light' ? colors.colorWhite : colors[`color${colorKey}`]),
            color: ref(contrastTextColors[`contrastTextColor${colorKey}`])
        })
    );

    selector(`.radio.-${variant} .radio-label`, {
        color: ref(color)
    });

    selector(`.radio.-${variant} .radio-label::before`, {
        borderColor: ref(borderColor),
        background: ref(background),
        color: ref(color)
    });

    const { disabledBackground, disabledBorderColor } = replaceExportsNamespace(
        nsvariables([...colorNs, 'disabled'] as const, {
            background: ref(variant === 'light' ? colors.colorGray100 : colors.colorGray600),
            borderColor: ref(variant === 'light' ? colors.colorGray200 : colors.colorGray700)
        }),
        [...colorNs, 'disabled'] as const,
        'disabled'
    );

    const { checkedDisabledBackground, checkedDisabledBorderColor } = replaceExportsNamespace(
        nsvariables([...colorNs, 'checked', 'disabled'] as const, {
            background: ref(variant === 'light' ? colors.colorPrimary300 : colors.colorPrimary700),
            borderColor: ref(variant === 'light' ? colors.colorPrimary400 : colors.colorPrimary800)
        }),
        [...colorNs, 'checked', 'disabled'] as const,
        'checkedDisabled'
    );

    selector(`.radio.-${variant} input:disabled ~ .radio-label::before`, {
        background: ref(disabledBackground),
        borderColor: ref(disabledBorderColor)
    });

    selector(`.radio.-${variant} input:checked:disabled ~ .radio-label::before`, {
        background: ref(checkedDisabledBackground),
        borderColor: ref(checkedDisabledBorderColor)
    });
}

export function useRadioThemeColors(colors = defaultRadioColors) {
    colors.forEach(useRadioThemeColorFactory);
}

export function useRadioThemeVariants() {
    const { radioMarginRight } = useRadioThemeVariables();

    selector('.radio.-native input', {
        top: 'auto',
        left: 'auto',
        position: 'relative',
        opacity: 1,
        height: 'auto',
        width: 'auto'
    });

    selector('.radio.-native .radio-label', {
        paddingLeft: ref(radioMarginRight)
    });

    selector(['.radio.-native .radio-label::before', '.radio.-native .radio-label::after'], {
        display: 'none'
    });
}

export function useRadioTheme() {
    useRadioThemeLayout();
    useRadioThemeBase();
    useRadioThemeSizes();
    useRadioThemeColors();
    useRadioThemeVariants();
}
