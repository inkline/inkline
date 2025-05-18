import type { DefinitionOptions } from './types';

export const defaultThemeName = 'default';

export const defaultDefinitionOptions: Required<DefinitionOptions> = {
    theme: defaultThemeName,
    default: false,
    register: true
};
