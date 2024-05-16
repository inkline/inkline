import type { RawTheme } from '../../../../../types';

export const breadcrumb: RawTheme['components']['breadcrumb'] = {
    default: {
        color: 'var(--text-color-dark)',
        fontSize: 'var(--font-size)',
        margin: {
            top: 0,
            right: 0,
            bottom: 'var(--margin-bottom)',
            left: 0
        },
        padding: {
            top: 0,
            right: 'var(--padding-right)',
            bottom: 0,
            left: 'var(--padding-left)'
        },
        separator: '"/"',
        link: {
            color: 'var(--color-primary)'
        },
        active: {
            color: 'var(--color-gray-500)'
        }
    },
    light: {
        color: 'var(--contrast-text-color-light)'
    },
    dark: {
        color: 'var(--contrast-text-color-dark)'
    },
    sm: {
        fontSize: 'var(--font-size-sm)',
        padding: {
            top: 0,
            right: 'var(--padding-right-sm)',
            bottom: 0,
            left: 'var(--padding-left-sm)'
        }
    },
    md: {
        fontSize: 'var(--font-size-md)',
        padding: {
            top: 0,
            right: 'var(--padding-right-md)',
            bottom: 0,
            left: 'var(--padding-left-md)'
        }
    },
    lg: {
        fontSize: 'var(--font-size-lg)',
        padding: {
            top: 0,
            right: 'var(--padding-right-lg)',
            bottom: 0,
            left: 'var(--padding-left-lg)'
        }
    }
};
