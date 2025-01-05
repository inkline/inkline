import { DefinitionOptions, SelectorOptions } from './types';

/**
 * Themes
 */

export const defaultThemeName = 'default';
export const darkThemeName = 'dark';

/**
 * Definition options
 */

export const defaultDefinitionOptions: Omit<DefinitionOptions, 'context'> = {
    theme: defaultThemeName,
    default: true
};

export const defaultSelectorOptions: Omit<SelectorOptions, 'context'> = {
    ...defaultDefinitionOptions,
    default: false
};

/**
 * Generator options
 */

export const defaultRenameFn = (name: string) => name;
