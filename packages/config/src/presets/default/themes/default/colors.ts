import type { RawTheme } from '../../../../types';
import {
    colorLightnessVariants,
    colorShadeAndTintVariants,
    colorShadeVariants
} from '../../../common';

export const colors: RawTheme['colors'] = {
    red: '#f2413d',
    orange: '#f98e5a',
    yellow: '#ffda77',
    green: '#2fb079',
    teal: '#48b4a9',
    blue: '#178bb2',
    purple: '#8268ae',
    pink: '#fc778a',
    white: '#ffffff',
    black: '#000000',
    gray: {
        default: '#8e9fa4',
        ...colorShadeAndTintVariants,
        ...colorLightnessVariants
    },
    light: {
        default: 'var(--color-gray-50)',
        ...colorShadeVariants
    },
    dark: {
        default: 'var(--color-gray-800)',
        ...colorShadeAndTintVariants
    },
    primary: {
        default: 'var(--color-blue)',
        ...colorLightnessVariants,
        ...colorShadeAndTintVariants
    },
    secondary: {
        default: 'var(--color-purple)',
        ...colorLightnessVariants,
        ...colorShadeAndTintVariants
    },
    info: {
        default: 'var(--color-teal)',
        ...colorLightnessVariants,
        ...colorShadeAndTintVariants
    },
    success: {
        default: 'var(--color-green)',
        ...colorLightnessVariants,
        ...colorShadeAndTintVariants
    },
    warning: {
        default: 'var(--color-yellow)',
        ...colorLightnessVariants,
        ...colorShadeAndTintVariants
    },
    danger: {
        default: 'var(--color-red)',
        ...colorLightnessVariants,
        ...colorShadeAndTintVariants
    }
};
