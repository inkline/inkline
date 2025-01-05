import { DefinitionOptions, selector } from '@inkline/core';

export function useIframeThemeSelectors(options: DefinitionOptions) {
    selector('iframe', {
        border: 0
    }, options);
}

export function useIframeTheme(options: DefinitionOptions) {
    useIframeThemeSelectors(options);
}
