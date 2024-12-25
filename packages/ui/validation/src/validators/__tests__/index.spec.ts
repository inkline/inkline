import { registerValidator, unregisterValidator, validators } from '../../index';
import type { FormValidatorFn } from '@inkline/types';

describe('Validators', () => {
    describe('registerValidator()', () => {
        it('should register a new validator', () => {
            const name = 'newValidator';
            const validator: FormValidatorFn = (value) => value === 'inkline';

            registerValidator(name, validator);

            expect(validators[name]).toEqual(validator);
        });
    });

    describe('unregisterValidator()', () => {
        it('should unregister a validator', () => {
            const name = 'newValidator';
            const validator: FormValidatorFn = (value) => value === 'inkline';

            registerValidator(name, validator);
            unregisterValidator(name);

            expect(validators[name]).not.toBeDefined();
        });
    });
});
