import { fireEvent, render } from '@testing-library/vue';
import { createTestingInklineOptionsProvide } from '@inkline/test-utils';
import { Checkbox } from '../index';
import { CheckboxGroupKey, FormKey, FormGroupKey } from '@inkline/types';
import { ref } from 'vue';

describe('Checkbox', () => {
    const props = {
        name: 'checkbox',
        color: 'light',
        size: 'md'
    };

    it('should be named correctly', () => {
        expect(Checkbox.name).toEqual('Checkbox');
    });

    it('should render correctly', () => {
        const wrapper = render(Checkbox, {
            props,
            global: {
                provide: {
                    ...createTestingInklineOptionsProvide()
                }
            }
        });
        expect(wrapper.html()).toMatchSnapshot();
    });

    describe('props', () => {
        describe('name', () => {
            it('should have randomly generated name uid', () => {
                const wrapper = render(Checkbox, {
                    props: {
                        color: props.color,
                        size: props.size
                    },
                    global: {
                        provide: {
                            ...createTestingInklineOptionsProvide()
                        }
                    }
                });
                const inputElement = wrapper.container.querySelector('input');

                expect(inputElement).toHaveAttribute('name', expect.stringContaining('checkbox'));
            });
        });
    });

    describe('computed', () => {
        describe('classes', () => {
            it('should add classes based on props', () => {
                const wrapper = render(Checkbox, {
                    props: {
                        disabled: true,
                        readonly: true,
                        native: true,
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
                    '-disabled',
                    '-readonly',
                    '-native'
                );
            });
        });

        describe('checked', () => {
            it('should be checked if checkboxGroup.value contains value', () => {
                const value = 'value';
                const wrapper = render(Checkbox, {
                    global: {
                        provide: {
                            [CheckboxGroupKey as symbol]: {
                                disabled: ref(false),
                                readonly: ref(false),
                                value: ref([value])
                            },
                            ...createTestingInklineOptionsProvide()
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
                const wrapper = render(Checkbox, {
                    global: {
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
                        value,
                        ...props
                    }
                });
                const inputElement = wrapper.container.querySelector('input');

                expect(inputElement).toBeChecked();
            });

            it('should be equal to modelValue otherwise', () => {
                const value = true;
                const wrapper = render(Checkbox, {
                    props: {
                        modelValue: value,
                        ...props
                    },
                    global: {
                        provide: {
                            ...createTestingInklineOptionsProvide()
                        }
                    }
                });
                const inputElement = wrapper.container.querySelector('input');

                expect(inputElement).toBeChecked();
            });
        });

        describe('tabIndex', () => {
            it('should be -1 if disabled', () => {
                const wrapper = render(Checkbox, {
                    props: {
                        disabled: true,
                        ...props
                    },
                    global: {
                        provide: {
                            ...createTestingInklineOptionsProvide()
                        }
                    }
                });
                const labelElement = wrapper.container.querySelector('label');

                expect(labelElement).toHaveAttribute('tabindex', '-1');
            });

            it('should be 1 otherwise', () => {
                const wrapper = render(Checkbox, {
                    props,
                    global: {
                        provide: {
                            ...createTestingInklineOptionsProvide()
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
                const wrapper = render(Checkbox, {
                    props: {
                        disabled: true,
                        ...props
                    },
                    global: {
                        provide: {
                            ...createTestingInklineOptionsProvide()
                        }
                    }
                });
                const labelElement = wrapper.container.querySelector('label');
                const inputElement = wrapper.container.querySelector('input');

                fireEvent.click(labelElement as Element);
                expect(inputElement).not.toBeChecked();
            });

            it('should not be able to click label if readonly', () => {
                const wrapper = render(Checkbox, {
                    props: {
                        readonly: true,
                        ...props
                    },
                    global: {
                        provide: {
                            ...createTestingInklineOptionsProvide()
                        }
                    }
                });
                const labelElement = wrapper.container.querySelector('label');
                const inputElement = wrapper.container.querySelector('input');

                fireEvent.click(labelElement as Element);
                expect(inputElement).not.toBeChecked();
            });

            it('should change input value on click when clicking label', () => {
                const wrapper = render(Checkbox, {
                    props,
                    global: {
                        provide: {
                            ...createTestingInklineOptionsProvide()
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
                const wrapper = render(Checkbox, {
                    global: {
                        provide: {
                            [FormKey as symbol]: {
                                disabled: ref(false),
                                readonly: ref(false),
                                onBlur,
                                onInput
                            },
                            ...createTestingInklineOptionsProvide()
                        }
                    },
                    props
                });
                const inputElement = wrapper.container.querySelector('input');

                fireEvent.change(inputElement as Element);
                expect(onInput).toHaveBeenCalled();
            });

            it('should call parent onChange if formGroup', async () => {
                const onInput = vi.fn();
                const wrapper = render(Checkbox, {
                    global: {
                        provide: {
                            ...createTestingInklineOptionsProvide(),
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

                await fireEvent.change(inputElement);
                expect(onInput).toHaveBeenCalled();
            });
        });

        describe('onBlur()', () => {
            it('should call parent onBlur if defined', async () => {
                const onBlur = vi.fn();
                const onInput = vi.fn();
                const wrapper = render(Checkbox, {
                    global: {
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
                    props
                });
                const labelElement = wrapper.container.querySelector('label');

                await fireEvent.blur(labelElement as Element);
                expect(onBlur).toHaveBeenCalled();
            });
        });
    });
});
