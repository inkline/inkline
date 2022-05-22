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

export interface NumberVariant {
    multiply?: number;
    divide?: number;
    add?: number;
    subtract?: number;

    [key: string]: NumberVariant | number | string | undefined;
}

export interface SpacingVariant extends NumberVariant {
    top?: string | NumberVariant;
    right?: string | NumberVariant;
    bottom?: string | NumberVariant;
    left?: string | NumberVariant;

    [key: string]: NumberVariant | number | string | undefined;
}

export interface Variants {
    color?: {
        [key: string]: Record<string, ColorVariant | string>;
    };
    margin?: {
        [key: string]: SpacingVariant | string;
    };
    padding?: {
        [key: string]: SpacingVariant | string;
    };
}
