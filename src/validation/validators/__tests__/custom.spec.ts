import { custom } from '@inkline/inkline/validation/validators';

describe('Validators', () => {
    describe('custom()', () => {
        const validator = (x: number): boolean => x > 0;
        const asyncValidator = (x: number): Promise<boolean> => Promise.resolve(x > 0);

        it('should return true by default', async () => {
            expect(await custom(10)).toEqual(true);
        });

        it('should apply validator function', async () => {
            expect(await custom(10, { validator })).toEqual(true);
            expect(await custom(-10, { validator })).toEqual(false);
        });

        it('should apply async validator function', async () => {
            expect(await custom(10, { validator: asyncValidator })).toEqual(true);
            expect(await custom(-10, { validator: asyncValidator })).toEqual(false);
        });

        it('should apply validator function to every value of array', async () => {
            expect(await custom([1, 2, 3], { validator })).toEqual(true);
            expect(await custom([0, 1, 2], { validator })).toEqual(false);
        });

        it('should apply async validator function to every value of array', async () => {
            expect(await custom([1, 2, 3], { validator: asyncValidator })).toEqual(true);
            expect(await custom([0, 1, 2], { validator: asyncValidator })).toEqual(false);
        });
    });
});
