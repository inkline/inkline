import type { RawTheme } from '../../../../../types';

export const icon: RawTheme['components']['icon'] = {
    default: {
        fontSize: 'var(--font-size)'
    },
    xs: {
        fontSize: 'var(--font-size-xs)'
    },
    sm: {
        fontSize: 'var(--font-size-sm)'
    },
    md: {
        fontSize: 'var(--font-size-md)'
    },
    lg: {
        fontSize: 'var(--font-size-lg)'
    },
    xl: {
        fontSize: 'var(--font-size-xl)'
    },
    xxl: {
        fontSize: 'calc(var(--font-size) * var(--size-multiplier-xxl))'
    }
};
