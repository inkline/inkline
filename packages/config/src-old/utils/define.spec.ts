import { defineResolver, defineResolverValueFn, defineResolverVariantFn } from './define';

describe('defineResolver', () => {
    it('should return the same resolver definition that was passed', () => {
        const resolverFn = vi.fn();
        const resolver = { key: [], resolve: resolverFn };
        const result = defineResolver(resolver);
        expect(result).toBe(resolver);
    });
});

describe('defineResolverValueFn', () => {
    it('should return the same function that was passed', () => {
        const resolverValueFn = vi.fn();
        const result = defineResolverValueFn(resolverValueFn);
        expect(result).toBe(resolverValueFn);
    });
});

describe('defineResolverVariantFn', () => {
    it('should return the same function that was passed', () => {
        const resolverVariantFn = vi.fn();
        const result = defineResolverVariantFn(resolverVariantFn);
        expect(result).toBe(resolverVariantFn);
    });
});
