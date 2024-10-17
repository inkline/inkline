import { custom } from '../index';
import type { FormValidatorFn, FormValue } from '@inkline/types';

describe('Validators', () => {
    describe('custom()', () => {
        const options = { path: '', schema: undefined };
        const validator: FormValidatorFn = (x: FormValue): boolean =>
            typeof x !== 'number' ? false : x > 0;
        const asyncValidator: FormValidatorFn = (x: FormValue): Promise<boolean> =>
            Promise.resolve(typeof x !== 'number' ? false : x > 0);

        it('should return true by default', async () => {
            expect(await custom(10, options)).toEqual(true);
        });

        it('should apply validator function', async () => {
            expect(await custom(10, { validator, ...options })).toEqual(true);
            expect(await custom(-10, { validator, ...options })).toEqual(false);
        });

        it('should apply async validator function', async () => {
            expect(await custom(10, { validator: asyncValidator, ...options })).toEqual(true);
            expect(await custom(-10, { validator: asyncValidator, ...options })).toEqual(false);
        });

        it('should apply validator function to every value of array', async () => {
            expect(await custom([1, 2, 3], { validator, ...options })).toEqual(true);
            expect(await custom([0, 1, 2], { validator, ...options })).toEqual(false);
        });

        it('should apply async validator function to every value of array', async () => {
            expect(await custom([1, 2, 3], { validator: asyncValidator, ...options })).toEqual(
                true
            );
            expect(await custom([0, 1, 2], { validator: asyncValidator, ...options })).toEqual(
                false
            );
        });
    });
});
