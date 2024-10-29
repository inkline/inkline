import {
    ComponentBrandColor, ComponentBrandNeutralColor,
    ComponentSize,
    ComponentStateColor
} from "./types";

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

export const defaultComponentNeutralColors: ComponentBrandNeutralColor[] = ['light', 'dark'];

export const defaultComponentBrandColors: ComponentBrandColor[] = [
    'primary',
    'secondary',
    ...defaultComponentNeutralColors,
    ...defaultComponentStateColors
];
