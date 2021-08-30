import { render } from '@testing-library/vue';
import { IHeader } from '@inkline/inkline/components';

describe('Components', () => {
    describe('IHeader', () => {
        const props = {
            color: 'light',
            size: 'md'
        };

        it('should be named correctly', () => {
            expect(IHeader.name).toEqual('IHeader');
        });

        it('should render correctly', () => {
            const wrapper = render(IHeader, { props });
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(IHeader, {
                        props: {
                            cover: true,
                            fullscreen: true,
                            ...props
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass(
                        `-${props.color}`,
                        `-${props.size}`,
                        '-cover',
                        '-fullscreen'
                    );
                });
            });
        });
    });
});
