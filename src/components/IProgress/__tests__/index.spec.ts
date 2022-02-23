import { render } from '@testing-library/vue';
import { IProgress, IProgressBar } from '@inkline/inkline/components';

describe('Components', () => {
    describe('IProgress', () => {
        const props = {
            color: 'primary',
            size: 'md'
        };

        const stubs = {
            'i-progress-bar': IProgressBar
        };

        const slots = {
            default: '<i-progress-bar value="50" color="primary" />'
        };

        it('should be named correctly', () => {
            expect(IProgress.name).toEqual('IProgress');
        });

        it('should render correctly', () => {
            const wrapper = render(IProgress, {
                global: {
                    stubs
                },
                props,
                slots
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(IProgress, {
                        global: {
                            stubs
                        },
                        props,
                        slots
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
