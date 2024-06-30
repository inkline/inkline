import {
    codegenCssVariables,
    defineResolver,
    defineResolverValueFn,
    defineResolverVariantFn,
    createGenericVariantResolveFn,
    defineGenerator,
    codegenScssVariables,
    getCssVariableVariantName,
    toUnitValue,
    getResolvedCssVariableVariantName,
    defineModule,
    defineGeneratorValueFn,
    addModifier,
    divideModifier,
    multiplyModifier,
    subtractModifier
} from '../utils';
import { GeneratorOutput, GeneratorPriority } from '../types';
import { RawThemeGenericVariant } from './generic';

/**
 * Grid gutter
 */

export type RawThemeGridGutter = string | number;

export type RawThemeGridGutterVariant = RawThemeGenericVariant;

export type ResolvedThemeGridGutter = RawThemeGridGutter;

export const gutterModifiers: Record<
    keyof RawThemeGridGutterVariant,
    (gutter: RawThemeGridGutter, value?: any) => string
> = {
    add: addModifier,
    subtract: subtractModifier,
    multiply: multiplyModifier,
    divide: divideModifier
};

export const resolveGridGutter = defineResolverValueFn<RawThemeGridGutter, ResolvedThemeGridGutter>(
    (gutter) => gutter
);

export const resolveGridGutterVariant = defineResolverVariantFn<
    RawThemeGridGutterVariant | RawThemeGridGutter,
    ResolvedThemeGridGutter
>((variant, meta) => {
    if (typeof variant === 'string') {
        return resolveGridGutter(variant, meta);
    }

    return Object.keys(variant).reduce((acc, modifierName) => {
        if (modifierName in gutterModifiers) {
            acc = gutterModifiers[modifierName as keyof typeof gutterModifiers](
                acc,
                (variant as RawThemeGridGutterVariant)[modifierName]
            );
        }

        return acc;
    }, codegenCssVariables.get('gutter'));
});

export const gridGutterResolver = defineResolver({
    key: [/^grid\.gutter\.[^.]+$/],
    resolve: createGenericVariantResolveFn(resolveGridGutter, resolveGridGutterVariant)
});

export const gridGutterGenerator = defineGenerator({
    key: /^grid\.gutter\.[^.]+$/,
    output: GeneratorOutput.CssVariables,
    generate: defineGeneratorValueFn<ResolvedThemeGridGutter>((value, meta) => {
        const variantName = getCssVariableVariantName(meta);
        const resolvedVariantName = getResolvedCssVariableVariantName(variantName);
        const variantValue = toUnitValue(value);

        return [codegenCssVariables.set(`gutter${resolvedVariantName}`, variantValue)];
    })
});

/**
 * Grid container
 */

export type RawThemeGridContainer = string | number;

export type ResolvedThemeGridContainer = RawThemeGridContainer;

export const resolveGridContainer = defineResolverValueFn<
    RawThemeGridContainer,
    ResolvedThemeGridContainer
>((container) => {
    return container;
});

export const resolveGridContainerVariant = defineResolverVariantFn<
    RawThemeGridContainer,
    ResolvedThemeGridContainer
>(resolveGridContainer);

export const gridContainerResolver = defineResolver({
    key: [/^grid\.container\.[^.]+$/],
    resolve: createGenericVariantResolveFn(resolveGridContainer, resolveGridContainerVariant)
});

export const gridContainerGenerator = defineGenerator({
    key: /^grid\.container\.[^.]+$/,
    output: GeneratorOutput.CssVariables,
    generate: defineGeneratorValueFn<ResolvedThemeGridContainer>((value, meta) => {
        const variantName = getCssVariableVariantName(meta);

        if (variantName === 'default') {
            return [];
        }

        const resolvedVariantName = `-${variantName}`;
        const variantValue = toUnitValue(value);

        return [codegenCssVariables.set(`container${resolvedVariantName}`, variantValue)];
    })
});

/**
 * Grid columns
 */

export type RawThemeGridColumns = number;

export type ResolvedThemeGridColumns = RawThemeGridColumns;

export const gridColumnsResolver = defineResolver({
    key: 'grid.columns',
    resolve: defineResolverValueFn<RawThemeGridColumns, ResolvedThemeGridColumns>((columns) => {
        return columns;
    })
});

export const gridColumnsGenerator = defineGenerator<ResolvedThemeGridColumns>({
    key: 'grid.columns.default',
    output: GeneratorOutput.CssVariables,
    generate: (columns) => {
        return [codegenCssVariables.set('columns', `${columns}`)];
    }
});

export const gridColumnsMixinsGenerator = defineGenerator<ResolvedThemeGridColumns>({
    key: 'grid.columns.default',
    output: GeneratorOutput.Mixins,
    priority: GeneratorPriority.Highest,
    generate: (columns) => {
        return [codegenScssVariables.set('columns', `${columns}`)];
    }
});

/**
 * Module
 */

export const grid = defineModule(({ registerResolver, registerGenerator }) => {
    registerResolver(gridGutterResolver);
    registerGenerator(gridGutterGenerator);

    registerResolver(gridContainerResolver);
    registerGenerator(gridContainerGenerator);

    registerResolver(gridColumnsResolver);
    registerGenerator(gridColumnsGenerator);
    registerGenerator(gridColumnsMixinsGenerator);
});
