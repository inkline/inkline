import { useFontSize } from '@inkline/theme';
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

const defaultIconSize = 'md';
const defaultIconSizes = ['sm', 'md', 'lg'] as const;

type IconSizeVariant = (typeof defaultIconSizes)[number];

/**
 * Config
 */

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

    return merge({}, useIconThemeSizeConfig(defaultIconSize, options));
}

/**
 * Variables
 */

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

    const { iconFontSize } = useIconThemeVariables(options);

    selector(
        '.icon',
        {
            overflow: 'visible',
            fontSize: ref(iconFontSize)
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

export function useIconThemeSizes(sizes: IconSizeVariant[], userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    sizes.forEach((size) => useIconThemeSizeSelectors(size, options));
}

export function useIconTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useIconThemeVariables(options);
    useIconThemeBaseSelectors(options);
    useIconThemeSizes([...defaultIconSizes], options);
}
