import {Generator, NumberPropertyVariant, ResolvedTheme, ThemeVariants} from '../types';
import { codegenNumberVariant, codegenSetCSSVariable } from '../helpers';
import { toDashCase } from '@grozav/utils';
import * as CSS from 'csstype';

export const typographyFontFamilyGenerator: Generator<ResolvedTheme['typography']['fontFamily']> = {
    name: 'typography',
    location: 'root',
    test: /(.*)typography\.fontFamily$/,
    skip: /^variants/,
    apply: ({ value }) => {
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
};

export const typographyFontWeightGenerator: Generator<ResolvedTheme['typography']['fontWeight']> = {
    name: 'typography',
    location: 'root',
    test: /(.*)typography\.fontWeight$/,
    skip: /^variants/,
    apply: ({ value }) => {
        const fontWeights = value as Record<string, CSS.Property.FontWeight>;

        return ['/**', ' * Typography - Font weight variables', ' */']
            .concat(
                Object.keys(fontWeights).map((fontWeightName) => codegenSetCSSVariable(
                    `font-weight-${toDashCase(fontWeightName)}`,
                    fontWeights[fontWeightName]
                ))
            );
    }
};

export const typographyFieldGenerator: Generator<ResolvedTheme['typography']['letterSpacing' | 'lineHeight' | 'fontSize']> = {
    name: 'typography',
    location: 'root',
    test: /(.*)typography\.(lineHeight|letterSpacing|fontSize)$/,
    skip: /^variants/,
    apply: ({ value, path }) => {
        const name = toDashCase(path[path.length - 1]);

        return ['/**', ` * Typography ${name} variable`, ' */']
            .concat(
                codegenSetCSSVariable(name, value)
            );
    }
};

export const typographyFontSizeVariantsGenerator: Generator<ThemeVariants['typography']['fontSize']> = {
    name: 'typography',
    location: 'root',
    test: /variants\.typography\.fontSize$/,
    apply: ({ config, value }) => {
        return ['/**', ' * Typography font size variants variables', ' */']
            .concat(
                Object.keys(value).map((variantName) =>
                    codegenNumberVariant(config, 'font-size', variantName, value[variantName] as NumberPropertyVariant)
                )
            ).flat();
    }
};

export const typographyGenerators = [
    typographyFontFamilyGenerator,
    typographyFontWeightGenerator,
    typographyFieldGenerator,
    typographyFontSizeVariantsGenerator
];
