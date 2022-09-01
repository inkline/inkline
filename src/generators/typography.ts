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

        const contrastColors = Object.keys(theme.color || {})
            .sort((a) => ['dark', 'light'].includes(a) ? -1 : 1)
            .map((colorName) => {
                if (theme.typography.contrastColor?.[colorName]) {
                    return codegenSetCSSVariable(`contrast-text--color-${toDashCase(colorName)}`, theme.typography.contrastColor[colorName]);
                }

                let brightness;
                try {
                    const { h, s, l, a: alpha } = theme.color[colorName] as ResolvedColorPropertyObject;
                    const constructedColor = color({ h, s, l, alpha });
                    const rgb = constructedColor.rgb().object();

                    brightness = Math.sqrt(rgb.r * rgb.r * 0.241 + rgb.g * rgb.g * 0.691 + rgb.b * rgb.b * 0.068);
                } catch (error) {
                    console.error('Could not calculate luma for color. Using text-dark as fallback value.', colorName);

                    brightness = 128;
                }

                const contrastColor = brightness < 128
                    ? codegenGetCSSVariable('contrast-text--color-dark')
                    : codegenGetCSSVariable('contrast-text--color-light');

                return codegenSetCSSVariable(`contrast-text--color-${toDashCase(colorName)}`, contrastColor);
            });

        const result = [];

        if (textColors.length > 0) {
            result.push('/**', ' * Text color variables', ' */');
            result.push(...textColors);
        }

        if (contrastColors.length > 0) {
            result.push('', '/**', ' * Contrast text color variables', ' */');
            result.push(...contrastColors);
        }

        return result;
    }
};

export const typographyGenerators = [
    typographyFontFamilyGenerator,
    typographyFontWeightGenerator,
    typographyFieldGenerator,
    typographyFontSizeVariantsGenerator,
    typographyColorGenerator
];
