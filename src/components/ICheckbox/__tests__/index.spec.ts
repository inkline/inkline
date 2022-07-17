import { fireEvent, render } from '@testing-library/vue';
import { ICheckbox } from '@inkline/inkline/components';

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
            const wrapper = render(ICheckbox, { props });
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('name', () => {
                it('should have randomly generated name uid', () => {
                    const wrapper = render(ICheckbox, {
                        props: {
                            color: props.color,
                            size: props.size
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
                    const wrapper = render(ICheckbox, {
                        props: {
                            disabled: true,
                            readonly: true,
                            native: true,
                            ...props
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
                it('should be checked if formGroup.checked contains value if formGroup', () => {
                    const value = 'value';
                    const wrapper = render(ICheckbox, {
                        global: {
                            provide: {
                                formGroup: {
                                    checked: [value]
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

                it('should be equal to schema.value if schema', () => {
                    const value = true;
                    const wrapper = render(ICheckbox, {
                        global: {
                            provide: {
                                form: {
                                    schema: {
                                        [props.name]: {
                                            value
                                        }
                                    }
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
                        }
                    });
                    const labelElement = wrapper.container.querySelector('label');

                    expect(labelElement).toHaveAttribute('tabindex', '-1');
                });

                it('should be 1 otherwise', () => {
                    const wrapper = render(ICheckbox, { props });
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
                        }
                    });
                    const labelElement = wrapper.container.querySelector('label');
                    const inputElement = wrapper.container.querySelector('input');

                    fireEvent.click(labelElement as Element);
                    expect(inputElement).not.toBeChecked();
                });

                it('should change input value on click when clicking label', () => {
                    const wrapper = render(ICheckbox, { props });
                    const labelElement = wrapper.container.querySelector('label');
                    const inputElement = wrapper.container.querySelector('input');

                    fireEvent.click(labelElement as Element);
                    expect(inputElement).toBeChecked();
                });
            });

            describe('onChange()', () => {
                it('should call parent onInput', () => {
                    const onInput = vi.fn();
                    const wrapper = render(ICheckbox, {
                        global: {
                            provide: {
                                form: {
                                    onInput
                                }
                            }
                        },
                        props
                    });
                    const inputElement = wrapper.container.querySelector('input');

                    fireEvent.change(inputElement as Element);
                    expect(onInput).toHaveBeenCalled();
                });

                it('should call parent onChange if formGroup', () => {
                    const onChange = vi.fn();
                    const wrapper = render(ICheckbox, {
                        global: {
                            provide: {
                                formGroup: {
                                    onChange
                                }
                            }
                        },
                        props
                    });
                    const inputElement = wrapper.container.querySelector('input');

                    fireEvent.change(inputElement as Element);
                    expect(onChange).toHaveBeenCalled();
                });
            });

            describe('onBlur()', () => {
                it('should call parent onBlur if defined', () => {
                    const onBlur = vi.fn();
                    const wrapper = render(ICheckbox, {
                        global: {
                            provide: {
                                form: {
                                    onBlur
                                }
                            }
                        },
                        props
                    });
                    const labelElement = wrapper.container.querySelector('label');

                    fireEvent.blur(labelElement as Element);
                    expect(onBlur).toHaveBeenCalled();
                });

                it('should not call parent onBlur if not defined', () => {
                    const onBlur = vi.fn();
                    const wrapper = render(ICheckbox, {
                        global: {
                            provide: {
                                form: {}
                            }
                        },
                        props
                    });
                    const labelElement = wrapper.container.querySelector('label');

                    fireEvent.blur(labelElement as Element);
                    expect(onBlur).not.toHaveBeenCalled();
                });
            });
        });
    });
});
