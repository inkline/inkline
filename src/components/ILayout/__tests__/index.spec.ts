import { render } from '@testing-library/vue';
import { ILayout } from '@inkline/inkline/components';

describe('Components', () => {
    describe('ILayout', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(ILayout.name).toEqual('ILayout');
        });

        it('should render correctly', () => {
            const wrapper = render(ILayout, {
                props
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(ILayout, {
                        props: {
                            vertical: true,
                            ...props
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass(
                        '-vertical'
                    );
                });
            });
        });
    });
});
