import type { Theme } from './tokens';

export type DefinitionOptions = { theme?: string | Theme; default?: boolean };

export type SelectorOptions = DefinitionOptions & {
    replace?: boolean;
};

export type RenameFn = (name: string) => string;
