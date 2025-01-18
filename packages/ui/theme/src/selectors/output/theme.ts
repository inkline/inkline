import { defaultDefinitionOptions, DefinitionOptions, selector } from '@inkline/core';

export function useOutputThemeSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    selector('output', {
        display: 'inline-block'
    }, options);
}

export function useOutputTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useOutputThemeSelectors(options);
}
