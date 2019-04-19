import { alphanumeric } from '@inkline/validation/src/validators/alphanumeric';

describe('Validators', () => {
    describe('alphanumeric()', () => {
        it('should return true for lowercase letters', () => {
            expect(alphanumeric('abc')).toEqual(true);
        });

        it('should return true for uppercase letters', () => {
            expect(alphanumeric('ABC')).toEqual(true);
        });

        it('should return true for lowercase and uppercase letters', () => {
            expect(alphanumeric('abcABC')).toEqual(true);
        });

        it('should return true for letters and numbers', () => {
            expect(alphanumeric('abc123')).toEqual(true);
        });

        it('should return true for letters, numbers and spaces if options.allowSpace enabled', () => {
            expect(alphanumeric('abc ABC123', { allowSpaces: true })).toEqual(true);
        });

        it('should return true for letters, numbers and dashes if options.allowDash enabled', () => {
            expect(alphanumeric('abc-ABC123', { allowDashes: true })).toEqual(true);
        });

        it('should return false for letters and symbols', () => {
            expect(alphanumeric('abc!')).toEqual(false);
        });

        it('should return true if all array entries are alphanumeric', () => {
            expect(alphanumeric(['abc', 'ABC', 'abc123'])).toEqual(true);
        });

        it('should return false if not all array entries are alphanumeric', () => {
            expect(alphanumeric(['abc', 'a1-23', 'ABC123'])).toEqual(false);
        });
    });
});
