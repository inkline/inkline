import { fireEvent, render } from '@testing-library/vue';
import { ICheckbox } from '@inkline/inkline/components';
import { InklineKey } from '@inkline/inkline/plugin';
import { createInkline } from '@inkline/inkline/__tests__/utils';
import { FormGroupKey } from '@inkline/inkline/components/IFormGroup/mixin';
import { FormKey } from '@inkline/inkline/components/IForm/mixin';
import { ref } from 'vue';
import { CheckboxGroupKey } from '@inkline/inkline/components/ICheckboxGroup/mixin';

describe('Components', () => {
    describe('ICheckbox', () => {
        const props = {
            name: 'checkbox',
            color: 'light',
            size: 'md'
        };

        it('should be named correctly', () => {
            expect(ICheckbox.name).toEqual('ICheckbox');
        });

        it('should render correctly', () => {
            const wrapper = render(ICheckbox, {
                props,
                global: {
                    provide: {
                        [InklineKey as symbol]: createInkline()
                    }
                }
            });
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('name', () => {
                it('should have randomly generated name uid', () => {
                    const wrapper = render(ICheckbox, {
                        props: {
                            color: props.color,
                            size: props.size
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });
                    const inputElement = wrapper.container.querySelector('input');

                    expect(inputElement).toHaveAttribute(
                        'name',
                        expect.stringContaining('checkbox')
                    );
                });
            });
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(ICheckbox, {
                        props: {
                            disabled: true,
                            readonly: true,
                            native: true,
                            ...props
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass(
                        `-${props.color}`,
                        `-${props.size}`,
                        '-disabled',
                        '-readonly',
                        '-native'
                    );
                });
            });

            describe('checked', () => {
                it('should be checked if checkboxGroup.value contains value', () => {
                    const value = 'value';
                    const wrapper = render(ICheckbox, {
                        global: {
                            provide: {
                                [CheckboxGroupKey as symbol]: {
                                    disabled: ref(false),
                                    readonly: ref(false),
                                    value: ref([value])
                                },
                                [InklineKey as symbol]: createInkline()
                            }
                        },
                        props: {
                            value,
                            ...props
                        }
                    });
                    const inputElement = wrapper.container.querySelector('input');

                    expect(inputElement).toBeChecked();
                });

                it('should be equal to schema.value if schema', () => {
                    const value = true;
                    const onBlur = vi.fn();
                    const onInput = vi.fn();
                    const wrapper = render(ICheckbox, {
                        global: {
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
                    const inputElement = wrapper.container.querySelector('input');

                    expect(inputElement).toBeChecked();
                });

                it('should be equal to modelValue otherwise', () => {
                    const value = true;
                    const wrapper = render(ICheckbox, {
                        props: {
                            modelValue: value,
                            ...props
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });
                    const inputElement = wrapper.container.querySelector('input');

                    expect(inputElement).toBeChecked();
                });
            });

            describe('tabIndex', () => {
                it('should be -1 if disabled', () => {
                    const wrapper = render(ICheckbox, {
                        props: {
                            disabled: true,
                            ...props
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });
                    const labelElement = wrapper.container.querySelector('label');

                    expect(labelElement).toHaveAttribute('tabindex', '-1');
                });

                it('should be 1 otherwise', () => {
                    const wrapper = render(ICheckbox, {
                        props,
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });
                    const labelElement = wrapper.container.querySelector('label');

                    expect(labelElement).toHaveAttribute('tabindex', '0');
                });
            });
        });

        describe('methods', () => {
            describe('clickInputRef()', () => {
                it('should not be able to click label if disabled', () => {
                    const wrapper = render(ICheckbox, {
                        props: {
                            disabled: true,
                            ...props
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });
                    const labelElement = wrapper.container.querySelector('label');
                    const inputElement = wrapper.container.querySelector('input');

                    fireEvent.click(labelElement as Element);
                    expect(inputElement).not.toBeChecked();
                });

                it('should not be able to click label if readonly', () => {
                    const wrapper = render(ICheckbox, {
                        props: {
                            readonly: true,
                            ...props
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });
                    const labelElement = wrapper.container.querySelector('label');
                    const inputElement = wrapper.container.querySelector('input');

                    fireEvent.click(labelElement as Element);
                    expect(inputElement).not.toBeChecked();
                });

                it('should change input value on click when clicking label', () => {
                    const wrapper = render(ICheckbox, {
                        props,
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });
                    const labelElement = wrapper.container.querySelector('label');
                    const inputElement = wrapper.container.querySelector('input');

                    fireEvent.click(labelElement as Element);
                    expect(inputElement).toBeChecked();
                });
            });

            describe('onChange()', () => {
                it('should call parent onInput', () => {
                    const onBlur = vi.fn();
                    const onInput = vi.fn();
                    const wrapper = render(ICheckbox, {
                        global: {
                            provide: {
                                [FormKey as symbol]: {
                                    disabled: ref(false),
                                    readonly: ref(false),
                                    onBlur,
                                    onInput
                                },
                                [InklineKey as symbol]: createInkline()
                            }
                        },
                        props
                    });
                    const inputElement = wrapper.container.querySelector('input');

                    fireEvent.change(inputElement as Element);
                    expect(onInput).toHaveBeenCalled();
                });

                it('should call parent onChange if formGroup', () => {
                    const onInput = vi.fn();
                    const wrapper = render(ICheckbox, {
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline(),
                                [FormGroupKey as symbol]: {
                                    disabled: ref(false),
                                    readonly: ref(false),
                                    onInput
                                }
                            }
                        },
                        props
                    });
                    const inputElement = wrapper.container.querySelector('input') as Element;

                    fireEvent.change(inputElement);
                    expect(onInput).toHaveBeenCalled();
                });
            });

            describe('onBlur()', () => {
                it('should call parent onBlur if defined', () => {
                    const onBlur = vi.fn();
                    const onInput = vi.fn();
                    const wrapper = render(ICheckbox, {
                        global: {
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
                        props
                    });
                    const labelElement = wrapper.container.querySelector('label');

                    fireEvent.blur(labelElement as Element);
                    expect(onBlur).toHaveBeenCalled();
                });
            });
        });
    });
});
