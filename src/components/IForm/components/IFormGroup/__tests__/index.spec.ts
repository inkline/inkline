import { render } from '@testing-library/vue';
import { IFormGroup } from '@inkline/inkline/components';

describe('Components', () => {
    describe('IFormGroup', () => {
        const props = {
            name: 'form-group',
            color: 'light',
            size: 'md'
        };

        it('should be named correctly', () => {
            expect(IFormGroup.name).toEqual('IFormGroup');
        });

        it('should render correctly', () => {
            const wrapper = render(IFormGroup, { props });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(IFormGroup, {
                        props: {
                            disabled: true,
                            readonly: true,
                            inline: true,
                            required: true,
                            ...props
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass(
                        `-${props.color}`,
                        `-${props.size}`,
                        '-disabled',
                        '-readonly',
                        '-inline',
                        '-required'
                    );
                });
            });
        });
    });
});
