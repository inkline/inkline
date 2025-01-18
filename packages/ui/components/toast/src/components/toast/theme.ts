import {
    multiply,
    ref,
    selector,
    nsvariables,
    defaultDefinitionOptions,
    Variable,
    keyframes,
    stripExportsNamespace,
    setExportsNamespace
} from '@inkline/core';
import { capitalize } from '@inkline/utils';
import {
    useBorder,
    useBorderRadius,
    useBoxShadow,
    useBrandColorVariants,
    useFontSize,
    useKeyMappedSizeMultiplier,
    useTransition,
    useFontWeight,
    useNeutralColors,
    useContrastTextColor,
    useBrandColors,
    useSpacing
} from '@inkline/theme';

const ns = 'toast';

const defaultToastColor = 'light';
const defaultToastColors = [
    'light',
    'dark',
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info'
] as const;

const defaultToastSize = 'md';
const defaultToastSizes = ['sm', 'md', 'lg'] as const;

type ToastColorVariant = (typeof defaultToastColors)[number];
type ToastSizeVariant = (typeof defaultToastSizes)[number];

export function useToastThemeVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

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
    const { spacing } = useSpacing(options);
    const {
        borderTopLeftRadius,
        borderTopRightRadius,
        borderBottomRightRadius,
        borderBottomLeftRadius
    } = useBorderRadius(options);
    const {
        boxShadowOffsetX,
        boxShadowOffsetY,
        boxShadowBlurRadius,
        boxShadowSpreadRadius,
        boxShadowColor
    } = useBoxShadow(options);
    const { contrastTextColorLight } = useContrastTextColor(options);
    const { colorWhiteH, colorWhiteS, colorWhiteL, colorWhiteA } = useNeutralColors(options);
    const { colorLightShade50 } = useBrandColorVariants(options);
    const { fontSize } = useFontSize(options);
    const { fontWeightSemibold } = useFontWeight(options);
    const { transitionProperty, transitionDuration, transitionTimingFunction } =
        useTransition(options);

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
                background: ref(colorWhite),
                color: ref(contrastTextColorLight),
                fontSize: ref(fontSize),
                padding: {
                    top: ref(spacing),
                    right: ref(spacing),
                    bottom: ref(spacing),
                    left: ref(spacing)
                },
                transition: {
                    property: ref(transitionProperty),
                    duration: ref(transitionDuration),
                    timingFunction: ref(transitionTimingFunction)
                }
            },
            options
        ),
        ...nsvariables([ns, 'link'] as const, {
            fontWeight: ref(fontWeightSemibold)
        }),
        ...nsvariables([ns, 'title'] as const, {
            fontWeight: ref(fontWeightSemibold),
            fontSize: ref(fontSize)
        }),
        ...nsvariables([ns, 'progress'] as const, {
            height: '4px',
            background: 'rgba(0, 0, 0, 0.05)'
        }),
        ...nsvariables([ns, 'progress', 'bar'] as const, {
            background: 'rgba(0, 0, 0, 0.15)'
        })
    };
}

export function useToastThemeLayout(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { toastProgressHeight } = useToastThemeVariables(options);

    selector('.toast', {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        flex: '1 1 auto',
        alignItems: 'center',
        minWidth: 0,
        wordWrap: 'break-word',
        overflow: 'hidden',
        backgroundClip: 'border-box'
    });

    selector('.toast-content', {
        flex: '0 1 100%'
    });

    selector('.toast-icon', {
        flex: 1,
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    });

    selector('.toast-dismiss', {
        flex: '0 0 auto',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
    });

    selector('.toast-progress', {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 1,
        height: ref(toastProgressHeight)
    });

    selector('.toast-progress-bar', {
        animation: 'toast-duration var(--toast--duration) forwards',
        transformOrigin: 'left center',
        width: '100%',
        height: '100%'
    });

    keyframes('toast-duration', {
        to: {
            transform: 'scaleX(0)'
        }
    });
}

export function useToastThemeBase(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        toastBorderStyle,
        toastBorderColor,
        toastBorderWidth,
        toastPaddingRight,
        toastPaddingLeft,
        toastPadding,
        toastBorderRadius,
        toastBoxShadow,
        toastBackground,
        toastColor,
        toastFontSize,
        toastTransitionProperty,
        toastTransitionDuration,
        toastTransitionTimingFunction,
        toastLinkFontWeight,
        toastTitleFontWeight,
        toastTitleFontSize,
        toastProgressBackground,
        toastProgressBarBackground
    } = useToastThemeVariables(options);

    selector('.toast', {
        borderStyle: ref(toastBorderStyle),
        borderColor: ref(toastBorderColor),
        borderWidth: ref(toastBorderWidth),
        borderRadius: ref(toastBorderRadius),
        boxShadow: ref(toastBoxShadow),
        background: ref(toastBackground),
        color: ref(toastColor),
        fontSize: ref(toastFontSize),
        transitionProperty: ref(toastTransitionProperty),
        transitionDuration: ref(toastTransitionDuration),
        transitionTimingFunction: ref(toastTransitionTimingFunction)
    });

    selector('.toast-content', {
        padding: ref(toastPadding)
    });

    selector('.toast-content *:first-child', {
        marginTop: 0
    });

    selector('.toast-content > .toast-title', {
        fontWeight: ref(toastTitleFontWeight),
        fontSize: ref(toastTitleFontSize)
    });

    selector('.toast-content *:last-child', {
        marginBottom: 0
    });

    selector('.toast-icon', {
        marginLeft: ref(toastPaddingLeft)
    });

    selector('.toast-dismiss', {
        marginRight: ref(toastPaddingRight)
    });

    selector('.toast code', {
        background: 'hsla(0, 0%, 0%, 0.05)'
    });

    selector('.toast a', {
        fontWeight: ref(toastLinkFontWeight)
    });

    selector('.toast-progress', {
        background: ref(toastProgressBackground)
    });

    selector('.toast-progress-bar', {
        background: ref(toastProgressBarBackground)
    });
}

export function useToastThemeSizeSelectors(variant: ToastSizeVariant) {
    const {
        toastPaddingTop,
        toastPaddingRight,
        toastPaddingBottom,
        toastPaddingLeft,
        toastBorderTopLeftRadius,
        toastBorderTopRightRadius,
        toastBorderBottomRightRadius,
        toastBorderBottomLeftRadius,
        toastFontSize
    } = useToastThemeVariables(options);
    const sizeMultiplierKeyMap = useKeyMappedSizeMultiplier(options);
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
                top: multiply(ref(toastPaddingTop), sizeMultiplierRef),
                right: multiply(ref(toastPaddingRight), sizeMultiplierRef),
                bottom: multiply(ref(toastPaddingBottom), sizeMultiplierRef),
                left: multiply(ref(toastPaddingLeft), sizeMultiplierRef)
            },
            borderRadius: {
                topLeft: multiply(ref(toastBorderTopLeftRadius), sizeMultiplierRef),
                topRight: multiply(ref(toastBorderTopRightRadius), sizeMultiplierRef),
                bottomRight: multiply(ref(toastBorderBottomRightRadius), sizeMultiplierRef),
                bottomLeft: multiply(ref(toastBorderBottomLeftRadius), sizeMultiplierRef)
            },
            fontSize: multiply(ref(toastFontSize), sizeMultiplierRef)
        })
    );

    selector(`.toast.-${variant}`, {
        borderRadius: [
            ref(borderTopLeftRadius),
            ref(borderTopRightRadius),
            ref(borderBottomRightRadius),
            ref(borderBottomLeftRadius)
        ],
        fontSize: ref(fontSize)
    });

    selector(`.toast.-${variant} .toast-content`, {
        padding: [ref(paddingTop), ref(paddingRight), ref(paddingBottom), ref(paddingLeft)]
    });

    selector(`.toast.-${variant} .toast-icon`, {
        marginLeft: ref(paddingLeft)
    });

    selector(`.toast.-${variant} .toast-dismiss`, {
        marginRight: ref(paddingRight)
    });
}

export function useToastThemeSizes(sizes = defaultToastSizes) {
    sizes.forEach((size) => useToastThemeSizeSelectors(size, options));
}

export function useToastThemeColorSelectors(variant: ToastColorVariant) {
    const colorKey = capitalize(variant);
    const shadeOrTint = variant === 'dark' ? 'Tint' : 'Shade';
    const colorNs = [ns, variant] as const;

    const neutralColors = useNeutralColors(options);
    const brandColors = useBrandColors(options);
    const brandColorVariants = useBrandColorVariants(options);
    const { contrastTextColorLight, contrastTextColorDark } = useContrastTextColor(options);

    let backgroundValue: Variable;
    if (colorKey === 'Light') {
        backgroundValue = neutralColors.colorWhite;
    } else if (colorKey === 'Dark') {
        backgroundValue = brandColors.colorDark;
    } else {
        backgroundValue = brandColorVariants[`color${colorKey}100`];
    }

    let colorValue: Variable;
    if (colorKey === 'Light') {
        colorValue = contrastTextColorLight;
    } else if (colorKey === 'Dark') {
        colorValue = contrastTextColorDark;
    } else {
        colorValue = brandColorVariants[`color${colorKey}800`];
    }

    const { borderColor, background, color } = stripExportsNamespace(
        nsvariables(colorNs, {
            borderColor: ref(brandColorVariants[`color${colorKey}${shadeOrTint}50`]),
            background: ref(backgroundValue),
            color: ref(colorValue)
        })
    );

    const { progressBackground } = setExportsNamespace(
        nsvariables([ns, variant, 'progress'] as const, {
            background: variant === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
        }),
        'progress'
    );

    const { progressBarBackground } = setExportsNamespace(
        nsvariables([ns, variant, 'progress', 'bar'] as const, {
            background: variant === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)'
        }),
        ['progress', 'bar'] as const
    );

    selector(`.toast.-${variant}`, {
        borderColor: ref(borderColor),
        background: ref(background),
        color: ref(color)
    });

    selector(`.toast.-${variant} a`, {
        color: ref(color)
    });

    selector(`.toast.-${variant} .toast-progress`, {
        background: ref(progressBackground)
    });

    selector(`.toast.-${variant} .toast-progress-bar`, {
        background: ref(progressBarBackground)
    });
}

export function useToastThemeColors(colors = defaultToastColors) {
    colors.forEach((color) => useToastThemeColorSelectors(color, options));
}

export function useToastTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useToastThemeLayout(options);
    useToastThemeBase(options);
    useToastThemeSizes(options);
    useToastThemeColors(options);
}
