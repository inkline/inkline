import { defaultDefinitionOptions, DefinitionOptions, selector } from '@inkline/core';

export function useIframeThemeSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    selector('iframe', {
        border: 0
    }, options);
}

export function useIframeTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useIframeThemeSelectors(options);
}
