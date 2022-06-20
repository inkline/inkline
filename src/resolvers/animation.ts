import { UserConfiguration } from '../types';
import { parseGenericComposedValue, parseValue } from '../helpers';

const setAnimationFieldsFn = (target: Record<string, string | boolean>, values: string[]) => {
    target.duration = values[0];
    target.timingFunction = values[1];
};

export const animationResolvers: UserConfiguration.ResolverPlugin<{}, UserConfiguration.Theme['animation']> = () => [
    {
        test: /(.*)animation$/,
        skip: /^variants/,
        set: '$1animation',
        resolve: ({ config, value }) => parseGenericComposedValue(config, value, setAnimationFieldsFn)
    },
    {
        test: /(.*)animation\.default$/,
        skip: /^variants/,
        set: '$1animation',
        resolve: ({ config, value }) => parseGenericComposedValue(config, value, setAnimationFieldsFn)
    },
    {
        test: /(.*)animation\.(\w+)$/,
        skip: /^variants/,
        set: '$1animation.$2',
        resolve: ({ config, value }) => parseValue(config, value)
    }
];
