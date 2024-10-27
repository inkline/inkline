import { insertInBetweenElements, toCssName } from './utils';

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

describe('toCssName', () => {
    it('should convert camelCase to kebab-case', () => {
        expect(toCssName('backgroundColor')).toBe('background-color');
    });

    it('should handle strings starting with uppercase letters', () => {
        expect(toCssName('BackgroundColor')).toBe('background-color');
    });

    it('should not modify already kebab-case strings', () => {
        expect(toCssName('background-color')).toBe('background-color');
    });

    it('should convert snake_case to kebab-case', () => {
        expect(toCssName('background_color')).toBe('background-color');
    });

    it('should handle empty strings correctly', () => {
        expect(toCssName('')).toBe('');
    });

    it('should process strings with numbers correctly', () => {
        expect(toCssName('fontSize12px')).toBe('font-size12px');
    });

    it('should handle strings with multiple uppercase letters correctly', () => {
        expect(toCssName('URLForAPI')).toBe('url-for-api');
    });
});
