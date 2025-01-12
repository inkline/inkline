import { DefinitionOptions, selector } from '@inkline/core';

export function useFormThemeLayoutSelectors(options: DefinitionOptions) {
    selector(
        '.form',
        {
            position: 'relative'
        },
        options
    );
}

export function useFormTheme(options: DefinitionOptions) {
    useFormThemeLayoutSelectors(options);
}
