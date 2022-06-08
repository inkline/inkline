import { UserConfiguration } from '../types';
import { parseGenericComposedValue, parseValue } from '../helpers';

const setBorderFieldsFn = (target: Record<string, string>, [width, style, color]: string[]) => {
    target.width = width;
    target.style = style;
    target.color = color;
};

export const borderResolvers: UserConfiguration.ResolverPlugin<{}, UserConfiguration.Theme['border']> = () => [
    {
        test: /(.*)border$/,
        skip: /^variants/,
        set: '$1border',
        resolve: ({ config, value }) => {
            const border = parseGenericComposedValue(config, value, setBorderFieldsFn);

            return {
                top: border,
                right: border,
                bottom: border,
                left: border
            };
        }
    },
    {
        test: /(.*)border\.default$/,
        skip: /^variants/,
        set: '$1border',
        resolve: ({ config, value }) => {
            const border = parseGenericComposedValue(config, value, setBorderFieldsFn);

            return {
                top: border,
                right: border,
                bottom: border,
                left: border
            };
        }
    },
    {
        test: /(.*)border\.(width|style|color)$/,
        skip: /^variants/,
        set: ['$1border.top.$2', '$1border.right.$2', '$1border.bottom.$2', '$1border.left.$2'],
        resolve: ({ config, value }) => parseValue(config, value)
    },
    {
        test: /(.*)border\.(\w+)$/,
        skip: /^variants/,
        set: '$1border.$2',
        resolve: ({ config, value }) => parseGenericComposedValue(config, value, setBorderFieldsFn)
    },
    {
        test: /(.*)border\.(\w+)\.(\w+)$/,
        skip: /^variants/,
        set: '$1border.$2.$3',
        resolve: ({ config, value }) => parseValue(config, value)
    }
];
