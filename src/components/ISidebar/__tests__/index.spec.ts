import { fireEvent, render } from '@testing-library/vue';
import { INav, INavItem, ISidebar } from '@inkline/inkline/components';
import { createMockInstance } from '@inkline/inkline/__mocks__/createMockInstance';

describe('Components', () => {
    describe('ISidebar', () => {
        const stubs = {
            'i-nav': INav,
            'i-nav-item': INavItem
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
            expect(ISidebar.name).toEqual('ISidebar');
        });

        it('should render correctly', () => {
            const wrapper = render(ISidebar, {
                global: {
                    stubs
                },
                props,
                slots
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', async () => {
                    const wrapper = render(ISidebar, {
                        global: {
                            stubs
                        },
                        props: {
                            ...props,
                            modelValue: true,
                            collapse: true
                        },
                        slots
                    });
                    const sidebar = await wrapper.getByRole('complementary');

                    expect(sidebar).toHaveClass(
                        '-open',
                        '-collapsible',
                        '-collapse-true',
                        '-light',
                        '-md',
                        '-collapse-absolute',
                        '-placement-left'
                    );
                });
            });

            describe('sidebarWrapperTransition', () => {
                it('should return transition if relative', () => {
                    const wrapper = createMockInstance(ISidebar, {
                        props: {
                            collapsePosition: 'relative'
                        }
                    });

                    expect(wrapper.sidebarWrapperTransition).toEqual('sidebar-wrapper-transition');
                });

                it('should return none-transition if not relative', () => {
                    const wrapper = createMockInstance(ISidebar, {
                        props: {
                            collapsePosition: 'absolute'
                        }
                    });

                    expect(wrapper.sidebarWrapperTransition).toEqual('sidebar-wrapper-none-transition');
                });
            });

            describe('sidebarTransition', () => {
                it('should return none-transition if relative', () => {
                    const wrapper = createMockInstance(ISidebar, {
                        props: {
                            collapsePosition: 'relative'
                        }
                    });

                    expect(wrapper.sidebarTransition).toEqual('sidebar-none-transition');
                });

                it('should return transition if not relative', () => {
                    const wrapper = createMockInstance(ISidebar, {
                        props: {
                            collapsePosition: 'absolute'
                        }
                    });

                    expect(wrapper.sidebarTransition).toEqual('sidebar-transition');
                });
            });
        });

        describe('methods', () => {
            describe('onItemClick()', () => {
                it('should close sidebar if collapseOnItemClick', async () => {
                    const wrapper = render(ISidebar, {
                        global: {
                            stubs
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
                    const wrapper = render(ISidebar, {
                        global: {
                            stubs
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
                    const wrapper = render(ISidebar, {
                        global: {
                            stubs
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
                    const wrapper = render(ISidebar, {
                        global: {
                            stubs
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
