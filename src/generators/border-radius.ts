import {
    CornersPropertyVariant,
    Generator,
    ResolvedTheme,
    ThemeVariants
} from '../types';
import { cornersPropertyKeys } from '../constants';
import { codegenCornersPropertyVariant, codegenGetCSSVariable, codegenSetCSSVariable } from '../helpers';
import { toDashCase } from '@grozav/utils';

export const borderRadiusGenerator: Generator<ResolvedTheme['borderRadius']> = {
    name: 'border-radius',
    location: 'root',
    test: /(.*)borderRadius$/,
    skip: /^variants/,
    apply: ({ value }) => ['/**', ' * Border radius variables', ' */']
        .concat(
            cornersPropertyKeys.map(
                (corner) => codegenSetCSSVariable(`border-radius-${toDashCase(corner)}`, value[corner])
            )
        )
        .concat([
            codegenSetCSSVariable('border-radius', cornersPropertyKeys.map(
                (corner) => codegenGetCSSVariable(`border-radius-${toDashCase(corner)}`)
            ).join(' '))
        ])
};

export const borderRadiusVariantGenerator: Generator<ThemeVariants['borderRadius'][string]> = {
    name: 'border-radius',
    location: 'root',
    test: /variants\.borderRadius\.(.+)$/,
    apply: ({ config, value, path }) => {
        const key = path[path.length - 1];

        return ['/**', ` * Border radius ${key} variant variables`, ' */']
            .concat(codegenCornersPropertyVariant(config, 'border-radius', key, value as CornersPropertyVariant));
    }
};

export const borderRadiusGenerators = [
    borderRadiusGenerator,
    borderRadiusVariantGenerator
];
