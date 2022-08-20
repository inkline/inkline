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

export interface ResolvedColorProperty {
    h: number | string;
    s: number | string;
    l: number | string;
    a: CSS.Property.Opacity;
    [key: string]: number | string | boolean;
}

export interface ColorPropertyObjectVariant {
    hue?: number;
    h?: number;
    saturation?: number;
    s?: number;
    lightness?: number;
    l?: number;
    alpha?: number;
    a?: number;

    lighten?: number;
    darken?: number;
    saturate?: number;
    desaturate?: number;
    grayscale?: true;
    fade?: number;
    opaquer?: number;
    rotate?: number;

    [key: string]: string | number | boolean | undefined;
}

export type ColorPropertyVariant = CSS.Property.Color | ColorPropertyObjectVariant;
