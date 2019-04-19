import { required } from '@inkline/validation/src/validators/required';

describe('Validators', () => {
    describe('required()', () => {
        it('should return false if value is undefined', () => {
            expect(required(undefined)).toEqual(false);
        });

        it('should return false if value is null', () => {
            expect(required(null)).toEqual(false);
        });

        it('should return false if value is empty string', () => {
            expect(required('')).toEqual(false);
        });

        it('should return false if value is blank string', () => {
            expect(required('  ')).toEqual(false);
        });

        it('should return true if value is non-empty string', () => {
            expect(required('example')).toEqual(true);
        });

        it('should return true if value is boolean', () => {
            expect(required(true)).toEqual(true);
            expect(required(false)).toEqual(true);
        });

        it('should return false if value is boolean and false is invalidated', () => {
            expect(required(true, { invalidateFalse: true })).toEqual(true);
            expect(required(false, { invalidateFalse: true })).toEqual(false);
        });

        it('should return false if array is empty', () => {
            expect(required([])).toEqual(false);
        });

        it('should return true if array is not empty', () => {
            expect(required(['a', 'b'])).toEqual(true);
        });
    });
});
