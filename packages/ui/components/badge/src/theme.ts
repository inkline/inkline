import { ref, selector, variant, DefinitionOptions, defaultDefinitionOptions } from '@inkline/core';
import { useFontWeight, useFontSize } from '@inkline/theme';

const ns = 'badge';

const defaultBadgeColors = [
    'light',
    'dark',
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info'
] as const;

const defaultBadgeSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

/**
 * Selectors
 */

export function useBadgeThemeLayoutSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    selector(
        '.badge',
        {
            lineHeight: 1,
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        options
    );

    selector(
        'a:hover .badge, a:focus .badge',
        {
            textDecoration: 'none'
        },
        options
    );
}

/**
 * Variants
 */

export function useBadgeThemeVariants(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const fontSizeMap = {
        xs: '2xs',
        sm: 'xs',
        md: 'md',
        lg: 'lg',
        xl: 'xl'
    };

    const boxWideMap = {
        xs: '3xs',
        sm: '2xs',
        md: 'xs',
        lg: 'sm',
        xl: 'md'
    };

    defaultBadgeSizes.forEach((size) => {
        variant(
            `badge:${size}`,
            {
                extends: `box:wide:${boxWideMap[size]}`,
                fontSize: fontSizeMap[size]
            },
            options
        );
    });

    defaultBadgeColors.forEach((color) => {
        variant(
            `badge:${color}`,
            {
                extends: color
            },
            options
        );
    });

    variant(
        'badge:inherit',
        {
            fontSize: 'inherit'
        },
        options
    );

    variant(
        `badge:pill`,
        {
            borderRadius: 'full'
        },
        options
    );

    variant(
        'badge',
        {
            extends: ['default', 'badge:md'],
            fontWeight: 'semibold'
        },
        options
    );
}

/**
 * Composables
 */

export function useBadgeTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useBadgeThemeLayoutSelectors(options);
    useBadgeThemeVariants(options);
}
