import { useClickOutside } from './useClickOutside';
import { onBeforeUnmount, PropType } from 'vue';
import { defineComponent, toRef } from 'vue';
import { mount } from '@vue/test-utils';
import { fireEvent } from '@testing-library/vue';
import { on, off } from '@inkline/utils';

vi.mock('@inkline/utils', async () => {
    const actual = await vi.importActual('@inkline/utils');
    return {
        ...actual,
        on: vi.fn(),
        off: vi.fn()
    };
});

const TestComponent = defineComponent({
    props: {
        fn: {
            type: Function as PropType<() => void>,
            default: () => () => {}
        },
        element: {
            type: Object as PropType<HTMLElement>,
            default: () => document.createElement('div')
        }
    },
    setup(props) {
        const elementRef = toRef(props, 'element');
        const fn = toRef(props, 'fn');

        const removeOnClickOutsideEventBindings = useClickOutside(elementRef, fn);

        onBeforeUnmount(() => {
            removeOnClickOutsideEventBindings();
        });

        return {};
    },
    render() {
        return null;
    }
});

describe('Composables', () => {
    describe('useClickOutside', () => {
        describe('onMounted()', () => {
            it('should attach window.document mousedown event', () => {
                mount(TestComponent);

                expect(on).toHaveBeenCalledWith(window.document, 'mousedown', expect.any(Function));
            });
        });

        describe.skip('onUnmounted()', () => {
            // @TODO Fix this test
            it('should detach window.document mousedown event', () => {
                mount(TestComponent).unmount();

                expect(off).toHaveBeenCalledWith(
                    window.document,
                    'mousedown',
                    expect.any(Function)
                );
            });
        });

        describe('binding()', () => {
            // @TODO Fix this test
            it.skip('should call bound function', async () => {
                const fn = vi.fn();
                const element = {
                    offsetWidth: true,
                    contains: () => false
                } as unknown as HTMLElement;

                mount(TestComponent, {
                    props: {
                        fn,
                        element
                    }
                });

                await fireEvent.mouseDown(document.body);

                expect(fn).toHaveBeenCalledWith(expect.any(Event));
            });

            it('should not call bound function if element is target', async () => {
                const fn = vi.fn();

                mount(TestComponent, {
                    props: {
                        fn,
                        element: document.body
                    }
                });

                await fireEvent.mouseDown(document.body);

                expect(fn).not.toHaveBeenCalled();
            });

            it('should not call bound function if element contains target', async () => {
                const fn = vi.fn();
                const element = {
                    offsetWidth: true,
                    contains: () => true
                } as unknown as HTMLElement;

                mount(TestComponent, {
                    props: {
                        fn,
                        element
                    }
                });

                await fireEvent.mouseDown(document.body);

                expect(fn).not.toHaveBeenCalled();
            });

            it('should not call bound function if element is not visible', async () => {
                const fn = vi.fn();
                const element = {
                    getClientRects: () => [],
                    contains: () => true
                } as unknown as HTMLElement;

                mount(TestComponent, {
                    props: {
                        fn,
                        element
                    }
                });

                await fireEvent.mouseDown(document.body);

                expect(fn).not.toHaveBeenCalled();
            });
        });
    });
});
