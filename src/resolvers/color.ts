import { UserConfiguration } from '../types';
import { parseColor } from '../helpers';

export const colorResolvers: UserConfiguration.ResolverPlugin<{}, UserConfiguration.Property.Color> = () => [
    {
        test: /(.*)color.(\w+)$/,
        set: '$1color.$2',
        resolve: ({ config, value }) => parseColor(config, value)
    }
];
