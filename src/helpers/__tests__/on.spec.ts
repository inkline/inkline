import { on, addEventListenerBinding, attachEventBinding, _on } from '@inkline/inkline/helpers';

describe('Helpers', () => {
    describe('on()', () => {
        let element: any;
        const event = 'event';
        const handler = () => {};

        beforeEach(() => {
            element = {
                addEventListener: vi.fn(),
                attachEvent: vi.fn()
            };
        });

        it('should be a function calling addEventListener binding', () => {
            const fn = () => {};

            on(element, 'eventName', fn);

            expect(element.addEventListener).toHaveBeenCalledWith('eventName', fn, false);
        });

        it('should not call addEventListener binding if event not specified', () => {
            const fn = () => {};

            (on as any)(element, false, fn);

            expect(element.addEventListener).not.toHaveBeenCalled();
        });

        it('should be a function calling attachEvent binding', () => {
            const spy = vi.spyOn(element, 'attachEvent');
            const documentSpy = vi.spyOn(window, 'document', 'get');
            documentSpy.mockImplementation(() => ({
                addEventListener: false
            }) as any);

            const fn = () => {};

            _on()(element, 'eventName', fn);

            expect(spy).toHaveBeenCalledWith('oneventName', fn);

            documentSpy.mockRestore();
        });

        describe('addEventListenerBinding()', () => {
            it('should call addEventListener on element', () => {
                addEventListenerBinding(element, event, handler);

                expect(element.addEventListener).toHaveBeenCalledWith(event, handler, false);
            });
        });

        describe('attachEventBinding()', () => {
            it('should call attachEvent on element', () => {
                attachEventBinding(element, event, handler);

                expect(element.attachEvent).toHaveBeenCalledWith('on' + event, handler);
            });
        });
    });
});
