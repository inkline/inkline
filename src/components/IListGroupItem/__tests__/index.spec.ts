import { render } from '@testing-library/vue';
import { IListGroupItem } from '@inkline/inkline/components';

describe('Components', () => {
    describe('IListGroupItem', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(IListGroupItem.name).toEqual('IListGroupItem');
        });

        it('should render correctly', () => {
            const wrapper = render(IListGroupItem, {
                props
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(IListGroupItem, {
                        props: {
                            active: true,
                            disabled: true,
                            ...props
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
                    const wrapper = render(IListGroupItem, {
                        props: {
                            disabled: true,
                            ...props
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveAttribute('tabindex', '-1');
                });

                it('should be 1 otherwise', () => {
                    const wrapper = render(IListGroupItem, { props });

                    expect(wrapper.container.firstChild).toHaveAttribute('tabindex', '0');
                });
            });
        });
    });
});
