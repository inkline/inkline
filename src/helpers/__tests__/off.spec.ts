import { off, removeEventListenerBinding, detachEventBinding, _off } from '@inkline/inkline/helpers';

describe('Helpers', () => {
    describe('off()', () => {
        const windowSpy = jest.spyOn(global as any, 'window', 'get');
        let element: any;
        const event = 'event';
        const handler = () => {};

        beforeEach(() => {
            element = {
                removeEventListener () {},
                detachEvent () {}
            };
        });

        it('should be void function if window is not defined', () => {
            windowSpy.mockImplementation(() => undefined);

            const offFn = _off();

            const spy = jest.spyOn(element, 'removeEventListener');
            const fn = () => {};

            offFn(element, 'eventName', fn);

            expect(spy).not.toHaveBeenCalled();
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

            (off as any)(element, false, fn);

            expect(spy).not.toHaveBeenCalled();
        });

        it('should be a function calling detachEventBinding on element', () => {
            windowSpy.mockImplementation(() => ({
                document: {
                    addEventListener: false
                }
            }));

            const spy = jest.spyOn(element, 'detachEvent');
            const fn = () => {};

            _off()(element, 'eventName', fn);

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith('oneventName', fn);

            jest.clearAllMocks();
        });

        it('should not call removeEventListener on element if event not specified', () => {
            const spy = jest.spyOn(element, 'detachEvent');
            const fn = () => {};

            (_off as any)()(element, false, fn);

            expect(spy).not.toHaveBeenCalled();

            jest.clearAllMocks();
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
                const spy = jest.spyOn(element as any, 'detachEvent');

                detachEventBinding(element, event, handler);

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('on' + event, handler);
            });
        });
    });
});
