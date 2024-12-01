import { render } from '@testing-library/vue';
import { Container } from '@inkline/inkline/components';

import { createTestingInklineOptionsProvide } from '@inkline/test-utils';

describe('Components', () => {
    describe('Container', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(Container.name).toEqual('Container');
        });

        it('should render correctly', () => {
            const wrapper = render(Container, {
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
                    const wrapper = render(Container, {
                        props: {
                            fluid: true
                        },
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass('-fluid');
                });
            });
        });
    });
});
