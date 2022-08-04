import { Theme, Theme as InternalTheme } from './theme';
import * as CSS from 'csstype';
import { Variants } from './variants';
import { PartialDeep } from 'type-fest';
import {GeneratorLocation, GeneratorPriority} from "../constants";

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
         * Generator name
         *
         * @example margin
         */
        name: string;

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
         * The priority of the generated code. High priority means that other generators depend on this one.
         *
         * @example GeneratorPriority.High
         */
        priority?: GeneratorPriority;

        /**
         * The location of the generated code. Root means that the generated code is placed inside the :root selector.
         *
         * @example GeneratorLocation.Root
         */
        location?: GeneratorLocation;

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
        (context: { theme: PartialDeep<Theme> }): T;
    }

    export type SidesProperty<T> = {
        default: T | T[] | PropertyFn<T | T[]>;
        top: T | PropertyFn<T>;
        right: T | PropertyFn<T>;
        bottom: T | PropertyFn<T>;
        left: T | PropertyFn<T>;
    };

    export type CornersProperty<T> = {
        default: T | T[] | PropertyFn<T | T[]>;
        topLeft: T | PropertyFn<T>;
        topRight: T | PropertyFn<T>;
        bottomRight: T | PropertyFn<T>;
        bottomLeft: T | PropertyFn<T>;
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
        export type BorderRadius = CSS.Property.BorderRadius;
        export type BoxShadow = CSS.Property.BoxShadow | {
            inset?: boolean;
            offsetX: string | number;
            offsetY: string | number;
            blurRadius: string | number;
            spreadRadius: string | number;
            color: Color;
        };
        export type FontFamily = {
            base: CSS.Property.FontFamily;
            monospace: CSS.Property.FontFamily;
            print: CSS.Property.FontFamily;
        }
    }

    /**
     * User Theme
     */

    export interface BaseTheme {
        animation: string | {
            duration: CSS.Property.AnimationDuration;
            timingFunction: CSS.Property.AnimationTimingFunction;
        };
        color: {
            [key: string]: Property.Color;
        };
        margin: Property.Margin | Property.Margin[] | Partial<SidesProperty<Property.Margin>>;
        padding: Property.Padding | Property.Padding[] | Partial<SidesProperty<Property.Padding>>;
        border: Property.Border | Partial<SidesProperty<Property.Border>>;
        borderRadius: Property.BorderRadius | Partial<CornersProperty<Property.BorderRadius>>;
        boxShadow: Property.BoxShadow;
        typography: {
            fontFamily: {
                primary: Property.FontFamily;
                secondary: Property.FontFamily;
            },
            fontWeight: {
                [key: string]: CSS.Property.FontWeight;
            };
            fontSize: CSS.Property.FontSize;
            lineHeight: CSS.Property.LineHeight;
            letterSpacing: CSS.Property.LetterSpacing;
            [key: string]: any;
        };
    }

    export interface Theme extends BaseTheme {
        breakpoints: {
            [key: string]: string | number;
        };
        scaleRatio: {
            primary: string | number;
            [key: string]: string | number;
        };
        size: {
            multiplier: string | number;
            percentages: Record<string, string>;
            [key: string]: string | number | Record<string, string>;
        },
        elements: {
            [key: string]: BaseTheme;
        };
        components: {
            [key: string]: BaseTheme;
        };
        variants: Variants;
    }
}

export interface Configuration {
    resolvers: UserConfiguration.Resolver<any>[];
    generators: UserConfiguration.Generator[];
    theme: PartialDeep<UserConfiguration.Theme>;
    [key: string]: any;
}

export interface ResolvedConfiguration extends Configuration {
    theme: Theme;
}
