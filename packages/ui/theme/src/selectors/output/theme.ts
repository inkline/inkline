import { DefinitionOptions, selector } from '@inkline/core';

export function useOutputThemeSelectors(options: DefinitionOptions) {
    selector('output', {
        display: 'inline-block'
    }, options);
}

export function useOutputTheme(options: DefinitionOptions) {
    useOutputThemeSelectors(options);
}
