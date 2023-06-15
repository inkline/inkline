import { fireEvent, render } from '@testing-library/vue';
import {
    INav,
    INavbar,
    INavbarBrand,
    INavbarCollapsible,
    INavItem
} from '@inkline/inkline/components';
import { InklineKey } from '@inkline/inkline/constants';
import { createInkline } from '@inkline/inkline/__tests__/utils';

describe('Components', () => {
    describe('INavbar', () => {
        const stubs = {
            'i-navbar-brand': INavbarBrand,
            'i-navbar-collapsible': INavbarCollapsible,
            'i-nav': INav,
            'i-nav-item': INavItem
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
            expect(INavbar.name).toEqual('INavbar');
        });

        it('should render correctly', () => {
            const wrapper = render(INavbar, {
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
                it('should add classes based on props', async () => {
                    const wrapper = render(INavbar, {
                        global: {
                            stubs,
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        },
                        props: {
                            modelValue: true,
                            collapsible: true,
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
                    const wrapper = render(INavbar, {
                        global: {
                            stubs,
                            provide: {
                                [InklineKey as symbol]: createInkline()
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
