import { render } from '@testing-library/vue';
import { ProgressBar } from '@inkline/inkline/components';
import { createTestingInklineOptionsProvide } from '@inkline/test-utils';
import { ProgressKey } from '@inkline/inkline';
import { ref } from 'vue';

describe('Components', () => {
    describe('ProgressBar', () => {
        const props = {
            color: 'primary',
            value: '50%'
        };

        it('should be named correctly', () => {
            expect(ProgressBar.name).toEqual('ProgressBar');
        });

        it('should render correctly', () => {
            const wrapper = render(ProgressBar, {
                props,
                global: {
                    provide: {
                        ...createTestingInklineOptionsProvide()
                    }
                }
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(ProgressBar, {
                        props,
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass(`-${props.color}`);
                });
            });

            describe('style', () => {
                it('should set width based on default min and max props', () => {
                    const wrapper = render(ProgressBar, {
                        props,
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveStyle({
                        width: '50%'
                    });
                });

                it('should set width based on custom min and max props', () => {
                    const wrapper = render(ProgressBar, {
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide(),
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
