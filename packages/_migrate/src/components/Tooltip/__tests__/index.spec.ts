import { fireEvent, render } from '@testing-library/vue';
import { Tooltip } from '@inkline/inkline/components';
import { keymap } from '@inkline/inkline/constants';
import { Placeholder, PlaceholderButton } from '@inkline/inkline/__tests__/utils';
import { createTestingInklineOptionsProvide } from '@inkline/test-utils';

describe('Components', () => {
    describe('Tooltip', () => {
        const props = {
            color: 'primary',
            size: 'md',
            name: 'tooltip'
        };

        const slots = {
            default: [PlaceholderButton],
            body: [Placeholder]
        };

        it('should be named correctly', () => {
            expect(Tooltip.name).toEqual('Tooltip');
        });

        it('should render correctly', () => {
            const wrapper = render(Tooltip, {
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
                    const wrapper = render(Tooltip, {
                        props: {
                            color: props.color,
                            size: props.size
                        },
                        slots,
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveAttribute(
                        'id',
                        expect.stringContaining('tooltip')
                    );
                });
            });
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(Tooltip, {
                        props,
                        slots,
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });
                    const tooltip = wrapper.container.querySelector('.tooltip');

                    expect(tooltip).toHaveClass(`-${props.color}`, `-${props.size}`);
                });
            });
        });

        describe('methods', () => {
            describe('show()', () => {
                it('should show tooltip popup', async () => {
                    const wrapper = render(Tooltip, {
                        props,
                        slots,
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });
                    const trigger = wrapper.container.querySelector('.tooltip-trigger');

                    await fireEvent.mouseEnter(trigger as Element);

                    const popup = await wrapper.getByRole('tooltip');
                    expect(popup).toBeVisible();
                });

                it('should not show tooltip popup if disabled', async () => {
                    const wrapper = render(Tooltip, {
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
                    const trigger = wrapper.container.querySelector('.tooltip-trigger');
                    const popup = wrapper.container.querySelector('.tooltip');

                    await fireEvent.mouseEnter(trigger as Element);

                    expect(popup).not.toBeVisible();
                });
            });

            describe('hide()', () => {
                it('should hide tooltip popup', async () => {
                    const wrapper = render(Tooltip, {
                        props,
                        slots,
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });
                    const trigger = wrapper.container.querySelector('.tooltip-trigger');

                    await fireEvent.mouseEnter(trigger as Element);
                    const popup = await wrapper.getByRole('tooltip');
                    await fireEvent.mouseLeave(trigger as Element);
                    expect(popup).not.toBeVisible();
                });

                it('should not hide tooltip popup if disabled', async () => {
                    const wrapper = render(Tooltip, {
                        props,
                        slots,
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });
                    let trigger = wrapper.container.querySelector('.tooltip-trigger');
                    await fireEvent.mouseEnter(trigger as Element);

                    await wrapper.rerender({ disabled: true });

                    trigger = wrapper.container.querySelector('.tooltip-trigger');
                    const popup = await wrapper.getByRole('tooltip');
                    await fireEvent.mouseLeave(trigger as Element);

                    expect(popup).toBeVisible();
                });
            });

            describe('onEscape()', () => {
                it('should hide tooltip popup', async () => {
                    const wrapper = render(Tooltip, {
                        props,
                        slots,
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });
                    const trigger = wrapper.container.querySelector('.tooltip-trigger');

                    await fireEvent.mouseEnter(trigger as Element);
                    const popup = await wrapper.getByRole('tooltip');
                    await fireEvent.keyUp(wrapper.container.firstChild as Element, {
                        key: keymap.esc[0]
                    });
                    expect(popup).not.toBeVisible();
                });
            });
        });
    });
});
