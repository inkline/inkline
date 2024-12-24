import { selector } from '@inkline/core';

export function useIframeThemeBase() {
    selector('iframe', {
        border: 0
    });
}

export function useIframeTheme() {
    useIframeThemeBase();
}
