import { fireEvent, render } from '@testing-library/vue';
import { INav, INavItem } from '@inkline/inkline/components';

describe('Components', () => {
    describe('INav', () => {
        const props = {
            size: 'md',
            color: 'light'
        };

        const stubs = {
            'i-nav-item': INavItem
        };

        const slots = {
            default: [
                '<i-nav-item>Item 1</i-nav-item>',
                '<i-nav-item>Item 2</i-nav-item>',
                '<i-nav-item>Item 3</i-nav-item>'
            ]
        };

        it('should be named correctly', () => {
            expect(INav.name).toEqual('INav');
        });

        it('should render correctly', () => {
            const wrapper = render(INav, {
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
                    const wrapper = render(INav, {
                        props: {
                            vertical: true,
                            ...props
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass(
                        `-${props.color}`,
                        `-${props.size}`,
                        '-vertical'
                    );
                });
            });
        });

        describe('methods', () => {
            describe('onItemClick()', () => {
                ['navbar', 'sidebar'].forEach((parent) => {
                    it(`should call parent ${parent} onItemClick`, async () => {
                        const onItemClick = vi.fn();
                        const wrapper = render(INav, {
                            global: {
                                stubs,
                                provide: {
                                    [parent]: {
                                        onItemClick
                                    }
                                }
                            },
                            props,
                            slots
                        });
                        const items = wrapper.container.querySelectorAll('.nav-item');

                        await fireEvent.click(items[0]);

                        expect(onItemClick).toHaveBeenCalled();
                    });
                });
            });
        });
    });
});
