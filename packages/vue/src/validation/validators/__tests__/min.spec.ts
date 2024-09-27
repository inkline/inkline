import { min } from '@inkline/inkline/validation/validators';

describe('Validators', () => {
    describe('min()', () => {
        const options = { path: '', schema: undefined };

        it('should return false if value is null or undefined', () => {
            expect(min(null, { value: 0, ...options })).toEqual(false);
            expect(min(undefined, { value: 0, ...options })).toEqual(false);
        });

        it('should return true if value is greater than minimum', () => {
            expect(min('1', { value: 0, ...options })).toEqual(true);
        });

        it('should return true if value is equal to minimum', () => {
            expect(min('0', { value: 0, ...options })).toEqual(true);
        });

        it('should return false if value is less than minimum', () => {
            expect(min('-1', { value: 0, ...options })).toEqual(false);
        });

        it('should return true if all array entries are greater than minimum', () => {
            expect(min(['0', '1', '2'], { value: 0, ...options })).toEqual(true);
        });

        it('should return false if not all array entries are greater than minimum', () => {
            expect(min(['0', '-1', '2'], { value: 0, ...options })).toEqual(false);
        });

        it('should pass through if value not provided', () => {
            expect(min(1, options)).toEqual(true);
        });
    });
});
