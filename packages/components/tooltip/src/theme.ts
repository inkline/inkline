import {
    multiply,
    ref,
    selector,
    nsvariable,
    defaultDefinitionOptions,
    nsdefine
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

const ns = 'tooltip';

export function useTooltipThemeVariables(options = defaultDefinitionOptions) {
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
                    top: multiply(ref(paddingTop), 3 / 4),
                    right: ref(paddingRight),
                    bottom: multiply(ref(paddingBottom), 3 / 4),
                    left: ref(paddingLeft)
                },
                transition: {
                    property: ref(transitionProperty),
                    duration: ref(transitionDuration),
                    timingFunction: ref(transitionTimingFunction)
                },
                zIndex: 2000
            },
            options
        ),
        ...nsdefine(
            [ns, 'arrow'] as const,
            {
                size: '6px'
            },
            options
        )
    };
}

export function useTooltipThemeLayout() {
    const { tooltipZIndex } = useTooltipThemeVariables();

    selector('.tooltip', {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        wordWrap: 'break-word',
        backgroundClip: 'border-box',
        zIndex: ref(tooltipZIndex)
    });

    selector('.tooltip-trigger', {
        display: 'inline-flex'
    });

    selector('.tooltip[data-popup-placement^="top"]', {
        transformOrigin: 'center bottom'
    });

    selector('.tooltip[data-popup-placement^="right"]', {
        transformOrigin: 'left center'
    });

    selector('.tooltip[data-popup-placement^="bottom"]', {
        transformOrigin: 'center top'
    });

    selector('.tooltip[data-popup-placement^="left"]', {
        transformOrigin: 'right center'
    });

    selector('.tooltip-arrow', {
        position: 'absolute'
    });

    selector(['.tooltip-arrow', '.tooltip-arrow::after'], {
        display: 'block',
        width: 0,
        height: 0,
        borderColor: 'transparent',
        borderStyle: 'solid',
        position: 'absolute',
        boxSizing: 'border-box'
    });

    selector('.tooltip-arrow::after', {
        content: '""'
    });

    selector(
        [
            '.tooltip[data-popup-placement^="top"] .tooltip-arrow',
            '.tooltip[data-popup-placement^="top"] .tooltip-arrow::after'
        ],
        {
            borderBottomWidth: 0
        }
    );

    selector(
        [
            '.tooltip[data-popup-placement^="bottom"] .tooltip-arrow',
            '.tooltip[data-popup-placement^="bottom"] .tooltip-arrow::after'
        ],
        {
            borderTopWidth: 0
        }
    );

    selector(
        [
            '.tooltip[data-popup-placement^="right"] .tooltip-arrow',
            '.tooltip[data-popup-placement^="right"] .tooltip-arrow::after'
        ],
        {
            borderLeftWidth: 0
        }
    );

    selector(
        [
            '.tooltip[data-popup-placement^="left"] .tooltip-arrow',
            '.tooltip[data-popup-placement^="left"] .tooltip-arrow::after'
        ],
        {
            borderRightWidth: 0
        }
    );
}

export function useTooltipThemeBase() {
    const {
        tooltipBorderStyle,
        tooltipBorderColor,
        tooltipBorderWidth,
        tooltipPadding,
        tooltipBorderTopLeftRadius,
        tooltipBorderTopRightRadius,
        tooltipBorderBottomLeftRadius,
        tooltipBorderBottomRightRadius,
        tooltipBoxShadow,
        tooltipBackground,
        tooltipColor,
        tooltipFontSize,
        tooltipTransitionProperty,
        tooltipTransitionDuration,
        tooltipTransitionTimingFunction,
        tooltipArrowSize
    } = useTooltipThemeVariables();

    selector('.tooltip', {
        boxShadow: ref(tooltipBoxShadow),
        color: ref(tooltipColor),
        fontSize: ref(tooltipFontSize)
    });

    selector('.tooltip-content', {
        background: ref(tooltipBackground),
        borderStyle: ref(tooltipBorderStyle),
        borderColor: ref(tooltipBorderColor),
        borderWidth: ref(tooltipBorderWidth),
        borderTopLeftRadius: ref(tooltipBorderTopLeftRadius),
        borderTopRightRadius: ref(tooltipBorderTopRightRadius),
        borderBottomRightRadius: ref(tooltipBorderBottomRightRadius),
        borderBottomLeftRadius: ref(tooltipBorderBottomLeftRadius),
        padding: ref(tooltipPadding),
        transitionProperty: ref(tooltipTransitionProperty),
        transitionDuration: ref(tooltipTransitionDuration),
        transitionTimingFunction: ref(tooltipTransitionTimingFunction)
    });

    selector(['.tooltip-arrow', '.tooltip-arrow::after'], {
        width: ref(tooltipArrowSize),
        height: ref(tooltipArrowSize)
    });

    selector(['.tooltip-arrow', '.tooltip-arrow::after'], {
        borderWidth: ref(tooltipArrowSize)
    });

    selector(
        [
            '.tooltip[data-popup-placement^="top"] .tooltip-arrow::after',
            '.tooltip[data-popup-placement^="bottom"] .tooltip-arrow::after'
        ],
        {
            marginLeft: multiply(ref(tooltipArrowSize), -1)
        }
    );

    selector(
        [
            '.tooltip[data-popup-placement^="left"] .tooltip-arrow::after',
            '.tooltip[data-popup-placement^="right"] .tooltip-arrow::after'
        ],
        {
            marginTop: multiply(ref(tooltipArrowSize), -1)
        }
    );

    selector('.tooltip[data-popup-placement^="top"] .tooltip-arrow::after', {
        bottom: '1px'
    });

    selector('.tooltip[data-popup-placement^="bottom"] .tooltip-arrow::after', {
        top: '1px'
    });

    selector('.tooltip[data-popup-placement^="left"] .tooltip-arrow::after', {
        right: '1px'
    });

    selector('.tooltip[data-popup-placement^="right"] .tooltip-arrow::after', {
        left: '1px'
    });
}

export function useTooltipThemeSizeFactory(size: ComponentSize) {
    const {
        tooltipPaddingTop,
        tooltipPaddingRight,
        tooltipPaddingBottom,
        tooltipPaddingLeft,
        tooltipBorderTopLeftRadius,
        tooltipBorderTopRightRadius,
        tooltipBorderBottomRightRadius,
        tooltipBorderBottomLeftRadius,
        tooltipFontSize
    } = useTooltipThemeVariables();
    const sizeMultiplierKeyMap = useKeyMappedSizeMultiplier();
    const sizeMultiplierRef = ref(sizeMultiplierKeyMap[size]);

    const variantPaddingTop = nsvariable(
        [ns, size],
        'padding-top',
        multiply(ref(tooltipPaddingTop), sizeMultiplierRef)
    );
    const variantPaddingRight = nsvariable(
        [ns, size],
        `padding-right`,
        multiply(ref(tooltipPaddingRight), sizeMultiplierRef)
    );
    const variantPaddingBottom = nsvariable(
        [ns, size],
        `padding-bottom`,
        multiply(ref(tooltipPaddingBottom), sizeMultiplierRef)
    );
    const variantPaddingLeft = nsvariable(
        [ns, size],
        `padding-left`,
        multiply(ref(tooltipPaddingLeft), sizeMultiplierRef)
    );

    const variantBorderTopLeftRadius = nsvariable(
        [ns, size],
        'border-top-left-radius',
        multiply(ref(tooltipBorderTopLeftRadius), sizeMultiplierRef)
    );
    const variantBorderTopRightRadius = nsvariable(
        [ns, size],
        'border-top-right-radius',
        multiply(ref(tooltipBorderTopRightRadius), sizeMultiplierRef)
    );
    const variantBorderBottomRightRadius = nsvariable(
        [ns, size],
        'border-bottom-right-radius',
        multiply(ref(tooltipBorderBottomRightRadius), sizeMultiplierRef)
    );
    const variantBorderBottomLeftRadius = nsvariable(
        [ns, size],
        'border-bottom-left-radius',
        multiply(ref(tooltipBorderBottomLeftRadius), sizeMultiplierRef)
    );

    const variantFontSize = nsvariable(
        [ns, size],
        'font-size',
        multiply(ref(tooltipFontSize), sizeMultiplierRef)
    );

    selector(`.tooltip.-${size}`, {
        fontSize: ref(variantFontSize)
    });

    selector(`.tooltip.-${size} .tooltip-content`, {
        borderTopLeftRadius: ref(variantBorderTopLeftRadius),
        borderTopRightRadius: ref(variantBorderTopRightRadius),
        borderBottomRightRadius: ref(variantBorderBottomRightRadius),
        borderBottomLeftRadius: ref(variantBorderBottomLeftRadius),
        padding: [
            ref(variantPaddingTop),
            ref(variantPaddingRight),
            ref(variantPaddingBottom),
            ref(variantPaddingLeft)
        ]
    });
}

export function useTooltipThemeSizes({ sizes = defaultComponentSizes } = {}) {
    sizes.forEach(useTooltipThemeSizeFactory);
}

export function useTooltipThemeColorFactory(color: ComponentBrandColor) {
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
        ref(color === 'light' ? colors.colorWhite : colors[`color${colorKey}`])
    );
    const variantColor = nsvariable(
        [ns, color],
        `color`,
        ref(contrastTextColors[`contrastTextColor${colorKey}`])
    );

    selector(`.tooltip.-${color} .tooltip-content`, {
        borderColor: ref(variantBorderColor),
        background: ref(variantBackground),
        color: ref(variantColor)
    });

    selector(`.tooltip.-${color}[data-popup-placement^="top"] .tooltip-arrow`, {
        borderTopColor: ref(variantBorderColor)
    });

    selector(`.tooltip.-${color}[data-popup-placement^="top"] .tooltip-arrow::after`, {
        borderTopColor: ref(variantBackground)
    });

    selector(`.tooltip.-${color}[data-popup-placement^="right"] .tooltip-arrow`, {
        borderRightColor: ref(variantBorderColor)
    });

    selector(`.tooltip.-${color}[data-popup-placement^="right"] .tooltip-arrow::after`, {
        borderRightColor: ref(variantBackground)
    });

    selector(`.tooltip.-${color}[data-popup-placement^="bottom"] .tooltip-arrow`, {
        borderBottomColor: ref(variantBorderColor)
    });

    selector(`.tooltip.-${color}[data-popup-placement^="bottom"] .tooltip-arrow::after`, {
        borderBottomColor: ref(variantBackground)
    });

    selector(`.tooltip.-${color}[data-popup-placement^="left"] .tooltip-arrow`, {
        borderLeftColor: ref(variantBorderColor)
    });

    selector(`.tooltip.-${color}[data-popup-placement^="left"] .tooltip-arrow::after`, {
        borderLeftColor: ref(variantBackground)
    });
}

export function useTooltipThemeColors({ colors = defaultComponentBrandColors } = {}) {
    colors.forEach(useTooltipThemeColorFactory);
}

export function useTooltipTheme() {
    useTooltipThemeVariables();
    useTooltipThemeLayout();
    useTooltipThemeBase();
    useTooltipThemeSizes();
    useTooltipThemeColors();
}
