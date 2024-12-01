import { render } from '@testing-library/vue';
import { Layout } from '@inkline/inkline/components';

import { createTestingInklineOptionsProvide } from '@inkline/test-utils';

describe('Components', () => {
    describe('Layout', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(Layout.name).toEqual('Layout');
        });

        it('should render correctly', () => {
            const wrapper = render(Layout, {
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
                    const wrapper = render(Layout, {
                        props: {
                            vertical: true,
                            ...props
                        },
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass('-vertical');
                });
            });
        });
    });
});
