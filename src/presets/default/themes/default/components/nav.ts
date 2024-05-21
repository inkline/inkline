import type { RawTheme } from '../../../../../types';

export const nav: RawTheme['components']['nav'] = {
    default: {
        color: 'var(--contrast-text-color-light)',
        fontSize: 'var(--font-size)',
        transition: {
            property: 'color',
            duration: 'var(--transition-duration)',
            timingFunction: 'var(--transition-timing-function)'
        },
        padding: {
            top: 'var(--padding-top)',
            right: 'var(--padding-right)',
            bottom: 'var(--padding-bottom)',
            left: 'var(--padding-left)'
        },
        item: {
            active: {
                color: 'var(--color-primary)',
                fontWeight: 'var(--font-weight-semibold)'
            },
            disabled: {
                color: 'var(--text-color-weaker)'
            }
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
            top: 'var(--padding-top-sm)',
            right: 'var(--padding-right-sm)',
            bottom: 'var(--padding-bottom-sm)',
            left: 'var(--padding-left-sm)'
        }
    },
    md: {
        fontSize: 'var(--font-size-md)',
        padding: {
            top: 'var(--padding-top-md)',
            right: 'var(--padding-right-md)',
            bottom: 'var(--padding-bottom-md)',
            left: 'var(--padding-left-md)'
        }
    },
    lg: {
        fontSize: 'var(--font-size-lg)',
        padding: {
            top: 'var(--padding-top-lg)',
            right: 'var(--padding-right-lg)',
            bottom: 'var(--padding-bottom-lg)',
            left: 'var(--padding-left-lg)'
        }
    }
};
