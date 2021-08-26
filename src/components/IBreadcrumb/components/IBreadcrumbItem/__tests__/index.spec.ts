import { render } from '@testing-library/vue';
import { IBreadcrumbItem } from '@inkline/inkline/components';

describe('Components', () => {
    describe('IBreadcrumbItem', () => {
        it('should be named correctly', () => {
            expect(IBreadcrumbItem.name).toEqual('IBreadcrumbItem');
        });

        it('should render correctly', () => {
            const wrapper = render(IBreadcrumbItem);

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper: any = render(IBreadcrumbItem, {
                        props: {
                            active: true,
                            disabled: true
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass(
                        '-active',
                        '-disabled'
                    );
                });
            });

            describe('tabIndex', () => {
                it('should be -1 if disabled', () => {
                    const wrapper = render(IBreadcrumbItem, {
                        props: {
                            disabled: true
                        }
                    });
                    const link = wrapper.container.querySelector('a');

                    expect(link).toHaveAttribute('tabindex', '-1');
                });

                it('should be -1 if active', () => {
                    const wrapper = render(IBreadcrumbItem, {
                        props: {
                            active: true
                        }
                    });
                    const link = wrapper.container.querySelector('a');

                    expect(link).toHaveAttribute('tabindex', '-1');
                });

                it('should be 1 otherwise', () => {
                    const wrapper = render(IBreadcrumbItem);
                    const link = wrapper.container.querySelector('a');

                    expect(link).toHaveAttribute('tabindex', '1');
                });
            });

            describe('aria-current', () => {
                it('should be location if active', () => {
                    const wrapper: any = render(IBreadcrumbItem, {
                        props: {
                            active: true
                        }
                    });
                    const link = wrapper.container.querySelector('a');

                    expect(link).toHaveAttribute('aria-current', 'location');
                });
            });
        });
    });
});
