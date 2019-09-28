import Vue from 'vue';
import { on, _on, addEventListenerBinding, attachEventBinding } from '@inkline/inkline/src/helpers/on';

describe('Helpers', () => {
    describe('on()', () => {
        let element;
        const event = 'event';
        const handler = () => {};

        beforeEach(() => {
            element = {
                addEventListener() {},
                attachEvent() {},
            };
        });

        it('should be a function calling addEventListener binding', () => {
            const spy = jest.spyOn(element, 'addEventListener');
            const fn = () => {};

            on(element, 'eventName', fn);

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith('eventName', fn, false);
        });

        it('should not call addEventListener binding if event not specified', () => {
            const spy = jest.spyOn(element, 'addEventListener');
            const fn = () => {};

            on(element, false, fn);

            expect(spy).not.toHaveBeenCalled();
        });

        it('should be a function calling attachEvent binding', () => {
            Vue.$isServer = true;

            const spy = jest.spyOn(element, 'attachEvent');
            const fn = () => {};

            _on()(element, 'eventName', fn);

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith('oneventName', fn);

            Vue.$isServer = false;
        });

        it('should not call attachEvent binding if event not specified', () => {
            Vue.$isServer = true;

            const spy = jest.spyOn(element, 'addEventListener');
            const fn = () => {};

            _on()(element, undefined, fn);

            expect(spy).not.toHaveBeenCalled();

            Vue.$isServer = false;
        });

        describe('addEventListenerBinding()', () => {
            it('should call addEventListener on element', () => {
                const spy = jest.spyOn(element, 'addEventListener');

                addEventListenerBinding(element, event, handler);

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith(event, handler, false);
            });
        });

        describe('attachEventBinding()', () => {
            it('should call attachEvent on element', () => {
                const spy = jest.spyOn(element, 'attachEvent');

                attachEventBinding(element, event, handler);

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('on' + event, handler);
            });
        });
    });
});
