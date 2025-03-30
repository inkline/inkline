import { selector, DefinitionOptions, defaultDefinitionOptions } from '@inkline/core';

const ns = 'alert';

/**
 * Selectors
 */

export function useAlertThemeLayoutSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    selector(
        '.alert',
        {
            width: '100%'
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
 * Composables
 */

export function useAlertTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useAlertThemeLayoutSelectors(options);
    useAlertThemeBaseSelectors(options);
}
