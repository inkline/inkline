import { selector } from '@inkline/core';

export function useSummaryThemeBase() {
    selector('summary', {
        cursor: 'pointer'
    });
}

export function useSummaryTheme() {
    useSummaryThemeBase();
}
