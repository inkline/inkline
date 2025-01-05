import { DefinitionOptions, selector } from '@inkline/core';

export function useSummaryThemeSelectors(options: DefinitionOptions) {
    selector('summary', {
        cursor: 'pointer'
    }, options);
}

export function useSummaryTheme(options: DefinitionOptions) {
    useSummaryThemeSelectors(options);
}
