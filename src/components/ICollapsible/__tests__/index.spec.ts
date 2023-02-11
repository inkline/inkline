import { fireEvent, render } from '@testing-library/vue';
import { ICollapsible, ICollapsibleItem } from '@inkline/inkline/components';
import { InklineKey } from '@inkline/inkline/plugin';
import { createInkline } from '@inkline/inkline/__tests__/utils';

describe('Components', () => {
    describe('ICollapsible', () => {
        const props = {
            color: 'light',
            size: 'md'
        };

        const stubs = {
            'i-collapsible-item': ICollapsibleItem
        };

        const slots = {
            default: [
                '<i-collapsible-item name="collapsible-item-1" />',
                '<i-collapsible-item name="collapsible-item-2" />'
            ]
        };

        it('should be named correctly', () => {
            expect(ICollapsible.name).toEqual('ICollapsible');
        });

        it('should render correctly', () => {
            const wrapper = render(ICollapsible, {
                global: {
                    stubs,
                    provide: {
                        [InklineKey as symbol]: createInkline()
                    }
                },
                props,
                slots
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(ICollapsible, {
                        global: {
                            stubs,
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        },
                        props,
                        slots
                    });

                    expect(wrapper.container.firstChild).toHaveClass(
                        `-${props.color}`,
                        `-${props.size}`
                    );
                });
            });
        });

        describe('methods', () => {
            describe('onItemClick()', () => {
                it('should open the clicked item', async () => {
                    const wrapper = render(ICollapsible, {
                        global: {
                            stubs,
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        },
                        props,
                        slots
                    });
                    const itemHeaders = await wrapper.getAllByRole('tab');

                    await fireEvent.click(itemHeaders[0]);
                    expect(itemHeaders[0].parentNode).toHaveClass('-active');
                });

                it('should close the clicked item if open', async () => {
                    const wrapper = render(ICollapsible, {
                        global: {
                            stubs,
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        },
                        props,
                        slots
                    });
                    const itemHeaders = await wrapper.getAllByRole('tab');

                    await fireEvent.click(itemHeaders[0]);
                    expect(itemHeaders[0].parentNode).toHaveClass('-active');
                    await fireEvent.click(itemHeaders[0]);
                    expect(itemHeaders[0].parentNode).not.toHaveClass('-active');
                });

                it('should open multiple items if not accordion', async () => {
                    const wrapper = render(ICollapsible, {
                        global: {
                            stubs,
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        },
                        props,
                        slots
                    });
                    const itemHeaders = await wrapper.getAllByRole('tab');

                    await fireEvent.click(itemHeaders[0]);
                    expect(itemHeaders[0].parentNode).toHaveClass('-active');
                    await fireEvent.click(itemHeaders[1]);
                    expect(itemHeaders[0].parentNode).toHaveClass('-active');
                    expect(itemHeaders[1].parentNode).toHaveClass('-active');
                });

                it('should close the clicked item if open and accordion', async () => {
                    const wrapper = render(ICollapsible, {
                        global: {
                            stubs,
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        },
                        props: {
                            accordion: true,
                            ...props
                        },
                        slots
                    });
                    const itemHeaders = await wrapper.getAllByRole('tab');

                    await fireEvent.click(itemHeaders[0]);
                    expect(itemHeaders[0].parentNode).toHaveClass('-active');
                    await fireEvent.click(itemHeaders[0]);
                    expect(itemHeaders[0].parentNode).not.toHaveClass('-active');
                });

                it('should open one item at a time if accordion', async () => {
                    const wrapper = render(ICollapsible, {
                        global: {
                            stubs,
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        },
                        props: {
                            accordion: true,
                            ...props
                        },
                        slots
                    });
                    const itemHeaders = await wrapper.getAllByRole('tab');

                    await fireEvent.click(itemHeaders[0]);
                    expect(itemHeaders[0].parentNode).toHaveClass('-active');
                    await fireEvent.click(itemHeaders[1]);
                    expect(itemHeaders[0].parentNode).not.toHaveClass('-active');
                    expect(itemHeaders[1].parentNode).toHaveClass('-active');
                });
            });
        });
    });
});
