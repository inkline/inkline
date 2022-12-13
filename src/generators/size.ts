import {
    Generator,
    GeneratorPriority,
    NumberPropertyVariant,
    ResolvedTheme,
    ThemeVariants
} from '../types';
import { codegenNumberVariant, codegenSetCSSVariable } from '../helpers';
import { toDashCase } from '@grozav/utils';
import { MATCH_VARIANTS_REGEX, MATCH_ELEMENTS_REGEX } from '../constants';

export const sizeMultiplierGenerator: Generator<ResolvedTheme['size']['multiplier']> = {
    name: 'size',
    test: /(.*)size\.multiplier$/,
    skip: [MATCH_VARIANTS_REGEX, MATCH_ELEMENTS_REGEX],
    priority: GeneratorPriority.High,
    apply: ({ value }) => {
        return ['/**', ' * Size multiplier variable', ' */'].concat([
            codegenSetCSSVariable('size-multiplier', value)
        ]);
    }
};

export const sizeMultiplierVariantsGenerator: Generator<ThemeVariants['size']['multiplier']> = {
    name: 'size',
    test: /variants\.size\.multiplier$/,
    priority: GeneratorPriority.High,
    apply: ({ config, value }) => {
        return ['/**', ' * Size multiplier variants variables', ' */'].concat(
            Object.keys(value).map((sizeMultiplierName) =>
                codegenNumberVariant(
                    config,
                    'size-multiplier',
                    sizeMultiplierName,
                    value[sizeMultiplierName] as NumberPropertyVariant
                )
            )
        );
    }
};

export const sizePercentagesGenerator: Generator<ResolvedTheme['size']['percentages']> = {
    name: 'size',
    location: 'root',
    test: /(.*)size\.percentages$/,
    skip: [MATCH_VARIANTS_REGEX, MATCH_ELEMENTS_REGEX],
    priority: GeneratorPriority.High,
    apply: ({ value }) => {
        return ['/**', ' * Size percentage variables', ' */'].concat(
            Object.keys(value).map((sizeName) =>
                codegenSetCSSVariable(`size-percentages-${toDashCase(sizeName)}`, value[sizeName])
            )
        );
    }
};

export const sizeGenerators = [
    sizeMultiplierGenerator,
    sizeMultiplierVariantsGenerator,
    sizePercentagesGenerator
];
