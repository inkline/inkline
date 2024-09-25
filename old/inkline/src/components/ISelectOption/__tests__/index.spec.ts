import { fireEvent, render } from '@testing-library/vue';
import { ISelectOption } from '@inkline/inkline/components';
import { createInkline } from '@inkline/inkline/__tests__/utils';
import { InklineKey, SelectKey } from '@inkline/inkline';
import { ref } from 'vue';

describe('Components', () => {
    describe('ISelectOption', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(ISelectOption.name).toEqual('ISelectOption');
        });

        it('should render correctly', () => {
            const wrapper = render(ISelectOption, {
                props,
                global: {
                    provide: {
                        [SelectKey as symbol]: {
                            idField: ref('id'),
                            value: ref('0'),
                            disabled: ref(false),
                            onInput: vi.fn()
                        },
                        [InklineKey as symbol]: createInkline()
                    }
                }
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(ISelectOption, {
                        props: {
                            option: {
                                id: 'option',
                                active: true,
                                disabled: true
                            }
                        },
                        global: {
                            provide: {
                                [SelectKey as symbol]: {
                                    idField: ref('id'),
                                    value: ref('0'),
                                    disabled: ref(false),
                                    onInput: vi.fn()
                                },
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass('-active', '-disabled');
                });
            });

            describe('tabIndex', () => {
                it('should be -1 if disabled', () => {
                    const wrapper = render(ISelectOption, {
                        props: {
                            ...props,
                            option: { id: 'option', disabled: true }
                        },
                        global: {
                            provide: {
                                [SelectKey as symbol]: {
                                    idField: ref('id'),
                                    value: ref('0'),
                                    disabled: ref(false),
                                    onInput: vi.fn()
                                },
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveAttribute('tabindex', '-1');
                });

                it('should be 1 otherwise', () => {
                    const wrapper = render(ISelectOption, {
                        props,
                        global: {
                            provide: {
                                [SelectKey as symbol]: {
                                    idField: ref('id'),
                                    value: ref('0'),
                                    disabled: ref(false),
                                    onInput: vi.fn()
                                },
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });

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
                                [SelectKey as symbol]: {
                                    idField: ref('id'),
                                    value: ref('0'),
                                    disabled: ref(false),
                                    onInput
                                },
                                [InklineKey as symbol]: createInkline()
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
                                [InklineKey as symbol]: createInkline(),
                                [SelectKey as symbol]: {
                                    idField: ref('id'),
                                    value: ref('0'),
                                    disabled: ref(false),
                                    onInput
                                }
                            }
                        },
                        props: {
                            ...props,
                            option: { id: 'option', disabled: true }
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
