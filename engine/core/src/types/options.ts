import type { Theme } from './tokens';
import type { Context } from './context';

export type ContextOptions = {
    context: Context;
};

export type DefinitionOptions = ContextOptions & {
    theme?: string | Theme;
    default?: boolean;
    register?: boolean;
};

export type VariableOptions = DefinitionOptions;

export type VariablesOptions = DefinitionOptions & { registerComposed?: boolean };

export type SelectorOptions = DefinitionOptions;

export type VariantOptions = DefinitionOptions;

export type UtilityOptions = DefinitionOptions & {
    prefix?: string;
};

export type FileOptions = ContextOptions & { append?: boolean; prepend?: boolean };

export type RenameFn = (name: string) => string;
