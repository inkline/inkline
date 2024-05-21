import type { RawTheme } from '../../../../types';

export const size: RawTheme['size'] = {
    multiplier: {
        default: 1,
        xxs: { divide: 'var(--scale-ratio-pow-3)' },
        xs: { divide: 'var(--scale-ratio-pow-2)' },
        sm: { divide: 'var(--scale-ratio-pow-1)' },
        md: 'var(--size-multiplier)',
        lg: { multiply: 'var(--scale-ratio-pow-1)' },
        xl: { multiply: 'var(--scale-ratio-pow-2)' },
        xxl: { multiply: 'var(--scale-ratio-pow-3)' }
    },
    percentages: {
        default: '',
        0: '0%',
        25: '25%',
        50: '50%',
        75: '75%',
        100: '100%'
    }
};
