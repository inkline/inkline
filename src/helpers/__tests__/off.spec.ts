import { off, removeEventListenerBinding, detachEventBinding, _off } from '@inkline/inkline/helpers';

describe('Helpers', () => {
    describe('off()', () => {
        let element: any;
        const event = 'event';
        const handler = () => {};

        beforeEach(() => {
            element = {
                removeEventListener () {},
                detachEvent () {}
            };
        });

        it('should be a function calling removeEventListener on element', () => {
            const spy = vi.spyOn(element, 'removeEventListener');
            const fn = () => {};

            off(element, 'eventName', fn);

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith('eventName', fn, false);
        });

        it('should not call removeEventListener on element if event not specified', () => {
            const spy = vi.spyOn(element, 'removeEventListener');
            const fn = () => {};

            (off as any)(element, false, fn);

            expect(spy).not.toHaveBeenCalled();
        });

        it('should be a function calling detachEventBinding on element', () => {
            const spy = vi.spyOn(element, 'detachEvent');
            const documentSpy = vi.spyOn(window, 'document', 'get');
            documentSpy.mockImplementation(() => ({
                addEventListener: false
            }) as any);

            const fn = () => {};

            _off()(element, 'eventName', fn);

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith('oneventName', fn);

            documentSpy.mockRestore();
        });

        it('should not call removeEventListener on element if event not specified', () => {
            const spy = vi.spyOn(element, 'detachEvent');
            const fn = () => {};

            (_off as any)()(element, false, fn);

            expect(spy).not.toHaveBeenCalled();

            spy.mockRestore();
        });

        describe('removeEventListenerBinding()', () => {
            it('should call addEventListener on element', () => {
                const spy = vi.spyOn(element, 'removeEventListener');

                removeEventListenerBinding(element, event, handler);

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith(event, handler, false);
            });
        });

        describe('detachEventBinding()', () => {
            it('should call attachEvent on element', () => {
                const spy = vi.spyOn(element as any, 'detachEvent');

                detachEventBinding(element, event, handler);

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('on' + event, handler);
            });
        });
    });
});
