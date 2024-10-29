import {
    multiply,
    ref,
    selector,
    nsvariable,
    nsdefine,
    defaultDefinitionOptions,
    Variable,
    keyframes
} from '@inkline/core';
import { capitalize } from '@inkline/utils';
import {
    ComponentSize,
    ComponentStateColor,
    ComponentBrandNeutralColor,
    useBorder,
    useBorderRadiusBase,
    useBoxShadow,
    useBrandColorVariants,
    useFontSize,
    useKeyMappedSizeMultiplier,
    usePaddingBase,
    useTransition,
    useFontWeight,
    defaultComponentSizes,
    defaultComponentStateColors,
    defaultComponentNeutralColors,
    useNeutralColors,
    useContrastTextColor,
    useBrandColors
} from '@inkline/theme';

const ns = 'toast';

export function useToastThemeVariables(options = defaultDefinitionOptions) {
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
    const { contrastTextColorLight } = useContrastTextColor();
    const { colorWhiteH, colorWhiteS, colorWhiteL, colorWhiteA } = useNeutralColors();
    const { colorLightShade50 } = useBrandColorVariants();
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
        ),
        ...nsdefine([ns, 'link'] as const, {
            fontWeight: ref(fontWeightSemibold)
        }),
        ...nsdefine([ns, 'title'] as const, {
            fontWeight: ref(fontWeightSemibold),
            fontSize: ref(fontSize)
        }),
        ...nsdefine([ns, 'progress'] as const, {
            height: '4px',
            background: 'rgba(0, 0, 0, 0.05)'
        }),
        ...nsdefine([ns, 'progress', 'bar'] as const, {
            background: 'rgba(0, 0, 0, 0.15)'
        })
    };
}

export function useToastThemeLayout() {
    const { toastProgressHeight } = useToastThemeVariables();

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

export function useToastThemeBase() {
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
    } = useToastThemeVariables();

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

export function useToastThemeSizeFactory(size: ComponentSize) {
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
    } = useToastThemeVariables();
    const sizeMultiplierKeyMap = useKeyMappedSizeMultiplier();
    const sizeMultiplierRef = ref(sizeMultiplierKeyMap[size]);

    const variantPaddingTop = nsvariable(
        [ns, size],
        'padding-top',
        multiply(ref(toastPaddingTop), sizeMultiplierRef)
    );
    const variantPaddingRight = nsvariable(
        [ns, size],
        `padding-right`,
        multiply(ref(toastPaddingRight), sizeMultiplierRef)
    );
    const variantPaddingBottom = nsvariable(
        [ns, size],
        `padding-bottom`,
        multiply(ref(toastPaddingBottom), sizeMultiplierRef)
    );
    const variantPaddingLeft = nsvariable(
        [ns, size],
        `padding-left`,
        multiply(ref(toastPaddingLeft), sizeMultiplierRef)
    );

    const variantBorderTopLeftRadius = nsvariable(
        [ns, size],
        'border-top-left-radius',
        multiply(ref(toastBorderTopLeftRadius), sizeMultiplierRef)
    );
    const variantBorderTopRightRadius = nsvariable(
        [ns, size],
        'border-top-right-radius',
        multiply(ref(toastBorderTopRightRadius), sizeMultiplierRef)
    );
    const variantBorderBottomRightRadius = nsvariable(
        [ns, size],
        'border-bottom-right-radius',
        multiply(ref(toastBorderBottomRightRadius), sizeMultiplierRef)
    );
    const variantBorderBottomLeftRadius = nsvariable(
        [ns, size],
        'border-bottom-left-radius',
        multiply(ref(toastBorderBottomLeftRadius), sizeMultiplierRef)
    );

    const variantFontSize = nsvariable(
        [ns, size],
        'font-size',
        multiply(ref(toastFontSize), sizeMultiplierRef)
    );

    selector(`.toast.-${size}`, {
        borderRadius: [
            ref(variantBorderTopLeftRadius),
            ref(variantBorderTopRightRadius),
            ref(variantBorderBottomRightRadius),
            ref(variantBorderBottomLeftRadius)
        ],
        fontSize: ref(variantFontSize)
    });

    selector(`.toast.-${size} .toast-content`, {
        padding: [
            ref(variantPaddingTop),
            ref(variantPaddingRight),
            ref(variantPaddingBottom),
            ref(variantPaddingLeft)
        ]
    });

    selector(`.toast.-${size} .toast-icon`, {
        marginLeft: ref(variantPaddingLeft)
    });

    selector(`.toast.-${size} .toast-dismiss`, {
        marginRight: ref(variantPaddingRight)
    });
}

export function useToastThemeSizes({ sizes = defaultComponentSizes } = {}) {
    sizes.forEach(useToastThemeSizeFactory);
}

export function useToastThemeColorFactory(color: ComponentStateColor | ComponentBrandNeutralColor) {
    const colorKey = capitalize(color);
    const neutralColors = useNeutralColors();
    const brandColors = useBrandColors();
    const brandColorVariants = useBrandColorVariants();
    const { contrastTextColorLight, contrastTextColorDark } = useContrastTextColor();

    let variantBorderColorValue: Variable;
    if (colorKey === 'Dark') {
        variantBorderColorValue = brandColorVariants[`color${colorKey}Tint50`];
    } else {
        variantBorderColorValue = brandColorVariants[`color${colorKey}Shade50`];
    }
    const variantBorderColor = nsvariable(
        [ns, color],
        `border-color`,
        ref(variantBorderColorValue)
    );

    let variantBackgroundValue: Variable;
    if (colorKey === 'Light') {
        variantBackgroundValue = neutralColors.colorWhite;
    } else if (colorKey === 'Dark') {
        variantBackgroundValue = brandColors.colorDark;
    } else {
        variantBackgroundValue = brandColorVariants[`color${colorKey}100`];
    }
    const variantBackground = nsvariable([ns, color], `background`, ref(variantBackgroundValue));

    let variantColorValue: Variable;
    if (colorKey === 'Light') {
        variantColorValue = contrastTextColorLight;
    } else if (colorKey === 'Dark') {
        variantColorValue = contrastTextColorDark;
    } else {
        variantColorValue = brandColorVariants[`color${colorKey}800`];
    }
    const variantColor = nsvariable([ns, color], `color`, ref(variantColorValue));

    let variantProgressBackgroundValue: string;
    if (colorKey === 'Dark') {
        variantProgressBackgroundValue = 'rgba(255, 255, 255, 0.05)';
    } else {
        variantProgressBackgroundValue = 'rgba(0, 0, 0, 0.05)';
    }
    const variantProgressBackground = nsvariable(
        [ns, color, 'progress'],
        `background`,
        variantProgressBackgroundValue
    );

    let variantProgressBarBackgroundValue: string;
    if (colorKey === 'Dark') {
        variantProgressBarBackgroundValue = 'rgba(255, 255, 255, 0.15)';
    } else {
        variantProgressBarBackgroundValue = 'rgba(0, 0, 0, 0.15)';
    }
    const variantProgressBarBackground = nsvariable(
        [ns, color, 'progress', 'bar'],
        `background`,
        variantProgressBarBackgroundValue
    );

    selector(`.toast.-${color}`, {
        borderColor: ref(variantBorderColor),
        background: ref(variantBackground),
        color: ref(variantColor)
    });

    selector(`.toast.-${color} a`, {
        color: ref(variantColor)
    });

    selector(`.toast.-${color} .toast-progress`, {
        background: ref(variantProgressBackground)
    });

    selector(`.toast.-${color} .toast-progress-bar`, {
        background: ref(variantProgressBarBackground)
    });
}

export function useToastThemeColors({
    colors = [...defaultComponentNeutralColors, ...defaultComponentStateColors]
} = {}) {
    colors.forEach(useToastThemeColorFactory);
}

export function useToastTheme() {
    useToastThemeLayout();
    useToastThemeBase();
    useToastThemeSizes();
    useToastThemeColors();
}
