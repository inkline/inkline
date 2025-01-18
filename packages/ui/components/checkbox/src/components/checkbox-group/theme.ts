import { DefinitionOptions, selector } from '@inkline/core';

export function useCheckboxGroupTheme(options: DefinitionOptions) {
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
