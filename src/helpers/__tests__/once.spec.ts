import { once } from '@inkline/inkline/helpers';

describe('Helpers', () => {
    describe('once()', () => {
        let element: HTMLElement;

        beforeEach(() => {
            element = document.createElement('a');
        });

        it('should be a function calling addEventListener on element', () => {
            const spy = jest.spyOn(element, 'addEventListener');
            const fn = () => {};

            once(element, 'eventName', fn);

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith('eventName', expect.any(Function), false);
        });

        it('should cancel eventListener on element after first trigger', () => {
            const spy = jest.spyOn(element, 'removeEventListener');
            const fn = () => {};

            once(element, 'eventName', fn);
            element.dispatchEvent(new Event('eventName'));

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith('eventName', expect.any(Function), false);
        });

        it('should be callable with undefined fn', () => {
            const spy = jest.spyOn(element, 'removeEventListener');
            const fn = undefined;

            once(element, 'eventName', fn);
            element.dispatchEvent(new Event('eventName'));

            expect(spy).toHaveBeenCalled();
        });
    });
});
