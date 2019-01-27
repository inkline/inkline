import { minLength } from '@inkline/inkline/validators/minLength';

describe('Validators', () => {
    describe('minLength()', () => {
        it('should return false if value is undefined', () => {
            expect(minLength(undefined, { value: 0 })).toEqual(false);
        });

        it('should return false if value is null', () => {
            expect(minLength(null, { value: 0 })).toEqual(false);
        });

        it('should return true if string value length is greater than minimum', () => {
            expect(minLength('abc', { value: 0 })).toEqual(true);
        });

        it('should return false if string value length is less than minimum', () => {
            expect(minLength('abc', { value: 10 })).toEqual(false);
        });

        it('should return true if array value length is greater than minimum', () => {
            expect(minLength(['a', 'b', 'c'], { value: 0 })).toEqual(true);
        });

        it('should return false if array value length is less than minimum', () => {
            expect(minLength(['a', 'b', 'c'], { value: 10 })).toEqual(false);
        });

        it('should return true if object value length is greater than minimum', () => {
            expect(minLength({ a: 1, b: 2, c: 3 }, { value: 0 })).toEqual(true);
        });

        it('should return false if object value length is less than minimum', () => {
            expect(minLength({ a: 1, b: 2, c: 3 }, { value: 10 })).toEqual(false);
        });
    });
});
