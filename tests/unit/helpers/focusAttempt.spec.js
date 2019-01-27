import { focusAttempt } from '@inkline/inkline/helpers/focusAttempt';

describe('Helpers', () => {
    describe('focusAttempt()', () => {
        let element;

        beforeEach(() => {
            element = {
                tabIndex: 1,
                disabled: false,
                nodeName: 'A',
                focus() {}
            };
        });

        it('should return false if element is not focusable', () => {
            element.disabled = true;

            expect(focusAttempt(element)).toEqual(false);
        });

        it('should focus() element if focusable focusable', () => {
            const spy = jest.spyOn(element, 'focus');

            expect(focusAttempt(element)).toEqual(false);
            expect(spy).toHaveBeenCalled();
        });
    });
});
