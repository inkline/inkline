import type { RawTheme } from '../../../../../types';

export const link: RawTheme['elements']['link'] = {
    color: 'var(--color-primary-500)',
    textDecoration: 'none',
    hover: {
        color: 'var(--color-primary-600)',
        textDecoration: 'underline'
    }
};
