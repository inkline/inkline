import { fireEvent, render } from '@testing-library/vue';
import { IRadio, IRadioGroup } from '@inkline/inkline/components';

describe('Components', () => {
    describe('IRadioGroup', () => {
        const props = {
            name: 'radio-group',
            color: 'light',
            size: 'md'
        };

        const stubs = {
            'i-radio': IRadio
        };

        const slots = {
            default: [
                '<i-radio color="light" name="radio-1" value="1" />',
                '<i-radio color="light" name="radio-2" value="2" />',
                '<i-radio color="light" name="radio-3" value="3" />',
            ]
        };

        it('should be named correctly', () => {
            expect(IRadioGroup.name).toEqual('IRadioGroup');
        });

        it('should render correctly', () => {
            const wrapper = render(IRadioGroup, {
                global: { stubs },
                props,
                slots
            });
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('name', () => {
                it('should have randomly generated name uid', async () => {
                    const wrapper = render(IRadioGroup, {
                        global: { stubs },
                        props: {
                            color: props.color,
                            size: props.size
                        },
                        slots
                    });

                    expect(wrapper.container.firstChild).toHaveAttribute('name', expect.stringContaining('radio-group'));
                });
            });
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(IRadioGroup, {
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
                    const value = '1';
                    const wrapper = render(IRadioGroup, {
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
                    const radios = await wrapper.getAllByRole('radio');

                    expect(radios[0].querySelector('input')).toBeChecked();
                });

                it('should be equal to modelValue otherwise', () => {
                    const modelValue = '2';
                    const wrapper = render(IRadioGroup, {
                        global: {
                            stubs
                        },
                        props: {
                            modelValue,
                            ...props
                        },
                        slots
                    });
                    const radios = wrapper.container.querySelectorAll('input');

                    expect(radios[1]).toBeChecked();
                });
            });
        });

        describe('methods', () => {
            describe('onChange', () => {
                it('should update modelValue when checking radio', async () => {
                    const wrapper = render(IRadioGroup, {
                        global: { stubs },
                        props: {
                            modelValue: [],
                            ...props
                        },
                        slots
                    });
                    const radios = wrapper.container.querySelectorAll('label');

                    await fireEvent.click(radios[0]);

                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['1']);
                });

                it('should update modelValue when checking another radio', async () => {
                    const wrapper = render(IRadioGroup, {
                        global: { stubs },
                        props: {
                            modelValue: '1',
                            ...props
                        },
                        slots
                    });
                    const radios = wrapper.container.querySelectorAll('label');

                    await fireEvent.click(radios[1]);

                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['2']);
                });

                it('should call parent form onInput when checking radio', async () => {
                    const onInput = jest.fn();
                    const wrapper = render(IRadioGroup, {
                        global: {
                            stubs,
                            provide: {
                                form: {
                                    onInput
                                }
                            }
                        },
                        props: {
                            modelValue: [],
                            ...props
                        },
                        slots
                    });
                    const radios = wrapper.container.querySelectorAll('label');

                    await fireEvent.click(radios[0]);

                    expect(onInput).toHaveBeenCalled();
                });
            });
        });
    });
});
