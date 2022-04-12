import { Theme } from './theme';

/**
 * Token to be used for code generation
 */

export interface Token {
    type: string;
    name: string;
}

export interface ValueToken extends Token {
    value: string | Token[];
}

export interface GroupToken extends Token {
    items: Array<GroupToken | ValueToken | Token>;
}

/**
 * Parser function that receives a parser context
 */

export interface ParserContext<ValueDefinition = {}> {
    config: Configuration;
    path: string;
    value: ValueDefinition;
}

export interface Parser<ValueDefinition = {}, TokenDefinition = Token> {
    test: (context: ParserContext<ValueDefinition>) => boolean;
    resolve: (context: ParserContext<ValueDefinition>) => void | TokenDefinition[];
}

/**
 * Generator function that receives a generator context
 */

export interface GeneratorContext {}

export interface Generator {
    test: (context: GeneratorContext) => boolean;
    resolve: (context: ParserContext) => void;
}

/**
 * Plugin function that optionally returns a parser and a generator
 */

export interface Plugin<Options = {}, ValueDefinition = {}, TokenDefinition = Token> {
    (options?: Options): {
        parsers: Parser<ValueDefinition, TokenDefinition>[];
        generators: Generator[];
    }
}

/**
 * Configuration object
 */

export interface Configuration extends Record<string, any> {
    plugins: {
        parsers: Parser<any, any>[];
        generators: Generator[];
    }[];
    parsers: Parser[];
    generators: Generator[];
    theme: Theme;
}
