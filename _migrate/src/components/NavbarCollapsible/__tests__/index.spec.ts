import { render } from '@testing-library/vue';
import { NavbarCollapsible } from '@inkline/inkline/components';
import { createTestingInklineOptionsProvide } from '@inkline/test-utils';
import { NavbarKey } from '@inkline/inkline';
import { ref } from 'vue';

describe('Components', () => {
    describe('NavbarCollapsible', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(NavbarCollapsible.name).toEqual('NavbarCollapsible');
        });

        it('should render correctly', () => {
            const wrapper = render(NavbarCollapsible, {
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
            describe('visible', () => {
                it('should be visible if navbar is open', () => {
                    const wrapper = render(NavbarCollapsible, {
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide(),
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
                    const wrapper = render(NavbarCollapsible, {
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide(),
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
