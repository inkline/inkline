import {
    codegenCssVariables,
    defineResolver,
    defineResolverValueFn,
    defineResolverVariantFn,
    createResolveFn
} from '../utils';
import {
    RawTheme,
    RawThemeGridContainer,
    RawThemeGridGutter,
    RawThemeGridGutterVariant,
    RawThemeValueType,
    ResolvedTheme,
    ResolvedThemeGridContainer,
    ResolvedThemeGridGutter,
    ResolvedThemeTypographyFontSize,
    ResolvedThemeValueType
} from '../types';
import { gutterModifiers } from './modifiers';

/**
 * Grid gutter
 */

export const resolveGridGutter = defineResolverValueFn<RawThemeGridGutter, ResolvedThemeGridGutter>(
    (gutter, meta) => gutter
);

export const resolveGridGutterVariant = defineResolverVariantFn<
    RawThemeGridGutterVariant | RawThemeGridGutter,
    ResolvedThemeGridGutter
>((variant, meta) => {
    if (typeof variant === 'string') {
        return resolveGridGutter(variant, meta);
    }

    return Object.keys(variant).reduce<ResolvedThemeTypographyFontSize>((acc, modifierName) => {
        if (modifierName in gutterModifiers) {
            acc = gutterModifiers[modifierName as keyof typeof gutterModifiers](
                acc,
                (variant as RawThemeGridGutterVariant)[modifierName]
            );
        }

        return acc;
    }, codegenCssVariables.get('gutter'));
});

export const gridGutterResolver = defineResolver<
    RawThemeValueType<RawTheme['grid']['gutter']>,
    ResolvedThemeValueType<ResolvedTheme['grid']['gutter']>
>({
    key: [/^grid\.gutter\.[^.]+$/],
    resolve: createResolveFn(resolveGridGutter, resolveGridGutterVariant)
});

/**
 * Grid container
 */

export const resolveGridContainer = defineResolverValueFn<
    RawThemeGridContainer,
    ResolvedThemeGridContainer
>((container, meta) => {
    return container;
});

export const resolveGridContainerVariant = defineResolverVariantFn<
    RawThemeGridContainer,
    ResolvedThemeGridContainer
>(resolveGridContainer);

export const gridContainerResolver = defineResolver<
    RawThemeValueType<RawTheme['grid']['container']>,
    ResolvedThemeValueType<ResolvedTheme['grid']['container']>
>({
    key: [/^grid\.container\.[^.]+$/],
    resolve: createResolveFn(resolveGridContainer, resolveGridContainerVariant)
});

/**
 * Grid columns
 */

export const gridColumnsResolver = defineResolver<
    RawTheme['grid']['columns'],
    ResolvedTheme['grid']['columns']
>({
    key: 'grid.columns',
    resolve: defineResolverValueFn((columns, meta) => {
        return columns;
    })
});
