import {
    defineColor,
    defineColorsGroup,
    defineComponentsGroup,
    defineElementsGroup,
    defineGroup,
    defineModule,
    defineResolver,
    defineResolverValueFn,
    defineVariable,
    isThemeVariable,
    reservedChildElementKeys
} from '../utils';
import { RawThemeElement, ThemeGroup } from '../types';

/**
 * Resolver
 */

export const variablesResolver = defineResolver({
    key: reservedChildElementKeys,
    resolve: defineResolverValueFn<unknown, unknown>((value, meta) =>
        isThemeVariable(value) ? value : defineVariable(value, {}, { name: meta.path[0] })
    )
});

export const colorsGroupResolver = defineResolver({
    key: 'colors',
    resolve: defineResolverValueFn<
        Record<string, ReturnType<typeof defineColor>>,
        ThemeGroup<Record<string, ReturnType<typeof defineColor>>>
    >((value) => defineColorsGroup(value))
});

export const elementsGroupResolver = defineResolver({
    key: 'elements',
    resolve: defineResolverValueFn<
        Record<string, RawThemeElement>,
        ThemeGroup<Record<string, RawThemeElement>>
    >((value) => defineElementsGroup(value))
});

export const componentsGroupResolver = defineResolver({
    key: 'components',
    resolve: defineResolverValueFn<
        Record<string, RawThemeElement>,
        ThemeGroup<Record<string, RawThemeElement>>
    >((value) => defineComponentsGroup(value))
});

export const otherGroupResolver = defineResolver({
    key: ['grid'],
    resolve: defineResolverValueFn<object, ThemeGroup<object>>((value) => defineGroup(value))
});

/**
 * Module
 */

export const classifier = defineModule(({ registerResolver }) => {
    registerResolver(variablesResolver);
    registerResolver(colorsGroupResolver);
    registerResolver(elementsGroupResolver);
    registerResolver(componentsGroupResolver);
    registerResolver(otherGroupResolver);
});
