import { render } from '@testing-library/vue';
import { ICard } from '@inkline/inkline/components';

describe('Components', () => {
    describe('ICard', () => {
        const props = {
            color: 'light',
            size: 'md'
        };

        it('should be named correctly', () => {
            expect(ICard.name).toEqual('ICard');
        });

        it('should render correctly', () => {
            const wrapper = render(ICard, { props });
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(ICard, {
                        props: {
                            dismissible: true,
                            ...props
                        }
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
