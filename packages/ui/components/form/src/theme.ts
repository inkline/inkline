import { selector } from '@inkline/core';

export function useFormThemeLayout() {
    selector('.form', {
        position: 'relative'
    });
}

export function useFormTheme() {
    useFormThemeLayout();
}
