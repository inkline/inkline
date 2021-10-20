import { CollapsibleMixin } from '@inkline/inkline/mixins';
import { fireEvent, render } from '@testing-library/vue';
import { createMockInstance } from '@inkline/inkline/__mocks__/createMockInstance';

describe('mixins', () => {
    describe('CollapsibleMixin', () => {
        const Component = {
            name: 'Collapsible',
            mixins: [CollapsibleMixin],
            template: `<div :class="collapsibleClasses">
              <span>{{open}}</span>
              <button @click="setOpen(true)">Set open</button>
              <button @click="toggleOpen()">Toggle open</button>
            </div>`
        };

        it('should render correctly', () => {
            const wrapper = render(Component);

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(Component, {
                        props: {
                            modelValue: true,
                            collapsible: true,
                            collapse: true,
                        },
                    });

                    expect(wrapper.container.firstChild).toHaveClass(
                        '-open',
                        '-collapsible',
                        '-collapse-true',
                    );
                });
            });

            describe('collapsible', () => {
                it('should return true if collapse is true', () => {
                    const wrapper = createMockInstance(CollapsibleMixin, {
                        props: {
                            collapse: true
                        }
                    });

                    expect(wrapper.collapsible).toEqual(true);
                });

                it('should return false if collapse is false', () => {
                    const wrapper = createMockInstance(CollapsibleMixin, {
                        props: {
                            collapse: false
                        }
                    });

                    expect(wrapper.collapsible).toEqual(false);
                });

                it('should return whether window width is less than current breakpoint upper limit', () => {
                    const wrapper = createMockInstance(CollapsibleMixin, {
                        props: {
                            collapse: 'md'
                        }
                    });

                    wrapper.windowWidth = 800;
                    expect(wrapper.collapsible).toEqual(true);

                    wrapper.windowWidth = 1000;
                    expect(wrapper.collapsible).toEqual(false);
                });
            });
        });

        describe('methods', () => {
            describe('setOpen()', () => {
                it('should set open and emit update:modelValue', async () => {
                    const wrapper = render(Component);
                    const setOpenButton = await wrapper.getByText('Set open');

                    await fireEvent.click(setOpenButton);

                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([true]);
                    expect(wrapper.getByText('true')).toBeVisible();
                });
            });

            describe('toggleOpen()', () => {
                it('should toggle open and emit update:modelValue', async () => {
                    const wrapper = render(Component, {
                        props: { modelValue: true }
                    });
                    const toggleOpenButton = await wrapper.getByText('Toggle open');

                    await fireEvent.click(toggleOpenButton);

                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([false]);
                    expect(wrapper.getByText('false')).toBeVisible();
                });
            });

            describe('onWindowResize()', () => {
                it('should return if collapse is true', async () => {
                    const wrapper = createMockInstance(CollapsibleMixin, {
                        props: {
                            collapse: true
                        }
                    });

                    wrapper.setOpen = jest.fn();
                    wrapper.onWindowResize();

                    expect(wrapper.setOpen).not.toHaveBeenCalled();
                });

                it('should return if collapse is false', async () => {
                    const wrapper = createMockInstance(CollapsibleMixin, {
                        props: {
                            collapse: false
                        }
                    });

                    wrapper.setOpen = jest.fn();
                    wrapper.onWindowResize();

                    expect(wrapper.setOpen).not.toHaveBeenCalled();
                });

                it('should not setOpen to false if not transitioning to collapsed state', async () => {
                    const wrapper = createMockInstance(CollapsibleMixin, {
                        props: {
                            collapse: 'sm'
                        }
                    });

                    (global as any).innerWidth = 1024;
                    wrapper.setOpen = jest.fn();
                    wrapper.windowWidth = 800;
                    wrapper.onWindowResize();

                    expect(wrapper.setOpen).not.toHaveBeenCalled();
                });

                it('should setOpen to false if transitioning to collapsed state', async () => {
                    const wrapper = createMockInstance(CollapsibleMixin, {
                        props: {
                            collapse: 'md'
                        }
                    });

                    (global as any).innerWidth = 1024;
                    wrapper.setOpen = jest.fn();
                    wrapper.windowWidth = 800;
                    wrapper.onWindowResize();

                    expect(wrapper.setOpen).toHaveBeenCalledWith(false);
                });
            });
        });
    });
});
