/**
 * Generic
 */

export type SidesPropertyKey = 'top' | 'right' | 'bottom' | 'left';

export type CornersPropertyKey = 'topLeft' | 'topRight' | 'bottomRight' | 'bottomLeft';

/**
 * Border
 */

export type Border = {
    width: string | number;
    style: string;
    color: string;
};

export type BorderSide = SidesPropertyKey;

/**
 * Border radius
 */

export type BorderRadiusCorner = CornersPropertyKey;

export type BorderRadius = Record<BorderRadiusCorner, string>;

/**
 * Colors
 */

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

/**
 * Transition
 */

export type Transition = {
    duration: number | string;
    timingFunction: string;
    property?: string;
};
