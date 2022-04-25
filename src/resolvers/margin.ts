import { UserConfiguration } from '../types';
import { parseSidesValue, parseValue } from '../helpers';

export const marginResolvers: UserConfiguration.ResolverPlugin<{}, UserConfiguration.Theme['margin']> = () => [
    {
        test: /(.*)margin$/,
        set: '$1margin',
        resolve: ({ config, value }) => parseSidesValue(config, value)
    },
    {
        test: /(.*)margin.default$/,
        set: '$1margin',
        resolve: ({ config, value }) => parseSidesValue(config, value)
    },
    {
        test: /(.*)margin.(\w+)$/,
        set: '$1margin.$2',
        resolve: ({ config, value }) => parseValue(config, value)
    }
];
