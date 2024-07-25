import { createGenericVariantResolveFn } from './resolver';
import { createTestingResolverMeta } from '../__tests__/utils';
import { defineComponent, defineComponentsGroup, defineTheme } from './define';

describe('createResolveFn', () => {
    it('should use "resolveValue" when last path is "default"', () => {
        const resolveValue = vi.fn();
        const resolveVariant = vi.fn();
        const resolve = createGenericVariantResolveFn(resolveValue, resolveVariant);
        const meta = createTestingResolverMeta({
            path: ['components', 'path', 'default'],
            theme: {
                components: defineComponentsGroup({
                    path: defineComponent({
                        default: 'value'
                    })
                })
            }
        });
        resolve('value', meta);
        expect(resolveValue).toHaveBeenCalled();
        expect(resolveVariant).not.toHaveBeenCalled();
    });

    it('should use "resolveValue" when last path is not "default" and is element child path', () => {
        const resolveValue = vi.fn();
        const resolveVariant = vi.fn();
        const resolve = createGenericVariantResolveFn(resolveValue, resolveVariant);
        const meta = createTestingResolverMeta({
            path: ['components', 'path', 'notDefault'],
            theme: defineTheme({
                components: defineComponentsGroup({
                    path: defineComponent(
                        { example: 'value' },
                        {
                            nonDefault: { example: 'value' }
                        }
                    )
                })
            })
        });
        resolve({ example: 'value' }, meta);
        expect(resolveValue).toHaveBeenCalled();
        expect(resolveVariant).not.toHaveBeenCalled();
    });

    it('should use "resolveVariant" when last path is not "default" and not element child path', () => {
        const resolveValue = vi.fn();
        const resolveVariant = vi.fn();
        const resolve = createGenericVariantResolveFn(resolveValue, resolveVariant);
        const meta = createTestingResolverMeta({
            path: ['example', 'value'],
            theme: defineTheme({
                example: {
                    value: 'value'
                }
            })
        });
        resolve({ example: 'value' }, meta);
        expect(resolveVariant).toHaveBeenCalled();
        expect(resolveValue).not.toHaveBeenCalled();
    });
});
