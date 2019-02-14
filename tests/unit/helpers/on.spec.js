import { on } from '@inkline/inkline/src/helpers/on';

describe('Helpers', () => {
    describe('on()', () => {
        let element;

        beforeEach(() => {
            element = {
                addEventListener() {},
                attachEvent() {},
            };
        });

        it('should be a function calling addEventListener on element', () => {
            const spy = jest.spyOn(element, 'addEventListener');
            const fn = () => {};

            on(element, 'eventName', fn);

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith('eventName', fn, false);
        });
    });
});
