import { UserConfiguration } from '../types';
import { parseSidesValue, parseValue } from '../helpers';

export const paddingResolvers: UserConfiguration.ResolverPlugin<{}, UserConfiguration.Theme['padding']> = () => [
    {
        test: /(.*)padding$/,
        set: '$1padding',
        resolve: ({ config, value }) => parseSidesValue(config, value)
    },
    {
        test: /(.*)padding.default$/,
        set: '$1padding',
        resolve: ({ config, value }) => parseSidesValue(config, value)
    },
    {
        test: /(.*)padding.(\w+)$/,
        set: '$1padding.$2',
        resolve: ({ config, value }) => parseValue(config, value)
    }
];
