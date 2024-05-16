import {
    codegenCssVariables,
    defineResolver,
    defineResolverValueFn,
    defineResolverVariantFn,
    createResolveFn
} from '../utils';
import {
    RawTheme,
    RawThemeBorderRadius,
    RawThemeBorderRadiusVariant,
    ResolvedTheme,
    ResolvedThemeBorderRadius,
    BorderRadius,
    RawThemeValueType,
    ResolvedThemeValueType
} from '../types';
import { borderRadiusModifiers } from './modifiers';
import { cornersPropertyKeys } from '../constants';

export function assignBorderRadius(borderRadius: string): BorderRadius {
    const values = borderRadius.split(/\s+/);
    const value = { topLeft: '', topRight: '', bottomRight: '', bottomLeft: '' };

    cornersPropertyKeys.forEach((side, index) => {
        value[side] = values[index % 4] || values[index % 2] || values[0];
    });

    return value;
}

export const resolveBorderRadius = defineResolverValueFn<
    RawThemeBorderRadius,
    ResolvedThemeBorderRadius
>((borderRadius) => {
    let topLeft: BorderRadius['topLeft'],
        topRight: BorderRadius['topRight'],
        bottomRight: BorderRadius['bottomRight'],
        bottomLeft: BorderRadius['bottomLeft'];

    if (typeof borderRadius === 'string') {
        if (borderRadius.includes('var')) {
            [topLeft, topRight, bottomRight, bottomLeft] = [
                borderRadius,
                borderRadius,
                borderRadius,
                borderRadius
            ];
        } else {
            ({ topLeft, topRight, bottomRight, bottomLeft } = assignBorderRadius(borderRadius));
        }
    } else {
        ({ topLeft, topRight, bottomRight, bottomLeft } = borderRadius);
    }

    return { topLeft, topRight, bottomRight, bottomLeft };
});

export const resolveBorderRadiusVariant = defineResolverVariantFn<
    RawThemeBorderRadiusVariant | RawThemeBorderRadius,
    ResolvedThemeBorderRadius
>((variant, meta) => {
    if (typeof variant === 'string') {
        return resolveBorderRadius(variant, meta);
    }

    const variantValue: ResolvedThemeBorderRadius = {
        topLeft: codegenCssVariables.get(`border-top-left-radius`),
        topRight: codegenCssVariables.get(`border-top-right-radius`),
        bottomRight: codegenCssVariables.get(`border-bottom-right-radius`),
        bottomLeft: codegenCssVariables.get(`border-bottom-left-radius`)
    };

    Object.keys(variant).forEach((modifierName) => {
        if (modifierName in borderRadiusModifiers) {
            borderRadiusModifiers[modifierName](
                variantValue,
                (variant as RawThemeBorderRadiusVariant)[modifierName]
            );
        }
    });

    return variantValue;
});

export const borderRadiusResolver = defineResolver<
    RawThemeValueType<RawTheme['borderRadius']>,
    ResolvedThemeValueType<ResolvedTheme['borderRadius']>
>({
    key: [/^borderRadius\.[^.]+$/, /.*\.borderRadius$/],
    resolve: createResolveFn(resolveBorderRadius, resolveBorderRadiusVariant)
});
