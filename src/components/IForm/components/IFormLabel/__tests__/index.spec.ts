import { render } from '@testing-library/vue';
import { IFormLabel } from '@inkline/inkline/components';

describe('Components', () => {
    describe('IFormLabel', () => {
        const props = {
            size: 'md'
        };

        it('should be named correctly', () => {
            expect(IFormLabel.name).toEqual('IFormLabel');
        });

        it('should render correctly', () => {
            const wrapper = render(IFormLabel, { props });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(IFormLabel, {
                        props: {
                            placement: 'left',
                            ...props
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass(
                        `-${props.size}`,
                        '-left',
                    );
                });
            });
        });
    });
});
