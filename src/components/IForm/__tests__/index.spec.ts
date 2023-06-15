import { fireEvent, render } from '@testing-library/vue';
import { IForm, IInput } from '@inkline/inkline/components';
import { InklineKey } from '@inkline/inkline/constants';
import { createInkline } from '@inkline/inkline/__tests__/utils';

describe('Components', () => {
    describe('IForm', () => {
        const props = {
            name: 'form',
            color: 'light',
            size: 'md'
        };

        const slots = {
            default: ['<i-input color="light" size="md" name="input" />']
        };

        const mocks = {
            $inkline: createInkline()
        };

        const stubs = {
            'i-input': IInput
        };

        it('should be named correctly', () => {
            expect(IForm.name).toEqual('IForm');
        });

        it('should render correctly', () => {
            const wrapper = render(IForm, {
                global: {
                    stubs,
                    provide: {
                        [InklineKey as symbol]: createInkline()
                    }
                },
                slots,
                props
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(IForm, {
                        global: {
                            stubs,
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        },
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
                it('should be modelValue', async () => {
                    const value = 'value';
                    const wrapper = render(IForm, {
                        global: {
                            stubs,
                            mocks,
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        },
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

                it('should be undefined if not modelValue', async () => {
                    const value = 'value';
                    const wrapper = render(IForm, {
                        global: {
                            stubs,
                            mocks,
                            provide: {
                                [InklineKey as symbol]: createInkline()
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
                it('should set touched and untouched', async () => {
                    const wrapper = render(IForm, {
                        global: {
                            stubs,
                            mocks,
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
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
                            mocks,
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
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
                it('should set pristine and dirty', async () => {
                    const value = 'abc';
                    const wrapper = render(IForm, {
                        global: {
                            stubs,
                            mocks,
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
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
                            mocks,
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
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
                            mocks,
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
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
                    const form = wrapper.container.querySelector('form') as HTMLFormElement;

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
                            mocks,
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        },
                        slots,
                        props: {
                            modelValue: {
                                input: {
                                    value: '',
                                    validators: [{ name: 'required' }]
                                }
                            },
                            ...props
                        }
                    });
                    const form = wrapper.container.querySelector('form') as HTMLFormElement;

                    await fireEvent.submit(form);

                    expect(wrapper.emitted().submit).not.toBeDefined();
                });

                it('should not validate if not modelValue', async () => {
                    const wrapper = render(IForm, {
                        global: {
                            stubs,
                            mocks,
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        },
                        slots,
                        props
                    });
                    const form = wrapper.container.querySelector('form') as HTMLFormElement;

                    await fireEvent.submit(form);

                    expect(wrapper.emitted()['update:modelValue']).not.toBeDefined();
                });
            });
        });
    });
});
