import { UserConfiguration } from '../types';
import { parseSidesValue, parseValue, parseRecursive } from '../helpers';

export const paddingResolvers: UserConfiguration.ResolverPlugin<{}, UserConfiguration.Theme['padding']> = () => [
    {
        test: /(.*)padding$/,
        skip: /^variants/,
        set: '$1padding',
        resolve: ({ config, value }) => parseSidesValue(config, value)
    },
    {
        test: /(.*)padding\.default$/,
        skip: /^variants/,
        set: '$1padding',
        resolve: ({ config, value }) => parseSidesValue(config, value)
    },
    {
        test: /(.*)padding\.(\w+)$/,
        skip: /^variants/,
        set: '$1padding.$2',
        resolve: ({ config, value }) => parseValue(config, value)
    },
    {
        test: /^variants\.padding\.(\w+)$/,
        set: 'variants.padding.$1',
        resolve: ({ config, value }) => typeof value === 'object'
            ? parseRecursive(config, value)
            : parseSidesValue(config, value)
    }
];
