import {
    ref,
    selector,
    nsvariables,
    vref,
    toVariableKey,
    setExportsNamespace,
    DefinitionOptions
} from '@inkline/core';
import { merge } from '@inkline/utils';
import {
    useFontSize,
    useContrastTextColor,
    useTextColor,
    useSpacing,
    useTransition
} from '@inkline/theme';

const ns = 'breadcrumb';

const defaultBreadcrumbColor = 'light';
const defaultBreadcrumbColors = ['light', 'dark'] as const;

const defaultBreadcrumbSize = 'md';
const defaultBreadcrumbSizes = ['sm', 'md', 'lg'] as const;

type BreadcrumbColorVariant = (typeof defaultBreadcrumbColors)[number];
type BreadcrumbSizeVariant = (typeof defaultBreadcrumbSizes)[number];

/**
 * Config
 */

export function useBreadcrumbThemeColorConfig(
    variant: BreadcrumbColorVariant,
    options: DefinitionOptions
) {
    const {
        contrastTextColorLightH,
        contrastTextColorLightS,
        contrastTextColorLightL,
        contrastTextColorLightA,
        contrastTextColorDarkH,
        contrastTextColorDarkS,
        contrastTextColorDarkL,
        contrastTextColorDarkA
    } = useContrastTextColor(options);

    return {
        light: {
            color: {
                h: ref(contrastTextColorLightH),
                s: ref(contrastTextColorLightS),
                l: ref(contrastTextColorLightL),
                a: ref(contrastTextColorLightA)
            }
        },
        dark: {
            color: {
                h: ref(contrastTextColorDarkH),
                s: ref(contrastTextColorDarkS),
                l: ref(contrastTextColorDarkL),
                a: ref(contrastTextColorDarkA)
            }
        }
    }[variant];
}

export function useBreadcrumbThemeSizeConfig(
    variant: BreadcrumbSizeVariant,
    options: DefinitionOptions
) {
    const { fontSizeSm, fontSizeMd, fontSizeLg } = useFontSize(options);
    const { spacingSm, spacingMd, spacingLg } = useSpacing(options);

    return {
        sm: {
            fontSize: ref(fontSizeSm),
            padding: {
                top: 0,
                right: ref(spacingSm),
                bottom: 0,
                left: ref(spacingSm)
            }
        },
        md: {
            fontSize: ref(fontSizeMd),
            padding: {
                top: 0,
                right: ref(spacingMd),
                bottom: 0,
                left: ref(spacingMd)
            }
        },
        lg: {
            fontSize: ref(fontSizeLg),
            padding: {
                top: 0,
                right: ref(spacingLg),
                bottom: 0,
                left: ref(spacingLg)
            }
        }
    }[variant];
}

export function useBreadcrumbThemeConfig(options: DefinitionOptions) {
    const { spacing } = useSpacing(options);
    const { textColorWeaker } = useTextColor(options);
    const { transitionProperty, transitionDuration, transitionTimingFunction } =
        useTransition(options);

    return merge(
        {
            margin: {
                bottom: ref(spacing)
            },
            separator: '"/"',
            transition: {
                property: ref(transitionProperty),
                duration: ref(transitionDuration),
                timingFunction: ref(transitionTimingFunction)
            },
            /**
             * @state active
             */
            active: {
                color: ref(textColorWeaker)
            }
        },
        useBreadcrumbThemeColorConfig(defaultBreadcrumbColor, options),
        useBreadcrumbThemeSizeConfig(defaultBreadcrumbSize, options)
    );
}

/**
 * Variables
 */

export function useBreadcrumbThemeColorVariables(
    variant: BreadcrumbColorVariant,
    options: DefinitionOptions
) {
    return nsvariables(ns, useBreadcrumbThemeColorConfig(variant, options), {
        ...options,
        registerComposed: false
    });
}

export function useBreadcrumbThemeSizeVariables(
    variant: BreadcrumbSizeVariant,
    options: DefinitionOptions
) {
    return nsvariables(ns, useBreadcrumbThemeSizeConfig(variant, options), {
        ...options,
        registerComposed: false
    });
}

export function useBreadcrumbThemeVariables(options: DefinitionOptions) {
    return nsvariables(ns, useBreadcrumbThemeConfig(options), {
        ...options,
        registerComposed: false
    });
}

/**
 * Selectors
 */

export function useBreadcrumbThemeLayout(options: DefinitionOptions) {
    selector(
        '.breadcrumb',
        {
            display: 'flex'
        },
        options
    );

    selector(
        '.breadcrumb ol',
        {
            display: 'flex',
            flexWrap: 'wrap',
            paddingLeft: 0,
            listStyle: 'none'
        },
        options
    );
}

export function useBreadcrumbThemeBaseSelectors(options: DefinitionOptions) {
    const {
        breadcrumbPadding,
        breadcrumbMargin,
        breadcrumbFontSize,
        breadcrumbTransitionProperty,
        breadcrumbTransitionDuration,
        breadcrumbTransitionTimingFunction
    } = useBreadcrumbThemeVariables(options);

    selector(
        '.breadcrumb',
        {
            fontSize: ref(breadcrumbFontSize),
            padding: vref(breadcrumbPadding),
            margin: vref(breadcrumbMargin),
            transitionProperty: ref(breadcrumbTransitionProperty),
            transitionDuration: ref(breadcrumbTransitionDuration),
            transitionTimingFunction: ref(breadcrumbTransitionTimingFunction)
        },
        options
    );
}

export function useBreadcrumbThemeSizeSelectors(
    variant: BreadcrumbSizeVariant,
    options: DefinitionOptions
) {
    const {
        breadcrumbFontSize,
        breadcrumbPaddingTop,
        breadcrumbPaddingRight,
        breadcrumbPaddingBottom,
        breadcrumbPaddingLeft
    } = useBreadcrumbThemeVariables(options);
    const {
        variantFontSize,
        variantPaddingTop,
        variantPaddingRight,
        variantPaddingBottom,
        variantPaddingLeft
    } = setExportsNamespace(useBreadcrumbThemeSizeVariables(variant, options), 'variant');

    selector(
        `.breadcrumb.-${variant}`,
        {
            [toVariableKey(breadcrumbFontSize)]: ref(variantFontSize),
            [toVariableKey(breadcrumbPaddingTop)]: ref(variantPaddingTop),
            [toVariableKey(breadcrumbPaddingRight)]: ref(variantPaddingRight),
            [toVariableKey(breadcrumbPaddingBottom)]: ref(variantPaddingBottom),
            [toVariableKey(breadcrumbPaddingLeft)]: ref(variantPaddingLeft)
        },
        options
    );
}

export function useBreadcrumbThemeColorSelectors(
    variant: BreadcrumbColorVariant,
    options: DefinitionOptions
) {
    const { breadcrumbColorH, breadcrumbColorS, breadcrumbColorL, breadcrumbColorA } =
        useBreadcrumbThemeVariables(options);
    const { variantColorH, variantColorS, variantColorL, variantColorA } = setExportsNamespace(
        useBreadcrumbThemeColorVariables(variant, options),
        'variant'
    );

    selector(
        `.breadcrumb.-${variant}`,
        {
            [toVariableKey(breadcrumbColorH)]: ref(variantColorH),
            [toVariableKey(breadcrumbColorS)]: ref(variantColorS),
            [toVariableKey(breadcrumbColorL)]: ref(variantColorL),
            [toVariableKey(breadcrumbColorA)]: ref(variantColorA)
        },
        options
    );
}

/**
 * Composables
 */

export function useBreadcrumbThemeSizes(
    sizes: BreadcrumbSizeVariant[],
    options: DefinitionOptions
) {
    sizes.forEach((size) => useBreadcrumbThemeSizeSelectors(size, options));
}

export function useBreadcrumbThemeColors(
    colors: BreadcrumbColorVariant[],
    options: DefinitionOptions
) {
    colors.forEach((color) => useBreadcrumbThemeColorSelectors(color, options));
}

export function useBreadcrumbTheme(options: DefinitionOptions) {
    useBreadcrumbThemeLayout(options);
    useBreadcrumbThemeBaseSelectors(options);
    useBreadcrumbThemeColors([...defaultBreadcrumbColors], options);
    useBreadcrumbThemeSizes([...defaultBreadcrumbSizes], options);
}
