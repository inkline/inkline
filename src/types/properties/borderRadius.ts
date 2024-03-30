export type BorderRadiusCorner = 'topLeft' | 'topRight' | 'bottomRight' | 'bottomLeft';

export type BorderRadius = Record<BorderRadiusCorner, string>;

export type RawThemeBorderRadius = string | BorderRadius;

export type RawThemeBorderRadiusVariant = {
    topLeft?: string;
    topRight?: string;
    bottomRight?: string;
    bottomLeft?: string;
    all?: string;
    add?: string | number;
    subtract?: string | number;
    divide?: string | number;
    multiply?: string | number;
    [key: string]: string | number | undefined;
};

export type ResolvedThemeBorderRadius = BorderRadius;
