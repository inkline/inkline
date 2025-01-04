import { selector } from '@inkline/core';

export function useSummaryThemeSelectors() {
    selector('summary', {
        cursor: 'pointer'
    });
}

export function useSummaryTheme() {
    useSummaryThemeSelectors();
}
