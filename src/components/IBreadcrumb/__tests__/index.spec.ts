import { render } from '@testing-library/vue';
import { IBreadcrumb } from '@inkline/inkline/components';

describe('Components', () => {
    describe('IBreadcrumb', () => {
        const props = {
            color: 'light',
            size: 'md'
        };

        it('should be named correctly', () => {
            expect(IBreadcrumb.name).toEqual('IBreadcrumb');
        });

        it('should render correctly', () => {
            const wrapper = render(IBreadcrumb, { props });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(IBreadcrumb, { props });

                    expect(wrapper.container.firstChild).toHaveClass(
                        `-${props.color}`,
                        `-${props.size}`
                    );
                });
            });
        });
    });
});
