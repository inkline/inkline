import {
    ref,
    selector,
    nsvariables,
    setExportsNamespace,
    toVariableKey,
    DefinitionOptions,
    defaultDefinitionOptions
} from '@inkline/core';
import { merge } from '@inkline/utils';
import {
    useFontSize,
    useTransition,
    useTextColor,
    useBrandColors,
    useContrastTextColor,
    useSpacing,
    useFontWeight
} from '@inkline/theme';

const ns = 'nav';

const defaultNavColor = 'light';
const defaultNavColors = ['light', 'dark'] as const;

const defaultNavSize = 'md';
const defaultNavSizes = ['sm', 'md', 'lg'] as const;

type NavColorVariant = (typeof defaultNavColors)[number];
type NavSizeVariant = (typeof defaultNavSizes)[number];

export function useNavThemeColorConfig(variant: NavColorVariant, userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { colorPrimary } = useBrandColors(options);
    const { contrastTextColorLight, contrastTextColorDark } = useContrastTextColor(options);

    return {
        /**
         * @variant light
         */
        light: {
            color: ref(contrastTextColorLight),
            item: {
                active: {
                    color: ref(colorPrimary)
                }
            }
        },
        /**
         * @variant dark
         */
        dark: {
            color: ref(contrastTextColorDark),
            item: {
                active: {
                    color: ref(colorPrimary)
                }
            }
        }
    }[variant];
}

export function useNavThemeSizeConfig(variant: NavSizeVariant, userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { fontSizeSm, fontSizeMd, fontSizeLg } = useFontSize(options);
    const { spacingSm, spacingMd, spacingLg } = useSpacing(options);

    return {
        sm: {
            fontSize: ref(fontSizeSm),
            padding: {
                top: ref(spacingSm),
                right: ref(spacingSm),
                bottom: ref(spacingSm),
                left: ref(spacingSm)
            }
        },
        md: {
            fontSize: ref(fontSizeMd),
            padding: {
                top: ref(spacingMd),
                right: ref(spacingMd),
                bottom: ref(spacingMd),
                left: ref(spacingMd)
            }
        },
        lg: {
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

export function useNavThemeConfig(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { fontWeightSemibold } = useFontWeight(options);
    const { textColorWeak } = useTextColor(options);
    const { transitionProperty, transitionDuration, transitionTimingFunction } =
        useTransition(options);

    return merge(
        {
            transition: {
                property: ref(transitionProperty),
                duration: ref(transitionDuration),
                timingFunction: ref(transitionTimingFunction)
            },
            item: {
                active: {
                    fontWeight: ref(fontWeightSemibold)
                },
                disabled: {
                    color: ref(textColorWeak)
                }
            }
        },
        useNavThemeColorConfig(defaultNavColor, options),
        useNavThemeSizeConfig(defaultNavSize, options)
    );
}

/**
 * Variables
 */

export function useNavThemeColorVariables(
    variant: NavColorVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables([ns, variant] as const, useNavThemeColorConfig(variant, options), {
        ...options,
        registerComposed: false
    });
}

export function useNavThemeSizeVariables(variant: NavSizeVariant, userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables([ns, variant] as const, useNavThemeSizeConfig(variant, options), {
        ...options,
        registerComposed: false
    });
}

export function useNavThemeVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables(ns, useNavThemeConfig(options), {
        ...options,
        registerComposed: false
    });
}

/**
 * Selectors
 */

export function useNavThemeLayoutSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    selector(
        `.nav`,
        {
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            paddingLeft: 0,
            marginBottom: 0,
            listStyle: 'none'
        },
        options
    );

    selector(
        `.nav.-direction-row`,
        {
            flexDirection: 'row',
            justifyContent: 'flex-start'
        },
        options
    );

    selector(
        `.nav.-direction-column`,
        {
            flexDirection: 'column',
            alignItems: 'flex-start'
        },
        options
    );
}

export function useNavThemeSizeSelectors(variant: NavSizeVariant, userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { navFontSize, navPaddingTop, navPaddingRight, navPaddingBottom, navPaddingLeft } =
        useNavThemeVariables(options);

    const {
        variantFontSize,
        variantPaddingTop,
        variantPaddingRight,
        variantPaddingBottom,
        variantPaddingLeft
    } = setExportsNamespace(useNavThemeSizeVariables(variant, options), 'variant');

    selector(
        `.nav.-${variant}`,
        {
            [toVariableKey(navFontSize)]: ref(variantFontSize),
            [toVariableKey(navPaddingTop)]: ref(variantPaddingTop),
            [toVariableKey(navPaddingRight)]: ref(variantPaddingRight),
            [toVariableKey(navPaddingBottom)]: ref(variantPaddingBottom),
            [toVariableKey(navPaddingLeft)]: ref(variantPaddingLeft)
        },
        options
    );
}

export function useNavThemeColorSelectors(
    variant: NavColorVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { navColor, navItemActiveColor } = useNavThemeVariables(options);
    const { variantColor, variantItemActiveColor } = setExportsNamespace(
        useNavThemeColorVariables(variant, options),
        'variant'
    );

    selector(
        `.nav.-${variant}`,
        {
            [toVariableKey(navColor)]: ref(variantColor),
            [toVariableKey(navItemActiveColor)]: ref(variantItemActiveColor)
        },
        options
    );
}

/**
 * Composables
 */

export function useNavThemeSizes(sizes: NavSizeVariant[], userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    sizes.forEach((size) => useNavThemeSizeSelectors(size, options));
}

export function useNavThemeColors(colors: NavColorVariant[], userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    colors.forEach((color) => useNavThemeColorSelectors(color, options));
}

export function useNavTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useNavThemeVariables(options);
    useNavThemeLayoutSelectors(options);
    useNavThemeSizes([...defaultNavSizes], options);
    useNavThemeColors([...defaultNavColors], options);
}
