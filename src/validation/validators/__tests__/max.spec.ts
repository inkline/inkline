import { max } from '@inkline/inkline/validation/validators';

describe('Validators', () => {
    describe('max()', () => {
        const options = { path: '', schema: undefined };

        it('should return false if value is null or undefined', () => {
            expect(max(null, { value: 0, ...options })).toEqual(false);
            expect(max(undefined, { value: 0, ...options })).toEqual(false);
        });

        it('should return true if value is less than maximum', () => {
            expect(max('99', { value: 100, ...options })).toEqual(true);
        });

        it('should return true if value is equal to maximum', () => {
            expect(max('100', { value: 100, ...options })).toEqual(true);
        });

        it('should return false if value is greater than maximum', () => {
            expect(max('101', { value: 100, ...options })).toEqual(false);
        });

        it('should return true if all array entries are less than maximum', () => {
            expect(max(['100', '99', '98'], { value: 100, ...options })).toEqual(true);
        });

        it('should return false if not all array entries are less than maximum', () => {
            expect(max(['101', '100', '99'], { value: 100, ...options })).toEqual(false);
        });

        it('should pass through if value not provided', () => {
            expect(max(0, options)).toEqual(true);
        });
    });
});
