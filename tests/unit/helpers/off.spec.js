import Vue from 'vue';
import { off, _off, removeEventListenerBinding, detachEventBinding } from '@inkline/inkline/src/helpers/off';

describe('Helpers', () => {
    describe('off()', () => {
        let element;
        const event = 'event';
        const handler = () => {};

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

        it('should not call removeEventListener on element if event not specified', () => {
            const spy = jest.spyOn(element, 'removeEventListener');
            const fn = () => {};

            off(element, false, fn);

            expect(spy).not.toHaveBeenCalled();
        });

        it('should be a function calling detachEventBinding on element', () => {
            Vue.$isServer = true;

            const spy = jest.spyOn(element, 'detachEvent');
            const fn = () => {};

            _off()(element, 'eventName', fn);

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith('oneventName', fn);

            Vue.$isServer = false;
        });

        it('should not call removeEventListener on element if event not specified', () => {
            Vue.$isServer = true;

            const spy = jest.spyOn(element, 'detachEvent');
            const fn = () => {};

            _off()(element, false, fn);

            expect(spy).not.toHaveBeenCalled();

            Vue.$isServer = false;
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
