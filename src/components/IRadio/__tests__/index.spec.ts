import { fireEvent, render } from '@testing-library/vue';
import { IRadio } from '@inkline/inkline/components';
import { InklineKey } from '@inkline/inkline/plugin';
import { createInkline } from '@inkline/inkline/__mocks__';
import { RadioGroupKey } from '@inkline/inkline/components/IRadioGroup';
import { ref } from 'vue';

describe('Components', () => {
    describe('IRadio', () => {
        const props = {
            name: 'radio',
            color: 'light',
            size: 'md'
        };

        it('should be named correctly', () => {
            expect(IRadio.name).toEqual('IRadio');
        });

        it('should render correctly', () => {
            const wrapper = render(IRadio, {
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
                    const wrapper = render(IRadio, {
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

                    expect(inputElement).toHaveAttribute('name', expect.stringContaining('radio'));
                });
            });
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(IRadio, {
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
                it('should be checked is formGroup.checked is equal to value if formGroup', () => {
                    const value = 'value';
                    const wrapper = render(IRadio, {
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline(),
                                [RadioGroupKey as symbol]: {
                                    value: ref(value),
                                    disabled: ref(false),
                                    readonly: ref(false)
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
            });

            describe('tabIndex', () => {
                it('should be -1 if disabled', () => {
                    const wrapper = render(IRadio, {
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
                    const wrapper = render(IRadio, {
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
                    const wrapper = render(IRadio, {
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
                    const wrapper = render(IRadio, {
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
                    const wrapper = render(IRadio, {
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
                it('should call parent radio group onChange', () => {
                    const onBlur = vi.fn();
                    const onChange = vi.fn();
                    const wrapper = render(IRadio, {
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline(),
                                [RadioGroupKey as symbol]: {
                                    disabled: ref(false),
                                    readonly: ref(false),
                                    value: ref(''),
                                    onBlur,
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
                it('should call parent radio group onBlur', () => {
                    const onBlur = vi.fn();
                    const onChange = vi.fn();
                    const wrapper = render(IRadio, {
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline(),
                                [RadioGroupKey as symbol]: {
                                    disabled: ref(false),
                                    readonly: ref(false),
                                    value: ref(''),
                                    onBlur,
                                    onChange
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
