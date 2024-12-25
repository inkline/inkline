import { fireEvent, render } from '@testing-library/vue';
import { createTestingInklineOptionsProvide } from '@inkline/test-utils';
import { ref } from 'vue';
import { Toggle, FormKey } from '@inkline/inkline';

describe('Components', () => {
    describe('Toggle', () => {
        const props = {
            name: 'toggle',
            color: 'light',
            size: 'md'
        };

        it('should be named correctly', () => {
            expect(Toggle.name).toEqual('Toggle');
        });

        it('should render correctly', () => {
            const wrapper = render(Toggle, {
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
                    const wrapper = render(Toggle, {
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

                    expect(inputElement).toHaveAttribute('name', expect.stringContaining('toggle'));
                });
            });
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(Toggle, {
                        props: {
                            disabled: true,
                            readonly: true,
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
                        '-readonly'
                    );
                });
            });

            describe('checked', () => {
                it('should be equal to schema.value if schema', () => {
                    const onBlur = vi.fn();
                    const onInput = vi.fn();
                    const value = true;
                    const wrapper = render(Toggle, {
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
                    const wrapper = render(Toggle, {
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
                    const wrapper = render(Toggle, {
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
                    const wrapper = render(Toggle, {
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
                    const wrapper = render(Toggle, {
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
                    const wrapper = render(Toggle, {
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
                    const wrapper = render(Toggle, {
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
                    const wrapper = render(Toggle, {
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
                    const inputElement = wrapper.container.querySelector('input');

                    fireEvent.change(inputElement as Element);
                    expect(onInput).toHaveBeenCalled();
                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([false]);
                });
            });

            describe('onBlur()', () => {
                it('should call parent onBlur if defined', () => {
                    const onBlur = vi.fn();
                    const onInput = vi.fn();
                    const wrapper = render(Toggle, {
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

                    fireEvent.blur(labelElement as Element);
                    expect(onBlur).toHaveBeenCalled();
                });
            });
        });
    });
});
