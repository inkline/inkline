import { toCssName } from './toCssName';

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
