import type { Theme } from './tokens';
import type { Context } from './context';

export type ContextOptions = {
    context: Context;
};

export type DefinitionOptions = ContextOptions & {
    /**
     * The theme in which the token is defined.
     */
    theme?: string | Theme;
    /**
     * Determines if the token should overwrite an existing token.
     */
    default?: boolean;
    /**
     * Determines if the token should be registered in the theme or not.
     */
    register?: boolean;
    /**
     * Determines if the composed tokens should be registered in the theme when using `variables`.
     */
    registerComposed?: boolean;
    /**
     * The prefix to be used for the utility selector class names.
     */
    utilityPrefix?: string;
    /**
     * Object used for mapping variant properties to variables.
     */
    propertyToVariableMap?: Record<string, string | string[]>;
};

export type FileOptions = ContextOptions & { append?: boolean; prepend?: boolean };
