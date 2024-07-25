import Color from 'color';
import {
    codegenCssVariables,
    defineResolver,
    defineResolverValueFn,
    defineResolverVariantFn,
    createGenericVariantResolveFn,
    defineGeneratorValueFn,
    shouldGenerateAggregateValue,
    defineGenerator,
    getCssVariablePreamblePath,
    getCssVariablePreamble,
    getCssVariableName,
    getCssVariableVariantName,
    getResolvedCssVariableVariantName,
    defineModule,
    createSetModifier
} from '../utils';
import { GeneratorOutput, HSLAColor, RGBAColor } from '../types';

/**
 * Types
 */

export interface RawThemeColorVariant {
    hue?: number | string;
    h?: number | string;
    saturation?: number | string;
    s?: number | string;
    lightness?: number | string;
    l?: number | string;
    alpha?: number | string;
    a?: number | string;
    lighten?: number | string;
    darken?: number | string;
    saturate?: number | string;
    desaturate?: number | string;
    grayscale?: true;
    fade?: number | string;
    opaquer?: number | string;
    rotate?: number | string;
    [key: string]: string | number | boolean | undefined;
}

export type RawThemeColor = string | RGBAColor | HSLAColor;

export type ResolvedThemeColorObject = Required<HSLAColor>;
export type ResolvedThemeColor = ResolvedThemeColorObject | string;

/**
 * Utils
 */

export const hueModifier = createSetModifier('h');
export const saturationModifier = createSetModifier('s');
export const lightnessModifier = createSetModifier('l');
export const alphaModifier = createSetModifier('a');
export const lightenModifier = (
    color: ResolvedThemeColor,
    value: RawThemeColorVariant['lighten']
) => {
    if (typeof color === 'string') {
        return;
    }

    color.l = `calc(${color.l} + ${
        typeof value === 'number' && value > 1 ? `${value}%` : `${color.l} * ${value}`
    })`;
};

export const darkenModifier = (
    color: ResolvedThemeColor,
    value: RawThemeColorVariant['darken']
) => {
    if (typeof color === 'string') {
        return;
    }

    color.l = `calc(${color.l} - ${
        typeof value === 'number' && value > 1 ? `${value}%` : `${color.l} * ${value}`
    })`;
};

export const saturateModifier = (
    color: ResolvedThemeColor,
    value: RawThemeColorVariant['saturate']
) => {
    if (typeof color === 'string') {
        return;
    }

    color.s = `calc(${color.s} + ${color.s} * ${value})`;
};

export const desaturateModifier = (
    color: ResolvedThemeColor,
    value: RawThemeColorVariant['desaturate']
) => {
    if (typeof color === 'string') {
        return;
    }

    color.s = `calc(${color.s} - ${color.s} * ${value})`;
};

export const grayscaleModifier = (color: ResolvedThemeColor) => {
    if (typeof color === 'string') {
        return;
    }

    color.s = 0;
};

export const rotateModifier = (
    color: ResolvedThemeColor,
    value: RawThemeColorVariant['rotate']
) => {
    if (typeof color === 'string') {
        return;
    }

    color.h = `calc(${color.h} + ${value})`;
};

export const fadeModifier = (color: ResolvedThemeColor, value: RawThemeColorVariant['fade']) => {
    if (typeof color === 'string') {
        return;
    }

    color.a = `calc(${color.a} - ${color.a} * ${value})`;
};

export const opaquerModifier = (
    color: ResolvedThemeColor,
    value: RawThemeColorVariant['opaquer']
) => {
    if (typeof color === 'string') {
        return;
    }

    color.a = `calc(${color.a} + ${color.a} * ${value})`;
};

export const colorModifiers: Record<
    keyof RawThemeColorVariant,
    (color: ResolvedThemeColor, value?: any) => void
> = {
    hue: hueModifier,
    h: hueModifier,
    saturation: saturationModifier,
    s: saturationModifier,
    lightness: lightnessModifier,
    l: lightnessModifier,
    alpha: alphaModifier,
    a: alphaModifier,
    lighten: lightenModifier,
    darken: darkenModifier,
    saturate: saturateModifier,
    desaturate: desaturateModifier,
    grayscale: grayscaleModifier,
    rotate: rotateModifier,
    fade: fadeModifier,
    opaquer: opaquerModifier
};

/**
 * Resolver
 */

export const resolveColor = defineResolverValueFn<RawThemeColor, ResolvedThemeColor>((color) => {
    let h: HSLAColor['h'], s: HSLAColor['s'], l: HSLAColor['l'], a: HSLAColor['a'];
    if (typeof color === 'string') {
        if (['transparent', 'inherit'].includes(color)) {
            return color;
        } else if (color.includes('var')) {
            const colorName = color.slice(6, -1); // remove 'var(--' and ')'
            h = codegenCssVariables.get(`${colorName}-h`);
            s = codegenCssVariables.get(`${colorName}-s`);
            l = codegenCssVariables.get(`${colorName}-l`);
            a = codegenCssVariables.get(`${colorName}-a`);
        } else {
            ({ h, s, l, alpha: a } = Color(color).hsl().object());
        }
    } else if ('r' in color) {
        const { r, g, b, a: alpha } = color;
        ({ h, s, l, alpha: a } = Color({ r, g, b, alpha }).hsl().object());
    } else {
        ({ h, s, l, a } = color);
    }

    return { h, s, l, a: a || 1 };
});

export const resolveColorVariant = defineResolverVariantFn<
    RawThemeColorVariant | RawThemeColor,
    ResolvedThemeColor
>((variant, meta) => {
    if (typeof variant === 'string' || 'r' in variant) {
        return resolveColor(variant as RawThemeColor, meta);
    }

    const propertyName = 'color';
    const colorName = meta.path[meta.path.length - 2];

    const variantValue = {
        h: codegenCssVariables.get(`${propertyName}-${colorName}-h`),
        s: codegenCssVariables.get(`${propertyName}-${colorName}-s`),
        l: codegenCssVariables.get(`${propertyName}-${colorName}-l`),
        a: codegenCssVariables.get(`${propertyName}-${colorName}-a`)
    };

    Object.keys(variant).forEach((modifierName) => {
        if (modifierName in colorModifiers) {
            colorModifiers[modifierName](
                variantValue,
                (variant as RawThemeColorVariant)[modifierName]
            );
        }
    });

    return variantValue;
});

export const colorsResolver = defineResolver({
    key: [/^colors\.[^.]+\.[^.]+$/, /.*\.color$/, /.*\.background$/],
    ignore: [/^typography\..*$/, /border\..*/, /boxShadow\..*/],
    resolve: createGenericVariantResolveFn(resolveColor, resolveColorVariant)
});

/**
 * Generator
 */

export const createColorGenerateFn = (variableName: string) => {
    return defineGeneratorValueFn<ResolvedThemeColor>((color, meta) => {
        if (typeof color === 'string') {
            return [codegenCssVariables.set(variableName, color)];
        }

        const tokens = [];
        const { h, s, l, a } = color;

        const resolvedH = typeof h === 'string' ? h : h.toString();
        const resolvedS = typeof s === 'string' ? s : `${s}%`;
        const resolvedL = typeof l === 'string' ? l : `${l}%`;
        const resolvedA = typeof a === 'string' ? a : a.toString();

        tokens.push(codegenCssVariables.set(`${variableName}-h`, resolvedH));
        tokens.push(codegenCssVariables.set(`${variableName}-s`, resolvedS));
        tokens.push(codegenCssVariables.set(`${variableName}-l`, resolvedL));
        tokens.push(codegenCssVariables.set(`${variableName}-a`, resolvedA));

        if (shouldGenerateAggregateValue(meta)) {
            tokens.push(
                codegenCssVariables.set(
                    `${variableName}`,
                    `hsla(${[
                        codegenCssVariables.get(`${variableName}-h`),
                        codegenCssVariables.get(`${variableName}-s`),
                        codegenCssVariables.get(`${variableName}-l`)
                    ].join(' ')} / ${codegenCssVariables.get(`${variableName}-a`)})`
                )
            );
        }

        return tokens;
    });
};

export const colorsGenerator = defineGenerator({
    key: [/^colors\.[^.]+\.[^.]+$/],
    output: GeneratorOutput.CssVariables,
    generate: defineGeneratorValueFn<ResolvedThemeColor>((value, meta) => {
        const variablePath = meta.path.slice(-2).filter((part) => part !== 'default');

        return createColorGenerateFn(`color-${variablePath.join('-')}`)(value, meta);
    })
});

export const colorGenerator = defineGenerator({
    key: [/.*\.color$/, /.*\.background$/],
    ignore: [/^typography\.[^.]+$/, /border\..*/, /boxShadow\..*/],
    output: GeneratorOutput.CssVariables,
    generate: defineGeneratorValueFn<ResolvedThemeColor>((value, meta) => {
        const variablePreamblePath = getCssVariablePreamblePath(meta);
        const variablePreamble = getCssVariablePreamble(variablePreamblePath);
        const variableName = getCssVariableName(meta);
        const variantName = getCssVariableVariantName(meta);
        const resolvedVariantName = getResolvedCssVariableVariantName(variantName);

        return createColorGenerateFn(`${variablePreamble}${variableName}${resolvedVariantName}`)(
            value,
            meta
        );
    })
});

/**
 * Module
 */

export const colors = defineModule(({ registerResolver, registerGenerator }) => {
    registerResolver(colorsResolver);
    registerGenerator(colorsGenerator);
    registerGenerator(colorGenerator);
});
