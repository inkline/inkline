import { fireEvent, render } from '@testing-library/vue';
import { ICollapsibleItem } from '@inkline/inkline/components';

describe('Components', () => {
    describe('ICollapsibleItem', () => {
        const props = {
            name: 'collapsible-item'
        };

        it('should be named correctly', () => {
            expect(ICollapsibleItem.name).toEqual('ICollapsibleItem');
        });

        it('should render correctly', () => {
            const wrapper = render(ICollapsibleItem, {
                global: {
                    provide: {
                        collapsible: {
                            activeItems: []
                        }
                    }
                },
                props
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('name', () => {
                it('should have randomly generated name uid', () => {
                    const wrapper = render(ICollapsibleItem, {
                        props: {}
                    });

                    expect(wrapper.container.firstChild).toHaveAttribute('name', expect.stringContaining('collapsible-item'));
                });
            });
        });

        describe('computed', () => {
            describe('active', () => {
                it('should add -active class when item is active', () => {
                    const wrapper = render(ICollapsibleItem, {
                        global: {
                            provide: {
                                collapsible: {
                                    activeItems: [props.name]
                                }
                            }
                        },
                        props
                    });

                    expect(wrapper.html()).toMatchSnapshot();
                });
            });

            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(ICollapsibleItem, {
                        global: {
                            provide: {
                                collapsible: {
                                    activeItems: [props.name]
                                }
                            }
                        },
                        props
                    });

                    expect(wrapper.container.firstChild).toHaveClass(
                        '-active'
                    );
                });
            });
        });

        describe('methods', () => {
            describe('onClick()', () => {
                it('should call collapsible onItemClick', async () => {
                    const onItemClick = vi.fn();
                    const wrapper = render(ICollapsibleItem, {
                        global: {
                            provide: {
                                collapsible: {
                                    activeItems: [],
                                    onItemClick
                                }
                            }
                        },
                        props
                    });
                    const itemHeaders = await wrapper.getAllByRole('tab');

                    await fireEvent.click(itemHeaders[0]);
                    expect(onItemClick).toHaveBeenCalled();
                });
            });
        });
    });
});
