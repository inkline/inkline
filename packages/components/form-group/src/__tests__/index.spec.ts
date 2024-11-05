import { fireEvent, render } from '@testing-library/vue';
import { createTestingInklineOptionsProvide } from '@inkline/test-utils';
import { FormGroup, Input, FormKey } from '@inkline/inkline';
import { ref } from 'vue';

describe('Components', () => {
    describe('FormGroup', () => {
        const props = {
            name: 'form-group',
            color: 'light',
            size: 'md'
        };

        const slots = {
            default: ['<i-input name="input" color="light" size="md" />']
        };

        const stubs = {
            'i-input': Input
        };

        it('should be named correctly', () => {
            expect(FormGroup.name).toEqual('FormGroup');
        });

        it('should render correctly', () => {
            const wrapper = render(FormGroup, {
                global: {
                    stubs,
                    provide: {
                        ...createTestingInklineOptionsProvide()
                    }
                },
                props,
                slots
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(FormGroup, {
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
                    const onBlur = vi.fn();
                    const wrapper = render(FormGroup, {
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide()
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
                    const onBlur = vi.fn();
                    const onInput = vi.fn();
                    const wrapper = render(FormGroup, {
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
                    const onInput = vi.fn();
                    const wrapper = render(FormGroup, {
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide()
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
                    const onBlur = vi.fn();
                    const onInput = vi.fn();
                    const wrapper = render(FormGroup, {
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
