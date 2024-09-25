import { selector } from '@inkline/config';

export function useOutputThemeBase() {
    selector('output', {
        display: 'inline-block'
    });
}

export function useOutputTheme() {
    useOutputThemeBase();
}
