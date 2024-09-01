import { selector } from '@inkline/config';

export function useSummaryThemeBase() {
    selector('summary', {
        cursor: 'pointer'
    });
}

export function useSummaryTheme() {
    useSummaryThemeBase();
}
