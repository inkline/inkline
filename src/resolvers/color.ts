import { UserConfiguration } from '../types';
import { parseColor } from '../helpers';

export const colorResolvers: UserConfiguration.ResolverPlugin<{}, UserConfiguration.Property.Color> = () => [
    {
        test: /(.*)color\.(\w+)$/,
        skip: /^variants/,
        set: '$1color.$2',
        resolve: ({ config, value }) => parseColor(config, value)
    },
    {
        test: /^variants\.color\.(\w+)\.(\w+)$/,
        set: 'variants.color.$1.$2',
        resolve: ({ config, value }) => typeof value === 'object' ? value : parseColor(config, value)
    }
];
