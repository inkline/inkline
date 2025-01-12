import { focusAttempt } from './focusAttempt';

describe('Helpers', () => {
    describe('focusAttempt()', () => {
        let element: any;

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
            const spy = vi.spyOn(element, 'focus');

            expect(focusAttempt(element)).toEqual(false);
            expect(spy).toHaveBeenCalled();
        });
    });
});
