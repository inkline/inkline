import type { Theme } from './tokens';

export type DefinitionOptions = { theme?: string | Theme; default?: boolean; register?: boolean };

export type DefineOptions = DefinitionOptions & { registerComposed?: boolean };

export type SelectorOptions = DefinitionOptions;

export type RenameFn = (name: string) => string;
