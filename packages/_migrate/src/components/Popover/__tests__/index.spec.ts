import { fireEvent, render } from '@testing-library/vue';
import { Popover } from '@inkline/inkline/components';
import { keymap } from '@inkline/inkline/constants';
import { Placeholder, PlaceholderButton } from '@inkline/inkline/__tests__/utils';
import { createTestingInklineOptionsProvide } from '@inkline/test-utils';

describe('Components', () => {
    describe('Popover', () => {
        const props = {
            color: 'primary',
            size: 'md',
            name: 'popover'
        };

        const slots = {
            default: [PlaceholderButton],
            header: [Placeholder],
            body: [Placeholder],
            footer: [Placeholder]
        };

        it('should be named correctly', () => {
            expect(Popover.name).toEqual('Popover');
        });

        it('should render correctly', () => {
            const wrapper = render(Popover, {
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

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(Popover, {
                        props,
                        slots,
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });
                    const popover = wrapper.container.querySelector('.popover');

                    expect(popover).toHaveClass(`-${props.color}`, `-${props.size}`);
                });
            });
        });

        describe('methods', () => {
            describe('show()', () => {
                it('should show popover popup', async () => {
                    const wrapper = render(Popover, {
                        props,
                        slots,
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });
                    const trigger = wrapper.container.querySelector('.popover-trigger');

                    await fireEvent.click(trigger as Element);

                    const popup = await wrapper.getByRole('tooltip');
                    expect(popup).toBeVisible();
                });

                it('should not show popover popup if disabled', async () => {
                    const wrapper = render(Popover, {
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
                    const trigger = wrapper.container.querySelector('.popover-trigger');
                    const popup = wrapper.container.querySelector('.popover');

                    await fireEvent.click(trigger as Element);

                    expect(popup).not.toBeVisible();
                });
            });

            describe('hide()', () => {
                it('should hide popover popup', async () => {
                    const wrapper = render(Popover, {
                        props,
                        slots,
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });
                    const trigger = wrapper.container.querySelector('.popover-trigger');

                    await fireEvent.click(trigger as Element);
                    const popup = await wrapper.getByRole('tooltip');
                    await fireEvent.click(trigger as Element);
                    expect(popup).not.toBeVisible();
                });

                it('should not hide popover popup if disabled', async () => {
                    const wrapper = render(Popover, {
                        props,
                        slots,
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });
                    let trigger = wrapper.container.querySelector('.popover-trigger');
                    await fireEvent.click(trigger as Element);

                    await wrapper.rerender({ disabled: true });

                    trigger = wrapper.container.querySelector('.popover-trigger');
                    const popup = await wrapper.getByRole('tooltip');
                    await fireEvent.click(trigger as Element);

                    expect(popup).toBeVisible();
                });
            });

            describe('onEscape()', () => {
                it('should hide popover popup', async () => {
                    const wrapper = render(Popover, {
                        props,
                        slots,
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });
                    const trigger = wrapper.container.querySelector('.popover-trigger');

                    await fireEvent.click(trigger as Element);
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
