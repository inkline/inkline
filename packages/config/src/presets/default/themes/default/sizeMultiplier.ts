import { defineSizeMultiplierVariable } from '../../../../utils';

export const sizeMultiplier = defineSizeMultiplierVariable(1, {
    xxs: { divide: 'var(--scale-ratio-pow-3)' },
    xs: { divide: 'var(--scale-ratio-pow-2)' },
    sm: { divide: 'var(--scale-ratio-pow-1)' },
    md: 'var(--size-multiplier)',
    lg: { multiply: 'var(--scale-ratio-pow-1)' },
    xl: { multiply: 'var(--scale-ratio-pow-2)' },
    xxl: { multiply: 'var(--scale-ratio-pow-3)' }
});
