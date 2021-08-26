import { render } from '@testing-library/vue';
import { IBadge } from '@inkline/inkline/components';

describe('Components', () => {
    describe('IBadge', () => {
        const props = {
            color: 'light',
            size: 'md'
        };

        it('should be named correctly', () => {
            expect(IBadge.name).toEqual('IBadge');
        });

        it('should render correctly', () => {
            const wrapper = render(IBadge, { props });
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(IBadge, { props });

                    expect(wrapper.container.firstChild).toHaveClass(
                        `-${props.color}`,
                        `-${props.size}`
                    );
                });
            });
        });
    });
});
