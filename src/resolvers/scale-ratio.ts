import { ResolvedTheme, Resolver, Theme } from '../types';
import { parseValue } from '../helpers';

export const scaleRatioResolver: Resolver<
    Theme['scaleRatio'][string],
    ResolvedTheme['scaleRatio'][string]
> = {
    name: 'scaleRatio',
    test: /(.*)scaleRatio\.([\w-]+)$/,
    skip: /^variants/,
    set: '$1scaleRatio.$2',
    apply: (context) => parseValue(context)
};

export const scaleRatioResolvers = [scaleRatioResolver];
