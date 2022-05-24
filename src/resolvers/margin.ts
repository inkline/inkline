import { UserConfiguration } from '../types';
import { parseSidesValue, parseValue, parseRecursive } from '../helpers';

export const marginResolvers: UserConfiguration.ResolverPlugin<{}, UserConfiguration.Theme['margin']> = () => [
    {
        test: /(.*)margin(\.default)?$/,
        skip: /^variants/,
        set: '$1margin',
        resolve: ({ config, value }) => parseSidesValue(config, value)
    },
    {
        test: /(.*)margin\.default$/,
        skip: /^variants/,
        set: '$1margin',
        resolve: ({ config, value }) => parseSidesValue(config, value)
    },
    {
        test: /(.*)margin\.(\w+)$/,
        skip: /^variants/,
        set: '$1margin.$2',
        resolve: ({ config, value }) => parseValue(config, value)
    },
    {
        test: /^variants\.margin\.(\w+)$/,
        set: 'variants.margin.$1',
        resolve: ({ config, value }) => typeof value === 'object'
            ? parseRecursive(config, value)
            : parseSidesValue(config, value)
    }
];
