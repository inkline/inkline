import { selector } from '@inkline/config';

export function useIframeThemeBase() {
    selector('iframe', {
        border: 0
    });
}

export function useIframeTheme() {
    useIframeThemeBase();
}
