import { triggerEvent } from '@inkline/inkline/src/helpers/triggerEvent';
import { isServer } from "@inkline/inkline/tests/utilities/isServer";

describe('Helpers', () => {
    describe('triggerEvent()', () => {
        let element;

        beforeEach(() => {
            element = document.createElement('a');
        });

        it('should return if Vue.$isServer', () => {
            isServer(true);
            expect(triggerEvent(element, 'eventName')).not.toBeDefined();
            isServer(false);
        });

        describe('dispatchEvent', () => {
            it('should trigger an event of type MouseEvents', () => {
                const eventName = 'mousemove';
                const eventType = 'MouseEvents';
                const spy = jest.spyOn(element, 'dispatchEvent');

                const event = document.createEvent(eventType);
                event.initEvent(eventName);

                triggerEvent(element, eventName);


                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith(event);
            });

            it('should trigger an event of type KeyboardEvent', () => {
                const eventName = 'keypress';
                const eventType = 'KeyboardEvent';
                const spy = jest.spyOn(element, 'dispatchEvent');

                const event = document.createEvent(eventType);
                event.initEvent(eventName);

                triggerEvent(element, eventName);


                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith(event);
            });

            it('should trigger an event of type HTMLEvents', () => {
                const eventName = 'other';
                const eventType = 'HTMLEvents';
                const spy = jest.spyOn(element, 'dispatchEvent');

                const event = document.createEvent(eventType);
                event.initEvent(eventName);

                triggerEvent(element, eventName);

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith(event);
            });

            it('should set event options', () => {
                const eventName = 'mousemove';
                const eventType = 'MouseEvents';
                const spy = jest.spyOn(element, 'dispatchEvent');

                const event = document.createEvent(eventType);
                event.initEvent(eventName);

                triggerEvent(element, 'eventName', { cancelable: true, custom: true });

                expect(spy).toHaveBeenCalled();
            });
        });

        describe('fireEvent', () => {
            beforeEach(() => {
                element.dispatchEvent = false;
                element.fireEvent = () => {};
            });

            it('should trigger an event of type MouseEvents', () => {
                const eventName = 'mousemove';
                const eventType = 'MouseEvents';
                const spy = jest.spyOn(element, 'fireEvent');

                const event = document.createEvent(eventType);
                event.initEvent(eventName);

                triggerEvent(element, eventName);


                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('on' + eventName, event);
            });

            it('should trigger an event of type KeyboardEvent', () => {
                const eventName = 'keypress';
                const eventType = 'KeyboardEvent';
                const spy = jest.spyOn(element, 'fireEvent');

                const event = document.createEvent(eventType);
                event.initEvent(eventName);

                triggerEvent(element, eventName);


                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('on' + eventName, event);
            });

            it('should trigger an event of type HTMLEvents', () => {
                const eventName = 'other';
                const eventType = 'HTMLEvents';
                const spy = jest.spyOn(element, 'fireEvent');

                const event = document.createEvent(eventType);
                event.initEvent(eventName);

                triggerEvent(element, eventName);


                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('on' + eventName, event);
            });
        });
    });
});
