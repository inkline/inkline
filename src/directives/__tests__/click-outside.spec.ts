import { ClickOutsideDirective, onClickOutside } from '@inkline/inkline/directives/click-outside';

jest.mock('@inkline/inkline/helpers', () => ({
    on: jest.fn(),
    isVisible: jest.requireActual('@inkline/inkline/helpers/isVisible').isVisible
}));

const helpersModule = jest.requireMock('@inkline/inkline/helpers');
const windowSpy = jest.spyOn((global as any), 'window', 'get');

describe('Directives', () => {
    describe('v-click-outside', () => {
        describe('beforeMount()', () => {
            afterEach(() => {
                jest.clearAllMocks();
            });

            it('should attach window.document mouseup event with onClickOutside result', () => {
                const element = document.createElement('div');
                const binding = jest.fn();

                (ClickOutsideDirective as any).beforeMount(element, binding);

                expect(helpersModule.on).toHaveBeenCalledWith(window.document, 'mouseup', expect.any(Function));
            });

            it('should not attach window.document mouseup event if isServer', () => {
                windowSpy.mockImplementation(() => undefined);

                const element = document.createElement('div');
                const binding = jest.fn();

                (ClickOutsideDirective as any).beforeMount(element, binding);

                expect(helpersModule.on).not.toHaveBeenCalled();
            });
        });

        describe('onClickOutside()', () => {
            it('should call binding.value with event', () => {
                const element = {
                    offsetWidth: true,
                    contains: () => false
                };
                const binding = { value: jest.fn() };
                const target = document.createElement('div');
                const event = { target };
                const fn = onClickOutside(element as any, binding);

                fn(event);

                expect(binding.value).toHaveBeenCalledWith(event);
            });

            it('should not call binding.value if element contains target', () => {
                const element = {
                    offsetWidth: true,
                    contains: () => true
                };
                const binding = { value: jest.fn() };
                const target = document.createElement('div');
                const event = { target };
                const fn = onClickOutside(element as any, binding);

                fn(event);

                expect(binding.value).not.toHaveBeenCalled();
            });

            it('should not call binding.value if element is target', () => {
                const element = {
                    offsetWidth: true,
                    contains: () => false
                };
                const binding = { value: jest.fn() };
                const event = { target: element };
                const fn = onClickOutside(element as any, binding);

                fn(event as any);

                expect(binding.value).not.toHaveBeenCalled();
            });

            it('should not call binding.value if element is not visible', () => {
                const element = {
                    getClientRects: () => [],
                    contains: () => false
                };
                const binding = { value: jest.fn() };
                const target = document.createElement('div');
                const event = { target };
                const fn = onClickOutside(element as any, binding);

                fn(event);

                expect(binding.value).not.toHaveBeenCalled();
            });

            it('should not call binding.value if no event target', () => {
                const element = {
                    offsetWidth: true,
                    contains: () => false
                };
                const binding = { value: jest.fn() };
                const event = { target: null };
                const fn = onClickOutside(element as any, binding);

                fn(event as any);

                expect(binding.value).not.toHaveBeenCalled();
            });
        });
    });
});
