import {
    defineResolver,
    createFieldWithOptionalVariantsResolveFn,
    createMultipleFieldsWithOptionalVariantsResolveFn,
    createFieldWithoutVariantsResolveFn
} from './resolver';
import { createTestingResolverMeta } from '../__tests__/utils';

describe('defineResolver', () => {
    const meta = createTestingResolverMeta({ path: [] });

    it('should return the same resolver that was passed in', () => {
        const resolver = {
            key: 'test',
            resolve: () => 'test'
        };

        const result = defineResolver<string, string>(resolver);
        expect(result).toBe(resolver);
        expect(result.resolve('test', meta)).toEqual('test');
    });
});

const resolveValue = (value: string) => value;
const resolveVariant = (variant: string, { path }: { path: string[] }) => `${variant}Resolved`;

describe('createFieldWithOptionalVariantsResolveFn', () => {
    const meta = createTestingResolverMeta({ path: [] });

    it('should correctly resolve a field without variants', () => {
        const input = 'testValue';
        const expected = { default: 'testValue' };
        const result = createFieldWithOptionalVariantsResolveFn(resolveValue, resolveVariant)(
            input,
            meta
        );

        expect(result).toEqual(expected);
    });

    it('should correctly resolve a field with variants', () => {
        const input = {
            default: 'defaultValue',
            variant1: 'variantValue1',
            variant2: 'variantValue2'
        };
        const expected = {
            default: 'defaultValue',
            variant1: 'variantValue1Resolved',
            variant2: 'variantValue2Resolved'
        };
        const result = createFieldWithOptionalVariantsResolveFn(resolveValue, resolveVariant)(
            input,
            meta
        );

        expect(result).toEqual(expected);
    });

    it('should handle non-object inputs as default values', () => {
        const input = 'nonObjectValue';
        const expected = { default: 'nonObjectValue' };
        const result = createFieldWithOptionalVariantsResolveFn(resolveValue, resolveVariant)(
            input,
            meta
        );

        expect(result).toEqual(expected);
    });
});

describe('createFieldWithoutVariantsResolveFn', () => {
    const meta = createTestingResolverMeta({ path: [] });

    it('should correctly resolve a field without variants', () => {
        const resolveValue = (value: string) => value.toUpperCase();
        const resolveField = createFieldWithoutVariantsResolveFn(resolveValue);
        const input = 'testValue';
        const expected = 'TESTVALUE';
        const result = resolveField(input, meta);

        expect(result).toEqual(expected);
    });
});

describe('createMultipleFieldsWithOptionalVariantsResolveFn', () => {
    const meta = createTestingResolverMeta({ path: [] });

    it('should correctly resolve multiple fields without variants', () => {
        const input = {
            field1: 'testValue1',
            field2: 'testValue2'
        };
        const expected = {
            field1: { default: 'testValue1' },
            field2: { default: 'testValue2' }
        };
        const result = createMultipleFieldsWithOptionalVariantsResolveFn(
            resolveValue,
            resolveVariant
        )(input, meta);

        expect(result).toEqual(expected);
    });

    it('should correctly resolve multiple fields with variants', () => {
        const input = {
            field1: {
                default: 'defaultValue1',
                variant1: 'variantValue1',
                variant2: 'variantValue2'
            },
            field2: {
                default: 'defaultValue2',
                variant1: 'variantValue3',
                variant2: 'variantValue4'
            }
        };
        const expected = {
            field1: {
                default: 'defaultValue1',
                variant1: 'variantValue1Resolved',
                variant2: 'variantValue2Resolved'
            },
            field2: {
                default: 'defaultValue2',
                variant1: 'variantValue3Resolved',
                variant2: 'variantValue4Resolved'
            }
        };
        const result = createMultipleFieldsWithOptionalVariantsResolveFn(
            resolveValue,
            resolveVariant
        )(input, meta);

        expect(result).toEqual(expected);
    });

    it('should handle non-object inputs as default values for multiple fields', () => {
        const input = {
            field1: 'nonObjectValue1',
            field2: 'nonObjectValue2'
        };
        const expected = {
            field1: { default: 'nonObjectValue1' },
            field2: { default: 'nonObjectValue2' }
        };
        const result = createMultipleFieldsWithOptionalVariantsResolveFn(
            resolveValue,
            resolveVariant
        )(input, meta);

        expect(result).toEqual(expected);
    });
});
