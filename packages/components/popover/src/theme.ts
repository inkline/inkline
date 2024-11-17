import {
    multiply,
    ref,
    selector,
    defaultDefinitionOptions,
    nsvariables,
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

const ns = 'popover';

export function usePopoverThemeVariables(options = defaultDefinitionOptions) {
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
                width: '280px',
                maxWidth: '90vw',
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

export function usePopoverThemeLayout() {
    const { popoverZIndex, popoverWidth, popoverMaxWidth } = usePopoverThemeVariables();

    selector('.popover', {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        wordWrap: 'break-word',
        backgroundClip: 'border-box',
        width: ref(popoverWidth),
        maxWidth: ref(popoverMaxWidth),
        zIndex: ref(popoverZIndex)
    });

    selector('.popover-trigger', {
        display: 'inline-flex'
    });

    selector('.popover[data-popup-placement^="top"]', {
        transformOrigin: 'center bottom'
    });

    selector('.popover[data-popup-placement^="right"]', {
        transformOrigin: 'left center'
    });

    selector('.popover[data-popup-placement^="bottom"]', {
        transformOrigin: 'center top'
    });

    selector('.popover[data-popup-placement^="left"]', {
        transformOrigin: 'right center'
    });

    selector('.popover-arrow', {
        position: 'absolute'
    });

    selector(['.popover-arrow', '.popover-arrow::after'], {
        display: 'block',
        width: 0,
        height: 0,
        borderColor: 'transparent',
        borderStyle: 'solid',
        position: 'absolute',
        boxSizing: 'border-box'
    });

    selector('.popover-arrow::after', {
        content: '""'
    });

    selector(
        [
            '.popover[data-popup-placement^="top"] .popover-arrow',
            '.popover[data-popup-placement^="top"] .popover-arrow::after'
        ],
        {
            borderBottomWidth: 0
        }
    );

    selector(
        [
            '.popover[data-popup-placement^="bottom"] .popover-arrow',
            '.popover[data-popup-placement^="bottom"] .popover-arrow::after'
        ],
        {
            borderTopWidth: 0
        }
    );

    selector(
        [
            '.popover[data-popup-placement^="right"] .popover-arrow',
            '.popover[data-popup-placement^="right"] .popover-arrow::after'
        ],
        {
            borderLeftWidth: 0
        }
    );

    selector(
        [
            '.popover[data-popup-placement^="left"] .popover-arrow',
            '.popover[data-popup-placement^="left"] .popover-arrow::after'
        ],
        {
            borderRightWidth: 0
        }
    );
}

export function usePopoverThemeBase() {
    const {
        popoverBorderStyle,
        popoverBorderColor,
        popoverBorderWidth,
        popoverPadding,
        popoverBorderTopLeftRadius,
        popoverBorderTopRightRadius,
        popoverBorderBottomLeftRadius,
        popoverBorderBottomRightRadius,
        popoverBoxShadow,
        popoverBackground,
        popoverColor,
        popoverFontSize,
        popoverTransitionProperty,
        popoverTransitionDuration,
        popoverTransitionTimingFunction,
        popoverArrowSize
    } = usePopoverThemeVariables();

    selector('.popover', {
        boxShadow: ref(popoverBoxShadow),
        color: ref(popoverColor),
        fontSize: ref(popoverFontSize)
    });

    selector(['.popover-header', '.popover-body', '.popover-footer'], {
        background: ref(popoverBackground),
        borderStyle: ref(popoverBorderStyle),
        borderColor: ref(popoverBorderColor),
        borderWidth: ref(popoverBorderWidth),
        padding: ref(popoverPadding),
        transitionProperty: ref(popoverTransitionProperty),
        transitionDuration: ref(popoverTransitionDuration),
        transitionTimingFunction: ref(popoverTransitionTimingFunction)
    });

    selector('.popover-header + .popover-body', {
        borderTop: 0
    });

    selector('.popover-body:has(+ .popover-footer)', {
        borderBottom: 0
    });

    selector(['.popover > *:first-child:not(.popover-arrow)', '.popover > .popover-arrow + *'], {
        borderTopLeftRadius: ref(popoverBorderTopLeftRadius),
        borderTopRightRadius: ref(popoverBorderTopRightRadius)
    });

    selector('.popover > *:last-child', {
        borderBottomRightRadius: ref(popoverBorderBottomRightRadius),
        borderBottomLeftRadius: ref(popoverBorderBottomLeftRadius)
    });

    selector(['.popover-arrow', '.popover-arrow::after'], {
        width: ref(popoverArrowSize),
        height: ref(popoverArrowSize)
    });

    selector(['.popover-arrow', '.popover-arrow::after'], {
        borderWidth: ref(popoverArrowSize)
    });

    selector(
        [
            '.popover[data-popup-placement^="top"] .popover-arrow::after',
            '.popover[data-popup-placement^="bottom"] .popover-arrow::after'
        ],
        {
            marginLeft: multiply(ref(popoverArrowSize), -1)
        }
    );

    selector(
        [
            '.popover[data-popup-placement^="left"] .popover-arrow::after',
            '.popover[data-popup-placement^="right"] .popover-arrow::after'
        ],
        {
            marginTop: multiply(ref(popoverArrowSize), -1)
        }
    );

    selector('.popover[data-popup-placement^="top"] .popover-arrow::after', {
        bottom: '1px'
    });

    selector('.popover[data-popup-placement^="bottom"] .popover-arrow::after', {
        top: '1px'
    });

    selector('.popover[data-popup-placement^="left"] .popover-arrow::after', {
        right: '1px'
    });

    selector('.popover[data-popup-placement^="right"] .popover-arrow::after', {
        left: '1px'
    });
}

export function usePopoverThemeSizeFactory(variant: ComponentSize) {
    const {
        popoverPaddingTop,
        popoverPaddingRight,
        popoverPaddingBottom,
        popoverPaddingLeft,
        popoverBorderTopLeftRadius,
        popoverBorderTopRightRadius,
        popoverBorderBottomRightRadius,
        popoverBorderBottomLeftRadius,
        popoverFontSize
    } = usePopoverThemeVariables();
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
                top: multiply(ref(popoverPaddingTop), sizeMultiplierRef),
                right: multiply(ref(popoverPaddingRight), sizeMultiplierRef),
                bottom: multiply(ref(popoverPaddingBottom), sizeMultiplierRef),
                left: multiply(ref(popoverPaddingLeft), sizeMultiplierRef)
            },
            borderRadius: {
                topLeft: multiply(ref(popoverBorderTopLeftRadius), sizeMultiplierRef),
                topRight: multiply(ref(popoverBorderTopRightRadius), sizeMultiplierRef),
                bottomRight: multiply(ref(popoverBorderBottomRightRadius), sizeMultiplierRef),
                bottomLeft: multiply(ref(popoverBorderBottomLeftRadius), sizeMultiplierRef)
            },
            fontSize: multiply(ref(popoverFontSize), sizeMultiplierRef)
        })
    );

    selector(`.popover.-${variant}`, {
        fontSize: ref(fontSize)
    });

    selector(
        [
            `.popover.-${variant} .popover-header`,
            `.popover.-${variant} .popover-body`,
            `.popover.-${variant} .popover-footer`
        ],
        {
            fontSize: ref(fontSize),
            padding: [ref(paddingTop), ref(paddingRight), ref(paddingBottom), ref(paddingLeft)]
        }
    );

    selector(
        [
            `.popover.-${variant} > *:first-child:not(.popover-arrow)`,
            `.popover.-${variant} > .popover-arrow + *`
        ],
        {
            borderTopLeftRadius: ref(borderTopLeftRadius),
            borderTopRightRadius: ref(borderTopRightRadius)
        }
    );

    selector([`.popover.-${variant} > *:last-child`], {
        borderBottomRightRadius: ref(borderBottomRightRadius),
        borderBottomLeftRadius: ref(borderBottomLeftRadius)
    });
}

export function usePopoverThemeSizes({ sizes = defaultComponentSizes } = {}) {
    sizes.forEach(usePopoverThemeSizeFactory);
}

export function usePopoverThemeColorFactory(variant: ComponentBrandColor) {
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
            `.popover.-${variant} .popover-header`,
            `.popover.-${variant} .popover-body`,
            `.popover.-${variant} .popover-footer`
        ],
        {
            borderColor: ref(borderColor),
            background: ref(background),
            color: ref(color)
        }
    );

    selector(`.popover.-${variant}[data-popup-placement^="top"] .popover-arrow`, {
        borderTopColor: ref(borderColor)
    });

    selector(`.popover.-${variant}[data-popup-placement^="top"] .popover-arrow::after`, {
        borderTopColor: ref(background)
    });

    selector(`.popover.-${variant}[data-popup-placement^="right"] .popover-arrow`, {
        borderRightColor: ref(borderColor)
    });

    selector(`.popover.-${variant}[data-popup-placement^="right"] .popover-arrow::after`, {
        borderRightColor: ref(background)
    });

    selector(`.popover.-${variant}[data-popup-placement^="bottom"] .popover-arrow`, {
        borderBottomColor: ref(borderColor)
    });

    selector(`.popover.-${variant}[data-popup-placement^="bottom"] .popover-arrow::after`, {
        borderBottomColor: ref(background)
    });

    selector(`.popover.-${variant}[data-popup-placement^="left"] .popover-arrow`, {
        borderLeftColor: ref(borderColor)
    });

    selector(`.popover.-${variant}[data-popup-placement^="left"] .popover-arrow::after`, {
        borderLeftColor: ref(background)
    });
}

export function usePopoverThemeColors({ colors = defaultComponentBrandColors } = {}) {
    colors.forEach(usePopoverThemeColorFactory);
}

export function usePopoverTheme() {
    usePopoverThemeVariables();
    usePopoverThemeLayout();
    usePopoverThemeBase();
    usePopoverThemeSizes();
    usePopoverThemeColors();
}
