import { fireEvent, render } from '@testing-library/vue';
import { createTestingInklineOptionsProvide } from '@inkline/test-utils';
import { Nav, NavItem, NavbarKey, SidebarKey } from '@inkline/inkline';

describe('Components', () => {
    describe('Nav', () => {
        const props = {
            size: 'md',
            color: 'light'
        };

        const stubs = {
            'i-nav-item': NavItem
        };

        const slots = {
            default: [
                '<i-nav-item>Item 1</i-nav-item>',
                '<i-nav-item>Item 2</i-nav-item>',
                '<i-nav-item>Item 3</i-nav-item>'
            ]
        };

        it('should be named correctly', () => {
            expect(Nav.name).toEqual('Nav');
        });

        it('should render correctly', () => {
            const wrapper = render(Nav, {
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
                    const wrapper = render(Nav, {
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
                [NavbarKey, SidebarKey].forEach((parent) => {
                    it(`should call parent ${parent.toString()} onItemClick`, async () => {
                        const onItemClick = vi.fn();
                        const wrapper = render(Nav, {
                            global: {
                                stubs,
                                provide: {
                                    ...createTestingInklineOptionsProvide(),
                                    [parent as symbol]: {
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
