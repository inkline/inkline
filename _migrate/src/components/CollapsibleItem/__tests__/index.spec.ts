import { fireEvent, render } from '@testing-library/vue';
import { CollapsibleItem } from '@inkline/inkline/components';

import { createTestingInklineOptionsProvide } from '@inkline/test-utils';
import { CollapsibleKey } from '@inkline/inkline';
import { ref } from 'vue';

describe('Components', () => {
    describe('CollapsibleItem', () => {
        const props = {
            name: 'collapsible-item'
        };

        it('should be named correctly', () => {
            expect(CollapsibleItem.name).toEqual('CollapsibleItem');
        });

        it('should render correctly', () => {
            const wrapper = render(CollapsibleItem, {
                global: {
                    provide: {
                        ...createTestingInklineOptionsProvide(),
                        [CollapsibleKey as symbol]: {
                            activeItems: ref([])
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
                    const wrapper = render(CollapsibleItem, {
                        props: {}
                    });

                    expect(wrapper.container.firstChild).toHaveAttribute(
                        'name',
                        expect.stringContaining('collapsible-item')
                    );
                });
            });
        });

        describe('computed', () => {
            describe('active', () => {
                it('should add -active class when item is active', () => {
                    const wrapper = render(CollapsibleItem, {
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide(),
                                [CollapsibleKey as symbol]: {
                                    activeItems: ref([props.name])
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
                    const wrapper = render(CollapsibleItem, {
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide(),
                                [CollapsibleKey as symbol]: {
                                    activeItems: ref([props.name])
                                }
                            }
                        },
                        props
                    });

                    expect(wrapper.container.firstChild).toHaveClass('-active');
                });
            });
        });

        describe('methods', () => {
            describe('onClick()', () => {
                it('should call collapsible onItemClick', async () => {
                    const onItemClick = vi.fn();
                    const wrapper = render(CollapsibleItem, {
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide(),
                                [CollapsibleKey as symbol]: {
                                    activeItems: ref([]),
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
