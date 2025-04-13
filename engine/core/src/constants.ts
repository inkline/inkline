import { DefinitionOptions } from './types';

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

/**
 * Generator options
 */

export const defaultRenameFn = (name: string) => name;
