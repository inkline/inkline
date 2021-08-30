import {fireEvent, render} from '@testing-library/vue';
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
        });

        describe('methods', () => {
            describe('onChange', () => {
                it('should update modelValue when checking checkbox', async () => {
                    const wrapper = render(ICheckboxGroup, {
                        global: { stubs },
                        props: {
                            modelValue: [],
                            ...props
                        },
                        slots
                    });
                    const checkboxes = wrapper.container.querySelectorAll('label');

                    await fireEvent.click(checkboxes[0]);

                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([['1']]);
                });

                it('should update modelValue when unchecking checkbox', async () => {
                    const wrapper = render(ICheckboxGroup, {
                        global: { stubs },
                        props: {
                            modelValue: ['1'],
                            ...props
                        },
                        slots
                    });
                    const checkboxes = wrapper.container.querySelectorAll('label');

                    await fireEvent.click(checkboxes[0]);

                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([[]]);
                });

                it('should call parent form onInput when checking checkbox', async () => {
                    const onInput = jest.fn();
                    const wrapper = render(ICheckboxGroup, {
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
                    const checkboxes = wrapper.container.querySelectorAll('label');

                    await fireEvent.click(checkboxes[0]);

                    expect(onInput).toHaveBeenCalled();
                });
            });
        });
    });
});
