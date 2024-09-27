import {
    ComponentSize,
    ComponentStateColor,
    capitalize,
    multiply,
    ref,
    selector,
    nsvariable,
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
    defaultDefinitionOptions,
    nsdefine
} from '@inkline/config';

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
    const { transitionProperty, transitionDuration, transitionTimingFunction } = useTransition();

    return nsdefine(
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
    );
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
        alertTransitionTimingFunction
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

    const variantPaddingTop = nsvariable(
        [ns, size],
        'padding-top',
        multiply(ref(alertPaddingTop), sizeMultiplierRef)
    );
    const variantPaddingRight = nsvariable(
        [ns, size],
        `padding-right`,
        multiply(ref(alertPaddingRight), sizeMultiplierRef)
    );
    const variantPaddingBottom = nsvariable(
        [ns, size],
        `padding-bottom`,
        multiply(ref(alertPaddingBottom), sizeMultiplierRef)
    );
    const variantPaddingLeft = nsvariable(
        [ns, size],
        `padding-left`,
        multiply(ref(alertPaddingLeft), sizeMultiplierRef)
    );

    const variantBorderTopLeftRadius = nsvariable(
        [ns, size],
        'border-top-left-radius',
        multiply(ref(alertBorderTopLeftRadius), sizeMultiplierRef)
    );
    const variantBorderTopRightRadius = nsvariable(
        [ns, size],
        'border-top-right-radius',
        multiply(ref(alertBorderTopRightRadius), sizeMultiplierRef)
    );
    const variantBorderBottomRightRadius = nsvariable(
        [ns, size],
        'border-bottom-right-radius',
        multiply(ref(alertBorderBottomRightRadius), sizeMultiplierRef)
    );
    const variantBorderBottomLeftRadius = nsvariable(
        [ns, size],
        'border-bottom-left-radius',
        multiply(ref(alertBorderBottomLeftRadius), sizeMultiplierRef)
    );

    const variantFontSize = nsvariable([ns, size], 'font-size', ref(alertFontSize));

    selector(`.alert.-${size}`, {
        borderRadius: [
            ref(variantBorderTopLeftRadius),
            ref(variantBorderTopRightRadius),
            ref(variantBorderBottomRightRadius),
            ref(variantBorderBottomLeftRadius)
        ],
        fontSize: ref(variantFontSize)
    });

    selector(`.alert.-${size} .alert-content`, {
        padding: [
            ref(variantPaddingTop),
            ref(variantPaddingRight),
            ref(variantPaddingBottom),
            ref(variantPaddingLeft)
        ]
    });

    selector(`.alert.-${size} .alert-icon`, {
        marginLeft: ref(variantPaddingLeft)
    });

    selector(`.alert.-${size} .alert-dismiss`, {
        marginRight: ref(variantPaddingRight)
    });
}

export function useAlertThemeSizes({ sizes = defaultComponentSizes } = {}) {
    sizes.forEach(useAlertThemeSizeFactory);
}

export function useAlertThemeColorFactory(color: ComponentStateColor) {
    const colorKey = capitalize(color);
    const brandColorVariants = useBrandColorVariants();

    const variantBorderColor = nsvariable(
        [ns, color],
        `border-color`,
        ref(brandColorVariants[`color${colorKey}Shade50`])
    );
    const variantBackground = nsvariable(
        [ns, color],
        `background`,
        ref(brandColorVariants[`color${colorKey}100`])
    );
    const variantColor = nsvariable(
        [ns, color],
        `color`,
        ref(brandColorVariants[`color${colorKey}800`])
    );

    selector(`.alert.-${color}`, {
        borderColor: ref(variantBorderColor),
        background: ref(variantBackground),
        color: ref(variantColor)
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
