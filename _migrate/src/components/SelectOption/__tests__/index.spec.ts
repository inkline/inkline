import { fireEvent, render } from '@testing-library/vue';
import { SelectOption } from '@inkline/inkline/components';
import { createTestingInklineOptionsProvide } from '@inkline/test-utils';
import { SelectKey } from '@inkline/inkline';
import { ref } from 'vue';

describe('Components', () => {
    describe('SelectOption', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(SelectOption.name).toEqual('SelectOption');
        });

        it('should render correctly', () => {
            const wrapper = render(SelectOption, {
                props,
                global: {
                    provide: {
                        [SelectKey as symbol]: {
                            idField: ref('id'),
                            value: ref('0'),
                            disabled: ref(false),
                            onInput: vi.fn()
                        },
                        ...createTestingInklineOptionsProvide()
                    }
                }
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(SelectOption, {
                        props: {
                            option: {
                                id: 'option',
                                active: true,
                                disabled: true
                            }
                        },
                        global: {
                            provide: {
                                [SelectKey as symbol]: {
                                    idField: ref('id'),
                                    value: ref('0'),
                                    disabled: ref(false),
                                    onInput: vi.fn()
                                },
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass('-active', '-disabled');
                });
            });

            describe('tabIndex', () => {
                it('should be -1 if disabled', () => {
                    const wrapper = render(SelectOption, {
                        props: {
                            ...props,
                            option: { id: 'option', disabled: true }
                        },
                        global: {
                            provide: {
                                [SelectKey as symbol]: {
                                    idField: ref('id'),
                                    value: ref('0'),
                                    disabled: ref(false),
                                    onInput: vi.fn()
                                },
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveAttribute('tabindex', '-1');
                });

                it('should be 1 otherwise', () => {
                    const wrapper = render(SelectOption, {
                        props,
                        global: {
                            provide: {
                                [SelectKey as symbol]: {
                                    idField: ref('id'),
                                    value: ref('0'),
                                    disabled: ref(false),
                                    onInput: vi.fn()
                                },
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveAttribute('tabindex', '0');
                });
            });
        });

        describe('methods', () => {
            describe('onClick()', () => {
                it('should call select onInput', async () => {
                    const onInput = vi.fn();
                    const wrapper = render(SelectOption, {
                        global: {
                            provide: {
                                [SelectKey as symbol]: {
                                    idField: ref('id'),
                                    value: ref('0'),
                                    disabled: ref(false),
                                    onInput
                                },
                                ...createTestingInklineOptionsProvide()
                            }
                        },
                        props
                    });
                    const item = await wrapper.getByRole('option');
                    await fireEvent.click(item);
                    expect(onInput).toHaveBeenCalled();
                });

                it('should not call select onInput if disabled', async () => {
                    const onInput = vi.fn();
                    const wrapper = render(SelectOption, {
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide(),
                                [SelectKey as symbol]: {
                                    idField: ref('id'),
                                    value: ref('0'),
                                    disabled: ref(false),
                                    onInput
                                }
                            }
                        },
                        props: {
                            ...props,
                            option: { id: 'option', disabled: true }
                        }
                    });
                    const item = await wrapper.getByRole('option');
                    await fireEvent.click(item);
                    expect(onInput).not.toHaveBeenCalled();
                });
            });
        });
    });
});
