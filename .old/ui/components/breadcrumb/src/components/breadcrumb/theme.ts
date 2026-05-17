import {
    selector,
    nsvariables,
    DefinitionOptions,
    defaultDefinitionOptions,
    variant,
    ref
} from '@inkline/core';
import { useSpacing } from '@inkline/theme';

const ns = 'breadcrumb';

const defaultBreadcrumbColors = ['light', 'dark'] as const;
const defaultBreadcrumbSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

/**
 * Config
 */

export function useBreadcrumbThemeConfig(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { spacing } = useSpacing(options);

    return {
        separator: '"/"',
        gap: ref(spacing)
    };
}

/**
 * Variables
 */

export function useBreadcrumbThemeVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables(ns, useBreadcrumbThemeConfig(options), {
        ...options,
        registerComposed: false
    });
}

/**
 * Selectors
 */

export function useBreadcrumbThemeLayout(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { breadcrumbGap } = useBreadcrumbThemeVariables(options);

    selector(
        '.breadcrumb',
        {
            display: 'flex',
            gap: ref(breadcrumbGap)
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

/**
 * Variants
 */

export function useBreadcrumbThemeVariants(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    defaultBreadcrumbSizes.forEach((size) => {
        variant(
            `breadcrumb--${size}`,
            {
                fontSize: size
            },
            options
        );
    });

    defaultBreadcrumbColors.forEach((color) => {
        variant(
            `breadcrumb--${color}`,
            {
                color: `{{${color}.color}}`
            },
            options
        );
    });

    variant(
        'breadcrumb',
        {
            color: '{{default.color}}'
        },
        options
    );
}

/**
 * Composables
 */

export function useBreadcrumbTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useBreadcrumbThemeVariables(options);
    useBreadcrumbThemeLayout(options);
    useBreadcrumbThemeVariants(options);
}
