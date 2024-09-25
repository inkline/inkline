import {
    codegenCssVariables,
    defineResolver,
    defineResolverValueFn,
    defineResolverVariantFn,
    toUnitValue,
    createGenericVariantResolveFn,
    defineGenerator,
    getResolvedCssVariableVariantName,
    getCssVariableVariantName,
    getCssVariablePreamble,
    getCssVariablePreamblePath,
    defineGeneratorValueFn,
    shouldGenerateAggregateValue,
    resolveStringValue,
    defineModule,
    createSetModifier,
    addModifier,
    divideModifier,
    multiplyModifier,
    subtractModifier
} from '../utils';
import { GeneratorOutput, GeneratorPriority, SidesPropertyKey } from '../types';
import { sidesPropertyKeys } from '../constants';

/**
 * Spacing
 */

export type RawThemeSpacing = number | string;

export type ResolvedThemeSpacing = string;

export interface RawThemeSpacingVariant {
    add?: number | string;
    subtract?: number | string;
    multiply?: number | string;
    divide?: number | string;
    [key: string]: string | number | boolean | undefined;
}

export const spacingModifiers: Record<
    keyof RawThemeSpacingVariant,
    (sizeMultiplier: RawThemeSpacing, value?: any) => string
> = {
    add: addModifier,
    subtract: subtractModifier,
    multiply: multiplyModifier,
    divide: divideModifier
};

export const resolveSpacing = defineResolverValueFn<RawThemeSpacing, ResolvedThemeSpacing>(
    (spacing) => toUnitValue(spacing)
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

export const spacingResolver = defineResolver({
    key: [/^spacing\.[^.]+$/, /.*\.spacing$/],
    resolve: createGenericVariantResolveFn(resolveSpacing, resolveSpacingVariant)
});

export const generateSpacing = defineGeneratorValueFn<ResolvedThemeSpacing>((spacing, meta) => {
    const variablePreamblePath = getCssVariablePreamblePath(meta);
    const variablePreamble = getCssVariablePreamble(variablePreamblePath);

    const tokens: string[] = [];
    const variantName = getCssVariableVariantName(meta);
    const resolvedVariantName = getResolvedCssVariableVariantName(variantName);

    const variableName = `${variablePreamble}spacing${resolvedVariantName}`;

    tokens.push(codegenCssVariables.set(variableName, spacing));

    return tokens;
});

export const spacingGenerator = defineGenerator({
    key: [/^spacing\.[^.]+$/, /.*\.spacing$/],
    output: GeneratorOutput.CssVariables,
    priority: GeneratorPriority.High,
    generate: generateSpacing
});

/**
 * Spacing with Sides
 */

export type SpacingSide = SidesPropertyKey;

export type RawThemeSpacingWithSides = Record<SpacingSide, number | string>;

export type ResolvedThemeSpacingWithSides = RawThemeSpacingWithSides;

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

export const topModifier = createSetModifier('top');
export const rightModifier = createSetModifier('right');
export const bottomModifier = createSetModifier('bottom');
export const leftModifier = createSetModifier('left');
export const xModifier = createSetModifier(['left', 'right']);
export const yModifier = createSetModifier(['top', 'bottom']);
export const allModifier = createSetModifier(['top', 'right', 'bottom', 'left']);
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
            ({ top, right, bottom, left } = resolveStringValue(
                spacing,
                sidesPropertyKeys,
                'sides'
            ));
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

const generateSpacingWithSides = (property: string) =>
    defineGeneratorValueFn<ResolvedThemeSpacingWithSides>((spacing, meta) => {
        const tokens: string[] = [];
        const variablePreamblePath = getCssVariablePreamblePath(meta);
        const variablePreamble = getCssVariablePreamble(variablePreamblePath);
        const variantName = getCssVariableVariantName(meta);
        const resolvedVariantName = getResolvedCssVariableVariantName(variantName);

        sidesPropertyKeys.forEach((side) => {
            const variableValue = toUnitValue(spacing[side]);
            const variableName = `${variablePreamble}${property}-${side}${resolvedVariantName}`;

            if (typeof spacing[side] !== 'undefined') {
                tokens.push(codegenCssVariables.set(variableName, variableValue));
            }
        });

        if (shouldGenerateAggregateValue(meta)) {
            tokens.push(
                codegenCssVariables.set(
                    `${variablePreamble}${property}${resolvedVariantName}`,
                    sidesPropertyKeys
                        .map((side) =>
                            codegenCssVariables.get(
                                `${variablePreamble}${property}-${side}${resolvedVariantName}`
                            )
                        )
                        .join(' ')
                )
            );
        }

        return tokens;
    });

/**
 * Margin
 */

export type RawThemeMargin = string | RawThemeSpacingWithSides;

export type ResolvedThemeMargin = ResolvedThemeSpacingWithSides;

export type RawThemeMarginVariant = string | RawThemeSpacingWithSidesVariant;

export const marginResolver = defineResolver({
    key: [/^margin\.[^.]+$/, /.*\.margin$/],
    resolve: createGenericVariantResolveFn(
        resolveSpacingWithSides,
        resolveSpacingWithSidesVariant('margin')
    )
});

export const generateMargin = defineGeneratorValueFn<ResolvedThemeMargin>(
    generateSpacingWithSides('margin')
);

export const marginGenerator = defineGenerator({
    key: [/^margin\.[^.]+$/, /.*\.margin$/],
    output: GeneratorOutput.CssVariables,
    priority: GeneratorPriority.Medium,
    generate: generateMargin
});

/**
 * Padding
 */

export type RawThemePadding = string | RawThemeSpacingWithSides;

export type ResolvedThemePadding = ResolvedThemeSpacingWithSides;

export type RawThemePaddingVariant = string | RawThemeSpacingWithSidesVariant;

export const paddingResolver = defineResolver({
    key: [/^padding\.[^.]+$/, /.*\.padding$/],
    resolve: createGenericVariantResolveFn(
        resolveSpacingWithSides,
        resolveSpacingWithSidesVariant('padding')
    )
});

export const generatePadding = defineGeneratorValueFn<ResolvedThemePadding>(
    generateSpacingWithSides('padding')
);

export const paddingGenerator = defineGenerator({
    key: [/^padding\.[^.]+$/, /.*\.padding$/],
    output: GeneratorOutput.CssVariables,
    priority: GeneratorPriority.Medium,
    generate: generatePadding
});

/**
 * Module
 */

export const spacing = defineModule(({ registerResolver, registerGenerator }) => {
    registerResolver(spacingResolver);
    registerGenerator(spacingGenerator);

    registerResolver(marginResolver);
    registerGenerator(marginGenerator);

    registerResolver(paddingResolver);
    registerGenerator(paddingGenerator);
});
