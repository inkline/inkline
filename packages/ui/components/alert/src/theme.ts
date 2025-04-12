import { selector, variant, DefinitionOptions, defaultDefinitionOptions } from '@inkline/core';

const ns = 'alert';

const defaultAlertSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
const defaultAlertColors = ['info', 'success', 'warning', 'danger'] as const;

/**
 * Selectors
 */

export function useAlertThemeLayoutSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    selector(
        '.alert',
        {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start'
        },
        options
    );

    selector(
        '.alert-content',
        {
            flexGrow: '1'
        },
        options
    );

    selector(
        '.alert-icon',
        {
            display: 'inline-flex',
            alignItems: 'center'
        },
        options
    );

    selector(
        '.alert-dismiss',
        {
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center'
        },
        options
    );

    selector(
        '.alert a',
        {
            color: 'inherit',
            fontWeight: '600'
        },
        options
    );
}

export function useAlertThemeBaseSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    selector(
        '.alert-content *:first-child',
        {
            marginTop: 0
        },
        options
    );

    selector(
        '.alert-content *:last-child',
        {
            marginBottom: 0
        },
        options
    );

    selector(
        '.alert code',
        {
            background: 'hsla(0, 0%, 0%, 0.05)'
        },
        options
    );
}

/**
 * Variants
 */

export function useAlertVariants(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    defaultAlertSizes.forEach((size) => {
        variant(
            `alert--${size}`,
            {
                extends: [`box--${size}`]
            },
            options
        );
    });

    defaultAlertColors.forEach((color) => {
        variant(
            `alert--${color}`,
            {
                extends: [`${color}--tint`]
            },
            options
        );
    });

    variant(
        'alert',
        {
            extends: ['alert--md', 'alert--info'],
            gap: 'default'
        },
        options
    );
}

/**
 * Composables
 */

export function useAlertTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useAlertThemeLayoutSelectors(options);
    useAlertThemeBaseSelectors(options);
    useAlertVariants(options);
}
