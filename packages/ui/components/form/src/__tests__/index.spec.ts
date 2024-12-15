import { fireEvent, render, waitFor } from '@testing-library/vue';
import { Input } from '@inkline/component-input';
import { createTestingInklineOptionsProvide } from '@inkline/test-utils';
import { Form } from '../index';
import { useForm } from '@inkline/composables';
import { unref } from 'vue';

describe('Components', () => {
    describe('Form', () => {
        const props = {
            name: 'form',
            color: 'light',
            size: 'md'
        };
        const slots = {
            default: ['<Input color="light" size="md" name="input" />']
        };
        const mocks = {};
        const stubs = {
            Input
        };

        it('should be named correctly', () => {
            expect(Form.name).toEqual('Form');
        });

        it('should render correctly', () => {
            const wrapper = render(Form, {
                global: {
                    stubs,
                    provide: {
                        ...createTestingInklineOptionsProvide()
                    }
                },
                slots,
                props
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(Form, {
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        },
                        slots,
                        props: {
                            disabled: true,
                            readonly: true,
                            inline: true,
                            ...props
                        }
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

            describe('schema', () => {
                it('should be modelValue', () => {
                    const value = 'value';
                    const { schema } = useForm<{
                        input: string;
                        [key: string]: string;
                    }>({
                        input: {
                            value
                        }
                    });

                    const wrapper = render(Form, {
                        global: {
                            stubs,
                            mocks,
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        },
                        slots,
                        props: {
                            modelValue: unref(schema),
                            ...props
                        }
                    });
                    const input = wrapper.container.querySelector('input') as HTMLInputElement;

                    expect(input).toHaveProperty('value', value);
                });

                it('should be undefined if not modelValue', () => {
                    const value = 'value';
                    const wrapper = render(Form, {
                        global: {
                            stubs,
                            mocks,
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        },
                        slots,
                        props
                    });
                    const input = wrapper.container.querySelector('input') as HTMLInputElement;

                    expect(input).not.toHaveProperty('value', value);
                });
            });
        });

        describe('methods', () => {
            describe('onBlur()', () => {
                it('should set touched and untouched', async () => {
                    const { schema } = useForm<{
                        input: string;
                        [key: string]: string;
                    }>({
                        input: {}
                    });
                    const wrapper = render(Form, {
                        global: {
                            stubs,
                            mocks,
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        },
                        slots,
                        props: {
                            modelValue: unref(schema),
                            ...props
                        }
                    });
                    const input = wrapper.container.querySelector('input') as HTMLInputElement;

                    await fireEvent.blur(input);

                    await waitFor(() =>
                        expect(wrapper.emitted()['update:modelValue'][0]).toEqual([
                            {
                                input: {
                                    untouched: false,
                                    touched: true,
                                    invalid: false,
                                    valid: true
                                },
                                untouched: false,
                                touched: true,
                                invalid: false,
                                valid: true
                            }
                        ])
                    );
                });

                it('should not validate if validate on blur not set', async () => {
                    const { schema } = useForm<{
                        input: string;
                        [key: string]: string;
                    }>({
                        input: {
                            validateOn: []
                        }
                    });
                    const wrapper = render(Form, {
                        global: {
                            stubs,
                            mocks,
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        },
                        slots,
                        props: {
                            modelValue: unref(schema),
                            ...props
                        }
                    });
                    const input = wrapper.container.querySelector('input') as HTMLInputElement;

                    await fireEvent.blur(input);

                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([
                        {
                            input: {
                                untouched: false,
                                touched: true,
                                validateOn: []
                            },
                            untouched: false,
                            touched: true
                        }
                    ]);
                });
            });

            describe('onInput()', () => {
                it('should set pristine and dirty', async () => {
                    const { schema } = useForm<{
                        input: string;
                        [key: string]: string;
                    }>({
                        input: {}
                    });
                    const value = 'abc';
                    const wrapper = render(Form, {
                        global: {
                            stubs,
                            mocks,
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        },
                        slots,
                        props: {
                            modelValue: unref(schema),
                            ...props
                        }
                    });
                    const input = wrapper.container.querySelector('input') as HTMLInputElement;

                    await fireEvent.update(input, value);

                    await waitFor(() =>
                        expect(wrapper.emitted()['update:modelValue'][0]).toEqual([
                            {
                                input: {
                                    value,
                                    errors: [],
                                    pristine: false,
                                    dirty: true,
                                    invalid: false,
                                    valid: true
                                },
                                pristine: false,
                                dirty: true,
                                invalid: false,
                                valid: true
                            }
                        ])
                    );
                });

                it('should not validate if validate on blur not set', async () => {
                    const { schema } = useForm<{
                        input: string;
                        [key: string]: string;
                    }>({
                        input: {
                            validateOn: []
                        }
                    });
                    const value = 'abc';
                    const wrapper = render(Form, {
                        global: {
                            stubs,
                            mocks,
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        },
                        slots,
                        props: {
                            modelValue: unref(schema),
                            ...props
                        }
                    });
                    const input = wrapper.container.querySelector('input') as HTMLInputElement;

                    await fireEvent.update(input, value);

                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([
                        {
                            input: {
                                value,
                                pristine: false,
                                dirty: true,
                                validateOn: []
                            },
                            pristine: false,
                            dirty: true
                        }
                    ]);
                });
            });

            describe('onSubmit()', () => {
                it('should validate and emit submit if valid', async () => {
                    const { schema } = useForm<{
                        input: string;
                        [key: string]: string;
                    }>({
                        input: {
                            value: ''
                        }
                    });
                    const wrapper = render(Form, {
                        global: {
                            stubs,
                            mocks,
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        },
                        slots,
                        props: {
                            modelValue: unref(schema),
                            ...props
                        }
                    });
                    const form = wrapper.container.querySelector('form') as HTMLFormElement;

                    await fireEvent.submit(form);

                    await waitFor(() =>
                        expect(wrapper.emitted().submit[0]).toContainEqual(expect.any(Event))
                    );
                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([
                        {
                            input: {
                                value: '',
                                errors: [],
                                invalid: false,
                                valid: true,
                                touched: true,
                                untouched: false
                            },
                            invalid: false,
                            valid: true,
                            touched: true,
                            untouched: false
                        }
                    ]);
                });

                it('should validate and not emit submit if invalid', async () => {
                    const { schema } = useForm<{
                        input: string;
                        [key: string]: string;
                    }>({
                        input: {
                            value: '',
                            validators: [{ name: 'required' }]
                        }
                    });

                    const wrapper = render(Form, {
                        global: {
                            stubs,
                            mocks,
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        },
                        slots,
                        props: {
                            modelValue: unref(schema),
                            ...props
                        }
                    });
                    const form = wrapper.container.querySelector('form') as HTMLFormElement;

                    await fireEvent.submit(form);

                    expect(wrapper.emitted().submit).not.toBeDefined();
                });

                it('should not validate if not modelValue', async () => {
                    const wrapper = render(Form, {
                        global: {
                            stubs,
                            mocks,
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        },
                        slots,
                        props
                    });
                    const form = wrapper.container.querySelector('form') as HTMLFormElement;

                    await fireEvent.submit(form);

                    expect(wrapper.emitted()['update:modelValue']).not.toBeDefined();
                });
            });
        });
    });
});
