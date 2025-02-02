import { fireEvent, render } from '@testing-library/vue';
import { NavItem } from '../index';
import { createTestingInklineOptionsProvide } from '@inkline/test-utils';
import { NavKey } from '@inkline/types';

describe('Components', () => {
    describe('NavItem', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(NavItem.name).toEqual('NavItem');
        });

        it('should render correctly', () => {
            const wrapper = render(NavItem, {
                props,
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
                    const wrapper = render(NavItem, {
                        props: {
                            active: true,
                            disabled: true,
                            ...props
                        },
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass('-active', '-disabled');
                });
            });

            describe('tabIndex', () => {
                it('should be -1 if disabled', () => {
                    const wrapper = render(NavItem, {
                        props: {
                            disabled: true,
                            ...props
                        },
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveAttribute('tabindex', '-1');
                });

                it('should be 1 otherwise', () => {
                    const wrapper = render(NavItem, {
                        props,
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
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
                    const wrapper = render(NavItem, {
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide(),
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
                    const wrapper = render(NavItem, {
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide(),
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
