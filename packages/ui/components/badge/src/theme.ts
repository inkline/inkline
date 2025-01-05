import {
    useBorder,
    useBorderRadius,
    useBoxShadow,
    useFontSize,
    useTransition,
    useColors,
    useContrastTextColor,
    useFontWeight,
    useSpacing
} from '@inkline/theme';
import {
    multiply,
    ref,
    selector,
    nsvariables,
    vref,
    toVariableKey,
    setExportsNamespace,
    DefinitionOptions
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

/**
 * Config
 */

export function useBadgeThemeColorConfig(variant: BadgeColorVariant, options: DefinitionOptions) {
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
    } = useColors(options);
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
    } = useContrastTextColor(options);

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
    }[variant];
}

export function useBadgeThemeSizeConfig(variant: BadgeSizeVariant, options: DefinitionOptions) {
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
    } = useBorderRadius(options);
    const { fontSizeXs, fontSizeSm, fontSizeMd } = useFontSize(options);
    const { spacingSm, spacingMd, spacingLg } = useSpacing(options);

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
                top: multiply(ref(spacingSm), 0.25),
                right: multiply(ref(spacingSm), 0.5),
                bottom: multiply(ref(spacingSm), 0.25),
                left: multiply(ref(spacingSm), 0.5)
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
                top: multiply(ref(spacingMd), 0.25),
                right: multiply(ref(spacingMd), 0.5),
                bottom: multiply(ref(spacingMd), 0.25),
                left: multiply(ref(spacingMd), 0.5)
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
                top: multiply(ref(spacingLg), 0.25),
                right: multiply(ref(spacingLg), 0.5),
                bottom: multiply(ref(spacingLg), 0.25),
                left: multiply(ref(spacingLg), 0.5)
            }
        }
    }[variant];
}

export function useBadgeThemeConfig(options: DefinitionOptions) {
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
    const {
        boxShadowOffsetX,
        boxShadowOffsetY,
        boxShadowBlurRadius,
        boxShadowSpreadRadius,
        boxShadowColor
    } = useBoxShadow(options);
    const { fontWeightSemibold } = useFontWeight(options);
    const { transitionProperty, transitionDuration, transitionTimingFunction } =
        useTransition(options);

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
        useBadgeThemeColorConfig(defaultBadgeColor, options),
        useBadgeThemeSizeConfig(defaultBadgeSize, options)
    );
}

/**
 * Variables
 */

export function useBadgeThemeColorVariables(
    variant: BadgeColorVariant,
    options: DefinitionOptions
) {
    const colorNs = [ns, variant] as const;

    return nsvariables(colorNs, useBadgeThemeColorConfig(variant, options), {
        ...options,
        registerComposed: false
    });
}

export function useBadgeThemeSizeVariables(variant: BadgeSizeVariant, options: DefinitionOptions) {
    const sizeNs = [ns, variant] as const;

    return nsvariables(sizeNs, useBadgeThemeSizeConfig(variant, options), {
        ...options,
        registerComposed: false
    });
}

export function useBadgeThemeVariables(options: DefinitionOptions) {
    return {
        ...nsvariables(ns, useBadgeThemeConfig(options), {
            ...options,
            registerComposed: false
        })
    };
}

/**
 * Selectors
 */

export function useBadgeThemeLayoutSelectors(options: DefinitionOptions) {
    selector(
        '.badge',
        {
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        options
    );

    selector(
        'a:hover .badge, a:focus .badge',
        {
            textDecoration: 'none'
        },
        options
    );
}

export function useBadgeThemeBaseSelectors(options: DefinitionOptions) {
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
        badgeTransitionProperty,
        badgeTransitionDuration,
        badgeTransitionTimingFunction,
        badgePillBorderRadius
    } = useBadgeThemeVariables(options);

    selector(
        '.badge',
        {
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
            transitionProperty: vref(badgeTransitionProperty),
            transitionDuration: vref(badgeTransitionDuration),
            transitionTimingFunction: vref(badgeTransitionTimingFunction)
        },
        options
    );

    selector(
        '.badge.-pill',
        {
            [toVariableKey(badgeBorderRadius)]: vref(badgePillBorderRadius)
        },
        options
    );
}

export function useBadgeThemeColorSelectors(
    variant: BadgeColorVariant,
    options: DefinitionOptions
) {
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
    } = useBadgeThemeVariables(options);

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
    } = setExportsNamespace(useBadgeThemeColorVariables(variant, options), 'variant');

    selector(
        `.badge.-${variant}`,
        {
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
        },
        options
    );
}

export function useBadgeThemeSizeSelectors(variant: BadgeSizeVariant, options: DefinitionOptions) {
    const {
        badgeBorderTopLeftRadius,
        badgeBorderTopRightRadius,
        badgeBorderBottomRightRadius,
        badgeBorderBottomLeftRadius,
        badgeFontSize,
        badgePaddingTop,
        badgePaddingRight,
        badgePaddingBottom,
        badgePaddingLeft
    } = useBadgeThemeVariables(options);

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
    } = setExportsNamespace(useBadgeThemeSizeVariables(variant, options), 'variant');

    selector(
        `.badge.-${variant}`,
        {
            [toVariableKey(badgeBorderTopLeftRadius)]: ref(variantBorderTopLeftRadius),
            [toVariableKey(badgeBorderTopRightRadius)]: ref(variantBorderTopRightRadius),
            [toVariableKey(badgeBorderBottomRightRadius)]: ref(variantBorderBottomRightRadius),
            [toVariableKey(badgeBorderBottomLeftRadius)]: ref(variantBorderBottomLeftRadius),
            [toVariableKey(badgeFontSize)]: ref(variantFontSize),
            [toVariableKey(badgePaddingTop)]: ref(variantPaddingTop),
            [toVariableKey(badgePaddingRight)]: ref(variantPaddingRight),
            [toVariableKey(badgePaddingBottom)]: ref(variantPaddingBottom),
            [toVariableKey(badgePaddingLeft)]: ref(variantPaddingLeft)
        },
        options
    );
}

/**
 * Composables
 */

export function useBadgeThemeColors(colors: BadgeColorVariant[], options: DefinitionOptions) {
    colors.forEach((color) => useBadgeThemeColorSelectors(color, options));
}

export function useBadgeThemeSizes(sizes: BadgeSizeVariant[], options: DefinitionOptions) {
    sizes.forEach((size) => useBadgeThemeSizeSelectors(size, options));
}

export function useBadgeTheme(options: DefinitionOptions) {
    useBadgeThemeVariables(options);
    useBadgeThemeLayoutSelectors(options);
    useBadgeThemeBaseSelectors(options);
    useBadgeThemeColors([...defaultBadgeColors], options);
    useBadgeThemeSizes([...defaultBadgeSizes], options);
}
