import { PopupControlsMixin } from '@inkline/inkline/mixins';
import { fireEvent, render } from '@testing-library/vue';
import { Placeholder, PlaceholderButton } from '@inkline/inkline/__mocks__';

describe('mixins', () => {
    describe('PopupControlsMixin', () => {
        const Component = {
            name: 'PopupControls',
            mixins: [PopupControlsMixin],
            methods: {
                createPopper: jest.fn()
            },
            template: `<div>
              <div class="trigger" ref="trigger">
                  <slot />
              </div>
              <div v-show="visible" role="tooltip" ref="body">
                  <slot name="body" />
              </div>
            </div>`
        };

        const slots = {
            default: [PlaceholderButton],
            body: [Placeholder]
        };

        it('should render correctly', () => {
            const wrapper = render(Component, {
                slots
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('mounted()', () => {
            it('should throw error if no default slot provided', () => {
                const wrapper = {
                    mounted: PopupControlsMixin.mounted,
                    $slots: {}
                };

                expect(() => (wrapper as any).mounted()).toThrow();
            });
        });

        describe('beforeUnmount()', () => {
            it('should remove event listeners', () => {
                const wrapper = {
                    beforeUnmount: PopupControlsMixin.beforeUnmount,
                    removeEventListeners: jest.fn()
                };

                (wrapper as any).beforeUnmount();
                expect(wrapper.removeEventListeners).toHaveBeenCalled();
            });
        });

        describe('methods', () => {
            describe('show()', () => {
                [
                    { eventName: 'mouseEnter', triggerName: '.trigger' },
                    { eventName: 'click', triggerName: '.trigger' },
                    { eventName: 'focus', triggerName: 'button' }
                ].forEach(({ eventName, triggerName }) => {
                    describe(eventName, () => {
                        it('should show popup', async () => {
                            const wrapper = render(Component, {
                                slots
                            });
                            const trigger = wrapper.container.querySelector(triggerName);

                            await (fireEvent as any)[eventName](trigger as Element);

                            expect(wrapper.getByRole('tooltip')).toBeVisible();
                            expect(wrapper.emitted()['update:modelValue'][0]).toEqual([true]);
                        });

                        it('should not show popup if disabled', async () => {
                            const wrapper = render(Component, {
                                slots,
                                props: {
                                    disabled: true
                                }
                            });
                            const trigger = wrapper.container.querySelector(triggerName);

                            await (fireEvent as any)[eventName](trigger as Element);

                            expect(wrapper.emitted()['update:modelValue']).not.toBeDefined();
                        });

                        it('should not show popup if already visible', async () => {
                            const wrapper = render(Component, {
                                slots,
                                props: {
                                    modelValue: true
                                }
                            });
                            const trigger = wrapper.container.querySelector(triggerName);

                            await (fireEvent as any)[eventName](trigger as Element);

                            expect(wrapper.emitted()['update:modelValue']).not.toEqual([[true]]);
                        });
                    });
                });
            });

            describe('hide()', () => {
                [
                    { eventName: 'mouseLeave', triggerName: '.trigger' },
                    { eventName: 'click', triggerName: '.trigger' },
                    { eventName: 'blur', triggerName: 'button' }
                ].forEach(({ eventName, triggerName }) => {
                    describe(eventName, () => {
                        it('should hide popup', async () => {
                            const wrapper = render(Component, {
                                slots,
                                props: {
                                    modelValue: true
                                }
                            });
                            const trigger = wrapper.container.querySelector(triggerName);
                            const popup = await wrapper.getByRole('tooltip');

                            await (fireEvent as any)[eventName](trigger as Element);

                            expect(popup).not.toBeVisible();
                            expect(wrapper.emitted()['update:modelValue'][0]).toEqual([false]);
                        });

                        it('should not hide popup if disabled', async () => {
                            const wrapper = render(Component, {
                                slots,
                                props: {
                                    modelValue: true,
                                    disabled: true
                                }
                            });
                            const trigger = wrapper.container.querySelector(triggerName);

                            await (fireEvent as any)[eventName](trigger as Element);

                            expect(wrapper.emitted()['update:modelValue']).not.toBeDefined();
                        });

                        it('should not hide popup if already hidden', async () => {
                            const wrapper = render(Component, {
                                slots,
                                props: {
                                    modelValue: false
                                }
                            });
                            const trigger = wrapper.container.querySelector(triggerName);

                            await (fireEvent as any)[eventName](trigger as Element);

                            expect(wrapper.emitted()['update:modelValue']).not.toEqual([[false]]);
                        });
                    });
                });
            });
        });
    });
});
