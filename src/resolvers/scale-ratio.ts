import { UserConfiguration } from '../types';
import { parseValue } from '../helpers';

export const scaleRatioResolvers: UserConfiguration.ResolverPlugin<{}, UserConfiguration.Theme['scaleRatio'][string]> = () => [
    {
        test: /(.*)scaleRatio\.(\w+)$/,
        skip: /^variants/,
        set: '$1scaleRatio.$2',
        resolve: ({ config, value }) => parseValue(config, value)
    }
];
