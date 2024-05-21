import type { RawThemeColorVariant, ResolvedThemeColor } from '../../types';

export const hueModifier = (color: ResolvedThemeColor, value: RawThemeColorVariant['hue']) => {
    color.h = value as ResolvedThemeColor['h'];
};

export const saturationModifier = (
    color: ResolvedThemeColor,
    value: RawThemeColorVariant['saturation']
) => {
    color.s = value as ResolvedThemeColor['s'];
};

export const lightnessModifier = (
    color: ResolvedThemeColor,
    value: RawThemeColorVariant['lightness']
) => {
    color.l = value as ResolvedThemeColor['l'];
};

export const alphaModifier = (color: ResolvedThemeColor, value: RawThemeColorVariant['alpha']) => {
    color.a = value as ResolvedThemeColor['a'];
};

export const lightenModifier = (
    color: ResolvedThemeColor,
    value: RawThemeColorVariant['lighten']
) => {
    color.l = `calc(${color.l} + ${
        typeof value === 'number' && value > 1 ? `${value}%` : `${color.l} * ${value}`
    })`;
};

export const darkenModifier = (
    color: ResolvedThemeColor,
    value: RawThemeColorVariant['darken']
) => {
    color.l = `calc(${color.l} - ${
        typeof value === 'number' && value > 1 ? `${value}%` : `${color.l} * ${value}`
    })`;
};

export const saturateModifier = (
    color: ResolvedThemeColor,
    value: RawThemeColorVariant['saturate']
) => {
    color.s = `calc(${color.s} + ${color.s} * ${value})`;
};

export const desaturateModifier = (
    color: ResolvedThemeColor,
    value: RawThemeColorVariant['desaturate']
) => {
    color.s = `calc(${color.s} - ${color.s} * ${value})`;
};

export const grayscaleModifier = (color: ResolvedThemeColor) => {
    color.s = 0;
};

export const rotateModifier = (
    color: ResolvedThemeColor,
    value: RawThemeColorVariant['rotate']
) => {
    color.h = `calc(${color.h} + ${value})`;
};

export const fadeModifier = (color: ResolvedThemeColor, value: RawThemeColorVariant['fade']) => {
    color.a = `calc(${color.a} - ${color.a} * ${value})`;
};

export const opaquerModifier = (
    color: ResolvedThemeColor,
    value: RawThemeColorVariant['opaquer']
) => {
    color.a = `calc(${color.a} + ${color.a} * ${value})`;
};

export const colorModifiers: Record<
    keyof RawThemeColorVariant,
    (color: ResolvedThemeColor, value?: any) => void
> = {
    hue: hueModifier,
    h: hueModifier,
    saturation: saturationModifier,
    s: saturationModifier,
    lightness: lightnessModifier,
    l: lightnessModifier,
    alpha: alphaModifier,
    a: alphaModifier,
    lighten: lightenModifier,
    darken: darkenModifier,
    saturate: saturateModifier,
    desaturate: desaturateModifier,
    grayscale: grayscaleModifier,
    rotate: rotateModifier,
    fade: fadeModifier,
    opaquer: opaquerModifier
};
