import { render } from '@testing-library/vue';
import { INavbarCollapsible } from '@inkline/inkline/components';

describe('Components', () => {
    describe('INavbarCollapsible', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(INavbarCollapsible.name).toEqual('INavbarCollapsible');
        });

        it('should render correctly', () => {
            const wrapper = render(INavbarCollapsible, {
                props
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('visible', () => {
                it('should be visible if navbar is open', () => {
                    const wrapper = render(INavbarCollapsible, {
                        global: {
                            provide: {
                                navbar: {
                                    open: true
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
                                navbar: {
                                    collapsible: false
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
