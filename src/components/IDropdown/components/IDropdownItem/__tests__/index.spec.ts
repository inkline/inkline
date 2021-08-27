import { fireEvent, render } from '@testing-library/vue';
import { IDropdownItem } from '@inkline/inkline/components';

describe('Components', () => {
    describe('IDropdownItem', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(IDropdownItem.name).toEqual('IDropdownItem');
        });

        it('should render correctly', () => {
            const wrapper = render(IDropdownItem, { props });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(IDropdownItem, {
                        props: {
                            active: true,
                            disabled: true,
                            plaintext: true
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass(
                        '-active',
                        '-disabled',
                        '-plaintext'
                    );
                });
            });

            describe('tabIndex', () => {
                it('should be -1 if disabled', () => {
                    const wrapper = render(IDropdownItem, {
                        props: {
                            disabled: true,
                            ...props
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveAttribute('tabindex', '-1');
                });

                it('should be 1 otherwise', () => {
                    const wrapper = render(IDropdownItem, { props });

                    expect(wrapper.container.firstChild).toHaveAttribute('tabindex', '0');
                });
            });
        });

        describe('methods', () => {
            describe('onClick()', () => {
                it('should call dropdown onItemClick', async () => {
                    const onItemClick = jest.fn();
                    const wrapper = render(IDropdownItem, {
                        global: {
                            provide: {
                                dropdown: {
                                    onItemClick
                                }
                            }
                        },
                        props
                    });
                    const item = await wrapper.getByRole('menuitem');
                    await fireEvent.click(item);
                    expect(onItemClick).toHaveBeenCalled();
                });

                it('should call dropdown onItemClick if not inside dropdown', async () => {
                    const onItemClick = jest.fn();
                    const wrapper = render(IDropdownItem, {
                        global: {
                            provide: {
                                dropdown: {}
                            }
                        },
                        props
                    });
                    const item = await wrapper.getByRole('menuitem');
                    await fireEvent.click(item);
                    expect(onItemClick).not.toHaveBeenCalled();
                });
            });
        });
    });
});
