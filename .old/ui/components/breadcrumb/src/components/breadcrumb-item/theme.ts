import { DefinitionOptions, defaultDefinitionOptions, ref, selector, variant } from '@inkline/core';
import { useBreadcrumbThemeVariables } from '../breadcrumb/theme';

export function useBreadcrumbItemThemeLayout(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { breadcrumbSeparator, breadcrumbGap } = useBreadcrumbThemeVariables(options);

    selector(
        ['.breadcrumb-item', '.breadcrumb-item:hover'],
        {
            color: 'inherit'
        },
        options
    );

    selector(
        [
            '.breadcrumb-item[data-active="true"]',
            '.breadcrumb-item[data-active="true"]:hover',
            '.breadcrumb-item[data-disabled="true"]',
            '.breadcrumb-item[data-disabled="true"]:hover'
        ],
        {
            textDecoration: 'none'
        },
        options
    );

    selector(
        ['.breadcrumb-item[to]', '.breadcrumb-item[href]'],
        {
            cursor: 'pointer'
        },
        options
    );

    selector(
        '.breadcrumb-item + .breadcrumb-item::before',
        {
            display: 'inline-block',
            content: ref(breadcrumbSeparator),
            marginRight: ref(breadcrumbGap)
        },
        options
    );
}

/**
 * Variants
 */

export function useBreadcrumbItemThemeVariants(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    variant(
        'breadcrumb-item--disabled',
        {
            color: 'weaker'
        },
        options
    );

    variant(
        'breadcrumb-item--active',
        {
            color: 'weakest'
        },
        options
    );
}

export function useBreadcrumbItemTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useBreadcrumbItemThemeLayout(options);
    useBreadcrumbItemThemeVariants(options);
}
