import { fireEvent, render } from '@testing-library/vue';
import { NumberInput } from '@inkline/inkline';
import { createTestingInklineOptionsProvide } from '@inkline/test-utils';

describe('Components', () => {
    describe('NumberInput', () => {
        const props = {
            color: 'light',
            size: 'md',
            modelValue: '0',
            name: 'number-input'
        };

        it('should be named correctly', () => {
            expect(NumberInput.name).toEqual('NumberInput');
        });

        it('should render correctly', () => {
            const wrapper = render(NumberInput, {
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
                    const wrapper = render(NumberInput, {
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

                    expect(inputElement).toHaveAttribute('name', expect.stringContaining('input'));
                });
            });
        });

        describe('methods', () => {
            describe('decrease()', () => {
                it('should decrease the current value by step', async () => {
                    const wrapper = render(NumberInput, {
                        props: {
                            step: 5,
                            ...props
                        },
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });
                    const buttons = await wrapper.getAllByRole('button');

                    await fireEvent.click(buttons[0] as Element);

                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['-5']);
                });
            });

            describe('increase()', () => {
                it('should increase the current value by step', async () => {
                    const wrapper = render(NumberInput, {
                        props: {
                            step: 5,
                            ...props
                        },
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });
                    const buttons = await wrapper.getAllByRole('button');

                    await fireEvent.click(buttons[1] as Element);

                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['5']);
                });
            });

            describe('onBlurFormatPrecision()', () => {
                it('should add decimals to current value', async () => {
                    const wrapper = render(NumberInput, {
                        props: {
                            ...props,
                            precision: 2
                        },
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });
                    const input: HTMLElement = wrapper.container.querySelector('input')!;

                    await fireEvent.update(input as Element, '10.25');
                    await fireEvent.blur(input as Element);

                    expect(input).toHaveValue('10.25');
                });
            });
        });
    });
});
