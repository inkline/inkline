import { fireEvent, render } from '@testing-library/vue';
import { INumberInput } from '@inkline/inkline/components';

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
                            modelValue: '10.25',
                        }
                    });
                    const input = await wrapper.getByRole('input');

                    await fireEvent.blur(input as Element);

                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['10.25']);
                });
            });
        });
    });
});
