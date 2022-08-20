import { Animation, ResolvedTheme, Resolver } from '../types';
import { parseGenericComposedValue, parseValue } from '../helpers';

export const setAnimationFieldsFn = (target: ResolvedTheme['animation'], values: string[]) => {
    target.duration = values[0];
    target.timingFunction = values[1];
};

export const animationResolver: Resolver<string, ResolvedTheme['animation']> = {
    name: 'animation',
    test: /(.*)animation$/,
    skip: /^variants/,
    set: '$1animation',
    guard: (context) => typeof context.value === 'string',
    apply: (context) => parseGenericComposedValue(context, setAnimationFieldsFn)
};

export const animationDefaultResolver: Resolver<string, ResolvedTheme['animation']> = {
    name: 'animation',
    test: /(.*)animation$/,
    skip: /^variants/,
    set: '$1animation',
    guard: (context) => typeof context.value === 'string',
    apply: (context) => parseGenericComposedValue(context, setAnimationFieldsFn)
};

export const animationFieldResolver: Resolver<Animation[string], ResolvedTheme['animation'][string]> = {
    name: 'animation',
    test: /(.*)animation\.(\w+)$/,
    skip: /^variants/,
    set: '$1animation.$2',
    apply: (context) => parseValue(context)
};

export const animationResolvers = [
    animationResolver,
    animationDefaultResolver,
    animationFieldResolver
];
