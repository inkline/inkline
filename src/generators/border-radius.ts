import { CornersPropertyVariant, Generator, ResolvedTheme, ThemeVariants } from '../types';
import { cornersPropertyKeys, MATCH_VARIANTS_REGEX, MATCH_ELEMENTS_REGEX } from '../constants';
import {
    codegenCornersPropertyVariant,
    codegenGetCSSVariable,
    codegenSetCSSVariable
} from '../helpers';
import { toKebabCase } from '@grozav/utils';

export const borderRadiusGenerator: Generator<ResolvedTheme['borderRadius']> = {
    name: 'border-radius',
    location: 'root',
    test: /(.*)borderRadius$/,
    skip: [MATCH_VARIANTS_REGEX, MATCH_ELEMENTS_REGEX],
    apply: ({ value }) =>
        ['/**', ' * Border radius variables', ' */']
            .concat(
                cornersPropertyKeys.map((corner) =>
                    codegenSetCSSVariable(`border-${toKebabCase(corner)}-radius`, value[corner])
                )
            )
            .concat([
                codegenSetCSSVariable(
                    'border-radius',
                    cornersPropertyKeys
                        .map((corner) =>
                            codegenGetCSSVariable(`border-${toKebabCase(corner)}-radius`)
                        )
                        .join(' ')
                )
            ])
};

export const borderRadiusVariantGenerator: Generator<ThemeVariants['borderRadius'][string]> = {
    name: 'border-radius',
    location: 'root',
    test: /variants\.borderRadius\.(.+)$/,
    apply: ({ config, value, path }) => {
        const key = path[path.length - 1];

        return ['/**', ` * Border radius ${key} variant variables`, ' */'].concat(
            codegenCornersPropertyVariant(
                config,
                'border-radius',
                key,
                value as CornersPropertyVariant
            )
        );
    }
};

export const borderRadiusGenerators = [borderRadiusGenerator, borderRadiusVariantGenerator];
