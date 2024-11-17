import {
    multiply,
    ref,
    selector,
    nsvariables,
    defaultDefinitionOptions,
    stripExportsNamespace
} from '@inkline/core';
import { capitalize } from '@inkline/utils';
import {
    ComponentSize,
    ComponentStateColor,
    useBorder,
    useBorderRadiusBase,
    useBoxShadow,
    useBrandColorVariants,
    useFontSize,
    useKeyMappedSizeMultiplier,
    usePaddingBase,
    useTransition,
    defaultComponentSizes,
    defaultComponentStateColors,
    useFontWeight
} from '@inkline/theme';

const ns = 'alert';

export function useAlertThemeVariables(options = defaultDefinitionOptions) {
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
    const { colorInfoShade50 } = useBrandColorVariants();
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
    const {
        colorInfo100H,
        colorInfo100S,
        colorInfo100L,
        colorInfo100A,
        colorInfo800H,
        colorInfo800S,
        colorInfo800L,
        colorInfo800A
    } = useBrandColorVariants();
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
                        color: ref(colorInfoShade50)
                    },
                    right: {
                        width: ref(borderRightWidth),
                        style: ref(borderRightStyle),
                        color: ref(colorInfoShade50)
                    },
                    bottom: {
                        width: ref(borderBottomWidth),
                        style: ref(borderBottomStyle),
                        color: ref(colorInfoShade50)
                    },
                    left: {
                        width: ref(borderLeftWidth),
                        style: ref(borderLeftStyle),
                        color: ref(colorInfoShade50)
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
                    h: ref(colorInfo100H),
                    s: ref(colorInfo100S),
                    l: ref(colorInfo100L),
                    a: ref(colorInfo100A)
                },
                color: {
                    h: ref(colorInfo800H),
                    s: ref(colorInfo800S),
                    l: ref(colorInfo800L),
                    a: ref(colorInfo800A)
                },
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
        ...nsvariables([ns, 'link'] as const, {
            fontWeight: ref(fontWeightSemibold)
        })
    };
}

export function useAlertThemeLayout() {
    selector('.alert', {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    });

    selector('.alert-content', {
        flex: '0 1 100%'
    });

    selector('.alert-icon', {
        flex: 1,
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    });

    selector('.alert-dismiss', {
        flex: '0 0 auto',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
    });
}

export function useAlertThemeBase() {
    const {
        alertBorderStyle,
        alertBorderColor,
        alertBorderWidth,
        alertPaddingRight,
        alertPaddingLeft,
        alertPadding,
        alertBorderRadius,
        alertBoxShadow,
        alertBackground,
        alertColor,
        alertFontSize,
        alertTransitionProperty,
        alertTransitionDuration,
        alertTransitionTimingFunction,
        alertLinkFontWeight
    } = useAlertThemeVariables();

    selector('.alert', {
        borderStyle: ref(alertBorderStyle),
        borderColor: ref(alertBorderColor),
        borderWidth: ref(alertBorderWidth),
        borderRadius: ref(alertBorderRadius),
        boxShadow: ref(alertBoxShadow),
        background: ref(alertBackground),
        color: ref(alertColor),
        fontSize: ref(alertFontSize),
        transitionProperty: ref(alertTransitionProperty),
        transitionDuration: ref(alertTransitionDuration),
        transitionTimingFunction: ref(alertTransitionTimingFunction)
    });

    selector('.alert-content', {
        padding: ref(alertPadding)
    });

    selector('.alert-content *:first-child', {
        marginTop: 0
    });

    selector('.alert-content *:last-child', {
        marginBottom: 0
    });

    selector('.alert-icon', {
        marginLeft: ref(alertPaddingLeft)
    });

    selector('.alert-dismiss', {
        marginRight: ref(alertPaddingRight)
    });

    selector('.alert code', {
        background: 'hsla(0, 0%, 0%, 0.05)'
    });

    selector('.alert a', {
        fontWeight: ref(alertLinkFontWeight)
    });
}

export function useAlertThemeSizeFactory(size: ComponentSize) {
    const {
        alertPaddingTop,
        alertPaddingRight,
        alertPaddingBottom,
        alertPaddingLeft,
        alertBorderTopLeftRadius,
        alertBorderTopRightRadius,
        alertBorderBottomRightRadius,
        alertBorderBottomLeftRadius,
        alertFontSize
    } = useAlertThemeVariables();
    const sizeMultiplierKeyMap = useKeyMappedSizeMultiplier();
    const sizeMultiplierRef = ref(sizeMultiplierKeyMap[size]);
    const sizeNs = [ns, size] as const;

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
                topLeft: multiply(ref(alertBorderTopLeftRadius), sizeMultiplierRef),
                topRight: multiply(ref(alertBorderTopRightRadius), sizeMultiplierRef),
                bottomRight: multiply(ref(alertBorderBottomRightRadius), sizeMultiplierRef),
                bottomLeft: multiply(ref(alertBorderBottomLeftRadius), sizeMultiplierRef)
            },
            fontSize: multiply(ref(alertFontSize), sizeMultiplierRef),
            padding: {
                top: multiply(ref(alertPaddingTop), sizeMultiplierRef),
                right: multiply(ref(alertPaddingRight), sizeMultiplierRef),
                bottom: multiply(ref(alertPaddingBottom), sizeMultiplierRef),
                left: multiply(ref(alertPaddingLeft), sizeMultiplierRef)
            }
        })
    );

    selector(`.alert.-${size}`, {
        borderRadius: [
            ref(borderTopLeftRadius),
            ref(borderTopRightRadius),
            ref(borderBottomRightRadius),
            ref(borderBottomLeftRadius)
        ],
        fontSize: ref(fontSize)
    });

    selector(`.alert.-${size} .alert-content`, {
        padding: [ref(paddingTop), ref(paddingRight), ref(paddingBottom), ref(paddingLeft)]
    });

    selector(`.alert.-${size} .alert-icon`, {
        marginLeft: ref(paddingLeft)
    });

    selector(`.alert.-${size} .alert-dismiss`, {
        marginRight: ref(paddingRight)
    });
}

export function useAlertThemeSizes({ sizes = defaultComponentSizes } = {}) {
    sizes.forEach(useAlertThemeSizeFactory);
}

export function useAlertThemeColorFactory(variant: ComponentStateColor) {
    const colorKey = capitalize(variant);
    const brandColorVariants = useBrandColorVariants();
    const colorNs = [ns, variant] as const;

    const { borderColor, background, color } = stripExportsNamespace(
        nsvariables(colorNs, {
            borderColor: ref(brandColorVariants[`color${colorKey}Shade50`]),
            background: ref(brandColorVariants[`color${colorKey}100`]),
            color: ref(brandColorVariants[`color${colorKey}800`])
        })
    );

    selector(`.alert.-${variant}`, {
        borderColor: ref(borderColor),
        background: ref(background),
        color: ref(color)
    });

    selector(`.alert.-${variant} a`, {
        color: ref(color)
    });
}

export function useAlertThemeColors({ colors = defaultComponentStateColors } = {}) {
    colors.forEach(useAlertThemeColorFactory);
}

export function useAlertTheme() {
    useAlertThemeLayout();
    useAlertThemeBase();
    useAlertThemeSizes();
    useAlertThemeColors();
}
