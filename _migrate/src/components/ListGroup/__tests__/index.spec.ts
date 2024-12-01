import { render } from '@testing-library/vue';
import { ListGroup, ListGroupItem } from '@inkline/inkline/components';

import { createTestingInklineOptionsProvide } from '@inkline/test-utils';

describe('Components', () => {
    describe('ListGroup', () => {
        const props = {
            size: 'md',
            color: 'light'
        };

        const stubs = {
            'i-list-group-item': ListGroupItem
        };

        const slots = {
            default: [
                '<i-list-group-item>Item 1</i-list-group-item>',
                '<i-list-group-item>Item 2</i-list-group-item>',
                '<i-list-group-item>Item 3</i-list-group-item>'
            ]
        };

        it('should be named correctly', () => {
            expect(ListGroup.name).toEqual('ListGroup');
        });

        it('should render correctly', () => {
            const wrapper = render(ListGroup, {
                global: {
                    stubs,
                    provide: {
                        ...createTestingInklineOptionsProvide()
                    }
                },
                slots,
                props
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(ListGroup, {
                        props: {
                            border: true,
                            ...props
                        },
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass(
                        `-${props.color}`,
                        `-${props.size}`,
                        '-border'
                    );
                });
            });
        });
    });
});
