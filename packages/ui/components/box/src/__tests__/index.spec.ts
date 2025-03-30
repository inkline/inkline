import { render } from '@testing-library/vue';
import { Box } from '../index';

import { createTestingInklineOptionsProvide } from '@inkline/test-utils';

describe('Components', () => {
    describe('Box', () => {
        const props = {
            color: 'light',
            size: 'md'
        };

        it('should be named correctly', () => {
            expect(Box.name).toEqual('Box');
        });

        it('should render correctly', () => {
            const wrapper = render(Box, {
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
                    const wrapper = render(Box, {
                        props,
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass(
                        `-${props.color}`,
                        `-${props.size}`
                    );
                });
            });
        });

        describe('tag', () => {
            it('should render card using article tag', () => {
                const wrapper = render(Box, {
                    props: {
                        ...props,
                        tag: 'article'
                    },
                    global: {
                        provide: {
                            ...createTestingInklineOptionsProvide()
                        }
                    }
                });

                expect(wrapper.container.firstChild!.nodeName).toBe('ARTICLE');
            });
        });
    });
});
