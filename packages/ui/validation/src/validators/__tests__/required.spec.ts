import { required } from '../index';

describe('Validators', () => {
    describe('required()', () => {
        const options = { path: '', schema: undefined };

        it('should return false if value is undefined', () => {
            expect(required(undefined, options)).toEqual(false);
        });

        it('should return false if value is null', () => {
            expect(required(null, options)).toEqual(false);
        });

        it('should return false if value is empty string', () => {
            expect(required('', options)).toEqual(false);
        });

        it('should return false if value is blank string', () => {
            expect(required('  ', options)).toEqual(false);
        });

        it('should return true if value is non-empty string', () => {
            expect(required('example', options)).toEqual(true);
        });

        it('should return true if value is boolean', () => {
            expect(required(true, options)).toEqual(true);
            expect(required(false, options)).toEqual(true);
        });

        it('should return false if value is boolean and false is invalidated', () => {
            expect(required(true, { invalidateFalse: true, ...options })).toEqual(true);
            expect(required(false, { invalidateFalse: true, ...options })).toEqual(false);
        });

        it('should return false if array is empty', () => {
            expect(required([], options)).toEqual(false);
        });

        it('should return true if array is not empty', () => {
            expect(required(['a', 'b'], options)).toEqual(true);
        });
    });
});
