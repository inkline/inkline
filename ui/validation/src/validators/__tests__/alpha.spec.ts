import { alpha } from '../index';

describe('Validators', () => {
    describe('alpha()', () => {
        const options = { path: '', schema: undefined };

        it('should return true for lowercase letters', () => {
            expect(alpha('abc', options)).toEqual(true);
        });

        it('should return true for uppercase letters', () => {
            expect(alpha('ABC', options)).toEqual(true);
        });

        it('should return true for lowercase and uppercase letters', () => {
            expect(alpha('abcABC', options)).toEqual(true);
        });

        it('should return true for letters and spaces if options.allowSpace enabled', () => {
            expect(alpha('abc ABC', { allowSpaces: true, ...options })).toEqual(true);
        });

        it('should return true for letters and dashes if options.allowDash enabled', () => {
            expect(alpha('abc-ABC', { allowDashes: true, ...options })).toEqual(true);
        });

        it('should return false for letters and numbers', () => {
            expect(alpha('abc123', options)).toEqual(false);
        });

        it('should return false for letters and symbols', () => {
            expect(alpha('abc!', options)).toEqual(false);
        });

        it('should return true if all array entries are alpha', () => {
            expect(alpha(['abc', 'ABC'], options)).toEqual(true);
        });

        it('should return false if not all array entries are alpha', () => {
            expect(alpha(['abc', '123', 'ABC'], options)).toEqual(false);
        });
    });
});
