import type { RawTheme } from '../../../../types';
import { spacingVariants } from '../../../common';

export const spacing: RawTheme['spacing'] = {
    default: '1rem',
    ...spacingVariants
};

export const margin: RawTheme['margin'] = {
    default: 'var(--spacing)',
    ...spacingVariants
};

export const padding: RawTheme['padding'] = {
    default: 'var(--spacing)',
    ...spacingVariants
};
