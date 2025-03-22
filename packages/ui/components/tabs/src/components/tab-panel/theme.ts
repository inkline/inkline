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

const ns = 'tab-panel';

const defaultTabPanelColor = 'light';
const defaultTabPanelColors = ['light', 'dark'] as const;

const defaultTabPanelSize = 'md';
const defaultTabPanelSizes = ['sm', 'md', 'lg'] as const;

type TabPanelColorVariant = (typeof defaultTabPanelColors)[number];
type TabPanelSizeVariant = (typeof defaultTabPanelSizes)[number];

/**
 * Config
 */

export function useTabPanelThemeColorConfig(
    variant: TabPanelColorVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { colorLightShade50, colorWhite, colorDarkTint50, colorDark } = useColors(options);
    const { contrastTextColorLight, contrastTextColorDark } = useContrastTextColor(options);

    return {
        /**
         * @variant light
         */
        light: {
            border: {
                color: ref(colorLightShade50)
            },
            background: ref(colorWhite),
            color: ref(contrastTextColorLight)
        },
        /**
         * @variant dark
         */
        dark: {
            border: {
                color: ref(colorDarkTint50)
            },
            background: ref(colorDark),
            color: ref(contrastTextColorDark)
        }
    }[variant];
}

export function useTabPanelThemeSizeConfig(
    variant: TabPanelSizeVariant,
    userOptions: DefinitionOptions
) {
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

export function useTabPanelThemeConfig(userOptions: DefinitionOptions) {
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
        useTabPanelThemeColorConfig(defaultTabPanelColor, options),
        useTabPanelThemeSizeConfig(defaultTabPanelSize, options)
    );
}

/**
 * Variables
 */

export function useTabPanelThemeColorVariables(
    variant: TabPanelColorVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables([ns, variant] as const, useTabPanelThemeColorConfig(variant, options), {
        ...options,
        registerComposed: false
    });
}

export function useTabPanelThemeSizeVariables(
    variant: TabPanelSizeVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables([ns, variant] as const, useTabPanelThemeSizeConfig(variant, options), {
        ...options,
        registerComposed: false
    });
}

export function useTabPanelThemeVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables(ns, useTabPanelThemeConfig(options), {
        ...options,
        registerComposed: false
    });
}

/**
 * Selectors
 */

export function useTabPanelThemeLayoutSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    selector(
        '.tab-panel',
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

export function useTabPanelThemeBaseSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        tabPanelBorderStyle,
        tabPanelBorderColor,
        tabPanelBorderWidth,
        tabPanelPadding,
        tabPanelBorderRadius,
        tabPanelBoxShadow,
        tabPanelBackground,
        tabPanelColor,
        tabPanelFontSize,
        tabPanelTransitionProperty,
        tabPanelTransitionDuration,
        tabPanelTransitionTimingFunction
    } = useTabPanelThemeVariables(options);

    selector(
        '.tab-panel',
        {
            boxShadow: vref(tabPanelBoxShadow),
            background: ref(tabPanelBackground),
            borderStyle: vref(tabPanelBorderStyle),
            borderColor: vref(tabPanelBorderColor),
            borderWidth: vref(tabPanelBorderWidth),
            borderRadius: vref(tabPanelBorderRadius),
            color: ref(tabPanelColor),
            fontSize: ref(tabPanelFontSize),
            padding: vref(tabPanelPadding),
            transitionProperty: ref(tabPanelTransitionProperty),
            transitionDuration: ref(tabPanelTransitionDuration),
            transitionTimingFunction: ref(tabPanelTransitionTimingFunction)
        },
        options
    );
}

export function useTabPanelThemeColorSelectors(
    variant: TabPanelColorVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        tabPanelBackground,
        tabPanelBorderTopColor,
        tabPanelBorderRightColor,
        tabPanelBorderBottomColor,
        tabPanelBorderLeftColor,
        tabPanelColor
    } = useTabPanelThemeVariables(options);

    const {
        variantBackground,
        variantBorderTopColor,
        variantBorderRightColor,
        variantBorderBottomColor,
        variantBorderLeftColor,
        variantColor
    } = setExportsNamespace(useTabPanelThemeColorVariables(variant, options), 'variant');

    selector(
        `.tab-panel.-${variant}`,
        {
            [toVariableKey(tabPanelBorderTopColor)]: ref(variantBorderTopColor),
            [toVariableKey(tabPanelBorderRightColor)]: ref(variantBorderRightColor),
            [toVariableKey(tabPanelBorderBottomColor)]: ref(variantBorderBottomColor),
            [toVariableKey(tabPanelBorderLeftColor)]: ref(variantBorderLeftColor),
            [toVariableKey(tabPanelBackground)]: ref(variantBackground),
            [toVariableKey(tabPanelColor)]: ref(variantColor)
        },
        options
    );
}

export function useTabPanelThemeSizeSelectors(
    variant: TabPanelSizeVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        tabPanelBorderTopLeftRadius,
        tabPanelBorderTopRightRadius,
        tabPanelBorderBottomRightRadius,
        tabPanelBorderBottomLeftRadius,
        tabPanelFontSize,
        tabPanelPaddingTop,
        tabPanelPaddingRight,
        tabPanelPaddingBottom,
        tabPanelPaddingLeft
    } = useTabPanelThemeVariables(options);

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
    } = setExportsNamespace(useTabPanelThemeSizeVariables(variant, options), 'variant');

    selector(
        `.tab-panel.-${variant}`,
        {
            [toVariableKey(tabPanelBorderTopLeftRadius)]: ref(variantBorderTopLeftRadius),
            [toVariableKey(tabPanelBorderTopRightRadius)]: ref(variantBorderTopRightRadius),
            [toVariableKey(tabPanelBorderBottomRightRadius)]: ref(variantBorderBottomRightRadius),
            [toVariableKey(tabPanelBorderBottomLeftRadius)]: ref(variantBorderBottomLeftRadius),
            [toVariableKey(tabPanelFontSize)]: ref(variantFontSize),
            [toVariableKey(tabPanelPaddingTop)]: ref(variantPaddingTop),
            [toVariableKey(tabPanelPaddingRight)]: ref(variantPaddingRight),
            [toVariableKey(tabPanelPaddingBottom)]: ref(variantPaddingBottom),
            [toVariableKey(tabPanelPaddingLeft)]: ref(variantPaddingLeft)
        },
        options
    );
}

/**
 * Composables
 */

export function useTabPanelThemeColors(
    colors: TabPanelColorVariant[],
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    colors.forEach((color) => useTabPanelThemeColorSelectors(color, options));
}

export function useTabPanelThemeSizes(
    sizes: TabPanelSizeVariant[],
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    sizes.forEach((size) => useTabPanelThemeSizeSelectors(size, options));
}

export function useTabPanelTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useTabPanelThemeVariables(options);
    useTabPanelThemeLayoutSelectors(options);
    useTabPanelThemeBaseSelectors(options);
    useTabPanelThemeColors([...defaultTabPanelColors], options);
    useTabPanelThemeSizes([...defaultTabPanelSizes], options);
}
