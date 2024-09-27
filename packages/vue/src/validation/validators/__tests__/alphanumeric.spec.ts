import { alphanumeric } from '@inkline/inkline/validation/validators';

describe('Validators', () => {
    describe('alphanumeric()', () => {
        const options = { path: '', schema: undefined };

        it('should return true for lowercase letters', () => {
            expect(alphanumeric('abc', options)).toEqual(true);
        });

        it('should return true for uppercase letters', () => {
            expect(alphanumeric('ABC', options)).toEqual(true);
        });

        it('should return true for lowercase and uppercase letters', () => {
            expect(alphanumeric('abcABC', options)).toEqual(true);
        });

        it('should return true for letters and numbers', () => {
            expect(alphanumeric('abc123', options)).toEqual(true);
        });

        it('should return true for letters, numbers and spaces if options.allowSpace enabled', () => {
            expect(alphanumeric('abc ABC123', { allowSpaces: true, ...options })).toEqual(true);
        });

        it('should return true for letters, numbers and dashes if options.allowDash enabled', () => {
            expect(alphanumeric('abc-ABC123', { allowDashes: true, ...options })).toEqual(true);
        });

        it('should return false for letters and symbols', () => {
            expect(alphanumeric('abc!', options)).toEqual(false);
        });

        it('should return true if all array entries are alphanumeric', () => {
            expect(alphanumeric(['abc', 'ABC', 'abc123'], options)).toEqual(true);
        });

        it('should return false if not all array entries are alphanumeric', () => {
            expect(alphanumeric(['abc', 'a1-23', 'ABC123'], options)).toEqual(false);
        });
    });
});
