import { defaultDefinitionOptions, DefinitionOptions, selector } from '@inkline/core';

export function useImgThemeSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    selector('img, svg', {
        verticalAlign: 'middle'
    }, options);
}

export function useImgTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useImgThemeSelectors(options);
}
