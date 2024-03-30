import * as CSS from 'csstype';

export interface BoxShadow {
    inset?: boolean;
    offsetX: string | number;
    offsetY: string | number;
    blurRadius: string | number;
    spreadRadius: string | number;
    color: CSS.Property.Color;
    [key: string]: string | number | boolean | undefined;
}

export type BoxShadowProperty = CSS.Property.BoxShadow | Partial<BoxShadow>;

export type ResolvedBoxShadowProperty = BoxShadow;
