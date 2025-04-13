import { defaultDefinitionOptions, DefinitionOptions, selector } from '@inkline/core';

export function useAbbrThemeSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    selector('abbr[title]', {
        cursor: 'help',
        textDecorationSkipInk: 'none'
    }, options);
}

export function useAbbrTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useAbbrThemeSelectors(options);
}
