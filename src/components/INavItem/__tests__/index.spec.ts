import { fireEvent, render } from '@testing-library/vue';
import { INavItem } from '@inkline/inkline/components';
import { createInkline } from '@inkline/inkline/__tests__/utils';
import { InklineKey, NavKey } from '@inkline/inkline';

describe('Components', () => {
    describe('INavItem', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(INavItem.name).toEqual('INavItem');
        });

        it('should render correctly', () => {
            const wrapper = render(INavItem, {
                props,
                global: {
                    provide: {
                        [InklineKey as symbol]: createInkline()
                    }
                }
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(INavItem, {
                        props: {
                            active: true,
                            disabled: true,
                            ...props
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass('-active', '-disabled');
                });
            });

            describe('tabIndex', () => {
                it('should be -1 if disabled', () => {
                    const wrapper = render(INavItem, {
                        props: {
                            disabled: true,
                            ...props
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveAttribute('tabindex', '-1');
                });

                it('should be 1 otherwise', () => {
                    const wrapper = render(INavItem, {
                        props,
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveAttribute('tabindex', '0');
                });
            });
        });

        describe('methods', () => {
            describe('onClick()', () => {
                it('should call parent nav onItemClick', async () => {
                    const onItemClick = vi.fn();
                    const wrapper = render(INavItem, {
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline(),
                                [NavKey as symbol]: {
                                    onItemClick
                                }
                            }
                        },
                        props
                    });

                    await fireEvent.click(wrapper.container.firstChild as Element);

                    expect(onItemClick).toHaveBeenCalled();
                });

                it('should not call parent nav onItemClick if stopPropagation', async () => {
                    const onItemClick = vi.fn();
                    const wrapper = render(INavItem, {
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline(),
                                [NavKey as symbol]: {
                                    onItemClick
                                }
                            }
                        },
                        props: {
                            ...props,
                            stopPropagation: true
                        }
                    });

                    await fireEvent.click(wrapper.container.firstChild as Element);

                    expect(onItemClick).not.toHaveBeenCalled();
                });
            });
        });
    });
});
