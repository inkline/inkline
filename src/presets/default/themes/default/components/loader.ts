import type { RawTheme } from '../../../../../types';

export const loader: RawTheme['components']['loader'] = {
    default: {
        animation: {
            duration: '1.2s'
        },
        background: 'var(--color-primary)',
        width: '64px',
        height: '64px'
    },
    light: {
        background: 'var(--contrast-text-color-light)'
    },
    dark: {
        background: 'var(--contrast-text-color-dark)'
    },
    primary: {
        background: 'var(--color-primary)'
    },
    sm: {
        width: 'calc(64px * var(--size-multiplier-sm))'
    },
    md: {
        width: 'calc(64px * var(--size-multiplier-md))'
    },
    lg: {
        width: 'calc(64px * var(--size-multiplier-lg))'
    }
};
