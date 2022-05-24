import { Theme as InternalTheme } from './theme';
import * as CSS from 'csstype';
import { Variants } from './variants';

export namespace UserConfiguration {

    /**
     * Plugins
     */

    export interface ConfigurationContext<V = any> {
        config: Configuration;
        theme: InternalTheme;
        path: string[];
        value: V;
    }

    export interface Resolver<V = {}, R = unknown> {
        /**
         * Path validation regular expression, should contain replacement groups
         *
         * @example /(.*)margin.(\w+)$/
         */
        test: RegExp;

        /**
         * Path skipping / blocking regular expression
         *
         * @example /^variants/
         */
        skip?: RegExp;

        /**
         * Set string, should contain replacement groups
         *
         * @example $1margin.$2
         */
        set: string | string[] | ((context: ConfigurationContext<V>, value: R) => void);

        /**
         * Resolve function, returns the value to be set on theme object
         *
         * @param context
         */
        resolve(context: ConfigurationContext<V>): R;
    }

    export interface Generator<V = {}> {
        /**
         * Path validation regular expression
         *
         * @example /(.*)margin.(\w+)$/
         */
        test: RegExp;

        /**
         * Path skipping / blocking regular expression
         *
         * @example /^variants/
         */
        skip?: RegExp;

        /**
         * Generate function, returns generated code strings
         *
         * @param context
         */
        generate(context: ConfigurationContext<V>): string[];
    }

    /**
     * Plugins
     */

    export interface ResolverPlugin<O = {}, V = {}, R = unknown> {
        (options?: O): Resolver<V, R>[]
    }

    export interface GeneratorPlugin<O = {}, V = {}> {
        (options?: O): Generator<V>[]
    }

    /**
     * Theme property types
     */

    export interface PropertyFn<T> {
        (context: { theme: Partial<Theme> }): T;
    }

    export type SidesProperty<T> = {
        default: T | T[] | PropertyFn<T | T[]>;
        top: T | PropertyFn<T>;
        right: T | PropertyFn<T>;
        bottom: T | PropertyFn<T>;
        left: T | PropertyFn<T>;
    };

    export namespace ColorType {
        export type RGBA = {
            r: string | number;
            g: string | number;
            b: string | number;
            a?: string | number;
            [key: string]: string | number | undefined;
        }

        export type HSLA = {
            h: string | number;
            s: string;
            l: string;
            a?: string | number;
            [key: string]: string | number | undefined;
        }
    }

    export namespace Property {
        export type Color = string | ColorType.RGBA | ColorType.HSLA;
        export type Margin = string | number;
        export type Padding = string | number;
        export type Border = string | {
            width: string | number;
            style: CSS.Property.BorderStyle;
            color: Color;
        };
    }

    /**
     * User Theme
     */

    export interface Theme {
        color: {
            [key: string]: Property.Color;
        };
        margin: Property.Margin | Property.Margin[] | Partial<SidesProperty<Property.Margin>>;
        padding: Property.Padding | Property.Padding[] | Partial<SidesProperty<Property.Padding>>;
        border: Property.Border | Partial<SidesProperty<Property.Border>>;
        elements: {
            [key: string]: Partial<UserConfiguration.Theme>;
        };
        components: {
            [key: string]: Partial<UserConfiguration.Theme>;
        };
        variants: Variants;
    }
}

export interface Configuration {
    resolvers: UserConfiguration.Resolver<any>[];
    generators: UserConfiguration.Generator[];
    theme: Partial<UserConfiguration.Theme>;
    [key: string]: any;
}
