import { parseValue } from '../helpers';
import { ResolvedTheme, Resolver, Theme } from '../types';

export const breakpointsResolver: Resolver<Theme['breakpoints'][string], ResolvedTheme['breakpoints'][string]> = {
    name: 'breakpoints',
    test: /(.*)breakpoints\.([\w-]+)$/,
    skip: /^variants/,
    set: '$1breakpoints.$2',
    apply: (context) => {
        const value = parseValue(context);
        return typeof value === 'string' ? value : `${value}px`;
    }
};

export const breakpointsResolvers = [
    breakpointsResolver
];
