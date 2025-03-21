import { fireEvent, render } from '@testing-library/vue';
import { Nav, Navbar, NavbarBrand, NavbarCollapsible, NavItem } from '@inkline/inkline/components';

import { createTestingInklineOptionsProvide } from '@inkline/test-utils';

describe('Components', () => {
    describe('Navbar', () => {
        const stubs = {
            'i-navbar-brand': NavbarBrand,
            'i-navbar-collapsible': NavbarCollapsible,
            'i-nav': Nav,
            'i-nav-item': NavItem
        };

        const props = {
            color: 'light',
            size: 'md'
        };

        const slots = {
            default: [
                '<i-navbar-brand />',
                `<i-navbar-collapsible>
                    <i-nav color="light" size="md">
                        <i-nav-item>Item 1</i-nav-item>
                        <i-nav-item>Item 2</i-nav-item>
                        <i-nav-item>Item 3</i-nav-item>
                    </i-nav>
                </i-navbar-collapsible>`
            ]
        };

        it('should be named correctly', () => {
            expect(Navbar.name).toEqual('Navbar');
        });

        it('should render correctly', () => {
            const wrapper = render(Navbar, {
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
                it('should add classes based on props', async () => {
                    const wrapper = render(Navbar, {
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        },
                        props: {
                            modelValue: true,
                            collapse: true,
                            ...props
                        },
                        slots
                    });

                    expect(wrapper.container.firstChild).toHaveClass(
                        `-${props.color}`,
                        `-${props.size}`,
                        '-open',
                        '-collapsible',
                        '-collapse-true'
                    );
                });
            });
        });

        describe('methods', () => {
            describe('onItemClick()', () => {
                it('should close the navbar if open', async () => {
                    const wrapper = render(Navbar, {
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        },
                        props: {
                            collapseOnItemClick: true,
                            modelValue: true,
                            ...props
                        },
                        slots
                    });

                    const items = await wrapper.getAllByRole('menuitem');

                    await fireEvent.click(items[0]);

                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([false]);
                });
            });
        });
    });
});
