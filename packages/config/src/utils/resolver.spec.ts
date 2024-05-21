import {
    defineResolver,
    defineResolverValueFn,
    defineResolverVariantFn,
    createResolveFn
} from './resolver';
import { createTestingResolverMeta } from '../__tests__/utils';

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

describe('createResolveFn', () => {
    it('should use "resolveValue" when last path is "default"', () => {
        const resolveValue = vi.fn();
        const resolveVariant = vi.fn();
        const resolve = createResolveFn(resolveValue, resolveVariant);
        const meta = createTestingResolverMeta({
            path: ['components', 'path', 'default'],
            theme: {
                components: {
                    path: {
                        default: 'value'
                    }
                }
            }
        });
        resolve('value', meta);
        expect(resolveValue).toHaveBeenCalled();
        expect(resolveVariant).not.toHaveBeenCalled();
    });

    it('should use "resolveVariant" when last path is not "default"', () => {
        const resolveValue = vi.fn();
        const resolveVariant = vi.fn();
        const resolve = createResolveFn(resolveValue, resolveVariant);
        const meta = createTestingResolverMeta({
            path: ['components', 'path', 'notDefault'],
            theme: {
                components: {
                    path: {
                        nonDefault: 'value'
                    }
                }
            }
        });
        resolve('variant', meta);
        expect(resolveVariant).toHaveBeenCalled();
        expect(resolveValue).not.toHaveBeenCalled();
    });
});
