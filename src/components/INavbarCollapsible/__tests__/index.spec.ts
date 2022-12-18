import { render } from '@testing-library/vue';
import { INavbarCollapsible } from '@inkline/inkline/components';
import { InklineKey } from '@inkline/inkline/plugin';
import { createInkline } from '@inkline/inkline/__mocks__';
import { NavbarKey } from '@inkline/inkline/components/INavbar/mixin';
import { ref } from 'vue';

describe('Components', () => {
    describe('INavbarCollapsible', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(INavbarCollapsible.name).toEqual('INavbarCollapsible');
        });

        it('should render correctly', () => {
            const wrapper = render(INavbarCollapsible, {
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
            describe('visible', () => {
                it('should be visible if navbar is open', () => {
                    const wrapper = render(INavbarCollapsible, {
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline(),
                                [NavbarKey as symbol]: {
                                    open: ref(true)
                                }
                            }
                        },
                        props
                    });
                    const collapsible = wrapper.container.querySelector('.navbar-collapsible');

                    expect(collapsible).toBeVisible();
                });

                it('should be visible if navbar is open', () => {
                    const wrapper = render(INavbarCollapsible, {
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline(),
                                [NavbarKey as symbol]: {
                                    open: ref(true),
                                    collapsible: ref(false)
                                }
                            }
                        },
                        props
                    });
                    const collapsible = wrapper.container.querySelector('.navbar-collapsible');

                    expect(collapsible).toBeVisible();
                });
            });
        });
    });
});
