import { render } from '@testing-library/vue';
import { Typography } from '../index';

import { createTestingInklineOptionsProvide } from '@inkline/test-utils';

describe('Components', () => {
    describe('Typography', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(Typography.name).toEqual('Typography');
        });

        it('should render correctly', () => {
            const wrapper = render(Typography, {
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
                    const wrapper = render(Typography, {
                        props: {
                            color: 'primary',
                            size: 'md'
                        },
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass(`-color-primary`, `-size-md`);
                });
            });
        });
    });
});
