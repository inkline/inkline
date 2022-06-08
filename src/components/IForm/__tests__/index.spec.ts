import { fireEvent, render } from '@testing-library/vue';
import { IForm, IInput } from '@inkline/inkline/components';
import { createPrototype, defaultOptions } from '@inkline/inkline/plugin';

describe('Components', () => {
    describe('IForm', () => {
        const props = {
            name: 'form',
            color: 'light',
            size: 'md'
        };

        const slots = {
            default: [
                '<i-input color="light" size="md" name="input" />'
            ]
        };

        const mocks = {
            $inkline: createPrototype(defaultOptions)
        };

        const stubs = {
            'i-input': IInput
        };

        it('should be named correctly', () => {
            expect(IForm.name).toEqual('IForm');
        });

        it('should render correctly', () => {
            const wrapper = render(IForm, {
                global: { stubs },
                slots,
                props
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(IForm, {
                        global: { stubs },
                        slots,
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

            describe('schema', () => {
                it('should be modelValue if modelValue', async () => {
                    const value = 'value';
                    const wrapper = render(IForm, {
                        global: { stubs, mocks },
                        slots,
                        props: {
                            modelValue: {
                                input: {
                                    value
                                }
                            },
                            ...props
                        }
                    });
                    const input = wrapper.container.querySelector('input') as HTMLInputElement;

                    expect(input).toHaveProperty('value', value);
                });

                it('should be form.schema if form', async () => {
                    const value = 'value';
                    const wrapper = render(IForm, {
                        global: {
                            stubs,
                            mocks,
                            provide: {
                                form: {
                                    schema: {
                                        [props.name]: {
                                            input: {
                                                value
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        slots,
                        props
                    });
                    const input = wrapper.container.querySelector('input') as HTMLInputElement;

                    expect(input).toHaveProperty('value', value);
                });

                it('should be formGroup.schema if formGroup', async () => {
                    const value = 'value';
                    const wrapper = render(IForm, {
                        global: {
                            stubs,
                            mocks,
                            provide: {
                                formGroup: {
                                    schema: {
                                        [props.name]: {
                                            input: {
                                                value
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        slots,
                        props
                    });
                    const input = wrapper.container.querySelector('input') as HTMLInputElement;

                    expect(input).toHaveProperty('value', value);
                });

                it('should be undefined otherwise', async () => {
                    const value = 'value';
                    const wrapper = render(IForm, {
                        global: {
                            stubs,
                            mocks,
                            provide: {
                                form: {},
                                formGroup: {}
                            }
                        },
                        slots,
                        props
                    });
                    const input = wrapper.container.querySelector('input') as HTMLInputElement;

                    expect(input).not.toHaveProperty('value', value);
                });
            });
        });

        describe('methods', () => {
            describe('onBlur()', () => {
                it('should call parent onBlur if parent', async () => {
                    const onBlur = jest.fn();
                    const wrapper = render(IForm, {
                        global: {
                            stubs,
                            mocks,
                            provide: {
                                form: {
                                    onBlur
                                }
                            }
                        },
                        slots,
                        props
                    });
                    const input = wrapper.container.querySelector('input') as HTMLInputElement;

                    await fireEvent.blur(input);

                    expect(onBlur).toHaveBeenCalled();
                });

                it('should call parent onBlur with uid name if parent and name not set', async () => {
                    const onBlur = jest.fn();
                    const wrapper = render(IForm, {
                        global: {
                            stubs,
                            mocks,
                            provide: {
                                form: {
                                    onBlur
                                }
                            }
                        },
                        slots,
                        props: {
                            color: props.color,
                            size: props.size
                        }
                    });
                    const input = wrapper.container.querySelector('input') as HTMLInputElement;

                    await fireEvent.blur(input);

                    expect(onBlur).toHaveBeenCalledWith(expect.stringContaining('form'), expect.any(Event));
                });

                it('should set touched and untouched', async () => {
                    const wrapper = render(IForm, {
                        global: {
                            stubs,
                            mocks
                        },
                        slots,
                        props: {
                            modelValue: {
                                input: {}
                            },
                            ...props
                        }
                    });
                    const input = wrapper.container.querySelector('input') as HTMLInputElement;

                    await fireEvent.blur(input);

                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([
                        {
                            input: {
                                untouched: false,
                                touched: true,
                                invalid: false,
                                valid: true
                            },
                            untouched: false,
                            touched: true,
                            invalid: false,
                            valid: true
                        }
                    ]);
                });

                it('should not validate if validate on blur not set', async () => {
                    const wrapper = render(IForm, {
                        global: {
                            stubs,
                            mocks
                        },
                        slots,
                        props: {
                            modelValue: {
                                input: {
                                    validateOn: []
                                }
                            },
                            ...props
                        }
                    });
                    const input = wrapper.container.querySelector('input') as HTMLInputElement;

                    await fireEvent.blur(input);

                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([
                        {
                            input: {
                                untouched: false,
                                touched: true,
                                validateOn: []
                            },
                            untouched: false,
                            touched: true
                        }
                    ]);
                });
            });

            describe('onInput()', () => {
                it('should call parent onInput if parent', async () => {
                    const onInput = jest.fn();
                    const wrapper = render(IForm, {
                        global: {
                            stubs,
                            mocks,
                            provide: {
                                form: {
                                    onInput
                                }
                            }
                        },
                        slots,
                        props
                    });
                    const input = wrapper.container.querySelector('input') as HTMLInputElement;

                    await fireEvent.update(input, 'abc');

                    expect(onInput).toHaveBeenCalled();
                });

                it('should call parent onInput with uid name if parent and name not set', async () => {
                    const onInput = jest.fn();
                    const wrapper = render(IForm, {
                        global: {
                            stubs,
                            mocks,
                            provide: {
                                form: {
                                    onInput
                                }
                            }
                        },
                        slots,
                        props: {
                            color: props.color,
                            size: props.size
                        }
                    });
                    const input = wrapper.container.querySelector('input') as HTMLInputElement;

                    await fireEvent.update(input, 'abc');

                    expect(onInput).toHaveBeenCalledWith(expect.stringContaining('form'), expect.anything());
                });

                it('should set pristine and dirty', async () => {
                    const value = 'abc';
                    const wrapper = render(IForm, {
                        global: {
                            stubs,
                            mocks
                        },
                        slots,
                        props: {
                            modelValue: {
                                input: {}
                            },
                            ...props
                        }
                    });
                    const input = wrapper.container.querySelector('input') as HTMLInputElement;

                    await fireEvent.update(input, value);

                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([
                        {
                            input: {
                                value,
                                errors: [],
                                pristine: false,
                                dirty: true,
                                invalid: false,
                                valid: true
                            },
                            pristine: false,
                            dirty: true,
                            invalid: false,
                            valid: true
                        }
                    ]);
                });

                it('should not validate if validate on blur not set', async () => {
                    const value = 'abc';
                    const wrapper = render(IForm, {
                        global: {
                            stubs,
                            mocks
                        },
                        slots,
                        props: {
                            modelValue: {
                                input: {
                                    validateOn: []
                                }
                            },
                            ...props
                        }
                    });
                    const input = wrapper.container.querySelector('input') as HTMLInputElement;

                    await fireEvent.update(input, value);

                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([
                        {
                            input: {
                                value,
                                pristine: false,
                                dirty: true,
                                validateOn: []
                            },
                            pristine: false,
                            dirty: true
                        }
                    ]);
                });
            });

            describe('onSubmit()', () => {
                it('should validate and emit submit if valid', async () => {
                    const wrapper = render(IForm, {
                        global: {
                            stubs,
                            mocks
                        },
                        slots,
                        props: {
                            modelValue: {
                                input: {
                                    value: ''
                                }
                            },
                            ...props
                        }
                    });
                    const form = wrapper.container.firstChild as HTMLFormElement;

                    await fireEvent.submit(form);

                    expect(wrapper.emitted().submit[0]).toContainEqual(expect.any(Event));
                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([
                        {
                            input: {
                                value: '',
                                invalid: false,
                                valid: true
                            },
                            invalid: false,
                            valid: true,
                            touched: true,
                            untouched: false
                        }
                    ]);
                });

                it('should validate and not emit submit if invalid', async () => {
                    const wrapper = render(IForm, {
                        global: {
                            stubs,
                            mocks
                        },
                        slots,
                        props: {
                            modelValue: {
                                input: {
                                    value: '',
                                    validators: [
                                        { name: 'required' }
                                    ]
                                }
                            },
                            ...props
                        }
                    });
                    const form = wrapper.container.firstChild as HTMLFormElement;

                    await fireEvent.submit(form);

                    expect(wrapper.emitted().submit).not.toBeDefined();
                });

                it('should not validate if not modelValue', async () => {
                    const wrapper = render(IForm, {
                        global: {
                            stubs,
                            mocks
                        },
                        slots,
                        props
                    });
                    const form = wrapper.container.firstChild as HTMLFormElement;

                    await fireEvent.submit(form);

                    expect(wrapper.emitted()['update:modelValue']).not.toBeDefined();
                });
            });
        });
    });
});
