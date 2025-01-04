import { selector } from '@inkline/core';

export function useAbbrThemeSelectors() {
    selector('abbr[title]', {
        cursor: 'help',
        textDecorationSkipInk: 'none'
    });
}

export function useAbbrTheme() {
    useAbbrThemeSelectors();
}
