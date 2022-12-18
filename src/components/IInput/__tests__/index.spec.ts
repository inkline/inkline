import { fireEvent, render } from '@testing-library/vue';
import { IInput } from '@inkline/inkline/components';
import { createInkline, Placeholder } from '@inkline/inkline/__mocks__';
import { InklineKey } from '@inkline/inkline/plugin';
import { FormKey } from '@inkline/inkline/components/IForm';
import { ref } from 'vue';

describe('Components', () => {
    describe('IInput', () => {
        const props = {
            color: 'light',
            size: 'md',
            name: 'input'
        };

        it('should be named correctly', () => {
            expect(IInput.name).toEqual('IInput');
        });

        it('should render correctly', () => {
            const wrapper = render(IInput, {
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
                    const wrapper = render(IInput, {
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
                    const inputElement = wrapper.container.querySelector('input')!;

                    expect(inputElement).toHaveAttribute('name', expect.stringContaining('input'));
                });
            });
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(IInput, {
                        props: {
                            disabled: true,
                            error: true,
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
                                [InklineKey as symbol]: createInkline()
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
                    const wrapper = render(IInput, {
                        props: {
                            error: true,
                            ...props
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass('-error');
                });

                it('should not have error if boolean and false', () => {
                    const wrapper = render(IInput, {
                        props: {
                            error: false,
                            ...props
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).not.toHaveClass('-error');
                });

                it('should have error if schema touched, dirty and invalid', () => {
                    const onBlur = vi.fn();
                    const onInput = vi.fn();
                    const wrapper = render(IInput, {
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline(),
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
                it('should be -1 if disabled', async () => {
                    const wrapper = render(IInput, {
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

                    const input: HTMLElement = wrapper.container.querySelector('input')!;

                    expect(input).toHaveAttribute('tabindex', '-1');
                });

                it('should be 1 otherwise', async () => {
                    const wrapper = render(IInput, {
                        props,
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });
                    const input: HTMLElement = wrapper.container.querySelector('input')!;

                    expect(input).toHaveAttribute('tabindex', '0');
                });
            });

            describe('isClearable', () => {
                it('should be clearable if not disabled, not readonly, and has value', async () => {
                    const wrapper = render(IInput, {
                        props: {
                            modelValue: 'abc',
                            clearable: true,
                            ...props
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });
                    const clear = await wrapper.findByLabelText('Clear');

                    expect(clear).toBeVisible();
                });
            });

            describe('value', () => {
                it('should be schema.value if schema', async () => {
                    const value = 'value';
                    const onBlur = vi.fn();
                    const onInput = vi.fn();
                    const wrapper = render(IInput, {
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
                        props
                    });
                    const input: HTMLElement = wrapper.container.querySelector('input')!;

                    expect(input).toHaveValue(value);
                });

                it('should be modelValue otherwise', async () => {
                    const value = 'value';
                    const wrapper = render(IInput, {
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
                    const wrapper = render(IInput, {
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
                    const wrapper = render(IInput, {
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
                    const input: HTMLElement = wrapper.container.querySelector('input')!;

                    await fireEvent.update(input, 'value');

                    expect(onInput).toHaveBeenCalled();
                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([value]);
                });
            });

            describe('onClear()', () => {
                it('should emit clear event', async () => {
                    const wrapper = render(IInput, {
                        props: {
                            modelValue: 'abc',
                            clearable: true,
                            ...props
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
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
