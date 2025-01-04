import {
    defaultDefinitionOptions,
    ref,
    selector,
    nsvariables,
    vref,
    toVariableKey,
    setExportsNamespace
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

export function useBreadcrumbThemeColorConfig(variant?: BreadcrumbColorVariant) {
    const {
        contrastTextColorLightH,
        contrastTextColorLightS,
        contrastTextColorLightL,
        contrastTextColorLightA,
        contrastTextColorDarkH,
        contrastTextColorDarkS,
        contrastTextColorDarkL,
        contrastTextColorDarkA
    } = useContrastTextColor();

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
    }[variant ?? defaultBreadcrumbColor];
}

export function useBreadcrumbThemeSizeConfig(variant?: BreadcrumbSizeVariant) {
    const { fontSizeSm, fontSizeMd, fontSizeLg } = useFontSize();
    const { spacingSm, spacingMd, spacingLg } = useSpacing();

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
    }[variant ?? defaultBreadcrumbSize];
}

export function useBreadcrumbThemeConfig() {
    const { spacing } = useSpacing();
    const { textColorWeaker } = useTextColor();
    const { transitionProperty, transitionDuration, transitionTimingFunction } = useTransition();

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
        useBreadcrumbThemeColorConfig(),
        useBreadcrumbThemeSizeConfig()
    );
}

/**
 * Variables
 */

export function useBreadcrumbThemeColorVariables(
    variant?: BreadcrumbColorVariant,
    options = defaultDefinitionOptions
) {
    return nsvariables(ns, useBreadcrumbThemeColorConfig(variant), {
        ...options,
        registerComposed: false
    });
}

export function useBreadcrumbThemeSizeVariables(
    variant?: BreadcrumbSizeVariant,
    options = defaultDefinitionOptions
) {
    return nsvariables(ns, useBreadcrumbThemeSizeConfig(variant), {
        ...options,
        registerComposed: false
    });
}

export function useBreadcrumbThemeVariables(options = defaultDefinitionOptions) {
    return nsvariables(ns, useBreadcrumbThemeConfig(), {
        ...options,
        registerComposed: false
    });
}

/**
 * Selectors
 */

export function useBreadcrumbThemeLayout() {
    selector('.breadcrumb', {
        display: 'flex'
    });

    selector('.breadcrumb ol', {
        display: 'flex',
        flexWrap: 'wrap',
        paddingLeft: 0,
        listStyle: 'none'
    });
}

export function useBreadcrumbThemeBaseSelectors() {
    const {
        breadcrumbPadding,
        breadcrumbMargin,
        breadcrumbFontSize,
        breadcrumbTransitionProperty,
        breadcrumbTransitionDuration,
        breadcrumbTransitionTimingFunction
    } = useBreadcrumbThemeVariables();

    selector('.breadcrumb', {
        fontSize: ref(breadcrumbFontSize),
        padding: vref(breadcrumbPadding),
        margin: vref(breadcrumbMargin),
        transitionProperty: ref(breadcrumbTransitionProperty),
        transitionDuration: ref(breadcrumbTransitionDuration),
        transitionTimingFunction: ref(breadcrumbTransitionTimingFunction)
    });
}

export function useBreadcrumbThemeSizeSelectors(variant: BreadcrumbSizeVariant) {
    const {
        breadcrumbFontSize,
        breadcrumbPaddingTop,
        breadcrumbPaddingRight,
        breadcrumbPaddingBottom,
        breadcrumbPaddingLeft
    } = useBreadcrumbThemeVariables();
    const {
        variantFontSize,
        variantPaddingTop,
        variantPaddingRight,
        variantPaddingBottom,
        variantPaddingLeft
    } = setExportsNamespace(useBreadcrumbThemeSizeVariables(variant), 'variant');

    selector(`.breadcrumb.-${variant}`, {
        [toVariableKey(breadcrumbFontSize)]: ref(variantFontSize),
        [toVariableKey(breadcrumbPaddingTop)]: ref(variantPaddingTop),
        [toVariableKey(breadcrumbPaddingRight)]: ref(variantPaddingRight),
        [toVariableKey(breadcrumbPaddingBottom)]: ref(variantPaddingBottom),
        [toVariableKey(breadcrumbPaddingLeft)]: ref(variantPaddingLeft)
    });
}

export function useBreadcrumbThemeColorSelectors(variant: BreadcrumbColorVariant) {
    const { breadcrumbColorH, breadcrumbColorS, breadcrumbColorL, breadcrumbColorA } =
        useBreadcrumbThemeVariables();
    const { variantColorH, variantColorS, variantColorL, variantColorA } = setExportsNamespace(
        useBreadcrumbThemeColorVariables(variant),
        'variant'
    );

    selector(`.breadcrumb.-${variant}`, {
        [toVariableKey(breadcrumbColorH)]: ref(variantColorH),
        [toVariableKey(breadcrumbColorS)]: ref(variantColorS),
        [toVariableKey(breadcrumbColorL)]: ref(variantColorL),
        [toVariableKey(breadcrumbColorA)]: ref(variantColorA)
    });
}

/**
 * Composables
 */

export function useBreadcrumbThemeSizes(sizes = defaultBreadcrumbSizes) {
    sizes.forEach(useBreadcrumbThemeSizeSelectors);
}

export function useBreadcrumbThemeColors(colors = defaultBreadcrumbColors) {
    colors.forEach(useBreadcrumbThemeColorSelectors);
}

export function useBreadcrumbTheme() {
    useBreadcrumbThemeLayout();
    useBreadcrumbThemeBaseSelectors();
    useBreadcrumbThemeSizes();
    useBreadcrumbThemeColors();
}
