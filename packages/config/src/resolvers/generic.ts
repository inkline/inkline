import { defineResolver, defineResolverValueFn } from '../utils';

export const genericResolver = defineResolver({
    key: '**',
    resolve: defineResolverValueFn((value) => value)
});
