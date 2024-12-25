import { selector } from '@inkline/core';

export function useCheckboxGroupTheme() {
    selector('.checkbox-group', {
        display: 'flex',
        flexDirection: 'column'
    });

    selector('.checkbox-group.-inline', {
        flexDirection: 'row'
    });
}
