import { UserConfiguration } from '../types';
import { parseValue } from '../helpers';

export const sizeResolvers: UserConfiguration.ResolverPlugin<{}, UserConfiguration.Theme['size'][string]> = () => [
    {
        test: /(.*)size\.multiplier$/,
        skip: /^variants/,
        set: '$1size.multiplier',
        resolve: ({ config, value }) => parseValue(config, value)
    },
    {
        test: /variants\.size\.multiplier\.(\w+)$/,
        set: 'variants.size.multiplier.$1',
        resolve: ({ config, value }) => parseValue(config, value)
    },
    {
        test: /(.*)size\.percentages\.(\w+)$/,
        skip: /^variants/,
        set: '$1size.percentages.$2',
        resolve: ({ config, value }) => parseValue(config, value)
    }
];
