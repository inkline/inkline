import { alpha } from '@inkline/inkline/validators/alpha';

describe('Validators', () => {
    describe('alpha()', () => {
        it('should return true for lowercase letters', () => {
            expect(alpha('abc')).toEqual(true);
        });

        it('should return true for uppercase letters', () => {
            expect(alpha('ABC')).toEqual(true);
        });

        it('should return true for lowercase and uppercase letters', () => {
            expect(alpha('abcABC')).toEqual(true);
        });

        it('should return true for letters and spaces if options.allowSpace enabled', () => {
            expect(alpha('abc ABC', { allowSpace: true })).toEqual(true);
        });

        it('should return true for letters and dashes if options.allowDash enabled', () => {
            expect(alpha('abc-ABC', { allowDash: true })).toEqual(true);
        });

        it('should return false for letters and numbers', () => {
            expect(alpha('abc123')).toEqual(false);
        });

        it('should return false for letters and symbols', () => {
            expect(alpha('abc!')).toEqual(false);
        });

        it('should return true if all array entries are alpha', () => {
            expect(alpha(['abc', 'ABC'])).toEqual(true);
        });

        it('should return false if not all array entries are alpha', () => {
            expect(alpha(['abc', '123', 'ABC'])).toEqual(false);
        });
    });
});
