import {
    defineResolver,
    defineResolverValueFn,
    createGenericVariantResolveFn,
    resolveStringValue,
    codegenCssVariables,
    defineGenerator,
    defineGeneratorValueFn,
    getCssVariablePreamble,
    shouldGenerateAggregateValue,
    getCssVariableVariantName,
    getResolvedCssVariableVariantName,
    getCssVariablePreamblePath,
    defineModule
} from '../utils';
import { Border, BorderSide, GeneratorOutput } from '../types';
import { sidesPropertyKeys } from '../constants';

/**
 * Types
 */

export type RawThemeBorder =
    | string
    | Partial<Border>
    | Partial<Record<BorderSide, string | Partial<Border>>>;

export type ResolvedThemeBorder = Record<BorderSide, Border>;

/**
 * Utils
 */

const properties = ['width', 'style', 'color'];

const isBorderSidesProperty = (
    border: RawThemeBorder
): border is Record<BorderSide, string | Border> =>
    typeof border === 'object' && sidesPropertyKeys.some((key) => key in border);

const isBorderProperty = (border: RawThemeBorder): border is Border =>
    typeof border === 'object' && ('width' in border || 'style' in border || 'color' in border);

/**
 * Resolver
 */

export const resolveBorder = defineResolverValueFn(
    createGenericVariantResolveFn<RawThemeBorder, ResolvedThemeBorder>((border) => {
        const [top, right, bottom, left] = sidesPropertyKeys.map<Border>((side) => {
            if (typeof border === 'string') {
                return resolveStringValue<Border>(border, properties);
            } else if (isBorderProperty(border)) {
                return border;
            } else if (isBorderSidesProperty(border)) {
                const borderSide = border[side];
                return isBorderProperty(borderSide)
                    ? borderSide
                    : resolveStringValue<Border>(borderSide, properties);
            }

            return { width: undefined, style: undefined, color: undefined } as unknown as Border;
        });

        return { top, right, bottom, left };
    })
);

export const borderResolver = defineResolver({
    key: [/^border\.[^.]+$/, /.*\.border$/],
    resolve: resolveBorder
});

/**
 * Generator
 */

export const generateBorder = defineGeneratorValueFn<ResolvedThemeBorder>((border, meta) => {
    const variablePreamblePath = getCssVariablePreamblePath(meta);
    const variablePreamble = getCssVariablePreamble(variablePreamblePath);
    const variantName = getCssVariableVariantName(meta);
    const resolvedVariantName = getResolvedCssVariableVariantName(variantName);

    const tokens: string[] = [];
    sidesPropertyKeys.forEach((side) => {
        if (!border[side]) {
            return;
        }

        const { width, style, color } = border[side];

        const widthCssVariableName = `${variablePreamble}border-${side}-width${resolvedVariantName}`;
        if (typeof width !== 'undefined') {
            tokens.push(codegenCssVariables.set(widthCssVariableName, `${width}`));
        }

        const styleCssVariableName = `${variablePreamble}border-${side}-style${resolvedVariantName}`;
        if (typeof style !== 'undefined') {
            tokens.push(codegenCssVariables.set(styleCssVariableName, style));
        }

        const colorCssVariableName = `${variablePreamble}border-${side}-color${resolvedVariantName}`;
        if (typeof color !== 'undefined') {
            tokens.push(codegenCssVariables.set(colorCssVariableName, color));
        }

        if (shouldGenerateAggregateValue(meta)) {
            tokens.push(
                codegenCssVariables.set(
                    `${variablePreamble}border-${side}${resolvedVariantName}`,
                    [
                        codegenCssVariables.get(widthCssVariableName),
                        codegenCssVariables.get(styleCssVariableName),
                        codegenCssVariables.get(colorCssVariableName)
                    ].join(' ')
                )
            );
        }
    });

    if (shouldGenerateAggregateValue(meta)) {
        ['width', 'style', 'color'].forEach((property) => {
            tokens.push(
                codegenCssVariables.set(
                    `${variablePreamble}border-${property}${resolvedVariantName}`,
                    sidesPropertyKeys
                        .map((side) =>
                            codegenCssVariables.get(
                                `${variablePreamble}border-${side}-${property}${resolvedVariantName}`
                            )
                        )
                        .join(' ')
                )
            );
        });

        if (!variablePreamble) {
            tokens.push(
                codegenCssVariables.set(
                    `${variablePreamble}border${resolvedVariantName}`,
                    `var(--${variablePreamble}border-top${resolvedVariantName})`
                )
            );
        }
    }

    return tokens;
});

export const borderGenerator = defineGenerator({
    key: [/^border\.[^.]+$/, /.*\.border$/],
    output: GeneratorOutput.CssVariables,
    generate: generateBorder
});

/**
 * Module
 */

export const border = defineModule(({ registerResolver, registerGenerator }) => {
    registerResolver(borderResolver);
    registerGenerator(borderGenerator);
});
