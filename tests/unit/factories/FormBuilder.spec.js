import { FormBuilder } from "inkline/factories/FormBuilder";

describe('Factories', () => {
    describe('FormBuilder', () => {
        const formBuilder = new FormBuilder();

        describe('defaultFormState', () => {
            it('should be defined', () => {
                expect(formBuilder.defaultFormState).toBeDefined();
            });

            it('should be untouched, pristine and valid', () => {
                expect(formBuilder.defaultFormState.untouched).toEqual(true);
                expect(formBuilder.defaultFormState.pristine).toEqual(true);
                expect(formBuilder.defaultFormState.valid).toEqual(true);
            });

            it('should not be touched, dirty and invalid', () => {
                expect(formBuilder.defaultFormState.touched).toEqual(false);
                expect(formBuilder.defaultFormState.dirty).toEqual(false);
                expect(formBuilder.defaultFormState.invalid).toEqual(false);
            });

            it('should have no errors', () => {
                expect(formBuilder.defaultFormState.errors).toEqual({});
            });
        });
    });
});
