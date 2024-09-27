import { on, addEventListenerBinding, attachEventBinding, _on } from './on, addEventListenerBinding, attachEventBinding, _on';

describe('Helpers', () => {
    describe('on()', () => {
        const windowSpy = vi.spyOn(global as any, 'window', 'get');
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
            windowSpy.mockImplementation(() => ({
                document: {
                    addEventListener: false
                }
            }));

            const fn = () => {};

            _on()(element, 'eventName', fn);

            expect(element.attachEvent).toHaveBeenCalledWith('oneventName', fn);

            vi.clearAllMocks();
        });

        it('should not call attachEvent binding if event not specified', () => {
            windowSpy.mockImplementation(() => undefined);

            const fn = () => {};

            (_on as any)()(element as any, undefined, fn);

            expect(element.addEventListener).not.toHaveBeenCalled();

            vi.clearAllMocks();
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
