import { ColorVariant, Configuration, Theme, UserConfiguration } from '../types';
import { codegenGetCSSVariable, codegenColorVariables } from '../helpers';
import { colorModifiers as modifiers, colorModifierAliases as modifierAliases } from './modifiers';

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

    return ['/**', ` * Color ${name}-${variantName} variant variables`, ' */']
        .concat(codegenColorVariables(`${name}-${variantName}`, variantValue));
};

export const colorGenerators: UserConfiguration.GeneratorPlugin<{}, Theme['color'][string] | ColorVariant> = () => [
    {
        name: 'color',
        test: /(.*)color\.(\w+)$/,
        skip: /^variants/,
        generate: ({ value, path }) => {
            const name = path[path.length - 1];

            return ['/**', ` * Color ${name} variables`, ' */']
                .concat(codegenColorVariables(name, value as Theme['color'][string]));
        }
    },
    {
        name: 'variants.color',
        test: /variants.color\.(.+)\.(.+)$/,
        generate: ({ config, value, path }) => {
            const [name, key] = path.slice(-2);

            return codegenVariant(config, name, key, value as ColorVariant);
        }
    }
];
