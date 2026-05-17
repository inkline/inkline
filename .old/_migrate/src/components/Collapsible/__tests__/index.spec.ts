import { fireEvent, render } from '@testing-library/vue';
import { Collapsible, CollapsibleItem } from '@inkline/inkline/components';

import { createTestingInklineOptionsProvide } from '@inkline/test-utils';

describe('Components', () => {
    describe('Collapsible', () => {
        const props = {
            color: 'light',
            size: 'md'
        };

        const stubs = {
            'i-collapsible-item': CollapsibleItem
        };

        const slots = {
            default: [
                '<i-collapsible-item name="collapsible-item-1" />',
                '<i-collapsible-item name="collapsible-item-2" />'
            ]
        };

        it('should be named correctly', () => {
            expect(Collapsible.name).toEqual('Collapsible');
        });

        it('should render correctly', () => {
            const wrapper = render(Collapsible, {
                global: {
                    stubs,
                    provide: {
                        ...createTestingInklineOptionsProvide()
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
                    const wrapper = render(Collapsible, {
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide()
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
                    const wrapper = render(Collapsible, {
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide()
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
                    const wrapper = render(Collapsible, {
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide()
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
                    const wrapper = render(Collapsible, {
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide()
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
                    const wrapper = render(Collapsible, {
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide()
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
                    const wrapper = render(Collapsible, {
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide()
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
