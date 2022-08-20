import { ResolvedTheme } from '../../types';

/**
 * Modifiers that can be applied to color values in order to produce a new variant
 *
 * @param color
 * @param value
 */
export const colorModifiers: {
    [key: string]: (color: ResolvedTheme['color'][string], value: string | number | boolean | undefined) => void;
} = {
    hue: (color, value) => {
        color.h = value as string | number;
    },
    saturation: (color, value) => {
        color.s = value as string | number;
    },
    lightness: (color, value) => {
        color.l = value as string | number;
    },
    alpha: (color, value) => {
        color.a = value as string | number;
    },
    lighten: (color, value) => {
        color.l = `calc(${color.l} + ${color.l} * ${value})`;
    },
    darken: (color, value) => {
        color.l = `calc(${color.l} - ${color.l} * ${value})`;
    },
    saturate: (color, value) => {
        color.s = `calc(${color.s} + ${color.s} * ${value})`;
    },
    desaturate: (color, value) => {
        color.s = `calc(${color.s} - ${color.s} * ${value})`;
    },
    rotate: (color, value) => {
        color.h = `calc(${color.h} + ${value})`;
    },
    fade: (color, value) => {
        color.a = `calc(${color.a} - ${color.a} * ${value})`;
    },
    opaquer: (color, value) => {
        color.a = `calc(${color.a} + ${color.a} * ${value})`;
    }
};

/**
 * Aliases that can be used for specific modifiers
 */
export const colorModifierAliases: Record<string, string> = {
    h: 'hue',
    s: 'saturation',
    l: 'lightness',
    a: 'alpha'
};
