import { defaultDefinitionOptions, DefinitionOptions, selector } from '@inkline/core';

export function useSummaryThemeSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    selector('summary', {
        cursor: 'pointer'
    }, options);
}

export function useSummaryTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useSummaryThemeSelectors(options);
}
