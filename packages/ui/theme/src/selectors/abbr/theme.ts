import { DefinitionOptions, selector } from '@inkline/core';

export function useAbbrThemeSelectors(options: DefinitionOptions) {
    selector('abbr[title]', {
        cursor: 'help',
        textDecorationSkipInk: 'none'
    }, options);
}

export function useAbbrTheme(options: DefinitionOptions) {
    useAbbrThemeSelectors(options);
}
