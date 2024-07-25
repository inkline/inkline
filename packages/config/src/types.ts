import { ScssGeneratorOptions } from './generators';

export const enum TokenType {
    Variable = 'variable',
    Calc = 'calc',
    Reference = 'reference',
    Selector = 'selector',
    Theme = 'theme'
}

export type PrimitiveTokenValue = number | string | boolean;

export type TokenValue = Calc | Reference | PrimitiveTokenValue | TokenValue[];

export type Variable<Value extends TokenValue = TokenValue, Name extends string = string> = {
    __type: TokenType.Variable;
    __name: Name;
    __value: Value;
};

export type Calc = {
    __type: TokenType.Calc;
    __value: any[];
};

export type Reference = {
    __type: TokenType.Reference;
    __name: string;
    __fallback?: TokenValue;
};

export type ComponentValue = Record<string, TokenValue>;

export type Selector = {
    __type: TokenType.Selector;
    __name: string;
    __value: ComponentValue;
};

export type Theme = {
    __type: TokenType.Theme;
    __name: string;
    __keys: {
        variables: Set<string>;
        selectors: Set<string>;
    };
    variables: Record<string, Variable>;
    selectors: Record<string, Selector>;
};

export type DefinitionOptions = { theme?: string | Theme; default?: boolean };

export type RenameFn = (name: string) => string;

export type Themes = Record<string, Theme>;

/**
 * Consumers
 */

export type OutputFile = {
    path: string;
    content: string;
};

export interface Generator<T> {
    (themes: Themes, options: ConfigurationOptions<T>): OutputFile[];
}

/**
 * Build options
 */

export type ModuleOptions = ScssGeneratorOptions;

export type ConfigurationOptions<T = unknown> = {
    outputDir?: string;
    manifest?: boolean;
    module?: 'scss';
} & T;

export type SetupFunction = () => void;

export type Configuration = {
    themes: Themes;
    options: ConfigurationOptions;
};
