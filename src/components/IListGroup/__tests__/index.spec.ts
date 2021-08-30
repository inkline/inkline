import { render } from '@testing-library/vue';
import { IListGroup, IListGroupItem } from '@inkline/inkline/components';

describe('Components', () => {
    describe('IListGroup', () => {
        const props = {
            size: 'md',
            color: 'light'
        };

        const stubs = {
            'i-list-group-item': IListGroupItem
        };

        const slots = {
            default: [
                '<i-list-group-item>Item 1</i-list-group-item>',
                '<i-list-group-item>Item 2</i-list-group-item>',
                '<i-list-group-item>Item 3</i-list-group-item>'
            ]
        };

        it('should be named correctly', () => {
            expect(IListGroup.name).toEqual('IListGroup');
        });

        it('should render correctly', () => {
            const wrapper = render(IListGroup, {
                global: {
                    stubs
                },
                slots,
                props
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(IListGroup, {
                        props: {
                            border: true,
                            ...props
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
