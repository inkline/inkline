import {registerValidator, unregisterValidator, validators} from "@inkline/inkline/validation";

describe('Validators', () => {
    describe('registerValidator()', () => {
        it('should register a new validator', () => {
            const name = 'newValidator';
            const validator = (value: string, options: any) => value === 'inkline';

            registerValidator(name, validator);

            expect(validators[name]).toEqual(validator);
        });
    });

    describe('unregisterValidator()', () => {
        it('should unregister a validator', () => {
            const name = 'newValidator';
            const validator = (value: string, options: any) => value === 'inkline';

            registerValidator(name, validator);
            unregisterValidator(name);

            expect(validators[name]).not.toBeDefined();
        });
    });
});
