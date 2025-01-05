import { selector } from '@inkline/core';

export function useRadioGroupTheme(options: DefinitionOptions
)
{
    selector('.radio-group', {
        display: 'flex',
        flexDirection: 'column'
    });

    selector('.radio-group.-inline', {
        flexDirection: 'row'
    });
}
