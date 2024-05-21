import { minLength } from '@inkline/inkline/validation/validators';

describe('Validators', () => {
    describe('minLength()', () => {
        const options = { path: '', schema: undefined };

        it('should return false if value is null or undefined', () => {
            expect(minLength(null, { value: 0, ...options })).toEqual(false);
            expect(minLength(undefined, { value: 0, ...options })).toEqual(false);
        });

        it('should return true if string value length is greater than minimum', () => {
            expect(minLength('abc', { value: 0, ...options })).toEqual(true);
        });

        it('should return false if string value length is less than minimum', () => {
            expect(minLength('abc', { value: 10, ...options })).toEqual(false);
        });

        it('should return true if array value length is greater than minimum', () => {
            expect(minLength(['a', 'b', 'c'], { value: 0, ...options })).toEqual(true);
        });

        it('should return false if array value length is less than minimum', () => {
            expect(minLength(['a', 'b', 'c'], { value: 10, ...options })).toEqual(false);
        });

        it('should return true if object value length is greater than minimum', () => {
            expect(minLength({ a: 1, b: 2, c: 3 }, { value: 0, ...options })).toEqual(true);
        });

        it('should return false if object value length is less than minimum', () => {
            expect(minLength({ a: 1, b: 2, c: 3 }, { value: 10, ...options })).toEqual(false);
        });

        it('should pass through if value not provided', () => {
            expect(minLength({ a: 1, b: 2, c: 3 }, options)).toEqual(true);
        });
    });
});
