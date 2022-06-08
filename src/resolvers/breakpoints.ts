import { UserConfiguration } from '../types';
import { parseValue } from '../helpers';

export const breakpointsResolvers: UserConfiguration.ResolverPlugin<{}, UserConfiguration.Theme['breakpoints'][string]> = () => [
    {
        test: /(.*)breakpoints\.(\w+)$/,
        skip: /^variants/,
        set: '$1breakpoints.$2',
        resolve: ({ config, value }) => parseValue(config, value)
    }
];
