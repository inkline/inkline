import { render } from '@testing-library/vue';
import { Progress, ProgressBar } from '@inkline/inkline/components';

import { createTestingInklineOptionsProvide } from '@inkline/test-utils';

describe('Components', () => {
    describe('Progress', () => {
        const props = {
            color: 'primary',
            size: 'md'
        };

        const stubs = {
            'i-progress-bar': ProgressBar
        };

        const slots = {
            default: '<i-progress-bar value="50" color="primary" />'
        };

        it('should be named correctly', () => {
            expect(Progress.name).toEqual('Progress');
        });

        it('should render correctly', () => {
            const wrapper = render(Progress, {
                global: {
                    stubs,
                    provide: {
                        ...createTestingInklineOptionsProvide()
                    }
                },
                props,
                slots
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(Progress, {
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
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
