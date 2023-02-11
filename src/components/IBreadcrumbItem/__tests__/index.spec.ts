import { render } from '@testing-library/vue';
import { IBreadcrumbItem } from '@inkline/inkline/components';
import { InklineKey } from '@inkline/inkline/plugin';
import { createInkline } from '@inkline/inkline/__tests__/utils';

describe('Components', () => {
    describe('IBreadcrumbItem', () => {
        it('should be named correctly', () => {
            expect(IBreadcrumbItem.name).toEqual('IBreadcrumbItem');
        });

        it('should render correctly', () => {
            const wrapper = render(IBreadcrumbItem, {
                global: {
                    provide: {
                        [InklineKey as symbol]: createInkline()
                    }
                }
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper: any = render(IBreadcrumbItem, {
                        props: {
                            active: true,
                            disabled: true
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass('-active', '-disabled');
                });
            });

            describe('tabIndex', () => {
                it('should be -1 if disabled', () => {
                    const wrapper = render(IBreadcrumbItem, {
                        props: {
                            disabled: true
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });
                    const link = wrapper.container.querySelector('a');

                    expect(link).toHaveAttribute('tabindex', '-1');
                });

                it('should be -1 if active', () => {
                    const wrapper = render(IBreadcrumbItem, {
                        props: {
                            active: true
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });
                    const link = wrapper.container.querySelector('a');

                    expect(link).toHaveAttribute('tabindex', '-1');
                });

                it('should be 0 otherwise', () => {
                    const wrapper = render(IBreadcrumbItem, {
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });
                    const link = wrapper.container.querySelector('a');

                    expect(link).toHaveAttribute('tabindex', '0');
                });
            });

            describe('aria-current', () => {
                it('should be location if active', () => {
                    const wrapper: any = render(IBreadcrumbItem, {
                        props: {
                            active: true
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });
                    const link = wrapper.container.querySelector('a');

                    expect(link).toHaveAttribute('aria-current', 'location');
                });
            });
        });
    });
});
