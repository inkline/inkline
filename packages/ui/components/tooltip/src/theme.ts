import {
    multiply,
    ref,
    selector,
    defaultDefinitionOptions,
    nsvariables,
    stripExportsNamespace,
    DefinitionOptions
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
    useColors,
    useContrastTextColor,
    useNeutralColors,
    useSpacing
} from '@inkline/theme';

const ns = 'tooltip';

const defaultTooltipColor = 'light';
const defaultTooltipColors = [
    'light',
    'dark',
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info'
] as const;

const defaultTooltipSize = 'md';
const defaultTooltipSizes = ['sm', 'md', 'lg'] as const;

type TooltipColorVariant = (typeof defaultTooltipColors)[number];
type TooltipSizeVariant = (typeof defaultTooltipSizes)[number];

export function useTooltipThemeVariables(userOptions: DefinitionOptions) {
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
    const { colorLightShade50 } = useBrandColorVariants(options);
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
    const { colorWhiteH, colorWhiteS, colorWhiteL, colorWhiteA } = useNeutralColors(options);
    const { contrastTextColorLight } = useContrastTextColor(options);
    const { fontSize } = useFontSize(options);
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
                    top: multiply(ref(spacing), 3 / 4),
                    right: ref(spacing),
                    bottom: multiply(ref(spacing), 3 / 4),
                    left: ref(spacing)
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
        ...nsvariables(
            [ns, 'arrow'] as const,
            {
                size: '6px'
            },
            options
        )
    };
}

export function useTooltipThemeLayout(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { tooltipZIndex } = useTooltipThemeVariables(options);

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

export function useTooltipThemeBase(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

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
    } = useTooltipThemeVariables(options);

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

export function useTooltipThemeSizeSelectors(variant: TooltipSizeVariant) {
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
    } = useTooltipThemeVariables(options);
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
                top: multiply(ref(tooltipPaddingTop), sizeMultiplierRef),
                right: multiply(ref(tooltipPaddingRight), sizeMultiplierRef),
                bottom: multiply(ref(tooltipPaddingBottom), sizeMultiplierRef),
                left: multiply(ref(tooltipPaddingLeft), sizeMultiplierRef)
            },
            borderRadius: {
                topLeft: multiply(ref(tooltipBorderTopLeftRadius), sizeMultiplierRef),
                topRight: multiply(ref(tooltipBorderTopRightRadius), sizeMultiplierRef),
                bottomRight: multiply(ref(tooltipBorderBottomRightRadius), sizeMultiplierRef),
                bottomLeft: multiply(ref(tooltipBorderBottomLeftRadius), sizeMultiplierRef)
            },
            fontSize: multiply(ref(tooltipFontSize), sizeMultiplierRef)
        })
    );

    selector(`.tooltip.-${variant}`, {
        fontSize: ref(fontSize)
    });

    selector(`.tooltip.-${variant} .tooltip-content`, {
        borderTopLeftRadius: ref(borderTopLeftRadius),
        borderTopRightRadius: ref(borderTopRightRadius),
        borderBottomRightRadius: ref(borderBottomRightRadius),
        borderBottomLeftRadius: ref(borderBottomLeftRadius),
        padding: [ref(paddingTop), ref(paddingRight), ref(paddingBottom), ref(paddingLeft)]
    });
}

export function useTooltipThemeSizes(sizes = defaultTooltipSizes) {
    sizes.forEach((size) => useTooltipThemeSizeSelectors(size, options));
}

export function useTooltipThemeColorSelectors(variant: TooltipColorVariant) {
    const colorKey = capitalize(variant);
    const shadeOrTint = variant === 'dark' ? 'Tint' : 'Shade';
    const colorNs = [ns, variant] as const;

    const colors = useColors(options);
    const contrastTextColors = useContrastTextColor(options);

    const { borderColor, background, color } = stripExportsNamespace(
        nsvariables(colorNs, {
            borderColor: ref(colors[`color${colorKey}${shadeOrTint}50`]),
            background: ref(variant === 'light' ? colors.colorWhite : colors[`color${colorKey}`]),
            color: ref(contrastTextColors[`contrastTextColor${colorKey}`])
        })
    );

    selector(`.tooltip.-${variant} .tooltip-content`, {
        borderColor: ref(borderColor),
        background: ref(background),
        color: ref(color)
    });

    selector(`.tooltip.-${variant}[data-popup-placement^="top"] .tooltip-arrow`, {
        borderTopColor: ref(borderColor)
    });

    selector(`.tooltip.-${variant}[data-popup-placement^="top"] .tooltip-arrow::after`, {
        borderTopColor: ref(background)
    });

    selector(`.tooltip.-${variant}[data-popup-placement^="right"] .tooltip-arrow`, {
        borderRightColor: ref(borderColor)
    });

    selector(`.tooltip.-${variant}[data-popup-placement^="right"] .tooltip-arrow::after`, {
        borderRightColor: ref(background)
    });

    selector(`.tooltip.-${variant}[data-popup-placement^="bottom"] .tooltip-arrow`, {
        borderBottomColor: ref(borderColor)
    });

    selector(`.tooltip.-${variant}[data-popup-placement^="bottom"] .tooltip-arrow::after`, {
        borderBottomColor: ref(background)
    });

    selector(`.tooltip.-${variant}[data-popup-placement^="left"] .tooltip-arrow`, {
        borderLeftColor: ref(borderColor)
    });

    selector(`.tooltip.-${variant}[data-popup-placement^="left"] .tooltip-arrow::after`, {
        borderLeftColor: ref(background)
    });
}

export function useTooltipThemeColors(colors = defaultTooltipColors) {
    colors.forEach((color) => useTooltipThemeColorSelectors(color, options));
}

export function useTooltipTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useTooltipThemeVariables(options);
    useTooltipThemeLayout(options);
    useTooltipThemeBase(options);
    useTooltipThemeSizes(options);
    useTooltipThemeColors(options);
}
