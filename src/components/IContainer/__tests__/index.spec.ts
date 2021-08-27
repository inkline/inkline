import { render } from '@testing-library/vue';
import { IContainer } from '@inkline/inkline/components';

describe('Components', () => {
    describe('IContainer', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(IContainer.name).toEqual('IContainer');
        });

        it('should render correctly', () => {
            const wrapper = render(IContainer, { props });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(IContainer, {
                        props: {
                            fluid: true
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass(
                        '-fluid'
                    );
                });
            });
        });
    });
});
