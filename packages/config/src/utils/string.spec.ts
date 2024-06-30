import { toKebabCase } from './string';

describe('toKebabCase', () => {
    it('should convert camelCase to kebab-case', () => {
        const result = toKebabCase('camelCaseString');
        expect(result).toEqual('camel-case-string');
    });

    it('should handle single word strings', () => {
        const result = toKebabCase('word');
        expect(result).toEqual('word');
    });

    it('should handle empty strings', () => {
        const result = toKebabCase('');
        expect(result).toEqual('');
    });

    it('should handle strings with numbers', () => {
        const result = toKebabCase('string1With2Numbers');
        expect(result).toEqual('string1-with2-numbers');
    });

    it('should handle strings with special characters', () => {
        const result = toKebabCase('stringWith$pecialCharacters');
        expect(result).toEqual('string-with$pecial-characters');
    });
});
