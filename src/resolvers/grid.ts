/**
 * Color
 */
import {
    createFieldWithOptionalVariantsResolveFn,
    codegenCssVariables,
    defineResolver,
    defineResolverValueFn,
    defineResolverVariantFn
} from '../utils';
import {
    RawTheme,
    RawThemeGenericVariant,
    RawThemeGridContainer,
    RawThemeGridGutter,
    RawThemeGridGutterVariant,
    ResolvedTheme,
    ResolvedThemeGridContainer,
    ResolvedThemeGridGutter,
    ResolvedThemeTypographyFontSize,
    ResolverMeta
} from '../types';
import { gutterModifiers } from './modifiers';

/**
 * Grid gutter
 */

export const resolveGridGutter = defineResolverValueFn<RawThemeGridGutter, ResolvedThemeGridGutter>(
    (gutter, meta) => {
        return gutter;
    }
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
    RawTheme['grid']['gutter'],
    ResolvedTheme['grid']['gutter']
>({
    key: 'grid.gutter',
    resolve: createFieldWithOptionalVariantsResolveFn(resolveGridGutter, resolveGridGutterVariant)
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
    RawTheme['grid']['container'],
    ResolvedTheme['grid']['container']
>({
    key: 'grid.container',
    resolve: createFieldWithOptionalVariantsResolveFn(
        resolveGridContainer,
        resolveGridContainerVariant
    )
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
