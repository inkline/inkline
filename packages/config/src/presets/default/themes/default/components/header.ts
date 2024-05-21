import type { RawTheme } from '../../../../../types';

export const header: RawTheme['components']['header'] = {
    default: {
        background: 'var(--color-white)',
        color: 'var(--contrast-text-color-light)',
        padding: {
            top: '10rem',
            right: 0,
            bottom: '10rem',
            left: 0
        },
        transition: {
            property: 'background-color, color',
            duration: 'var(--transition-duration)',
            timingFunction: 'var(--transition-timing-function)'
        }
    },
    primary: {
        background: 'var(--color-primary)',
        color: 'var(--contrast-text-color-dark)'
    },
    light: {
        background: 'var(--color-light)',
        color: 'var(--contrast-text-color-light)'
    },
    dark: {
        background: 'var(--color-dark)',
        color: 'var(--contrast-text-color-dark)'
    },
    sm: {
        padding: {
            top: 'calc(10rem * var(--size-multiplier-sm))',
            right: 0,
            bottom: 'calc(10rem * var(--size-multiplier-sm))',
            left: 0
        }
    },
    md: {
        padding: {
            top: 'calc(10rem * var(--size-multiplier-md))',
            right: 0,
            bottom: 'calc(10rem * var(--size-multiplier-md))',
            left: 0
        }
    },
    lg: {
        padding: {
            top: 'calc(10rem * var(--size-multiplier-lg))',
            right: 0,
            bottom: 'calc(10rem * var(--size-multiplier-lg))',
            left: 0
        }
    }
};
