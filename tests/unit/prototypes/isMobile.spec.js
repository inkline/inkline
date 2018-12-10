import { defaultFormState, $form } from 'inkline/prototypes/form';

describe('Prototypes', () => {
    describe('$form()', () => {
        describe('defaultFormState', () => {
            it('should be untouched, pristine and valid', () => {
               expect(defaultFormState.untouched).toEqual(true);
               expect(defaultFormState.pristine).toEqual(true);
               expect(defaultFormState.valid).toEqual(true);
            });

            it('should not be touched, dirty, invalid or have any errors', () => {
               expect(defaultFormState.touched).toEqual(false);
               expect(defaultFormState.dirty).toEqual(false);
               expect(defaultFormState.invalid).toEqual(false);
               expect(defaultFormState.errors).toEqual({});
            });
        });

        // describe('formFactory()', () => {
        //     it('should call form() if grouped', () => {
        //         global.navigator.userAgent = 'androidxmobile';
        //
        //         expect($isMobile()).toEqual(true);
        //     });
        // });

    });
});
