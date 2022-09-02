import {
    ColorPropertyObjectVariant,
    ResolvedConfiguration,
    Generator,
    ResolvedTheme,
    ThemeVariants
} from '../types';
import { codegenGetCSSVariable, codegenColorVariables } from '../helpers';
import { colorModifiers as modifiers, colorModifierAliases as modifierAliases } from './modifiers';
import { MATCH_VARIANTS_REGEX, MATCH_ELEMENTS_REGEX, MATCH_TYPOGRAPHY_REGEX } from '../constants';

/**
 * Generate the code for a specific variant if needed
 *
 * @param config
 * @param name
 * @param variantName
 * @param variant
 */
const codegenColorPropertyVariant = (config: ResolvedConfiguration, name: string, variantName: string, variant: ColorPropertyObjectVariant): string[] => {
    const variantValue: ResolvedTheme['color'][string] = {
        h: codegenGetCSSVariable(`color-${name}-h`),
        s: codegenGetCSSVariable(`color-${name}-s`),
        l: codegenGetCSSVariable(`color-${name}-l`),
        a: codegenGetCSSVariable(`color-${name}-a`)
    };

    Object.keys(variant).forEach((modifier) => {
        (modifiers[modifier] || modifiers[modifierAliases[modifier]])(variantValue, variant[modifier]);
    });

    return ['/**', ` * Color ${name}-${variantName} variant variables`, ' */']
        .concat(codegenColorVariables(`${name}-${variantName}`, variantValue));
};

export const colorGenerator: Generator<ResolvedTheme['color'][string]> = {
    name: 'color',
    location: 'root',
    test: /(.*)color\.(\w+)$/,
    skip: [MATCH_VARIANTS_REGEX, MATCH_ELEMENTS_REGEX, MATCH_TYPOGRAPHY_REGEX],
    apply: ({ value, path }) => {
        const name = path[path.length - 1];

        return ['/**', ` * Color ${name} variables`, ' */']
            .concat(codegenColorVariables(name, value as ResolvedTheme['color'][string]));
    }
};

export const colorVariantGenerator: Generator<ThemeVariants['color'][string][string]> = {
    name: 'color',
    location: 'root',
    test: /variants.color\.(.+)\.(.+)$/,
    apply: ({ config, value, path }) => {
        const [name, key] = path.slice(-2);

        return codegenColorPropertyVariant(config, name, key, value as ColorPropertyObjectVariant);
    }
};

export const colorGenerators = [
    colorGenerator,
    colorVariantGenerator
];
