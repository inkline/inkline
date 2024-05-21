import type { RawTheme, RawThemeElement } from '../../../../../types';

export const hr: RawTheme['elements']['hr'] = {
    margin: {
        top: 'var(--margin-top)',
        right: 0,
        bottom: 'var(--margin-bottom)',
        left: 0
    },
    color: 'inherit',
    border: {
        top: {
            width: 'var(--border-top-width)',
            style: 'var(--border-top-style)',
            color: 'var(--border-top-color)'
        }
    }
} as RawThemeElement;
