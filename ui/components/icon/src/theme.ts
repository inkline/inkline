import { useColors, useFontSize } from '@inkline/theme';
import {
    ref,
    selector,
    nsvariables,
    DefinitionOptions,
    defaultDefinitionOptions,
    setExportsNamespace,
    toVariableKey
} from '@inkline/core';
import { merge } from '@inkline/utils';

const ns = 'icon';

const defaultIconColor = 'light';
const defaultIconColors = [
    'light',
    'dark',
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info'
] as const;

const defaultIconSize = 'md';
const defaultIconSizes = ['sm', 'md', 'lg'] as const;

type IconColorVariant = (typeof defaultIconColors)[number];
type IconSizeVariant = (typeof defaultIconSizes)[number];

/**
 * Config
 */

export function useIconThemeColorConfig(variant: IconColorVariant, userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        colorLight,
        colorDark,
        colorPrimary,
        colorSecondary,
        colorSuccess,
        colorDanger,
        colorWarning,
        colorInfo
    } = useColors(options);

    return {
        /**
         * @variant light
         */
        light: {
            color: ref(colorLight)
        },
        /**
         * @variant dark
         */
        dark: {
            color: ref(colorDark)
        },
        /**
         * @variant primary
         */
        primary: {
            color: ref(colorPrimary)
        },
        /**
         * @variant secondary
         */
        secondary: {
            color: ref(colorSecondary)
        },
        /**
         * @variant success
         */
        success: {
            color: ref(colorSuccess)
        },
        /**
         * @variant danger
         */
        danger: {
            color: ref(colorDanger)
        },
        /**
         * @variant warning
         */
        warning: {
            color: ref(colorWarning)
        },
        /**
         * @variant info
         */
        info: {
            color: ref(colorInfo)
        }
    }[variant];
}

export function useIconThemeSizeConfig(variant: IconSizeVariant, userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { fontSizeSm, fontSizeMd, fontSizeLg } = useFontSize(options);

    return {
        sm: {
            fontSize: ref(fontSizeSm)
        },
        md: {
            fontSize: ref(fontSizeMd)
        },
        lg: {
            fontSize: ref(fontSizeLg)
        }
    }[variant];
}

export function useIconThemeConfig(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return merge(
        {},
        useIconThemeColorConfig(defaultIconColor, options),
        useIconThemeSizeConfig(defaultIconSize, options)
    );
}

/**
 * Variables
 */

export function useIconThemeColorVariables(
    variant: IconColorVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables([ns, variant] as const, useIconThemeColorConfig(variant, options), {
        ...options,
        registerComposed: false
    });
}

export function useIconThemeSizeVariables(
    variant: IconSizeVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables(ns, useIconThemeSizeConfig(variant, options), {
        ...options,
        registerComposed: false
    });
}

export function useIconThemeVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables(ns, useIconThemeConfig(options), {
        ...options,
        registerComposed: false
    });
}

/**
 * Selectors
 */

export function useIconThemeBaseSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { iconFontSize, iconColor } = useIconThemeVariables(options);

    selector(
        '.icon',
        {
            color: ref(iconColor),
            overflow: 'visible',
            fontSize: ref(iconFontSize)
        },
        options
    );

    selector(
        '.icon.-inherit',
        {
            color: 'inherit'
        },
        options
    );
}

export function useIconThemeColorSelectors(
    variant: IconColorVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { iconColor } = useIconThemeVariables(options);

    const { variantColor } = setExportsNamespace(
        useIconThemeColorVariables(variant, options),
        'variant'
    );

    selector(
        `.icon.-${variant}`,
        {
            [toVariableKey(iconColor)]: ref(variantColor)
        },
        options
    );
}

export function useIconThemeSizeSelectors(
    variant: IconSizeVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { iconFontSize } = useIconThemeVariables(options);

    const { variantFontSize } = setExportsNamespace(
        useIconThemeSizeVariables(variant, options),
        'variant'
    );

    selector(
        `.icon.-${variant}`,
        {
            [toVariableKey(iconFontSize)]: ref(variantFontSize)
        },
        options
    );
}

export function useIconThemeColors(colors: IconColorVariant[], userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    colors.forEach((color) => useIconThemeColorSelectors(color, options));
}

export function useIconThemeSizes(sizes: IconSizeVariant[], userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    sizes.forEach((size) => useIconThemeSizeSelectors(size, options));
}

export function useIconTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useIconThemeVariables(options);
    useIconThemeBaseSelectors(options);
    useIconThemeColors([...defaultIconColors], options);
    useIconThemeSizes([...defaultIconSizes], options);
}
