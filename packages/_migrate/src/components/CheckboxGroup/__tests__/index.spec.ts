import { fireEvent, render } from '@testing-library/vue';
import { createTestingInklineOptionsProvide } from '@inkline/test-utils';
import { Checkbox, CheckboxGroup, FormKey } from '@inkline/inkline';
import { ref } from 'vue';

describe('Components', () => {
    describe('CheckboxGroup', () => {
        const props = {
            name: 'checkbox-group',
            color: 'light',
            size: 'md',
            options: [
                { id: 1, label: 'Option 1' },
                { id: 2, label: 'Option 2' },
                { id: 3, label: 'Option 3' }
            ]
        };

        const stubs = {
            'i-checkbox': Checkbox
        };

        it('should be named correctly', () => {
            expect(CheckboxGroup.name).toEqual('CheckboxGroup');
        });

        it('should render correctly', () => {
            const wrapper = render(CheckboxGroup, {
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
                    const wrapper = render(CheckboxGroup, {
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
                        expect.stringContaining('checkbox-group')
                    );
                });
            });
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(CheckboxGroup, {
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
                    const value = [1];
                    const onBlur = vi.fn();
                    const onInput = vi.fn();
                    const wrapper = render(CheckboxGroup, {
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
                    const checkboxes = await wrapper.getAllByRole('checkbox');

                    expect(checkboxes[0].querySelector('input')).toBeChecked();
                });

                it('should be equal to modelValue', async () => {
                    const modelValue = [1, 2, 3];
                    const wrapper = render(CheckboxGroup, {
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

                    const checkboxes = wrapper.container.querySelectorAll('input');

                    expect(checkboxes[0]).toBeChecked();
                    expect(checkboxes[1]).toBeChecked();
                    expect(checkboxes[2]).toBeChecked();
                });
            });
        });

        describe('methods', () => {
            describe('onChange', () => {
                it('should update modelValue when checking checkbox', async () => {
                    const wrapper = render(CheckboxGroup, {
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        },
                        props: {
                            modelValue: [],
                            ...props
                        }
                    });
                    const checkboxes = wrapper.container.querySelectorAll('label');

                    await fireEvent.click(checkboxes[0]);

                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([[1]]);
                });

                it('should update modelValue when unchecking checkbox', async () => {
                    const wrapper = render(CheckboxGroup, {
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        },
                        props: {
                            modelValue: [1],
                            ...props
                        }
                    });
                    const checkboxes = wrapper.container.querySelectorAll('label');

                    await fireEvent.click(checkboxes[0]);

                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([[]]);
                });

                it('should call parent form onInput when checking checkbox', async () => {
                    const onBlur = vi.fn();
                    const onInput = vi.fn();
                    const wrapper = render(CheckboxGroup, {
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
                            modelValue: [],
                            ...props
                        }
                    });
                    const checkboxes = wrapper.container.querySelectorAll('label');

                    await fireEvent.click(checkboxes[0]);

                    expect(onInput).toHaveBeenCalled();
                });
            });
        });
    });
});
