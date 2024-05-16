import type { RawTheme } from '../../../../../types';

export const kbd: RawTheme['elements']['kbd'] = {
    background: 'var(--color-dark)',
    borderRadius: {
        topLeft: 'var(--border-top-left-radius)',
        topRight: 'var(--border-top-right-radius)',
        bottomRight: 'var(--border-bottom-right-radius)',
        bottomLeft: 'var(--border-bottom-left-radius)'
    },
    color: 'var(--contrast-text-color-dark)',
    fontFamily: 'var(--font-family-monospace)',
    fontSize: 'var(--font-size-sm)',
    padding: {
        top: '0.1875rem',
        right: '0.375rem',
        bottom: '0.1875rem',
        left: '0.375rem'
    }
};
