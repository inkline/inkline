import { render } from '@testing-library/vue';
import { FormLabel } from '@inkline/inkline/components';

import { createTestingInklineOptionsProvide } from '@inkline/test-utils';

describe('Components', () => {
    describe('FormLabel', () => {
        const props = {
            size: 'md'
        };

        it('should be named correctly', () => {
            expect(FormLabel.name).toEqual('FormLabel');
        });

        it('should render correctly', () => {
            const wrapper = render(FormLabel, {
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
                    const wrapper = render(FormLabel, {
                        props: {
                            placement: 'left',
                            ...props
                        },
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass(`-${props.size}`, '-left');
                });
            });

            describe('forAttr', () => {
                it('should be equal to props.for', () => {
                    const value = 'example';
                    const wrapper = render(FormLabel, {
                        props: {
                            for: value
                        },
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveAttribute('for', value);
                });
            });
        });
    });
});
