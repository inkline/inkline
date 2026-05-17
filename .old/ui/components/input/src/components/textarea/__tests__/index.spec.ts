import { fireEvent, render } from '@testing-library/vue';
import { FormKey } from '@inkline/types';
import { ref } from 'vue';
import { createTestingInklineOptionsProvide } from '@inkline/test-utils';
import { Textarea } from '../index';

describe('Components', () => {
    describe('Textarea', () => {
        const props = {
            color: 'light',
            size: 'md',
            name: 'textarea'
        };

        const stubs = ['i-icon'];

        it('should be named correctly', () => {
            expect(Textarea.name).toEqual('Textarea');
        });

        it('should render correctly', () => {
            const wrapper = render(Textarea, {
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
                    const wrapper = render(Textarea, {
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
                    const textarea = wrapper.container.querySelector('textarea');

                    expect(textarea).toHaveAttribute('name', expect.stringContaining('textarea'));
                });
            });
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(Textarea, {
                        props: {
                            disabled: true,
                            error: true,
                            readonly: true,
                            ...props
                        },
                        slots: {
                            prefix: ['<div />'],
                            suffix: ['<div />'],
                            prepend: ['<div />'],
                            append: ['<div />']
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
                    const wrapper = render(Textarea, {
                        props: {
                            error: true,
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
                    const wrapper = render(Textarea, {
                        props: {
                            error: false,
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
                    const wrapper = render(Textarea, {
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
                it('should be -1 if disabled', async () => {
                    const wrapper = render(Textarea, {
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

                    const textarea = await wrapper.findByRole('textbox');

                    expect(textarea).toHaveAttribute('tabindex', '-1');
                });

                it('should be 1 otherwise', async () => {
                    const wrapper = render(Textarea, {
                        props,
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });
                    const textarea = await wrapper.findByRole('textbox');

                    expect(textarea).toHaveAttribute('tabindex', '0');
                });
            });

            describe('isClearable', () => {
                it('should be clearable if not disabled, not readonly, and has value', async () => {
                    const wrapper = render(Textarea, {
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
                it('should be schema.value if schema', async () => {
                    const value = 'value';
                    const onBlur = vi.fn();
                    const onInput = vi.fn();
                    const wrapper = render(Textarea, {
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
                    const textarea = await wrapper.findByRole('textbox');

                    expect(textarea).toHaveValue(value);
                });

                it('should be modelValue otherwise', async () => {
                    const value = 'value';
                    const wrapper = render(Textarea, {
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
                    const textarea = await wrapper.findByRole('textbox');

                    expect(textarea).toHaveValue(value);
                });
            });
        });

        describe('methods', () => {
            describe('onBlur()', () => {
                it('should call parent onBlur if parent.onBlur', async () => {
                    const onBlur = vi.fn();
                    const onInput = vi.fn();
                    const wrapper = render(Textarea, {
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
                    const textarea = await wrapper.findByRole('textbox');

                    await fireEvent.blur(textarea);

                    expect(onBlur).toHaveBeenCalled();
                });
            });

            describe('onInput()', () => {
                it('should call parent onInput if parent.onInput', async () => {
                    const value = 'value';
                    const onBlur = vi.fn();
                    const onInput = vi.fn();
                    const wrapper = render(Textarea, {
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
                    const textarea = await wrapper.findByRole('textbox');

                    await fireEvent.update(textarea, 'value');

                    expect(onInput).toHaveBeenLastCalledWith(props.name, value);
                });
            });

            describe('onClear()', () => {
                it('should emit clear event', async () => {
                    const onInput = vi.fn();
                    const wrapper = render(Textarea, {
                        props: {
                            modelValue: 'textarea',
                            clearable: true,
                            ...props
                        },
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide(),
                                [FormKey as symbol]: {
                                    disabled: ref(false),
                                    readonly: ref(false),
                                    onInput
                                }
                            }
                        }
                    });

                    const clear = await wrapper.findByLabelText('Clear');
                    await fireEvent.click(clear);
                    expect(onInput).toHaveBeenLastCalledWith('textarea', '');
                });
            });
        });
    });
});
