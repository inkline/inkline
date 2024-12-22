import {
    ref,
    selector,
    nsvariables,
    defaultDefinitionOptions,
    setExportsNamespace,
    toVariableKey
} from '@inkline/core';
import { merge } from '@inkline/utils';
import {
    useBorder,
    useBoxShadow,
    useBrandColorVariants,
    useFontSize,
    useTransition,
    useFontWeight,
    useBorderRadius,
    useSpacing
} from '@inkline/theme';

const ns = 'alert';

const defaultAlertColor = 'info';
const defaultAlertColors = ['info', 'success', 'warning', 'danger'] as const;

const defaultAlertSize = 'md';
const defaultAlertSizes = ['sm', 'md', 'lg'] as const;

type AlertColorVariant = (typeof defaultAlertColors)[number];
type AlertSizeVariant = (typeof defaultAlertSizes)[number];

export function useAlertThemeColorConfig(variant?: AlertColorVariant) {
    const {
        colorInfo100H,
        colorInfo100S,
        colorInfo100L,
        colorInfo100A,
        colorInfo800H,
        colorInfo800S,
        colorInfo800L,
        colorInfo800A,
        colorInfoShade50H,
        colorInfoShade50S,
        colorInfoShade50L,
        colorInfoShade50A,
        colorSuccess100H,
        colorSuccess100S,
        colorSuccess100L,
        colorSuccess100A,
        colorSuccess800H,
        colorSuccess800S,
        colorSuccess800L,
        colorSuccess800A,
        colorSuccessShade50H,
        colorSuccessShade50S,
        colorSuccessShade50L,
        colorSuccessShade50A,
        colorWarning100H,
        colorWarning100S,
        colorWarning100L,
        colorWarning100A,
        colorWarning800H,
        colorWarning800S,
        colorWarning800L,
        colorWarning800A,
        colorWarningShade50H,
        colorWarningShade50S,
        colorWarningShade50L,
        colorWarningShade50A,
        colorDanger100H,
        colorDanger100S,
        colorDanger100L,
        colorDanger100A,
        colorDanger800H,
        colorDanger800S,
        colorDanger800L,
        colorDanger800A,
        colorDangerShade50H,
        colorDangerShade50S,
        colorDangerShade50L,
        colorDangerShade50A
    } = useBrandColorVariants();

    return {
        info: {
            border: {
                color: {
                    h: ref(colorInfoShade50H),
                    s: ref(colorInfoShade50S),
                    l: ref(colorInfoShade50L),
                    a: ref(colorInfoShade50A)
                }
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
            }
        },
        success: {
            border: {
                color: {
                    h: ref(colorSuccessShade50H),
                    s: ref(colorSuccessShade50S),
                    l: ref(colorSuccessShade50L),
                    a: ref(colorSuccessShade50A)
                }
            },
            background: {
                h: ref(colorSuccess100H),
                s: ref(colorSuccess100S),
                l: ref(colorSuccess100L),
                a: ref(colorSuccess100A)
            },
            color: {
                h: ref(colorSuccess800H),
                s: ref(colorSuccess800S),
                l: ref(colorSuccess800L),
                a: ref(colorSuccess800A)
            }
        },
        warning: {
            border: {
                color: {
                    h: ref(colorWarningShade50H),
                    s: ref(colorWarningShade50S),
                    l: ref(colorWarningShade50L),
                    a: ref(colorWarningShade50A)
                }
            },
            background: {
                h: ref(colorWarning100H),
                s: ref(colorWarning100S),
                l: ref(colorWarning100L),
                a: ref(colorWarning100A)
            },
            color: {
                h: ref(colorWarning800H),
                s: ref(colorWarning800S),
                l: ref(colorWarning800L),
                a: ref(colorWarning800A)
            }
        },
        danger: {
            border: {
                color: {
                    h: ref(colorDangerShade50H),
                    s: ref(colorDangerShade50S),
                    l: ref(colorDangerShade50L),
                    a: ref(colorDangerShade50A)
                }
            },
            background: {
                h: ref(colorDanger100H),
                s: ref(colorDanger100S),
                l: ref(colorDanger100L),
                a: ref(colorDanger100A)
            },
            color: {
                h: ref(colorDanger800H),
                s: ref(colorDanger800S),
                l: ref(colorDanger800L),
                a: ref(colorDanger800A)
            }
        }
    }[variant ?? defaultAlertColor];
}

export function useAlertThemeSizeConfig(variant?: AlertSizeVariant) {
    const {
        borderTopLeftRadiusSm,
        borderTopRightRadiusSm,
        borderBottomRightRadiusSm,
        borderBottomLeftRadiusSm,
        borderTopLeftRadiusMd,
        borderTopRightRadiusMd,
        borderBottomRightRadiusMd,
        borderBottomLeftRadiusMd,
        borderTopLeftRadiusLg,
        borderTopRightRadiusLg,
        borderBottomRightRadiusLg,
        borderBottomLeftRadiusLg
    } = useBorderRadius();
    const { fontSizeXs, fontSizeSm, fontSizeMd } = useFontSize();
    const { spacingSm, spacingMd, spacingLg } = useSpacing();

    return {
        sm: {
            borderRadius: {
                topLeft: ref(borderTopLeftRadiusSm),
                topRight: ref(borderTopRightRadiusSm),
                bottomRight: ref(borderBottomRightRadiusSm),
                bottomLeft: ref(borderBottomLeftRadiusSm)
            },
            fontSize: ref(fontSizeXs),
            padding: {
                top: ref(spacingSm),
                right: ref(spacingSm),
                bottom: ref(spacingSm),
                left: ref(spacingSm)
            }
        },
        md: {
            borderRadius: {
                topLeft: ref(borderTopLeftRadiusMd),
                topRight: ref(borderTopRightRadiusMd),
                bottomRight: ref(borderBottomRightRadiusMd),
                bottomLeft: ref(borderBottomLeftRadiusMd)
            },
            fontSize: ref(fontSizeSm),
            padding: {
                top: ref(spacingMd),
                right: ref(spacingMd),
                bottom: ref(spacingMd),
                left: ref(spacingMd)
            }
        },
        lg: {
            borderRadius: {
                topLeft: ref(borderTopLeftRadiusLg),
                topRight: ref(borderTopRightRadiusLg),
                bottomRight: ref(borderBottomRightRadiusLg),
                bottomLeft: ref(borderBottomLeftRadiusLg)
            },
            fontSize: ref(fontSizeMd),
            padding: {
                top: ref(spacingLg),
                right: ref(spacingLg),
                bottom: ref(spacingLg),
                left: ref(spacingLg)
            }
        }
    }[variant ?? defaultAlertSize];
}

export function useAlertThemeConfig() {
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
    const {
        boxShadowOffsetX,
        boxShadowOffsetY,
        boxShadowBlurRadius,
        boxShadowSpreadRadius,
        boxShadowColor
    } = useBoxShadow();
    const { fontWeightSemibold } = useFontWeight();
    const { transitionProperty, transitionDuration, transitionTimingFunction } = useTransition();

    return merge(
        {
            border: {
                top: {
                    width: ref(borderTopWidth),
                    style: ref(borderTopStyle)
                },
                right: {
                    width: ref(borderRightWidth),
                    style: ref(borderRightStyle)
                },
                bottom: {
                    width: ref(borderBottomWidth),
                    style: ref(borderBottomStyle)
                },
                left: {
                    width: ref(borderLeftWidth),
                    style: ref(borderLeftStyle)
                }
            },
            boxShadow: {
                offsetX: ref(boxShadowOffsetX),
                offsetY: ref(boxShadowOffsetY),
                blurRadius: ref(boxShadowBlurRadius),
                spreadRadius: ref(boxShadowSpreadRadius),
                color: ref(boxShadowColor)
            },
            transition: {
                property: ref(transitionProperty),
                duration: ref(transitionDuration),
                timingFunction: ref(transitionTimingFunction)
            },
            /**
             * @element link
             */
            link: {
                fontWeight: ref(fontWeightSemibold)
            }
        },
        useAlertThemeColorConfig(),
        useAlertThemeSizeConfig()
    );
}

export function useAlertThemeVariables(options = defaultDefinitionOptions) {
    return nsvariables(ns, useAlertThemeConfig(), {
        ...options,
        registerComposed: false
    });
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

export function useAlertThemeSizeFactory(variant: AlertSizeVariant) {
    const sizeNs = [ns, variant] as const;

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

    const {
        variantBorderTopLeftRadius,
        variantBorderTopRightRadius,
        variantBorderBottomRightRadius,
        variantBorderBottomLeftRadius,
        variantFontSize,
        variantPaddingTop,
        variantPaddingRight,
        variantPaddingBottom,
        variantPaddingLeft
    } = setExportsNamespace(
        nsvariables(sizeNs, useAlertThemeSizeConfig(variant), {
            registerComposed: false
        }),
        'variant'
    );

    selector(`.alert.-${variant}`, {
        [toVariableKey(alertBorderTopLeftRadius)]: ref(variantBorderTopLeftRadius),
        [toVariableKey(alertBorderTopRightRadius)]: ref(variantBorderTopRightRadius),
        [toVariableKey(alertBorderBottomRightRadius)]: ref(variantBorderBottomRightRadius),
        [toVariableKey(alertBorderBottomLeftRadius)]: ref(variantBorderBottomLeftRadius),
        [toVariableKey(alertFontSize)]: ref(variantFontSize),
        [toVariableKey(alertPaddingTop)]: ref(variantPaddingTop),
        [toVariableKey(alertPaddingRight)]: ref(variantPaddingRight),
        [toVariableKey(alertPaddingBottom)]: ref(variantPaddingBottom),
        [toVariableKey(alertPaddingLeft)]: ref(variantPaddingLeft)
    });
}

export function useAlertThemeSizes(sizes = defaultAlertSizes) {
    sizes.forEach(useAlertThemeSizeFactory);
}

export function useAlertThemeColorFactory(variant: AlertColorVariant) {
    const colorNs = [ns, variant] as const;

    const {
        alertBackgroundH,
        alertBackgroundS,
        alertBackgroundL,
        alertBackgroundA,
        alertBorderTopColorH,
        alertBorderTopColorS,
        alertBorderTopColorL,
        alertBorderTopColorA,
        alertBorderRightColorH,
        alertBorderRightColorS,
        alertBorderRightColorL,
        alertBorderRightColorA,
        alertBorderBottomColorH,
        alertBorderBottomColorS,
        alertBorderBottomColorL,
        alertBorderBottomColorA,
        alertBorderLeftColorH,
        alertBorderLeftColorS,
        alertBorderLeftColorL,
        alertBorderLeftColorA,
        alertColorH,
        alertColorS,
        alertColorL,
        alertColorA
    } = useAlertThemeVariables();

    const {
        variantBackgroundH,
        variantBackgroundS,
        variantBackgroundL,
        variantBackgroundA,
        variantBorderTopColorH,
        variantBorderTopColorS,
        variantBorderTopColorL,
        variantBorderTopColorA,
        variantBorderRightColorH,
        variantBorderRightColorS,
        variantBorderRightColorL,
        variantBorderRightColorA,
        variantBorderBottomColorH,
        variantBorderBottomColorS,
        variantBorderBottomColorL,
        variantBorderBottomColorA,
        variantBorderLeftColorH,
        variantBorderLeftColorS,
        variantBorderLeftColorL,
        variantBorderLeftColorA,
        variantColorH,
        variantColorS,
        variantColorL,
        variantColorA
    } = setExportsNamespace(
        nsvariables(colorNs, useAlertThemeColorConfig(variant), {
            registerComposed: false
        }),
        'variant'
    );

    selector(`.alert.-${variant}`, {
        [toVariableKey(alertBorderTopColorH)]: ref(variantBorderTopColorH),
        [toVariableKey(alertBorderTopColorS)]: ref(variantBorderTopColorS),
        [toVariableKey(alertBorderTopColorL)]: ref(variantBorderTopColorL),
        [toVariableKey(alertBorderTopColorA)]: ref(variantBorderTopColorA),
        [toVariableKey(alertBorderRightColorH)]: ref(variantBorderRightColorH),
        [toVariableKey(alertBorderRightColorS)]: ref(variantBorderRightColorS),
        [toVariableKey(alertBorderRightColorL)]: ref(variantBorderRightColorL),
        [toVariableKey(alertBorderRightColorA)]: ref(variantBorderRightColorA),
        [toVariableKey(alertBorderBottomColorH)]: ref(variantBorderBottomColorH),
        [toVariableKey(alertBorderBottomColorS)]: ref(variantBorderBottomColorS),
        [toVariableKey(alertBorderBottomColorL)]: ref(variantBorderBottomColorL),
        [toVariableKey(alertBorderBottomColorA)]: ref(variantBorderBottomColorA),
        [toVariableKey(alertBorderLeftColorH)]: ref(variantBorderLeftColorH),
        [toVariableKey(alertBorderLeftColorS)]: ref(variantBorderLeftColorS),
        [toVariableKey(alertBorderLeftColorL)]: ref(variantBorderLeftColorL),
        [toVariableKey(alertBorderLeftColorA)]: ref(variantBorderLeftColorA),
        [toVariableKey(alertBackgroundH)]: ref(variantBackgroundH),
        [toVariableKey(alertBackgroundS)]: ref(variantBackgroundS),
        [toVariableKey(alertBackgroundL)]: ref(variantBackgroundL),
        [toVariableKey(alertBackgroundA)]: ref(variantBackgroundA),
        [toVariableKey(alertColorH)]: ref(variantColorH),
        [toVariableKey(alertColorS)]: ref(variantColorS),
        [toVariableKey(alertColorL)]: ref(variantColorL),
        [toVariableKey(alertColorA)]: ref(variantColorA)
    });
}

export function useAlertThemeColors(colors = defaultAlertColors) {
    colors.forEach(useAlertThemeColorFactory);
}

export function useAlertTheme() {
    useAlertThemeLayout();
    useAlertThemeBase();
    useAlertThemeSizes();
    useAlertThemeColors();
}
