import { toKebabCase } from './string';

describe('toKebabCase', () => {
    it('should correctly convert camelCase to kebab-case', () => {
        const input = 'camelCaseString';
        const expected = 'camel-case-string';
        const result = toKebabCase(input);

        expect(result).toEqual(expected);
    });

    it('should correctly convert keys with numbers to kebab-case', () => {
        const input = 'field1';
        const expected = 'field-1';
        const result = toKebabCase(input);

        expect(result).toEqual(expected);
    });

    it('should correctly convert keys without numbers to kebab-case', () => {
        const input = 'field';
        const expected = 'field';
        const result = toKebabCase(input);

        expect(result).toEqual(expected);
    });
});
