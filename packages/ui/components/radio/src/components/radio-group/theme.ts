import { selector } from '@inkline/core';

export function useRadioGroupTheme(userOptions: DefinitionOptions) {
    const options = selector('.radio-group', {
        display: 'flex',
        flexDirection: 'column'
    });

    selector('.radio-group.-inline', {
        flexDirection: 'row'
    });
}
