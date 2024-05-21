import type { RawTheme } from '../../../../types';
import { sizeMultiplierVariants } from '../../../common';

export const grid: RawTheme['grid'] = {
    columns: 12,
    gutter: {
        default: '28px',
        ...sizeMultiplierVariants,
        xxl: { multiply: 'var(--size-multiplier-xxl)' }
    },
    container: {
        default: '100%',
        xs: '100%',
        sm: 'calc(var(--breakpoint-sm) - var(--gutter-sm))',
        md: 'calc(var(--breakpoint-md) - var(--gutter-md))',
        lg: 'calc(var(--breakpoint-lg) - var(--gutter-lg))',
        xl: 'calc(var(--breakpoint-xl) - var(--gutter-xl))',
        xxl: 'calc(var(--breakpoint-xxl) - var(--gutter-xxl))'
    }
};
