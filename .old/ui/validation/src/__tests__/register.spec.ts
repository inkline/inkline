import { registerValidator, unregisterValidator, validators } from '../index';

describe('validation', () => {
    describe('registerValidator()', () => {
        it('should register custom validator', () => {
            const name = 'test-validator';
            const validator = () => true;

            registerValidator(name, validator);

            expect(validators[name]).toEqual(validator);
        });
    });

    describe('unregisterValidator()', () => {
        it('should register custom validator', () => {
            const name = 'test-validator';
            const validator = () => true;

            registerValidator(name, validator);
            expect(validators[name]).toEqual(validator);
            unregisterValidator(name);
            expect(validators[name]).not.toBeDefined();
        });
    });
});
