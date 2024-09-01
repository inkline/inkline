import { selector } from '@inkline/config';

export function useAbbrThemeBase() {
    selector('abbr[title]', {
        cursor: 'help',
        textDecorationSkipInk: 'none'
    });
}

export function useAbbrTheme() {
    useAbbrThemeBase();
}
