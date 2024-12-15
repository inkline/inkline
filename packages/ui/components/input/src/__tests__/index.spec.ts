import { fireEvent, render } from '@testing-library/vue';
import { FormKey } from '@inkline/types';
import { Input } from '../index';
import { ref } from 'vue';
import { createTestingInklineOptionsProvide } from '@inkline/test-utils';

const Placeholder = '<div />';

describe('Components', () => {
    describe('Input', () => {
        const props = {
            color: 'light',
            size: 'md',
            name: 'input'
        };

        const stubs = ['Icon'];

        it('should be named correctly', () => {
            expect(Input.name).toEqual('Input');
        });

        it('should render correctly', () => {
            const wrapper = render(Input, {
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
                    const wrapper = render(Input, {
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
                    const inputElement = wrapper.container.querySelector('input')!;

                    expect(inputElement).toHaveAttribute('name', expect.stringContaining('input'));
                });
            });

            describe('type', () => {
                it('should render textarea element if type is "textarea"', () => {
                    const wrapper = render(Input, {
                        props: {
                            type: 'textarea',
                            ...props
                        },
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });
                    const textareaElement = wrapper.container.querySelector('textarea');

                    expect(textareaElement).toBeVisible();
                });

                it('should render show password toggle if type is "password" and "showPasswordToggle"', async () => {
                    const wrapper = render(Input, {
                        props: {
                            modelValue: 'password',
                            type: 'password',
                            showPasswordToggle: true,
                            ...props
                        },
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });

                    const inputElement = wrapper.container.querySelector('input')!;
                    const toggleElement =
                        wrapper.container.querySelector('.input-password-toggle')!;

                    expect(inputElement).toHaveAttribute('type', 'password');
                    expect(toggleElement).toBeVisible();

                    await fireEvent.click(toggleElement);

                    expect(inputElement).toHaveAttribute('type', 'text');
                });
            });
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(Input, {
                        props: {
                            disabled: true,
                            errorCondition: true,
                            readonly: true,
                            ...props
                        },
                        slots: {
                            prefix: [Placeholder],
                            suffix: [Placeholder],
                            prepend: [Placeholder],
                            append: [Placeholder]
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
                        '-error',
                        '-readonly',
                        '-prefixed',
                        '-suffixed',
                        '-prepended',
                        '-appended'
                    );
                });
            });

            describe('hasError', () => {
                it('should have error if boolean and true', () => {
                    const wrapper = render(Input, {
                        props: {
                            errorCondition: true,
                            ...props
                        },
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass('-error');
                });

                it('should not have error if boolean and false', () => {
                    const wrapper = render(Input, {
                        props: {
                            errorCondition: false,
                            ...props
                        },
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).not.toHaveClass('-error');
                });

                it('should have error if schema touched, dirty and invalid', () => {
                    const onBlur = vi.fn();
                    const onInput = vi.fn();
                    const wrapper = render(Input, {
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide(),
                                [FormKey as symbol]: {
                                    disabled: ref(false),
                                    readonly: ref(false),
                                    schema: ref({
                                        [props.name]: {
                                            touched: true,
                                            dirty: true,
                                            invalid: true
                                        }
                                    }),
                                    onBlur,
                                    onInput
                                }
                            }
                        },
                        props
                    });

                    expect(wrapper.container.firstChild).toHaveClass('-error');
                });
            });

            describe('tabIndex', () => {
                it('should be -1 if disabled', () => {
                    const wrapper = render(Input, {
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

                    const input: HTMLElement = wrapper.container.querySelector('input')!;

                    expect(input).toHaveAttribute('tabindex', '-1');
                });

                it('should be 1 otherwise', () => {
                    const wrapper = render(Input, {
                        props,
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });
                    const input: HTMLElement = wrapper.container.querySelector('input')!;

                    expect(input).toHaveAttribute('tabindex', '0');
                });
            });

            describe('isClearable', () => {
                it('should be clearable if not disabled, not readonly, and has value', async () => {
                    const wrapper = render(Input, {
                        props: {
                            modelValue: 'abc',
                            clearable: true,
                            ...props
                        },
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });
                    const clear = await wrapper.findByLabelText('Clear');

                    expect(clear).toBeVisible();
                });
            });

            describe('value', () => {
                it('should be schema.value if schema', () => {
                    const value = 'value';
                    const onBlur = vi.fn();
                    const onInput = vi.fn();
                    const wrapper = render(Input, {
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
                        props
                    });
                    const input: HTMLElement = wrapper.container.querySelector('input')!;

                    expect(input).toHaveValue(value);
                });

                it('should be modelValue otherwise', () => {
                    const value = 'value';
                    const wrapper = render(Input, {
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
                    const input: HTMLElement = wrapper.container.querySelector('input')!;

                    expect(input).toHaveValue(value);
                });
            });
        });

        describe('methods', () => {
            describe('onBlur()', () => {
                it('should call parent onBlur if parent.onBlur', async () => {
                    const onBlur = vi.fn();
                    const onInput = vi.fn();
                    const wrapper = render(Input, {
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
                    const input: HTMLElement = wrapper.container.querySelector('input')!;

                    await fireEvent.blur(input);

                    expect(onBlur).toHaveBeenCalled();
                });
            });

            describe('onInput()', () => {
                it('should call parent onInput if parent.onInput', async () => {
                    const value = 'value';
                    const onBlur = vi.fn();
                    const onInput = vi.fn();
                    const wrapper = render(Input, {
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
                    const input: HTMLElement = wrapper.container.querySelector('input')!;

                    await fireEvent.update(input, 'value');

                    expect(onInput).toHaveBeenCalled();
                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([value]);
                });
            });

            describe('onClear()', () => {
                it('should emit clear event', async () => {
                    const wrapper = render(Input, {
                        props: {
                            modelValue: 'abc',
                            clearable: true,
                            ...props
                        },
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });
                    const clear = await wrapper.findByLabelText('Clear');

                    await fireEvent.click(clear);

                    expect(wrapper.emitted().clear[0]).toBeDefined();
                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['']);
                });
            });
        });
    });
});
