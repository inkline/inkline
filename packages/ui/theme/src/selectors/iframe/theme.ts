import { selector } from '@inkline/core';

export function useIframeThemeSelectors() {
    selector('iframe', {
        border: 0
    });
}

export function useIframeTheme() {
    useIframeThemeSelectors();
}
