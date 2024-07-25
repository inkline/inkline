import type { DefinitionOptions, RenameFn } from './types';

export const defaultThemeName = 'default';
export const darkThemeName = 'dark';

export const defaultDefinitionOptions: DefinitionOptions = {
    theme: defaultThemeName,
    default: true
};

export const defaultRenameFn: RenameFn = (name) => name;

export const defaultIndent = '    ';
