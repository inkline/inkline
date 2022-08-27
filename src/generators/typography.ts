import {
    Generator,
    GeneratorPriority,
    NumberPropertyVariant,
    ResolvedColorProperty, ResolvedColorPropertyObject,
    ResolvedTheme,
    ThemeVariants
} from '../types';
import {codegenColorVariables, codegenGetCSSVariable, codegenNumberVariant, codegenSetCSSVariable} from '../helpers';
import { toDashCase } from '@grozav/utils';
import * as CSS from 'csstype';
import color from 'color';

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

export const typographyColorGenerator: Generator<ResolvedTheme['color'][string]> = {
    name: 'color',
    location: 'root',
    priority: GeneratorPriority.Low,
    test: /^typography.color$/,
    apply: ({ value, theme }) => {
        const textColors = Object.keys(value).map((colorName) => {
            return codegenColorVariables(colorName, (value as Record<string, ResolvedColorProperty>)[colorName] as ResolvedTheme['typography']['color'][string], 'text--color');
        }).flat();

        const contrastColors = Object.keys(theme.color).map((colorName) => {
            if (theme.typography.contrastColor?.[colorName]) {
                return codegenSetCSSVariable(`contrast-text--color-${toDashCase(colorName)}`, theme.typography.contrastColor[colorName]);
            }

            let luma;
            try {
                const { h, s, l, a: alpha } = theme.color[colorName] as ResolvedColorPropertyObject;
                const constructedColor = color({ h, s, l, alpha });
                const rgb = constructedColor.rgb().object();

                Object.keys(rgb).forEach((key) => {
                    rgb[key] = rgb[key] / 255;

                    if (rgb[key] <= 0.04045) {
                        rgb[key] = rgb[key] / 12.92;
                    } else {
                        rgb[key] = Math.pow((rgb[key] + 0.055) / 1.055, 2.4);
                    }
                });

                luma = 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b;
            } catch (error) {
                console.error('Could not calculate luma for color. Using text-dark as fallback value.', colorName);

                luma = 1;
            }

            const contrastColor = luma > 0.179
                ? codegenGetCSSVariable('text--color-white')
                : codegenGetCSSVariable('text--color-black');

            return codegenSetCSSVariable(`contrast-text--color-${toDashCase(colorName)}`, contrastColor);
        });

        return ['/**', ' * Text color variables', ' */']
            .concat(textColors)
            .concat([
                '', '/**', ' * Contrast text color variables', ' */'
            ])
            .concat(contrastColors);
    }
};

export const typographyGenerators = [
    typographyFontFamilyGenerator,
    typographyFontWeightGenerator,
    typographyFieldGenerator,
    typographyFontSizeVariantsGenerator,
    typographyColorGenerator
];
