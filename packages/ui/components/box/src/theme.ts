import { selector, DefinitionOptions, defaultDefinitionOptions } from '@inkline/core';

const ns = 'box';

/**
 * Selectors
 */

export function useBoxThemeLayoutSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    selector(
        '.box',
        {
            boxSizing: 'border-box'
        },
        options
    );
}

/**
 * Composables
 */

export function useBoxTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useBoxThemeLayoutSelectors(options);
}
