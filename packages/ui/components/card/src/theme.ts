import {
    ref,
    selector,
    defaultDefinitionOptions,
    nsvariables,
    vref,
    toVariableKey,
    setExportsNamespace
} from '@inkline/core';
import { merge } from '@inkline/utils';
import {
    useBorder,
    useBorderRadius,
    useBoxShadow,
    useFontSize,
    useTransition,
    useColors,
    useContrastTextColor,
    useSpacing
} from '@inkline/theme';

const ns = 'card';

const defaultCardColor = 'light';
const defaultCardColors = [
    'light',
    'dark',
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info'
] as const;

const defaultCardSize = 'md';
const defaultCardSizes = ['sm', 'md', 'lg'] as const;

type CardColorVariant = (typeof defaultCardColors)[number];
type CardSizeVariant = (typeof defaultCardSizes)[number];

/**
 * Config
 */

export function useCardThemeColorConfig(variant: CardColorVariant) {
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
    }[variant ?? defaultCardColor];
}

export function useCardThemeSizeConfig(variant: CardSizeVariant) {
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
    }[variant ?? defaultCardSize];
}

export function useCardThemeConfig(options: DefinitionOptions) {
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
            transition: {
                property: ref(transitionProperty),
                duration: ref(transitionDuration),
                timingFunction: ref(transitionTimingFunction)
            }
        },
        useCardThemeColorConfig(options),
        useCardThemeSizeConfig(options)
    );
}

/**
 * Variables
 */

export function useCardThemeColorVariables(variant: CardColorVariant, options: DefinitionOptions) {
    return nsvariables(ns, useCardThemeColorConfig(variant), {
        ...options,
        registerComposed: false
    });
}

export function useCardThemeSizeVariables(variant: CardSizeVariant, options: DefinitionOptions) {
    return nsvariables(ns, useCardThemeSizeConfig(variant), {
        ...options,
        registerComposed: false
    });
}

export function useCardThemeVariables(options: DefinitionOptions) {
    return nsvariables(ns, useCardThemeConfig(options), {
        ...options,
        registerComposed: false
    });
}

export function useCardThemeLayout(options: DefinitionOptions) {
    selector('.card', {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        wordWrap: 'break-word',
        backgroundClip: 'border-box'
    });
}

/**
 * Selecotrs
 */

export function useCardThemeBaseSelectors(options: DefinitionOptions) {
    const {
        cardBorderStyle,
        cardBorderTopColor,
        cardBorderRightColor,
        cardBorderBottomColor,
        cardBorderLeftColor,
        cardBorderWidth,
        cardPadding,
        cardBorderRadius,
        cardBoxShadow,
        cardBackground,
        cardColor,
        cardFontSize,
        cardTransitionProperty,
        cardTransitionDuration,
        cardTransitionTimingFunction
    } = useCardThemeVariables(options);

    selector('.card', {
        boxShadow: vref(cardBoxShadow),
        color: vref(cardColor),
        fontSize: ref(cardFontSize)
    });

    selector(['.card-header', '.card-body', '.card-footer'], {
        background: vref(cardBackground),
        borderStyle: vref(cardBorderStyle),
        borderTopColor: vref(cardBorderTopColor),
        borderRightColor: vref(cardBorderRightColor),
        borderBottomColor: vref(cardBorderBottomColor),
        borderLeftColor: vref(cardBorderLeftColor),
        borderWidth: vref(cardBorderWidth),
        padding: vref(cardPadding),
        transitionProperty: ref(cardTransitionProperty),
        transitionDuration: ref(cardTransitionDuration),
        transitionTimingFunction: ref(cardTransitionTimingFunction)
    });

    selector('.card-header + .card-body', {
        borderTop: 0
    });

    selector('.card-body:has(+ .card-footer)', {
        borderBottom: 0
    });

    selector('.card > *', {
        borderRadius: vref(cardBorderRadius)
    });

    selector('.card > *:not(:first-child)', {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
    });

    selector('.card > *:not(:last-child)', {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
    });
}

export function useCardThemeColorSelectors(variant: CardColorVariant) {
    const {
        cardBackgroundH,
        cardBackgroundS,
        cardBackgroundL,
        cardBackgroundA,
        cardBorderTopColorH,
        cardBorderTopColorS,
        cardBorderTopColorL,
        cardBorderTopColorA,
        cardBorderRightColorH,
        cardBorderRightColorS,
        cardBorderRightColorL,
        cardBorderRightColorA,
        cardBorderBottomColorH,
        cardBorderBottomColorS,
        cardBorderBottomColorL,
        cardBorderBottomColorA,
        cardBorderLeftColorH,
        cardBorderLeftColorS,
        cardBorderLeftColorL,
        cardBorderLeftColorA,
        cardColorH,
        cardColorS,
        cardColorL,
        cardColorA
    } = useCardThemeVariables(options);

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
    } = setExportsNamespace(useCardThemeColorVariables(variant), 'variant');

    selector(
        [
            `.card.-${variant} .card-header`,
            `.card.-${variant} .card-body`,
            `.card.-${variant} .card-footer`
        ],
        {
            [toVariableKey(cardBorderTopColorH)]: ref(variantBorderTopColorH),
            [toVariableKey(cardBorderTopColorS)]: ref(variantBorderTopColorS),
            [toVariableKey(cardBorderTopColorL)]: ref(variantBorderTopColorL),
            [toVariableKey(cardBorderTopColorA)]: ref(variantBorderTopColorA),
            [toVariableKey(cardBorderRightColorH)]: ref(variantBorderRightColorH),
            [toVariableKey(cardBorderRightColorS)]: ref(variantBorderRightColorS),
            [toVariableKey(cardBorderRightColorL)]: ref(variantBorderRightColorL),
            [toVariableKey(cardBorderRightColorA)]: ref(variantBorderRightColorA),
            [toVariableKey(cardBorderBottomColorH)]: ref(variantBorderBottomColorH),
            [toVariableKey(cardBorderBottomColorS)]: ref(variantBorderBottomColorS),
            [toVariableKey(cardBorderBottomColorL)]: ref(variantBorderBottomColorL),
            [toVariableKey(cardBorderBottomColorA)]: ref(variantBorderBottomColorA),
            [toVariableKey(cardBorderLeftColorH)]: ref(variantBorderLeftColorH),
            [toVariableKey(cardBorderLeftColorS)]: ref(variantBorderLeftColorS),
            [toVariableKey(cardBorderLeftColorL)]: ref(variantBorderLeftColorL),
            [toVariableKey(cardBorderLeftColorA)]: ref(variantBorderLeftColorA),
            [toVariableKey(cardBackgroundH)]: ref(variantBackgroundH),
            [toVariableKey(cardBackgroundS)]: ref(variantBackgroundS),
            [toVariableKey(cardBackgroundL)]: ref(variantBackgroundL),
            [toVariableKey(cardBackgroundA)]: ref(variantBackgroundA),
            [toVariableKey(cardColorH)]: ref(variantColorH),
            [toVariableKey(cardColorS)]: ref(variantColorS),
            [toVariableKey(cardColorL)]: ref(variantColorL),
            [toVariableKey(cardColorA)]: ref(variantColorA)
        }
    );
}

export function useCardThemeSizeSelectors(variant: CardSizeVariant) {
    const {
        cardBorderTopLeftRadius,
        cardBorderTopRightRadius,
        cardBorderBottomRightRadius,
        cardBorderBottomLeftRadius,
        cardFontSize,
        cardPaddingTop,
        cardPaddingRight,
        cardPaddingBottom,
        cardPaddingLeft
    } = useCardThemeVariables(options);

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
    } = setExportsNamespace(useCardThemeSizeVariables(variant), 'variant');

    selector(`.card.-${variant}`, {
        [toVariableKey(cardBorderTopLeftRadius)]: ref(variantBorderTopLeftRadius),
        [toVariableKey(cardBorderTopRightRadius)]: ref(variantBorderTopRightRadius),
        [toVariableKey(cardBorderBottomRightRadius)]: ref(variantBorderBottomRightRadius),
        [toVariableKey(cardBorderBottomLeftRadius)]: ref(variantBorderBottomLeftRadius),
        [toVariableKey(cardFontSize)]: ref(variantFontSize),
        [toVariableKey(cardPaddingTop)]: ref(variantPaddingTop),
        [toVariableKey(cardPaddingRight)]: ref(variantPaddingRight),
        [toVariableKey(cardPaddingBottom)]: ref(variantPaddingBottom),
        [toVariableKey(cardPaddingLeft)]: ref(variantPaddingLeft)
    });
}

/**
 * Composables
 */

export function useCardThemeColors(colors = defaultCardColors) {
    colors.forEach((color) => useCardThemeColorSelectors(color, options));
}

export function useCardThemeSizes(sizes = defaultCardSizes) {
    sizes.forEach((size) => useCardThemeSizeSelectors(size, options));
}

export function useCardTheme(options: DefinitionOptions) {
    useCardThemeVariables(options);
    useCardThemeLayout(options);
    useCardThemeBaseSelectors(options);
    useCardThemeColors(options);
    useCardThemeSizes(options);
}
