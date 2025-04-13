import { triggerEvent } from './triggerEvent';

describe('Helpers', () => {
    describe('triggerEvent', () => {
        let element: HTMLElement;

        beforeEach(() => {
            element = document.createElement('div');
            document.body.appendChild(element);
        });

        afterEach(() => {
            document.body.removeChild(element);
        });

        it('should trigger a click event on the element', () => {
            const clickHandler = vi.fn();
            element.addEventListener('click', clickHandler);

            triggerEvent(element, 'click');

            expect(clickHandler).toHaveBeenCalled();
        });

        it('should trigger a mouseover event with custom options', () => {
            const mouseoverHandler = vi.fn();
            element.addEventListener('mouseover', mouseoverHandler);

            triggerEvent(element, 'mouseover', { bubbles: true });

            expect(mouseoverHandler).toHaveBeenCalled();
        });

        it('should trigger a keyup event on the element', () => {
            const keyupHandler = vi.fn();
            element.addEventListener('keyup', keyupHandler);

            triggerEvent(element, 'keyup');

            expect(keyupHandler).toHaveBeenCalled();
        });

        it('should trigger a custom event with additional options', () => {
            const customEventHandler = vi.fn();
            element.addEventListener('customEvent', customEventHandler);

            triggerEvent(element, 'customEvent', { bubbles: true, cancelable: true, detail: 123 });

            expect(customEventHandler).toHaveBeenCalled();
        });

        it('should handle events on the document object', () => {
            const docHandler = vi.fn();
            document.addEventListener('click', docHandler);

            triggerEvent(document, 'click');

            expect(docHandler).toHaveBeenCalled();
        });

        it('should handle events on the window object', () => {
            const windowHandler = vi.fn();
            window.addEventListener('resize', windowHandler);

            triggerEvent(window, 'resize');

            expect(windowHandler).toHaveBeenCalled();
        });

        it('should set custom properties on the event object', () => {
            const customEventHandler = vi.fn();
            element.addEventListener('customEvent', customEventHandler);

            const options = { bubbles: true, cancelable: true, detail: 42 };
            triggerEvent(element, 'customEvent', options);

            const event = customEventHandler.mock.calls[0][0] as Record<string, unknown>;
            expect(event.bubbles).toBe(true);
            expect(event.cancelable).toBe(true);
            expect(event.detail).toBe(42);
        });

        it('should return the element after triggering the event', () => {
            const result = triggerEvent(element, 'click');
            expect(result).toBe(element);
        });
    });

});
