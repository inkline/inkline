import { render } from '@testing-library/vue';
import { ILoader } from '@inkline/inkline/components';

describe('Components', () => {
    describe('ILoader', () => {
        const props = {
            color: 'light',
            size: 'md'
        };

        it('should be named correctly', () => {
            expect(ILoader.name).toEqual('ILoader');
        });

        it('should render correctly', () => {
            const wrapper = render(ILoader, { props });
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(ILoader, {
                        props
                    });

                    expect(wrapper.container.firstChild).toHaveClass(
                        `-${props.color}`,
                        `-${props.size}`
                    );
                });
            });
        });
    });
});
