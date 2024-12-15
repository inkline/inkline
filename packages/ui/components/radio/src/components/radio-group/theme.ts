import { selector } from '@inkline/core';

export function useRadioGroupTheme() {
    selector('.radio-group', {
        display: 'flex',
        flexDirection: 'column'
    });

    selector('.radio-group.-inline', {
        flexDirection: 'row'
    });
}
