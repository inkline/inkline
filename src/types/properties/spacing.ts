import type { SidesPropertyKey } from './generic';

export type RawThemeSpacing = number | string;

export type ResolvedThemeSpacing = string;

export interface RawThemeSpacingVariant {
    add?: number | string;
    subtract?: number | string;
    multiply?: number | string;
    divide?: number | string;
    [key: string]: string | number | boolean | undefined;
}

export type SpacingSide = SidesPropertyKey;

export type RawThemeSpacingWithSides = Record<SpacingSide, number | string>;

export type ResolvedThemeSpacingWithSides = RawThemeSpacingWithSides;

export type RawThemeMargin = string | RawThemeSpacingWithSides;

export type ResolvedThemeMargin = ResolvedThemeSpacingWithSides;

export type RawThemePadding = string | RawThemeSpacingWithSides;

export type ResolvedThemePadding = ResolvedThemeSpacingWithSides;

export interface RawThemeSpacingWithSidesVariant extends RawThemeSpacingVariant {
    top?: number | string;
    right?: number | string;
    bottom?: number | string;
    left?: number | string;
    x?: number | string;
    y?: number | string;
    all?: number | string;
    [key: string]: string | number | boolean | undefined;
}
