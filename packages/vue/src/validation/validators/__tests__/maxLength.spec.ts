import { maxLength } from '@inkline/inkline/validation/validators';

describe('Validators', () => {
    describe('maxLength()', () => {
        const options = { path: '', schema: undefined };

        it('should return false if value is null or undefined', () => {
            expect(maxLength(null, { value: 0, ...options })).toEqual(false);
            expect(maxLength(undefined, { value: 0, ...options })).toEqual(false);
        });

        it('should return true if string value length is less than maximum', () => {
            expect(maxLength('abc', { value: 10, ...options })).toEqual(true);
        });

        it('should return false if string value length is greater than maximum', () => {
            expect(maxLength('abc', { value: 1, ...options })).toEqual(false);
        });

        it('should return true if array value length is less than maximum', () => {
            expect(maxLength(['a', 'b', 'c'], { value: 10, ...options })).toEqual(true);
        });

        it('should return false if array value length is greater than maximum', () => {
            expect(maxLength(['a', 'b', 'c'], { value: 1, ...options })).toEqual(false);
        });

        it('should return true if object value length is less than maximum', () => {
            expect(maxLength({ a: 1, b: 2, c: 3 }, { value: 10, ...options })).toEqual(true);
        });

        it('should return false if object value length is greater than maximum', () => {
            expect(maxLength({ a: 1, b: 2, c: 3 }, { value: 1, ...options })).toEqual(false);
        });

        it('should pass through if value not provided', () => {
            expect(maxLength({ a: 1, b: 2, c: 3 }, options)).toEqual(true);
        });
    });
});
