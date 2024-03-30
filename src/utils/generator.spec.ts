import {
    createFieldWithoutVariantsGenerateFn,
    createFieldWithVariantsGenerateFn,
    createGenericDesignTokenVariantGenerateFn,
    createMultipleFieldsWithVariantsGenerateFn,
    defineGenerator
} from './generator';
import { createTestingGeneratorMeta } from '../__tests__/utils';
import { GeneratorType } from '../types';

describe('defineGenerator', () => {
    const meta = createTestingGeneratorMeta({ path: ['test'] });

    it('should return the same generator that was passed in', () => {
        const generator = {
            key: 'test',
            type: GeneratorType.Default,
            generate: () => ['test']
        };

        const result = defineGenerator<string>(generator);
        expect(result).toBe(generator);
        expect(result.generate('test', meta)).toEqual(['test']);
    });
});

describe('createFieldWithVariantsGenerateFn', () => {
    const meta = createTestingGeneratorMeta({ path: [] });
    it('should correctly generate fields with variants', () => {
        const generateValue = (value: string) => [value.toUpperCase()];
        const generateField = createFieldWithVariantsGenerateFn(generateValue);
        const input = { default: 'test', variant1: 'test1', variant2: 'test2' };
        const expected = ['TEST', 'TEST1', 'TEST2'];
        const result = generateField(input, meta);

        expect(result).toEqual(expected);
    });
});

describe('createFieldWithoutVariantsGenerateFn', () => {
    const meta = createTestingGeneratorMeta({ path: [] });
    it('should correctly generate a field without variants', () => {
        const generateValue = (value: string) => [value.toUpperCase()];
        const generateField = createFieldWithoutVariantsGenerateFn(generateValue);
        const input = 'test';
        const expected = ['TEST'];
        const result = generateField(input, meta);

        expect(result).toEqual(expected);
    });
});

describe('createMultipleFieldsWithVariantsGenerateFn', () => {
    const meta = createTestingGeneratorMeta({ path: [] });
    it('should correctly generate multiple fields with variants', () => {
        const generateValue = (value: string) => [value.toUpperCase()];
        const generateFields = createMultipleFieldsWithVariantsGenerateFn(generateValue);
        const input = {
            field1: { default: 'test1', variant1: 'test1.1', variant2: 'test1.2' },
            field2: { default: 'test2', variant1: 'test2.1', variant2: 'test2.2' }
        };
        const expected = ['TEST1', 'TEST1.1', 'TEST1.2', 'TEST2', 'TEST2.1', 'TEST2.2'];
        const result = generateFields(input, meta);

        expect(result).toEqual(expected);
    });
});

describe('createGenericDesignTokenVariantGenerateFn', () => {
    const defaultMeta = createTestingGeneratorMeta({ path: ['root', 'default'] });
    const variantMeta = createTestingGeneratorMeta({ path: ['root', 'variant'] });

    it('should correctly generate generic default variant fields with keys without numbers', () => {
        const input = { field: 'test1', another: 'test2' };
        const expected = ['--root-field: test1', '--root-another: test2'];
        const genericGenerateFn = createGenericDesignTokenVariantGenerateFn();
        const result = genericGenerateFn(input, defaultMeta);

        expect(result).toEqual(expected);
    });

    it('should correctly generate generic default variant fields with aggregate option', () => {
        const input = { keyA: 'testA', keyB: 'testB' };
        const expected = [
            '--root-key-a: testA',
            '--root-key-b: testB',
            '--root: var(--root-key-a) var(--root-key-b)'
        ];
        const genericGenerateFn = createGenericDesignTokenVariantGenerateFn({
            aggregate: ['keyA', 'keyB']
        });
        const result = genericGenerateFn(input, defaultMeta);

        expect(result).toEqual(expected);
    });

    it('should correctly generate generic variant fields with keys without numbers', () => {
        const input = { field: 'test1', another: 'test2' };
        const expected = ['--root-field-variant: test1', '--root-another-variant: test2'];
        const genericGenerateFn = createGenericDesignTokenVariantGenerateFn();
        const result = genericGenerateFn(input, variantMeta);

        expect(result).toEqual(expected);
    });

    it('should correctly generate generic variant fields with keys with numbers', () => {
        const input = { field1: 'test1', field2: 'test2' };
        const expected = ['--root-field-1-variant: test1', '--root-field-2-variant: test2'];
        const genericGenerateFn = createGenericDesignTokenVariantGenerateFn();
        const result = genericGenerateFn(input, variantMeta);

        expect(result).toEqual(expected);
    });

    it('should correctly generate generic variant fields with camelCase keys', () => {
        const input = { fieldOne: 'test1', fieldTwoThree: 'test2' };
        const expected = [
            '--root-field-one-variant: test1',
            '--root-field-two-three-variant: test2'
        ];
        const genericGenerateFn = createGenericDesignTokenVariantGenerateFn();
        const result = genericGenerateFn(input, variantMeta);

        expect(result).toEqual(expected);
    });

    it('should correctly generate generic variant fields with aggregate option', () => {
        const input = { keyA: 'testA', keyB: 'testB' };
        const expected = [
            '--root-key-a-variant: testA',
            '--root-key-b-variant: testB',
            '--root-variant: var(--root-key-a-variant) var(--root-key-b-variant)'
        ];
        const genericGenerateFn = createGenericDesignTokenVariantGenerateFn({
            aggregate: ['keyA', 'keyB']
        });
        const result = genericGenerateFn(input, variantMeta);

        expect(result).toEqual(expected);
    });
});
