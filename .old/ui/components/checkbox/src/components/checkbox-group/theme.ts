import { defaultDefinitionOptions, DefinitionOptions, selector } from '@inkline/core';

export function useCheckboxGroupTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    selector(
        '.checkbox-group',
        {
            display: 'flex',
            flexDirection: 'column'
        },
        options
    );

    selector(
        '.checkbox-group.-inline',
        {
            flexDirection: 'row'
        },
        options
    );
}
