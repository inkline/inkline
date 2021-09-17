import { custom } from '@inkline/inkline/validation/validators';

describe('Validators', () => {
    describe('custom()', () => {
        const validator = (x: number): boolean => x > 0;

        it('should return true by default', () => {
            expect(custom(10)).toEqual(true);
        });

        it('should apply validator function', () => {
            expect(custom(10, { validator })).toEqual(true);
            expect(custom(-10, { validator })).toEqual(false);
        });

        it('should apply validator function to every value of array', () => {
            expect(custom([1, 2, 3], { validator })).toEqual(true);
            expect(custom([0, 1, 2], { validator })).toEqual(false);
        });
    });
});
