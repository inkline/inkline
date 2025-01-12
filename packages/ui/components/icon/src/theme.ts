import { useFontSize } from '@inkline/theme';
import {
    ref,
    selector,
    nsvariables,
    DefinitionOptions,
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

export function useIconThemeSizeConfig(variant: IconSizeVariant, options: DefinitionOptions) {
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

export function useIconThemeConfig(options: DefinitionOptions) {
    return merge({}, useIconThemeSizeConfig(defaultIconSize, options));
}

/**
 * Variables
 */

export function useIconThemeSizeVariables(variant: IconSizeVariant, options: DefinitionOptions) {
    return nsvariables(ns, useIconThemeSizeConfig(variant, options), {
        ...options,
        registerComposed: false
    });
}

export function useIconThemeVariables(options: DefinitionOptions) {
    return nsvariables(ns, useIconThemeConfig(options), {
        ...options,
        registerComposed: false
    });
}

/**
 * Selectors
 */

export function useIconThemeBaseSelectors(options: DefinitionOptions) {
    const { iconFontSize } = useIconThemeVariables(options);

    selector(
        '.icon',
        {
            fontSize: ref(iconFontSize)
        },
        options
    );
}

export function useIconThemeSizeSelectors(variant: IconSizeVariant, options: DefinitionOptions) {
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

export function useIconThemeSizes(sizes: IconSizeVariant[], options: DefinitionOptions) {
    sizes.forEach((size) => useIconThemeSizeSelectors(size, options));
}

export function useIconTheme(options: DefinitionOptions) {
    useIconThemeVariables(options);
    useIconThemeBaseSelectors(options);
    useIconThemeSizes([...defaultIconSizes], options);
}
