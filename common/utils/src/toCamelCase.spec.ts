import { toCamelCase } from './toCamelCase';

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

    it('should handle strings containing adjacent numbers', () => {
        expect(toCamelCase('text-2xs')).toBe('text2Xs');
    });
});
