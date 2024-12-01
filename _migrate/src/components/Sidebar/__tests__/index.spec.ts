import { fireEvent, render } from '@testing-library/vue';
import { Nav, NavItem, Sidebar } from '@inkline/inkline/components';

import { createTestingInklineOptionsProvide } from '@inkline/test-utils';

describe('Components', () => {
    describe('Sidebar', () => {
        const stubs = {
            'i-nav': Nav,
            'i-nav-item': NavItem
        };

        const props = {
            color: 'light',
            size: 'md'
        };

        const slots = {
            default: [
                `<i-nav color="light" size="md">
                    <i-nav-item>Item 1</i-nav-item>
                    <i-nav-item>Item 2</i-nav-item>
                    <i-nav-item>Item 3</i-nav-item>
                </i-nav>`
            ]
        };

        it('should be named correctly', () => {
            expect(Sidebar.name).toEqual('Sidebar');
        });

        it('should render correctly', () => {
            const wrapper = render(Sidebar, {
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
                    const wrapper = render(Sidebar, {
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        },
                        props: {
                            ...props,
                            modelValue: true,
                            collapse: true
                        },
                        slots
                    });
                    const sidebarWrapper = wrapper.getByRole('complementary');
                    const sidebar = sidebarWrapper.querySelector('.sidebar');

                    expect(sidebarWrapper).toHaveClass(
                        '-open',
                        '-collapsible',
                        '-collapse-true',
                        '-collapse-absolute',
                        '-placement-left'
                    );
                    expect(sidebar).toHaveClass('-light', '-md');
                });
            });
        });

        describe('methods', () => {
            describe('onItemClick()', () => {
                it('should close sidebar if collapseOnItemClick', async () => {
                    const wrapper = render(Sidebar, {
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        },
                        props: {
                            ...props,
                            collapseOnItemClick: true,
                            modelValue: true
                        },
                        slots
                    });
                    const items = await wrapper.getAllByRole('menuitem');

                    await fireEvent.click(items[0]);

                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([false]);
                });

                it('should not close sidebar if not collapseOnItemClick', async () => {
                    const wrapper = render(Sidebar, {
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        },
                        props: {
                            ...props,
                            collapseOnItemClick: false,
                            modelValue: true
                        },
                        slots
                    });
                    const items = await wrapper.getAllByRole('menuitem');

                    await fireEvent.click(items[0]);

                    expect(wrapper.emitted()['update:modelValue']).toEqual(undefined);
                });
            });

            describe('onOverlayClick()', () => {
                it('should close sidebar if collapseOnClickOutside', async () => {
                    const wrapper = render(Sidebar, {
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        },
                        props: {
                            ...props,
                            collapseOnClickOutside: true,
                            modelValue: true
                        },
                        slots
                    });
                    const overlay = wrapper.container.querySelector('.sidebar-overlay');

                    await fireEvent.click(overlay as Element);

                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([false]);
                });

                it('should not close sidebar if not collapseOnClickOutside', async () => {
                    const wrapper = render(Sidebar, {
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        },
                        props: {
                            ...props,
                            collapseOnClickOutside: false,
                            modelValue: true
                        },
                        slots
                    });
                    const overlay = wrapper.container.querySelector('.sidebar-overlay');

                    await fireEvent.click(overlay as Element);

                    expect(wrapper.emitted()['update:modelValue']).toEqual(undefined);
                });
            });
        });
    });
});
