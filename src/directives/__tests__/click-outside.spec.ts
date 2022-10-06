import {
    ClickOutsideDirective,
    onClickOutside
} from '@inkline/inkline/directives/click-outside';

vi.mock('@grozav/utils', async () => {
    const { isVisible } = await vi.importActual('@grozav/utils');

    return {
        on: vi.fn(),
        isVisible
    };
});

const helpersModule: {
    on: () => void;
    isVisible: () => boolean;
} = await vi.importMock('@grozav/utils');

describe('Directives', () => {
    describe('v-click-outside', () => {
        describe('beforeMount()', () => {
            it('should attach window.document mousedown event with onClickOutside result', () => {
                const element = document.createElement('div');
                const binding = vi.fn();

                (ClickOutsideDirective as any).beforeMount(element, binding);

                expect(helpersModule.on).toHaveBeenCalledWith(
                    window.document,
                    'mousedown',
                    expect.any(Function)
                );
            });
        });

        describe('onClickOutside()', () => {
            it('should call binding.value with event', () => {
                const element = {
                    offsetWidth: true,
                    contains: () => false
                };
                const binding = { value: vi.fn() };
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
                const binding = { value: vi.fn() };
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
                const binding = { value: vi.fn() };
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
                const binding = { value: vi.fn() };
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
                const binding = { value: vi.fn() };
                const event = { target: null };
                const fn = onClickOutside(element as any, binding);

                fn(event as any);

                expect(binding.value).not.toHaveBeenCalled();
            });
        });
    });
});
