import { DefinitionOptions, SelectorOptions } from './types';

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
    default: false
};

/**
 * Generator options
 */

export const defaultIndent = '    ';

export const defaultRenameFn = (name: string) => name;
