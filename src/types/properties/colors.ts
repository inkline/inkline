export interface RGBAColor {
    r: number | string;
    g: number | string;
    b: number | string;
    a?: number | string;
}

export interface HSLAColor {
    h: number | string;
    s: number | string;
    l: number | string;
    a?: number | string;
}

export interface RawThemeColorVariant {
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

export type RawThemeColor = string | RGBAColor | HSLAColor;

export type ResolvedThemeColor = {
    h: number | string;
    s: number | string;
    l: number | string;
    a: number | string;
};
