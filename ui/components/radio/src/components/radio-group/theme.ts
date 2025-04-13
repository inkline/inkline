import { defaultDefinitionOptions, DefinitionOptions, selector } from '@inkline/core';

export function useRadioGroupTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    selector(
        '.radio-group',
        {
            display: 'flex',
            flexDirection: 'column'
        },
        options
    );

    selector(
        '.radio-group.-inline',
        {
            flexDirection: 'row'
        },
        options
    );
}
