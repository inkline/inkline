import { off } from '@inkline/inkline/helpers/off';

describe('Helpers', () => {
    describe('off()', () => {
        let element;

        beforeEach(() => {
            element = {
                removeEventListener() {},
                detachEvent() {},
            };
        });

        it('should be a function calling removeEventListener on element', () => {
            const spy = jest.spyOn(element, 'removeEventListener');
            const fn = () => {};

            off(element, 'eventName', fn);

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith('eventName', fn, false);
        });
    });
});
