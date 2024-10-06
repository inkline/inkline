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
    useFontWeight,
    defaultComponentSizes,
    defaultComponentBrandColors,
    useBrandColors
} from '@inkline/theme';
import {
    capitalize,
    multiply,
    ref,
    selector,
    nsvariable,
    nsdefine,
    defaultDefinitionOptions
} from '@inkline/core';

const ns = 'badge' as const;

export function useBadgeThemeVariables(options = defaultDefinitionOptions) {
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
    const { colorLightH, colorLightS, colorLightL, colorLightA } = useBrandColors();
    const { contrastTextColorLight } = useContrastTextColor();
    const { fontSize } = useFontSize();
    const { fontWeightSemibold } = useFontWeight();
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
                    h: ref(colorLightH),
                    s: ref(colorLightS),
                    l: ref(colorLightL),
                    a: ref(colorLightA)
                },
                color: ref(contrastTextColorLight),
                fontSize: ref(fontSize),
                fontWeight: ref(fontWeightSemibold),
                padding: {
                    top: multiply(ref(paddingTop), 0.25),
                    right: multiply(ref(paddingRight), 0.5),
                    bottom: multiply(ref(paddingBottom), 0.25),
                    left: multiply(ref(paddingLeft), 0.5)
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
            [ns, 'pill'] as const,
            {
                borderRadius: {
                    topLeft: '50%',
                    topRight: '50%',
                    bottomLeft: '50%',
                    bottomRight: '50%'
                }
            },
            options
        )
    };
}

export function useBadgeThemeLayout() {
    selector('.badge', {
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center'
    });

    selector('a:hover .badge, a:focus .badge', {
        textDecoration: 'none'
    });
}

export function useBadgeThemeBase() {
    const {
        badgeBorderStyle,
        badgeBorderColor,
        badgeBorderWidth,
        badgePadding,
        badgeBorderRadius,
        badgeBoxShadow,
        badgeBackground,
        badgeColor,
        badgeFontSize,
        badgeFontWeight,
        badgeTransitionProperty,
        badgeTransitionDuration,
        badgeTransitionTimingFunction
    } = useBadgeThemeVariables();

    selector('.badge', {
        borderStyle: ref(badgeBorderStyle),
        borderColor: ref(badgeBorderColor),
        borderWidth: ref(badgeBorderWidth),
        borderRadius: ref(badgeBorderRadius),
        boxShadow: ref(badgeBoxShadow),
        background: ref(badgeBackground),
        color: ref(badgeColor),
        fontSize: ref(badgeFontSize),
        fontWeight: ref(badgeFontWeight),
        padding: ref(badgePadding),
        transitionProperty: ref(badgeTransitionProperty),
        transitionDuration: ref(badgeTransitionDuration),
        transitionTimingFunction: ref(badgeTransitionTimingFunction)
    });
}

export function useBadgeThemeVariants() {
    const { badgePillBorderRadius } = useBadgeThemeVariables();

    selector('.badge.-pill', {
        borderRadius: ref(badgePillBorderRadius)
    });
}

export function useBadgeThemeSizeFactory(size: ComponentSize) {
    const {
        badgePaddingTop,
        badgePaddingRight,
        badgePaddingBottom,
        badgePaddingLeft,
        badgeBorderTopLeftRadius,
        badgeBorderTopRightRadius,
        badgeBorderBottomRightRadius,
        badgeBorderBottomLeftRadius,
        badgeFontSize
    } = useBadgeThemeVariables();
    const sizeMultiplierKeyMap = useKeyMappedSizeMultiplier();
    const sizeMultiplierRef = ref(sizeMultiplierKeyMap[size]);

    const variantPaddingTop = nsvariable(
        [ns, size],
        'padding-top',
        multiply(ref(badgePaddingTop), sizeMultiplierRef)
    );
    const variantPaddingRight = nsvariable(
        [ns, size],
        `padding-right`,
        multiply(ref(badgePaddingRight), sizeMultiplierRef)
    );
    const variantPaddingBottom = nsvariable(
        [ns, size],
        `padding-bottom`,
        multiply(ref(badgePaddingBottom), sizeMultiplierRef)
    );
    const variantPaddingLeft = nsvariable(
        [ns, size],
        `padding-left`,
        multiply(ref(badgePaddingLeft), sizeMultiplierRef)
    );

    const variantBorderTopLeftRadius = nsvariable(
        [ns, size],
        'border-top-left-radius',
        multiply(ref(badgeBorderTopLeftRadius), sizeMultiplierRef)
    );
    const variantBorderTopRightRadius = nsvariable(
        [ns, size],
        'border-top-right-radius',
        multiply(ref(badgeBorderTopRightRadius), sizeMultiplierRef)
    );
    const variantBorderBottomRightRadius = nsvariable(
        [ns, size],
        'border-bottom-right-radius',
        multiply(ref(badgeBorderBottomRightRadius), sizeMultiplierRef)
    );
    const variantBorderBottomLeftRadius = nsvariable(
        [ns, size],
        'border-bottom-left-radius',
        multiply(ref(badgeBorderBottomLeftRadius), sizeMultiplierRef)
    );

    const variantFontSize = nsvariable([ns, size], 'font-size', ref(badgeFontSize));

    selector(`.badge.-${size}`, {
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

export function useBadgeThemeSizes({ sizes = defaultComponentSizes } = {}) {
    sizes.forEach(useBadgeThemeSizeFactory);
}

export function useBadgeThemeColorFactory(color: ComponentBrandColor) {
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

    selector(`.badge.-${color}`, {
        borderColor: ref(variantBorderColor),
        background: ref(variantBackground),
        color: ref(variantColor)
    });
}

export function useBadgeThemeColors({ colors = defaultComponentBrandColors } = {}) {
    colors.forEach(useBadgeThemeColorFactory);
}

export function useBadgeTheme() {
    useBadgeThemeVariables();
    useBadgeThemeLayout();
    useBadgeThemeBase();
    useBadgeThemeSizes();
    useBadgeThemeColors();
    useBadgeThemeVariants();
}
