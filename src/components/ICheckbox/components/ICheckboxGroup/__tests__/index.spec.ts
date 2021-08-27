import { render } from '@testing-library/vue';
import { ICheckbox, ICheckboxGroup } from '@inkline/inkline/components';

describe('Components', () => {
    describe('ICheckboxGroup', () => {
        const props = {
            name: 'checkbox-group',
            color: 'light',
            size: 'md'
        };

        const stubs = {
            'i-checkbox': ICheckbox
        };

        const slots = {
            default: [
                '<i-checkbox color="light" name="checkbox-1" value="1" />',
                '<i-checkbox color="light" name="checkbox-2" value="2" />',
                '<i-checkbox color="light" name="checkbox-3" value="3" />',
            ]
        };

        it('should be named correctly', () => {
            expect(ICheckboxGroup.name).toEqual('ICheckboxGroup');
        });

        it('should render correctly', () => {
            const wrapper = render(ICheckboxGroup, {
                global: { stubs },
                props,
                slots
            });
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('name', () => {
                it('should have randomly generated name uid', async () => {
                    const wrapper = render(ICheckboxGroup, {
                        global: { stubs },
                        props: {
                            color: props.color,
                            size: props.size
                        },
                        slots
                    });

                    expect(wrapper.container.firstChild).toHaveAttribute('name', expect.stringContaining('checkbox-group'));
                });
            });
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(ICheckboxGroup, {
                        global: { stubs },
                        props: {
                            disabled: true,
                            readonly: true,
                            inline: true,
                            ...props
                        },
                        slots
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

            describe('checked', () => {
                it('should be equal to schema.value if schema', async () => {
                    const value = ['1'];
                    const wrapper = render(ICheckboxGroup, {
                        global: {
                            stubs,
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
                        },
                        slots
                    });
                    const checkboxes = await wrapper.getAllByRole('checkbox');

                    expect(checkboxes[0].querySelector('input')).toBeChecked();
                });

                it('should be equal to modelValue otherwise', () => {
                    const modelValue = ['1', '2', '3'];
                    const wrapper = render(ICheckboxGroup, {
                        global: {
                            stubs
                        },
                        props: {
                            modelValue,
                            ...props
                        },
                        slots
                    });
                    const checkboxes = wrapper.container.querySelectorAll('input');

                    expect(checkboxes[0]).toBeChecked();
                    expect(checkboxes[1]).toBeChecked();
                    expect(checkboxes[2]).toBeChecked();
                });
            });

        //     describe('tabIndex', () => {
        //         it('should be -1 if disabled', () => {
        //             const wrapper = render(ICheckboxGroup, {
        //                 props: {
        //                     disabled: true,
        //                     ...props
        //                 }
        //             });
        //             const labelElement = wrapper.container.querySelector('label');
        //
        //             expect(labelElement).toHaveAttribute('tabindex', '-1');
        //         });
        //
        //         it('should be 1 otherwise', () => {
        //             const wrapper = render(ICheckboxGroup, { props });
        //             const labelElement = wrapper.container.querySelector('label');
        //
        //             expect(labelElement).toHaveAttribute('tabindex', '1');
        //         });
        //     });
        // });
        //
        // describe('methods', () => {
        //     describe('clickInputRef()', () => {
        //         it('should not be able to click label if disabled', () => {
        //             const wrapper = render(ICheckboxGroup, {
        //                 props: {
        //                     disabled: true,
        //                     ...props
        //                 }
        //             });
        //             const labelElement = wrapper.container.querySelector('label');
        //             const inputElement = wrapper.container.querySelector('input');
        //
        //             fireEvent.click(labelElement as Element);
        //             expect(inputElement).not.toBeChecked();
        //         });
        //
        //         it('should not be able to click label if readonly', () => {
        //             const wrapper = render(ICheckboxGroup, {
        //                 props: {
        //                     readonly: true,
        //                     ...props
        //                 }
        //             });
        //             const labelElement = wrapper.container.querySelector('label');
        //             const inputElement = wrapper.container.querySelector('input');
        //
        //             fireEvent.click(labelElement as Element);
        //             expect(inputElement).not.toBeChecked();
        //         });
        //
        //         it('should change input value on click when clicking label', () => {
        //             const wrapper = render(ICheckboxGroup, { props });
        //             const labelElement = wrapper.container.querySelector('label');
        //             const inputElement = wrapper.container.querySelector('input');
        //
        //             fireEvent.click(labelElement as Element);
        //             expect(inputElement).toBeChecked();
        //         });
        //     });
        //
        //     describe('onChange()', () => {
        //         it('should call parent onInput', () => {
        //             const onInput = jest.fn();
        //             const wrapper = render(ICheckboxGroup, {
        //                 global: {
        //                     provide: {
        //                         form: {
        //                             onInput
        //                         }
        //                     }
        //                 },
        //                 props
        //             });
        //             const inputElement = wrapper.container.querySelector('input');
        //
        //             fireEvent.change(inputElement as Element);
        //             expect(onInput).toHaveBeenCalled();
        //         });
        //
        //         it('should call parent onChange if formGroup', () => {
        //             const onChange = jest.fn();
        //             const wrapper = render(ICheckboxGroup, {
        //                 global: {
        //                     provide: {
        //                         formGroup: {
        //                             onChange
        //                         }
        //                     }
        //                 },
        //                 props
        //             });
        //             const inputElement = wrapper.container.querySelector('input');
        //
        //             fireEvent.change(inputElement as Element);
        //             expect(onChange).toHaveBeenCalled();
        //         });
        //     });
        //
        //     describe('onBlur()', () => {
        //         it('should call parent onBlur if defined', () => {
        //             const onBlur = jest.fn();
        //             const wrapper = render(ICheckboxGroup, {
        //                 global: {
        //                     provide: {
        //                         form: {
        //                             onBlur
        //                         }
        //                     }
        //                 },
        //                 props
        //             });
        //             const labelElement = wrapper.container.querySelector('label');
        //
        //             fireEvent.blur(labelElement as Element);
        //             expect(onBlur).toHaveBeenCalled();
        //         });
        //
        //         it('should not call parent onBlur if not defined', () => {
        //             const onBlur = jest.fn();
        //             const wrapper = render(ICheckboxGroup, {
        //                 global: {
        //                     provide: {
        //                         form: {}
        //                     }
        //                 },
        //                 props
        //             });
        //             const labelElement = wrapper.container.querySelector('label');
        //
        //             fireEvent.blur(labelElement as Element);
        //             expect(onBlur).not.toHaveBeenCalled();
        //         });
        //     });
        });
    });
});
