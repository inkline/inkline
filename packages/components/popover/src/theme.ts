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
                width: '280px',
                maxWidth: '90vw',
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

export function usePopoverThemeSizeFactory(size: ComponentSize) {
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
    const sizeMultiplierRef = ref(sizeMultiplierKeyMap[size]);

    const variantPaddingTop = nsvariable(
        [ns, size],
        'padding-top',
        multiply(ref(popoverPaddingTop), sizeMultiplierRef)
    );
    const variantPaddingRight = nsvariable(
        [ns, size],
        `padding-right`,
        multiply(ref(popoverPaddingRight), sizeMultiplierRef)
    );
    const variantPaddingBottom = nsvariable(
        [ns, size],
        `padding-bottom`,
        multiply(ref(popoverPaddingBottom), sizeMultiplierRef)
    );
    const variantPaddingLeft = nsvariable(
        [ns, size],
        `padding-left`,
        multiply(ref(popoverPaddingLeft), sizeMultiplierRef)
    );

    const variantBorderTopLeftRadius = nsvariable(
        [ns, size],
        'border-top-left-radius',
        multiply(ref(popoverBorderTopLeftRadius), sizeMultiplierRef)
    );
    const variantBorderTopRightRadius = nsvariable(
        [ns, size],
        'border-top-right-radius',
        multiply(ref(popoverBorderTopRightRadius), sizeMultiplierRef)
    );
    const variantBorderBottomRightRadius = nsvariable(
        [ns, size],
        'border-bottom-right-radius',
        multiply(ref(popoverBorderBottomRightRadius), sizeMultiplierRef)
    );
    const variantBorderBottomLeftRadius = nsvariable(
        [ns, size],
        'border-bottom-left-radius',
        multiply(ref(popoverBorderBottomLeftRadius), sizeMultiplierRef)
    );

    const variantFontSize = nsvariable(
        [ns, size],
        'font-size',
        multiply(ref(popoverFontSize), sizeMultiplierRef)
    );

    selector(`.popover.-${size}`, {
        fontSize: ref(variantFontSize)
    });

    selector(
        [
            `.popover.-${size} .popover-header`,
            `.popover.-${size} .popover-body`,
            `.popover.-${size} .popover-footer`
        ],
        {
            fontSize: ref(variantFontSize),
            padding: [
                ref(variantPaddingTop),
                ref(variantPaddingRight),
                ref(variantPaddingBottom),
                ref(variantPaddingLeft)
            ]
        }
    );

    selector(
        [
            `.popover.-${size} > *:first-child:not(.popover-arrow)`,
            `.popover.-${size} > .popover-arrow + *`
        ],
        {
            borderTopLeftRadius: ref(variantBorderTopLeftRadius),
            borderTopRightRadius: ref(variantBorderTopRightRadius)
        }
    );

    selector([`.popover.-${size} > *:last-child`], {
        borderBottomRightRadius: ref(variantBorderBottomRightRadius),
        borderBottomLeftRadius: ref(variantBorderBottomLeftRadius)
    });
}

export function usePopoverThemeSizes({ sizes = defaultComponentSizes } = {}) {
    sizes.forEach(usePopoverThemeSizeFactory);
}

export function usePopoverThemeColorFactory(color: ComponentBrandColor) {
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

    selector(
        [
            `.popover.-${color} .popover-header`,
            `.popover.-${color} .popover-body`,
            `.popover.-${color} .popover-footer`
        ],
        {
            borderColor: ref(variantBorderColor),
            background: ref(variantBackground),
            color: ref(variantColor)
        }
    );

    selector(`.popover.-${color}[data-popup-placement^="top"] .popover-arrow`, {
        borderTopColor: ref(variantBorderColor)
    });

    selector(`.popover.-${color}[data-popup-placement^="top"] .popover-arrow::after`, {
        borderTopColor: ref(variantBackground)
    });

    selector(`.popover.-${color}[data-popup-placement^="right"] .popover-arrow`, {
        borderRightColor: ref(variantBorderColor)
    });

    selector(`.popover.-${color}[data-popup-placement^="right"] .popover-arrow::after`, {
        borderRightColor: ref(variantBackground)
    });

    selector(`.popover.-${color}[data-popup-placement^="bottom"] .popover-arrow`, {
        borderBottomColor: ref(variantBorderColor)
    });

    selector(`.popover.-${color}[data-popup-placement^="bottom"] .popover-arrow::after`, {
        borderBottomColor: ref(variantBackground)
    });

    selector(`.popover.-${color}[data-popup-placement^="left"] .popover-arrow`, {
        borderLeftColor: ref(variantBorderColor)
    });

    selector(`.popover.-${color}[data-popup-placement^="left"] .popover-arrow::after`, {
        borderLeftColor: ref(variantBackground)
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
