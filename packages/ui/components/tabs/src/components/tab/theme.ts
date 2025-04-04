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
    useSpacing,
    useFontWeight
} from '@inkline/theme';

const ns = 'tab';

const defaultTabColor = 'light';
const defaultTabColors = ['light', 'dark'] as const;

type TabColorVariant = (typeof defaultTabColors)[number];

/**
 * Config
 */

export function useTabThemeColorConfig(variant: TabColorVariant, userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        colorWhite,
        colorLightTint50,
        colorLightShade50,
        colorDark,
        colorDarkTint50,
        colorDarkTint100
    } = useColors(options);
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
            color: ref(contrastTextColorLight),
            /**
             * @state active
             */
            active: {
                border: {
                    color: ref(colorLightShade50)
                },
                background: ref(colorLightTint50)
            },
            /**
             * @state hover
             */
            hover: {
                border: {
                    color: ref(colorLightShade50)
                },
                background: ref(colorLightTint50)
            },
            /**
             * @state focus
             */
            focus: {
                border: {
                    color: ref(colorLightShade50)
                },
                background: ref(colorLightTint50)
            }
        },
        /**
         * @variant dark
         */
        dark: {
            border: {
                color: ref(colorDarkTint50)
            },
            background: ref(colorDark),
            color: ref(contrastTextColorDark),
            /**
             * @state active
             */
            active: {
                border: {
                    color: ref(colorDarkTint100)
                },
                background: ref(colorDarkTint100)
            },
            /**
             * @state hover
             */
            hover: {
                border: {
                    color: ref(colorDarkTint100)
                },
                background: ref(colorDarkTint50)
            },
            /**
             * @state focus
             */
            focus: {
                border: {
                    color: ref(colorDarkTint100)
                },
                background: ref(colorDarkTint50)
            }
        }
    }[variant];
}

export function useTabThemeConfig(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        borderTopStyle,
        borderRightStyle,
        borderRightWidth,
        borderBottomStyle,
        borderLeftStyle
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
    const { fontWeightSemibold } = useFontWeight(options);
    const { fontSize } = useFontSize(options);
    const { spacing } = useSpacing(options);

    return merge(
        {
            border: {
                top: {
                    width: '0',
                    style: ref(borderTopStyle)
                },
                right: {
                    width: ref(borderRightWidth),
                    style: ref(borderRightStyle)
                },
                bottom: {
                    width: '0',
                    style: ref(borderBottomStyle)
                },
                left: {
                    width: '0',
                    style: ref(borderLeftStyle)
                }
            },
            borderRadius: {
                topLeft: '0',
                topRight: '0',
                bottomRight: '0',
                bottomLeft: '0'
            },
            boxShadow: {
                offsetX: ref(boxShadowOffsetX),
                offsetY: ref(boxShadowOffsetY),
                blurRadius: ref(boxShadowBlurRadius),
                spreadRadius: ref(boxShadowSpreadRadius),
                color: ref(boxShadowColor)
            },
            fontSize: ref(fontSize),
            padding: {
                top: ref(spacing),
                right: ref(spacing),
                bottom: ref(spacing),
                left: ref(spacing)
            },
            transition: {
                property: ref(transitionProperty),
                duration: ref(transitionDuration),
                timingFunction: ref(transitionTimingFunction)
            },
            active: {
                fontWeight: ref(fontWeightSemibold)
            }
        },
        useTabThemeColorConfig(defaultTabColor, options)
    );
}

/**
 * Variables
 */

export function useTabThemeColorVariables(
    variant: TabColorVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables([ns, variant] as const, useTabThemeColorConfig(variant, options), {
        ...options,
        registerComposed: false
    });
}

export function useTabThemeVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables(ns, useTabThemeConfig(options), {
        ...options,
        registerComposed: false
    });
}

/**
 * Selectors
 */

export function useTabThemeLayoutSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    selector(
        '.tab',
        {
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            wordWrap: 'break-word',
            backgroundClip: 'border-box',
            cursor: 'pointer',
            justifyContent: 'center',
            alignItems: 'center'
        },
        options
    );
}

export function useTabThemeBaseSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        tabBorderStyle,
        tabBorderColor,
        tabBorderWidth,
        tabPadding,
        tabBorderRadius,
        tabBoxShadow,
        tabBackground,
        tabColor,
        tabFontSize,
        tabTransitionProperty,
        tabTransitionDuration,
        tabTransitionTimingFunction,
        tabHoverBackground,
        tabHoverBorderColor,
        tabFocusBackground,
        tabFocusBorderColor,
        tabActiveBackground,
        tabActiveBorderColor,
        tabActiveFontWeight
    } = useTabThemeVariables(options);

    selector(
        '.tab',
        {
            boxShadow: vref(tabBoxShadow),
            background: ref(tabBackground),
            borderStyle: vref(tabBorderStyle),
            borderColor: vref(tabBorderColor),
            borderWidth: vref(tabBorderWidth),
            borderRadius: vref(tabBorderRadius),
            color: ref(tabColor),
            fontSize: ref(tabFontSize),
            padding: vref(tabPadding),
            transitionProperty: ref(tabTransitionProperty),
            transitionDuration: ref(tabTransitionDuration),
            transitionTimingFunction: ref(tabTransitionTimingFunction)
        },
        options
    );

    // Button states

    selector(
        ['.tab:hover', '.tab.-hover'],
        {
            background: ref(tabHoverBackground),
            borderColor: vref(tabHoverBorderColor)
        },
        options
    );

    selector(
        ['.tab:focus', '.tab.-focus'],
        {
            background: ref(tabFocusBackground),
            borderColor: vref(tabFocusBorderColor)
        },
        options
    );

    selector(
        ['.tab:active', '.tab.-active'],
        {
            fontWeight: ref(tabActiveFontWeight),
            background: ref(tabActiveBackground),
            borderColor: vref(tabActiveBorderColor)
        },
        options
    );
}

export function useTabThemeColorSelectors(
    variant: TabColorVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        tabBackground,
        tabBorderTopColor,
        tabBorderRightColor,
        tabBorderBottomColor,
        tabBorderLeftColor,
        tabColor,
        tabActiveBackground,
        tabActiveBorderTopColor,
        tabActiveBorderRightColor,
        tabActiveBorderBottomColor,
        tabActiveBorderLeftColor,
        tabHoverBackground,
        tabHoverBorderTopColor,
        tabHoverBorderRightColor,
        tabHoverBorderBottomColor,
        tabHoverBorderLeftColor,
        tabFocusBackground,
        tabFocusBorderTopColor,
        tabFocusBorderRightColor,
        tabFocusBorderBottomColor,
        tabFocusBorderLeftColor
    } = useTabThemeVariables(options);

    const {
        variantBackground,
        variantBorderTopColor,
        variantBorderRightColor,
        variantBorderBottomColor,
        variantBorderLeftColor,
        variantColor,
        variantActiveBackground,
        variantActiveBorderTopColor,
        variantActiveBorderRightColor,
        variantActiveBorderBottomColor,
        variantActiveBorderLeftColor,
        variantHoverBackground,
        variantHoverBorderTopColor,
        variantHoverBorderRightColor,
        variantHoverBorderBottomColor,
        variantHoverBorderLeftColor,
        variantFocusBackground,
        variantFocusBorderTopColor,
        variantFocusBorderRightColor,
        variantFocusBorderBottomColor,
        variantFocusBorderLeftColor
    } = setExportsNamespace(useTabThemeColorVariables(variant, options), 'variant');

    selector(
        `.tab.-${variant}`,
        {
            [toVariableKey(tabBorderTopColor)]: ref(variantBorderTopColor),
            [toVariableKey(tabBorderRightColor)]: ref(variantBorderRightColor),
            [toVariableKey(tabBorderBottomColor)]: ref(variantBorderBottomColor),
            [toVariableKey(tabBorderLeftColor)]: ref(variantBorderLeftColor),
            [toVariableKey(tabBackground)]: ref(variantBackground),
            [toVariableKey(tabColor)]: ref(variantColor),
            [toVariableKey(tabActiveBackground)]: ref(variantActiveBackground),
            [toVariableKey(tabActiveBorderTopColor)]: ref(variantActiveBorderTopColor),
            [toVariableKey(tabActiveBorderRightColor)]: ref(variantActiveBorderRightColor),
            [toVariableKey(tabActiveBorderBottomColor)]: ref(variantActiveBorderBottomColor),
            [toVariableKey(tabActiveBorderLeftColor)]: ref(variantActiveBorderLeftColor),
            [toVariableKey(tabHoverBackground)]: ref(variantHoverBackground),
            [toVariableKey(tabHoverBorderTopColor)]: ref(variantHoverBorderTopColor),
            [toVariableKey(tabHoverBorderRightColor)]: ref(variantHoverBorderRightColor),
            [toVariableKey(tabHoverBorderBottomColor)]: ref(variantHoverBorderBottomColor),
            [toVariableKey(tabHoverBorderLeftColor)]: ref(variantHoverBorderLeftColor),
            [toVariableKey(tabFocusBackground)]: ref(variantFocusBackground),
            [toVariableKey(tabFocusBorderTopColor)]: ref(variantFocusBorderTopColor),
            [toVariableKey(tabFocusBorderRightColor)]: ref(variantFocusBorderRightColor),
            [toVariableKey(tabFocusBorderBottomColor)]: ref(variantFocusBorderBottomColor),
            [toVariableKey(tabFocusBorderLeftColor)]: ref(variantFocusBorderLeftColor)
        },
        options
    );
}

/**
 * Composables
 */

export function useTabThemeColors(colors: TabColorVariant[], userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    colors.forEach((color) => useTabThemeColorSelectors(color, options));
}

export function useTabTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useTabThemeVariables(options);
    useTabThemeLayoutSelectors(options);
    useTabThemeBaseSelectors(options);
    useTabThemeColors([...defaultTabColors], options);
}
