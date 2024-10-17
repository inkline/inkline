import type { Theme } from './tokens';

export type DefinitionOptions = { theme?: string | Theme; default?: boolean };

export type SelectorOptions = DefinitionOptions;

export type RenameFn = (name: string) => string;
