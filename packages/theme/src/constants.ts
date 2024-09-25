import {
    ComponentBrandColor,
    ComponentSize,
    ComponentStateColor,
} from './types';

/**
 * Themes
 */

export const defaultThemeName = 'default';
export const darkThemeName = 'dark';

/**
 * Usage options
 */

export const defaultComponentSizes: ComponentSize[] = ['sm', 'md', 'lg'];

export const defaultComponentStateColors: ComponentStateColor[] = [
    'info',
    'success',
    'warning',
    'danger'
];

export const defaultComponentNeutralColors: ComponentBrandColor[] = ['light', 'dark'];

export const defaultComponentBrandColors: ComponentBrandColor[] = [
    'primary',
    'secondary',
    ...defaultComponentNeutralColors,
    ...defaultComponentStateColors
];
