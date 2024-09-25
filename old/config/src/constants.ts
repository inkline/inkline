import {
    ComponentBrandColor,
    ComponentSize,
    ComponentStateColor,
    DefinitionOptions,
    RenameFn,
    SelectorOptions
} from './types';

/**
 * Themes
 */

export const defaultThemeName = 'default';
export const darkThemeName = 'dark';

/**
 * Definition options
 */

export const defaultDefinitionOptions: DefinitionOptions = {
    theme: defaultThemeName,
    default: true
};

export const defaultSelectorOptions: SelectorOptions = {
    ...defaultDefinitionOptions,
    replace: false,
    default: false
};

/**
 * Generator options
 */

export const defaultRenameFn: RenameFn = (name) => name;

export const defaultIndent = '    ';

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
