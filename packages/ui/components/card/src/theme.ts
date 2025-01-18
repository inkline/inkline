import {
    ref,
    selector,
    nsvariables,
    vref,
    toVariableKey,
    setExportsNamespace,
    DefinitionOptions,
    defaultDefinitionOptions
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

export function useCardThemeColorConfig(variant: CardColorVariant, userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        colorLightShade50,
        colorLight,
        colorDarkTint50,
        colorDark,
        colorPrimaryShade50,
        colorPrimary,
        colorSecondaryShade50,
        colorSecondary,
        colorSuccessShade50,
        colorSuccess,
        colorDangerShade50,
        colorDanger,
        colorWarningShade50,
        colorWarning,
        colorInfoShade50,
        colorInfo
    } = useColors(options);
    const {
        contrastTextColorLight,
        contrastTextColorDark,
        contrastTextColorPrimary,
        contrastTextColorSecondary,
        contrastTextColorSuccess,
        contrastTextColorDanger,
        contrastTextColorWarning,
        contrastTextColorInfo
    } = useContrastTextColor(options);

    return {
        light: {
            border: {
                color: ref(colorLightShade50)
            },
            background: ref(colorLight),
            color: ref(contrastTextColorLight)
        },
        dark: {
            border: {
                color: ref(colorDarkTint50)
            },
            background: ref(colorDark),
            color: ref(contrastTextColorDark)
        },
        primary: {
            border: {
                color: ref(colorPrimaryShade50)
            },
            background: ref(colorPrimary),
            color: ref(contrastTextColorPrimary)
        },
        secondary: {
            border: {
                color: ref(colorSecondaryShade50)
            },
            background: ref(colorSecondary),
            color: ref(contrastTextColorSecondary)
        },
        success: {
            border: {
                color: ref(colorSuccessShade50)
            },
            background: ref(colorSuccess),
            color: ref(contrastTextColorSuccess)
        },
        danger: {
            border: {
                color: ref(colorDangerShade50)
            },
            background: ref(colorDanger),
            color: ref(contrastTextColorDanger)
        },
        warning: {
            border: {
                color: ref(colorWarningShade50)
            },
            background: ref(colorWarning),
            color: ref(contrastTextColorWarning)
        },
        info: {
            border: {
                color: ref(colorInfoShade50)
            },
            background: ref(colorInfo),
            color: ref(contrastTextColorInfo)
        }
    }[variant];
}

export function useCardThemeSizeConfig(variant: CardSizeVariant, userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

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
    const { fontSizeSm, fontSizeMd, fontSizeLg } = useFontSize(options);
    const { spacingSm, spacingMd, spacingLg } = useSpacing(options);

    return {
        sm: {
            borderRadius: {
                topLeft: ref(borderTopLeftRadiusSm),
                topRight: ref(borderTopRightRadiusSm),
                bottomRight: ref(borderBottomRightRadiusSm),
                bottomLeft: ref(borderBottomLeftRadiusSm)
            },
            fontSize: ref(fontSizeSm),
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
            fontSize: ref(fontSizeMd),
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
            fontSize: ref(fontSizeLg),
            padding: {
                top: ref(spacingLg),
                right: ref(spacingLg),
                bottom: ref(spacingLg),
                left: ref(spacingLg)
            }
        }
    }[variant];
}

export function useCardThemeConfig(userOptions: DefinitionOptions) {
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
        useCardThemeColorConfig(defaultCardColor, options),
        useCardThemeSizeConfig(defaultCardSize, options)
    );
}

/**
 * Variables
 */

export function useCardThemeColorVariables(
    variant: CardColorVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables(ns, useCardThemeColorConfig(variant, options), {
        ...options,
        registerComposed: false
    });
}

export function useCardThemeSizeVariables(
    variant: CardSizeVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables(ns, useCardThemeSizeConfig(variant, options), {
        ...options,
        registerComposed: false
    });
}

export function useCardThemeVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables(ns, useCardThemeConfig(options), {
        ...options,
        registerComposed: false
    });
}

export function useCardThemeLayout(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    selector(
        '.card',
        {
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            wordWrap: 'break-word',
            backgroundClip: 'border-box'
        },
        options
    );
}

/**
 * Selecotrs
 */

export function useCardThemeBaseSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

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

    selector(
        '.card',
        {
            boxShadow: vref(cardBoxShadow),
            color: vref(cardColor),
            fontSize: ref(cardFontSize)
        },
        options
    );

    selector(
        ['.card-header', '.card-body', '.card-footer'],
        {
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
        },
        options
    );

    selector(
        '.card-header + .card-body',
        {
            borderTop: 0
        },
        options
    );

    selector(
        '.card-body:has(+ .card-footer)',
        {
            borderBottom: 0
        },
        options
    );

    selector(
        '.card > *',
        {
            borderRadius: vref(cardBorderRadius)
        },
        options
    );

    selector(
        '.card > *:not(:first-child)',
        {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0
        },
        options
    );

    selector(
        '.card > *:not(:last-child)',
        {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0
        },
        options
    );
}

export function useCardThemeColorSelectors(
    variant: CardColorVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        cardBackground,
        cardBorderTopColor,
        cardBorderRightColor,
        cardBorderBottomColor,
        cardBorderLeftColor,
        cardColor
    } = useCardThemeVariables(options);

    const {
        variantBackground,
        variantBorderTopColor,
        variantBorderRightColor,
        variantBorderBottomColor,
        variantBorderLeftColor,
        variantColor
    } = setExportsNamespace(useCardThemeColorVariables(variant, options), 'variant');

    selector(
        [
            `.card.-${variant} .card-header`,
            `.card.-${variant} .card-body`,
            `.card.-${variant} .card-footer`
        ],
        {
            [toVariableKey(cardBorderTopColor)]: ref(variantBorderTopColor),
            [toVariableKey(cardBorderRightColor)]: ref(variantBorderRightColor),
            [toVariableKey(cardBorderBottomColor)]: ref(variantBorderBottomColor),
            [toVariableKey(cardBorderLeftColor)]: ref(variantBorderLeftColor),
            [toVariableKey(cardBackground)]: ref(variantBackground),
            [toVariableKey(cardColor)]: ref(variantColor)
        },
        options
    );
}

export function useCardThemeSizeSelectors(
    variant: CardSizeVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

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
    } = setExportsNamespace(useCardThemeSizeVariables(variant, options), 'variant');

    selector(
        `.card.-${variant}`,
        {
            [toVariableKey(cardBorderTopLeftRadius)]: ref(variantBorderTopLeftRadius),
            [toVariableKey(cardBorderTopRightRadius)]: ref(variantBorderTopRightRadius),
            [toVariableKey(cardBorderBottomRightRadius)]: ref(variantBorderBottomRightRadius),
            [toVariableKey(cardBorderBottomLeftRadius)]: ref(variantBorderBottomLeftRadius),
            [toVariableKey(cardFontSize)]: ref(variantFontSize),
            [toVariableKey(cardPaddingTop)]: ref(variantPaddingTop),
            [toVariableKey(cardPaddingRight)]: ref(variantPaddingRight),
            [toVariableKey(cardPaddingBottom)]: ref(variantPaddingBottom),
            [toVariableKey(cardPaddingLeft)]: ref(variantPaddingLeft)
        },
        options
    );
}

/**
 * Composables
 */

export function useCardThemeColors(colors: CardColorVariant[], userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    colors.forEach((color) => useCardThemeColorSelectors(color, options));
}

export function useCardThemeSizes(sizes: CardSizeVariant[], userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    sizes.forEach((size) => useCardThemeSizeSelectors(size, options));
}

export function useCardTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useCardThemeVariables(options);
    useCardThemeLayout(options);
    useCardThemeBaseSelectors(options);
    useCardThemeColors([...defaultCardColors], options);
    useCardThemeSizes([...defaultCardSizes], options);
}
