import { UserConfiguration } from '../types';
import {parseCornersValue, parseGenericComposedValue, parseRecursive, parseSidesValue, parseValue} from '../helpers';

const setBorderRadiusFieldsFn = (target: Record<string, string>, [width, style, color]: string[]) => {
    target.width = width;
    target.style = style;
    target.color = color;
};

export const borderRadiusResolvers: UserConfiguration.ResolverPlugin<{}, UserConfiguration.Theme['borderRadius']> = () => [
    {
        test: /(.*)borderRadius$/,
        skip: /^variants/,
        set: '$1borderRadius',
        resolve: ({ config, value }) => parseCornersValue(config, value)
    },
    {
        test: /(.*)borderRadius\.default$/,
        skip: /^variants/,
        set: '$1borderRadius',
        resolve: ({ config, value }) => parseCornersValue(config, value)
    },
    {
        test: /(.*)borderRadius\.(\w+)$/,
        skip: /^variants/,
        set: '$1borderRadius.$2',
        resolve: ({ config, value }) => parseValue(config, value)
    },
    {
        test: /^variants\.borderRadius\.(\w+)$/,
        set: 'variants.borderRadius.$1',
        resolve: ({ config, value }) => typeof value === 'object'
            ? parseRecursive(config, value)
            : parseCornersValue(config, value)
    }
];
