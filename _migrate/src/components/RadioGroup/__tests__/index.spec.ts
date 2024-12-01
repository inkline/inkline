import { fireEvent, render } from '@testing-library/vue';
import { createTestingInklineOptionsProvide } from '@inkline/test-utils';
import { Radio, RadioGroup, FormKey } from '@inkline/inkline';
import { ref } from 'vue';

describe('Components', () => {
    describe('RadioGroup', () => {
        const props = {
            name: 'radio-group',
            color: 'light',
            size: 'md',
            options: [
                { id: 1, label: 'Option 1' },
                { id: 2, label: 'Option 2' },
                { id: 3, label: 'Option 3' }
            ]
        };

        const stubs = {
            'i-radio': Radio
        };

        it('should be named correctly', () => {
            expect(RadioGroup.name).toEqual('RadioGroup');
        });

        it('should render correctly', () => {
            const wrapper = render(RadioGroup, {
                global: {
                    stubs,
                    provide: {
                        ...createTestingInklineOptionsProvide()
                    }
                },
                props
            });
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('name', () => {
                it('should have randomly generated name uid', async () => {
                    const wrapper = render(RadioGroup, {
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        },
                        props: {
                            color: props.color,
                            size: props.size
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveAttribute(
                        'name',
                        expect.stringContaining('radio-group')
                    );
                });
            });
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(RadioGroup, {
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        },
                        props: {
                            disabled: true,
                            readonly: true,
                            inline: true,
                            ...props
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass(
                        `-${props.color}`,
                        `-${props.size}`,
                        '-disabled',
                        '-readonly',
                        '-inline'
                    );
                });
            });

            describe('checked', () => {
                it('should be equal to schema.value if schema', async () => {
                    const onBlur = vi.fn();
                    const onInput = vi.fn();
                    const value = 1;
                    const wrapper = render(RadioGroup, {
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide(),
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
                            modelValue: value,
                            ...props
                        }
                    });
                    const radios = await wrapper.getAllByRole('radio');

                    expect(radios[0].querySelector('input')).toBeChecked();
                });

                it('should be equal to modelValue otherwise', () => {
                    const modelValue = 2;
                    const wrapper = render(RadioGroup, {
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        },
                        props: {
                            modelValue,
                            ...props
                        }
                    });
                    const radios = wrapper.container.querySelectorAll('input');

                    expect(radios[1]).toBeChecked();
                });
            });
        });

        describe('methods', () => {
            describe('onChange', () => {
                it('should update modelValue when checking radio', async () => {
                    const wrapper = render(RadioGroup, {
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        },
                        props: {
                            modelValue: undefined,
                            ...props
                        }
                    });
                    const radios = wrapper.container.querySelectorAll('label');

                    await fireEvent.click(radios[0]);

                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([1]);
                });

                it('should update modelValue when checking another radio', async () => {
                    const wrapper = render(RadioGroup, {
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        },
                        props: {
                            modelValue: 1,
                            ...props
                        }
                    });
                    const radios = wrapper.container.querySelectorAll('label');

                    await fireEvent.click(radios[1]);

                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([2]);
                });

                it('should call parent form onInput when checking radio', async () => {
                    const onBlur = vi.fn();
                    const onInput = vi.fn();
                    const wrapper = render(RadioGroup, {
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide(),
                                [FormKey as symbol]: {
                                    disabled: ref(false),
                                    readonly: ref(false),
                                    onBlur,
                                    onInput
                                }
                            }
                        },
                        props: {
                            modelValue: undefined,
                            ...props
                        }
                    });
                    const radios = wrapper.container.querySelectorAll('label');

                    await fireEvent.click(radios[0]);

                    expect(onInput).toHaveBeenCalled();
                });
            });
        });
    });
});
