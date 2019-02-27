import { off, removeEventListenerBinding, detachEventBinding } from '@inkline/inkline/src/helpers/off';

describe('Helpers', () => {
    describe('off()', () => {
        const element = {
            removeEventListener() {},
            detachEvent() {},
        };
        const event = 'event';
        const handler = () => {};

        it('should be a function calling removeEventListener on element', () => {
            const spy = jest.spyOn(element, 'removeEventListener');
            const fn = () => {};

            off(element, 'eventName', fn);

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith('eventName', fn, false);
        });


        describe('removeEventListenerBinding()', () => {
            it('should call addEventListener on element', () => {
                const spy = jest.spyOn(element, 'removeEventListener');

                removeEventListenerBinding(element, event, handler);

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith(event, handler, false);
            });
        });

        describe('detachEventBinding()', () => {
            it('should call attachEvent on element', () => {
                const spy = jest.spyOn(element, 'detachEvent');

                detachEventBinding(element, event, handler);

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('on' + event, handler);
            });
        });
    });
});
