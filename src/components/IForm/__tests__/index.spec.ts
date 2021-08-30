import { render } from '@testing-library/vue';
import { IForm } from '@inkline/inkline/components';

describe('Components', () => {
    describe('IForm', () => {
        const props = {
            name: 'form',
            color: 'light',
            size: 'md'
        };

        it('should be named correctly', () => {
            expect(IForm.name).toEqual('IForm');
        });

        it('should render correctly', () => {
            const wrapper = render(IForm, { props });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(IForm, {
                        props: {
                            disabled: true,
                            readonly: true,
                            inline: true,
                            ...props
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass(
                        `-${props.color}`,
                        `-${props.size}`,
                        '-disabled',
                        '-readonly',
                        '-inline'
                    );
                });
            });
        });
    });
});
