import { UserConfiguration } from '../types';
import { parseGenericComposedValue, parseValue } from '../helpers';

const setBoxShadowFieldsFn = (target: Record<string, string | boolean>, values: string[]) => {
    if (values[0] === 'inset') {
        target.inset = true;
        values.shift();
    }

    target.offsetX = values[0];
    target.offsetY = values[1];
    target.color = values[values.length - 1];

    if (values.length >= 4) {
        target.blurRadius = values[2];
    }

    if (values.length >= 5) {
        target.spreadRadius = values[3];
    }
};

export const boxShadowResolvers: UserConfiguration.ResolverPlugin<{}, UserConfiguration.Theme['boxShadow']> = () => [
    {
        test: /(.*)boxShadow$/,
        skip: /^variants/,
        set: '$1boxShadow',
        resolve: ({ config, value }) => parseGenericComposedValue(config, value, setBoxShadowFieldsFn)
    },
    {
        test: /(.*)boxShadow\.default$/,
        skip: /^variants/,
        set: '$1boxShadow',
        resolve: ({ config, value }) => parseGenericComposedValue(config, value, setBoxShadowFieldsFn)
    },
    {
        test: /(.*)boxShadow\.(\w+)$/,
        skip: /^variants/,
        set: '$1boxShadow.$2',
        resolve: ({ config, value }) => parseValue(config, value)
    }
];
