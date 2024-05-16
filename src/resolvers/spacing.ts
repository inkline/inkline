import {
    codegenCssVariables,
    defineResolver,
    defineResolverValueFn,
    defineResolverVariantFn,
    toUnitValue,
    createResolveFn
} from '../utils';
import {
    RawTheme,
    RawThemeMargin,
    RawThemePadding,
    RawThemeSpacing,
    RawThemeSpacingVariant,
    RawThemeSpacingWithSidesVariant,
    ResolvedThemeSpacingWithSides,
    ResolvedTheme,
    ResolvedThemeMargin,
    ResolvedThemePadding,
    ResolvedThemeSpacing,
    RawThemeValueType,
    ResolvedThemeValueType
} from '../types';
import { spacingModifiers, spacingWithSidesModifiers } from './modifiers';
import { sidesPropertyKeys } from '../constants';

/**
 * Spacing
 */

export const resolveSpacing = defineResolverValueFn<RawThemeSpacing, ResolvedThemeSpacing>(
    (spacing, meta) => toUnitValue(spacing)
);

export const resolveSpacingVariant = defineResolverVariantFn<
    RawThemeSpacingVariant | RawThemeSpacing,
    ResolvedThemeSpacing
>((variant, meta) => {
    if (typeof variant === 'string' || typeof variant === 'number') {
        return resolveSpacing(variant, meta);
    }

    return Object.keys(variant).reduce<ResolvedThemeSpacing>((acc, modifierName) => {
        if (modifierName in spacingModifiers) {
            return spacingModifiers[modifierName as keyof typeof spacingModifiers](
                acc,
                variant[modifierName]
            );
        }

        return acc;
    }, codegenCssVariables.get('spacing'));
});

export const spacingResolver = defineResolver<
    RawThemeValueType<RawTheme['spacing']>,
    ResolvedThemeValueType<ResolvedTheme['spacing']>
>({
    key: [/^spacing\.[^.]+$/, /.*\.spacing$/],
    resolve: createResolveFn(resolveSpacing, resolveSpacingVariant)
});

/**
 * Spacing with Sides
 */

export function assignSpacingSides(spacing: string): ResolvedThemeSpacingWithSides {
    const values = spacing.split(/\s+/);
    const value = { top: '', right: '', bottom: '', left: '' };

    sidesPropertyKeys.forEach((side, index) => {
        value[side] = values[index % 4] || values[index % 2] || values[0];
    });

    return value;
}

export const resolveSpacingWithSides = defineResolverValueFn<
    RawThemeMargin | RawThemePadding,
    ResolvedThemeMargin | ResolvedThemePadding
>((spacing) => {
    let top: ResolvedThemeSpacingWithSides['top'],
        right: ResolvedThemeSpacingWithSides['right'],
        bottom: ResolvedThemeSpacingWithSides['bottom'],
        left: ResolvedThemeSpacingWithSides['left'];

    if (typeof spacing === 'string') {
        if (spacing.includes('var')) {
            [top, right, bottom, left] = [spacing, spacing, spacing, spacing];
        } else {
            ({ top, right, bottom, left } = assignSpacingSides(spacing));
        }
    } else {
        ({ top, right, bottom, left } = spacing);
    }

    return { top, right, bottom, left };
});

export const resolveSpacingWithSidesVariant = (propertyName: string) =>
    defineResolverVariantFn<
        RawThemeSpacingWithSidesVariant | RawThemeSpacing,
        ResolvedThemeMargin | ResolvedThemePadding
    >((variant, meta) => {
        if (typeof variant === 'string') {
            return resolveSpacingWithSides(variant, meta);
        }

        const variantValue: ResolvedThemeSpacingWithSides = {
            top: codegenCssVariables.get(`${propertyName}-top`),
            right: codegenCssVariables.get(`${propertyName}-right`),
            bottom: codegenCssVariables.get(`${propertyName}-bottom`),
            left: codegenCssVariables.get(`${propertyName}-left`)
        };

        Object.keys(variant).forEach((modifierName) => {
            if (modifierName in spacingWithSidesModifiers) {
                spacingWithSidesModifiers[modifierName](
                    variantValue,
                    (variant as RawThemeSpacingWithSidesVariant)[modifierName]
                );
            }
        });

        return variantValue;
    });

export const marginResolver = defineResolver<
    RawThemeValueType<RawTheme['margin']>,
    ResolvedThemeValueType<ResolvedTheme['margin']>
>({
    key: [/^margin\.[^.]+$/, /.*\.margin$/],
    resolve: createResolveFn(resolveSpacingWithSides, resolveSpacingWithSidesVariant('margin'))
});

export const paddingResolver = defineResolver<
    RawThemeValueType<RawTheme['padding']>,
    ResolvedThemeValueType<ResolvedTheme['padding']>
>({
    key: [/^padding\.[^.]+$/, /.*\.padding$/],
    resolve: createResolveFn(resolveSpacingWithSides, resolveSpacingWithSidesVariant('padding'))
});
