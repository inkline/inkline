import type { RawThemeSpacingWithSidesVariant, ResolvedThemeSpacingWithSides } from '../../types';

export const topModifier = (spacing: ResolvedThemeSpacingWithSides, value: number | string) => {
    spacing.top = value;
};

export const rightModifier = (spacing: ResolvedThemeSpacingWithSides, value: number | string) => {
    spacing.right = value;
};

export const bottomModifier = (spacing: ResolvedThemeSpacingWithSides, value: number | string) => {
    spacing.bottom = value;
};

export const leftModifier = (spacing: ResolvedThemeSpacingWithSides, value: number | string) => {
    spacing.left = value;
};

export const xModifier = (spacing: ResolvedThemeSpacingWithSides, value: number | string) => {
    spacing.left = value;
    spacing.right = value;
};

export const yModifier = (spacing: ResolvedThemeSpacingWithSides, value: number | string) => {
    spacing.top = value;
    spacing.bottom = value;
};

export const allModifier = (spacing: ResolvedThemeSpacingWithSides, value: number | string) => {
    spacing.top = value;
    spacing.right = value;
    spacing.bottom = value;
    spacing.left = value;
};

export const addModifier = (spacing: ResolvedThemeSpacingWithSides, value: number | string) => {
    spacing.top = `calc(${spacing.top} + ${value})`;
    spacing.right = `calc(${spacing.right} + ${value})`;
    spacing.bottom = `calc(${spacing.bottom} + ${value})`;
    spacing.left = `calc(${spacing.left} + ${value})`;
};

export const subtractModifier = (
    spacing: ResolvedThemeSpacingWithSides,
    value: number | string
) => {
    spacing.top = `calc(${spacing.top} - ${value})`;
    spacing.right = `calc(${spacing.right} - ${value})`;
    spacing.bottom = `calc(${spacing.bottom} - ${value})`;
    spacing.left = `calc(${spacing.left} - ${value})`;
};

export const multiplyModifier = (
    spacing: ResolvedThemeSpacingWithSides,
    value: number | string
) => {
    spacing.top = `calc(${spacing.top} * ${value})`;
    spacing.right = `calc(${spacing.right} * ${value})`;
    spacing.bottom = `calc(${spacing.bottom} * ${value})`;
    spacing.left = `calc(${spacing.left} * ${value})`;
};

export const divideModifier = (spacing: ResolvedThemeSpacingWithSides, value: number | string) => {
    spacing.top = `calc(${spacing.top} / ${value})`;
    spacing.right = `calc(${spacing.right} / ${value})`;
    spacing.bottom = `calc(${spacing.bottom} / ${value})`;
    spacing.left = `calc(${spacing.left} / ${value})`;
};

export const spacingWithSidesModifiers: Record<
    keyof RawThemeSpacingWithSidesVariant,
    (spacing: ResolvedThemeSpacingWithSides, value?: any) => void
> = {
    top: topModifier,
    right: rightModifier,
    bottom: bottomModifier,
    left: leftModifier,
    x: xModifier,
    y: yModifier,
    all: allModifier,
    add: addModifier,
    subtract: subtractModifier,
    multiply: multiplyModifier,
    divide: divideModifier
};
