import { render } from '@testing-library/vue';
import { IProgressBar } from '@inkline/inkline/components';

describe('Components', () => {
    describe('IProgressBar', () => {
        const props = {
            color: 'primary',
            value: '50%'
        };

        it('should be named correctly', () => {
            expect(IProgressBar.name).toEqual('IProgressBar');
        });

        it('should render correctly', () => {
            const wrapper = render(IProgressBar, {
                props,
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(IProgressBar, {
                        props,
                    });

                    expect(wrapper.container.firstChild).toHaveClass(
                        `-${props.color}`,
                    );
                });
            });

            describe('style', () => {
                it('should set width based on default min and max props', () => {
                    const wrapper = render(IProgressBar, {
                        props,
                    });

                    expect(wrapper.container.firstChild).toHaveStyle({
                        width: '50%'
                    });
                });

                it('should set width based on custom min and max props', () => {
                    const wrapper = render(IProgressBar, {
                        global: {
                            provide: {
                                progress: {
                                    min: '0',
                                    max: '50'
                                }
                            }
                        },
                        props,
                    });

                    expect(wrapper.container.firstChild).toHaveStyle({
                        width: '100%'
                    });
                });
            });
        });
    });
});
