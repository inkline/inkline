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
    multiply,
    ref,
    selector,
    nsvariables,
    defaultDefinitionOptions,
    stripExportsNamespace
} from '@inkline/core';
import { capitalize } from '@inkline/utils';

const ns = 'badge';

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
        ...nsvariables(
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

export function useBadgeThemeSizeFactory(variant: ComponentSize) {
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
                topLeft: multiply(ref(badgeBorderTopLeftRadius), sizeMultiplierRef),
                topRight: multiply(ref(badgeBorderTopRightRadius), sizeMultiplierRef),
                bottomRight: multiply(ref(badgeBorderBottomRightRadius), sizeMultiplierRef),
                bottomLeft: multiply(ref(badgeBorderBottomLeftRadius), sizeMultiplierRef)
            },
            fontSize: multiply(ref(badgeFontSize), sizeMultiplierRef),
            padding: {
                top: multiply(ref(badgePaddingTop), sizeMultiplierRef),
                right: multiply(ref(badgePaddingRight), sizeMultiplierRef),
                bottom: multiply(ref(badgePaddingBottom), sizeMultiplierRef),
                left: multiply(ref(badgePaddingLeft), sizeMultiplierRef)
            }
        })
    );

    selector(`.badge.-${variant}`, {
        borderRadius: [
            ref(borderTopLeftRadius),
            ref(borderTopRightRadius),
            ref(borderBottomRightRadius),
            ref(borderBottomLeftRadius)
        ],
        fontSize: ref(fontSize),
        padding: [ref(paddingTop), ref(paddingRight), ref(paddingBottom), ref(paddingLeft)]
    });
}

export function useBadgeThemeSizes({ sizes = defaultComponentSizes } = {}) {
    sizes.forEach(useBadgeThemeSizeFactory);
}

export function useBadgeThemeColorFactory(variant: ComponentBrandColor) {
    const colorKey = capitalize(variant);
    const shadeOrTint = variant === 'dark' ? 'Tint' : 'Shade';
    const colorNs = [ns, variant] as const;

    const colors = useColors();
    const contrastTextColors = useContrastTextColor();

    const { borderColor, background, color } = stripExportsNamespace(
        nsvariables(colorNs, {
            borderColor: ref(colors[`color${colorKey}${shadeOrTint}50`]),
            background: ref(colors[`color${colorKey}`]),
            color: ref(contrastTextColors[`contrastTextColor${colorKey}`])
        })
    );

    selector(`.badge.-${variant}`, {
        borderColor: ref(borderColor),
        background: ref(background),
        color: ref(color)
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
