import { min } from '@inkline/inkline/src/validators/min';

describe('Validators', () => {
    describe('min()', () => {
        it('should return false if value is undefined', () => {
            expect(min(undefined, { value: 0 })).toEqual(false);
        });

        it('should return false if value is null', () => {
            expect(min(null, { value: 0 })).toEqual(false);
        });

        it('should return true if value is greater than minimum', () => {
            expect(min('1', { value: 0 })).toEqual(true);
        });

        it('should return true if value is equal to minimum', () => {
            expect(min('0', { value: 0 })).toEqual(true);
        });

        it('should return false if value is less than minimum', () => {
            expect(min('-1', { value: 0 })).toEqual(false);
        });

        it('should return true if all array entries are greater than minimum', () => {
            expect(min(['0', '1', '2'], { value: 0 })).toEqual(true);
        });

        it('should return false if not all array entries are greater than minimum', () => {
            expect(min(['0', '-1', '2'], { value: 0 })).toEqual(false);
        });

        it('should compare to 0 if value not provided', () => {
            expect(min(1)).toEqual(true);
        });
    });
});
