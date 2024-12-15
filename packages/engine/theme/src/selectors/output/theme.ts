import { selector } from '@inkline/core';

export function useOutputThemeBase() {
    selector('output', {
        display: 'inline-block'
    });
}

export function useOutputTheme() {
    useOutputThemeBase();
}
