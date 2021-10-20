import { fireEvent, render } from '@testing-library/vue';
import { INumberInput } from '@inkline/inkline/components';
import {createMockInstance} from "@inkline/inkline/__mocks__/createMockInstance";

describe('Components', () => {
    describe('INumberInput', () => {
        const props = {
            color: 'light',
            size: 'md',
            modelValue: '0',
            name: 'number-input'
        };

        it('should be named correctly', () => {
            expect(INumberInput.name).toEqual('INumberInput');
        });

        it('should render correctly', () => {
            const wrapper = render(INumberInput, {
                props
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('name', () => {
                it('should have randomly generated name uid', () => {
                    const wrapper = render(INumberInput, {
                        props: {
                            color: props.color,
                            size: props.size
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
                    const wrapper = render(INumberInput, {
                        props: {
                            step: 5,
                            ...props
                        }
                    });
                    const buttons = await wrapper.getAllByRole('button');

                    await fireEvent.click(buttons[0] as Element);

                    expect(wrapper.emitted()['update:modelValue'][1]).toEqual(['-5']);
                });
            });

            describe('increase()', () => {
                it('should increase the current value by step', async () => {
                    const wrapper = render(INumberInput, {
                        props: {
                            step: 5,
                            ...props
                        }
                    });
                    const buttons = await wrapper.getAllByRole('button');

                    await fireEvent.click(buttons[1] as Element);

                    expect(wrapper.emitted()['update:modelValue'][1]).toEqual(['5']);
                });
            });

            describe('onBlurFormatPrecision()', () => {
                it('should add decimals to current value', async () => {
                    const wrapper = render(INumberInput, {
                        props: {
                            ...props,
                            precision: 2,
                        }
                    });
                    const input = await wrapper.getByRole('input');

                    await fireEvent.update(input as Element, '10.25');
                    await fireEvent.blur(input as Element);

                    expect(input).toHaveValue('10.25');
                });

                it('should add trailing zeroes to current value', () => {
                    const parent = {};
                    const wrapper = createMockInstance(INumberInput, {
                        props: {
                            ...props,
                            precision: 2,
                            modelValue: '10.2'
                        },
                        mocks: {
                            parent
                        }
                    });
                    const event: any = {};

                    wrapper.onBlurFormatPrecision(event);

                    expect(wrapper.$emit).toHaveBeenCalledWith('update:modelValue', '10.20');
                });

                it('should emit update:modelValue and parent.onBlur', () => {
                    const parent = {
                        onBlur: jest.fn()
                    };
                    const wrapper = createMockInstance(INumberInput, {
                        props: {
                            ...props,
                            precision: 2,
                            modelValue: '10.25'
                        },
                        mocks: {
                            parent
                        }
                    });
                    const event: any = {};

                    wrapper.onBlurFormatPrecision(event);

                    expect(wrapper.$emit).toHaveBeenCalledWith('update:modelValue', '10.25');
                    expect(wrapper.formatPrecision).toHaveBeenCalledWith('10.25');
                    expect(wrapper.parent.onBlur).toHaveBeenCalledWith(wrapper.name, event);
                });

                it('should not call parent.onBlur if no onBlur method', () => {
                    const parent = {};
                    const wrapper = createMockInstance(INumberInput, {
                        props: {
                            ...props,
                            precision: 2,
                            modelValue: '10.25'
                        },
                        mocks: {
                            parent
                        }
                    });
                    const event: any = {};

                    expect(() => wrapper.onBlurFormatPrecision(event)).not.toThrow();
                });
            });
        });

        describe('watch', () => {
            describe('modelValue', () => {
                it('should allow empty value', async () => {
                    const parent = {};
                    const modelValue = '';
                    const wrapper = createMockInstance(INumberInput, {
                        props,
                        mocks: {
                            parent,
                            watchModelValue: (INumberInput as any).watch.modelValue.handler
                        }
                    });

                    wrapper.watchModelValue(modelValue);

                    expect(wrapper.$emit).toHaveBeenCalledWith('update:modelValue', '');
                });

                it('should not allow value past max value', async () => {
                    const parent = {};
                    const max = '10';
                    const wrapper = createMockInstance(INumberInput, {
                        props: {
                            ...props,
                            max
                        },
                        mocks: {
                            parent,
                            watchModelValue: (INumberInput as any).watch.modelValue.handler
                        }
                    });

                    wrapper.watchModelValue('20');

                    expect(wrapper.$emit).toHaveBeenCalledWith('update:modelValue', max);
                });

                it('should not allow value under min value', async () => {
                    const parent = {};
                    const min = '10';
                    const wrapper = createMockInstance(INumberInput, {
                        props: {
                            ...props,
                            min
                        },
                        mocks: {
                            parent,
                            watchModelValue: (INumberInput as any).watch.modelValue.handler
                        }
                    });

                    wrapper.watchModelValue('5');

                    expect(wrapper.$emit).toHaveBeenCalledWith('update:modelValue', min);
                });

                it('should call parent.onInput if defined', async () => {
                    const parent = { onInput: jest.fn() };
                    const wrapper = createMockInstance(INumberInput, {
                        props,
                        mocks: {
                            parent,
                            watchModelValue: (INumberInput as any).watch.modelValue.handler
                        }
                    });

                    wrapper.watchModelValue('10');

                    expect(parent.onInput).toHaveBeenCalledWith(wrapper.name, '10');
                });
            });
        });
    });
});
