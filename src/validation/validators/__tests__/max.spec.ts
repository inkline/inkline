import { max } from '@inkline/inkline/validation/validators';

describe('Validators', () => {
    describe('max()', () => {
        it('should return false if value is undefined', () => {
            expect(max(undefined, { value: 0 })).toEqual(false);
        });

        it('should return false if value is null', () => {
            expect(max(null, { value: 0 })).toEqual(false);
        });

        it('should return true if value is less than maximum', () => {
            expect(max('99', { value: 100 })).toEqual(true);
        });

        it('should return true if value is equal to maximum', () => {
            expect(max('100', { value: 100 })).toEqual(true);
        });

        it('should return false if value is greater than maximum', () => {
            expect(max('101', { value: 100 })).toEqual(false);
        });

        it('should return true if all array entries are less than maximum', () => {
            expect(max(['100', '99', '98'], { value: 100 })).toEqual(true);
        });

        it('should return false if not all array entries are less than maximum', () => {
            expect(max(['101', '100', '99'], { value: 100 })).toEqual(false);
        });

        it('should compare to 0 if value not provided', () => {
            expect(max(0)).toEqual(true);
        });
    });
});
