import type { RawThemeBorderRadiusVariant, ResolvedThemeBorderRadius } from '../../types';

export const topLeftModifier = (
    borderRadius: ResolvedThemeBorderRadius,
    value: RawThemeBorderRadiusVariant['topLeft']
) => {
    borderRadius.topLeft = value as ResolvedThemeBorderRadius['topLeft'];
};

export const topRightModifier = (
    borderRadius: ResolvedThemeBorderRadius,
    value: RawThemeBorderRadiusVariant['topRight']
) => {
    borderRadius.topRight = value as ResolvedThemeBorderRadius['topRight'];
};

export const bottomRightModifier = (
    borderRadius: ResolvedThemeBorderRadius,
    value: RawThemeBorderRadiusVariant['bottomRight']
) => {
    borderRadius.bottomRight = value as ResolvedThemeBorderRadius['bottomRight'];
};

export const bottomLeftModifier = (
    borderRadius: ResolvedThemeBorderRadius,
    value: RawThemeBorderRadiusVariant['bottomLeft']
) => {
    borderRadius.bottomLeft = value as ResolvedThemeBorderRadius['bottomLeft'];
};

export const allModifier = (
    borderRadius: ResolvedThemeBorderRadius,
    value: RawThemeBorderRadiusVariant['all']
) => {
    borderRadius.topLeft = value as ResolvedThemeBorderRadius['topLeft'];
    borderRadius.topRight = value as ResolvedThemeBorderRadius['topRight'];
    borderRadius.bottomRight = value as ResolvedThemeBorderRadius['bottomRight'];
    borderRadius.bottomLeft = value as ResolvedThemeBorderRadius['bottomLeft'];
};

export const addModifier = (
    borderRadius: ResolvedThemeBorderRadius,
    value: RawThemeBorderRadiusVariant['add']
) => {
    borderRadius.topLeft = `calc(${borderRadius.topLeft} + ${value})`;
    borderRadius.topRight = `calc(${borderRadius.topRight} + ${value})`;
    borderRadius.bottomRight = `calc(${borderRadius.bottomRight} + ${value})`;
    borderRadius.bottomLeft = `calc(${borderRadius.bottomLeft} + ${value})`;
};

export const subtractModifier = (
    borderRadius: ResolvedThemeBorderRadius,
    value: RawThemeBorderRadiusVariant['subtract']
) => {
    borderRadius.topLeft = `calc(${borderRadius.topLeft} - ${value})`;
    borderRadius.topRight = `calc(${borderRadius.topRight} - ${value})`;
    borderRadius.bottomRight = `calc(${borderRadius.bottomRight} - ${value})`;
    borderRadius.bottomLeft = `calc(${borderRadius.bottomLeft} - ${value})`;
};

export const multiplyModifier = (
    borderRadius: ResolvedThemeBorderRadius,
    value: RawThemeBorderRadiusVariant['multiply']
) => {
    borderRadius.topLeft = `calc(${borderRadius.topLeft} * ${value})`;
    borderRadius.topRight = `calc(${borderRadius.topRight} * ${value})`;
    borderRadius.bottomRight = `calc(${borderRadius.bottomRight} * ${value})`;
    borderRadius.bottomLeft = `calc(${borderRadius.bottomLeft} * ${value})`;
};

export const divideModifier = (
    borderRadius: ResolvedThemeBorderRadius,
    value: RawThemeBorderRadiusVariant['divide']
) => {
    borderRadius.topLeft = `calc(${borderRadius.topLeft} / ${value})`;
    borderRadius.topRight = `calc(${borderRadius.topRight} / ${value})`;
    borderRadius.bottomRight = `calc(${borderRadius.bottomRight} / ${value})`;
    borderRadius.bottomLeft = `calc(${borderRadius.bottomLeft} / ${value})`;
};

export const borderRadiusModifiers: Record<
    keyof RawThemeBorderRadiusVariant,
    (borderRadius: ResolvedThemeBorderRadius, value?: any) => void
> = {
    topLeft: topLeftModifier,
    topRight: topRightModifier,
    bottomRight: bottomRightModifier,
    bottomLeft: bottomLeftModifier,
    all: allModifier,
    add: addModifier,
    subtract: subtractModifier,
    multiply: multiplyModifier,
    divide: divideModifier
};
