import { fireEvent, render } from '@testing-library/vue';
import { ISelectOption } from '@inkline/inkline/components';
import { createMockInstance } from '@inkline/inkline/__mocks__/createMockInstance';

describe('Components', () => {
    describe('ISelectOption', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(ISelectOption.name).toEqual('ISelectOption');
        });

        it('should render correctly', () => {
            const wrapper = render(ISelectOption, { props });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(ISelectOption, {
                        props: {
                            active: true,
                            disabled: true
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass(
                        '-active',
                        '-disabled'
                    );
                });
            });

            describe('isActive', () => {
                it('should add active class if same value as select', () => {
                    const value = { label: 'a' };
                    const wrapper = createMockInstance(ISelectOption, {
                        props: {
                            value
                        },
                        mocks: {
                            select: {
                                modelValue: value
                            }
                        }
                    });

                    expect(wrapper.isActive).toEqual(true);
                });
            });

            describe('tabIndex', () => {
                it('should be -1 if disabled', () => {
                    const wrapper = render(ISelectOption, {
                        props: {
                            disabled: true,
                            ...props
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveAttribute('tabindex', '-1');
                });

                it('should be 1 otherwise', () => {
                    const wrapper = render(ISelectOption, { props });

                    expect(wrapper.container.firstChild).toHaveAttribute('tabindex', '0');
                });
            });
        });

        describe('methods', () => {
            describe('onClick()', () => {
                it('should call select onInput', async () => {
                    const onInput = vi.fn();
                    const wrapper = render(ISelectOption, {
                        global: {
                            provide: {
                                select: {
                                    onInput
                                }
                            }
                        },
                        props
                    });
                    const item = await wrapper.getByRole('option');
                    await fireEvent.click(item);
                    expect(onInput).toHaveBeenCalled();
                });

                it('should not call select onInput if disabled', async () => {
                    const onInput = vi.fn();
                    const wrapper = render(ISelectOption, {
                        global: {
                            provide: {
                                select: {
                                    onInput
                                }
                            }
                        },
                        props: {
                            ...props,
                            disabled: true
                        }
                    });
                    const item = await wrapper.getByRole('option');
                    await fireEvent.click(item);
                    expect(onInput).not.toHaveBeenCalled();
                });
            });
        });
    });
});
