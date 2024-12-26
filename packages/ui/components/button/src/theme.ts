import {
    defaultDefinitionOptions,
    multiply,
    nsvariables,
    ref,
    selector,
    stripExportsNamespace,
    setExportsNamespace
} from '@inkline/core';
import { capitalize } from '@inkline/utils';
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
    useColors,
    useContrastTextColor,
    useFontSize,
    useKeyMappedSizeMultiplier,
    useMarginBase,
    usePaddingBase,
    useTransition
} from '@inkline/theme';

const ns = 'button';

export const defaultButtonColor = 'info';
export const defaultButtonColors = defaultComponentBrandColors;
export const defaultButtonSize = 'md';
export const defaultButtonSizes = defaultComponentSizes;

export type ButtonColorVariant = ComponentBrandColor;
export type ButtonSizeVariant = ComponentSize;

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
    const { paddingTop, paddingRight, paddingBottom, paddingLeft } = usePaddingBase();
    const { marginTop, marginLeft } = useMarginBase();
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
    const { transitionProperty, transitionDuration, transitionTimingFunction } = useTransition();

    return {
        ...nsvariables(
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
                    top: multiply(ref(paddingTop), 0.5),
                    right: ref(paddingRight),
                    bottom: multiply(ref(paddingBottom), 0.5),
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
            [ns, 'active'] as const,
            {
                background: ref(colorLightShade100)
            },
            options
        ),
        ...nsvariables([ns, 'hover'] as const, { background: ref(colorLightShade50) }, options),
        ...nsvariables([ns, 'focus'] as const, { background: ref(colorLightShade50) }, options),
        ...nsvariables([ns, 'disabled'] as const, { opacity: '0.8' }, options),
        ...nsvariables(
            [ns, 'circle'] as const,
            {
                width: '40px',
                height: '40px'
            },
            options
        ),
        ...nsvariables(
            [ns, 'square'] as const,
            {
                width: '40px',
                height: '40px'
            },
            options
        ),
        ...nsvariables(
            [ns, 'block'] as const,
            {
                margin: { top: ref(marginTop) }
            },
            options
        ),
        ...nsvariables([ns, 'loader'] as const, { width: '1rem', height: '1rem' }, options),
        ...nsvariables(
            [ns, 'icon'] as const,
            { margin: { left: multiply(ref(marginLeft), 0.5) } },
            options
        )
    };
}

export function useButtonThemeLayout() {
    selector('.button', {
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
    });

    // Button states

    selector(['.button.-disabled', '.button:disabled'], {
        cursor: 'not-allowed'
    });

    selector('.button.-loading', {
        cursor: 'default'
    });

    // Button icon and content

    selector(['.button-icon', 'button-content'], {
        lineHeight: 1,
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center'
    });

    // Future-proof disabling of clicks on `<a>` elements

    selector(['a.button.-disabled', '*:disabled a.button'], {
        pointerEvents: 'none'
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
        buttonTransitionProperty,
        buttonTransitionDuration,
        buttonTransitionTimingFunction,
        buttonHoverBackground,
        buttonFocusBackground,
        buttonActiveBackground,
        buttonLoaderWidth,
        buttonLoaderHeight,
        buttonIconMarginLeft,
        buttonDisabledOpacity
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
        transitionProperty: ref(buttonTransitionProperty),
        transitionDuration: ref(buttonTransitionDuration),
        transitionTimingFunction: ref(buttonTransitionTimingFunction)
    });

    // Button states

    selector(['.button:hover', '.button.-hover'], {
        background: ref(buttonHoverBackground)
    });

    selector(['.button:focus', '.button.-focus'], {
        background: ref(buttonFocusBackground)
    });

    selector(['.button:active', '.button.-active'], {
        background: ref(buttonActiveBackground)
    });

    selector(['.button:disabled', '.button.-disabled'], {
        background: ref(buttonBackground),
        opacity: ref(buttonDisabledOpacity),
        boxShadow: 'none'
    });

    // Button icon and content

    selector('.button-icon + .button-content', {
        marginLeft: ref(buttonIconMarginLeft)
    });

    // Button loading icon

    selector(['.button .loader', '.button .loader.-md'], {
        width: ref(buttonLoaderWidth),
        height: ref(buttonLoaderHeight)
    });

    selector('.button .loader svg circle', {
        stroke: ref(buttonColor)
    });
}

export function useButtonThemeVariants() {
    const {
        buttonBackground,
        buttonBlockMarginTop,
        buttonSquareWidth,
        buttonSquareHeight,
        buttonCircleWidth,
        buttonCircleHeight
    } = useButtonThemeVariables();

    // Block button

    selector('.button.-block', {
        display: 'flex',
        width: '100%'
    });

    selector('.button.-block + .button.-block', {
        marginTop: ref(buttonBlockMarginTop)
    });

    selector(
        [
            'input[type="submit"].button.-block',
            'input[type="reset"].button.-block',
            'input[type="button"].button.-block'
        ],
        {
            width: '100%'
        }
    );

    // Outline buttons
    // Remove button background

    selector('.button.-outline', {
        background: 'transparent',
        borderColor: ref(buttonBackground),
        color: ref(buttonBackground),
        boxShadow: 'none'
    });

    // Link button
    // Remove button background, box shadow, and border

    selector('.button.-link', {
        boxShadow: 'none',
        backgroundColor: 'transparent',
        borderColor: 'transparent'
    });

    selector('.button.-link', {
        cursor: 'pointer'
    });

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
            borderColor: 'transparent',
            textDecoration: 'underline'
        }
    );

    // Circle button

    selector('.button.-circle', {
        width: ref(buttonCircleWidth),
        height: ref(buttonCircleHeight),
        borderRadius: '50%',
        padding: 0
    });

    // Square button

    selector('.button.-square', {
        padding: 0,
        width: ref(buttonSquareWidth),
        height: ref(buttonSquareHeight)
    });
}

export function useButtonThemeSizeFactory(variant: ComponentSize) {
    const {
        buttonPaddingTop,
        buttonPaddingRight,
        buttonPaddingBottom,
        buttonPaddingLeft,
        buttonBorderTopLeftRadius,
        buttonBorderTopRightRadius,
        buttonBorderBottomRightRadius,
        buttonBorderBottomLeftRadius,
        buttonFontSize,
        buttonCircleWidth,
        buttonCircleHeight,
        buttonSquareWidth,
        buttonSquareHeight
    } = useButtonThemeVariables();
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
                topLeft: multiply(ref(buttonBorderTopLeftRadius), sizeMultiplierRef),
                topRight: multiply(ref(buttonBorderTopRightRadius), sizeMultiplierRef),
                bottomRight: multiply(ref(buttonBorderBottomRightRadius), sizeMultiplierRef),
                bottomLeft: multiply(ref(buttonBorderBottomLeftRadius), sizeMultiplierRef)
            },
            fontSize: multiply(ref(buttonFontSize), sizeMultiplierRef),
            padding: {
                top: multiply(ref(buttonPaddingTop), sizeMultiplierRef),
                right: multiply(ref(buttonPaddingRight), sizeMultiplierRef),
                bottom: multiply(ref(buttonPaddingBottom), sizeMultiplierRef),
                left: multiply(ref(buttonPaddingLeft), sizeMultiplierRef)
            }
        })
    );

    const { circleWidth, circleHeight } = setExportsNamespace(
        nsvariables([...sizeNs, 'circle'] as const, {
            width: multiply(ref(buttonCircleWidth), sizeMultiplierRef),
            height: multiply(ref(buttonCircleHeight), sizeMultiplierRef)
        }),
        'circle'
    );

    const { squareWidth, squareHeight } = setExportsNamespace(
        nsvariables([...sizeNs, 'square'] as const, {
            width: multiply(ref(buttonSquareWidth), sizeMultiplierRef),
            height: multiply(ref(buttonSquareHeight), sizeMultiplierRef)
        }),
        'square'
    );

    selector(`.button.-${variant}`, {
        borderRadius: [
            ref(borderTopLeftRadius),
            ref(borderTopRightRadius),
            ref(borderBottomRightRadius),
            ref(borderBottomLeftRadius)
        ],
        fontSize: ref(fontSize),
        padding: [ref(paddingTop), ref(paddingRight), ref(paddingBottom), ref(paddingLeft)]
    });

    selector(`.button.-circle.-${variant}`, {
        width: ref(circleWidth),
        height: ref(circleHeight)
    });

    selector(`.button.-square.-${variant}`, {
        width: ref(squareWidth),
        height: ref(squareHeight)
    });
}

export function useButtonThemeSizes(sizes = defaultComponentSizes) {
    sizes.forEach(useButtonThemeSizeFactory);
}

export function useButtonThemeColorFactory(variant: ComponentBrandColor) {
    const colorKey = capitalize(variant);
    const shadeOrTint = variant === 'dark' ? 'Tint' : 'Shade';
    const colors = useColors();
    const contrastTextColors = useContrastTextColor();
    const colorNs = [ns, variant] as const;

    const { borderColor, background, color } = stripExportsNamespace(
        nsvariables(colorNs, {
            borderColor: ref(colors[`color${colorKey}${shadeOrTint}50`]),
            background: ref(colors[`color${colorKey}`]),
            color: ref(contrastTextColors[`contrastTextColor${colorKey}`])
        })
    );

    const { hoverBorderColor, hoverBackground, hoverColor } = setExportsNamespace(
        nsvariables([...colorNs, 'hover'], {
            borderColor: ref(colors[`color${colorKey}${shadeOrTint}100`]),
            background: ref(colors[`color${colorKey}${shadeOrTint}50`]),
            color: ref(color)
        }),
        'hover'
    );

    const { focusBorderColor, focusBackground, focusColor } = setExportsNamespace(
        nsvariables([...colorNs, 'focus'], {
            borderColor: ref(colors[`color${colorKey}${shadeOrTint}100`]),
            background: ref(colors[`color${colorKey}${shadeOrTint}50`]),
            color: ref(color)
        }),
        'focus'
    );

    const { activeBorderColor, activeBackground, activeColor } = setExportsNamespace(
        nsvariables([...colorNs, 'active'], {
            borderColor: ref(colors[`color${colorKey}${shadeOrTint}100`]),
            background: ref(colors[`color${colorKey}${shadeOrTint}100`]),
            color: ref(color)
        }),
        'active'
    );

    const { outlineBorderColor, outlineColor } = setExportsNamespace(
        nsvariables([...colorNs, 'outline'], {
            borderColor: ref(colors[`color${colorKey}`]),
            color: ref(colors[`color${colorKey}`])
        }),
        'outline'
    );

    const { linkColor } = setExportsNamespace(
        nsvariables([...colorNs, 'link'], {
            color: ref(colors[`color${colorKey}`])
        }),
        'link'
    );

    selector(`.button.-${variant}`, {
        borderColor: ref(borderColor),
        background: ref(background),
        color: ref(color)
    });

    // Button hover state

    selector([`.button.-${variant}:hover`, `.button.-${variant}.-hover`], {
        borderColor: ref(hoverBorderColor),
        background: ref(hoverBackground),
        color: ref(hoverColor)
    });

    // Button focus state

    selector([`.button.-${variant}:focus`, `.button.-${variant}.-focus`], {
        borderColor: ref(focusBorderColor),
        background: ref(focusBackground),
        color: ref(focusColor)
    });

    // Button active state

    selector([`.button.-${variant}:active`, `.button.-${variant}.-active`], {
        borderColor: ref(activeBorderColor),
        background: ref(activeBackground),
        color: ref(activeColor)
    });

    // Button disabled state

    selector([`.button.-${variant}:disabled`, `.button.-${variant}.-disabled`], {
        borderColor: ref(borderColor),
        background: ref(background),
        color: ref(color)
    });

    // Outline button

    selector(`.button.-${variant}.-outline`, {
        borderColor: ref(outlineBorderColor),
        color: ref(outlineColor)
    });

    selector([`.button.-${variant}.-outline:hover`, `.button.-${variant}.-outline.-hover`], {
        color: ref(color)
    });

    // Link button

    selector(`.button.-${variant}.-link`, {
        color: ref(linkColor)
    });
}

export function useButtonThemeColors(colors = defaultComponentBrandColors) {
    colors.forEach(useButtonThemeColorFactory);
}

export function useButtonTheme() {
    useButtonThemeVariables();
    useButtonThemeLayout();
    useButtonThemeBase();
    useButtonThemeSizes();
    useButtonThemeColors();
    useButtonThemeVariants();
}
