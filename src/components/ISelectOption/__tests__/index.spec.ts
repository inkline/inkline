import { fireEvent, render } from '@testing-library/vue';
import { ISelectOption } from '@inkline/inkline/components';
import { createMockInstance } from '@inkline/inkline/__mocks__/createMockInstance';
import { InklineKey } from '@inkline/inkline/plugin';
import { createInkline } from '@inkline/inkline/__mocks__';
import { SelectKey } from '@inkline/inkline/components/ISelect/mixin';
import { ref } from 'vue';

describe('Components', () => {
    describe('ISelectOption', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(ISelectOption.name).toEqual('ISelectOption');
        });

        it('should render correctly', () => {
            const wrapper = render(ISelectOption, {
                props,
                global: {
                    provide: {
                        [InklineKey as symbol]: createInkline()
                    }
                }
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(ISelectOption, {
                        props: {
                            active: true,
                            disabled: true
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass('-active', '-disabled');
                });
            });

            describe('tabIndex', () => {
                it('should be -1 if disabled', () => {
                    const wrapper = render(ISelectOption, {
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

                    expect(wrapper.container.firstChild).toHaveAttribute('tabindex', '-1');
                });

                it('should be 1 otherwise', () => {
                    const wrapper = render(ISelectOption, {
                        props,
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
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
                    const wrapper = render(ISelectOption, {
                        global: {
                            provide: {
                                [SelectKey as symbol]: {
                                    idField: ref('id'),
                                    value: ref('0'),
                                    onInput
                                },
                                [InklineKey as symbol]: createInkline()
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
                    const wrapper = render(ISelectOption, {
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline(),
                                [SelectKey as symbol]: {
                                    idField: ref('id'),
                                    value: ref('0'),
                                    onInput
                                }
                            }
                        },
                        props: {
                            ...props,
                            disabled: true
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
