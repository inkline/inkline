import { NumberVariant, Theme, UserConfiguration } from '../types';
import { codegenNumberVariant, codegenSetCSSVariable } from '../helpers';
import { toDashCase } from '@grozav/utils';
import * as CSS from 'csstype';

export const typographyGenerators: UserConfiguration.GeneratorPlugin<{}, Theme['typography'][string]> = () => [
    {
        name: 'typography',
        test: /(.*)typography\.fontFamily$/,
        skip: /^variants/,
        generate: ({ value }) => {
            const groups = value as Record<string, Record<string, CSS.Property.FontFamily>>;
            const groupNames = Object.keys(groups).sort();

            return ['/**', ' * Typography - Font family variables', ' */']
                .concat(
                    groupNames.map((groupName) =>
                        Object.keys(groups[groupName]).map((type) => codegenSetCSSVariable(
                            `font-family-${toDashCase(groupName)}-${toDashCase(type)}`,
                            groups[groupName][type]
                        ))
                    ).flat()
                );
        }
    },
    {
        name: 'typography',
        test: /(.*)typography\.fontWeight$/,
        skip: /^variants/,
        generate: ({ value }) => {
            const fontWeights = value as Record<string, CSS.Property.FontWeight>;

            return ['/**', ' * Typography - Font weight variables', ' */']
                .concat(
                    Object.keys(fontWeights).map((fontWeightName) => codegenSetCSSVariable(
                        `font-weight-${toDashCase(fontWeightName)}`,
                        fontWeights[fontWeightName]
                    ))
                );
        }
    },
    {
        name: 'typography',
        test: /(.*)typography\.(lineHeight|letterSpacing|fontSize)$/,
        skip: /^variants/,
        generate: ({ value, path }) => {
            const name = toDashCase(path[path.length - 1]);

            return ['/**', ` * Typography ${name} variable`, ' */']
                .concat(
                    codegenSetCSSVariable(name, value)
                );
        }
    },
    {
        name: 'variants.typography',
        test: /variants\.typography\.fontSize$/,
        generate: ({ config, value }) => {
            return ['/**', ' * Typography font size variants variables', ' */']
                .concat(
                    Object.keys(value).map((variantName) =>
                        codegenNumberVariant(config, 'font-size', variantName, (value as Record<string, NumberVariant>)[variantName])
                    )
                ).flat();
        }
    }
];
