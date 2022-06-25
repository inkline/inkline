import { UserConfiguration } from '../types';
import { parseRecursive, parseValue } from '../helpers';

export const typographyResolvers: UserConfiguration.ResolverPlugin<{}, UserConfiguration.Theme['typography'][string]> = () => [
    {
        test: /(.*)typography\.lineHeight$/,
        skip: /^variants/,
        set: '$1typography.lineHeight',
        resolve: ({ config, value }) => parseValue(config, value)
    },
    {
        test: /(.*)typography\.letterSpacing$/,
        skip: /^variants/,
        set: '$1typography.letterSpacing',
        resolve: ({ config, value }) => parseValue(config, value)
    },
    {
        test: /(.*)typography\.fontSize$/,
        skip: /^variants/,
        set: '$1typography.fontSize',
        resolve: ({ config, value }) => parseValue(config, value)
    },
    {
        test: /(.*)variants\.typography\.fontSize$/,
        set: '$1variants.typography.fontSize',
        resolve: ({ config, value }) => typeof value === 'object'
            ? parseRecursive(config, value)
            : parseValue(config, value)
    },
    {
        test: /(.*)typography.fontWeight\.(\w+)$/,
        skip: /^variants/,
        set: '$1typography.fontWeight.$2',
        resolve: ({ config, value }) => parseValue(config, value)
    },
    {
        test: /(.*)typography.fontFamily$/,
        skip: /^variants/,
        set: [
            '$1typography.fontFamily.primary.base',
            '$1typography.fontFamily.secondary.base'
        ],
        resolve: ({ config, value }) => parseValue(config, value)
    },
    {
        test: /(.*)typography.fontFamily\.(primary|secondary)$/,
        skip: /^variants/,
        set: '$1typography.fontFamily.$2.base',
        resolve: ({ config, value }) => parseValue(config, value)
    },
    {
        test: /(.*)typography.fontFamily\.(primary|secondary)\.(\w+)$/,
        skip: /^variants/,
        set: '$1typography.fontFamily.$2.$3',
        resolve: ({ config, value }) => parseValue(config, value)
    }
];
