import {
    useBorder,
    useBorderRadiusBase,
    useBoxShadow,
    useFontSize,
    useKeyMappedSizeMultiplier,
    usePaddingBase,
    useTransition,
    useColors,
    useContrastTextColor,
    useFontWeight
} from '@inkline/theme';
import {
    defaultDefinitionOptions,
    multiply,
    ref,
    selector,
    nsvariables,
    stripExportsNamespace,
    vref,
    toVariableKey,
    setExportsNamespace
} from '@inkline/core';
import { merge } from '@inkline/utils';

const ns = 'badge';

const defaultBadgeColor = 'light';
const defaultBadgeColors = [
    'light',
    'dark',
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info'
] as const;

const defaultBadgeSize = 'md';
const defaultBadgeSizes = ['sm', 'md', 'lg'] as const;

type BadgeColorVariant = (typeof defaultBadgeColors)[number];
type BadgeSizeVariant = (typeof defaultBadgeSizes)[number];

export function useBadgeThemeColorConfig(variant?: BadgeColorVariant) {
    const {
        colorLightShade50H,
        colorLightShade50S,
        colorLightShade50L,
        colorLightShade50A,
        colorLightH,
        colorLightS,
        colorLightL,
        colorLightA,
        colorDarkTint50H,
        colorDarkTint50S,
        colorDarkTint50L,
        colorDarkTint50A,
        colorDarkH,
        colorDarkS,
        colorDarkL,
        colorDarkA,
        colorPrimaryShade50H,
        colorPrimaryShade50S,
        colorPrimaryShade50L,
        colorPrimaryShade50A,
        colorPrimaryH,
        colorPrimaryS,
        colorPrimaryL,
        colorPrimaryA,
        colorSecondaryShade50H,
        colorSecondaryShade50S,
        colorSecondaryShade50L,
        colorSecondaryShade50A,
        colorSecondaryH,
        colorSecondaryS,
        colorSecondaryL,
        colorSecondaryA,
        colorSuccessShade50H,
        colorSuccessShade50S,
        colorSuccessShade50L,
        colorSuccessShade50A,
        colorSuccessH,
        colorSuccessS,
        colorSuccessL,
        colorSuccessA,
        colorDangerShade50H,
        colorDangerShade50S,
        colorDangerShade50L,
        colorDangerShade50A,
        colorDangerH,
        colorDangerS,
        colorDangerL,
        colorDangerA,
        colorWarningShade50H,
        colorWarningShade50S,
        colorWarningShade50L,
        colorWarningShade50A,
        colorWarningH,
        colorWarningS,
        colorWarningL,
        colorWarningA,
        colorInfoShade50H,
        colorInfoShade50S,
        colorInfoShade50L,
        colorInfoShade50A,
        colorInfoH,
        colorInfoS,
        colorInfoL,
        colorInfoA
    } = useColors();
    const {
        contrastTextColorLightH,
        contrastTextColorLightS,
        contrastTextColorLightL,
        contrastTextColorLightA,
        contrastTextColorDarkH,
        contrastTextColorDarkS,
        contrastTextColorDarkL,
        contrastTextColorDarkA,
        contrastTextColorPrimaryH,
        contrastTextColorPrimaryS,
        contrastTextColorPrimaryL,
        contrastTextColorPrimaryA,
        contrastTextColorSecondaryH,
        contrastTextColorSecondaryS,
        contrastTextColorSecondaryL,
        contrastTextColorSecondaryA,
        contrastTextColorSuccessH,
        contrastTextColorSuccessS,
        contrastTextColorSuccessL,
        contrastTextColorSuccessA,
        contrastTextColorDangerH,
        contrastTextColorDangerS,
        contrastTextColorDangerL,
        contrastTextColorDangerA,
        contrastTextColorWarningH,
        contrastTextColorWarningS,
        contrastTextColorWarningL,
        contrastTextColorWarningA,
        contrastTextColorInfoH,
        contrastTextColorInfoS,
        contrastTextColorInfoL,
        contrastTextColorInfoA
    } = useContrastTextColor();

    return {
        light: {
            border: {
                color: {
                    h: ref(colorLightShade50H),
                    s: ref(colorLightShade50S),
                    l: ref(colorLightShade50L),
                    a: ref(colorLightShade50A)
                }
            },
            background: {
                h: ref(colorLightH),
                s: ref(colorLightS),
                l: ref(colorLightL),
                a: ref(colorLightA)
            },
            color: {
                h: ref(contrastTextColorLightH),
                s: ref(contrastTextColorLightS),
                l: ref(contrastTextColorLightL),
                a: ref(contrastTextColorLightA)
            }
        },
        dark: {
            border: {
                color: {
                    h: ref(colorDarkTint50H),
                    s: ref(colorDarkTint50S),
                    l: ref(colorDarkTint50L),
                    a: ref(colorDarkTint50A)
                }
            },
            background: {
                h: ref(colorDarkH),
                s: ref(colorDarkS),
                l: ref(colorDarkL),
                a: ref(colorDarkA)
            },
            color: {
                h: ref(contrastTextColorDarkH),
                s: ref(contrastTextColorDarkS),
                l: ref(contrastTextColorDarkL),
                a: ref(contrastTextColorDarkA)
            }
        },
        primary: {
            border: {
                color: {
                    h: ref(colorPrimaryShade50H),
                    s: ref(colorPrimaryShade50S),
                    l: ref(colorPrimaryShade50L),
                    a: ref(colorPrimaryShade50A)
                }
            },
            background: {
                h: ref(colorPrimaryH),
                s: ref(colorPrimaryS),
                l: ref(colorPrimaryL),
                a: ref(colorPrimaryA)
            },
            color: {
                h: ref(contrastTextColorPrimaryH),
                s: ref(contrastTextColorPrimaryS),
                l: ref(contrastTextColorPrimaryL),
                a: ref(contrastTextColorPrimaryA)
            }
        },
        secondary: {
            border: {
                color: {
                    h: ref(colorSecondaryShade50H),
                    s: ref(colorSecondaryShade50S),
                    l: ref(colorSecondaryShade50L),
                    a: ref(colorSecondaryShade50A)
                }
            },
            background: {
                h: ref(colorSecondaryH),
                s: ref(colorSecondaryS),
                l: ref(colorSecondaryL),
                a: ref(colorSecondaryA)
            },
            color: {
                h: ref(contrastTextColorSecondaryH),
                s: ref(contrastTextColorSecondaryS),
                l: ref(contrastTextColorSecondaryL),
                a: ref(contrastTextColorSecondaryA)
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
                h: ref(colorSuccessH),
                s: ref(colorSuccessS),
                l: ref(colorSuccessL),
                a: ref(colorSuccessA)
            },
            color: {
                h: ref(contrastTextColorSuccessH),
                s: ref(contrastTextColorSuccessS),
                l: ref(contrastTextColorSuccessL),
                a: ref(contrastTextColorSuccessA)
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
                h: ref(colorDangerH),
                s: ref(colorDangerS),
                l: ref(colorDangerL),
                a: ref(colorDangerA)
            },
            color: {
                h: ref(contrastTextColorDangerH),
                s: ref(contrastTextColorDangerS),
                l: ref(contrastTextColorDangerL),
                a: ref(contrastTextColorDangerA)
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
                h: ref(colorWarningH),
                s: ref(colorWarningS),
                l: ref(colorWarningL),
                a: ref(colorWarningA)
            },
            color: {
                h: ref(contrastTextColorWarningH),
                s: ref(contrastTextColorWarningS),
                l: ref(contrastTextColorWarningL),
                a: ref(contrastTextColorWarningA)
            }
        },
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
                h: ref(colorInfoH),
                s: ref(colorInfoS),
                l: ref(colorInfoL),
                a: ref(colorInfoA)
            },
            color: {
                h: ref(contrastTextColorInfoH),
                s: ref(contrastTextColorInfoS),
                l: ref(contrastTextColorInfoL),
                a: ref(contrastTextColorInfoA)
            }
        }
    }[variant ?? defaultBadgeColor];
}

export function useBadgeThemeSizeConfig(variant?: BadgeSizeVariant) {
    const sizeMultipliers = useKeyMappedSizeMultiplier();
    const {
        borderTopLeftRadius,
        borderTopRightRadius,
        borderBottomRightRadius,
        borderBottomLeftRadius
    } = useBorderRadiusBase();
    const { fontSizeXs, fontSizeSm, fontSizeMd } = useFontSize();
    const { paddingTop, paddingRight, paddingBottom, paddingLeft } = usePaddingBase();

    return {
        sm: {
            borderRadius: {
                topLeft: multiply(ref(borderTopLeftRadius), ref(sizeMultipliers.sm)),
                topRight: multiply(ref(borderTopRightRadius), ref(sizeMultipliers.sm)),
                bottomRight: multiply(ref(borderBottomRightRadius), ref(sizeMultipliers.sm)),
                bottomLeft: multiply(ref(borderBottomLeftRadius), ref(sizeMultipliers.sm))
            },
            fontSize: ref(fontSizeXs),
            padding: {
                top: multiply(ref(paddingTop), 0.25, ref(sizeMultipliers.sm)),
                right: multiply(ref(paddingRight), 0.5, ref(sizeMultipliers.sm)),
                bottom: multiply(ref(paddingBottom), 0.25, ref(sizeMultipliers.sm)),
                left: multiply(ref(paddingLeft), 0.5, ref(sizeMultipliers.sm))
            }
        },
        md: {
            borderRadius: {
                topLeft: ref(borderTopLeftRadius),
                topRight: ref(borderTopRightRadius),
                bottomRight: ref(borderBottomRightRadius),
                bottomLeft: ref(borderBottomLeftRadius)
            },
            fontSize: ref(fontSizeSm),
            padding: {
                top: multiply(ref(paddingTop), 0.25),
                right: multiply(ref(paddingRight), 0.5),
                bottom: multiply(ref(paddingBottom), 0.25),
                left: multiply(ref(paddingLeft), 0.5)
            }
        },
        lg: {
            borderRadius: {
                topLeft: multiply(ref(borderTopLeftRadius), ref(sizeMultipliers.lg)),
                topRight: multiply(ref(borderTopRightRadius), ref(sizeMultipliers.lg)),
                bottomRight: multiply(ref(borderBottomRightRadius), ref(sizeMultipliers.lg)),
                bottomLeft: multiply(ref(borderBottomLeftRadius), ref(sizeMultipliers.lg))
            },
            fontSize: ref(fontSizeMd),
            padding: {
                top: multiply(ref(paddingTop), 0.5, ref(sizeMultipliers.lg)),
                right: multiply(ref(paddingRight), 1, ref(sizeMultipliers.lg)),
                bottom: multiply(ref(paddingBottom), 0.5, ref(sizeMultipliers.lg)),
                left: multiply(ref(paddingLeft), 1, ref(sizeMultipliers.lg))
            }
        }
    }[variant ?? defaultBadgeSize];
}

export function useBadgeThemeConfig() {
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
            fontWeight: ref(fontWeightSemibold),
            transition: {
                property: ref(transitionProperty),
                duration: ref(transitionDuration),
                timingFunction: ref(transitionTimingFunction)
            },
            /**
             * @variant pill
             */
            pill: {
                borderRadius: {
                    topLeft: '50%',
                    topRight: '50%',
                    bottomLeft: '50%',
                    bottomRight: '50%'
                }
            }
        },
        useBadgeThemeColorConfig(),
        useBadgeThemeSizeConfig()
    );
}

export function useBadgeThemeVariables(options = defaultDefinitionOptions) {
    return {
        ...nsvariables(ns, useBadgeThemeConfig(), {
            ...options,
            registerComposed: false
        })
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
        badgeBorderTopColor,
        badgeBorderRightColor,
        badgeBorderBottomColor,
        badgeBorderLeftColor,
        badgeBorderWidth,
        badgePadding,
        badgeBorderRadius,
        badgeBoxShadow,
        badgeBackground,
        badgeColor,
        badgeFontSize,
        badgeFontWeight,
        badgeTransition,
        badgePillBorderRadius
    } = useBadgeThemeVariables();

    selector('.badge', {
        borderStyle: vref(badgeBorderStyle),
        borderTopColor: vref(badgeBorderTopColor),
        borderRightColor: vref(badgeBorderRightColor),
        borderBottomColor: vref(badgeBorderBottomColor),
        borderLeftColor: vref(badgeBorderLeftColor),
        borderWidth: vref(badgeBorderWidth),
        borderRadius: vref(badgeBorderRadius),
        boxShadow: vref(badgeBoxShadow),
        background: vref(badgeBackground),
        color: vref(badgeColor),
        fontSize: ref(badgeFontSize),
        fontWeight: vref(badgeFontWeight),
        padding: vref(badgePadding),
        transition: vref(badgeTransition)
    });

    selector('.badge.-pill', {
        [toVariableKey(badgeBorderRadius)]: vref(badgePillBorderRadius)
    });
}

export function useBadgeThemeColorFactory(variant: BadgeColorVariant) {
    const colorNs = [ns, variant] as const;

    const {
        badgeBackgroundH,
        badgeBackgroundS,
        badgeBackgroundL,
        badgeBackgroundA,
        badgeBorderTopColorH,
        badgeBorderTopColorS,
        badgeBorderTopColorL,
        badgeBorderTopColorA,
        badgeBorderRightColorH,
        badgeBorderRightColorS,
        badgeBorderRightColorL,
        badgeBorderRightColorA,
        badgeBorderBottomColorH,
        badgeBorderBottomColorS,
        badgeBorderBottomColorL,
        badgeBorderBottomColorA,
        badgeBorderLeftColorH,
        badgeBorderLeftColorS,
        badgeBorderLeftColorL,
        badgeBorderLeftColorA,
        badgeColorH,
        badgeColorS,
        badgeColorL,
        badgeColorA
    } = useBadgeThemeVariables();

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
        nsvariables(colorNs, useBadgeThemeColorConfig(variant), {
            registerComposed: false
        }),
        'variant'
    );

    selector(`.badge.-${variant}`, {
        [toVariableKey(badgeBorderTopColorH)]: ref(variantBorderTopColorH),
        [toVariableKey(badgeBorderTopColorS)]: ref(variantBorderTopColorS),
        [toVariableKey(badgeBorderTopColorL)]: ref(variantBorderTopColorL),
        [toVariableKey(badgeBorderTopColorA)]: ref(variantBorderTopColorA),
        [toVariableKey(badgeBorderRightColorH)]: ref(variantBorderRightColorH),
        [toVariableKey(badgeBorderRightColorS)]: ref(variantBorderRightColorS),
        [toVariableKey(badgeBorderRightColorL)]: ref(variantBorderRightColorL),
        [toVariableKey(badgeBorderRightColorA)]: ref(variantBorderRightColorA),
        [toVariableKey(badgeBorderBottomColorH)]: ref(variantBorderBottomColorH),
        [toVariableKey(badgeBorderBottomColorS)]: ref(variantBorderBottomColorS),
        [toVariableKey(badgeBorderBottomColorL)]: ref(variantBorderBottomColorL),
        [toVariableKey(badgeBorderBottomColorA)]: ref(variantBorderBottomColorA),
        [toVariableKey(badgeBorderLeftColorH)]: ref(variantBorderLeftColorH),
        [toVariableKey(badgeBorderLeftColorS)]: ref(variantBorderLeftColorS),
        [toVariableKey(badgeBorderLeftColorL)]: ref(variantBorderLeftColorL),
        [toVariableKey(badgeBorderLeftColorA)]: ref(variantBorderLeftColorA),
        [toVariableKey(badgeBackgroundH)]: ref(variantBackgroundH),
        [toVariableKey(badgeBackgroundS)]: ref(variantBackgroundS),
        [toVariableKey(badgeBackgroundL)]: ref(variantBackgroundL),
        [toVariableKey(badgeBackgroundA)]: ref(variantBackgroundA),
        [toVariableKey(badgeColorH)]: ref(variantColorH),
        [toVariableKey(badgeColorS)]: ref(variantColorS),
        [toVariableKey(badgeColorL)]: ref(variantColorL),
        [toVariableKey(badgeColorA)]: ref(variantColorA)
    });
}

export function useBadgeThemeColors({ colors = defaultBadgeColors } = {}) {
    colors.forEach(useBadgeThemeColorFactory);
}

export function useBadgeThemeSizeFactory(variant: BadgeSizeVariant) {
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
    } = stripExportsNamespace(nsvariables(sizeNs, useBadgeThemeSizeConfig(variant)));

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

export function useBadgeThemeSizes({ sizes = defaultBadgeSizes } = {}) {
    sizes.forEach(useBadgeThemeSizeFactory);
}

export function useBadgeTheme() {
    useBadgeThemeVariables();
    useBadgeThemeLayout();
    useBadgeThemeBase();
    useBadgeThemeColors();
    useBadgeThemeSizes();
}
