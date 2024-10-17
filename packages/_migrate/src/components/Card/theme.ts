import {
    capitalize,
    multiply,
    ref,
    selector,
    nsvariable,
    defaultDefinitionOptions,
    nsdefine
} from '@inkline/core';
import {
    ComponentSize,
    ComponentBrandColor,
    useBorder,
    useBorderRadiusBase,
    useBoxShadow,
    useBrandColorVariants,
    useFontSize,
    useKeyMappedSizeMultiplier,
    usePaddingBase,
    useTransition,
    useColors,
    useContrastTextColor,
    useNeutralColors,
    defaultComponentSizes,
    defaultComponentBrandColors
} from '@inkline/theme';

const ns = 'card' as const;

export function useCardThemeVariables(options = defaultDefinitionOptions) {
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
    const { colorLightShade50 } = useBrandColorVariants();
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
    const { transitionProperty, transitionDuration, transitionTimingFunction } = useTransition();

    return {
        ...nsdefine(
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
        )
    };
}

export function useCardThemeLayout() {
    selector('.card', {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        wordWrap: 'break-word',
        backgroundClip: 'border-box'
    });
}

export function useCardThemeBase() {
    const {
        cardBorderStyle,
        cardBorderColor,
        cardBorderWidth,
        cardPadding,
        cardBorderRadius,
        cardBoxShadow,
        cardBackground,
        cardColor,
        cardFontSize,
        cardTransitionProperty,
        cardTransitionDuration,
        cardTransitionTimingFunction
    } = useCardThemeVariables();

    selector('.card', {
        boxShadow: ref(cardBoxShadow),
        color: ref(cardColor),
        fontSize: ref(cardFontSize)
    });

    selector(['.card-header', '.card-body', '.card-footer'], {
        background: ref(cardBackground),
        borderStyle: ref(cardBorderStyle),
        borderColor: ref(cardBorderColor),
        borderWidth: ref(cardBorderWidth),
        borderRadius: ref(cardBorderRadius),
        padding: ref(cardPadding),
        transitionProperty: ref(cardTransitionProperty),
        transitionDuration: ref(cardTransitionDuration),
        transitionTimingFunction: ref(cardTransitionTimingFunction)
    });

    selector('.card-header + .card-body', {
        borderTop: 0
    });

    selector('.card-body:has(+ .card-footer)', {
        borderBottom: 0
    });

    selector(
        [
            '.card-header:has(+ .card-body)',
            '.card-header:has(+ .card-footer)',
            '.card-body:has(+ .card-footer)'
        ],
        {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0
        }
    );

    selector(
        ['.card-header + .card-footer', '.card-header + .card-body', '.card-body + .card-footer'],
        {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0
        }
    );
}

export function useCardThemeVariants() {}

export function useCardThemeSizeFactory(size: ComponentSize) {
    const {
        cardPaddingTop,
        cardPaddingRight,
        cardPaddingBottom,
        cardPaddingLeft,
        cardBorderTopLeftRadius,
        cardBorderTopRightRadius,
        cardBorderBottomRightRadius,
        cardBorderBottomLeftRadius,
        cardFontSize
    } = useCardThemeVariables();
    const sizeMultiplierKeyMap = useKeyMappedSizeMultiplier();
    const sizeMultiplierRef = ref(sizeMultiplierKeyMap[size]);

    const variantPaddingTop = nsvariable(
        [ns, size],
        'padding-top',
        multiply(ref(cardPaddingTop), sizeMultiplierRef)
    );
    const variantPaddingRight = nsvariable(
        [ns, size],
        `padding-right`,
        multiply(ref(cardPaddingRight), sizeMultiplierRef)
    );
    const variantPaddingBottom = nsvariable(
        [ns, size],
        `padding-bottom`,
        multiply(ref(cardPaddingBottom), sizeMultiplierRef)
    );
    const variantPaddingLeft = nsvariable(
        [ns, size],
        `padding-left`,
        multiply(ref(cardPaddingLeft), sizeMultiplierRef)
    );

    const variantBorderTopLeftRadius = nsvariable(
        [ns, size],
        'border-top-left-radius',
        multiply(ref(cardBorderTopLeftRadius), sizeMultiplierRef)
    );
    const variantBorderTopRightRadius = nsvariable(
        [ns, size],
        'border-top-right-radius',
        multiply(ref(cardBorderTopRightRadius), sizeMultiplierRef)
    );
    const variantBorderBottomRightRadius = nsvariable(
        [ns, size],
        'border-bottom-right-radius',
        multiply(ref(cardBorderBottomRightRadius), sizeMultiplierRef)
    );
    const variantBorderBottomLeftRadius = nsvariable(
        [ns, size],
        'border-bottom-left-radius',
        multiply(ref(cardBorderBottomLeftRadius), sizeMultiplierRef)
    );

    const variantFontSize = nsvariable([ns, size], 'font-size', ref(cardFontSize));

    selector(`.card.-${size}`, {
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
}

export function useCardThemeSizes({ sizes = defaultComponentSizes } = {}) {
    sizes.forEach(useCardThemeSizeFactory);
}

export function useCardThemeColorFactory(color: ComponentBrandColor) {
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

    selector(`.card.-${color}`, {
        border: ref(variantBorderColor),
        background: ref(variantBackground),
        color: ref(variantColor)
    });
}

export function useCardThemeColors({ colors = defaultComponentBrandColors } = {}) {
    colors.forEach(useCardThemeColorFactory);
}

export function useCardTheme() {
    useCardThemeVariables();
    useCardThemeLayout();
    useCardThemeBase();
    useCardThemeSizes();
    useCardThemeColors();
    useCardThemeVariants();
}
