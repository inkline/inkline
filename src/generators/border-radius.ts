import { CornersVariant, Theme, UserConfiguration } from '../types';
import { cornersPropertyKeys } from '../constants';
import { codegenCornersVariant, codegenGetCSSVariable, codegenSetCSSVariable } from '../helpers';
import { toDashCase } from '@grozav/utils';

export const borderRadiusGenerators: UserConfiguration.GeneratorPlugin<{}, Theme['borderRadius']> = () => [
    {
        name: 'border-radius',
        test: /(.*)borderRadius$/,
        skip: /^variants/,
        generate: ({ value }) => ['/**', ' * Border radius variables', ' */']
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
    },
    {
        name: 'border-radius',
        test: /variants\.borderRadius\.(.+)$/,
        generate: ({ config, value, path }) => {
            const key = path[path.length - 1];

            return ['/**', ` * Border radius ${key} variant variables`, ' */']
                .concat(codegenCornersVariant(config, 'border-radius', key, value as CornersVariant));
        }
    }
];
