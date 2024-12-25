import { fireEvent, render } from '@testing-library/vue';
import { Radio } from '../index';
import { createTestingInklineOptionsProvide } from '@inkline/test-utils';
import { RadioGroupKey } from '@inkline/types';
import { ref } from 'vue';

describe('Components', () => {
    describe('Radio', () => {
        const props = {
            name: 'radio',
            color: 'light',
            size: 'md'
        };

        it('should be named correctly', () => {
            expect(Radio.name).toEqual('Radio');
        });

        it('should render correctly', () => {
            const wrapper = render(Radio, {
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
                    const wrapper = render(Radio, {
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

                    expect(inputElement).toHaveAttribute('name', expect.stringContaining('radio'));
                });
            });
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(Radio, {
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
                it('should be checked is formGroup.checked is equal to value if formGroup', () => {
                    const value = 'value';
                    const wrapper = render(Radio, {
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide(),
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
                    const wrapper = render(Radio, {
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
                    const wrapper = render(Radio, {
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
                    const wrapper = render(Radio, {
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
                    const wrapper = render(Radio, {
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
                    const wrapper = render(Radio, {
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
                it('should call parent radio group onChange', () => {
                    const onBlur = vi.fn();
                    const onChange = vi.fn();
                    const wrapper = render(Radio, {
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide(),
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
                    const wrapper = render(Radio, {
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide(),
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
