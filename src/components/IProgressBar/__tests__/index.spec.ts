import { render } from '@testing-library/vue';
import { IProgressBar } from '@inkline/inkline/components';
import { createInkline } from '@inkline/inkline/__tests__/utils';
import { InklineKey, ProgressKey } from '@inkline/inkline';
import { ref } from 'vue';

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
                global: {
                    provide: {
                        [InklineKey as symbol]: createInkline()
                    }
                }
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(IProgressBar, {
                        props,
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass(`-${props.color}`);
                });
            });

            describe('style', () => {
                it('should set width based on default min and max props', () => {
                    const wrapper = render(IProgressBar, {
                        props,
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveStyle({
                        width: '50%'
                    });
                });

                it('should set width based on custom min and max props', () => {
                    const wrapper = render(IProgressBar, {
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline(),
                                [ProgressKey as symbol]: {
                                    min: ref('0'),
                                    max: ref('50')
                                }
                            }
                        },
                        props
                    });

                    expect(wrapper.container.firstChild).toHaveStyle({
                        width: '100%'
                    });
                });
            });
        });
    });
});
