import { fireEvent, render } from '@testing-library/vue';
import { IToggle } from '@inkline/inkline/components';

describe('Components', () => {
    describe('IToggle', () => {
        const props = {
            name: 'toggle',
            color: 'light',
            size: 'md'
        };

        it('should be named correctly', () => {
            expect(IToggle.name).toEqual('IToggle');
        });

        it('should render correctly', () => {
            const wrapper = render(IToggle, { props });
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('name', () => {
                it('should have randomly generated name uid', () => {
                    const wrapper = render(IToggle, {
                        props: {
                            color: props.color,
                            size: props.size
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
                    const wrapper = render(IToggle, {
                        props: {
                            disabled: true,
                            readonly: true,
                            ...props
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
                    const value = true;
                    const wrapper = render(IToggle, {
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
                    const wrapper = render(IToggle, {
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
                    const wrapper = render(IToggle, {
                        props: {
                            disabled: true,
                            ...props
                        }
                    });
                    const labelElement = wrapper.container.querySelector('label');

                    expect(labelElement).toHaveAttribute('tabindex', '-1');
                });

                it('should be 1 otherwise', () => {
                    const wrapper = render(IToggle, { props });
                    const labelElement = wrapper.container.querySelector('label');

                    expect(labelElement).toHaveAttribute('tabindex', '0');
                });
            });
        });

        describe('methods', () => {
            describe('clickInputRef()', () => {
                it('should not be able to click label if disabled', () => {
                    const wrapper = render(IToggle, {
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
                    const wrapper = render(IToggle, {
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
                    const wrapper = render(IToggle, { props });
                    const labelElement = wrapper.container.querySelector('label');
                    const inputElement = wrapper.container.querySelector('input');

                    fireEvent.click(labelElement as Element);
                    expect(inputElement).toBeChecked();
                });
            });

            describe('onChange()', () => {
                it('should call parent onInput', () => {
                    const onInput = vi.fn();
                    const wrapper = render(IToggle, {
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
                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([false]);
                });
            });

            describe('onBlur()', () => {
                it('should call parent onBlur if defined', () => {
                    const onBlur = vi.fn();
                    const wrapper = render(IToggle, {
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
                    const wrapper = render(IToggle, {
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
