import { render } from '@testing-library/vue';
import { BreadcrumbItem } from '../index';

import { createTestingInklineOptionsProvide } from '@inkline/test-utils';

const stubs = {
    Linkable: true
};

describe('Components', () => {
    describe('BreadcrumbItem', () => {
        it('should be named correctly', () => {
            expect(BreadcrumbItem.name).toEqual('BreadcrumbItem');
        });

        it('should render correctly', () => {
            const wrapper = render(BreadcrumbItem, {
                global: {
                    stubs,
                    provide: {
                        ...createTestingInklineOptionsProvide()
                    }
                }
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(BreadcrumbItem, {
                        props: {
                            active: true,
                            disabled: true
                        },
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass('-active', '-disabled');
                });
            });

            describe('tabIndex', () => {
                it('should be -1 if disabled', () => {
                    const wrapper = render(BreadcrumbItem, {
                        props: {
                            disabled: true
                        },
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });
                    const link = wrapper.container.querySelector('linkable-stub');

                    expect(link).toHaveAttribute('tabindex', '-1');
                });

                it('should be -1 if active', () => {
                    const wrapper = render(BreadcrumbItem, {
                        props: {
                            active: true
                        },
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });
                    const link = wrapper.container.querySelector('linkable-stub');

                    expect(link).toHaveAttribute('tabindex', '-1');
                });

                it('should be 0 otherwise', () => {
                    const wrapper = render(BreadcrumbItem, {
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });
                    const link = wrapper.container.querySelector('linkable-stub');

                    expect(link).toHaveAttribute('tabindex', '0');
                });
            });

            describe('aria-current', () => {
                it('should be location if active', () => {
                    const wrapper = render(BreadcrumbItem, {
                        props: {
                            active: true
                        },
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });
                    const link = wrapper.container.querySelector('linkable-stub');

                    expect(link).toHaveAttribute('aria-current', 'location');
                });
            });
        });
    });
});
