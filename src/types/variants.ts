export interface ColorVariant {
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

    [key: string]: number | boolean | undefined;
}

export interface Variants {
    color: {
        [key: string]: Record<string, ColorVariant | string>;
    }
}
