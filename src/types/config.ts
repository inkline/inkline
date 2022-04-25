import { Theme as InternalTheme } from './theme';
import * as CSS from 'csstype';

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
         * Path test regular expression, should contain replacement groups
         *
         * @example /(.*)margin.(\w+)$/
         */
        test: RegExp;

        /**
         * Set string, should contain replacement groups
         *
         * @example $1margin.$2
         */
        set: string | ((context: ConfigurationContext<V>, value: R) => void);

        /**
         * Resolve function, returns the value to be set on theme object
         *
         * @param context
         */
        resolve(context: ConfigurationContext<V>): R;
    }

    export interface ResolverPlugin<O = {}, V = {}, R = unknown> {
        (options?: O): Resolver<V, R>[]
    }

    export interface Generator<V = {}> {
        test: RegExp;
        generate(context: ConfigurationContext<V>): string[];
    }

    export interface GeneratorPlugin<O = {}, V = {}> {
        (options?: O): Generator<V>[]
    }

    /**
     * Theme
     */

    export interface PropertyFn<T> {
        (context: { theme: Theme }): T;
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

    export interface Theme {
        color: {
            [key: string]: Property.Color;
        };
        margin: Property.Margin | Property.Margin[] | Partial<SidesProperty<Property.Margin>>;
        padding: Property.Padding | Property.Padding[] | Partial<SidesProperty<Property.Padding>>;
        border: Property.Border | Property.Border[] | Partial<SidesProperty<Property.Border>>;
        elements: {
            [key: string]: Partial<UserConfiguration.Theme>;
        };
        components: {
            [key: string]: Partial<UserConfiguration.Theme>;
        };
    }
}

export interface Configuration {
    resolvers: UserConfiguration.Resolver[];
    generators: UserConfiguration.Generator[];
    theme: Partial<UserConfiguration.Theme>;
    [key: string]: any;
}
