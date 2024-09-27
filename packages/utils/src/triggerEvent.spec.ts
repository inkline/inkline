import { triggerEvent } from './triggerEvent';

describe('Helpers', () => {
    describe('triggerEvent()', () => {
        const windowSpy = vi.spyOn(global as any, 'window', 'get');
        let element: HTMLElement;

        beforeEach(() => {
            element = document.createElement('a');
        });

        describe('dispatchEvent', () => {
            it('should trigger an event of type MouseEvents', () => {
                const eventName = 'mousemove';
                const eventType = 'MouseEvents';
                const spy = vi.spyOn(element, 'dispatchEvent');

                const event = document.createEvent(eventType);
                event.initEvent(eventName);

                triggerEvent(element, eventName);

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith(event);
            });

            it('should trigger an event of type KeyboardEvent', () => {
                const eventName = 'keypress';
                const eventType = 'KeyboardEvent';
                const spy = vi.spyOn(element, 'dispatchEvent');

                const event = document.createEvent(eventType);
                event.initEvent(eventName);

                triggerEvent(element, eventName);

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith(event);
            });

            it('should trigger an event of type HTMLEvents', () => {
                const eventName = 'other';
                const eventType = 'HTMLEvents';
                const spy = vi.spyOn(element, 'dispatchEvent');

                const event = document.createEvent(eventType);
                event.initEvent(eventName);

                triggerEvent(element, eventName);

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith(event);
            });

            it('should set event options', () => {
                const eventName = 'mousemove';
                const eventType = 'MouseEvents';
                const spy = vi.spyOn(element, 'dispatchEvent');

                const event = document.createEvent(eventType);
                event.initEvent(eventName);

                triggerEvent(element, 'eventName', { cancelable: true, custom: true });

                expect(spy).toHaveBeenCalled();
            });
        });

        describe('fireEvent', () => {
            beforeEach(() => {
                (element as any).dispatchEvent = false;
                (element as any).fireEvent = () => {};
            });

            it('should trigger an event of type MouseEvents', () => {
                const eventName = 'mousemove';
                const eventType = 'MouseEvents';
                const spy = vi.spyOn(element as any, 'fireEvent');

                const event = document.createEvent(eventType);
                event.initEvent(eventName);

                triggerEvent(element, eventName);

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('on' + eventName, event);
            });

            it('should trigger an event of type KeyboardEvent', () => {
                const eventName = 'keypress';
                const eventType = 'KeyboardEvent';
                const spy = vi.spyOn(element as any, 'fireEvent');

                const event = document.createEvent(eventType);
                event.initEvent(eventName);

                triggerEvent(element, eventName);

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('on' + eventName, event);
            });

            it('should trigger an event of type HTMLEvents', () => {
                const eventName = 'other';
                const eventType = 'HTMLEvents';
                const spy = vi.spyOn(element as any, 'fireEvent');

                const event = document.createEvent(eventType);
                event.initEvent(eventName);

                triggerEvent(element, eventName);

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('on' + eventName, event);
            });
        });

        it('should return if isServer', () => {
            windowSpy.mockImplementation(() => undefined);

            expect(triggerEvent(element, 'eventName')).not.toBeDefined();

            vi.clearAllMocks();
        });
    });
});
