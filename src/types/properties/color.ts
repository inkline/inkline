import * as CSS from 'csstype';

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

export type ColorProperty = CSS.Property.Color | ColorType.RGBA | ColorType.HSLA;

export interface ResolvedColorPropertyObject {
    h: number | string;
    s: number | string;
    l: number | string;
    a: CSS.Property.Opacity;
    [key: string]: number | string | boolean;
}

export type ResolvedColorProperty = ResolvedColorPropertyObject | string;

export interface ColorPropertyObjectVariant {
    hue?: number | string;
    h?: number | string;
    saturation?: number | string;
    s?: number | string;
    lightness?: number | string;
    l?: number | string;
    alpha?: number | string;
    a?: number | string;

    lighten?: number | string;
    darken?: number | string;
    saturate?: number | string;
    desaturate?: number | string;
    grayscale?: true;
    fade?: number | string;
    opaquer?: number | string;
    rotate?: number | string;

    [key: string]: string | number | boolean | undefined;
}

export type ColorPropertyVariant = CSS.Property.Color | ColorPropertyObjectVariant;
