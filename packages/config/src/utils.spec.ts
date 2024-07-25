import { insertInBetweenElements, toCamelCase, toKebabCase } from './utils';

describe('insertInBetweenElements', () => {
    it('should insert value between each element of the array', () => {
        expect(insertInBetweenElements([1, 2, 3], 0)).toEqual([1, 0, 2, 0, 3]);
    });

    it('should return an empty array when the input array is empty', () => {
        expect(insertInBetweenElements([], 0)).toEqual([]);
    });

    it('should handle single-element arrays correctly', () => {
        expect(insertInBetweenElements([1], 0)).toEqual([1]);
    });

    it('should work with string arrays and values', () => {
        expect(insertInBetweenElements(['a', 'b'], 'c')).toEqual(['a', 'c', 'b']);
    });
});

describe('toCamelCase', () => {
    it('should convert hyphenated text to camelCase', () => {
        expect(toCamelCase('text-align-center')).toBe('textAlignCenter');
    });

    it('should return the same string if there are no hyphens', () => {
        expect(toCamelCase('text')).toBe('text');
    });

    it('should handle empty strings correctly', () => {
        expect(toCamelCase('')).toBe('');
    });

    it('should modify uppercase letters following hyphens', () => {
        expect(toCamelCase('text-Align-Center')).toBe('textAlignCenter');
    });

    it('should handle strings starting with a hyphen', () => {
        expect(toCamelCase('-webkit-transition')).toBe('WebkitTransition');
    });

    it('should handle strings containing numbers', () => {
        expect(toCamelCase('text-2-center')).toBe('text2Center');
    });
});

describe('toKebabCase', () => {
    it('should convert camelCase to kebab-case', () => {
        expect(toKebabCase('backgroundColor')).toBe('background-color');
    });

    it('should handle strings starting with uppercase letters', () => {
        expect(toKebabCase('BackgroundColor')).toBe('background-color');
    });

    it('should not modify already kebab-case strings', () => {
        expect(toKebabCase('background-color')).toBe('background-color');
    });

    it('should convert snake_case to kebab-case', () => {
        expect(toKebabCase('background_color')).toBe('background-color');
    });

    it('should handle empty strings correctly', () => {
        expect(toKebabCase('')).toBe('');
    });

    it('should process strings with numbers correctly', () => {
        expect(toKebabCase('fontSize12px')).toBe('font-size12px');
    });

    it('should handle strings with multiple uppercase letters correctly', () => {
        expect(toKebabCase('URLForAPI')).toBe('url-for-api');
    });
});
