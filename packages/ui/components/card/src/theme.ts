import {
    ref,
    selector,
    defaultDefinitionOptions,
    nsvariables,
    multiply,
    stripExportsNamespace
} from '@inkline/core';
import { capitalize } from '@inkline/utils';
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

const ns = 'card';

export const defaultCardColor = 'info';
export const defaultCardColors = defaultComponentBrandColors;
export const defaultCardSize = 'md';
export const defaultCardSizes = defaultComponentSizes;

export type CardColorVariant = ComponentBrandColor;
export type CardSizeVariant = ComponentSize;

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
        cardBorderTopLeftRadius,
        cardBorderTopRightRadius,
        cardBorderBottomLeftRadius,
        cardBorderBottomRightRadius,
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

    selector('.card > *:first-child', {
        borderTopLeftRadius: ref(cardBorderTopLeftRadius),
        borderTopRightRadius: ref(cardBorderTopRightRadius)
    });

    selector('.card > *:last-child', {
        borderBottomRightRadius: ref(cardBorderBottomRightRadius),
        borderBottomLeftRadius: ref(cardBorderBottomLeftRadius)
    });
}

export function useCardThemeSizeFactory(variant: ComponentSize) {
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
            padding: {
                top: multiply(ref(cardPaddingTop), sizeMultiplierRef),
                right: multiply(ref(cardPaddingRight), sizeMultiplierRef),
                bottom: multiply(ref(cardPaddingBottom), sizeMultiplierRef),
                left: multiply(ref(cardPaddingLeft), sizeMultiplierRef)
            },
            borderRadius: {
                topLeft: multiply(ref(cardBorderTopLeftRadius), sizeMultiplierRef),
                topRight: multiply(ref(cardBorderTopRightRadius), sizeMultiplierRef),
                bottomRight: multiply(ref(cardBorderBottomRightRadius), sizeMultiplierRef),
                bottomLeft: multiply(ref(cardBorderBottomLeftRadius), sizeMultiplierRef)
            },
            fontSize: multiply(ref(cardFontSize), sizeMultiplierRef)
        })
    );

    selector(`.card.-${variant}`, {
        fontSize: ref(fontSize)
    });

    selector(
        [
            `.card.-${variant} .card-header`,
            `.card.-${variant} .card-body`,
            `.card.-${variant} .card-footer`
        ],
        {
            fontSize: ref(fontSize),
            padding: [ref(paddingTop), ref(paddingRight), ref(paddingBottom), ref(paddingLeft)]
        }
    );

    selector([`.card.-${variant} > *:first-child`], {
        borderTopLeftRadius: ref(borderTopLeftRadius),
        borderTopRightRadius: ref(borderTopRightRadius)
    });

    selector([`.card.-${variant} > *:last-child`], {
        borderBottomRightRadius: ref(borderBottomRightRadius),
        borderBottomLeftRadius: ref(borderBottomLeftRadius)
    });
}

export function useCardThemeSizes({ sizes = defaultComponentSizes } = {}) {
    sizes.forEach(useCardThemeSizeFactory);
}

export function useCardThemeColorFactory(variant: ComponentBrandColor) {
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

    selector(
        [
            `.card.-${variant} .card-header`,
            `.card.-${variant} .card-body`,
            `.card.-${variant} .card-footer`
        ],
        {
            borderColor: ref(borderColor),
            background: ref(background),
            color: ref(color)
        }
    );
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
}
