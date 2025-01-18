import { DefinitionOptions, defaultDefinitionOptions, selector } from '@inkline/core';

export function useFormThemeLayoutSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    selector(
        '.form',
        {
            position: 'relative'
        },
        options
    );
}

export function useFormTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useFormThemeLayoutSelectors(options);
}
