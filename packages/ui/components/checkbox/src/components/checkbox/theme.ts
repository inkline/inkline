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
    useBorderRadiusBase,
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

const ns = 'checkbox';

const defaultCheckboxColor = 'light';
const defaultCheckboxColors = ['light', 'dark'] as const;

const defaultCheckboxSize = 'md';
const defaultCheckboxSizes = ['sm', 'md', 'lg'] as const;

type CheckboxColorVariant = (typeof defaultCheckboxColors)[number];
type CheckboxSizeVariant = (typeof defaultCheckboxSizes)[number];

const checkmarkIconUrl =
    'data:image/svg+xml; utf8, <svg fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28"><title>check</title><path d="M23.625 3.5l-13.125 13.125-6.125-6.125-4.375 4.375 10.5 10.5 17.5-17.5z"></path></svg>';
const minusIconUrl =
    'data:image/svg+xml; utf8, <svg fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28"><title>minus</title><path d="M0 11.375v5.25c0 0.483 0.392 0.875 0.875 0.875h26.25c0.483 0 0.875-0.392 0.875-0.875v-5.25c0-0.483-0.392-0.875-0.875-0.875h-26.25c-0.483 0-0.875 0.392-0.875 0.875z"></path></svg>';

export function useCheckboxThemeVariables(options = defaultDefinitionOptions) {
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
            [ns, 'checkmark'] as const,
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

export function useCheckboxThemeLayout() {
    const { checkboxWidth, checkboxHeight, checkboxCheckmarkWidth, checkboxCheckmarkHeight } =
        useCheckboxThemeVariables();

    selector('.checkbox', {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        outline: 0
    });

    selector('.checkbox:last-of-type', {
        marginRight: 0
    });

    selector('.checkbox .checkbox-label', {
        cursor: 'pointer',
        marginBottom: 0,
        display: 'inline-flex',
        alignItems: 'center',
        position: 'relative'
    });

    selector(['.checkbox .checkbox-label::before', '.checkbox .checkbox-label::after'], {
        position: 'absolute',
        top: '50%',
        left: 0,
        display: 'inline-flex',
        cursor: 'pointer',
        width: ref(checkboxWidth),
        height: ref(checkboxHeight)
    });

    selector('.checkbox .checkbox-label::before', {
        content: '""',
        userSelect: 'none',
        transform: 'translate(0, -50%)'
    });

    selector('.checkbox input:indeterminate ~ .checkbox-label::after', {
        maskImage: `url('${minusIconUrl}')`
    });

    selector('.checkbox .checkbox-label::after', {
        content: '""',
        zIndex: 1,
        textAlign: 'center',
        transform: 'scale(0) translate(0, -50%)',
        border: '1px solid transparent',
        transformOrigin: 'center top',
        maskImage: `url('${checkmarkIconUrl}')`,
        maskSize: [ref(checkboxCheckmarkWidth), ref(checkboxCheckmarkHeight)],
        maskPosition: 'center center',
        maskRepeat: 'no-repeat'
    });

    selector('.checkbox input', {
        top: 0,
        left: 0,
        position: 'absolute',
        zIndex: 0,
        opacity: 0,
        height: 0,
        width: 0
    });

    selector(
        [
            '.checkbox .checkbox-label',
            '.checkbox input',
            '.checkbox input:focus',
            '.checkbox input:active'
        ],
        {
            outline: 0
        }
    );

    selector(
        [
            '.checkbox input:indeterminate ~ .checkbox-label::after',
            '.checkbox input:checked ~ .checkbox-label::after'
        ],
        {
            content: '""',
            maskPosition: 'center center',
            maskRepeat: 'no-repeat',
            transform: 'scale(1) translate(0, -50%)'
        }
    );

    selector(
        [
            '.checkbox input:disabled ~ .checkbox-label',
            '.checkbox input[readonly] ~ .checkbox-label'
        ],
        {
            cursor: 'default'
        }
    );

    selector(
        [
            '.checkbox input:disabled ~ .checkbox-label::after',
            '.checkbox input[readonly] ~ .checkbox-label::after',
            '.checkbox input:checked:disabled ~ .checkbox-label::after',
            '.checkbox input:checked[readonly] ~ .checkbox-label::after'
        ],
        {
            cursor: 'not-allowed'
        }
    );
}

export function useCheckboxThemeBase() {
    const {
        checkboxBackground,
        checkboxBorderColor,
        checkboxBorderStyle,
        checkboxBorderWidth,
        checkboxBorderRadius,
        checkboxBoxShadow,
        checkboxColor,
        checkboxFontSize,
        checkboxMargin,
        checkboxMarginRight,
        checkboxWidth,
        checkboxTransitionDuration,
        checkboxTransitionTimingFunction,
        checkboxTransition,
        checkboxCheckedBackground,
        checkboxCheckedBorderColor,
        checkboxCheckedDisabledBackground,
        checkboxCheckedDisabledBorderColor,
        checkboxCheckedReadonlyBackground,
        checkboxCheckedReadonlyBorderColor,
        checkboxDisabledColor,
        checkboxDisabledBackground,
        checkboxReadonlyBackground,
        checkboxCheckmarkColor,
        checkboxFocusBoxShadow
    } = useCheckboxThemeVariables();

    selector('.checkbox', {
        margin: ref(checkboxMargin)
    });

    selector('.checkbox .checkbox-label', {
        color: ref(checkboxColor),
        fontSize: ref(checkboxFontSize),
        transition: ref(checkboxTransition),
        paddingLeft: add(ref(checkboxWidth), ref(checkboxMarginRight))
    });

    selector('.checkbox .checkbox-label::before', {
        background: ref(checkboxBackground),
        borderColor: ref(checkboxBorderColor),
        borderWidth: ref(checkboxBorderWidth),
        borderStyle: ref(checkboxBorderStyle),
        borderRadius: ref(checkboxBorderRadius),
        boxShadow: ref(checkboxBoxShadow),
        transition: ref(checkboxTransition)
    });

    selector('.checkbox .checkbox-label::after', {
        background: ref(checkboxCheckmarkColor),
        transitionDuration: ref(checkboxTransitionDuration),
        transitionTimingFunction: ref(checkboxTransitionTimingFunction)
    });

    selector('.checkbox:not(.-disabled) .checkbox-label:focus::before', {
        boxShadow: ref(checkboxFocusBoxShadow)
    });

    selector(
        [
            '.checkbox input:checked ~ .checkbox-label::before',
            '.checkbox input:indeterminate ~ .checkbox-label::before'
        ],
        {
            background: ref(checkboxCheckedBackground),
            borderColor: ref(checkboxCheckedBorderColor)
        }
    );

    selector('.checkbox input:disabled ~ .checkbox-label', {
        color: ref(checkboxDisabledColor),
        cursor: 'default'
    });

    selector(['.checkbox input:disabled ~ .checkbox-label::before'], {
        background: ref(checkboxDisabledBackground),
        cursor: 'not-allowed'
    });

    selector(['.checkbox input[readonly] ~ .checkbox-label::before'], {
        background: ref(checkboxReadonlyBackground),
        cursor: 'not-allowed'
    });

    selector('.checkbox input:checked:disabled ~ .checkbox-label::before', {
        background: ref(checkboxCheckedDisabledBackground),
        borderColor: ref(checkboxCheckedDisabledBorderColor)
    });

    selector('.checkbox input[readonly]:checked ~ .checkbox-label::before', {
        background: ref(checkboxCheckedReadonlyBackground),
        borderColor: ref(checkboxCheckedReadonlyBorderColor)
    });
}

export function useCheckboxThemeSizeFactory(variant: CheckboxSizeVariant) {
    const {
        checkboxMarginRight,
        checkboxMarginBottom,
        checkboxBorderTopLeftRadius,
        checkboxBorderTopRightRadius,
        checkboxBorderBottomRightRadius,
        checkboxBorderBottomLeftRadius,
        checkboxFontSize,
        checkboxWidth,
        checkboxHeight,
        checkboxCheckmarkWidth,
        checkboxCheckmarkHeight
    } = useCheckboxThemeVariables();
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
                topLeft: multiply(ref(checkboxBorderTopLeftRadius), sizeMultiplierRef),
                topRight: multiply(ref(checkboxBorderTopRightRadius), sizeMultiplierRef),
                bottomRight: multiply(ref(checkboxBorderBottomRightRadius), sizeMultiplierRef),
                bottomLeft: multiply(ref(checkboxBorderBottomLeftRadius), sizeMultiplierRef)
            },
            fontSize: multiply(ref(checkboxFontSize), sizeMultiplierRef),
            margin: {
                top: 0,
                right: multiply(ref(checkboxMarginRight), sizeMultiplierRef),
                bottom: multiply(ref(checkboxMarginBottom), sizeMultiplierRef),
                left: 0
            },
            width: multiply(ref(checkboxWidth), sizeMultiplierRef),
            height: multiply(ref(checkboxHeight), sizeMultiplierRef)
        })
    );

    const { checkmarkWidth, checkmarkHeight } = replaceExportsNamespace(
        nsvariables([...sizeNs, 'checkmark'] as const, {
            width: multiply(ref(checkboxCheckmarkWidth), sizeMultiplierRef),
            height: multiply(ref(checkboxCheckmarkHeight), sizeMultiplierRef)
        }),
        [...sizeNs, 'checkmark'] as const,
        'checkmark'
    );

    selector(`.checkbox.-${variant}`, {
        fontSize: ref(fontSize)
    });

    selector(`.checkbox.-${variant} .checkbox-label`, {
        fontSize: ref(checkboxFontSize),
        paddingLeft: add(ref(width), ref(checkboxMarginRight))
    });

    selector(
        [
            `.checkbox.-${variant} .checkbox-label::before`,
            `.checkbox.-${variant} .checkbox-label::after`
        ],
        {
            width: ref(width),
            height: ref(height)
        }
    );

    selector(`.checkbox.-${variant} .checkbox-label::before`, {
        borderTopLeftRadius: ref(borderTopLeftRadius),
        borderTopRightRadius: ref(borderTopRightRadius),
        borderBottomRightRadius: ref(borderBottomRightRadius),
        borderBottomLeftRadius: ref(borderBottomLeftRadius)
    });

    selector(`.checkbox.-${variant} .checkbox-label::after`, {
        maskSize: [ref(checkmarkWidth), ref(checkmarkHeight)]
    });
}

export function useCheckboxThemeSizes({ sizes = defaultCheckboxSizes } = {}) {
    sizes.forEach(useCheckboxThemeSizeFactory);
}

export function useCheckboxThemeColorFactory(variant: CheckboxColorVariant) {
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

    selector(`.checkbox.-${variant} .checkbox-label`, {
        color: ref(color)
    });

    selector(`.checkbox.-${variant} .checkbox-label::before`, {
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

    selector(`.checkbox.-${variant} input:disabled ~ .checkbox-label::before`, {
        background: ref(disabledBackground),
        borderColor: ref(disabledBorderColor)
    });

    selector(`.checkbox.-${variant} input:checked:disabled ~ .checkbox-label::before`, {
        background: ref(checkedDisabledBackground),
        borderColor: ref(checkedDisabledBorderColor)
    });
}

export function useCheckboxThemeColors({ colors = defaultCheckboxColors } = {}) {
    colors.forEach(useCheckboxThemeColorFactory);
}

export function useCheckboxThemeVariants() {
    const { checkboxMarginRight } = useCheckboxThemeVariables();

    selector('.checkbox.-native input', {
        top: 'auto',
        left: 'auto',
        position: 'relative',
        opacity: 1,
        height: 'auto',
        width: 'auto'
    });

    selector('.checkbox.-native .checkbox-label', {
        paddingLeft: ref(checkboxMarginRight)
    });

    selector(
        ['.checkbox.-native .checkbox-label::before', '.checkbox.-native .checkbox-label::after'],
        {
            display: 'none'
        }
    );
}

export function useCheckboxTheme() {
    useCheckboxThemeLayout();
    useCheckboxThemeBase();
    useCheckboxThemeSizes();
    useCheckboxThemeColors();
    useCheckboxThemeVariants();
}
