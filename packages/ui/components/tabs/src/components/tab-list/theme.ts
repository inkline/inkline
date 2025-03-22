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

const ns = 'tab-list';

const defaultTabListColor = 'light';
const defaultTabListColors = ['light', 'dark'] as const;

const defaultTabListSize = 'md';
const defaultTabListSizes = ['sm', 'md', 'lg'] as const;

type TabListColorVariant = (typeof defaultTabListColors)[number];
type TabListSizeVariant = (typeof defaultTabListSizes)[number];

/**
 * Config
 */

export function useTabListThemeColorConfig(
    variant: TabListColorVariant,
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

export function useTabListThemeSizeConfig(
    variant: TabListSizeVariant,
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
            padding: 0,
            margin: {
                bottom: ref(spacingSm)
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
            padding: 0,
            margin: {
                bottom: ref(spacingMd)
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
            padding: 0,
            margin: {
                bottom: ref(spacingLg)
            }
        }
    }[variant];
}

export function useTabListThemeConfig(userOptions: DefinitionOptions) {
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
        useTabListThemeColorConfig(defaultTabListColor, options),
        useTabListThemeSizeConfig(defaultTabListSize, options)
    );
}

/**
 * Variables
 */

export function useTabListThemeColorVariables(
    variant: TabListColorVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables([ns, variant] as const, useTabListThemeColorConfig(variant, options), {
        ...options,
        registerComposed: false
    });
}

export function useTabListThemeSizeVariables(
    variant: TabListSizeVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables([ns, variant] as const, useTabListThemeSizeConfig(variant, options), {
        ...options,
        registerComposed: false
    });
}

export function useTabListThemeVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables(ns, useTabListThemeConfig(options), {
        ...options,
        registerComposed: false
    });
}

/**
 * Selectors
 */

export function useTabListThemeLayoutSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    selector(
        '.tab-list',
        {
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
            minWidth: 0,
            wordWrap: 'break-word',
            backgroundClip: 'border-box',
            justifyContent: 'flex-start',
            flexWrap: 'nowrap',
            alignItems: 'center',
            overflow: 'auto'
        },
        options
    );

    selector(
        '.tab-list.-stretch .tab',
        {
            flexGrow: 1
        },
        options
    );

    selector(
        '.tab-list.-stretch .tab:last-child',
        {
            borderRightWidth: 0
        },
        options
    );
}

export function useTabListThemeBaseSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        tabListBorderStyle,
        tabListBorderColor,
        tabListBorderWidth,
        tabListPadding,
        tabListBorderRadius,
        tabListBoxShadow,
        tabListBackground,
        tabListColor,
        tabListFontSize,
        tabListMargin,
        tabListTransitionProperty,
        tabListTransitionDuration,
        tabListTransitionTimingFunction
    } = useTabListThemeVariables(options);

    selector(
        '.tab-list',
        {
            boxShadow: vref(tabListBoxShadow),
            background: ref(tabListBackground),
            borderStyle: vref(tabListBorderStyle),
            borderColor: vref(tabListBorderColor),
            borderWidth: vref(tabListBorderWidth),
            borderRadius: vref(tabListBorderRadius),
            color: ref(tabListColor),
            fontSize: ref(tabListFontSize),
            padding: vref(tabListPadding),
            margin: vref(tabListMargin),
            transitionProperty: ref(tabListTransitionProperty),
            transitionDuration: ref(tabListTransitionDuration),
            transitionTimingFunction: ref(tabListTransitionTimingFunction)
        },
        options
    );
}

export function useTabListThemeColorSelectors(
    variant: TabListColorVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        tabListBackground,
        tabListBorderTopColor,
        tabListBorderRightColor,
        tabListBorderBottomColor,
        tabListBorderLeftColor,
        tabListColor
    } = useTabListThemeVariables(options);

    const {
        variantBackground,
        variantBorderTopColor,
        variantBorderRightColor,
        variantBorderBottomColor,
        variantBorderLeftColor,
        variantColor
    } = setExportsNamespace(useTabListThemeColorVariables(variant, options), 'variant');

    selector(
        `.tab-list.-${variant}`,
        {
            [toVariableKey(tabListBorderTopColor)]: ref(variantBorderTopColor),
            [toVariableKey(tabListBorderRightColor)]: ref(variantBorderRightColor),
            [toVariableKey(tabListBorderBottomColor)]: ref(variantBorderBottomColor),
            [toVariableKey(tabListBorderLeftColor)]: ref(variantBorderLeftColor),
            [toVariableKey(tabListBackground)]: ref(variantBackground),
            [toVariableKey(tabListColor)]: ref(variantColor)
        },
        options
    );
}

export function useTabListThemeSizeSelectors(
    variant: TabListSizeVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        tabListBorderTopLeftRadius,
        tabListBorderTopRightRadius,
        tabListBorderBottomRightRadius,
        tabListBorderBottomLeftRadius,
        tabListFontSize,
        tabListPaddingTop,
        tabListPaddingRight,
        tabListPaddingBottom,
        tabListPaddingLeft
    } = useTabListThemeVariables(options);

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
    } = setExportsNamespace(useTabListThemeSizeVariables(variant, options), 'variant');

    selector(
        `.tab-list.-${variant}`,
        {
            [toVariableKey(tabListBorderTopLeftRadius)]: ref(variantBorderTopLeftRadius),
            [toVariableKey(tabListBorderTopRightRadius)]: ref(variantBorderTopRightRadius),
            [toVariableKey(tabListBorderBottomRightRadius)]: ref(variantBorderBottomRightRadius),
            [toVariableKey(tabListBorderBottomLeftRadius)]: ref(variantBorderBottomLeftRadius),
            [toVariableKey(tabListFontSize)]: ref(variantFontSize),
            [toVariableKey(tabListPaddingTop)]: ref(variantPaddingTop),
            [toVariableKey(tabListPaddingRight)]: ref(variantPaddingRight),
            [toVariableKey(tabListPaddingBottom)]: ref(variantPaddingBottom),
            [toVariableKey(tabListPaddingLeft)]: ref(variantPaddingLeft)
        },
        options
    );
}

/**
 * Composables
 */

export function useTabListThemeColors(
    colors: TabListColorVariant[],
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    colors.forEach((color) => useTabListThemeColorSelectors(color, options));
}

export function useTabListThemeSizes(sizes: TabListSizeVariant[], userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    sizes.forEach((size) => useTabListThemeSizeSelectors(size, options));
}

export function useTabListTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useTabListThemeVariables(options);
    useTabListThemeLayoutSelectors(options);
    useTabListThemeBaseSelectors(options);
    useTabListThemeColors([...defaultTabListColors], options);
    useTabListThemeSizes([...defaultTabListSizes], options);
}
