import { selector } from '@inkline/core';

export function useAbbrThemeBase() {
    selector('abbr[title]', {
        cursor: 'help',
        textDecorationSkipInk: 'none'
    });
}

export function useAbbrTheme() {
    useAbbrThemeBase();
}
