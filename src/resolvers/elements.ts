import { Resolver } from '../types';

export const elementsResolver: Resolver<string, string> = {
    name: 'animation',
    test: /^elements\.([\w-]+)\.(.*)$/,
    skip: /^variants/,
    set: 'elements.$1.$2',
    apply: (context) => context.value
};

export const elementsResolvers = [
    elementsResolver
];
