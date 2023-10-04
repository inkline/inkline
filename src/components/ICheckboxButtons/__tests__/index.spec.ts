import { fireEvent, render } from '@testing-library/vue';
import { createInkline } from '@inkline/inkline/__tests__/utils';
import {
    IButton,
    IButtonGroup,
    ICheckboxButtons,
    InklineKey,
    FormKey,
    IRenderResolver
} from '@inkline/inkline';
import { ref } from 'vue';

describe('Components', () => {
    describe('ICheckboxButtons', () => {
        const props = {
            name: 'checkbox-buttons',
            color: 'light',
            size: 'md',
            options: [
                { id: 1, label: 'Option 1', value: '1' },
                { id: 2, label: 'Option 2', value: '2' },
                { id: 3, label: 'Option 3', value: '3' }
            ]
        };

        const stubs = {
            'i-button': IButton,
            'i-button-group': IButtonGroup,
            'i-render-resolver': IRenderResolver
        };

        it('should be named correctly', () => {
            expect(ICheckboxButtons.name).toEqual('ICheckboxButtons');
        });

        it('should render correctly', () => {
            const wrapper = render(ICheckboxButtons, {
                global: {
                    stubs,
                    provide: {
                        [InklineKey as symbol]: createInkline()
                    }
                },
                props
            });
            expect(wrapper.html()).toMatchSnapshot();
        });

        it('should render group variant correctly', () => {
            const wrapper = render(ICheckboxButtons, {
                global: {
                    stubs,
                    provide: {
                        [InklineKey as symbol]: createInkline()
                    }
                },
                props: {
                    ...props,
                    variant: 'group'
                }
            });
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('name', () => {
                it('should have randomly generated name uid', async () => {
                    const wrapper = render(ICheckboxButtons, {
                        global: {
                            stubs,
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        },
                        props: {
                            color: props.color,
                            size: props.size,
                            options: props.options
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveAttribute(
                        'name',
                        expect.stringContaining('checkbox-buttons')
                    );
                });
            });
        });

        describe('computed', () => {
            describe('checked', () => {
                it('should be equal to schema.value if schema', async () => {
                    const value = ['1'];
                    const onBlur = vi.fn();
                    const onInput = vi.fn();
                    const wrapper = render(ICheckboxButtons, {
                        global: {
                            stubs,
                            provide: {
                                [InklineKey as symbol]: createInkline(),
                                [FormKey as symbol]: {
                                    disabled: ref(false),
                                    readonly: ref(false),
                                    schema: ref({
                                        [props.name]: {
                                            value
                                        }
                                    }),
                                    onBlur,
                                    onInput
                                }
                            }
                        },
                        props: {
                            value,
                            ...props
                        }
                    });
                    const checkboxes = wrapper.container.querySelectorAll('.button');

                    expect(checkboxes[0]).toHaveClass('-active');
                });

                it('should be equal to modelValue', async () => {
                    const modelValue = ['1', '2', '3'];
                    const wrapper = render(ICheckboxButtons, {
                        global: {
                            stubs,
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        },
                        props: {
                            modelValue,
                            ...props
                        }
                    });

                    const checkboxes = wrapper.container.querySelectorAll('.button');

                    expect(checkboxes[0]).toHaveClass('-active');
                    expect(checkboxes[1]).toHaveClass('-active');
                    expect(checkboxes[2]).toHaveClass('-active');
                });
            });
        });

        describe('methods', () => {
            describe('onChange', () => {
                it('should update modelValue when checking checkbox', async () => {
                    const wrapper = render(ICheckboxButtons, {
                        global: {
                            stubs,
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        },
                        props: {
                            modelValue: [],
                            ...props
                        }
                    });
                    const checkboxes = wrapper.container.querySelectorAll('.button');

                    await fireEvent.click(checkboxes[0]);

                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([['1']]);
                });

                it('should update modelValue when unchecking checkbox', async () => {
                    const wrapper = render(ICheckboxButtons, {
                        global: {
                            stubs,
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        },
                        props: {
                            modelValue: ['1'],
                            ...props
                        }
                    });
                    const checkboxes = wrapper.container.querySelectorAll('.button');

                    await fireEvent.click(checkboxes[0]);

                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([[]]);
                });

                it('should call parent form onInput when checking checkbox', async () => {
                    const onBlur = vi.fn();
                    const onInput = vi.fn();
                    const wrapper = render(ICheckboxButtons, {
                        global: {
                            stubs,
                            provide: {
                                [InklineKey as symbol]: createInkline(),
                                [FormKey as symbol]: {
                                    disabled: ref(false),
                                    readonly: ref(false),
                                    onBlur,
                                    onInput
                                }
                            }
                        },
                        props: {
                            modelValue: [],
                            ...props
                        }
                    });
                    const checkboxes = wrapper.container.querySelectorAll('.button');

                    await fireEvent.click(checkboxes[0]);

                    expect(onInput).toHaveBeenCalled();
                });
            });
        });
    });
});
