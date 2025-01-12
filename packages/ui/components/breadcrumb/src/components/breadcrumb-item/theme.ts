import { DefinitionOptions, ref, selector, vref } from '@inkline/core';
import { useBreadcrumbThemeVariables } from '../breadcrumb/theme';

export function useBreadcrumbItemThemeLayout(options: DefinitionOptions) {
    const { breadcrumbSeparator } = useBreadcrumbThemeVariables(options);

    selector(
        '.breadcrumb-item',
        {
            marginBottom: 0
        },
        options
    );

    selector(
        '.breadcrumb-item:first-of-type',
        {
            paddingLeft: 0
        },
        options
    );

    selector(
        '.breadcrumb-item > span',
        {
            display: 'inline-block'
        },
        options
    );

    selector(
        '.breadcrumb-item + .breadcrumb-item::before',
        {
            display: 'inline-block',
            content: ref(breadcrumbSeparator)
        },
        options
    );
}

export function useBreadcrumbItemThemeBase(options: DefinitionOptions) {
    const { breadcrumbPaddingLeft, breadcrumbPaddingRight, breadcrumbActiveColor } =
        useBreadcrumbThemeVariables(options);

    selector(
        '.breadcrumb-item',
        {
            paddingLeft: ref(breadcrumbPaddingLeft)
        },
        options
    );

    selector(
        '.breadcrumb-item + .breadcrumb-item::before',
        {
            paddingRight: ref(breadcrumbPaddingRight)
        },
        options
    );

    selector(
        '.breadcrumb-item.-active, .breadcrumb-item.-active a',
        {
            color: vref(breadcrumbActiveColor)
        },
        options
    );
}

export function useBreadcrumbItemTheme(options: DefinitionOptions) {
    useBreadcrumbItemThemeLayout(options);
    useBreadcrumbItemThemeBase(options);
}
