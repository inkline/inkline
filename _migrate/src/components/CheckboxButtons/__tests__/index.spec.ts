import { fireEvent, render } from '@testing-library/vue';
import { createTestingInklineOptionsProvide } from '@inkline/test-utils';
import { Button, ButtonGroup, CheckboxButtons, FormKey, RenderResolver } from '@inkline/inkline';
import { ref } from 'vue';

describe('Components', () => {
    describe('CheckboxButtons', () => {
        const props = {
            name: 'checkbox-buttons',
            color: 'light',
            size: 'md',
            options: [
                { id: 1, label: 'Option 1' },
                { id: 2, label: 'Option 2' },
                { id: 3, label: 'Option 3' }
            ]
        };

        const stubs = {
            'i-button': Button,
            'i-button-group': ButtonGroup,
            'i-render-resolver': RenderResolver
        };

        it('should be named correctly', () => {
            expect(CheckboxButtons.name).toEqual('CheckboxButtons');
        });

        it('should render correctly', () => {
            const wrapper = render(CheckboxButtons, {
                global: {
                    stubs,
                    provide: {
                        ...createTestingInklineOptionsProvide()
                    }
                },
                props
            });
            expect(wrapper.html()).toMatchSnapshot();
        });

        it('should render group variant correctly', () => {
            const wrapper = render(CheckboxButtons, {
                global: {
                    stubs,
                    provide: {
                        ...createTestingInklineOptionsProvide()
                    }
                },
                props: {
                    ...props,
                    variant: 'group'
                }
            });
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('name', () => {
                it('should have randomly generated name uid', async () => {
                    const wrapper = render(CheckboxButtons, {
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        },
                        props: {
                            color: props.color,
                            size: props.size,
                            options: props.options
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveAttribute(
                        'name',
                        expect.stringContaining('checkbox-buttons')
                    );
                });
            });
        });

        describe('computed', () => {
            describe('checked', () => {
                it('should be equal to schema.value if schema', async () => {
                    const value = [1];
                    const onBlur = vi.fn();
                    const onInput = vi.fn();
                    const wrapper = render(CheckboxButtons, {
                        global: {
                            stubs,
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
                            modelValue: value,
                            ...props
                        }
                    });
                    const checkboxes = wrapper.container.querySelectorAll('.button');

                    expect(checkboxes[0]).toHaveClass('-active');
                });

                it('should be equal to modelValue', async () => {
                    const modelValue = [1, 2, 3];
                    const wrapper = render(CheckboxButtons, {
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        },
                        props: {
                            modelValue,
                            ...props
                        }
                    });

                    const checkboxes = wrapper.container.querySelectorAll('.button');

                    expect(checkboxes[0]).toHaveClass('-active');
                    expect(checkboxes[1]).toHaveClass('-active');
                    expect(checkboxes[2]).toHaveClass('-active');
                });
            });
        });

        describe('methods', () => {
            describe('onChange', () => {
                it('should update modelValue when checking checkbox', async () => {
                    const wrapper = render(CheckboxButtons, {
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        },
                        props: {
                            modelValue: [],
                            ...props
                        }
                    });
                    const checkboxes = wrapper.container.querySelectorAll('.button');

                    await fireEvent.click(checkboxes[0]);

                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([[1]]);
                });

                it('should update modelValue when unchecking checkbox', async () => {
                    const wrapper = render(CheckboxButtons, {
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        },
                        props: {
                            modelValue: [1],
                            ...props
                        }
                    });
                    const checkboxes = wrapper.container.querySelectorAll('.button');

                    await fireEvent.click(checkboxes[0]);

                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([[]]);
                });

                it('should call parent form onInput when checking checkbox', async () => {
                    const onBlur = vi.fn();
                    const onInput = vi.fn();
                    const wrapper = render(CheckboxButtons, {
                        global: {
                            stubs,
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
                        props: {
                            modelValue: [],
                            ...props
                        }
                    });
                    const checkboxes = wrapper.container.querySelectorAll('.button');

                    await fireEvent.click(checkboxes[0]);

                    expect(onInput).toHaveBeenCalled();
                });
            });
        });
    });
});
