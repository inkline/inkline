import { fireEvent, render } from '@testing-library/vue';
import { IButton, IButtonGroup, IRadioButtons } from '@inkline/inkline/components';
import { createInkline } from '@inkline/inkline/__tests__/utils';
import { InklineKey, FormKey } from '@inkline/inkline';
import { ref } from 'vue';
import { IRenderResolver } from '@inkline/inkline/components/utils';

describe('Components', () => {
    describe('IRadioButtons', () => {
        const props = {
            name: 'radio-buttons',
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
            expect(IRadioButtons.name).toEqual('IRadioButtons');
        });

        it('should render correctly', () => {
            const wrapper = render(IRadioButtons, {
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
            const wrapper = render(IRadioButtons, {
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
                    const wrapper = render(IRadioButtons, {
                        global: {
                            stubs,
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        },
                        props: {
                            color: props.color,
                            size: props.size
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveAttribute(
                        'name',
                        expect.stringContaining('radio-buttons')
                    );
                });
            });
        });

        describe('computed', () => {
            describe('checked', () => {
                it('should be equal to schema.value if schema', async () => {
                    const onBlur = vi.fn();
                    const onInput = vi.fn();
                    const value = '1';
                    const wrapper = render(IRadioButtons, {
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
                    const radios = wrapper.container.querySelectorAll('.button');

                    expect(radios[0]).toHaveClass('-active');
                });

                it('should be equal to modelValue otherwise', () => {
                    const modelValue = '2';
                    const wrapper = render(IRadioButtons, {
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
                    const radios = wrapper.container.querySelectorAll('.button');

                    expect(radios[1]).toHaveClass('-active');
                });
            });
        });

        describe('methods', () => {
            describe('onChange', () => {
                it('should update modelValue when checking radio', async () => {
                    const wrapper = render(IRadioButtons, {
                        global: {
                            stubs,
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        },
                        props: {
                            modelValue: '',
                            ...props
                        }
                    });
                    const radios = wrapper.container.querySelectorAll('.button');

                    await fireEvent.click(radios[0]);

                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['1']);
                });

                it('should update modelValue when checking another radio', async () => {
                    const wrapper = render(IRadioButtons, {
                        global: {
                            stubs,
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        },
                        props: {
                            modelValue: '1',
                            ...props
                        }
                    });
                    const radios = wrapper.container.querySelectorAll('.button');

                    await fireEvent.click(radios[1]);

                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['2']);
                });

                it('should call parent form onInput when checking radio', async () => {
                    const onBlur = vi.fn();
                    const onInput = vi.fn();
                    const wrapper = render(IRadioButtons, {
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
                            modelValue: '',
                            ...props
                        }
                    });
                    const radios = wrapper.container.querySelectorAll('.button');

                    await fireEvent.click(radios[0]);

                    expect(onInput).toHaveBeenCalled();
                });
            });
        });
    });
});
