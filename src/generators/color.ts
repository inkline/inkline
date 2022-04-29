import { ColorVariant, Configuration, Theme, UserConfiguration } from '../types';
import { codegenGetCSSVariable } from '../helpers';
import { codegenColorVariables } from '../helpers/codegen/color';

/**
 * Modifiers that can be applied to color values in order to produce a new variant
 *
 * @param color
 * @param value
 */
const modifiers: {
    [key: string]: (color: Theme['color'][string], value: number | boolean | undefined) => void;
} = {
    hue: (color, value) => {
        color.h = value as string | number;
    },
    saturation: (color, value) => {
        color.s = value as string | number;
    },
    lightness: (color, value) => {
        color.l = value as string | number;
    },
    alpha: (color, value) => {
        color.a = value as string | number;
    },
    lighten: (color, value) => {
        color.l = `calc(${color.l} + ${color.l} * ${value})`;
    },
    darken: (color, value) => {
        color.l = `calc(${color.l} - ${color.l} * ${value})`;
    },
    saturate: (color, value) => {
        color.s = `calc(${color.s} + ${color.s} * ${value})`;
    },
    desaturate: (color, value) => {
        color.s = `calc(${color.s} - ${color.s} * ${value})`;
    },
    rotate: (color, value) => {
        color.h = `calc(${color.h} + ${value})`;
    },
    fade: (color, value) => {
        color.a = `calc(${color.a} - ${color.a} * ${value})`;
    },
    opaquer: (color, value) => {
        color.a = `calc(${color.a} + ${color.a} * ${value})`;
    }
};

/**
 * Aliases that can be used for specific modifiers
 */
const modifierAliases: Record<string, string> = {
    h: 'hue',
    s: 'saturation',
    l: 'lightness',
    a: 'alpha'
};

/**
 * Generate the code for a specific variant if needed
 *
 * @param config
 * @param name
 * @param variantName
 * @param variant
 */
const codegenVariant = (config: Configuration, name: string, variantName: string, variant: ColorVariant): string[] => {
    const variantValue: Theme['color'][string] = {
        h: codegenGetCSSVariable(`color-${name}-h`),
        s: codegenGetCSSVariable(`color-${name}-s`),
        l: codegenGetCSSVariable(`color-${name}-l`),
        a: codegenGetCSSVariable(`color-${name}-a`)
    };

    Object.keys(variant).forEach((modifier) => {
        (modifiers[modifier] || modifiers[modifierAliases[modifier]])(variantValue, variant[modifier]);
    });

    return codegenColorVariables(`${name}-${variantName}`, variantValue);
};

export const colorGenerators: UserConfiguration.GeneratorPlugin<{}, Theme['color'][string] | ColorVariant> = () => [
    {
        test: /(.*)color\.(\w+)$/,
        skip: /^variants/,
        generate: ({ theme, value, path }) => {
            const name = path[path.length - 1];

            return codegenColorVariables(name, value as Theme['color'][string]);
        }
    },
    {
        test: /variants.color\.(.+)\.(.+)$/,
        generate: ({ config, theme, value, path }) => {
            const [name, key] = path.slice(-2);

            return codegenVariant(config, name, key, value as ColorVariant);
        }
    }
];
