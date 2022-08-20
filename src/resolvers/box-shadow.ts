import { BoxShadow, ResolvedTheme, Resolver } from '../types';
import { parseGenericComposedValue, parseValue } from '../helpers';

export const setBoxShadowFieldsFn = (target: ResolvedTheme['boxShadow'], values: string[]) => {
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

export const boxShadowResolver: Resolver<string, ResolvedTheme['boxShadow']> = {
    name: 'boxShadow',
    test: /(.*)boxShadow$/,
    skip: /^variants/,
    set: '$1boxShadow',
    guard: (context) => typeof context.value === 'string',
    apply: (context) => parseGenericComposedValue(context, setBoxShadowFieldsFn)
};

export const boxShadowDefaultResolver: Resolver<string, ResolvedTheme['boxShadow']> = {
    name: 'boxShadow',
    test: /(.*)boxShadow\.default$/,
    skip: /^variants/,
    set: '$1boxShadow',
    apply: (context) => parseGenericComposedValue(context, setBoxShadowFieldsFn)
};

export const boxShadowFieldResolver: Resolver<BoxShadow[string], ResolvedTheme['boxShadow'][string]> = {
    name: 'boxShadow',
    test: /(.*)boxShadow\.(\w+)$/,
    skip: /^variants/,
    set: '$1boxShadow.$2',
    apply: (context) => parseValue(context)
};

export const boxShadowResolvers = [
    boxShadowResolver,
    boxShadowDefaultResolver,
    boxShadowFieldResolver
];
