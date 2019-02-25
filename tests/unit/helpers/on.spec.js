import { on, addEventListenerBinding, attachEventBinding } from '@inkline/inkline/helpers/on';

describe('Helpers', () => {
    describe('on()', () => {
        let element;

        beforeEach(() => {
            element = {
                addEventListener() {},
                attachEvent() {},
            };
        });

        it('should equal addEventListener binding', () => {
            const spy = jest.spyOn(element, 'addEventListener');
            const fn = () => {};

            on(element, 'eventName', fn);

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith('eventName', fn, false);
        });

        describe('addEventListenerBinding()', () => {
            const element = { addEventListener: (e) => e };
            const event = 'event';
            const handler = () => {};

            it('should call addEventListener on element', () => {
                const spy = jest.spyOn(element, 'addEventListener');

                addEventListenerBinding(element, event, handler);

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith(event, handler, false);
            });
        });

        describe('attachEventBinding()', () => {
            const element = { attachEvent: (e) => e };
            const event = 'event';
            const handler = () => {};

            it('should call attachEvent on element', () => {
                const spy = jest.spyOn(element, 'attachEvent');

                attachEventBinding(element, event, handler);

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('on' + event, handler);
            });
        });
    });
});
