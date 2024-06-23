import {
    codegenCssVariables,
    defineResolver,
    defineResolverValueFn,
    defineResolverVariantFn,
    createGenericVariantResolveFn,
    resolveStringValue,
    defineGeneratorValueFn,
    getCssVariablePreamblePath,
    getCssVariablePreamble,
    getCssVariableVariantName,
    getResolvedCssVariableVariantName,
    toKebabCase,
    shouldGenerateAggregateValue,
    defineGenerator,
    defineModule,
    createSetModifier,
    addModifier,
    divideModifier,
    multiplyModifier,
    subtractModifier
} from '../utils';
import { BorderRadius, GeneratorOutput } from '../types';
import { cornersPropertyKeys } from '../constants';

/**
 * Types
 */

export type RawThemeBorderRadius = string | BorderRadius;

export type RawThemeBorderRadiusVariant = {
    topLeft?: string;
    topRight?: string;
    bottomRight?: string;
    bottomLeft?: string;
    all?: string;
    add?: string | number;
    subtract?: string | number;
    divide?: string | number;
    multiply?: string | number;
    [key: string]: string | number | undefined;
};

export type ResolvedThemeBorderRadius = BorderRadius;

/**
 * Utils
 */

export const borderRadiusModifiers: Record<
    keyof RawThemeBorderRadiusVariant,
    (borderRadius: ResolvedThemeBorderRadius, value?: any) => void
> = {
    topLeft: createSetModifier('topLeft'),
    topRight: createSetModifier('topRight'),
    bottomRight: createSetModifier('bottomRight'),
    bottomLeft: createSetModifier('bottomLeft'),
    all: createSetModifier(['topLeft', 'topRight', 'bottomRight', 'bottomLeft']),
    add: addModifier,
    subtract: subtractModifier,
    multiply: multiplyModifier,
    divide: divideModifier
};

/**
 * Resolver
 */

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
            ({ topLeft, topRight, bottomRight, bottomLeft } = resolveStringValue(
                borderRadius,
                cornersPropertyKeys,
                'sides'
            ));
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

export const borderRadiusResolver = defineResolver<RawThemeBorderRadius, ResolvedThemeBorderRadius>(
    {
        key: [/^borderRadius\.[^.]+$/, /.*\.borderRadius$/],
        resolve: createGenericVariantResolveFn(resolveBorderRadius, resolveBorderRadiusVariant)
    }
);

/**
 * Generator
 */

export const generateBorderRadius = defineGeneratorValueFn<ResolvedThemeBorderRadius>(
    (borderRadius, meta) => {
        const variablePreamblePath = getCssVariablePreamblePath(meta);
        const variablePreamble = getCssVariablePreamble(variablePreamblePath);
        const variantName = getCssVariableVariantName(meta);
        const resolvedVariantName = getResolvedCssVariableVariantName(variantName);

        const tokens: string[] = [];
        const cornerCssVariables: string[] = [];

        cornersPropertyKeys.forEach((corner) => {
            const resolvedCornerName = toKebabCase(corner);
            const cssVariableName = `${variablePreamble}border-${resolvedCornerName}-radius${resolvedVariantName}`;

            if (typeof borderRadius[corner] !== 'undefined') {
                tokens.push(codegenCssVariables.set(cssVariableName, borderRadius[corner]));
                cornerCssVariables.push(codegenCssVariables.get(cssVariableName));
            }
        });

        if (shouldGenerateAggregateValue(meta)) {
            tokens.push(
                codegenCssVariables.set(
                    `${variablePreamble}border-radius${resolvedVariantName}`,
                    cornerCssVariables.join(' ')
                )
            );
        }

        return tokens;
    }
);

export const borderRadiusGenerator = defineGenerator<ResolvedThemeBorderRadius>({
    key: [/^borderRadius\.[^.]+$/, /.*\.borderRadius$/],
    output: GeneratorOutput.CssVariables,
    generate: generateBorderRadius
});

/**
 * Module
 */

export const borderRadius = defineModule(({ registerResolver, registerGenerator }) => {
    registerResolver(borderRadiusResolver);
    registerGenerator(borderRadiusGenerator);
});
