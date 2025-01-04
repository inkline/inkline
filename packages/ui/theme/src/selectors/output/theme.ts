import { selector } from '@inkline/core';

export function useOutputThemeSelectors() {
    selector('output', {
        display: 'inline-block'
    });
}

export function useOutputTheme() {
    useOutputThemeSelectors();
}
