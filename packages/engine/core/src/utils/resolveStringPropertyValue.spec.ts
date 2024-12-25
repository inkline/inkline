import { resolveStringPropertyValue } from './resolveStringPropertyValue';

describe('resolveStringPropertyValue', () => {
    it('should handle empty string', () => {
        const result = resolveStringPropertyValue('', ['first', 'second']);
        expect(result).toEqual({});
    });

    it('should handle simple space-separated values', () => {
        const result = resolveStringPropertyValue('1px 2px', ['first', 'second']);
        expect(result).toEqual({
            first: '1px',
            second: '2px'
        });
    });

    it('should handle var() values correctly', () => {
        const result = resolveStringPropertyValue('1px var(--spacing, 10px)', ['first', 'second']);
        expect(result).toEqual({
            first: '1px',
            second: 'var(--spacing, 10px)'
        });
    });

    it('should handle rgba values correctly', () => {
        const result = resolveStringPropertyValue('1px rgba(255, 255, 255, 0.5)', [
            'first',
            'second'
        ]);
        expect(result).toEqual({
            first: '1px',
            second: 'rgba(255, 255, 255, 0.5)'
        });
    });

    it('should handle nested parentheses', () => {
        const result = resolveStringPropertyValue('1px var(--spacing, rgb(255, 255, 255))', [
            'first',
            'second'
        ]);
        expect(result).toEqual({
            first: '1px',
            second: 'var(--spacing, rgb(255, 255, 255))'
        });
    });

    it('should handle multiple complex values', () => {
        const result = resolveStringPropertyValue('1px 2px var(--blur, 3px) rgba(0, 0, 0, 0.5)', [
            'first',
            'second',
            'third',
            'fourth'
        ]);
        expect(result).toEqual({
            first: '1px',
            second: '2px',
            third: 'var(--blur, 3px)',
            fourth: 'rgba(0, 0, 0, 0.5)'
        });
    });

    it('should handle fewer values than keys', () => {
        const result = resolveStringPropertyValue('1px', ['first', 'second']);
        expect(result).toEqual({
            first: '1px'
        });
    });

    it('should handle extra spaces', () => {
        const result = resolveStringPropertyValue('1px   var(--spacing)    2px', [
            'first',
            'second',
            'third'
        ]);
        expect(result).toEqual({
            first: '1px',
            second: 'var(--spacing)',
            third: '2px'
        });
    });
});
