import { fireEvent, render } from '@testing-library/vue';
import { IFormGroup, IInput } from '@inkline/inkline/components';

describe('Components', () => {
    describe('IFormGroup', () => {
        const props = {
            name: 'form-group',
            color: 'light',
            size: 'md'
        };

        const slots = {
            default: [
                '<i-input name="input" color="light" size="md" />'
            ]
        };

        const stubs = {
            'i-input': IInput
        };

        it('should be named correctly', () => {
            expect(IFormGroup.name).toEqual('IFormGroup');
        });

        it('should render correctly', () => {
            const wrapper = render(IFormGroup, {
                global: {
                    stubs
                },
                props,
                slots
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(IFormGroup, {
                        global: {
                            stubs
                        },
                        slots,
                        props: {
                            disabled: true,
                            readonly: true,
                            inline: true,
                            required: true,
                            ...props
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass(
                        `-${props.color}`,
                        `-${props.size}`,
                        '-disabled',
                        '-readonly',
                        '-inline',
                        '-required'
                    );
                });
            });
        });

        describe('methods', () => {
            describe('onBlur', () => {
                it('should not call onBlur if not parent', () => {
                    const onBlur = jest.fn();
                    const wrapper = render(IFormGroup, {
                        global: {
                            stubs
                        },
                        slots,
                        props
                    });
                    const input = wrapper.container.querySelector('input') as HTMLInputElement;

                    fireEvent.blur(input);

                    expect(onBlur).not.toHaveBeenCalled();
                });

                it('should not call onBlur if parent without onBlur', () => {
                    const onBlur = jest.fn();
                    const wrapper = render(IFormGroup, {
                        global: {
                            stubs,
                            provide: {
                                form: {}
                            }
                        },
                        slots,
                        props
                    });
                    const input = wrapper.container.querySelector('input') as HTMLInputElement;

                    fireEvent.blur(input);

                    expect(onBlur).not.toHaveBeenCalled();
                });

                it('should call onBlur if parent with onBlur', () => {
                    const onBlur = jest.fn();
                    const wrapper = render(IFormGroup, {
                        global: {
                            stubs,
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

                    fireEvent.blur(input);

                    expect(onBlur).toHaveBeenCalled();
                });
            });

            describe('onInput', () => {
                it('should not call onInput if not parent', () => {
                    const onInput = jest.fn();
                    const wrapper = render(IFormGroup, {
                        global: {
                            stubs
                        },
                        slots,
                        props
                    });
                    const input = wrapper.container.querySelector('input') as HTMLInputElement;

                    fireEvent.update(input, 'abc');

                    expect(onInput).not.toHaveBeenCalled();
                });

                it('should not call onInput if parent without onInput', () => {
                    const onInput = jest.fn();
                    const wrapper = render(IFormGroup, {
                        global: {
                            stubs,
                            provide: {
                                form: {}
                            }
                        },
                        slots,
                        props
                    });
                    const input = wrapper.container.querySelector('input') as HTMLInputElement;

                    fireEvent.update(input, 'abc');

                    expect(onInput).not.toHaveBeenCalled();
                });

                it('should call onInput if parent with onInput', () => {
                    const onInput = jest.fn();
                    const wrapper = render(IFormGroup, {
                        global: {
                            stubs,
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

                    fireEvent.update(input, 'abc');

                    expect(onInput).toHaveBeenCalled();
                });
            });
        });
    });
});
