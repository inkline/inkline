import {
    capitalize,
    ComponentBrandColor,
    ComponentSize,
    defaultComponentBrandColors,
    defaultComponentSizes,
    defaultDefinitionOptions,
    multiply,
    nsdefine,
    nsvariable,
    ref,
    selector,
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
                width: '40px',
                height: '40px'
            },
            options
        ),
        ...nsdefine(
            [ns, 'square'] as const,
            {
                width: '40px',
                height: '40px'
            },
            options
        ),
        ...nsdefine(
            [ns, 'block'] as const,
            {
                margin: { top: ref(marginTop) }
            },
            options
        ),
        ...nsdefine([ns, 'loader'] as const, { width: '1rem', height: '1rem' }, options),
        ...nsdefine(
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

    selector('.button .loader', {
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

export function useButtonThemeSizeFactory(size: ComponentSize) {
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
    const sizeMultiplierRef = ref(sizeMultiplierKeyMap[size]);

    const variantPaddingTop = nsvariable(
        [ns, size],
        'padding-top',
        multiply(ref(buttonPaddingTop), sizeMultiplierRef)
    );
    const variantPaddingRight = nsvariable(
        [ns, size],
        `padding-right`,
        multiply(ref(buttonPaddingRight), sizeMultiplierRef)
    );
    const variantPaddingBottom = nsvariable(
        [ns, size],
        `padding-bottom`,
        multiply(ref(buttonPaddingBottom), sizeMultiplierRef)
    );
    const variantPaddingLeft = nsvariable(
        [ns, size],
        `padding-left`,
        multiply(ref(buttonPaddingLeft), sizeMultiplierRef)
    );

    const variantBorderTopLeftRadius = nsvariable(
        [ns, size],
        'border-top-left-radius',
        multiply(ref(buttonBorderTopLeftRadius), sizeMultiplierRef)
    );
    const variantBorderTopRightRadius = nsvariable(
        [ns, size],
        'border-top-right-radius',
        multiply(ref(buttonBorderTopRightRadius), sizeMultiplierRef)
    );
    const variantBorderBottomRightRadius = nsvariable(
        [ns, size],
        'border-bottom-right-radius',
        multiply(ref(buttonBorderBottomRightRadius), sizeMultiplierRef)
    );
    const variantBorderBottomLeftRadius = nsvariable(
        [ns, size],
        'border-bottom-left-radius',
        multiply(ref(buttonBorderBottomLeftRadius), sizeMultiplierRef)
    );

    const variantFontSize = nsvariable([ns, size], 'font-size', ref(buttonFontSize));

    const variantCircleWidth = nsvariable(
        [ns, size, 'circle'],
        'width',
        multiply(ref(buttonCircleWidth), sizeMultiplierRef)
    );
    const variantCircleHeight = nsvariable(
        [ns, size, 'circle'],
        'height',
        multiply(ref(buttonCircleHeight), sizeMultiplierRef)
    );

    const variantSquareWidth = nsvariable(
        [ns, size, 'square'],
        'width',
        multiply(ref(buttonSquareWidth), sizeMultiplierRef)
    );
    const variantSquareHeight = nsvariable(
        [ns, size, 'square'],
        'height',
        multiply(ref(buttonSquareHeight), sizeMultiplierRef)
    );

    selector(`.button.-${size}`, {
        borderRadius: [
            ref(variantBorderTopLeftRadius),
            ref(variantBorderTopRightRadius),
            ref(variantBorderBottomRightRadius),
            ref(variantBorderBottomLeftRadius)
        ],
        fontSize: ref(variantFontSize),
        padding: [
            ref(variantPaddingTop),
            ref(variantPaddingRight),
            ref(variantPaddingBottom),
            ref(variantPaddingLeft)
        ]
    });

    selector(`.button.-circle.-${size}`, {
        width: ref(variantCircleWidth),
        height: ref(variantCircleHeight)
    });

    selector(`.button.-square.-${size}`, {
        width: ref(variantSquareWidth),
        height: ref(variantSquareHeight)
    });
}

export function useButtonThemeSizes(sizes = defaultComponentSizes) {
    sizes.forEach(useButtonThemeSizeFactory);
}

export function useButtonThemeColorFactory(color: ComponentBrandColor) {
    const colorKey = capitalize(color);
    const shadeOrTint = color === 'dark' ? 'Tint' : 'Shade';

    const colors = useColors();
    const contrastTextColors = useContrastTextColor();

    const variantBorderColor = nsvariable(
        [ns, color],
        `border-color`,
        ref(colors[`color${colorKey}${shadeOrTint}50`])
    );
    const variantBackground = nsvariable(
        [ns, color],
        `background`,
        ref(colors[`color${colorKey}`])
    );
    const variantColor = nsvariable(
        [ns, color],
        `color`,
        ref(contrastTextColors[`contrastTextColor${colorKey}`])
    );

    selector(`.button.-${color}`, {
        borderColor: ref(variantBorderColor),
        background: ref(variantBackground),
        color: ref(variantColor)
    });

    // Button hover state

    const variantHoverBorderColor = nsvariable(
        [ns, color, 'hover'],
        `border-color`,
        ref(colors[`color${colorKey}${shadeOrTint}100`])
    );
    const variantHoverBackground = nsvariable(
        [ns, color, 'hover'],
        `background`,
        ref(colors[`color${colorKey}${shadeOrTint}50`])
    );
    const variantHoverColor = nsvariable([ns, color, 'hover'], `color`, ref(variantColor));

    selector([`.button.-${color}:hover`, `.button.-${color}.-hover`], {
        borderColor: ref(variantHoverBorderColor),
        background: ref(variantHoverBackground),
        color: ref(variantHoverColor)
    });

    // Button focus state

    const variantFocusBorderColor = nsvariable(
        [ns, color, 'focus'],
        `border-color`,
        ref(colors[`color${colorKey}${shadeOrTint}100`])
    );
    const variantFocusBackground = nsvariable(
        [ns, color, 'focus'],
        `background`,
        ref(colors[`color${colorKey}${shadeOrTint}50`])
    );
    const variantFocusColor = nsvariable([ns, color, 'focus'], `color`, ref(variantColor));

    selector([`.button.-${color}:focus`, `.button.-${color}.-focus`], {
        borderColor: ref(variantFocusBorderColor),
        background: ref(variantFocusBackground),
        color: ref(variantFocusColor)
    });

    // Button active state

    const variantActiveBorderColor = nsvariable(
        [ns, color, 'active'],
        `border-color`,
        ref(colors[`color${colorKey}${shadeOrTint}100`])
    );
    const variantActiveBackground = nsvariable(
        [ns, color, 'active'],
        `background`,
        ref(colors[`color${colorKey}${shadeOrTint}100`])
    );
    const variantActiveColor = nsvariable([ns, color, 'active'], `color`, ref(variantColor));

    selector([`.button.-${color}:active`, `.button.-${color}.-active`], {
        borderColor: ref(variantActiveBorderColor),
        background: ref(variantActiveBackground),
        color: ref(variantActiveColor)
    });

    // Button disabled state

    selector([`.button.-${color}:disabled`, `.button.-${color}.-disabled`], {
        borderColor: ref(variantBorderColor),
        background: ref(variantBackground),
        color: ref(variantColor)
    });

    // Outline button

    const variantOutlineBorderColor = nsvariable(
        [ns, color, 'outline'],
        `border-color`,
        ref(colors[`color${colorKey}`])
    );
    const variantOutlineColor = nsvariable(
        [ns, color, 'outline'],
        `color`,
        ref(colors[`color${colorKey}`])
    );

    selector(`.button.-${color}.-outline`, {
        borderColor: ref(variantOutlineBorderColor),
        color: ref(variantOutlineColor)
    });

    selector([`.button.-${color}.-outline:hover`, `.button.-${color}.-outline.-hover`], {
        color: ref(variantColor)
    });

    // Link button

    const variantLinkColor = nsvariable(
        [ns, color, 'link'],
        `color`,
        ref(colors[`color${colorKey}`])
    );

    selector(`.button.-${color}.-link`, {
        color: ref(variantLinkColor)
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
