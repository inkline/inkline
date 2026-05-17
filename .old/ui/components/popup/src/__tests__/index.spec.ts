// @vitest-environment jsdom

import { fireEvent, render, waitFor } from '@testing-library/vue';
import { Popup } from '../index';
import { createTestingInklineOptionsProvide } from '@inkline/test-utils';
import { ref } from 'vue';

const PopupComponent = {
    components: {
        Popup
    },
    setup() {
        const triggerRef = ref<HTMLElement | null>(null);
        const popupRef = ref<HTMLElement | null>(null);

        return {
            triggerRef,
            popupRef
        };
    },
    template: `
        <Popup :trigger="triggerRef" :popup="popupRef">
            <template #trigger>
                <button ref="triggerRef" data-test-id="trigger">Trigger</button>
            </template>
            <template #popup="{ visible, popupStyles }">
                <div v-show="visible" ref="popupRef" data-test-id="popup" :style="popupStyles">Popup</div>
            </template>
        </Popup>
    `
};

describe('Components', () => {
    describe('Popup', () => {
        const props = {
            name: 'popup'
        };

        const slots = {};

        it('should be named correctly', () => {
            expect(Popup.name).toEqual('Popup');
        });

        it('should render correctly', () => {
            const wrapper = render(PopupComponent, {
                props,
                slots,
                global: {
                    provide: {
                        ...createTestingInklineOptionsProvide()
                    }
                }
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('name', () => {
                it('should have randomly generated name uid', () => {
                    const wrapper = render(PopupComponent, {
                        slots,
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveAttribute(
                        'id',
                        expect.stringContaining('popup')
                    );
                });
            });
        });

        describe('methods', () => {
            describe('show()', () => {
                it.only('should show popup', async () => {
                    const wrapper = render(PopupComponent, {
                        props,
                        slots,
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });
                    const trigger = wrapper.getByTestId('trigger');

                    await fireEvent.mouseEnter(trigger);

                    const popup = wrapper.getByTestId('popup');

                    await waitFor(() => expect(popup).toBeVisible());
                });

                it('should not show popup if disabled', async () => {
                    const wrapper = render(PopupComponent, {
                        props: {
                            disabled: true,
                            ...props
                        },
                        slots,
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });
                    const trigger = wrapper.getByTestId('trigger');
                    const popup = wrapper.getByTestId('popup');

                    await fireEvent.mouseEnter(trigger);

                    expect(popup).not.toBeVisible();
                });
            });

            describe('hide()', () => {
                it('should hide popup', async () => {
                    const wrapper = render(PopupComponent, {
                        props,
                        slots,
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });
                    const trigger = wrapper.getByTestId('trigger');

                    await fireEvent.mouseEnter(trigger);
                    const popup = wrapper.getByTestId('popup');
                    await fireEvent.mouseLeave(trigger);
                    expect(popup).not.toBeVisible();
                });

                it('should not hide popup if disabled', async () => {
                    const wrapper = render(PopupComponent, {
                        props,
                        slots,
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });
                    let trigger = wrapper.getByTestId('trigger');
                    await fireEvent.mouseEnter(trigger);

                    await wrapper.rerender({ disabled: true });

                    trigger = wrapper.getByTestId('trigger');
                    const popup = wrapper.getByTestId('popup');
                    await fireEvent.mouseLeave(trigger);

                    expect(popup).toBeVisible();
                });
            });

            describe('onEscape()', () => {
                it('should hide popup', async () => {
                    const wrapper = render(PopupComponent, {
                        props,
                        slots,
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });
                    const trigger = wrapper.getByTestId('trigger');

                    await fireEvent.mouseEnter(trigger);
                    const popup = wrapper.getByTestId('popup');
                    await fireEvent.keyUp(wrapper.container.firstChild as Element, {
                        key: 'Escape'
                    });
                    expect(popup).not.toBeVisible();
                });
            });
        });
    });
});
