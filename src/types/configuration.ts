/**
 * Token to be used for code generation
 */
import { Theme } from './theme';

export type Token<T> = {
    type: string;
} & T;

/**
 * Parser function that recieves the whole configuration object
 */
export interface Parser<T = {}> {
    (config: Configuration): void | Token<T>[];
}

/**
 * Plugin function that optionally returns a parser and a generator
 */
export interface Plugin<Options = {}> {
    (options?: Options): {
        parser?: Parser;
        generator?: Generator;
    }
}

/**
 * Configuration object
 */
export interface Configuration extends Record<string, any> {
    plugins: Plugin[];
    theme: {
        [key: string]: Theme
    };
}
